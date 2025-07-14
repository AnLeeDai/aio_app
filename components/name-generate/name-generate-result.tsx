import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  Listbox,
  ListboxItem,
} from "@heroui/react";

import GroupButtonCopy from "../group-button-copy";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface NameGenerateResultProps {
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  data: string[];
}

export default function NameGenerateResult({
  selectedKeys,
  setSelectedKeys,
  data,
}: NameGenerateResultProps) {
  const copyNames = useCopyToClipboard(
    data || [],
    selectedKeys,
    setSelectedKeys,
    "name",
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
          totalCount={data ? data.length : 0}
          onCopyAll={copyNames.copyAll}
          onCopySelected={copyNames.copySelected}
          onResetSelection={copyNames.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated Names"
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
          {(data || []).map((name) => (
            <ListboxItem key={name}>{name}</ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
