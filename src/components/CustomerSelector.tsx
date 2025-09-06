import { AVAILABLE_CUSTOMERS } from "@/constants"
import { CustomerData, NewCustomer } from "@/types"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function CustomerSelector({ onSelect }: { onSelect: (customer: CustomerData | NewCustomer) => void }) {
  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {AVAILABLE_CUSTOMERS.length > 0 &&
          AVAILABLE_CUSTOMERS.map((customer) => (
            <li key={customer.id}>
              <button className="customer-card" onClick={() => onSelect(customer)}>
                <Image
                  src={customer.profileImageUrl || ""}
                  alt={`${customer.firstName} ${customer.lastName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="font-montserrat text-foreground truncate text-base font-semibold">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-foreground-muted truncate text-sm">{customer.email}</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
          ))}
        <li key="new-customer">
          <button onClick={() => onSelect({ id: undefined })} className="customer-card">
            <Image
              src={"/images/customers/new_customer.png"}
              alt={`New customer`}
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="font-montserrat text-foreground flex-1 truncate text-left text-base font-semibold">
              New customer
            </h3>
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </div>
  )
}
