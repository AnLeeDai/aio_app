"use client";

import {
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { IconDice6Filled } from "@tabler/icons-react";

import { TRANS_ASCII_OPTIONS, COUNTRY_OPTIONS } from "./location-generate-data";

import { useI18n } from "@/i18n";

export interface LocationGenForm {
  limit: number;
  country: string;
  trans_ascii: boolean;
}

interface LocationGenerateConfigProps {
  onGenerate: (params: LocationGenForm) => void;
  isLoading: boolean;
}

export default function LocationGenerateConfig({
  onGenerate,
  isLoading,
}: LocationGenerateConfigProps) {
  const { t } = useI18n();
  const { control, handleSubmit } = useForm<LocationGenForm>({
    defaultValues: {
      limit: 10,
      country: "BR",
      trans_ascii: false,
    },
  });

  const submit = handleSubmit((v) => onGenerate(v));

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("location.header")}</h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- limit ---------- */}
          <Controller
            control={control}
            name="limit"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={t("location.numLocations")}
                placeholder={t("common.egNumber", { n: 10 })}
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: t("validation.required"),
              min: { value: 1, message: t("validation.min", { n: 1 }) },
              max: { value: 10000, message: t("validation.max", { n: 10000 }) },
            }}
          />

          {/* ---------- country (BR, PE, MY, CO, JM, CL) ---------- */}
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                label={t("common.country")}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as string)
                }
              >
                {COUNTRY_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{t(`country.${o.key}`)}</SelectItem>
                ))}
              </Select>
            )}
            rules={{ required: "Required" }}
          />

          {/* ---------- Transliterate to ASCII ---------- */}
          <Controller
            control={control}
            name="trans_ascii"
            render={({ field }) => (
              <Select
                label={t("common.transliterateToAscii")}
                selectedKeys={[String(field.value)]}
                onSelectionChange={(k) =>
                  field.onChange(Array.from(k)[0] === "true")
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

          {/* ---------- submit ---------- */}
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            {t("location.generate")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
