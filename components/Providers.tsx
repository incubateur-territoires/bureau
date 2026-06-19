"use client"

import { CunninghamProvider } from "@gouvfr-lasuite/ui-kit"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CunninghamProvider>{children}</CunninghamProvider>
    </SessionProvider>
  )
}
