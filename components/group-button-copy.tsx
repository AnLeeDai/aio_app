"use client";

import { Button, ScrollShadow } from "@heroui/react";
import {
  IconClipboardListFilled,
  IconClipboardXFilled,
  IconClipboardCheckFilled,
} from "@tabler/icons-react";

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
  if (totalCount === 0) return null;

  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className="flex items-center justify-end w-full bg-background/70 backdrop-blur-sm py-2"
    >
      <div className="flex gap-2 items-center">
        <Button
          color="default"
          startContent={<IconClipboardListFilled size={22} />}
          onPress={onCopySelected}
          isDisabled={selectedCount === 0}
        >
          Copy&nbsp;{selectedCount}&nbsp;Selected
        </Button>

        {selectedCount > 0 && (
          <Button
            color="danger"
            startContent={<IconClipboardXFilled size={22} />}
            onPress={onResetSelection}
          >
            Remove&nbsp;{selectedCount}&nbsp;Selected
          </Button>
        )}

        <Button
          color="secondary"
          startContent={<IconClipboardCheckFilled size={22} />}
          onPress={onCopyAll}
        >
          Copy&nbsp;All
        </Button>
      </div>
    </ScrollShadow>
  );
}
