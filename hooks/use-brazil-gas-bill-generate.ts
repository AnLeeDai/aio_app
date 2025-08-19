import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { brazilGasBillGenerate } from "@/config/api/routes";

export interface BrazilGasBill {
  filename: string;
  fullName: string;
  fullAddress: string;
  accountNum: string;
  addressOne: string;
  addressTwo: string;
}

export interface BrazilGasBillGenerateResponse {
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

export const useBrazilGasBillGenerate = (
  options?: UseMutationOptions<
    BrazilGasBillGenerateResponse,
    ResponseErr,
    BrazilGasBill[]
  >,
) =>
  useMutation({
    mutationFn: brazilGasBillGenerate,
    ...options,
  });
