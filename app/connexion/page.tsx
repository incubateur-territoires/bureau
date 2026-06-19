"use client"

import { ProConnectButton } from "@gouvfr-lasuite/ui-kit"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ConnexionPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push("/")
  }, [session, router])

  return (
    <section className="login">
      <div className="login__card">
        <div className="login__head">
          <span className="login__badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <p className="login__eyebrow">Bureau ANCT</p>
        </div>

        <h1 className="login__title">Connexion à votre espace</h1>
        <p className="login__desc">
          Authentifiez-vous avec votre compte professionnel via
          <strong> ProConnect</strong> pour accéder à l&apos;ensemble de vos
          outils.
        </p>

        <div className="login__action">
          <ProConnectButton onClick={() => signIn("proconnect", { callbackUrl: "/" })} />
        </div>

        <div className="login__help">
          <p className="login__help-title">Qu&apos;est-ce que ProConnect&nbsp;?</p>
          <p className="login__help-text">
            ProConnect est la solution d&apos;authentification de l&apos;État
            qui permet d&apos;accéder à plusieurs services en ligne avec un
            seul identifiant.
          </p>
          <a
            className="login__help-link"
            href="https://proconnect.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <p className="login__secure">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Connexion sécurisée — Vos données sont protégées.
      </p>
    </section>
  )
}
