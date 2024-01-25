import { Settings2 } from 'lucide-react'

import { SettingsOptions } from '@/@types/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSettings } from '@/hooks/use-settings'

export function SettingsMenu() {
  const { settings, setSettings } = useSettings()

  const handleSettingsChange = (
    field: keyof SettingsOptions,
    value: string,
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value as SettingsOptions[keyof SettingsOptions],
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuLabel>Temperature</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={settings.temperature}
          onValueChange={(value) => handleSettingsChange('temperature', value)}
        >
          <DropdownMenuRadioItem value="kelvin">Kelvin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="celsius">Celsius</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fahrenheit">
            Fahrenheit
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuLabel>Velocity</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={settings.velocity}
          onValueChange={(value) => handleSettingsChange('velocity', value)}
        >
          <DropdownMenuRadioItem value="km/h">km/h</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="m/s">m/s</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuLabel>Measure</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={settings.measure}
          onValueChange={(value) => handleSettingsChange('measure', value)}
        >
          <DropdownMenuRadioItem value="k">kilometers</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="m">meters</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
