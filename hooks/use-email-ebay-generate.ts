import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { emailEbayGenerate } from "@/config/api/routes";

export interface EmailEbayGenerateParams {
  email_num: number;
}

export interface EbayEmailItem {
  full_name: string;
  // email format: "<email>|<password>"
  email: string;
}

export interface EmailEbayGenerateResponse {
  message: string;
  data: EbayEmailItem[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const useEmailEbayGenerate = (
  options?: UseMutationOptions<
    EmailEbayGenerateResponse,
    ResponseErr,
    EmailEbayGenerateParams
  >,
) =>
  useMutation({
    mutationFn: emailEbayGenerate,
    ...options,
  });
