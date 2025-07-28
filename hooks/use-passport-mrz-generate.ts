import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { passportMRZGenerate } from "@/config/api/routes";

export interface PassportMRZGParams {
  given_names: string;
  surname: string;
  dob: string;
  sex: string;
  issuer: string;
  expiry: string;
  passport_num: string;
  nationality: string;
}

export interface MRZGeneratedRow {
  input: {
    given_names: string;
    surname: string;
    dob: string;
    sex: string;
    issuer: string;
    expiry: string;
    passport_num: string;
    nationality: string;
  };
  mrz: string[];
}

export interface PassportMRZGResponse {
  message: string;
  data: MRZGeneratedRow[];
}

type ResponseErr = {
  status: "error";
  message: string;
};

export const usePassportMRZGenerate = (
  options?: UseMutationOptions<
    PassportMRZGResponse,
    ResponseErr,
    PassportMRZGParams
  >,
) =>
  useMutation({
    mutationFn: passportMRZGenerate,
    ...options,
  });
