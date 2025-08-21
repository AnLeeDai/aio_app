"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import Handsontable from "handsontable";
import { NumericCellType } from "handsontable/cellTypes";

import { HistoryBanrisulBankGenerate } from "./history-brazil-bill-generate";
import { TableBanrisulBankGenerate } from "./table-brazil-bill-generate";

import { useBrazilBillGenerate } from "@/hooks/use-brazil-bill-generate";

Handsontable.cellTypes.registerCellType(NumericCellType);

export default function BrazilBillGenerateContainer() {
  const initialData: any[] = [];
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const { handleSubmit: rhfHandleSubmit } = useForm();

  // Đổi hook gọi API sang BrazilBill
  const { mutate, isPending } = useBrazilBillGenerate({
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
      if (!row.fullName?.trim()) err.fullName = "Required";
      if (!row.addressOne?.trim()) err.addressOne = "Required";
      if (!row.addressTwo?.trim()) err.addressTwo = "Required";
      if (!row.accountNum?.trim()) err.accountNum = "Required";

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
          row.fullName?.trim() ||
          row.accountNum?.trim()),
    );

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

    // Không cần format totalOn cho BrazilBill
    mutate(filteredData);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Brazil Bill Generate</h2>

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

      <TableBanrisulBankGenerate
        data={data}
        errors={errors}
        setData={setData}
      />

      <HistoryBanrisulBankGenerate history={history} />
    </div>
  );
}
