"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";

export function FilterBar() {
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
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
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
            <Select defaultValue="popular">
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

        {/* Filter Tags (Active Filters) */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">활성 필터:</span>
          <FilterTag label="서울" />
          <FilterTag label="100Mbps+" />
          <FilterTag label="~100만원" />
          <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
            모두 지우기
          </Button>
        </div>
      </div>
    </section>
  );
}

function FilterTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      {label}
      <button className="ml-0.5 hover:text-primary/80">×</button>
    </span>
  );
}
