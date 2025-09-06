"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export default function Modal({ isOpen, onClose, children, title, className = "" }: ModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="animate-fade-in fixed inset-0 z-10 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className={`bg-card relative z-20 w-full transform rounded-2xl border text-left shadow-2xl transition-all ${className}`}
          role="dialog"
          aria-modal="true"
        >
          {title && (
            <div className="flex items-center justify-between border-b p-6">
              <h2 id="modal-title" className="font-montserrat text-xl font-bold">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-foreground-muted hover:text-foreground hover:bg-surface cursor-pointer rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className={title ? "p-6" : "p-6"}>{children}</div>
        </div>
      </div>
    </div>
  )
}
