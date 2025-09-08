"use client"

import { titleOptions, employmentStatusOptions, CustomerData, NewCustomer } from "@/types"
import Button from "@/components/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useId, useReducer, useState } from "react"
import { validateCustomerForm, ValidationErrors } from "@/utils/validation"

interface CustomerFormProps {
  customer: CustomerData | NewCustomer
  onSubmit: (data: CustomerData) => void
  onBack?: () => void
}

type CustomerFormAction = {
  type: "update-input"
  key: keyof CustomerData
  value: string
}

const INITIAL_CUSTOMER_FORM_DATA: CustomerData = {
  id: "",
  title: "Mr",
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  employmentStatus: "Full time",
  annualIncome: "",
  houseNumber: "",
  postcode: "",
}

const reducer = (state: CustomerData, action: CustomerFormAction): CustomerData => {
  if (action.type === "update-input") {
    return { ...state, [action.key]: action.value }
  }
  return state
}

export default function CustomerForm({ customer, onSubmit, onBack }: CustomerFormProps) {
  const titleId = useId()
  const firstNameId = useId()
  const lastNameId = useId()
  const emailId = useId()
  const dateOfBirthId = useId()
  const employmentStatusId = useId()
  const annualIncomeId = useId()
  const houseNumberId = useId()
  const postcodeId = useId()

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [formData, dispatch] = useReducer(
    reducer,
    customer?.id ? (customer as CustomerData) : INITIAL_CUSTOMER_FORM_DATA
  )

  const handleInputChange = (key: keyof CustomerData, value: string) => {
    console.log("errors", errors)
    dispatch({ type: "update-input", key, value })

    // Clean up errors on input change
    if (key in errors && errors[key as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [key as keyof ValidationErrors]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateCustomerForm(formData)

    if (validation.isValid) {
      setErrors({})
      onSubmit?.(formData)
    } else {
      setErrors(validation.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Customer Title */}
        <div>
          <label htmlFor={titleId}>Title</label>
          <select
            id={titleId}
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={errors.title && "error"}
          >
            {titleOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          {errors.title && <span className="text-sm text-red-600">{errors.title}</span>}
        </div>

        {/* First Name */}
        <div>
          <label htmlFor={firstNameId}>First Name</label>
          <input
            id={firstNameId}
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className={errors.firstName && "error"}
          />
          {errors.firstName && <span className="text-sm text-red-600">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor={lastNameId}>Last Name</label>
          <input
            id={lastNameId}
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className={errors.lastName && "error"}
          />
          {errors.lastName && <span className="text-sm text-red-600">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            className={errors.email && "error"}
          />
          {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor={dateOfBirthId}>Date of Birth</label>
          <input
            id={dateOfBirthId}
            name="dateOfBirth"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className={errors.dateOfBirth && "error"}
          />
          {errors.dateOfBirth && <span className="text-sm text-red-600">{errors.dateOfBirth}</span>}
        </div>

        {/* Employment Status */}
        <div>
          <label htmlFor={employmentStatusId}>Employment Status</label>
          <select
            id={employmentStatusId}
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
            className={errors.employmentStatus && "error"}
          >
            {employmentStatusOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.employmentStatus && <span className="text-sm text-red-600">{errors.employmentStatus}</span>}
        </div>

        {/* Annual Income */}
        <div>
          <label htmlFor={annualIncomeId}>Annual Income (£)</label>
          <input
            id={annualIncomeId}
            name="annualIncome"
            type="number"
            value={formData.annualIncome}
            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
            placeholder="Enter annual income"
            className={errors.annualIncome && "error"}
          />
          {errors.annualIncome && <span className="text-sm text-red-600">{errors.annualIncome}</span>}
        </div>

        {/* House Number */}
        <div>
          <label htmlFor={houseNumberId}>House Number</label>
          <input
            id={houseNumberId}
            name="houseNumber"
            type="text"
            value={formData.houseNumber}
            onChange={(e) => handleInputChange("houseNumber", e.target.value)}
            placeholder="Enter house number"
            className={errors.houseNumber && "error"}
          />
          {errors.houseNumber && <span className="text-sm text-red-600">{errors.houseNumber}</span>}
        </div>

        {/* Postcode */}
        <div>
          <label htmlFor={postcodeId}>Postcode</label>
          <input
            id={postcodeId}
            name="postcode"
            type="text"
            value={formData.postcode}
            onChange={(e) => handleInputChange("postcode", e.target.value)}
            placeholder="Enter postcode"
            className={errors.postcode && "error"}
          />
          {errors.postcode && <span className="text-sm text-red-600">{errors.postcode}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="order-1 w-full justify-center sm:order-0">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <Button type="submit" variant="primary" className="w-full">
          Submit
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
