"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  Card,
  CardBody,
} from "@heroui/react";
import { IconSearch } from "@tabler/icons-react";

import TitleHeader from "../title-header";

import { allCategories } from "./home-categories-data";

import HomeCardCategories from "@/components/home/home-card-categories";
import { useI18n } from "@/i18n";

export default function HomeContainers() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const normalized = useMemo(
    () =>
      allCategories.map((c) => ({
        ...c,
        norm: `${c.name} ${c.description ?? ""}`.toLowerCase(),
      })),
    [],
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [] as typeof normalized;

    // simple contains-based rank; name boost
    const scored = normalized
      .map((c) => {
        const inName = c.name.toLowerCase().includes(q) ? 2 : 0;
        const inDesc = c.description?.toLowerCase().includes(q) ? 1 : 0;
        const inHref = c.href.toLowerCase().includes(q) ? 1 : 0;

        return { c, score: inName + inDesc + inHref };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.c);

    return scored;
  }, [query, normalized]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return normalized;

    return normalized.filter((c) => c.norm.includes(q));
  }, [query, normalized]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!suggestions.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + suggestions.length) % suggestions.length,
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const target = suggestions[activeIndex];

        if (target) window.location.href = target.href;
      }
    },
    [suggestions, activeIndex],
  );

  return (
    <section className="mb-10">
      <TitleHeader title={t("home.welcome")} />

      {/* Search with suggestions */}
      <div className="mb-6">
        <Input
          aria-label={t("search.ariaLabel")}
          description={
            <span className="text-default-500 text-xs inline-flex items-center gap-1">
              <span>{t("search.try")}:</span>
              <Kbd>name</Kbd>
              <Kbd>iban</Kbd>
              <Kbd>passport</Kbd>
            </span>
          }
          placeholder={t("search.placeholder")}
          size="lg"
          startContent={<IconSearch size={18} />}
          value={query}
          onKeyDown={onKeyDown}
          onValueChange={(v) => {
            setQuery(v);
            setActiveIndex(-1);
          }}
        />

        {query && suggestions.length > 0 && (
          <Card className="mt-2">
            <CardBody className="p-0">
              <Listbox
                aria-label={t("search.suggestions")}
                selectedKeys={
                  activeIndex >= 0 ? new Set([String(activeIndex)]) : new Set()
                }
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const [k] = Array.from(keys as Set<string>);
                  const idx = Number(k);
                  const target = suggestions[idx];

                  if (target) window.location.href = target.href;
                }}
              >
                {suggestions.map((s, idx) => (
                  <ListboxItem
                    key={idx}
                    textValue={`${s.name} ${s.description}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-xs text-default-500">
                        {s.description}
                      </span>
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            </CardBody>
          </Card>
        )}
      </div>

      <div
        className="
          grid gap-4        
          grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
        "
      >
        {filtered.map((category) => (
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
