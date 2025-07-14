"use client";

import { addToast } from "@heroui/react";
import { useState } from "react";

import TitleHeader from "../title-header";

import PassportGenerateConfig from "./passport-generate-config";
import PassportGenerateResult from "./passport-generate-result";

import { usePassportGenerate } from "@/hooks/use-passport-generate";

export default function PassportGenerateContainers() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [passport, setPassport] = useState<string[]>([]);

  const { mutate, isPending } = usePassportGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setPassport(data.data);
      setSelectedKeys(new Set());
    },

    onError: (error) => {
      console.error("Error generating passport:", error);
    },
  });

  return (
    <section>
      <TitleHeader title="Passport Generate" />

      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <PassportGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <PassportGenerateResult
          data={passport}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
