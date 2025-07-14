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
import { Controller, useForm, useWatch } from "react-hook-form";
import { IconDice6Filled } from "@tabler/icons-react";

import { COUNTRY_OPTIONS } from "./passport-generate-data";

export interface PassportGenForm {
  id_number: number;
  country: "US" | "BR";
  prefix: string;
}

interface PassportGenerateConfigProps {
  onGenerate: (params: PassportGenForm) => void;
  isLoading: boolean;
}

export default function PassportGenerateConfig({
  onGenerate,
  isLoading,
}: PassportGenerateConfigProps) {
  const { control, handleSubmit } = useForm<PassportGenForm>({
    defaultValues: {
      id_number: 10,
      country: "BR",
      prefix: "",
    },
  });

  /* Lấy country để biết giới hạn ký tự */
  const country = useWatch({ control, name: "country" });
  const prefixLimit = country === "US" ? 1 : 2;

  const onSubmit = handleSubmit((values) => {
    const params: PassportGenForm = { ...values };

    onGenerate(params);
  });

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random passports
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- id_number ---------- */}
          <Controller
            control={control}
            name="id_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of passports"
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

          {/* ---------- prefix (no validation) ---------- */}
          <Controller
            control={control}
            name="prefix"
            render={({ field }) => (
              <Input
                {...field}
                label="Prefix (optional)"
                maxLength={prefixLimit}
                placeholder={`e.g. ${prefixLimit === 1 ? "A" : "AA"}`}
                type="text"
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z]/g, "")
                      .slice(0, prefixLimit)
                  )
                }
              />
            )}
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
            rules={{ required: true }}
          />

          {/* ---------- submit button ---------- */}
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            Generate Passports
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
