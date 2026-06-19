import Link from "next/link"

export default function NotFound() {
  return (
    <section className="portal">
      <div className="portal__body portal__body--centered">
        <h1 className="portal__greeting">Page introuvable</h1>
        <p className="portal__subtitle">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="header-login">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  )
}
