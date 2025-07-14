import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { passportExpireDateGenerate } from "@/config/api/routes";

export interface PassportExpireDateGenerateParams {
  date_number: number;
  country: string;
  format: string;
}

export interface PassportExpireDateGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const usePassportExpireDateGenerate = (
  options?: UseMutationOptions<
    PassportExpireDateGenerateResponse,
    ResponseErr,
    PassportExpireDateGenerateParams
  >,
) =>
  useMutation({
    mutationFn: passportExpireDateGenerate,
    ...options,
  });
