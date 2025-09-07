export const titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Other"] as const
export type CustomerTitle = (typeof titleOptions)[number]

export const employmentStatusOptions = ["Full time", "Part time", "Student", "Unemployed"] as const
export type EmploymentStatus = (typeof employmentStatusOptions)[number]

export interface CustomerData {
  id: string
  title: CustomerTitle
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  employmentStatus: EmploymentStatus
  annualIncome: string
  houseNumber: string
  postcode: string
  profileImageUrl?: string
}

export type NewCustomer = Partial<CustomerData>

export interface OfferDetail {
  representativeAPR: number
  durationOfPurchaseRateMonths: number
  durationOfBalanceRateMonths: number
  annualFee: number
  internationalCharges: number
  minIncome: number
  minAge: number
}

export interface CreditCard {
  id: string
  provider: string
  name: string
  creditAvailable: number
  pros: string[]
  cons: string[]
  imageUrlMedium: string
  offerDetail: OfferDetail
  employmentStatus: EmploymentStatus[]
}
