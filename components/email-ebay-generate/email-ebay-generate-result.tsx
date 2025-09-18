"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
} from "@heroui/react";

import GroupButtonCopy from "../group-button-copy";

import {
  useCopyToClipboard,
  type CopyItem,
} from "@/hooks/use-copy-to-clipboard";
import { type EbayEmailItem } from "@/hooks/use-email-ebay-generate";
import { useI18n } from "@/i18n";

interface EmailEbayGenerateResultProps {
  data: EbayEmailItem[];
  nameSelectedKeys: Set<string>;
  setNameSelectedKeys: (keys: Set<string>) => void;
  emailSelectedKeys: Set<string>;
  setEmailSelectedKeys: (keys: Set<string>) => void;
}

export default function EmailEbayGenerateResult({
  data,
  nameSelectedKeys,
  setNameSelectedKeys,
  emailSelectedKeys,
  setEmailSelectedKeys,
}: EmailEbayGenerateResultProps) {
  const { t } = useI18n();
  // Names card
  const nameRows: CopyItem[] = data.map((item, idx) => ({
    id: `name-${idx}`,
    label: item.full_name,
  }));
  const copyNames = useCopyToClipboard(
    nameRows,
    nameSelectedKeys,
    setNameSelectedKeys,
    "name",
  );

  const emailRows: CopyItem[] = data.map((item, idx) => ({
    id: `email-${idx}`,
    label: item.email, // show email|password as label
    value: item.email, // copy email|password
  }));

  const copyEmails = useCopyToClipboard(
    emailRows,
    emailSelectedKeys,
    setEmailSelectedKeys,
    "email",
  );

  return (
    <div className="grid gap-6">
      {/* Names Card */}
      <Card classNames={{ body: "max-h-[600px] overflow-y-scroll" }}>
        <CardHeader className="w-full">
          <GroupButtonCopy
            selectedCount={nameSelectedKeys.size}
            totalCount={nameRows.length}
            onCopyAll={copyNames.copyAll}
            onCopySelected={copyNames.copySelected}
            onResetSelection={copyNames.resetSelection}
          />
        </CardHeader>

        <Divider />

        <CardBody>
          <Listbox
            label={t("name.generatedLabel")}
            selectedKeys={nameSelectedKeys}
            selectionMode="multiple"
            variant="flat"
            onSelectionChange={(keys) =>
              setNameSelectedKeys(
                typeof keys === "string"
                  ? new Set([keys])
                  : new Set(keys as Iterable<string>),
              )
            }
          >
            {nameRows.map((r) => (
              <ListboxItem key={r.id} textValue={r.label}>
                {r.label}
              </ListboxItem>
            ))}
          </Listbox>
        </CardBody>
      </Card>

      {/* Emails Card */}
      <Card classNames={{ body: "max-h-[600px] overflow-y-scroll" }}>
        <CardHeader className="w-full">
          <GroupButtonCopy
            selectedCount={emailSelectedKeys.size}
            totalCount={emailRows.length}
            onCopyAll={copyEmails.copyAll}
            onCopySelected={copyEmails.copySelected}
            onResetSelection={copyEmails.resetSelection}
          />
        </CardHeader>

        <Divider />

        <CardBody>
          <Listbox
            label={t("ebay.generatedEmails")}
            selectedKeys={emailSelectedKeys}
            selectionMode="multiple"
            variant="flat"
            onSelectionChange={(keys) =>
              setEmailSelectedKeys(
                typeof keys === "string"
                  ? new Set([keys])
                  : new Set(keys as Iterable<string>),
              )
            }
          >
            {emailRows.map((r) => (
              <ListboxItem key={r.id} textValue={r.label}>
                {r.label}
              </ListboxItem>
            ))}
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}
