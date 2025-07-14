"use client";

import { addToast } from "@heroui/react";
import { useState } from "react";

import TitleHeader from "../title-header";

import DOBGenerateConfig from "./dob-generate-config";
import DOBGenerateResult from "./dob-generate-result";

import { useDOBGenerate } from "@/hooks/use-dob-generate";

export default function DOBGenerateContainers() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [dob, setDOB] = useState<string[]>([]);

  const { mutate, isPending } = useDOBGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setDOB(data.data);
      setSelectedKeys(new Set());
    },

    onError: (error) => {
      console.error("Error generating names:", error);
    },
  });

  return (
    <section>
      <TitleHeader title="DOB Generate" />

      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <DOBGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <DOBGenerateResult
          data={dob}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
