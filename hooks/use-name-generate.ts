import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { namesGenerate } from "@/config/api/routes";

export interface NamesGenerateParams {
  name_number: number;
  name_format: "first_last" | "first_middle_last";
  country: string;
  gender: "male" | "female";
  trans_ascii: boolean;
}

export interface NamesGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const useNamesGenerate = (
  options?: UseMutationOptions<
    NamesGenerateResponse,
    ResponseErr,
    NamesGenerateParams
  >
) =>
  useMutation({
    mutationFn: namesGenerate,
    ...options,
  });
