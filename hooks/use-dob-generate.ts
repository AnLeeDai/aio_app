import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { dobGenerate } from "@/config/api/routes";

export interface DOBGenerateParams {
  dob_num: number;
  min_age: number;
  max_age: number;
  date_format: string;
}

export interface DOBGenerateResponse {
  message: string;
  data: string[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const useDOBGenerate = (
  options?: UseMutationOptions<
    DOBGenerateResponse,
    ResponseErr,
    DOBGenerateParams
  >,
) =>
  useMutation({
    mutationFn: dobGenerate,
    ...options,
  });
