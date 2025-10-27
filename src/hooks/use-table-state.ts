import { useState, useMemo } from "react";

export interface UseTableStateOptions<T> {
  data: T[];
  searchFields: Array<keyof T>;
  statusField?: keyof T;
}

export function useTableState<T>({ data, searchFields, statusField }: UseTableStateOptions<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtrar datos
  const filteredData = useMemo(() => {
    let result = [...data];

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        });
      });
    }

    // Filtrar por estado
    if (statusFilter && statusField) {
      result = result.filter((item) => item[statusField] === statusFilter);
    }

    return result;
  }, [data, searchQuery, statusFilter, searchFields, statusField]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  // Resetear página cuando cambian los filtros
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return {
    // Datos
    filteredData,
    paginatedData,
    totalPages,
    
    // Estado
    searchQuery,
    statusFilter,
    currentPage,
    itemsPerPage,
    totalItems: filteredData.length,
    
    // Handlers
    handleSearchChange,
    handleStatusChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
}

