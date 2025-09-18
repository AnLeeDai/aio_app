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
import { IconDice6Filled } from "@tabler/icons-react";

import {
  INCLUDE_SPECIAL_CHARS_OPTIONS,
  INCLUDE_UPPERCASE_OPTIONS,
} from "./password-generate-data";

import { useI18n } from "@/i18n";

interface PasswordGenForm {
  password_num: number;
  password_length: number;
  include_special_chars: boolean;
  is_uppercase: boolean;
}

interface PasswordGenerateConfigProps {
  onGenerate: (params: PasswordGenForm) => void;
  isLoading: boolean;
}

export default function PasswordGenerateConfig({
  onGenerate,
  isLoading,
}: PasswordGenerateConfigProps) {
  const { t } = useI18n();
  const { control, handleSubmit } = useForm<PasswordGenForm>({
    defaultValues: {
      password_num: 10,
      password_length: 12,
      include_special_chars: false,
      is_uppercase: false,
    },
  });

  const onSubmit = handleSubmit((values) => {
    onGenerate({ ...values });
  });

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("password.header")}</h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* -------- password_num -------- */}
          <Controller
            control={control}
            name="password_num"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={t("password.numPasswords")}
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

          {/* -------- password_length ------ */}
          <Controller
            control={control}
            name="password_length"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={t("password.length")}
                placeholder={t("common.egNumber", { n: 12 })}
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: t("validation.required"),
              min: { value: 6, message: t("validation.min", { n: 6 }) },
              max: { value: 64, message: t("validation.max", { n: 64 }) },
            }}
          />

          {/* -------- include_special_chars -------- */}
          <Controller
            control={control}
            name="include_special_chars"
            render={({ field }) => (
              <Select
                label={t("password.includeSpecial")}
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {INCLUDE_SPECIAL_CHARS_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>
                    {o.key ? t("common.yes") : t("common.no")}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- is_uppercase -------- */}
          <Controller
            control={control}
            name="is_uppercase"
            render={({ field }) => (
              <Select
                label={t("password.includeUppercase")}
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {INCLUDE_UPPERCASE_OPTIONS.map((o) => (
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
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            {t("password.generate")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
