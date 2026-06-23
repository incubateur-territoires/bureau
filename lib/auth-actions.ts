"use server"

import { redirect } from "next/navigation"
import { auth, signOut } from "./auth"
import { getOidcConfig } from "./infrastructure/proconnect/discovery"
import { appUrl, authEnabled } from "./env"

/**
 * Déconnexion complète.
 *
 * En plus d'effacer la session locale NextAuth, on déclenche la déconnexion
 * RP-initiated côté ProConnect (`end_session_endpoint` + `id_token_hint`) pour
 * que l'utilisateur ne soit pas reconnecté silencieusement au prochain login.
 *
 * Si l'id_token ou l'endpoint de fin de session sont indisponibles, on retombe
 * proprement sur une simple déconnexion locale.
 */
export async function logout(): Promise<void> {
  let endSessionUrl: string | null = null

  if (authEnabled) {
    const session = await auth()
    const idToken = session?.idToken
    if (idToken) {
      try {
        const { end_session_endpoint } = await getOidcConfig()
        if (end_session_endpoint && appUrl) {
          const url = new URL(end_session_endpoint)
          url.searchParams.set("id_token_hint", idToken)
          url.searchParams.set("post_logout_redirect_uri", `${appUrl}/`)
          endSessionUrl = url.toString()
        }
      } catch {
        // Discovery indisponible : on se contente de la déconnexion locale.
      }
    }
  }

  await signOut({ redirect: false })
  redirect(endSessionUrl ?? "/")
}
