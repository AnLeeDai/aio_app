export const COUNTRY_OPTIONS = [
  { key: "US", label: "US" },
  { key: "BR", label: "BR" },
];

export const DATE_FORMAT_OPTIONS = [
  /* Châu Âu / VN */
  { key: "d/m/Y", label: "DD/MM/YYYY  →  31/12/1990" },
  { key: "d-m-Y", label: "DD-MM-YYYY  →  31-12-1990" },

  /* Mỹ */
  { key: "m/d/Y", label: "MM/DD/YYYY  →  12/31/1990" },
  { key: "m-d-Y", label: "MM-DD-YYYY  →  12-31-1990" },

  /* ISO / kỹ thuật */
  { key: "Y-m-d", label: "YYYY-MM-DD  →  1990-12-31" },
  { key: "Y/m/d", label: "YYYY/MM/DD  →  1990/12/31" },

  /* Dạng rút gọn 2 số năm */
  { key: "d/m/y", label: "DD/MM/YY    →  31/12/90" },

  /* Tháng tên đầy đủ / rút gọn */
  { key: "j F Y", label: "D Month YYYY →  31 December 1990" },
  { key: "F j, Y", label: "Month D, YYYY →  December 31, 1990" },
  { key: "M j, Y", label: "Mon D, YYYY   →  Dec 31, 1990" },
];
