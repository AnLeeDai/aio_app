"use client";

import { useState } from "react";
import { addToast, Chip } from "@heroui/react";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

import TitleHeader from "../title-header";

import LocationGenerateConfig from "./location-generate-config";
import LocationGenerateResult from "./location-generate-result";

import {
  LocationRecord,
  useLocationGenerate,
} from "@/hooks/use-location-generate";

export default function LocationGenerateContainers() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [locations, setLocations] = useState<string[]>([]);

  const { mutate, isPending } = useLocationGenerate({
    onSuccess: (data) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });
      setLocations(
        data.data.map((location: LocationRecord) => location.address),
      );
      setSelectedKeys(new Set());
    },

    onError: (error) => {
      console.error("Error generating location:", error);
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <Chip
          className="mb-4"
          color="warning"
          size="lg"
          startContent={<IconAlertTriangleFilled size={22} />}
          variant="shadow"
        >
          The address generator feature is still under development — results
          might be inaccurate and fetching can take longer than usual. Please
          keep this in mind.
        </Chip>
      </div>

      <TitleHeader title="Location Generate" />
      <div
        className="
                grid gap-8 items-start
                grid-cols-1
                lg:grid-cols-[320px_1fr]
              "
      >
        <LocationGenerateConfig isLoading={isPending} onGenerate={mutate} />

        <LocationGenerateResult
          data={locations}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </section>
  );
}
