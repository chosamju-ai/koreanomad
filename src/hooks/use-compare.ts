"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const MAX_COMPARE = 3;

export function useCompare() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const compareSlugs = useMemo(
    () => searchParams.get("compare")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  const addToCompare = useCallback(
    (citySlug: string) => {
      if (compareSlugs.includes(citySlug)) return;

      if (compareSlugs.length >= MAX_COMPARE) {
        return false;
      }

      const updated = [...compareSlugs, citySlug];
      const params = new URLSearchParams(searchParams.toString());
      params.set("compare", updated.join(","));
      router.push(`?${params.toString()}`, { scroll: false });
      return true;
    },
    [compareSlugs, searchParams, router]
  );

  const removeFromCompare = useCallback(
    (citySlug: string) => {
      const updated = compareSlugs.filter((slug) => slug !== citySlug);
      const params = new URLSearchParams(searchParams.toString());

      if (updated.length === 0) {
        params.delete("compare");
      } else {
        params.set("compare", updated.join(","));
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [compareSlugs, searchParams, router]
  );

  const clearCompare = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("compare");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const isInCompare = useCallback(
    (citySlug: string) => {
      return compareSlugs.includes(citySlug);
    },
    [compareSlugs]
  );

  return {
    compareSlugs,
    compareCount: compareSlugs.length,
    isInCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    canAddMore: compareSlugs.length < MAX_COMPARE,
  };
}
