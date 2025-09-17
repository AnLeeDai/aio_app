import { axiosAioApp, axiosTextGenerate } from "../axiosInstance";

export const namesGenerate = async (payload: {
  name_number: number;
  name_format: "first_last" | "first_middle_last";
  country: string;
  gender: "male" | "female";
  trans_ascii: boolean;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/names", payload);

  return data;
};

export const passwordGenerate = async (payload: {
  password_num: number;
  password_length: number;
  include_special_chars: boolean;
  is_uppercase: boolean;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/passwords", payload);

  return data;
};

export const emailEbayGenerate = async (payload: { email_num: number }) => {
  const { data } = await axiosAioApp.post("/api/generate/emails/ebay", payload);

  return data;
};

export const dobGenerate = async (payload: {
  dob_num: number;
  min_age: number;
  max_age: number;
  date_format: string;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/birthdays", payload);

  return data;
};

export const passportGenerate = async (payload: {
  id_number: number;
  country: string;
  prefix: string;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/passports", payload);

  return data;
};

export const passportExpireDateGenerate = async (payload: {
  date_number: number;
  country: string;
  format: string;
}) => {
  const { data } = await axiosAioApp.post(
    "/api/generate/passports/dates",
    payload,
  );

  return data;
};

export const ibanGenerate = async (payload: {
  iban_number: number;
  country: string;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/ibans", payload);

  return data;
};

export const locationGenerate = async (payload: {
  limit: number;
  country: string;
  trans_ascii: boolean;
}) => {
  const { data } = await axiosAioApp.post("/api/generate/locations", payload);

  return data;
};

export const passportMRZGenerate = async (payload: {
  given_names: string;
  surname: string;
  dob: string;
  sex: string;
  issuer: string;
  expiry: string;
  passport_num: string;
  nationality: string;
}) => {
  const { data } = await axiosAioApp.post(
    "/api/generate/passports/mrz",
    payload,
  );

  return data;
};

export const pactualBillGenerate = async (
  payload: Array<{
    filename: string;
    fullname: string;
    addressOne: string;
    addressTwo: string;
    accountNumber: string;
    totalOn: number;
  }>,
) => {
  const { data } = await axiosTextGenerate.post(
    "/api/pactual-bill/generate",
    payload,
  );

  return data;
};

export const banrisulBillGenerate = async (
  payload: Array<{
    filename: string;
    fullname: string;
    addressOne: string;
    addressTwo: string;
    accountNumber: string;
  }>,
) => {
  const { data } = await axiosTextGenerate.post(
    "/api/banrisul-bill/generate",
    payload,
  );

  return data;
};

export const brazilGasBillGenerate = async (
  payload: Array<{
    filename: string;
    fullName: string;
    fullAddress: string;
    accountNum: string;
    addressOne: string;
    addressTwo: string;
  }>,
) => {
  const { data } = await axiosTextGenerate.post(
    "/api/brazil-gas-bill/generate",
    payload,
  );

  return data;
};

export const brazilBillGenerate = async (
  payload: Array<{
    filename: string;
    fullName: string;
    addressOne: string;
    addressTwo: string;
    accountNum: string;
  }>,
) => {
  const { data } = await axiosTextGenerate.post(
    "/api/fake-brazil-bill/generate",
    payload,
  );

  return data;
};
