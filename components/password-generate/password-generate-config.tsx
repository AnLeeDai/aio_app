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
import {
  INCLUDE_SPECIAL_CHARS_OPTIONS,
  INCLUDE_UPPERCASE_OPTIONS,
} from "./password-generate-data";
import { IconDice6Filled } from "@tabler/icons-react";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordGenForm>({
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
        <h2 className="text-lg font-semibold">
          Select options to generate random password.
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* -------- password_num -------- */}
          <Controller
            name="password_num"
            control={control}
            rules={{
              required: "Required",
              min: { value: 1, message: "Min 1" },
              max: { value: 100, message: "Max 100" },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="number"
                label="Number of passwords"
                placeholder="e.g. 10"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          {/* -------- password_length ------ */}
          <Controller
            name="password_length"
            control={control}
            rules={{
              required: "Required",
              min: { value: 6, message: "Min 6" },
              max: { value: 64, message: "Max 64" },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="number"
                label="Password length"
                placeholder="e.g. 12"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          {/* -------- include_special_chars -------- */}
          <Controller
            name="include_special_chars"
            control={control}
            render={({ field }) => (
              <Select
                label="Include special characters"
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {INCLUDE_SPECIAL_CHARS_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- is_uppercase -------- */}
          <Controller
            name="is_uppercase"
            control={control}
            render={({ field }) => (
              <Select
                label="Include uppercase"
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {INCLUDE_UPPERCASE_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- submit button -------- */}
          <Button
            type="submit"
            className="w-full"
            color="primary"
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            isLoading={isLoading}
          >
            Generate Password
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
