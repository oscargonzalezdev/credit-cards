"use client"

import { CreditCard } from "@/types"
import Button from "@/components/Button"
import Modal from "@/components/Modal"
import CreditCardDetails from "@/components/CreditCardDetails"
import { cn } from "@/utils/cn"
import { useState } from "react"

interface CreditCardProps {
  card: CreditCard
  onSelect: (card: CreditCard) => void
  isSelected: boolean
}

export default function CreditCardView({ card, onSelect, isSelected }: CreditCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <div className={cn("bg-card space-y-4 rounded-2xl border p-6 shadow-sm", isSelected && "ring-secondary/50 ring-2")}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <section>
            <h3 className="font-montserrat text-secondary text-lg font-bold">{card.name}</h3>
            <p className="text-foreground-muted text-sm">{card.provider}</p>
          </section>
          <section className="text-right">
            <span className="font-montserrat text-secondary text-xl font-bold">£{card.creditAvailable}</span>
            <p className="text-foreground-muted text-sm">Credit Available</p>
          </section>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">APR:</span>
            <span className="font-bold">{card.offerDetail.representativeAPR}%</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Balance Transfer Offer Duration:</span>
            <span className="font-bold">{card.offerDetail.durationOfBalanceRateMonths} months</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Purchase Offer Duration:</span>
            <span className="font-bold">{card.offerDetail.durationOfPurchaseRateMonths} months</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="w-full" onClick={() => setShowDetails(true)}>
            Details
          </Button>
          <Button
            variant="secondary"
            className={cn("w-full", isSelected && "bg-secondary-muted text-secondary-muted-foreground")}
            onClick={() => onSelect(card)}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Credit Card Details"
        className="max-w-3xl"
      >
        <CreditCardDetails
          card={card}
          onClose={() => setShowDetails(false)}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      </Modal>
    </>
  )
}
