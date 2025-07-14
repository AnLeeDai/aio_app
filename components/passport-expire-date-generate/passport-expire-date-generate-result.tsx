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

/* ------ API record ------ */
type PassportExpireDate = { issue_date: string; expiry_date: string };

interface Props {
  data: PassportExpireDate[];
  selectedKeys: Set<string>;
  setSelectedKeys: (k: Set<string>) => void;
}

export default function PassportExpireDateResult({
  data,
  selectedKeys,
  setSelectedKeys,
}: Props) {
  /* build rows */
  const rows: CopyItem[] = data.map((d, idx) => ({
    id: `row-${idx}`,
    label: `${d.issue_date} → ${d.expiry_date}`,
    value: `${d.issue_date}\t${d.expiry_date}`, // tab tách 2 cột
  }));

  const copyDates = useCopyToClipboard(
    rows,
    selectedKeys,
    setSelectedKeys,
    "date",
  );

  return (
    <Card classNames={{ body: "max-h-[600px] overflow-y-scroll" }}>
      <CardHeader className="w-full">
        <GroupButtonCopy
          selectedCount={selectedKeys.size}
          totalCount={rows.length}
          onCopyAll={copyDates.copyAll}
          onCopySelected={copyDates.copySelected}
          onResetSelection={copyDates.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated Expire Dates"
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
