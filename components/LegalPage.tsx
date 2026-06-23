import type { ReactNode } from "react"

/**
 * Gabarit commun aux pages de contenu légal (mentions, confidentialité,
 * accessibilité). Centralise la mise en page pour éviter la duplication
 * entre les trois pages.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated?: string
  children: ReactNode
}) {
  return (
    <section className="legal">
      <div className="legal__body">
        <h1 className="legal__title">{title}</h1>
        {updated && <p className="legal__updated">Mis à jour le {updated}.</p>}
        <div className="legal__content">{children}</div>
      </div>
    </section>
  )
}
