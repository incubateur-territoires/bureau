import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du Bureau ANCT",
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur de la plateforme</h2>
      <p>
        Le Bureau ANCT est édité au sein de l&apos;Incubateur des Territoires
        de l&apos;Agence Nationale de la Cohésion des Territoires (ANCT),
        située :
      </p>
      <blockquote>
        ANCT
        <br />
        20 avenue de Ségur
        <br />
        75007 Paris
        <br />
        France
        <br />
        Téléphone : 01 85 58 60 00
      </blockquote>

      <h2>Directeur de la publication</h2>
      <p>
        Le directeur de la publication est Monsieur Stanislas Bourron,
        Directeur général de l&apos;ANCT.
      </p>

      <h2>Hébergement du site</h2>
      <p>La plateforme est hébergée par :</p>
      <blockquote>
        Scalingo SAS
        <br />
        3 place de Haguenau
        <br />
        67100 Strasbourg
        <br />
        France
      </blockquote>

      <h2>Propriété intellectuelle</h2>
      <p>
        Sauf mention explicite de propriété intellectuelle détenue par des
        tiers, les contenus de ce site sont proposés sous licence MIT. Le code
        source est disponible en licence libre.
      </p>
    </LegalPage>
  )
}
