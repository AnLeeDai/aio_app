import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { NumericCellType } from "handsontable/cellTypes";

Handsontable.cellTypes.registerCellType(NumericCellType);

export const columns = [
  { data: "filename", type: "text", title: "Filename" },
  { data: "fullname", type: "text", title: "Full Name" },
  { data: "addressOne", type: "text", title: "Address One" },
  { data: "addressTwo", type: "text", title: "Address Two" },
  { data: "accountNumber", type: "text", title: "Account Number" },
  {
    data: "totalOn",
    type: "numeric",
    title: "Total On",
    numericFormat: { pattern: "0,0.00" },
    readOnly: true,
  },
];

export const colHeaders = columns.map((col) => col.title);

export function TablePactualBankGenerate({ data, setData, errors }: any) {
  // Hàm tính toán tự động random totalOn
  const autoFillTotalOn = (rows: any[]) => {
    return rows.map((row) => {
      if (
        row &&
        (row.filename?.trim() ||
          row.fullname?.trim() ||
          row.accountNumber?.trim())
      ) {
        const randomValue =
          Math.round((20000 + Math.random() * 30000) * 100) / 100;

        return { ...row, totalOn: randomValue };
      }

      return { ...row, totalOn: undefined };
    });
  };

  const handleTableChange = (changes: any, _source: string) => {
    if (!changes) return;
    setData((prev: any[]) => {
      const filled = autoFillTotalOn(prev);
      const isSame =
        filled.length === prev.length &&
        filled.every(
          (row, idx) => JSON.stringify(row) === JSON.stringify(prev[idx]),
        );

      if (isSame) return prev;

      return filled;
    });
  };

  return (
    <div className="relative">
      <HotTable
        afterChange={handleTableChange}
        cells={(row, col) => {
          const cellProperties: any = {};

          if (errors[row] && columns[col] && errors[row][columns[col].data]) {
            cellProperties.className = "htInvalid";
          }

          return cellProperties;
        }}
        className="w-full"
        colHeaders={colHeaders}
        columns={columns}
        data={data}
        licenseKey="non-commercial-and-evaluation"
        minSpareRows={3}
        rowHeaders={true}
        stretchH="all"
      />
    </div>
  );
}
