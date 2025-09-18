"use client";

import { Button, ScrollShadow } from "@heroui/react";
import {
  IconClipboardListFilled,
  IconClipboardXFilled,
  IconClipboardCheckFilled,
} from "@tabler/icons-react";

import { useI18n } from "@/i18n";

export interface GroupButtonCopyProps {
  /** Tổng số phần tử trong danh sách (để ẩn nút khi rỗng) */
  totalCount: number;
  /** Số phần tử đang được chọn */
  selectedCount: number;
  /** Sao chép các item đã chọn */
  onCopySelected: () => void;
  /** Sao chép toàn bộ danh sách */
  onCopyAll: () => void;
  /** Xóa selection hiện tại */
  onResetSelection: () => void;
}

export default function GroupButtonCopy({
  totalCount,
  selectedCount,
  onCopySelected,
  onCopyAll,
  onResetSelection,
}: GroupButtonCopyProps) {
  const { t } = useI18n();

  if (totalCount === 0) return null;

  return (
    <ScrollShadow
      hideScrollBar
      className="flex items-center justify-end w-full"
      orientation="horizontal"
    >
      <div className="flex gap-2 items-center">
        <Button
          color="default"
          isDisabled={selectedCount === 0}
          startContent={<IconClipboardListFilled size={22} />}
          onPress={onCopySelected}
        >
          {t("copy.copySelected", { count: selectedCount })}
        </Button>

        {selectedCount > 0 && (
          <Button
            color="danger"
            startContent={<IconClipboardXFilled size={22} />}
            onPress={onResetSelection}
          >
            {t("copy.removeSelected", { count: selectedCount })}
          </Button>
        )}

        <Button
          color="secondary"
          startContent={<IconClipboardCheckFilled size={22} />}
          onPress={onCopyAll}
        >
          {t("copy.copyAll")}
        </Button>
      </div>
    </ScrollShadow>
  );
}
