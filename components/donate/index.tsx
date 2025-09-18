"use client";

import { Button, Card, CardBody, CardHeader, Divider, Input } from "@heroui/react";
import { IconCopy, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n";

export default function DonateContainer() {
  const { t } = useI18n();
  const bankName = "TpBank";
  const accountName = "LE DAI AN";
  const accountNumber = "0428 2025 2021";
  const swiftCode = "TPBVVNVX";
  const note = t("donate.note");

  return (
    <section className="mb-10">
      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <IconHeartFilled color="red" size={24} /> {t("donate.title")}
      </h1>

      <Card>
        <CardHeader>
          <div>
            <h2 className="text-lg font-semibold">{t("donate.bankTransfer")}</h2>
            <p className="text-default-500 text-sm">{t("donate.bankDesc")}</p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="flex flex-col gap-4">
          <CopyField label={t("donate.bank")} value={bankName} />
          <CopyField label={t("donate.accountName")} value={accountName} />
          <CopyField label={t("donate.accountNumber")} value={accountNumber} />
          <CopyField label={t("donate.swift")} value={swiftCode} />

          <Divider />

          <div className="flex flex-col items-center gap-3">
            <h3 className="text-base font-medium">{t("donate.qrTitle")}</h3>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square overflow-hidden rounded-xl border border-default-200 bg-content1">
              <Image
                fill
                alt={t("donate.qrAlt")}
                className="object-contain p-2"
                priority={false}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 400px"
                src="/imgs/qr_tp_bank.jpg"
              />
            </div>
            <p className="text-default-500 text-xs">{t("donate.qrDesc")}</p>
          </div>

          <Divider />
          <p className="text-default-600 text-sm">{note}</p>
        </CardBody>
      </Card>
    </section>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  return (
    <div className="flex items-end gap-2">
      <Input isReadOnly label={label} value={value} variant="bordered" />
      <Button
        color={copied ? "success" : "primary"}
        startContent={<IconCopy size={18} />}
        onPress={() => {
          navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          });
        }}
      >
        {copied ? t("common.copied") : t("common.copy")}
      </Button>
    </div>
  );
}
