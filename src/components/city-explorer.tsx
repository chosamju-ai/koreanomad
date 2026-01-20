"use client";

import { useMemo } from "react";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import { useCityFilters } from "@/hooks/use-city-filters";
import { applyFiltersAndSort } from "@/lib/filter-utils";
import { getAllCities } from "@/lib/cities";

export function CityExplorer() {
  const allCities = getAllCities();
  const {
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
  } = useCityFilters();

  // Apply filters and sorting
  const filteredCities = useMemo(() => {
    return applyFiltersAndSort(allCities, filters);
  }, [allCities, filters]);

  return (
    <>
      <FilterBar
        search={filters.search}
        sort={filters.sort}
        activeFilters={activeFilters}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onRemoveFilter={removeFilter}
        onClearAllFilters={clearAllFilters}
        filters={filters}
        onToggleRegion={toggleRegion}
        onToggleInternetSpeed={toggleInternetSpeed}
        onToggleCost={toggleCost}
        onToggleRating={toggleRating}
        onToggleTransport={toggleTransport}
      />
      <CityGrid cities={filteredCities} />
    </>
  );
}
