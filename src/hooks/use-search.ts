import { useContext } from 'react'

import { SearchContext, SearchContextProps } from '@/context/search-context'

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
