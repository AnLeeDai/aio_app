"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { IconHeartFilled } from "@tabler/icons-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitch from "@/components/language-switch";
import { useI18n } from "@/i18n";

export const Navbar = () => {
  const { t } = useI18n();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">{t("navbar.title")}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem>
          <LanguageSwitch />
        </NavbarItem>

        <NavbarItem>
          <Button
            as={NextLink}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.routes.donate}
            startContent={<IconHeartFilled color="red" size={22} />}
            variant="flat"
          >
            {t("navbar.donate")}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <LanguageSwitch />
        <NavbarItem>
          <Button
            as={NextLink}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.routes.donate}
            startContent={<IconHeartFilled color="red" size={22} />}
            variant="flat"
          >
            {t("navbar.donate")}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
