"use client";

import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { useState } from "react";
import { Button } from "@heroui/react";

registerAllModules();

// Hàm tách tên → { given, surname }
function splitName(full: string) {
  const parts = full.trim().split(/\s+/); // dùng split + regex :contentReference[oaicite:0]{index=0}
  const surname = parts.pop() ?? ""; // lấy từ cuối cùng :contentReference[oaicite:1]{index=1}
  const given = parts.join(" "); // ghép phần còn lại

  return { given, surname };
}

const defaultData = [
  {
    subtype: "",
    given_names: "",
    surname: "",
    dob: "",
    sex: "",
    issuer: "",
    expiry: "",
    passport_num: "",
    personal_num: "",
    nationality: "BRA",
  },
];

const columns = [
  { data: "subtype", title: "Subtype" },
  { data: "given_names", title: "Given Names" },
  { data: "surname", title: "Surname" },
  {
    data: "dob",
    title: "Date of Birth",
    type: "date",
    dateFormat: "YYYY-MM-DD",
  },
  { data: "sex", title: "Sex", type: "dropdown", source: ["M", "F"] },
  { data: "issuer", title: "Issuer" },
  { data: "expiry", title: "Expiry", type: "date", dateFormat: "YYYY-MM-DD" },
  { data: "passport_num", title: "Passport Number" },
  { data: "personal_num", title: "Personal Number" },
  { data: "nationality", title: "Nationality" },
];

export default function PassportMRZContainer() {
  const [data, setData] = useState(defaultData);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Passport MRZ Sheet</h2>

      <Button
        fullWidth
        variant="solid"
        onClick={() => {
          console.log("Submitted data:", data);
        }}
      >
        Submit
      </Button>

      <HotTable
        rowHeaders
        afterChange={(changes, source) => {
          if (source === "loadData" || !changes) return;

          setData((old) => {
            const updated = [...old];

            changes.forEach(([row, prop, , newVal]) => {
              // Nếu cột vừa sửa là given_names
              if (prop === "given_names" && typeof newVal === "string") {
                const { given, surname } = splitName(newVal);

                updated[row].given_names = given;
                updated[row].surname = surname;
              } else {
                // xử lý cập nhật bình thường
                updated[row][prop as keyof (typeof updated)[number]] = newVal;
              }
            });

            return updated;
          });
        }}
        colHeaders={columns.map((c) => c.title)}
        columns={columns}
        data={data}
        licenseKey="non-commercial-and-evaluation"
        stretchH="all"
        width="100%"
      />
    </div>
  );
}
