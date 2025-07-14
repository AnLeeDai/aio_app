"use client";

import { addToast } from "@heroui/react";
import { useState } from "react";
import TitleHeader from "../title-header";
import PasswordGenerateConfig from "./password-generate-config";
import PasswordGenerateResult from "./password-generate-result";
import { usePasswordGenerate } from "@/hooks/use-password-generate";

export default function PasswordGenerateContainers() {
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

    onError: (error) => {
      console.error("Error generating names:", error);
    },
  });

  return (
    <section>
      <TitleHeader title="Password Generate" />

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
