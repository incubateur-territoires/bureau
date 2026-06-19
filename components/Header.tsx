"use client"

import { LaGaufre, UserMenu } from "@gouvfr-lasuite/ui-kit"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useSyncExternalStore } from "react"
import { initials } from "@/lib/initials"
import { MarianneBrand } from "./MarianneBrand"

export type HeaderUser = { name: string | null; email: string }

/**
 * `useSyncExternalStore` avec un subscribe no-op : le getter client renvoie
 * `true`, le getter serveur `false`. Permet de savoir si on est hydraté côté
 * client sans déclencher de hydration mismatch sur les composants ui-kit
 * (LaGaufre, UserMenu) qui ne rendent qu'en client.
 */
const subscribeNoop = () => () => {}
function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}

export function Header({ user }: { user: HeaderUser | null }) {
  const mounted = useIsClient()

  return (
    <header className="app-header">
      <MarianneBrand />

      <div className="app-header__actions">
        <a
          href="https://anct.gouv.fr/aide"
          target="_blank"
          rel="noopener noreferrer"
          className="app-header__help"
          aria-label="Aide"
          title="Aide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M9.6 9.3a2.4 2.4 0 1 1 3.3 2.2c-.7.3-1 .8-1 1.5v.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.4" r="1" fill="currentColor" />
          </svg>
        </a>

        {mounted && <LaGaufre />}

        {!user ? (
          <Link href="/connexion" className="header-login">
            Se connecter
          </Link>
        ) : !mounted ? (
          <span className="header-avatar" aria-hidden="true">
            {initials(user)}
          </span>
        ) : (
          <UserMenu
            user={{ full_name: user.name ?? undefined, email: user.email }}
            logout={() => signOut({ callbackUrl: "/" })}
          />
        )}
      </div>
    </header>
  )
}
