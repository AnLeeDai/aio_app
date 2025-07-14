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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameGenForm>({
    defaultValues: {
      name_number: 10,
      name_format: "first_last",
      country: "BR",
      gender: "male",
      trans_ascii: false,
    },
  });

  const submit = handleSubmit((values) => {
    onGenerate({ ...values, name_number: Number(values.name_number) });
  });

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random names.
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* -------- name_number -------- */}
          <Controller
            name="name_number"
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
                label="Number of names"
                placeholder="e.g. 10"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          {/* -------- country (2-letter) -------- */}
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                label="Select a locale"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0])
                }
              >
                {LOCALE_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- name_format -------- */}
          <Controller
            name="name_format"
            control={control}
            render={({ field }) => (
              <Select
                label="Select name format"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as any)
                }
              >
                {NAME_FORMAT_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- gender (male|female|random) -------- */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                label="Select gender"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as any)
                }
              >
                {GENDER_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- trans_ascii -------- */}
          <Controller
            name="trans_ascii"
            control={control}
            render={({ field }) => (
              <Select
                label="Transliterate to ASCII"
                selectedKeys={[String(field.value)]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] === "true")
                }
              >
                {TRANS_ASCII_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          {/* -------- submit -------- */}
          <Button
            type="submit"
            className="w-full"
            color="primary"
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            isLoading={isLoading}
          >
            Generate Names
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
