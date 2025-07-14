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

interface PasswordGenerateResultProps {
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  data: string[];
}

export default function PasswordGenerateResult({
  selectedKeys,
  setSelectedKeys,
  data,
}: PasswordGenerateResultProps) {
  const copyNames = useCopyToClipboard(
    data || [],
    selectedKeys,
    setSelectedKeys,
    "name"
  );

  return (
    <Card
      classNames={{
        body: "max-h-[600px] overflow-y-scroll",
      }}
    >
      <CardHeader className="w-full">
        <GroupButtonCopy
          selectedCount={selectedKeys?.size}
          totalCount={data ? data.length : 0}
          onCopyAll={copyNames.copyAll}
          onCopySelected={copyNames.copySelected}
          onResetSelection={copyNames.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label="Generated Password"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={(keys) =>
            setSelectedKeys(
              typeof keys === "string"
                ? new Set([keys])
                : new Set(keys as Iterable<string>)
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
