import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description: "Déclaration d'accessibilité du Bureau ANCT",
}

export default function AccessibilitePage() {
  return (
    <LegalPage title="Déclaration d'accessibilité" updated="23 juin 2026">
      <p>
        L&apos;Agence Nationale de la Cohésion des Territoires s&apos;engage à
        rendre son service accessible, conformément à l&apos;article 47 de la
        loi n° 2005-102 du 11 février 2005.
      </p>
      <p>Cette déclaration s&apos;applique au Bureau ANCT.</p>

      <h2>État de conformité</h2>
      <p>
        Le Bureau ANCT est <strong>non conforme</strong> au RGAA. Le site
        n&apos;a pas encore été audité.
      </p>

      <h2>Amélioration et contact</h2>
      <p>
        Si vous n&apos;arrivez pas à accéder à un contenu ou à un service,
        vous pouvez contacter le responsable du Bureau ANCT pour être
        orienté vers une alternative accessible ou obtenir le contenu sous une
        autre forme.
      </p>
      <ul>
        <li>
          E-mail :{" "}
          <a href="mailto:contact@suite.anct.gouv.fr">
            contact@suite.anct.gouv.fr
          </a>
        </li>
      </ul>

      <h2>Voie de recours</h2>
      <p>
        Si vous avez signalé un défaut d&apos;accessibilité qui vous empêche
        d&apos;accéder à un contenu ou à un service et que vous n&apos;avez pas
        obtenu de réponse satisfaisante, vous pouvez :
      </p>
      <ul>
        <li>écrire un message au Défenseur des droits ;</li>
        <li>
          contacter le délégué du Défenseur des droits dans votre région ;
        </li>
        <li>
          envoyer un courrier par la poste (gratuit, ne pas affranchir) :
          Défenseur des droits — Libre réponse 71120 — 75342 Paris CEDEX 07.
        </li>
      </ul>
    </LegalPage>
  )
}
