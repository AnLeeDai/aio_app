"use client";

import { addToast } from "@heroui/react";
import { useState } from "react";

import TitleHeader from "../title-header";

import PasswordGenerateConfig from "./password-generate-config";
import PasswordGenerateResult from "./password-generate-result";

import { useI18n } from "@/i18n";
import { usePasswordGenerate } from "@/hooks/use-password-generate";

export default function PasswordGenerateContainers() {
  const { t } = useI18n();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [password, setPassword] = useState<string[]>([]);

  const { mutate, isPending } = usePasswordGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setPassword(data.data);
      setSelectedKeys(new Set());
    },
  });

  return (
    <section>
      <TitleHeader title={t("password.title")} />

      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <PasswordGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <PasswordGenerateResult
          data={password}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
