import { cn } from "@/utils/cn"

export type ButtonVariant = "primary" | "secondary" | "outline" | "link"

export default function Button({
  variant = "secondary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const buttonClass = cn(
    "transition-all duration-300 disabled:opacity-70 font-montserrat text-base font-semibold text-nowrap cursor-pointer flex items-center gap-2",
    variant === "link"
      ? "text-secondary hover:text-secondary-muted-foreground"
      : "rounded-full px-8 py-4 text-nowrap text-center disabled:cursor-not-allowed justify-center leading-tight",
    variant === "primary" &&
      "bg-primary text-primary-foreground hover:bg-primary-muted hover:text-primary-muted-foreground",
    variant === "secondary" &&
      "bg-secondary text-secondary-foreground hover:bg-secondary-muted hover:text-secondary-muted-foreground",
    variant === "outline" &&
      "bg-transparent text-foreground outline outline-2 outline-foreground -outline-offset-2 hover:bg-secondary/10",
    className
  )

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}
