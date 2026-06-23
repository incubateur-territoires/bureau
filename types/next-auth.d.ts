/**
 * Augmentation des types NextAuth : on conserve l'`id_token` ProConnect dans
 * le JWT et la session pour pouvoir l'utiliser comme `id_token_hint` lors de
 * la déconnexion RP-initiated (voir `lib/auth-actions.ts`).
 */
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    idToken?: string
    user: DefaultSession["user"]
  }
}

// L'interface JWT est déclarée dans @auth/core/jwt (next-auth/jwt ne fait que
// la ré-exporter), c'est donc ce module qu'il faut augmenter.
declare module "@auth/core/jwt" {
  interface JWT {
    idToken?: string
  }
}
