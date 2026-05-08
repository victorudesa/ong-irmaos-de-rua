import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[10px] border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* Primary filled — dark backgrounds */
        default: "bg-primary text-white hover:-translate-y-px hover:opacity-90 duration-150 shadow-sm",
        /* Outline — light backgrounds, primary border */
        outline: "bg-transparent border-[1.5px] border-current text-primary hover:bg-primary/5 duration-150",
        /* Outline inverted — dark/white backgrounds, light border */
        "outline-light": "bg-transparent border-[1.5px] border-white text-white hover:bg-white/10 duration-150",
        /* Secondary — soft fill */
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 duration-150",
        /* Ghost — no background, hover fill */
        ghost: "bg-transparent text-inherit hover:bg-neutral-100 duration-150",
        /* Link — underline style */
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
        /* Inverted — white bg on dark background */
        inverted: "bg-white text-primary hover:opacity-90 duration-150 shadow-sm",
      },
      size: {
        xs: "h-6 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 px-5",
        default: "h-10 gap-1.5 px-6",
        lg: "h-11 gap-1.5 px-8 text-base",
        xl: "h-12 gap-2 px-10 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
