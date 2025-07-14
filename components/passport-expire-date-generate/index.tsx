"use client";

import { useState } from "react";
import { addToast } from "@heroui/react";

import TitleHeader from "../title-header";

import PassportExpireDateConfig from "./passport-expire-date-generate-config";
import PassportExpireDateResult from "./passport-expire-date-generate-result";

import { usePassportExpireDateGenerate } from "@/hooks/use-passport-expire-date-generate";

export default function PassportExpireDateGenerateContainers() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [passportExpire, setPassportExpire] = useState<string[]>([]);

  const { mutate, isPending } = usePassportExpireDateGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setPassportExpire(data.data);
      setSelectedKeys(new Set());
    },

    onError: (error) => {
      console.error("Error generating passport expire:", error);
    },
  });

  return (
    <section>
      <TitleHeader title="Passport Expire Generate" />

      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <PassportExpireDateConfig isLoading={isPending} onGenerate={mutate} />

        <PassportExpireDateResult
          data={passportExpire as any}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
