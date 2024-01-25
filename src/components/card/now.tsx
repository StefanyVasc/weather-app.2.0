import {
  ArrowDown,
  ArrowUp,
  Calendar,
  MapPin,
  ThermometerSnowflake,
  ThermometerSun,
} from 'lucide-react'

import { useSearch } from '@/hooks/use-search'
import { useSettings } from '@/hooks/use-settings'
import { convertTemperature } from '@/utils/convert-temperature'
import { DateDisplay } from '@/utils/date-formatter'

import { Separator } from '../ui/separator'
import CardElement from './card-element'
import NowSkeleton from './skeleton/now-skeleton'

interface NowProps {
  temp?: number
  min?: number
  max?: number
  date?: string | number | Date
  weather:
    | {
        id: number
        main: string
        description: string
        icon: string
      }
    | undefined
}

export default function Now({ temp, min, max, date, weather }: NowProps) {
  const { settings } = useSettings()
  const { city, country } = useSearch()

  const temperatureInfo = convertTemperature(temp ?? 0, settings)
  const minTemperatureInfo = convertTemperature(min ?? 0, settings)
  const maxTemperatureInfo = convertTemperature(max ?? 0, settings)

  return (
    <>
      {!city && !temp ? (
        <NowSkeleton />
      ) : (
        <CardElement title="Now">
          <div className="mb-4 flex items-center justify-center gap-5 flex-wrap">
            <div className="flex items-baseline ">
              <h2 className="text-5xl font-bold">{temperatureInfo.value}°</h2>
              <span className="ml-3 text-3xl text-muted-foreground">
                {temperatureInfo.unity}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <img
                alt=""
                src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
              />
              <span className="text-md text-gray-600 dark:text-gray-200">
                {weather?.main}
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-200">
            {weather?.description}
          </span>
          <Separator className="mt-4" />
          <div>
            <div className="flex mt-2 items-baseline gap-1 ">
              <Calendar className="h-3 w-3" />
              <DateDisplay
                cssClass="text-xs"
                date={date}
                formatString="EEEE"
              />{' '}
              -
              <DateDisplay
                cssClass="text-xs"
                date={date}
                formatString="dd, MMMM"
              />
            </div>
            <div className="flex items-baseline mt-2 gap-1 text-gray-500 dark:text-gray-200">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{city} -</span>
              <span className="text-xs">{country}</span>
            </div>

            <Separator className="mt-4" />
            <div className="flex md:items-center md:justify-between mt-5 flex-wrap gap-3 ">
              <div className="flex  p-4 rounded-xl border bg-card text-card-foreground">
                <ThermometerSnowflake className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-200" />
                <div className="flex items-baseline gap-1">
                  <span className="text-md text-gray-500 dark:text-gray-200">
                    {minTemperatureInfo.value}°
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    {minTemperatureInfo.unity}
                  </span>
                </div>
                <ArrowDown className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-200" />
              </div>

              <div className="flex items-baseline p-4 rounded-xl border bg-card text-card-foreground">
                <ThermometerSun className="mr-2 h-5 w-5 text-orange-500 dark:text-orange-200" />
                <div className="flex items-baseline gap-1">
                  <span className="text-md text-gray-500 dark:text-gray-200">
                    {maxTemperatureInfo.value}°
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    {maxTemperatureInfo.unity}
                  </span>
                </div>
                <ArrowUp className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-200" />
              </div>
            </div>
          </div>
        </CardElement>
      )}
    </>
  )
}
