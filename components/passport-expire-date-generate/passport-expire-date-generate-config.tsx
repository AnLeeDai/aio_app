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
  COUNTRY_OPTIONS,
  DATE_FORMAT_OPTIONS,
} from "./passport-expire-date-generate-data";

export interface PassportExpireDateForm {
  date_number: number;
  country: "US" | "BR";
  format: "Y-m-d" | "d/m/Y" | "d-m-Y" | "m/d/Y";
}

interface PassportExpireDateConfigProps {
  onGenerate: (params: PassportExpireDateForm) => void;
  isLoading: boolean;
}

export default function PassportExpireDateConfig({
  onGenerate,
  isLoading,
}: PassportExpireDateConfigProps) {
  const { control, handleSubmit } = useForm<PassportExpireDateForm>({
    defaultValues: {
      date_number: 10,
      country: "BR",
      format: "d/m/Y",
    },
  });

  const submit = handleSubmit(onGenerate);

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate passport expire dates
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- date_number ---------- */}
          <Controller
            control={control}
            name="date_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of dates"
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

          {/* ---------- country ---------- */}
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                label="Country"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as "US" | "BR")
                }
              >
                {COUNTRY_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
            rules={{ required: "Required" }}
          />

          {/* ---------- format ---------- */}
          <Controller
            control={control}
            name="format"
            render={({ field }) => (
              <Select
                label="Date format"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(
                    Array.from(keys)[0] as PassportExpireDateForm["format"],
                  )
                }
              >
                {DATE_FORMAT_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
            rules={{
              validate: (v) =>
                DATE_FORMAT_OPTIONS.some((opt) => opt.key === v) ||
                "Invalid format",
            }}
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
            Generate Expire Dates
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
