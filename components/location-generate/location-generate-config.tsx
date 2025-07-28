"use client";

import {
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { IconDice6Filled } from "@tabler/icons-react";

import { TRANS_ASCII_OPTIONS } from "./location-generate-data";

export interface LocationGenForm {
  limit: number;
  country: string;
  trans_ascii: boolean;
}

interface LocationGenerateConfigProps {
  onGenerate: (params: LocationGenForm) => void;
  isLoading: boolean;
}

export default function LocationGenerateConfig({
  onGenerate,
  isLoading,
}: LocationGenerateConfigProps) {
  const { control, handleSubmit } = useForm<LocationGenForm>({
    defaultValues: {
      limit: 10,
      country: "Brazil",
      trans_ascii: false,
    },
  });

  const submit = handleSubmit((v) => onGenerate(v));

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random locations
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* ---------- limit ---------- */}
          <Controller
            control={control}
            name="limit"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of locations"
                placeholder="e.g. 10"
                type="number"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            )}
            rules={{
              required: "Required",
              min: { value: 1, message: "Min 1" },
              max: { value: 10000, message: "Max 10 000" },
            }}
          />

          {/* ---------- country ---------- */}
          <Controller
            control={control}
            name="country"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                disabled
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Country"
                placeholder="e.g. Brazil"
              />
            )}
            rules={{
              required: "Required",
              maxLength: { value: 100, message: "Max 100 characters" },
            }}
          />

          {/* ---------- Transliterate to ASCII ---------- */}
          <Controller
            control={control}
            name="trans_ascii"
            render={({ field }) => (
              <Select
                label="Transliterate to ASCII"
                selectedKeys={[String(field.value)]}
                onSelectionChange={(k) =>
                  field.onChange(Array.from(k)[0] === "true")
                }
              >
                {TRANS_ASCII_OPTIONS.map((o) => (
                  <SelectItem key={String(o.key)}>{o.label}</SelectItem>
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
            Generate Locations
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
