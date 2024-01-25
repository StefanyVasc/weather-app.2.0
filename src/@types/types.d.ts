export interface WeatherDetail {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string | number | Date
}

export interface WeatherData {
  cod: string
  message: number
  cnt: number
  list: WeatherDetail[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export type TemperatureUnit = 'kelvin' | 'celsius' | 'fahrenheit'
export type VelocityUnit = 'km/h' | 'm/s'
export type MeasureUnit = 'k' | 'm'

export interface SettingsOptions {
  temperature: TemperatureUnit
  velocity: VelocityUnit
  measure: MeasureUnit
}

export interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}
