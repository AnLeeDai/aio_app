import TitleHeader from "../title-header";

import CardCategories from "@/components/card-categories";
import { allCategories } from "./home-categories-data";

export default function HomeContainers() {
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
