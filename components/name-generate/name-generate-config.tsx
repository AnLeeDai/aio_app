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

export interface NameGenForm {
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
    register,
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

  const handleGenerate = handleSubmit((values) => {
    onGenerate({
      ...values,
      name_number: Number(values.name_number),
    });
  });

  return (
    <Card as="form" onSubmit={handleGenerate}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate random names.
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          <Input
            {...register("name_number", {
              required: true,
              min: 1,
              max: 100,
              valueAsNumber: true,
            })}
            errorMessage={errors.name_number && "1–100 only"}
            isInvalid={!!errors.name_number}
            label="Enter number of names to generate"
            placeholder="e.g. 10"
            type="number"
          />

          <Controller
            control={control}
            name="country"
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

          <Controller
            control={control}
            name="name_format"
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

          <Controller
            control={control}
            name="gender"
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

          <Controller
            control={control}
            name="trans_ascii"
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

          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            Generate Names
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
