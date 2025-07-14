import TitleHeader from "../title-header";

import CardCategories from "@/components/card-categories";
import { siteConfig } from "@/config/site";

const allCategories = [
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
    isActive: false,
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

export default function HomeContainer() {
  return (
    <section className="mb-10">
      <TitleHeader title="Welcome to the AIO Apps" />

      <div
        className="
          grid gap-4        
          grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
        "
      >
        {allCategories.map((category) => (
          <CardCategories
            key={category.href}
            description={category.description}
            href={category.href}
            isActive={category.isActive}
            isDemo={category.isDemo}
          >
            {category.name}
          </CardCategories>
        ))}
      </div>
    </section>
  );
}
