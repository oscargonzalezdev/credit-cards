// ZOD Validation Schema - https://zod.dev/api

import { z } from "zod"
import { titleOptions, employmentStatusOptions, CustomerData } from "@/types"

// Customer form validation schema
export const CustomerFormSchema = z.object({
  id: z
    .string(),
  title: z
    .enum(titleOptions, "Invalid title"),
  email: z
    .email("Invalid email address"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18
    }, "You must be at least 18 years old"),
  employmentStatus: z
    .enum(employmentStatusOptions, "Invalid status"),
  annualIncome: z
    .string()
    .min(1, "Annual income is required")
    .refine((val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= 0
    }, "Invalid annual income"),
  houseNumber: z
    .string()
    .min(1, "House number is required")
    .max(20, "House number is too long"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .max(10, "Postcode is too long")
})

export type ValidationErrors = Partial<Record<keyof CustomerData, string>>

// Validation function
export const validateCustomerForm = (data: CustomerData): { isValid: boolean; errors: ValidationErrors } => {
  try {
    CustomerFormSchema.parse(data)
    return { isValid: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const inputErrors: ValidationErrors = {}
      error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          inputErrors[issue.path[0] as keyof CustomerData] = issue.message
        }
      })
      return { isValid: false, errors: inputErrors }
    }
    return { isValid: false, errors: {} }
  }
}
