'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { WeatherData, WeatherDetail } from '@/@types/types'
import { getWeatherByCity } from '@/api/get-city-weather'
import Forecast from '@/components/card/forecast'
import Now from '@/components/card/now'
import TodayAt from '@/components/card/today-at'
import TodaysHighlight from '@/components/card/todays-highlight'
import Loading from '@/components/loading'
import { useSearch } from '@/hooks/use-search'
import { formatSunTime } from '@/utils/format-sun-time'

import { CityNotFound } from './city-not-found'

export function Home() {
  const { searchTerm } = useSearch()
  const [isValidCity, setIsValidCity] = useState<boolean>(true)

  const queryConfig = useMemo(() => {
    return {
      queryKey: ['weather', searchTerm],
      queryFn: () => {
        return getWeatherByCity(searchTerm).catch(() => {
          setIsValidCity(false)
          throw new Error('City not found')
        })
      },
      enabled: Boolean(searchTerm) && isValidCity,
    }
  }, [searchTerm, isValidCity])

  const { data: weatherData, isLoading } = useQuery<WeatherData>(queryConfig)

  if (!isValidCity) {
    return <CityNotFound />
  }

  const firstData = weatherData?.list[0]
  const weatherNow = firstData?.weather[0]
  const weatherDataList = weatherData?.list
  const { sunrise, sunset } = formatSunTime(weatherData?.city)

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0],
      ),
    ),
  ]

  const firstDataForEachDate = uniqueDates
    .map((date) => {
      return weatherData?.list.find((entry) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0]
        const entryTime = new Date(entry.dt * 1000).getHours()
        return entryDate === date && entryTime >= 6
      })
    })
    .filter((item) => item !== undefined) as WeatherDetail[]

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <main className="px-5 py-6">
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Now
              temp={firstData?.main.temp}
              max={firstData?.main.temp_max ?? 0}
              min={firstData?.main.temp_min ?? 0}
              date={firstData?.dt_txt}
              weather={weatherNow}
            />
            <TodayAt weatherDataList={weatherDataList} />
            <Forecast data={firstDataForEachDate} />

            <TodaysHighlight
              wind={firstData?.wind.speed}
              humidity={firstData?.main.humidity}
              visibility={firstData?.visibility}
              feelsLike={firstData?.main.feels_like}
              pressure={firstData?.main.pressure}
              seaLevel={firstData?.main.sea_level}
              sunrise={sunrise}
              sunset={sunset}
            />
          </div>
        </main>
      )}
    </div>
  )
}
