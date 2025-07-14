"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface HomeCardCategoriesProps {
  children: React.ReactNode;
  href: string;
  description: string;
  isActive?: boolean;
  isDemo?: boolean;
  cover?: string;
}

export default function HomeCardCategories({
  children,
  href,
  description,
  isActive = false,
  isDemo = false,
  cover = "https://placehold.co/600x400",
}: HomeCardCategoriesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();

  const state = isActive ? "active" : isDemo ? "demo" : "coming";

  const switchComingCover =
    theme === "dark"
      ? "/imgs/coming_soon_darkmode_cover.png"
      : "/imgs/coming_soon_lightmode_cover.png";

  const switchDemoCover =
    theme === "dark"
      ? "/imgs/demo_darkmode_cover.png"
      : "/imgs/demo_lightmode_cover.png";

  const coverSrc = isDemo
    ? switchDemoCover
    : state === "coming"
      ? switchComingCover
      : cover;

  if (!mounted) {
    return (
      <Card aria-disabled shadow="lg">
        <CardBody>
          <Skeleton className="rounded-lg">
            <div className="h-80 rounded-lg bg-default-300" />
          </Skeleton>
        </CardBody>
      </Card>
    );
  }

  const CardInner = (
    <>
      <CardBody>
        <b
          className={
            isDemo
              ? "text-warning"
              : state === "coming"
                ? "text-default-500"
                : ""
          }
        >
          {children}&nbsp;
          {isDemo && "(Demo)"}
          {!isDemo && state === "active" && "(Active)"}
          {!isDemo && state === "coming" && "(Coming Soon)"}
        </b>
      </CardBody>

      <CardFooter>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Image alt={`${children} cover`} src={coverSrc} />
          <p
            className={
              state === "coming" ? "text-default-500" : "text-default-600"
            }
          >
            {description}
          </p>
        </div>
      </CardFooter>
    </>
  );

  if (state === "active") {
    return (
      <Link aria-label={`${children} ${state}`} href={href}>
        <Card isPressable shadow="lg">
          {CardInner}
        </Card>
      </Link>
    );
  }

  return (
    <Card aria-disabled shadow="lg">
      {CardInner}
    </Card>
  );
}
