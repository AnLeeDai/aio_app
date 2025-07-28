"use client";

import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { useState } from "react";
import { Button } from "@heroui/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  MRZGeneratedRow,
  PassportMRZGResponse,
  usePassportMRZGenerate,
} from "@/hooks/use-passport-mrz-generate";

dayjs.extend(customParseFormat);
registerAllModules();

/* ---------- helpers ---------- */
function splitName(full: string) {
  const parts = full.trim().split(/\s+/);

  return { surname: parts.pop() ?? "", given: parts.join(" ") };
}
function normalizeDate(str: string) {
  const formats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "DD-MM-YYYY"];
  const parsed = dayjs(str.trim(), formats, true);

  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : str;
}
function isFilledRow(row: any) {
  const ignore = new Set(["mrz", "issuer", "nationality"]);

  return Object.entries(row).some(
    ([k, v]) => !ignore.has(k) && String(v ?? "").trim() !== "",
  );
}
function unwrap(res: PassportMRZGResponse): MRZGeneratedRow[] {
  return Array.isArray(res) ? res : res.mrz;
}

const baseColumns = [
  { data: "given_names", title: "Given Names" },
  { data: "surname", title: "Surname" },
  {
    data: "dob",
    title: "Date of Birth",
    type: "date",
    dateFormat: "YYYY-MM-DD",
    correctFormat: true,
  },
  { data: "sex", title: "Sex", type: "dropdown", source: ["M", "F"] },
  { data: "issuer", title: "Issuer" },
  {
    data: "expiry",
    title: "Expiry",
    type: "date",
    dateFormat: "YYYY-MM-DD",
    correctFormat: true,
  },
  { data: "passport_num", title: "Passport Number" },
  { data: "nationality", title: "Nationality" },
  { data: "mrz", title: "MRZ", readOnly: true },
];

/* ---------- component ---------- */
export default function PassportMRZContainer() {
  const [data, setData] = useState([
    {
      given_names: "",
      surname: "",
      dob: "",
      sex: "",
      issuer: "BRA",
      expiry: "",
      passport_num: "",
      nationality: "BRA",
      mrz: "",
    },
  ]);
  const [cols] = useState(baseColumns);

  const { mutate, isPending } = usePassportMRZGenerate({
    onSuccess: (res) => {
      const rows = unwrap(res);

      setData((prev) => {
        const next = [...prev];

        rows.forEach((row, idx) => {
          const mrzText = row.mrz.join("\n");

          if (next[idx]) next[idx].mrz = mrzText;
          else next.push({ ...row.input, mrz: mrzText });
        });

        return next;
      });
    },

    onError: () => {},
  });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Passport MRZ Sheet</h2>

      <Button
        fullWidth
        disabled={isPending}
        variant="solid"
        onPress={() => {
          const rowsToSend = data.filter(isFilledRow);

          if (rowsToSend.length) mutate(rowsToSend as any);
        }}
      >
        {isPending ? "Generating…" : "Submit"}
      </Button>

      <HotTable
        rowHeaders
        afterChange={(changes, source) => {
          if (source === "loadData" || !changes) return;
          setData((prev) => {
            const copy = [...prev];

            changes.forEach(([row, prop, , newVal]) => {
              if (prop === "given_names") {
                const { given, surname } = splitName(String(newVal));

                copy[row].given_names = given;
                copy[row].surname = surname;
              } else {
                (copy[row] as any)[prop as string] = newVal;
              }
              if (prop !== "mrz") copy[row].mrz = "";
            });

            return copy;
          });
        }}
        beforePaste={(data, coords) => {
          data.forEach((row) => {
            row.forEach((val, i) => {
              const colIndex = coords[0].startCol + i;
              const colDef = cols[colIndex];

              if (colDef?.type === "date") row[i] = normalizeDate(String(val));
            });
          });
        }}
        colHeaders={cols.map((c) => c.title)}
        columns={cols}
        copyPaste={true}
        data={data}
        licenseKey="non-commercial-and-evaluation"
        minSpareRows={1}
        stretchH="all"
        width="100%"
      />
    </div>
  );
}
