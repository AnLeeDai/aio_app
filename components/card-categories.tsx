"use client";

import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import Link from "next/link";

interface CardCategoriesProps {
  children: React.ReactNode;
  href: string;
  description: string;
  isActive?: boolean;
  isDemo?: boolean;
  cover?: string;
}

export default function CardCategories({
  children,
  href,
  description,
  isActive = false,
  isDemo = false,
  cover = "https://placehold.co/600x400",
}: CardCategoriesProps) {
  const state = isActive ? "active" : isDemo ? "demo" : "coming";

  const CardInner = (
    <>
      <CardBody>
        <b
          className={
            state === "coming"
              ? "text-default-500"
              : state === "demo"
                ? "text-warning"
                : ""
          }
        >
          {children}&nbsp;
          {state === "active" && "(Active)"}
          {state === "demo" && "(Demo)"}
          {state === "coming" && "(Coming Soon)"}
        </b>
      </CardBody>

      <CardFooter>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Image alt="Placeholder Image" src={cover} />
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
