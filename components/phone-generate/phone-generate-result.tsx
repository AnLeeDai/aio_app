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
import { useI18n } from "@/i18n";

interface PhoneGenerateResultProps {
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  data: string[];
}

export default function PhoneGenerateResult({
  selectedKeys,
  setSelectedKeys,
  data,
}: PhoneGenerateResultProps) {
  const { t } = useI18n();
  const copyPhones = useCopyToClipboard(
    data || [],
    selectedKeys,
    setSelectedKeys,
    "phone",
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
          onCopyAll={copyPhones.copyAll}
          onCopySelected={copyPhones.copySelected}
          onResetSelection={copyPhones.resetSelection}
        />
      </CardHeader>

      <Divider />

      <CardBody>
        <Listbox
          label={t("phone.generatedLabel")}
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
          {(data || []).map((phone) => (
            <ListboxItem key={phone}>{phone}</ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
}
