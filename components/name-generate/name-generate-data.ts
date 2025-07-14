export const LOCALE_OPTIONS = [
  { key: "BR", label: "Brazil (BR)" },
  { key: "US", label: "United States (US)" },
  { key: "UK", label: "United Kingdom (UK)" },
  { key: "VN", label: "Vietnam (VN)" },
  { key: "DE", label: "Germany (DE)" },
  { key: "FR", label: "France (FR)" },
  { key: "JP", label: "Japan (JP)" },
  { key: "ES", label: "Spain (ES)" },
  { key: "IT", label: "Italy (IT)" },
  { key: "RU", label: "Russia (RU)" },
  { key: "CN", label: "China (CN)" },
  { key: "KR", label: "South Korea (KR)" },
];

export const NAME_FORMAT_OPTIONS = [
  { key: "first_last", label: "First Last" },
  { key: "first_middle_last", label: "First Middle Last" },
];

export const GENDER_OPTIONS = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export const TRANS_ASCII_OPTIONS = [
  { key: "true", label: "Yes" },
  { key: "false", label: "No" },
];

export const FakeNameList = Array.from(
  { length: 100 },
  (_, i) => `Name ${i + 1}`
);
