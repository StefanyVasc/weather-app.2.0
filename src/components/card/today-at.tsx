import { WeatherDetail } from '@/@types/types'
import { useSettings } from '@/hooks/use-settings'
import { convertTemperature } from '@/utils/convert-temperature'
import { DateDisplay } from '@/utils/date-formatter'

import { CardContent } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import CardElement from './card-element'
import TodayAtSkeleton from './skeleton/today-at-skeleton'

interface TodayAtProps {
  weatherDataList: WeatherDetail[] | undefined
}

export default function TodayAt({ weatherDataList }: TodayAtProps) {
  const { settings } = useSettings()

  return (
    <CardElement cssClass="col-span-5 md:col-span-5" title="Today at">
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScrollArea className="col-span-4  cursor-pointer whitespace-nowrap rounded-md border p-4">
          <div className="flex w-max space-x-4 p-4">
            {weatherDataList ? (
              weatherDataList.map((item, index) => {
                const convertedTemperature = convertTemperature(
                  item?.main.temp ?? 0,
                  settings,
                )

                return (
                  <div
                    key={index}
                    className="flex w-[150px] flex-col items-center rounded-xl border bg-card p-4 text-card-foreground shadow"
                  >
                    <DateDisplay
                      date={item.dt_txt ?? 0}
                      formatString="h:mm a"
                    />
                    <img
                      alt=""
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    <p>
                      {convertedTemperature.value}°{convertedTemperature.unity}
                    </p>
                  </div>
                )
              })
            ) : (
              <TodayAtSkeleton />
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </CardElement>
  )
}
