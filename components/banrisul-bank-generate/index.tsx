"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import Handsontable from "handsontable";
import { NumericCellType } from "handsontable/cellTypes";

import { HistoryBanrisulBankGenerate } from "./history-banrisul-bank-generate";
import { TableBanrisulBankGenerate } from "./table-banrisul-bank-generate";

import { useBanrisulBillGenerate } from "@/hooks/use-banrisul-bill-generate";
import { useI18n } from "@/i18n";

Handsontable.cellTypes.registerCellType(NumericCellType);

export default function BanrisulBankGenerateContainer() {
  const { t } = useI18n();
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
        description: err?.message || t("toasts.error.title"),
      });
    },
  });

  const validateRows = (rows: any[]) => {
    const rowErrors = rows.map((row) => {
      const err: any = {};

      if (!row.filename?.trim()) err.filename = t("validation.required");
      if (!row.fullname?.trim()) err.fullname = t("validation.required");
      if (!row.addressOne?.trim()) err.addressOne = t("validation.required");
      if (!row.addressTwo?.trim()) err.addressTwo = t("validation.required");
      if (!row.accountNumber?.trim())
        err.accountNumber = t("validation.required");

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
        description: t("bank.common.enterAtLeastOneRow"),
      });

      return;
    }

    const rowErrors = validateRows(filteredData);

    const hasError = rowErrors.some((err) => Object.keys(err).length > 0);

    setErrors(rowErrors);

    if (hasError) {
      addToast({
        color: "warning",
        description: t("bank.common.fillAllRows"),
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

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{t("bank.banrisul.title")}</h2>

      <div className="flex gap-3 mb-3">
        <Button
          fullWidth
          color="primary"
          isLoading={isPending}
          onPress={() => rhfHandleSubmit(onSubmit)()}
        >
          {t("common.submit")}
        </Button>
        <Button fullWidth color="secondary" onPress={handleReset}>
          {t("common.reset")}
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
