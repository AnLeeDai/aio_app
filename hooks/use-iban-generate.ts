import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ibanGenerate } from "@/config/api/routes";

export interface IBANGenerateParams {
  iban_number: number;
  country: string;
}

export interface IBANGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const useIBANGenerate = (
  options?: UseMutationOptions<
    IBANGenerateResponse,
    ResponseErr,
    IBANGenerateParams
  >,
) =>
  useMutation({
    mutationFn: ibanGenerate,
    ...options,
  });
