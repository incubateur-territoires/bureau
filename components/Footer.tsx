"use client"

import { Footer as UIKitFooter } from "@gouvfr-lasuite/ui-kit"

export function Footer() {
  return (
    <UIKitFooter
      logo={{
        src: "/images/logo.svg",
        alt: "Agence Nationale de la Cohésion des Territoires",
        width: "120px",
      }}
      legalLinks={[
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
        { label: "Accessibilité : non conforme", href: "/accessibilite" },
      ]}
      externalLinks={[
        { label: "ANCT", href: "https://anct.gouv.fr" },
        { label: "service-public.fr", href: "https://service-public.fr" },
        { label: "legifrance.gouv.fr", href: "https://legifrance.gouv.fr" },
      ]}
    />
  )
}
