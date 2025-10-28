"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableFiltersProps {
  searchPlaceholder?: string;
  statusOptions?: Array<{ value: string; label: string }>;
  onSearchChange: (value: string) => void;
  onStatusChange?: (value: string) => void;
  searchValue?: string;
  statusValue?: string;
}

export function TableFilters({
  searchPlaceholder = "Buscar...",
  statusOptions = [],
  onSearchChange,
  onStatusChange,
  searchValue = "",
  statusValue = "",
}: TableFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [localStatus, setLocalStatus] = useState(statusValue);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleStatusChange = (value: string) => {
    setLocalStatus(value);
    onStatusChange?.(value);
  };

  const clearFilters = () => {
    setLocalSearch("");
    setLocalStatus("");
    onSearchChange("");
    onStatusChange?.("");
  };

  const hasFilters = localSearch || localStatus;

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {statusOptions.length > 0 && (
        <Select value={localStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Limpiar
        </Button>
      )}
    </div>
  );
}

