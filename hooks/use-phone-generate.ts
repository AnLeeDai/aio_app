import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { phoneNumberGenerate } from "@/config/api/routes";

export interface PhoneGenerateParams {
  phone_number: number;
  country: string; // restricted to BR, PE, MY, CO, JM, CL via UI
  strip_cc: boolean; // whether to remove country code from output
}

export interface PhoneGenerateResponse {
  message: string;
  data: string[];
}

interface ResponseErr {
  status: "error";
  message: string;
}

export const usePhoneGenerate = (
  options?: UseMutationOptions<
    PhoneGenerateResponse,
    ResponseErr,
    PhoneGenerateParams
  >,
) =>
  useMutation({
    mutationFn: phoneNumberGenerate,
    ...options,
  });
