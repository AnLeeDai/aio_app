import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { passwordGenerate } from "@/config/api/routes";

export interface PasswordGenerateParams {
  password_num: number;
  password_length: number;
  include_special_chars: boolean;
  is_uppercase: boolean;
}

export interface PasswordGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const usePasswordGenerate = (
  options?: UseMutationOptions<
    PasswordGenerateResponse,
    ResponseErr,
    PasswordGenerateParams
  >,
) =>
  useMutation({
    mutationFn: passwordGenerate,
    ...options,
  });
