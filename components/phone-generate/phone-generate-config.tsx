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
import { Controller, useForm } from "react-hook-form";
import { IconPhoneCall } from "@tabler/icons-react";

import { PHONE_COUNTRY_OPTIONS, STRIP_CC_OPTIONS } from "./phone-generate-data";

import { useI18n } from "@/i18n";

interface PhoneGenForm {
  phone_number: number;
  country: string;
  strip_cc: boolean;
}

interface PhoneGenerateConfigProps {
  onGenerate: (params: PhoneGenForm) => void;
  isLoading: boolean;
}

export default function PhoneGenerateConfig({
  onGenerate,
  isLoading,
}: PhoneGenerateConfigProps) {
  const { t } = useI18n();
  const { control, handleSubmit } = useForm<PhoneGenForm>({
    defaultValues: {
      phone_number: 10,
      country: "BR",
      strip_cc: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    onGenerate({ ...values });
  });

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("phone.header")}</h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* -------- phone_number -------- */}
          <Controller
            control={control}
            name="phone_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={t("phone.numPhones")}
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

          {/* -------- country -------- */}
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
                {PHONE_COUNTRY_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{t(`country.${o.key}`)}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- strip_cc -------- */}
          <Controller
            control={control}
            name="strip_cc"
            render={({ field }) => (
              <Select
                label={t("phone.stripCountryCode")}
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {STRIP_CC_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>
                    {o.key ? t("common.yes") : t("common.no")}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- submit button -------- */}
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconPhoneCall size={22} />}
            type="submit"
          >
            {t("phone.generate")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
