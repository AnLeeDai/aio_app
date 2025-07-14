import { useCallback } from "react";
import { addToast } from "@heroui/react";

export function useCopyToClipboard(
  items: string[],
  selectedKeys: Set<string>,
  setSelectedKeys: (value: Set<string>) => void,
  itemLabel = "item"
) {
  const copy = useCallback(
    (list: string[]) => {
      navigator.clipboard
        .writeText(list.join("\n"))
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
        );
    },
    [itemLabel]
  );

  const copySelected = useCallback(() => {
    const list = items.filter((n) => selectedKeys.has(n));
    if (list.length === 0) {
      addToast({
        color: "warning",
        title: "Nothing selected",
        description: `Please choose at least one ${itemLabel}.`,
      });
      return;
    }
    copy(list);
  }, [items, selectedKeys, copy, itemLabel]);

  const copyAll = useCallback(() => {
    if (items.length === 0) {
      addToast({
        color: "warning",
        title: "Empty list",
        description: `There is no ${itemLabel} to copy.`,
      });
      return;
    }
    copy(items);
  }, [items, copy, itemLabel]);

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
