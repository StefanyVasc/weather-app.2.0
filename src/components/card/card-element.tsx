import { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CardElementProps {
  footer?: ReactNode | string
  description?: ReactNode | string
  content?: ReactNode | string
  title: string
  cssClass?: string
  children?: ReactNode
}

export default function CardElement({
  children,
  title,
  description,
  footer,
  content,
  cssClass = 'col-span-5 lg:col-span-2',
}: CardElementProps) {
  return (
    <Card
      className={`${cssClass} rounded-xl border bg-card text-card-foreground shadow`}
    >
      <CardHeader className="flex flex-col space-y-1.5 p-6">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children || content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
