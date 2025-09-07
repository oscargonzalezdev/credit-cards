import { AVAILABLE_CARDS } from "@/constants"
import { CreditCard } from "@/types"
import { filterEligibleCards } from "@/utils/eligibility"
import { validateCustomerForm, ValidationErrors } from "@/utils/validation"
import { NextResponse } from "next/server"

export async function POST(
  request: Request
): Promise<NextResponse<{ data: CreditCard[] } | { errors: ValidationErrors }>> {
  try {
    const { data: customerData } = await request.json()

    // Server side customer data validation
    const { isValid, errors } = validateCustomerForm(customerData)

    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    const eligibleCards = filterEligibleCards({ cards: AVAILABLE_CARDS, customer: customerData })

    return NextResponse.json({
      data: eligibleCards,
    })
  } catch (error) {
    console.error("Error getting credit cards:", error)
    return NextResponse.json({ errors: {} }, { status: 500 })
  }
}
