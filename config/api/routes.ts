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

export const dobGenerate = async (payload: {
  dob_num: number;
  min_age: number;
  max_age: number;
  date_format: string;
}) => {
  const { data } = await axiosInstance.post("/api/birthdays/generate", payload);

  return data;
};

export const passportGenerate = async (payload: {
  id_number: number;
  country: string;
  prefix: string;
}) => {
  const { data } = await axiosInstance.post("/api/passports/generate", payload);

  return data;
};

export const passportExpireDateGenerate = async (payload: {
  date_number: number;
  country: string;
  format: string;
}) => {
  const { data } = await axiosInstance.post(
    "/api/passports/generate/date",
    payload
  );

  return data;
};
