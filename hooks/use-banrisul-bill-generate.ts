import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { banrisulBillGenerate } from "@/config/api/routes";

export interface BanrisulBill {
  filename: string;
  fullname: string;
  addressOne: string;
  addressTwo: string;
  accountNumber: string;
}

export interface BanrisulBillGenerateResponse {
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

export const useBanrisulBillGenerate = (
  options?: UseMutationOptions<
    BanrisulBillGenerateResponse,
    ResponseErr,
    BanrisulBill[]
  >,
) =>
  useMutation({
    mutationFn: banrisulBillGenerate,
    ...options,
  });
