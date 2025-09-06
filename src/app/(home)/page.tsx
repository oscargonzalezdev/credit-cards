"use client"

import StackedCards from "@/components/StackedCards"
import Button from "@/components/Button"
import CustomerLoginModal from "@/components/CustomerLoginModal"
import { useState } from "react"
import { cn } from "@/utils/cn"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="h-full">
      <div className={cn("grid h-full grid-cols-1 gap-10 md:grid-cols-2", isModalOpen && "pointer-events-none")}>
        <div className="flex max-w-[70ch] flex-col items-center justify-center space-y-6 text-center md:items-start md:text-left">
          <h1 className="font-montserrat text-5xl leading-tight font-bold text-balance">Find your perfect credit card</h1>
          <p className="text-foreground-muted space-y-4 text-xl text-balance">
            Check your eligibility and find the best offers available to you from a wide range of credit cards.
          </p>
          <Button variant="primary" onClick={handleOpenModal}>
            Check eligibility now
          </Button>
        </div>
        <StackedCards />
      </div>
      <CustomerLoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
