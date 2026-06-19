import "@gouvfr-lasuite/ui-kit/style"
import "@gouvfr-lasuite/ui-kit/fonts/Marianne"
import "@fontsource/material-icons/index.css"
import "./globals.css"

import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { Providers } from "@/components/Providers"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "Bureau ANCT",
    template: "%s | Bureau ANCT",
  },
  description: "Portail des outils pour les agents de l'ANCT",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="app-shell">
            <Header
              user={
                user
                  ? { name: user.name ?? null, email: user.email ?? "" }
                  : null
              }
            />
            <main className="app-shell__main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
