import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { NumericCellType } from "handsontable/cellTypes";

Handsontable.cellTypes.registerCellType(NumericCellType);

export const columns = [
  { data: "filename", type: "text", title: "Filename" },
  { data: "fullName", type: "text", title: "Full Name" },
  { data: "fullAddress", type: "text", title: "Full Address" },
  { data: "addressOne", type: "text", title: "Address One" },
  { data: "addressTwo", type: "text", title: "Address Two" },
  { data: "accountNum", type: "text", title: "Account Number" },
];

export const colHeaders = columns.map((col) => col.title);

export function TableBrazilGasBillGenerate({ data, setData, errors }: any) {
  const handleTableChange = (changes: any, _source: string) => {
    if (!changes) return;
    setData([...data]);
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
