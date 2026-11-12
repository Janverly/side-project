import { parseAsString, useQueryState } from 'nuqs';

// URL state: the search survives a reload and can be shared as a link (?q=friday).
export const useSessionSearch = () => useQueryState('q', parseAsString.withDefault(''));
