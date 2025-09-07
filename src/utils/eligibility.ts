import { CreditCard, CustomerData } from "@/types"

// Eligibility rules for credit cards
// - Student Card: only available to students
// - Anywhere Card: available to anyone anywhere
// - Liquid Card: customers who have an income of more than £16000

export function filterEligibleCards({
  cards,
  customer,
}: {
  cards: CreditCard[]
  customer: CustomerData
}): CreditCard[] {
  const customerIncome = parseFloat(customer.annualIncome)

  return cards.filter((card) => {
    if (!card.employmentStatus.includes(customer.employmentStatus)) {
      return false
    }

    if (customerIncome < card.offerDetail.minIncome) {
      return false
    }

    return true
  })
}
