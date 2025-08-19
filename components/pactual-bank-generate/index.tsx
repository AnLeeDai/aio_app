"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";

import { HistoryPactualBankGenerate } from "./history-pactual-bank-generate";
import { TablePactualBankGenerate } from "./table-pactual-bank-generate";

import { usePactualBillGenerate } from "@/hooks/use-pactual-bill-generate";

export default function PactutalBankGenerateContainer() {
  const initialData: any[] = [];
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const { handleSubmit: rhfHandleSubmit } = useForm();

  // Sử dụng hook gọi API
  const { mutate: pactualBillMutation, isPending } = usePactualBillGenerate({
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
      if (
        row.totalOn === undefined ||
        row.totalOn === null ||
        isNaN(row.totalOn)
      )
        err.totalOn = "Required";

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
    pactualBillMutation(formattedData);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Pactual Bank Generate</h2>

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

      <TablePactualBankGenerate data={data} errors={errors} setData={setData} />

      <HistoryPactualBankGenerate history={history} />
    </div>
  );
}
