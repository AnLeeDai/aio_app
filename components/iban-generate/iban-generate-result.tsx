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
import { useCopyToClipboard, CopyItem } from "@/hooks/use-copy-to-clipboard";

interface IBANGenerateResultProps {
  data: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
}

export default function IBANGenerateResult({
  data,
  selectedKeys,
  setSelectedKeys,
}: IBANGenerateResultProps) {
  const rows: CopyItem[] = data.map((iban, idx) => ({
    id: `row-${idx}`,
    label: iban,
  }));

  const copyIBAN = useCopyToClipboard(
    rows,
    selectedKeys,
    setSelectedKeys,
    "iban"
  );

  return (
    <Card classNames={{ body: "max-h-[600px] overflow-y-scroll" }}>
      <CardHeader className="w-full">
        <GroupButtonCopy
          selectedCount={selectedKeys.size}
          totalCount={rows.length}
          onCopyAll={copyIBAN.copyAll}
          onCopySelected={copyIBAN.copySelected}
          onResetSelection={copyIBAN.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated IBANs"
          variant="flat"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) =>
            setSelectedKeys(
              typeof keys === "string"
                ? new Set([keys])
                : new Set(keys as Iterable<string>)
            )
          }
        >
          {rows.map((r) => (
            <ListboxItem key={r.id} textValue={r.label}>
              {r.label}
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
