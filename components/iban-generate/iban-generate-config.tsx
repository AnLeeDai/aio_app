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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBANGenForm>({
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
            name="iban_number"
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
                label="Number of IBANs"
                placeholder="e.g. 10"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          {/* ---------- country (only BR) ---------- */}
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
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
          />

          {/* ---------- submit ---------- */}
          <Button
            type="submit"
            className="w-full"
            color="primary"
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            isLoading={isLoading}
          >
            Generate IBANs
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
