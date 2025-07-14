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

interface LocationGenerateResultProps {
  data: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
}

export default function LocationGenerateResult({
  data,
  selectedKeys,
  setSelectedKeys,
}: LocationGenerateResultProps) {
  const rows: CopyItem[] = data.map((loc, idx) => ({
    id: `row-${idx}`,
    label: loc,
  }));

  const copyLocation = useCopyToClipboard(
    rows,
    selectedKeys,
    setSelectedKeys,
    "location",
  );

  return (
    <Card classNames={{ body: "max-h-[600px] overflow-y-scroll" }}>
      <CardHeader className="w-full">
        <GroupButtonCopy
          selectedCount={selectedKeys.size}
          totalCount={rows.length}
          onCopyAll={copyLocation.copyAll}
          onCopySelected={copyLocation.copySelected}
          onResetSelection={copyLocation.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated Locations"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={(keys) =>
            setSelectedKeys(
              typeof keys === "string"
                ? new Set([keys])
                : new Set(keys as Iterable<string>),
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
