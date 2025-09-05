import { cn } from "@/utils/cn"

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" }
) {
  const buttonClass = cn(
    "rounded-full px-8 py-4 text-base font-semibold text-nowrap cursor-pointer font-montserrat transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed leading-tight",
    props.className,
    props.variant === "primary" &&
      "bg-primary text-primary-foreground hover:bg-primary-muted hover:text-primary-muted-foreground focus:bg-primary-muted focus:text-primary-muted-foreground",
    props.variant === "secondary" &&
      "bg-secondary text-secondary-foreground hover:bg-secondary-muted hover:text-secondary-muted-foreground focus:bg-secondary-muted focus:text-secondary-muted-foreground",
    props.variant === "outline" &&
      "bg-transparent text-foreground outline outline-2 outline-foreground -outline-offset-2 hover:bg-secondary/10 focus:bg-secondary/10"
  )

  return (
    <button className={buttonClass}>
      {props.children}
    </button>
  )
}
