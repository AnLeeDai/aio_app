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
        <h2 className="text-lg font-semibold">
          Select options to generate random password.
        </h2>
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
                label="Number of passwords"
                placeholder="e.g. 10"
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: "Required",
              min: { value: 1, message: "Min 1" },
              max: { value: 100, message: "Max 100" },
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
                label="Password length"
                placeholder="e.g. 12"
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: "Required",
              min: { value: 6, message: "Min 6" },
              max: { value: 64, message: "Max 64" },
            }}
          />

          {/* -------- include_special_chars -------- */}
          <Controller
            control={control}
            name="include_special_chars"
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
            control={control}
            name="is_uppercase"
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
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            Generate Password
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
