import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "border-transparent bg-[var(--foreground)] text-[var(--background)]",
  secondary: "border-transparent bg-[var(--gray-3)] text-[var(--foreground)]",
  destructive: "border-transparent bg-[var(--error)] text-white",
  outline: "text-[var(--foreground)]",
  success: "border-transparent bg-[var(--success)]/10 text-[var(--success)]",
  warning: "border-transparent bg-[var(--warning)]/10 text-[var(--warning)]",
  error: "border-transparent bg-[var(--error)]/10 text-[var(--error)]",
}

function Badge({ className, variant = "default", ...props }: any) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:ring-offset-2",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
