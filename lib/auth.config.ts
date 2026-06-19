import type { NextAuthConfig } from "next-auth"

/**
 * Configuration de base de NextAuth, partagée entre le middleware (supprimé)
 * et le provider principal défini dans `auth.ts`.
 *
 * La stratégie de contrôle d'accès est gérée au niveau des pages serveur
 * (voir `getCurrentUser`), pas via le callback `authorized` du middleware.
 */
export const authConfig: NextAuthConfig = {
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/connexion" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.idToken = account.id_token
      return token
    },
  },
}
