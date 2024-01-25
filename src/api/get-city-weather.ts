import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeatherByCity(city: string) {
  const { data } = await axios.get(
    `${API_BASE_URL}?q=${city}&appid=${API_KEY}&cnt=56`,
  )
  return data
}
