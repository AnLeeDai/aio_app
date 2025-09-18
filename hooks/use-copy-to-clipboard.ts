import { useCallback } from "react";
import { addToast } from "@heroui/react";

import { useI18n } from "@/i18n";

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
  itemLabel = "item",
) {
  const { t } = useI18n();

  const items: CopyItem[] = (() => {
    const seen = new Map<string, number>();

    return rawItems.map((it, idx) => {
      if (typeof it === "string") {
        const base = it;
        const dup = seen.get(base) ?? 0;

        seen.set(base, dup + 1);
        const id = dup === 0 ? base : `${base}-${idx}`;

        return { id, label: it };
      }

      return it;
    });
  })();

  const copyRaw = useCallback(
    (list: string[]) =>
      navigator.clipboard
        .writeText(list.join("\n"))
        .then(() =>
          addToast({
            color: "success",
            title: t("toasts.copied.title"),
            description: t("toasts.copied.desc", {
              count: list.length,
              item: itemLabel,
            }),
          }),
        )
        .catch(() =>
          addToast({
            color: "warning",
            title: t("toasts.copyFailed.title"),
            description: t("toasts.copyFailed.desc"),
          }),
        ),
    [itemLabel, t],
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
        title: t("toasts.nothingSelected.title"),
        description: t("toasts.nothingSelected.desc", { item: itemLabel }),
      });

      return;
    }
    copyRaw(list);
  }, [selectedKeys, copyRaw, itemLabel, t]);

  /* Copy All ---------------------------------------------------- */
  const copyAll = useCallback(() => {
    if (!items.length) {
      addToast({
        color: "warning",
        title: t("toasts.emptyList.title"),
        description: t("toasts.emptyList.desc", { item: itemLabel }),
      });

      return;
    }
    copyRaw(buildList());
  }, [items, copyRaw, itemLabel, t]);

  /* Reset selection -------------------------------------------- */
  const resetSelection = useCallback(() => {
    setSelectedKeys(new Set());
    addToast({
      color: "success",
      title: t("toasts.selectionReset.title"),
      description: t("toasts.selectionReset.desc"),
    });
  }, [setSelectedKeys, t]);

  return { copySelected, copyAll, resetSelection };
}
