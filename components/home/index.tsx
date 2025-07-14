import TitleHeader from "../title-header";

import { allCategories } from "./home-categories-data";

import HomeCardCategories from "@/components/home/home-card-categories";

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
          <HomeCardCategories
            key={category.href}
            cover={category.cover}
            description={category.description}
            href={category.href}
            isActive={category.isActive}
            isDemo={category.isDemo}
          >
            {category.name}
          </HomeCardCategories>
        ))}
      </div>
    </section>
  );
}
