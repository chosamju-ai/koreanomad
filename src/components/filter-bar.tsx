"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import type {
  SortOption,
  ActiveFilter,
  CityFilters,
  RegionFilter,
  InternetSpeedFilter,
  CostFilter,
  RatingFilter,
  TransportFilter,
} from "@/hooks/use-city-filters";

interface FilterBarProps {
  search: string;
  sort: SortOption;
  activeFilters: ActiveFilter[];
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOption) => void;
  onRemoveFilter: (category: keyof CityFilters, value: string) => void;
  onClearAllFilters: () => void;
  filters: CityFilters;
  onToggleRegion: (region: RegionFilter) => void;
  onToggleInternetSpeed: (speed: InternetSpeedFilter) => void;
  onToggleCost: (cost: CostFilter) => void;
  onToggleRating: (rating: RatingFilter) => void;
  onToggleTransport: (transport: TransportFilter) => void;
}

export function FilterBar({
  search,
  sort,
  activeFilters,
  onSearchChange,
  onSortChange,
  onRemoveFilter,
  onClearAllFilters,
  filters,
  onToggleRegion,
  onToggleInternetSpeed,
  onToggleCost,
  onToggleRating,
  onToggleTransport,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState(search);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearchChange]);

  // Sync search value when it changes externally (e.g., URL change)
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const handleSearchClear = useCallback(() => {
    setSearchValue("");
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <section className="sticky top-16 z-40 border-b bg-background py-4">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search & Filter */}
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="도시 검색..."
                className="pl-10 pr-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="검색어 지우기"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">필터</span>
            </Button>
          </div>

          {/* View Toggle & Sort */}
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center rounded-md border p-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-muted">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
                <SelectItem value="cost-low">생활비 낮은순</SelectItem>
                <SelectItem value="cost-high">생활비 높은순</SelectItem>
                <SelectItem value="internet">인터넷 빠른순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Options (Collapsible) */}
        {showFilters && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Region Filter */}
              <div>
                <h3 className="mb-2 text-sm font-medium">지역</h3>
                <div className="space-y-2">
                  {[
                    { value: "seoul" as RegionFilter, label: "서울" },
                    { value: "busan" as RegionFilter, label: "부산" },
                    { value: "jeju" as RegionFilter, label: "제주" },
                    { value: "gangwon" as RegionFilter, label: "강원" },
                    { value: "jeonbuk" as RegionFilter, label: "전북" },
                    { value: "daejeon" as RegionFilter, label: "대전" },
                  ].map((region) => (
                    <label
                      key={region.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(region.value)}
                        onChange={() => onToggleRegion(region.value)}
                        className="rounded"
                      />
                      {region.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Internet Speed Filter */}
              <div>
                <h3 className="mb-2 text-sm font-medium">인터넷 속도</h3>
                <div className="space-y-2">
                  {[
                    { value: "under-200" as InternetSpeedFilter, label: "200Mbps 미만" },
                    { value: "200-500" as InternetSpeedFilter, label: "200-500Mbps" },
                    { value: "over-500" as InternetSpeedFilter, label: "500Mbps 이상" },
                  ].map((speed) => (
                    <label
                      key={speed.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.internetSpeed.includes(speed.value)}
                        onChange={() => onToggleInternetSpeed(speed.value)}
                        className="rounded"
                      />
                      {speed.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Cost Filter */}
              <div>
                <h3 className="mb-2 text-sm font-medium">생활비</h3>
                <div className="space-y-2">
                  {[
                    { value: "under-100" as CostFilter, label: "100만원 미만" },
                    { value: "100-150" as CostFilter, label: "100-150만원" },
                    { value: "over-150" as CostFilter, label: "150만원 이상" },
                  ].map((cost) => (
                    <label
                      key={cost.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.cost.includes(cost.value)}
                        onChange={() => onToggleCost(cost.value)}
                        className="rounded"
                      />
                      {cost.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="mb-2 text-sm font-medium">평점</h3>
                <div className="space-y-2">
                  {[
                    { value: "over-4.0" as RatingFilter, label: "4.0 이상" },
                    { value: "over-4.5" as RatingFilter, label: "4.5 이상" },
                  ].map((rating) => (
                    <label
                      key={rating.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.rating.includes(rating.value)}
                        onChange={() => onToggleRating(rating.value)}
                        className="rounded"
                      />
                      {rating.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Transport Filter */}
              <div>
                <h3 className="mb-2 text-sm font-medium">교통</h3>
                <div className="space-y-2">
                  {[
                    { value: "excellent" as TransportFilter, label: "매우 좋음" },
                    { value: "good" as TransportFilter, label: "좋음" },
                    { value: "average" as TransportFilter, label: "보통" },
                  ].map((transport) => (
                    <label
                      key={transport.value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.transport.includes(transport.value)}
                        onChange={() => onToggleTransport(transport.value)}
                        className="rounded"
                      />
                      {transport.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tags (Active Filters) */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">활성 필터:</span>
            {activeFilters.map((filter) => (
              <FilterTag
                key={filter.key}
                label={filter.label}
                onRemove={() => onRemoveFilter(filter.category, filter.value)}
              />
            ))}
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={onClearAllFilters}
            >
              모두 지우기
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 hover:text-primary/80"
        aria-label={`${label} 필터 제거`}
      >
        ×
      </button>
    </span>
  );
}
