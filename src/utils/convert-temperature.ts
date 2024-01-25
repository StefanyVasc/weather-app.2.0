import { SettingsOptions } from '@/@types/types'

import { convertKelvinToCelsius } from './convert-kelvin-to-celsius'
import { convertKelvinToFahrenheit } from './convert-kelvin-to-fahrenheit'

export const convertTemperature = (temp: number, settings: SettingsOptions) => {
  let convertedTemp = temp

  switch (settings.temperature) {
    case 'kelvin':
      return { value: convertedTemp, unity: 'K' }
    case 'celsius':
      convertedTemp = convertKelvinToCelsius(temp)
      return { value: convertedTemp, unity: 'C' }
    case 'fahrenheit':
      convertedTemp = convertKelvinToFahrenheit(temp)
      return { value: convertedTemp, unity: 'F' }
    default:
      return { value: convertedTemp, unity: '°' }
  }
}
