import { format } from 'date-fns'
import { FC } from 'react'

interface DateDisplayProps {
  date: string | number | Date | undefined
  formatString: string
  cssClass?: string
}

export const DateDisplay: FC<DateDisplayProps> = ({
  date,
  formatString,
  cssClass,
}) => {
  const formattedDate = date ? format(new Date(date), formatString) : ''
  return (
    <span className={`${cssClass} text-gray-500 dark:text-gray-200`}>
      {formattedDate}
    </span>
  )
}
