import { CustomerData, NewCustomer } from "@/types"
import CustomerSelector from "@/components/CustomerSelector"
import CustomerForm from "@/components/CustomerForm"
import Modal from "@/components/Modal"
import { useState } from "react"

export default function CustomerLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | NewCustomer | null>(null)

  function handleSelectCustomer(customer: CustomerData | NewCustomer) {
    setSelectedCustomer(customer)
  }

  function handleSubmit(customer: CustomerData) {
    onClose()
    // console.log("Customer submitted:", customer)
    // TODO: Mock up API call and display results
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedCustomer ? "Fill the form to continue" : "Sign in to check eligibility"}
      className={selectedCustomer ? "max-w-xl" : "max-w-sm"}
    >
      {selectedCustomer ? (
        <CustomerForm customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} onSubmit={handleSubmit} />
      ) : (
        <CustomerSelector onSelect={handleSelectCustomer} />
      )}
    </Modal>
  )
}
