"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { IconLanguage } from "@tabler/icons-react";
import { useI18n } from "@/i18n";

export default function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();

  const currentLabel = locale === "vi" ? t("lang.vi") : t("lang.en");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button startContent={<IconLanguage size={18} />} variant="light">
          {currentLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select language"
        selectedKeys={new Set([locale])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const k = Array.from(keys as Set<string>)[0];

          if (k === "vi" || k === "en") setLocale(k);
        }}
      >
        <DropdownItem key="vi">{t("lang.vi")}</DropdownItem>
        <DropdownItem key="en">{t("lang.en")}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
