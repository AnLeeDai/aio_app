"use client";

import { useState } from "react";
import { addToast } from "@heroui/react";

import TitleHeader from "../title-header";

import NameGenerateConfig from "./name-generate-config";
import NameGenerateResult from "./name-generate-result";

import { useNamesGenerate } from "@/hooks/use-name-generate";

export default function NameGenerateContainer() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [names, setNames] = useState<string[]>([]);

  const { mutate, isPending } = useNamesGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setNames(data.data);
      setSelectedKeys(new Set());
    },
  });

  return (
    <section>
      <TitleHeader title="Name Generate" />

      <div
        className="
          grid gap-8 items-start
          grid-cols-1
          lg:grid-cols-[320px_1fr]
        "
      >
        <NameGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <NameGenerateResult
          data={names}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
