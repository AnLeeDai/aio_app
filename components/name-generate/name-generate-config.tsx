"use client";

import {
  Select,
  SelectItem,
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  CardHeader,
} from "@heroui/react";
import { IconDice6Filled } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

import {
  LOCALE_OPTIONS,
  NAME_FORMAT_OPTIONS,
  GENDER_OPTIONS,
  TRANS_ASCII_OPTIONS,
} from "./name-generate-data";

import { useI18n } from "@/i18n";

interface NameGenForm {
  name_number: number;
  name_format: "first_last" | "first_middle_last";
  country: string;
  gender: "male" | "female";
  trans_ascii: boolean;
}

interface NameGenerateConfigProps {
  onGenerate: (params: NameGenForm) => void;
  isLoading: boolean;
}

export default function NameGenerateConfig({
  onGenerate,
  isLoading,
}: NameGenerateConfigProps) {
  const { t } = useI18n();
  const { control, handleSubmit } = useForm<NameGenForm>({
    defaultValues: {
      name_number: 10,
      name_format: "first_last",
      country: "BR",
      gender: "male",
      trans_ascii: true,
    },
  });

  const submit = handleSubmit((values) => {
    onGenerate({ ...values, name_number: Number(values.name_number) });
  });

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("name.header")}</h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* -------- name_number -------- */}
          <Controller
            control={control}
            name="name_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={t("name.numNames")}
                placeholder={t("common.egNumber", { n: 10 })}
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: t("validation.required"),
              min: { value: 1, message: t("validation.min", { n: 1 }) },
              max: { value: 100, message: t("validation.max", { n: 100 }) },
            }}
          />

          {/* -------- country (2-letter) -------- */}
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                label={t("common.locale")}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0])
                }
              >
                {LOCALE_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{t(`country.${o.key}`)}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- name_format -------- */}
          <Controller
            control={control}
            name="name_format"
            render={({ field }) => (
              <Select
                label={t("name.selectFormat")}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as any)
                }
              >
                {NAME_FORMAT_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>
                    {t(`name.format.${o.key}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- gender (male|female) -------- */}
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                label={t("name.selectGender")}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as any)
                }
              >
                {GENDER_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>
                    {t(`name.gender.${o.key}`)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- trans_ascii -------- */}
          <Controller
            control={control}
            name="trans_ascii"
            render={({ field }) => (
              <Select
                label={t("common.transliterateToAscii")}
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {TRANS_ASCII_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>
                    {o.key === "true" ? t("common.yes") : t("common.no")}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- submit -------- */}
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            {t("name.generate")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
