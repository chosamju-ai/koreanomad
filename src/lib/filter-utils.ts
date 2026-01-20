import type { CityData } from "@/components/city-card";
import type {
  CityFilters,
  SortOption,
  RegionFilter,
  InternetSpeedFilter,
  CostFilter,
  RatingFilter,
  TransportFilter,
} from "@/hooks/use-city-filters";

/**
 * Filter cities by search term (searches both Korean and English names)
 */
export function filterCitiesBySearch(
  cities: CityData[],
  searchTerm: string
): CityData[] {
  if (!searchTerm.trim()) return cities;

  const normalized = searchTerm.toLowerCase().trim();

  return cities.filter((city) => {
    const nameMatch = city.name.toLowerCase().includes(normalized);
    const nameEnMatch = city.nameEn.toLowerCase().includes(normalized);
    const regionMatch = city.location?.region.toLowerCase().includes(normalized);

    return nameMatch || nameEnMatch || regionMatch;
  });
}

/**
 * Filter cities by region
 */
export function filterCitiesByRegion(
  cities: CityData[],
  regions: RegionFilter[]
): CityData[] {
  if (regions.length === 0) return cities;

  const regionMap: Record<RegionFilter, string[]> = {
    seoul: ["서울", "Seoul"],
    busan: ["부산", "Busan"],
    jeju: ["제주", "Jeju"],
    gangwon: ["강원", "Gangneung"],
    jeonbuk: ["전북", "Jeonju"],
    daejeon: ["대전", "Daejeon"],
  };

  return cities.filter((city) => {
    return regions.some((region) => {
      const keywords = regionMap[region];
      return keywords.some(
        (keyword) =>
          city.name.includes(keyword) ||
          city.nameEn.includes(keyword) ||
          city.location?.region.includes(keyword)
      );
    });
  });
}

/**
 * Filter cities by internet speed
 */
export function filterCitiesByInternetSpeed(
  cities: CityData[],
  speedFilters: InternetSpeedFilter[]
): CityData[] {
  if (speedFilters.length === 0) return cities;

  return cities.filter((city) => {
    return speedFilters.some((filter) => {
      switch (filter) {
        case "under-200":
          return city.internetSpeed < 200;
        case "200-500":
          return city.internetSpeed >= 200 && city.internetSpeed <= 500;
        case "over-500":
          return city.internetSpeed > 500;
        default:
          return false;
      }
    });
  });
}

/**
 * Filter cities by monthly cost
 */
export function filterCitiesByCost(
  cities: CityData[],
  costFilters: CostFilter[]
): CityData[] {
  if (costFilters.length === 0) return cities;

  return cities.filter((city) => {
    return costFilters.some((filter) => {
      switch (filter) {
        case "under-100":
          return city.monthlyCost < 1000000;
        case "100-150":
          return city.monthlyCost >= 1000000 && city.monthlyCost <= 1500000;
        case "over-150":
          return city.monthlyCost > 1500000;
        default:
          return false;
      }
    });
  });
}

/**
 * Filter cities by rating
 */
export function filterCitiesByRating(
  cities: CityData[],
  ratingFilters: RatingFilter[]
): CityData[] {
  if (ratingFilters.length === 0) return cities;

  return cities.filter((city) => {
    return ratingFilters.some((filter) => {
      switch (filter) {
        case "over-4.0":
          return city.rating >= 4.0;
        case "over-4.5":
          return city.rating >= 4.5;
        default:
          return false;
      }
    });
  });
}

/**
 * Filter cities by transport quality
 */
export function filterCitiesByTransport(
  cities: CityData[],
  transportFilters: TransportFilter[]
): CityData[] {
  if (transportFilters.length === 0) return cities;

  return cities.filter((city) => {
    return transportFilters.includes(city.transport as TransportFilter);
  });
}

/**
 * Apply all filters to cities
 */
export function filterCities(
  cities: CityData[],
  filters: CityFilters
): CityData[] {
  let filtered = cities;

  // Apply search filter
  filtered = filterCitiesBySearch(filtered, filters.search);

  // Apply region filter
  filtered = filterCitiesByRegion(filtered, filters.regions);

  // Apply internet speed filter
  filtered = filterCitiesByInternetSpeed(filtered, filters.internetSpeed);

  // Apply cost filter
  filtered = filterCitiesByCost(filtered, filters.cost);

  // Apply rating filter
  filtered = filterCitiesByRating(filtered, filters.rating);

  // Apply transport filter
  filtered = filterCitiesByTransport(filtered, filters.transport);

  return filtered;
}

/**
 * Sort cities based on the selected option
 */
export function sortCities(
  cities: CityData[],
  sortBy: SortOption
): CityData[] {
  const sorted = [...cities];

  switch (sortBy) {
    case "popular":
      // Already sorted by rank in the data
      return sorted.sort((a, b) => a.rank - b.rank);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "cost-low":
      return sorted.sort((a, b) => a.monthlyCost - b.monthlyCost);

    case "cost-high":
      return sorted.sort((a, b) => b.monthlyCost - a.monthlyCost);

    case "internet":
      return sorted.sort((a, b) => b.internetSpeed - a.internetSpeed);

    default:
      return sorted;
  }
}

/**
 * Apply filters and sorting to cities
 */
export function applyFiltersAndSort(
  cities: CityData[],
  filters: CityFilters
): CityData[] {
  // First filter, then sort
  const filtered = filterCities(cities, filters);
  const sorted = sortCities(filtered, filters.sort);
  return sorted;
}
