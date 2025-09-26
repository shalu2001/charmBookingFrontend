import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react'

interface CustomCardProps {
  title: string
  icon?: React.ReactNode
  iconClassName?: string
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function CustomCard({ title, footer, className, children }: CustomCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className='flex gap-2'>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
