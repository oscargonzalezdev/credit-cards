"use client"

import StackedCards from "@/components/StackedCards"
import { cn } from "@/utils/cn"
import Link from "next/link"

export default function Home() {

  return (
    <div className="h-full">
      <div className={cn("grid h-full grid-cols-1 gap-10 md:grid-cols-2")}>
        <div className="flex max-w-[70ch] flex-col items-center justify-center space-y-6 text-center md:items-start md:text-left">
          <h1 className="font-montserrat text-5xl leading-tight font-bold text-balance">Find your perfect credit card</h1>
          <p className="text-foreground-muted space-y-4 text-xl text-balance">
            Check your eligibility and find the best offers available to you from a wide range of credit cards.
          </p>
          <Link href="/credit-cards" className="as-button">
            Check eligibility now
          </Link>
        </div>
        <StackedCards />
      </div>
    </div>
  )
}
