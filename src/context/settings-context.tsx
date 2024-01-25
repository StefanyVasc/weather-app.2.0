import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

import { SettingsOptions } from '@/@types/types'

export interface SettingsContextType {
  settings: SettingsOptions
  setSettings: Dispatch<SetStateAction<SettingsOptions>>
}

interface SettingsContextProviderProps {
  children: ReactNode
}

export const SettingsContext = createContext({} as SettingsContextType)

export function SettingsContextProvider({
  children,
}: SettingsContextProviderProps) {
  const [settings, setSettings] = useState<SettingsOptions>({
    temperature: 'celsius',
    velocity: 'm/s',
    measure: 'm',
  })

  const value: SettingsContextType = {
    settings,
    setSettings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
