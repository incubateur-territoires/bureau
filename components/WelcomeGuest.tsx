import Link from "next/link"

export function WelcomeGuest() {
  return (
    <section className="portal">
      <div className="portal__body portal__body--centered">
        <h1 className="portal__greeting">
          <span className="portal__hello">Bienvenue</span> sur le bureau ANCT
        </h1>
        <p className="portal__subtitle">
          Connectez-vous pour accéder à l&apos;ensemble de vos outils.
        </p>
        <Link href="/connexion" className="header-login">
          Se connecter
        </Link>
      </div>
    </section>
  )
}
