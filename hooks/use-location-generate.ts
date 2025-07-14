// hooks/use-location-generate.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { locationGenerate } from "@/config/api/routes";

export interface LocationGenerateParams {
  limit: number;
  country: string;
  state?: string;
  city?: string;
  trans_ascii: boolean;
}

export interface LocationRecord {
  address: string;
}

export interface LocationGenerateResponse {
  message: string;
  data: LocationRecord[];
}

type ResponseErr = { status: "error"; message: string };

export const useLocationGenerate = (
  options?: UseMutationOptions<
    LocationGenerateResponse,
    ResponseErr,
    LocationGenerateParams
  >,
) => useMutation({ mutationFn: locationGenerate, ...options });
