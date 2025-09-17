"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { IconDice6Filled } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

export interface EmailEbayGenForm {
  email_num: number;
}

interface EmailEbayGenerateConfigProps {
  onGenerate: (params: EmailEbayGenForm) => void;
  isLoading: boolean;
}

export default function EmailEbayGenerateConfig({
  onGenerate,
  isLoading,
}: EmailEbayGenerateConfigProps) {
  const { control, handleSubmit } = useForm<EmailEbayGenForm>({
    defaultValues: {
      email_num: 10,
    },
  });

  const submit = handleSubmit((v) =>
    onGenerate({ email_num: Number(v.email_num) }),
  );

  return (
    <Card as="form" onSubmit={submit}>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Select options to generate Hotmail accounts
        </h2>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex flex-col gap-4">
          {/* email_num */}
          <Controller
            control={control}
            name="email_num"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label="Number of emails"
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

          {/* submit */}
          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            size="lg"
            startContent={<IconDice6Filled size={22} />}
            type="submit"
          >
            Generate Emails
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
