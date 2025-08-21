import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { brazilBillGenerate } from "@/config/api/routes";

export interface BrazilBill {
  filename: string;
  fullName: string;
  addressOne: string;
  addressTwo: string;
  accountNum: string;
}

export interface BrazilBillGenerateResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    failures: any[];
    zip_download_url: string;
    files: Array<{
      file: string;
      file_url: string;
    }>;
  };
  timestamp: string;
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const useBrazilBillGenerate = (
  options?: UseMutationOptions<
    BrazilBillGenerateResponse,
    ResponseErr,
    BrazilBill[]
  >,
) =>
  useMutation({
    mutationFn: brazilBillGenerate,
    ...options,
  });
