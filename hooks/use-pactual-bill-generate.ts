import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { pactualBillGenerate } from "@/config/api/routes";

export interface PactualBill {
  filename: string;
  fullname: string;
  addressOne: string;
  addressTwo: string;
  accountNumber: string;
  totalOn: number;
}

export interface PactualBillGenerateResponse {
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

export const usePactualBillGenerate = (
  options?: UseMutationOptions<
    PactualBillGenerateResponse,
    ResponseErr,
    PactualBill[]
  >,
) =>
  useMutation({
    mutationFn: pactualBillGenerate,
    ...options,
  });
