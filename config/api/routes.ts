import { axiosInstance } from "../axiosInstance";

export const namesGenerate = async (payload: {
  name_number: number;
  name_format: "first_last" | "first_middle_last";
  country: string;
  gender: "male" | "female";
  trans_ascii: boolean;
}) => {
  const { data } = await axiosInstance.post("/api/names/generate", payload);

  return data;
};

export const passwordGenerate = async (payload: {
  password_num: number;
  password_length: number;
  include_special_chars: boolean;
  is_uppercase: boolean;
}) => {
  const { data } = await axiosInstance.post("/api/passwords/generate", payload);

  return data;
};
