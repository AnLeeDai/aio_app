import { useCallback } from "react";
import { addToast } from "@heroui/react";

export interface CopyItem {
  id: string;
  label: string;
  value?: string;
}

type ItemInput = string | CopyItem;

export function useCopyToClipboard(
  rawItems: ItemInput[],
  selectedKeys: Set<string>,
  setSelectedKeys: (v: Set<string>) => void,
  itemLabel = "item"
) {
  const items: CopyItem[] = (() => {
    const seen = new Map<string, number>(); // chống trùng key khi dùng string[]
    return rawItems.map((it, idx) => {
      if (typeof it === "string") {
        const base = it;
        const dup = seen.get(base) ?? 0;
        seen.set(base, dup + 1);
        const id = dup === 0 ? base : `${base}-${idx}`; // đảm bảo unique
        return { id, label: it };
      }
      return it;
    });
  })();

  /* Thao tác copy thuần --------------------------------------- */
  const copyRaw = useCallback(
    (list: string[]) =>
      navigator.clipboard
        .writeText(list.join("\n")) // newline = dòng mới (Google Sheets hiểu)
        .then(() =>
          addToast({
            color: "success",
            title: "Copied!",
            description: `Copied ${list.length} ${itemLabel}${
              list.length > 1 ? "s" : ""
            }.`,
          })
        )
        .catch(() =>
          addToast({
            color: "warning",
            title: "Copy failed",
            description: "Your browser blocked clipboard access.",
          })
        ),
    [itemLabel]
  );

  /* Helpers ----------------------------------------------------- */
  const buildList = (filter?: Set<string>) =>
    items
      .filter((i) => !filter || filter.has(i.id))
      .map((i) => i.value ?? i.label);

  /* Copy Selected ---------------------------------------------- */
  const copySelected = useCallback(() => {
    const list = buildList(selectedKeys);
    if (!list.length) {
      addToast({
        color: "warning",
        title: "Nothing selected",
        description: `Please choose at least one ${itemLabel}.`,
      });
      return;
    }
    copyRaw(list);
  }, [selectedKeys, copyRaw, itemLabel]);

  /* Copy All ---------------------------------------------------- */
  const copyAll = useCallback(() => {
    if (!items.length) {
      addToast({
        color: "warning",
        title: "Empty list",
        description: `There is no ${itemLabel} to copy.`,
      });
      return;
    }
    copyRaw(buildList());
  }, [items, copyRaw, itemLabel]);

  /* Reset selection -------------------------------------------- */
  const resetSelection = useCallback(() => {
    setSelectedKeys(new Set());
    addToast({
      color: "success",
      title: "Selection reset",
      description: "All selections have been cleared.",
    });
  }, [setSelectedKeys]);

  return { copySelected, copyAll, resetSelection };
}
