import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const buttonVariantClasses = {
  default: "bg-[var(--foreground)] text-[var(--background)] shadow-xs hover:opacity-90",
  destructive: "bg-[var(--error)] text-white shadow-xs hover:bg-[var(--error)]/90",
  outline: "border border-[var(--border)] bg-[var(--card)] shadow-xs hover:bg-[var(--gray-3)] hover:text-[var(--foreground)]",
  secondary: "bg-[var(--gray-3)] text-[var(--foreground)] shadow-xs hover:bg-[var(--gray-4)]",
  ghost: "hover:bg-[var(--gray-3)] hover:text-[var(--foreground)]",
  link: "text-[var(--foreground)] underline-offset-4 hover:underline",
}

const buttonSizeClasses = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  xs: "h-7 rounded-md gap-1 px-2.5 text-xs has-[>svg]:px-2",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-xs": "size-7",
}

const Button = forwardRef<HTMLButtonElement, any>(function Button(
  { className, variant = "default", size = "default", asChild = false, ...props }: any,
  ref
) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 cursor-pointer",
        buttonVariantClasses[variant] || buttonVariantClasses.default,
        buttonSizeClasses[size] || buttonSizeClasses.default,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export { Button, buttonVariantClasses, buttonSizeClasses }
