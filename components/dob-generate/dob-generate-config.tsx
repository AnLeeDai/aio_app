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

import { DATE_FORMAT_OPTIONS } from "./dob-generate-data";

export interface DOBGenForm {
  dob_num: number;
  min_age: number;
  max_age: number;
  date_format: string;
}

interface DOBGenerateConfigProps {
  onGenerate: (params: DOBGenForm) => void;
  isLoading: boolean;
}

export default function DOBGenerateConfig({
  onGenerate,
  isLoading,
}: DOBGenerateConfigProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DOBGenForm>({
    defaultValues: {
      dob_num: 10,
      min_age: 18,
      max_age: 30,
      date_format: "d/m/Y",
    },
  });

  /* --- watch to validate max_age >= min_age --- */
  const minAge = watch("min_age");

  const onSubmit = handleSubmit((v) => onGenerate(v));

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random DOB
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- dob_num ---------- */}
          <Controller
            control={control}
            name="dob_num"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of DOBs"
                placeholder="e.g. 100"
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

          {/* ---------- min_age ---------- */}
          <Controller
            control={control}
            name="min_age"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Min age"
                placeholder="e.g. 18"
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: "Required",
              min: { value: 18, message: "Min 18" },
              max: { value: 100, message: "Max 100" },
            }}
          />

          {/* ---------- max_age ---------- */}
          <Controller
            control={control}
            name="max_age"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Max age"
                placeholder="e.g. 30"
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: "Required",
              min: { value: 0, message: "Min 0" },
              max: { value: 120, message: "Max 120" },
              validate: (v) => v >= minAge || "Max age must be ≥ Min age",
            }}
          />

          {/* ---------- date_format ---------- */}
          <Controller
            control={control}
            name="date_format"
            render={({ field }) => (
              <Select
                label="Date format"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0])
                }
              >
                {DATE_FORMAT_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
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
            Generate DOB
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
