import { axiosInstance } from "../axiosInstance";

export interface NamesGeneratePayload {
  name_number: number;
  name_format: "first_last" | "first_middle_last";
  country: string;
  gender: "male" | "female";
  trans_ascii: boolean;
}

export const namesGenerate = async (payload: NamesGeneratePayload) => {
  const { data } = await axiosInstance.post("/api/names/generate", payload);

  return data;
};
