"use client";

import { addToast } from "@heroui/react";
import { useState } from "react";

import TitleHeader from "../title-header";

import PhoneGenerateConfig from "./phone-generate-config";
import PhoneGenerateResult from "./phone-generate-result";

import { useI18n } from "@/i18n";
import { usePhoneGenerate } from "@/hooks/use-phone-generate";

export default function PhoneGenerateContainer() {
  const { t } = useI18n();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [phones, setPhones] = useState<string[]>([]);

  const { mutate, isPending } = usePhoneGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setPhones(data.data);
      setSelectedKeys(new Set());
    },
  });

  return (
    <section>
      <TitleHeader title={t("phone.title")} />

      <div
        className="
          grid gap-8 items-start
          grid-cols-1
          lg:grid-cols-[320px_1fr]
        "
      >
        <PhoneGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <PhoneGenerateResult
          data={phones}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
