import { siteConfig } from "@/config/site";

export const allCategories = [
  {
    name: "Name Generate",
    href: siteConfig.routes.nameGenerate,
    description: "Generate random names",
    isActive: true,
    isDemo: false,
  },
  {
    name: "Password Generate",
    href: siteConfig.routes.passwordGenerate,
    description: "Create secure passwords",
    isActive: true,
    isDemo: false,
  },
  {
    name: "DOB Generate",
    href: siteConfig.routes.dobGenerate,
    description: "Generate random dates of birth",
    isActive: false,
    isDemo: false,
  },
  {
    name: "Passport Generate",
    href: siteConfig.routes.passportGenerate,
    description: "Generate passport id numbers",
    isActive: false,
    isDemo: false,
  },
  {
    name: "Passport Expire Generate",
    href: siteConfig.routes.passportExpireGenerate,
    description: "Generate passport expiration dates",
    isActive: false,
    isDemo: false,
  },
  {
    name: "Iban Generate",
    href: siteConfig.routes.ibanGenerate,
    description: "Generate IBAN numbers",
    isActive: false,
    isDemo: false,
  },
  {
    name: "Location Generate",
    href: siteConfig.routes.locationGenerate,
    description: "Generate random locations",
    isActive: false,
    isDemo: true,
  },
];
