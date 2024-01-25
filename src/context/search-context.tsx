import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

import { ApiError } from '@/@types/types'
import { getWeatherByCity } from '@/api/get-city-weather'
import { handleApiError } from '@/utils/error-handler'

export interface SearchContextProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  onSearchSubmit: (searchTerm: string) => Promise<void>
  isValidCity: (searchTerm: string) => Promise<boolean>
  city: string | undefined
  setCity: Dispatch<SetStateAction<string | undefined>>
  country: string | undefined
  setCountry: Dispatch<SetStateAction<string | undefined>>
  loading: boolean
  error: string | null
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined,
)

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [city, setCity] = useState<string | undefined>(undefined)
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidCity = async (searchTerm: string): Promise<boolean> => {
    try {
      const response = await getWeatherByCity(searchTerm)
      return (
        !!response &&
        !!response.city &&
        !!response.list &&
        response.list.length > 0
      )
    } catch (error) {
      return false
    }
  }

  const onSearchSubmit = async (searchTerm: string): Promise<void> => {
    setSearchTerm(searchTerm)
    setLoading(true)
    setError(null)

    try {
      const isCityValid = await isValidCity(searchTerm)

      if (isCityValid) {
        const response = await getWeatherByCity(searchTerm)
        setCity(response.city.name)
        setCountry(response.city.country)
      } else {
        setError('City not found')
      }
    } catch (error) {
      setError(handleApiError(error as ApiError))
    } finally {
      setLoading(false)
    }
  }

  const value: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    onSearchSubmit,
    city,
    setCity,
    country,
    setCountry,
    loading,
    error,
    isValidCity,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
