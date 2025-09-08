import type { Metadata } from "next"
import { Montserrat, Nunito } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/utils/cn"
import AppLogo from "@/components/AppLogo"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Credit Cards - Eligibility Checker",
  description: "The easiest way to check your credit card eligibility",
}

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-dvh">
      <body
        className={cn(
          montserrat.variable,
          nunito.variable,
          "grid h-full min-h-full grid-rows-[auto_1fr_auto] overflow-y-auto"
        )}
      >
        <header className="text-navbar bg-white">
          <div className="mx-auto flex w-full max-w-[1200px] gap-4 p-6">
            <Link href="/">
              <AppLogo className="h-6 w-auto" />
            </Link>
          </div>
        </header>
        <main className="relative mx-auto flex w-full max-w-[1200px] flex-col p-6">{children}</main>
        <footer className="w-full bg-white">
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 p-6">
            <section className="flex-1 space-y-2">
              <AppLogo id="footer-credit-cards-logo" className="h-5 w-auto" />
              <article className="text-foreground-muted text-sm font-medium">
                <p>This is an open source demo app and has no commercial purpose.</p>
                <Link
                  href="https://github.com/oscargonzalezdev"
                  target="_blank"
                  className="font-nunito hover:text-secondary w-fit text-sm font-medium text-inherit hover:underline"
                >
                  Made by Oscar Gonzalez
                </Link>
              </article>
            </section>
            <Link href="https://github.com/oscargonzalezdev/credit-cards" target="_blank">
              <Image src="/github_icon.svg" alt="GitHub" width={24} height={24} title="Source Code" />
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
