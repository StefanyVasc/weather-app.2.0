import { format, fromUnixTime } from 'date-fns'

interface CityData {
  sunrise: number | undefined
  sunset: number | undefined
}

export function formatSunTime(cityData: CityData | undefined): {
  sunrise: string
  sunset: string
} {
  const defaultTime = '00:00'

  if (!cityData) {
    return { sunrise: defaultTime, sunset: defaultTime }
  }

  const { sunrise, sunset } = cityData

  return {
    sunrise: sunrise ? format(fromUnixTime(sunrise), 'H:mm') : defaultTime,
    sunset: sunset ? format(fromUnixTime(sunset), 'H:mm') : defaultTime,
  }
}
