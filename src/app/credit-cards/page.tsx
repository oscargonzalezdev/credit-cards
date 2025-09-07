"use client"

import { CreditCard, CustomerData, NewCustomer } from "@/types"
import CustomerForm from "@/components/CustomerForm"
import CustomerSelector from "@/components/CustomerSelector"
import CreditCardView from "@/components/CreditCardView"
import Modal from "@/components/Modal"
import Button from "@/components/Button"
import { ChevronLeft, CreditCardIcon } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreditCardsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | NewCustomer | null>(null)
  const [offers, setOffers] = useState<CreditCard[]>([])
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([])
  const [openSignInModal, setOpenSignInModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (offers?.length > 0) {
      setOpenSignInModal(false)
    } else {
      setOpenSignInModal(true)
    }
  }, [offers])

  const totalCreditAvailable = useMemo(() => {
    return selectedCards.reduce((acc, card) => acc + card.creditAvailable, 0).toFixed(2)
  }, [selectedCards])

  function handleSelectCustomer(customer: CustomerData | NewCustomer) {
    setSelectedCustomer(customer)
  }

  async function handleSubmit(customer: CustomerData) {
    setSelectedCustomer(customer)

    try {
      const response = await fetch("/api/credit-cards", {
        method: "POST",
        body: JSON.stringify({ data: customer }),
      })

      const { data: creditCards } = (await response.json()) as { data: CreditCard[] }

      if (response.ok) {
        setError(null)
        setOffers(creditCards)
      } else {
        setError("There was an error submitting the form. Please try again later.")
      }
    } catch (error) {
      // console.log("Error getting credit cards:", error)
      setError("There was an error submitting the form. Please try again later.")
    }
  }

  const handleCloseSignInModal = () => {
    if (!offers?.length) {
      router.push("/")
    }
    setOpenSignInModal(false)
  }

  function handleSelectCard(card: CreditCard) {
    if (selectedCards.some((c) => c.id === card.id)) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id))
    } else {
      setSelectedCards([...selectedCards, card])
    }
  }

  function handleApply() {
    setOpenSuccessModal(true)
  }

  function handleCloseSuccessModal() {
    router.push("/")
  }

  return (
    <>
      <div className="h-full">
        {offers?.length > 0 ? (
          <div className="h-full space-y-6 pb-6">
            <Link
              href="/"
              className="text-foreground-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Logout
            </Link>

            {/* Header */}
            <div className="space-y-2">
              <div className="font-montserrat text-foreground text-2xl font-bold">
                <span>Hi</span>
                <span className="capitalize">{" " + selectedCustomer?.firstName + ", "}</span>
                <span>
                  {"we have found " + (offers.length > 1 ? offers.length + " offers" : "an offer") + " for you"}
                </span>
              </div>
              <p className="text-foreground-muted">Select the credit cards that work best for you.</p>
            </div>

            {/* Credit cards grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {offers.map((offer) => (
                <CreditCardView
                  key={offer.id}
                  card={offer}
                  onSelect={handleSelectCard}
                  isSelected={selectedCards.some((c) => c.id === offer.id)}
                />
              ))}
            </div>

            {/* Order Summary */}
            {selectedCards.length > 0 && (
              <div className="bg-background sticky bottom-0 -mx-6 px-6 py-3">
                <div className="bg-card flex flex-col items-center space-y-4 rounded-2xl border p-6 shadow-sm">
                  <section className="flex items-center gap-2 text-lg font-semibold">
                    <div>Total credit available:</div>
                    <div className="font-bold">£{totalCreditAvailable}</div>
                  </section>
                  <Button variant="primary" className="w-full max-w-xs" onClick={handleApply}>
                    <CreditCardIcon className="h-4 w-4" />
                    Apply for {selectedCards.length > 1 ? selectedCards.length + " cards" : "a card"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          selectedCustomer && (
            <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
              <h2 className="font-montserrat text-foreground mb-2 text-2xl font-bold">No offers found</h2>
              <p className="text-foreground-muted text-balance">
                {"We couldn't find any credit card offers for your profile at this time."}
              </p>
              <Button variant="outline" onClick={() => router.push("/")}>
                Go back to home
              </Button>
            </div>
          )
        )}
      </div>

      {/* Sign in modal - Handles customer selection and form submission */}
      <Modal
        isOpen={openSignInModal}
        onClose={handleCloseSignInModal}
        title={selectedCustomer ? "Fill the form to continue" : "Sign in to check eligibility"}
        className={selectedCustomer ? "max-w-xl" : "max-w-md"}
      >
        {selectedCustomer ? (
          <CustomerForm customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} onSubmit={handleSubmit} />
        ) : (
          <CustomerSelector onSelect={handleSelectCustomer} />
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-500 bg-red-500/10 p-2">
            <p className="text-center text-sm font-medium text-balance text-red-600">{error}</p>
          </div>
        )}
      </Modal>

      {/* Success modal - Shows success message */}
      <Modal isOpen={openSuccessModal} onClose={handleCloseSuccessModal} className="max-w-fit">
        <div className="space-y-6 p-4 text-center">
          <h2 className="font-montserrat text-foreground text-2xl font-bold">Done!</h2>
          <p className="text-lg font-semibold text-balance">
            Your application has been submitted successfully.
            <br />
            Thank you for choosing us.
          </p>
          <Button variant="outline" className="mx-auto w-full max-w-xs" onClick={handleCloseSuccessModal}>
            Back to home
          </Button>
        </div>
      </Modal>
    </>
  )
}
