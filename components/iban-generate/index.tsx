"use client";

import { useState } from "react";
import { addToast } from "@heroui/react";

import TitleHeader from "../title-header";

import IBANGenerateConfig from "./iban-generate-config";
import IBANGenerateResult from "./iban-generate-result";

import { useIBANGenerate } from "@/hooks/use-iban-generate";

export default function IBANGenerateContainers() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [iban, setIBAN] = useState<string[]>([]);

  const { mutate, isPending } = useIBANGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setIBAN(data.data);
      setSelectedKeys(new Set());
    },
  });

  return (
    <section>
      <TitleHeader title="IBAN Generate" />

      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <IBANGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <IBANGenerateResult
          data={iban}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
