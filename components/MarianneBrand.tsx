import Link from "next/link"

export function MarianneBrand() {
  return (
    <Link href="/" className="brand" aria-label="Accueil — Bureau ANCT">
      <span className="brand__rf">
        <span className="brand__flag" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="brand__text">
          <span className="brand__title">
            République
            <br />
            Française
          </span>
          <span className="brand__motto">
            Liberté
            <br />
            Égalité
            <br />
            Fraternité
          </span>
        </span>
      </span>
      <span className="brand__sep" aria-hidden="true" />
      <img
        src="/images/logo.svg"
        alt="Agence Nationale de la Cohésion des Territoires"
        className="brand__anct"
      />
    </Link>
  )
}
