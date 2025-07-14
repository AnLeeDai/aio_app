import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { passportGenerate } from "@/config/api/routes";

export interface PassportGenerateParams {
  id_number: number;
  country: string;
  prefix: string;
}

export interface PassportGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const usePassportGenerate = (
  options?: UseMutationOptions<
    PassportGenerateResponse,
    ResponseErr,
    PassportGenerateParams
  >,
) =>
  useMutation({
    mutationFn: passportGenerate,
    ...options,
  });
