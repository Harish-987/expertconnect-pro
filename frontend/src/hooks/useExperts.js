import { useEffect } from 'react';
import useExpertStore from '../store/expertStore';
import useDebounce from './useDebounce';

/**
 * Encapsulates expert list data-fetching logic.
 * Debounces the search term so the API is only called after the user
 * stops typing, then triggers a fresh load whenever filters change.
 */
const useExperts = () => {
  const { experts, pagination, loading, error, filters, setFilters, setPage, loadExperts } =
    useExpertStore();

  const debouncedSearch = useDebounce(filters.search, 350);

  // Re-fetch when debounced search, category, sort, or page changes
  useEffect(() => {
    loadExperts();
  }, [debouncedSearch, filters.category, filters.sort, filters.page]); // eslint-disable-line

  return { experts, pagination, loading, error, filters, setFilters, setPage };
};

export default useExperts;
