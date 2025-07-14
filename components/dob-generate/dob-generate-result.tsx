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

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface DOBGenerateResultProps {
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  data: string[];
}

export default function DOBGenerateResult({
  selectedKeys,
  setSelectedKeys,
  data,
}: DOBGenerateResultProps) {
  const copyDOB = useCopyToClipboard(
    data,
    selectedKeys,
    setSelectedKeys,
    "dob",
  );

  return (
    <Card
      classNames={{
        body: "max-h-[600px] overflow-y-scroll",
      }}
    >
      <CardHeader className="w-full">
        <GroupButtonCopy
          selectedCount={selectedKeys.size}
          totalCount={data.length}
          onCopyAll={copyDOB.copyAll}
          onCopySelected={copyDOB.copySelected}
          onResetSelection={copyDOB.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated DOBs"
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
          {data.map((dob) => (
            <ListboxItem key={dob}>{dob}</ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
