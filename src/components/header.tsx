import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { useSearch } from '@/hooks/use-search'

import { ErrorMessage } from './error-message'
import { SettingsMenu } from './settings-menu'
import { ModeToggle } from './theme/mode-toggle'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

const formCitySchema = z.object({
  search: z
    .string()
    .refine((value) => /^[a-zA-Z\s-'’]+$/.test(value), {
      message:
        'City name must contain only letters, spaces, hyphens, and apostrophes',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'Please enter a valid search term',
    }),
})

type FormCitySchema = z.infer<typeof formCitySchema>

export function Header() {
  const { setSearchTerm, onSearchSubmit, city, country, isValidCity } =
    useSearch()
  const [error, setError] = useState<string | null>(null)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
    trigger,
  } = useForm<FormCitySchema>({
    resolver: zodResolver(formCitySchema),
  })

  const onSubmitCity: SubmitHandler<FormCitySchema> = async (data) => {
    const searchTerm = data.search

    await trigger('search')

    if (!isValid) {
      return
    }

    const isCityValid = await isValidCity(searchTerm)

    if (isCityValid) {
      setSearchTerm(searchTerm)
      onSearchSubmit(searchTerm)
      reset({ search: '' })
    } else {
      setError('Invalid city' || errors.search?.message)
      reset({ search: '' })

      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const inputClassName = `flex h-9 w-full mr-2 bg-white px-3 py-1 md:w-[200px] lg:w-[300px] ${
    errors.search ? 'border-red-500' : ''
  }`

  return (
    <>
      <header className="sticky left-0 top-0 z-50 border-b bg-accent">
        <div className="flex h-16 items-center gap-6 px-6">
          <Link to="/">Weather App</Link>
          <Separator orientation="vertical" className="h-6" />

          <form
            onSubmit={handleSubmit(onSubmitCity)}
            className="ml-auto flex items-center space-x-1"
          >
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input
                    {...field}
                    placeholder="Search..."
                    className={inputClassName}
                  />
                </div>
              )}
            />
            <Button
              disabled={isSubmitting}
              variant="outline"
              size="sm"
              type="submit"
              className="focus:shadow-outline  focus:outline-none"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            {city !== undefined ? (
              <span>
                {city} - {country}
              </span>
            ) : (
              <div className="flex items-center">
                <Skeleton className="h-5 w-10 mr-2 bg-zinc-200" />
                -
                <Skeleton className="h-5 w-5 ml-2 bg-zinc-200" />
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <SettingsMenu />
            <ModeToggle />
          </div>
        </div>
      </header>
      {error || errors.search ? (
        <ErrorMessage message={error || errors.search?.message || ''} />
      ) : (
        <div></div>
      )}
    </>
  )
}
