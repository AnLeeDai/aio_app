"use client";

import { useState } from "react";
import { addToast } from "@heroui/react";

import TitleHeader from "../title-header";

import EmailEbayGenerateConfig from "./email-ebay-generate-config";
import EmailEbayGenerateResult from "./email-ebay-generate-result";

import {
  useEmailEbayGenerate,
  type EbayEmailItem,
} from "@/hooks/use-email-ebay-generate";
import { useI18n } from "@/i18n";

export default function EmailEbayGenerateContainer() {
  const { t } = useI18n();
  const [nameSelectedKeys, setNameSelectedKeys] = useState<Set<string>>(
    new Set(),
  );
  const [emailSelectedKeys, setEmailSelectedKeys] = useState<Set<string>>(
    new Set(),
  );
  const [rows, setRows] = useState<EbayEmailItem[]>([]);

  const { mutate, isPending } = useEmailEbayGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setRows(data.data);
      setNameSelectedKeys(new Set());
      setEmailSelectedKeys(new Set());
    },
  });

  return (
    <section>
      <TitleHeader title={t("ebay.title")} />

      <div
        className="
          grid gap-8 items-start
          grid-cols-1
          lg:grid-cols-[320px_1fr]
        "
      >
        <EmailEbayGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <div className="mb-5">
          <EmailEbayGenerateResult
            data={rows}
            emailSelectedKeys={emailSelectedKeys}
            nameSelectedKeys={nameSelectedKeys}
            setEmailSelectedKeys={setEmailSelectedKeys}
            setNameSelectedKeys={setNameSelectedKeys}
          />
        </div>
      </div>
    </section>
  );
}
