import { cn } from "@/lib/utils"

function Card({ className, ...props }: any) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-[var(--card)] text-[var(--foreground)] flex flex-col gap-6 rounded-xl border border-[var(--border)] py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: any) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 px-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: any) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: any) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[var(--foreground-muted)] text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: any) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: any) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: any) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardAction, CardContent }
