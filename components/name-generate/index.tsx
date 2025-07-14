"use client";

import {
  Select,
  SelectItem,
  Input,
  Button,
  Listbox,
  ListboxItem,
  Card,
  CardBody,
  Divider,
  CardHeader,
} from "@heroui/react";
import { useState } from "react";

import TitleHeader from "../title-header";
import { IconDice6Filled } from "@tabler/icons-react";
import {
  FakeNameList,
  LOCALE_OPTIONS,
  NAME_FORMAT_OPTIONS,
  GENDER_OPTIONS,
  TRANS_ASCII_OPTIONS,
} from "./name-generate-data";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import GroupButtonCopy from "../group-button-copy";

export default function NameGenerateContainer() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const copyNames = useCopyToClipboard(
    FakeNameList,
    selectedKeys,
    setSelectedKeys,
    "name"
  );

  return (
    <section>
      <TitleHeader title="Name Generate" />

      <div
        className="
          grid gap-8 items-start
          grid-cols-1
          lg:grid-cols-[320px_1fr]
        "
      >
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              Select options to generate random names.
            </h2>
          </CardHeader>

          <Divider />

          <CardBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Enter number of names to generate"
                placeholder="e.g. 10"
                aria-label="Name input"
                defaultValue="10"
              />

              <Select defaultSelectedKeys={["BR"]} label="Select a locale">
                {LOCALE_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>

              <Select
                defaultSelectedKeys={["first_last"]}
                label="Select name format"
              >
                {NAME_FORMAT_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>

              <Select defaultSelectedKeys={["male"]} label="Select gender">
                {GENDER_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>

              <Select
                defaultSelectedKeys={["false"]}
                label="Transliterate to ASCII"
              >
                {TRANS_ASCII_OPTIONS.map((o) => (
                  <SelectItem key={o.key}>{o.label}</SelectItem>
                ))}
              </Select>

              <Button
                color="primary"
                className="w-full"
                startContent={<IconDice6Filled size={22} />}
                size="lg"
              >
                Generate Names
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card
          classNames={{
            body: "max-h-[600px] overflow-y-scroll",
          }}
        >
          <CardHeader className="w-full">
            <GroupButtonCopy
              totalCount={FakeNameList.length}
              selectedCount={selectedKeys.size}
              onCopySelected={copyNames.copySelected}
              onCopyAll={copyNames.copyAll}
              onResetSelection={copyNames.resetSelection}
            />
          </CardHeader>

          <Divider />

          <CardBody>
            <Listbox
              label="Generated Names"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) =>
                setSelectedKeys(
                  typeof keys === "string"
                    ? new Set([keys])
                    : new Set(keys as Iterable<string>)
                )
              }
              variant="flat"
            >
              {FakeNameList.map((name) => (
                <ListboxItem key={name}>{name}</ListboxItem>
              ))}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
