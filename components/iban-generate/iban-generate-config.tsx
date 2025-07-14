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

import { COUNTRY_OPTIONS } from "./iban-generate-data";

export interface IBANGenForm {
  iban_number: number;
  country: "BR";
}

interface IBANGenerateConfigProps {
  onGenerate: (params: IBANGenForm) => void;
  isLoading: boolean;
}

export default function IBANGenerateConfig({
  onGenerate,
  isLoading,
}: IBANGenerateConfigProps) {
  const { control, handleSubmit } = useForm<IBANGenForm>({
    defaultValues: {
      iban_number: 10,
      country: "BR",
    },
  });

  const submit = handleSubmit((v) => onGenerate(v));

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random IBANs
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- iban_number ---------- */}
          <Controller
            control={control}
            name="iban_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of IBANs"
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

          {/* ---------- country (only BR) ---------- */}
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select
                label="Country"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as "BR")
                }
              >
                {COUNTRY_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>
            )}
            rules={{ required: true }}
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
            Generate IBANs
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
