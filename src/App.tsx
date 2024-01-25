import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { SearchProvider } from './context/search-context'
import { SettingsContextProvider } from './context/settings-context'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="weather-app-theme">
      <SearchProvider>
        <SettingsContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SettingsContextProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}
