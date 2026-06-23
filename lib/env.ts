import { z } from "zod"

/**
 * Validation centralisée des variables d'environnement.
 *
 * Parse et valide `process.env` une seule fois au chargement du module.
 * Tout accès aux variables d'environnement dans le reste du code doit
 * passer par les exports de ce fichier.
 */

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  AUTH_ENABLED: z.string().optional().default("true"),
  AUTH_DEV_BYPASS_EMAIL: z.string().email().optional(),
  AUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  AUTH_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  PROCONNECT_ISSUER: z.string().url().optional(),
  PROCONNECT_CLIENT_ID: z.string().min(1).optional(),
  PROCONNECT_CLIENT_SECRET: z.string().min(1).optional(),
})

export type Env = z.infer<typeof envSchema>

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    console.error("❌ Variables d'environnement invalides :", errors)
    throw new Error(
      "Configuration invalide. Corrigez les variables d'environnement listées ci-dessus.",
    )
  }
  return result.data
}

export const env = parseEnv()

export const isProduction = env.NODE_ENV === "production"

/**
 * URL publique canonique de l'application.
 * Sert notamment de `post_logout_redirect_uri` pour la déconnexion ProConnect.
 */
export const appUrl =
  env.AUTH_URL ??
  env.NEXTAUTH_URL ??
  (!isProduction ? "http://localhost:3000" : undefined)

export const authEnabled =
  env.AUTH_ENABLED.trim().toLowerCase() !== "false"

/**
 * Email utilisé en mode démo (AUTH_ENABLED=false).
 * Ignoré en production.
 */
export const devBypassEmail =
  !isProduction ? env.AUTH_DEV_BYPASS_EMAIL?.trim() || null : null

/**
 * Secret de chiffrement des sessions NextAuth.
 * En dev, un secret par défaut est utilisé si aucun n'est fourni ;
 * en production, son absence est fatale.
 */
export const authSecret =
  env.AUTH_SECRET ??
  env.NEXTAUTH_SECRET ??
  (!isProduction ? "bureau-anct-dev-secret-not-for-production" : undefined)

function assertRequiredEnv(): void {
  const missing: string[] = []

  if (isProduction && !authSecret) {
    missing.push("AUTH_SECRET (ou NEXTAUTH_SECRET)")
  }

  if (authEnabled) {
    if (!env.PROCONNECT_ISSUER) missing.push("PROCONNECT_ISSUER")
    if (!env.PROCONNECT_CLIENT_ID) missing.push("PROCONNECT_CLIENT_ID")
    if (!env.PROCONNECT_CLIENT_SECRET) missing.push("PROCONNECT_CLIENT_SECRET")
  } else if (!devBypassEmail && !isProduction) {
    missing.push("AUTH_DEV_BYPASS_EMAIL (requis en mode démo)")
  }

  if (missing.length === 0) return

  const message = `Configuration incomplète — variables manquantes : ${missing.join(", ")}`

  if (isProduction) {
    throw new Error(message)
  }
  console.warn(`⚠️ ${message}`)
}

assertRequiredEnv()
