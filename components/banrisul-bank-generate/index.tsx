"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { NumericCellType } from "handsontable/cellTypes";

import { HistoryBanrisulBankGenerate } from "./history-banrisul-bank-generate";

import { useBanrisulBillGenerate } from "@/hooks/use-banrisul-bill-generate";

Handsontable.cellTypes.registerCellType(NumericCellType);

const columns = [
  { data: "filename", type: "text", title: "Filename" },
  { data: "fullname", type: "text", title: "Full Name" },
  { data: "addressOne", type: "text", title: "Address One" },
  { data: "addressTwo", type: "text", title: "Address Two" },
  { data: "accountNumber", type: "text", title: "Account Number" },
];

const colHeaders = columns.map((col) => col.title);

export default function BanrisulBankGenerateContainer() {
  const initialData: any[] = [];
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const { handleSubmit: rhfHandleSubmit } = useForm();

  // Sử dụng hook gọi API
  const { mutate, isPending } = useBanrisulBillGenerate({
    onSuccess: (result) => {
      setHistory((prev) => [
        {
          timestamp: result.timestamp,
          message: result.message,
          files: result.data.files,
          zip_download_url: result.data.zip_download_url,
        },
        ...prev,
      ]);
      // Hiển thị toast thành công
      addToast({
        color: "success",
        description: result.message,
      });
    },
    onError: (err: any) => {
      addToast({
        color: "danger",
        description: err?.message || "Có lỗi xảy ra!",
      });
    },
  });

  const validateRows = (rows: any[]) => {
    const rowErrors = rows.map((row) => {
      const err: any = {};

      if (!row.filename?.trim()) err.filename = "Required";
      if (!row.fullname?.trim()) err.fullname = "Required";
      if (!row.addressOne?.trim()) err.addressOne = "Required";
      if (!row.addressTwo?.trim()) err.addressTwo = "Required";
      if (!row.accountNumber?.trim()) err.accountNumber = "Required";

      return err;
    });

    return rowErrors;
  };

  const handleReset = () => {
    setData([...initialData]);
  };

  const onSubmit = () => {
    const filteredData = data.filter(
      (row) =>
        row &&
        (row.filename?.trim() ||
          row.fullname?.trim() ||
          row.accountNumber?.trim()),
    );

    // Nếu không có dòng nào hợp lệ thì không submit
    if (filteredData.length === 0) {
      addToast({
        color: "warning",
        description: "Vui lòng nhập ít nhất một dòng dữ liệu!",
      });

      return;
    }

    const rowErrors = validateRows(filteredData);

    const hasError = rowErrors.some((err) => Object.keys(err).length > 0);

    setErrors(rowErrors);

    if (hasError) {
      addToast({
        color: "warning",
        description: "Vui lòng nhập đầy đủ thông tin các dòng!",
      });

      return;
    }

    const formattedData = filteredData.map((row) => ({
      ...row,
      totalOn:
        typeof row.totalOn === "number"
          ? Number(row.totalOn.toFixed(2))
          : row.totalOn,
    }));

    // Gọi API qua hook
    mutate(formattedData);
  };

  const handleTableChange = (changes: any, _source: string) => {
    if (!changes) return;
    setData([...data]);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Banrisul Bank Generate</h2>

      <div className="flex gap-3 mb-3">
        <Button
          fullWidth
          color="primary"
          isLoading={isPending}
          onPress={() => rhfHandleSubmit(onSubmit)()}
        >
          Submit
        </Button>
        <Button fullWidth color="secondary" onPress={handleReset}>
          Reset
        </Button>
      </div>

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

      <HistoryBanrisulBankGenerate history={history} />
    </div>
  );
}
