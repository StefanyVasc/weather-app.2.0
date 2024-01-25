import { WeatherDetail } from '@/@types/types'
import { useSettings } from '@/hooks/use-settings'
import { convertTemperature } from '@/utils/convert-temperature'
import { DateDisplay } from '@/utils/date-formatter'

import { CardContent } from '../ui/card'
import CardElement from './card-element'
import { ForecastSkeleton } from './skeleton/forecast-skeleton'

interface ForecastProps {
  data: WeatherDetail[] | undefined
}

export default function Forecast({ data }: ForecastProps) {
  const { settings } = useSettings()
  return (
    <CardElement title="Forecast" cssClass="col-span-5 md:col-span-4">
      <CardContent className="mt-10 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
        {data && data.length > 0
          ? data.map((item: WeatherDetail, index: number) => {
              const temperatureInfo = convertTemperature(
                item.main.temp ?? 0,
                settings,
              )

              return (
                <div
                  key={index}
                  className="mb-3 flex items-center justify-between rounded-xl border bg-card p-3 text-card-foreground shadow"
                >
                  <div className="flex items-center">
                    <img
                      alt=""
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon ?? '01d'}@2x.png`}
                    />
                    <div className="flex flex-col flex-wrap gap-3 ">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span>
                          {temperatureInfo.value}°{temperatureInfo.unity}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-200">
                          {item.weather[0].description ?? ''}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <DateDisplay
                          cssClass="text-xs"
                          date={item.dt_txt ?? ''}
                          formatString="EEEE"
                        />
                        <DateDisplay
                          cssClass="text-xs"
                          date={item.dt_txt ?? ''}
                          formatString="dd, MMMM"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : Array.from({ length: 8 }, (_, index) => (
              <ForecastSkeleton key={index} />
            ))}
      </CardContent>
    </CardElement>
  )
}
