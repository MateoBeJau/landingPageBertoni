"use client";

import { useEffect, useMemo, useState } from "react";

/** Cantidad inicial y cada “cargar más” en grillas admin/panel (evita 50 `<img>` a la vez). */
export const PHOTO_GRID_PAGE_SIZE = 24;

type Orderable = { order?: number };

export function usePagedPhotos<T extends Orderable>(
  items: readonly T[] | undefined | null,
  resetKey: string,
  pageSize = PHOTO_GRID_PAGE_SIZE
) {
  const sorted = useMemo(() => {
    const list = items ? [...items] : [];
    list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return list;
  }, [items]);

  const [shown, setShown] = useState(pageSize);

  useEffect(() => {
    setShown(pageSize);
  }, [resetKey, pageSize]);

  const total = sorted.length;
  const visible = sorted.slice(0, shown);
  const hasMore = shown < total;

  const loadMore = () => {
    setShown((s) => Math.min(s + pageSize, total));
  };

  return {
    visible,
    total,
    hasMore,
    loadMore,
    shown,
  };
}
