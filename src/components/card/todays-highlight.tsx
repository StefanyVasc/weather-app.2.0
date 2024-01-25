import {
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
  Waves,
  Wind,
} from 'lucide-react'

import { useSearch } from '@/hooks/use-search'
import { useSettings } from '@/hooks/use-settings'
import { convertMeasure } from '@/utils/convert-measure'
import { convertTemperature } from '@/utils/convert-temperature'
import { convertVelocity } from '@/utils/convert-velocity'

import { CardContent } from '../ui/card'
import CardElement from './card-element'
import TodaysHighlightSkeleton from './skeleton/todays-highlight-skeleton'

interface TodaysHighlightProps {
  wind: number | undefined
  humidity: number | undefined
  visibility: number | undefined
  feelsLike: number | undefined
  pressure: number | undefined
  seaLevel: number | undefined
  sunrise: string
  sunset: string
}

export default function TodaysHighlight({
  feelsLike,
  humidity,
  pressure,
  seaLevel,
  visibility,
  wind,
  sunrise,
  sunset,
}: TodaysHighlightProps) {
  const { settings } = useSettings()
  const { city } = useSearch()

  const convertedTemperature = convertTemperature(feelsLike ?? 0, settings)
  const convertedVelocity = convertVelocity(wind, settings.velocity)
  const convertedMeasure = convertMeasure(visibility, settings.measure)

  return (
    <CardElement title="Todays Highlight" cssClass="col-span-5 md:col-span-3">
      <CardContent className="mt-10 grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {wind ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Wind Speed</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Wind className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {convertedVelocity}
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {humidity ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Humidity</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Droplets className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {humidity} %
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {visibility ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Visibility</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Eye className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {convertedMeasure}
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {feelsLike ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Feels Like</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Thermometer className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span>
                {convertedTemperature.value}°{convertedTemperature.unity}
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {pressure ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Pressure</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Gauge className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {pressure} hPa
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {seaLevel ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Sea Level</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Waves className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {seaLevel} hPa
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {sunrise && city ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Sunrise</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Sunrise className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {sunrise} AM
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}

        {sunset && city ? (
          <div className="col-span-1">
            <span className="text-gray-700 dark:text-gray-400">Sunset</span>
            <div className="flex items-center mt-4 border p-4 w-40 rounded-lg ">
              <Sunset className="h-8 w-8 mr-4 text-zinc-600 dark:text-zinc-200" />
              <span className="text-gray-500 dark:text-gray-200">
                {sunset} PM
              </span>
            </div>
          </div>
        ) : (
          <TodaysHighlightSkeleton />
        )}
      </CardContent>
    </CardElement>
  )
}
