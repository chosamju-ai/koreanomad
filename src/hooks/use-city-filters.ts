"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export type SortOption =
  | "popular"
  | "rating"
  | "cost-low"
  | "cost-high"
  | "internet";

export type RegionFilter =
  | "seoul"
  | "busan"
  | "jeju"
  | "gangwon"
  | "jeonbuk"
  | "daejeon";

export type InternetSpeedFilter = "under-200" | "200-500" | "over-500";

export type CostFilter = "under-100" | "100-150" | "over-150";

export type RatingFilter = "over-4.0" | "over-4.5";

export type TransportFilter = "excellent" | "good" | "average";

export interface CityFilters {
  search: string;
  sort: SortOption;
  regions: RegionFilter[];
  internetSpeed: InternetSpeedFilter[];
  cost: CostFilter[];
  rating: RatingFilter[];
  transport: TransportFilter[];
}

export interface ActiveFilter {
  key: string;
  label: string;
  category: keyof CityFilters;
  value: string;
}

export function useCityFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current filters from URL
  const filters: CityFilters = useMemo(() => {
    const search = searchParams.get("search") || "";
    const sort = (searchParams.get("sort") as SortOption) || "popular";
    const regions = (searchParams.get("regions")?.split(",").filter(Boolean) ||
      []) as RegionFilter[];
    const internetSpeed = (searchParams
      .get("internetSpeed")
      ?.split(",")
      .filter(Boolean) || []) as InternetSpeedFilter[];
    const cost = (searchParams.get("cost")?.split(",").filter(Boolean) ||
      []) as CostFilter[];
    const rating = (searchParams.get("rating")?.split(",").filter(Boolean) ||
      []) as RatingFilter[];
    const transport = (searchParams
      .get("transport")
      ?.split(",")
      .filter(Boolean) || []) as TransportFilter[];

    return {
      search,
      sort,
      regions,
      internetSpeed,
      cost,
      rating,
      transport,
    };
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<CityFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update each filter
      Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          } else {
            params.delete(key);
          }
        } else if (value) {
          if (key === "sort" && value === "popular") {
            params.delete(key); // Default value
          } else if (key === "search" && value === "") {
            params.delete(key);
          } else {
            params.set(key, value);
          }
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [filters, pathname, router, searchParams]
  );

  // Update search term
  const setSearch = useCallback(
    (search: string) => {
      updateFilters({ search });
    },
    [updateFilters]
  );

  // Update sort option
  const setSort = useCallback(
    (sort: SortOption) => {
      updateFilters({ sort });
    },
    [updateFilters]
  );

  // Toggle region filter
  const toggleRegion = useCallback(
    (region: RegionFilter) => {
      const regions = filters.regions.includes(region)
        ? filters.regions.filter((r) => r !== region)
        : [...filters.regions, region];
      updateFilters({ regions });
    },
    [filters.regions, updateFilters]
  );

  // Toggle internet speed filter
  const toggleInternetSpeed = useCallback(
    (speed: InternetSpeedFilter) => {
      const internetSpeed = filters.internetSpeed.includes(speed)
        ? filters.internetSpeed.filter((s) => s !== speed)
        : [...filters.internetSpeed, speed];
      updateFilters({ internetSpeed });
    },
    [filters.internetSpeed, updateFilters]
  );

  // Toggle cost filter
  const toggleCost = useCallback(
    (costRange: CostFilter) => {
      const cost = filters.cost.includes(costRange)
        ? filters.cost.filter((c) => c !== costRange)
        : [...filters.cost, costRange];
      updateFilters({ cost });
    },
    [filters.cost, updateFilters]
  );

  // Toggle rating filter
  const toggleRating = useCallback(
    (ratingThreshold: RatingFilter) => {
      const rating = filters.rating.includes(ratingThreshold)
        ? filters.rating.filter((r) => r !== ratingThreshold)
        : [...filters.rating, ratingThreshold];
      updateFilters({ rating });
    },
    [filters.rating, updateFilters]
  );

  // Toggle transport filter
  const toggleTransport = useCallback(
    (transportType: TransportFilter) => {
      const transport = filters.transport.includes(transportType)
        ? filters.transport.filter((t) => t !== transportType)
        : [...filters.transport, transportType];
      updateFilters({ transport });
    },
    [filters.transport, updateFilters]
  );

  // Remove specific filter
  const removeFilter = useCallback(
    (category: keyof CityFilters, value: string) => {
      if (category === "search") {
        setSearch("");
      } else if (category === "sort") {
        setSort("popular");
      } else if (Array.isArray(filters[category])) {
        const updated = (filters[category] as string[]).filter(
          (v) => v !== value
        );
        updateFilters({ [category]: updated });
      }
    },
    [filters, setSearch, setSort, updateFilters]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  // Get active filters as tags
  const activeFilters = useMemo((): ActiveFilter[] => {
    const result: ActiveFilter[] = [];

    // Search filter
    if (filters.search) {
      result.push({
        key: "search",
        label: `"${filters.search}"`,
        category: "search",
        value: filters.search,
      });
    }

    // Region filters
    const regionLabels: Record<RegionFilter, string> = {
      seoul: "서울",
      busan: "부산",
      jeju: "제주",
      gangwon: "강원",
      jeonbuk: "전북",
      daejeon: "대전",
    };
    filters.regions.forEach((region) => {
      result.push({
        key: `region-${region}`,
        label: regionLabels[region],
        category: "regions",
        value: region,
      });
    });

    // Internet speed filters
    const speedLabels: Record<InternetSpeedFilter, string> = {
      "under-200": "200Mbps 미만",
      "200-500": "200-500Mbps",
      "over-500": "500Mbps 이상",
    };
    filters.internetSpeed.forEach((speed) => {
      result.push({
        key: `speed-${speed}`,
        label: speedLabels[speed],
        category: "internetSpeed",
        value: speed,
      });
    });

    // Cost filters
    const costLabels: Record<CostFilter, string> = {
      "under-100": "100만원 미만",
      "100-150": "100-150만원",
      "over-150": "150만원 이상",
    };
    filters.cost.forEach((costRange) => {
      result.push({
        key: `cost-${costRange}`,
        label: costLabels[costRange],
        category: "cost",
        value: costRange,
      });
    });

    // Rating filters
    const ratingLabels: Record<RatingFilter, string> = {
      "over-4.0": "평점 4.0 이상",
      "over-4.5": "평점 4.5 이상",
    };
    filters.rating.forEach((ratingThreshold) => {
      result.push({
        key: `rating-${ratingThreshold}`,
        label: ratingLabels[ratingThreshold],
        category: "rating",
        value: ratingThreshold,
      });
    });

    // Transport filters
    const transportLabels: Record<TransportFilter, string> = {
      excellent: "교통 매우 좋음",
      good: "교통 좋음",
      average: "교통 보통",
    };
    filters.transport.forEach((transportType) => {
      result.push({
        key: `transport-${transportType}`,
        label: transportLabels[transportType],
        category: "transport",
        value: transportType,
      });
    });

    return result;
  }, [filters]);

  return {
    filters,
    activeFilters,
    setSearch,
    setSort,
    toggleRegion,
    toggleInternetSpeed,
    toggleCost,
    toggleRating,
    toggleTransport,
    removeFilter,
    clearAllFilters,
  };
}
