"use client"

import { CreditCard } from "@/types"
import Button from "@/components/Button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/utils/cn"

interface CreditCardDetailsProps {
  card: CreditCard
  onClose: () => void
  isSelected: boolean
  onSelect: (card: CreditCard) => void
}

export default function CreditCardDetails({ card, onClose, isSelected, onSelect }: CreditCardDetailsProps) {
  function handleSelect() {
    onSelect(card)
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <section>
          <h2 className="font-montserrat text-secondary text-2xl font-bold">{card.name}</h2>
          <p className="text-foreground-muted">{card.provider}</p>
        </section>
        <section className="text-right">
          <p className="font-montserrat text-secondary text-2xl font-bold">£{card.creditAvailable}</p>
          <p className="text-foreground-muted">Credit Available</p>
        </section>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <section className="bg-surface rounded-lg p-3">
          <p className="text-xl font-bold">{card.offerDetail.representativeAPR}%</p>
          <p className="text-foreground-muted text-sm font-medium">Representative APR</p>
        </section>

        <div className="bg-surface rounded-lg p-3">
          <p className="text-xl font-bold">£{card.offerDetail.annualFee}</p>
          <p className="text-foreground-muted text-sm font-medium">Annual Fee</p>
        </div>

        <div className="bg-surface rounded-lg p-3">
          <p className="text-xl font-bold">{card.offerDetail.durationOfBalanceRateMonths} months</p>
          <p className="text-foreground-muted text-sm font-medium">Balance transfer offer duration</p>
        </div>

        <div className="bg-surface rounded-lg p-3">
          <p className="text-xl font-bold">{card.offerDetail.durationOfPurchaseRateMonths} months</p>
          <p className="text-foreground-muted text-sm font-medium">Purchase offer duration</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <section className="flex items-center justify-between border-b pb-1">
          <span className="font-medium">International Charges</span>
          <span className="font-bold">{card.offerDetail.internationalCharges}%</span>
        </section>

        <section className="flex items-center justify-between border-b pb-1">
          <span className="font-medium">Minimum Age</span>
          <span className="font-bold">{card.offerDetail.minAge} years</span>
        </section>

        <section className="flex items-center justify-between border-b pb-1">
          <span className="font-medium">Minimum income</span>
          <span className="font-bold">£{card.offerDetail.minIncome}</span>
        </section>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <section className="mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
            <h4 className="font-montserrat font-bold">Pros</h4>
          </section>
          <ul className="list-inside list-disc space-y-1">
            {card.pros.map((pro, index) => (
              <li key={index} className="font-medium">
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <section className="mb-2 flex items-center gap-2">
            <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
            <h4 className="font-montserrat font-bold">Cons</h4>
          </section>
          <ul className="list-inside list-disc space-y-1">
            {card.cons.map((con, index) => (
              <li key={index} className="font-medium">
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-end gap-4">
        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
        <Button
          variant="secondary"
          className={cn(isSelected && "bg-secondary-muted text-secondary-muted-foreground", "w-full")}
          onClick={handleSelect}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
    </div>
  )
}
