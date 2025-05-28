
import { useState, useMemo, useCallback } from 'react';
import { Product } from '@/data/products';

export interface FilterState {
  launches: boolean;
  families: string[];
  technologies: string[];
  categories: string[];
  searchTerm: string;
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    launches: false,
    families: [],
    technologies: [],
    categories: [],
    searchTerm: ''
  });

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback((key: 'families' | 'technologies' | 'categories', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      launches: false,
      families: [],
      technologies: [],
      categories: [],
      searchTerm: ''
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtro de lançamentos
      if (filters.launches && !product.isLaunch) {
        return false;
      }

      // Filtro de famílias
      if (filters.families.length > 0 && !filters.families.includes(product.family)) {
        return false;
      }

      // Filtro de tecnologias
      if (filters.technologies.length > 0 && !filters.technologies.includes(product.technology)) {
        return false;
      }

      // Filtro de categorias
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Filtro de pesquisa (nome ou código)
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesCode = product.code.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesCode) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  return {
    filters,
    filteredProducts,
    updateFilter,
    toggleArrayFilter,
    clearFilters
  };
};
