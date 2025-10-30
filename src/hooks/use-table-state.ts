import { useState, useMemo, useEffect } from "react";

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

  // Memoizar los datos filtrados
  const filteredData = useMemo(() => {
    // Asegurarse de que `data` siempre sea un array para evitar errores
    const sourceData = Array.isArray(data) ? data : [];
    
    let result = [...sourceData];

    // Filtrar por búsqueda de texto
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
  
  // Reiniciar la página actual si los datos filtrados cambian y la página actual queda fuera de rango
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredData.length, itemsPerPage, currentPage]);


  // Calcular paginación sobre los datos ya filtrados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  // Handlers para cambiar filtros y paginación
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Resetear página al buscar
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Resetear página al filtrar
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Resetear página al cambiar ítems por página
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
