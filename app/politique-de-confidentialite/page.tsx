import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du Bureau ANCT",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="23 juin 2026">
      <p>
        Établie par l&apos;Agence Nationale de la Cohésion des Territoires
        (ANCT).
      </p>

      <h2>Qui traite vos données ?</h2>
      <p>
        L&apos;Incubateur des Territoires de l&apos;Agence Nationale de la
        Cohésion des Territoires (ANCT) est responsable du traitement des
        données personnelles mis en œuvre par le Bureau ANCT.
      </p>
      <blockquote>
        ANCT
        <br />
        20 avenue de Ségur, 75007 Paris, France
        <br />
        Téléphone : 01 85 58 60 00
        <br />
        Mail : info@anct.gouv.fr
      </blockquote>
      <p>
        L&apos;ANCT s&apos;engage à ce que les traitements de données
        personnelles effectués sur le Bureau ANCT soient conformes au
        règlement général sur la protection des données (RGPD) et à la loi
        Informatique et Libertés.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        L&apos;ANCT met en œuvre un traitement de données à caractère
        personnel sur la base des missions d&apos;intérêt public dont elle est
        investie (art. 6-1-e du RGPD). Ce traitement a pour finalités :
      </p>
      <ul>
        <li>
          authentifier les agents via ProConnect et sécuriser l&apos;accès au
          portail ;
        </li>
        <li>
          personnaliser l&apos;accueil de l&apos;utilisateur (affichage de son
          nom) ;
        </li>
        <li>assurer le bon fonctionnement technique du service.</li>
      </ul>
      <p>
        Les données collectées sont limitées au strict nécessaire au regard de
        ces finalités.
      </p>

      <h2>Catégories de données traitées</h2>
      <ul>
        <li>Identifiant technique ProConnect (sub) ;</li>
        <li>Adresse e-mail professionnelle ;</li>
        <li>Prénom et nom d&apos;usage.</li>
      </ul>
      <p>
        Ces données sont transmises par ProConnect lors de la connexion. Elles
        sont conservées uniquement le temps de la session de navigation, sous
        la forme d&apos;un jeton chiffré stocké dans un cookie de session.
        Aucune donnée personnelle n&apos;est conservée dans une base de
        données.
      </p>
      <p>
        Les outils accessibles depuis le portail sont des services distincts
        disposant de leur propre politique de confidentialité. Le Bureau ANCT
        ne trace pas votre navigation au sein de ces services tiers.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données de session sont conservées uniquement le temps nécessaire à
        votre authentification et sont supprimées à la déconnexion ou à
        l&apos;expiration de la session.
      </p>

      <h2>Qui peut avoir accès à vos données ?</h2>
      <ul>
        <li>
          Les membres habilités de l&apos;équipe du Bureau ANCT, dans le cadre
          de leurs missions ;
        </li>
        <li>
          l&apos;hébergeur du service (Scalingo), uniquement pour les besoins
          d&apos;exploitation technique.
        </li>
      </ul>
      <p>
        L&apos;ANCT s&apos;engage à n&apos;opérer aucune commercialisation des
        données et à ne pas les communiquer à des tiers, en dehors des cas
        prévus par la loi.
      </p>

      <h2>Quels sont vos droits et comment les exercer ?</h2>
      <p>Vous disposez :</p>
      <ul>
        <li>d&apos;un droit d&apos;information et d&apos;accès à vos données ;</li>
        <li>d&apos;un droit de rectification ;</li>
        <li>d&apos;un droit d&apos;opposition ;</li>
        <li>d&apos;un droit à la limitation du traitement.</li>
      </ul>
      <p>
        Pour exercer vos droits :{" "}
        <a href="mailto:info@anct.gouv.fr">info@anct.gouv.fr</a> ou la
        déléguée à la protection des données :{" "}
        <a href="mailto:dpo@anct.gouv.fr">dpo@anct.gouv.fr</a>.
      </p>
      <p>
        Si vous estimez que vos droits n&apos;ont pas été respectés, vous
        pouvez adresser une réclamation à la CNIL — 3 Place de Fontenoy, TSA
        80715, 75334 Paris CEDEX 07.
      </p>

      <h2>Ce site n&apos;affiche pas de bannière de consentement</h2>
      <p>
        Le Bureau ANCT ne dépose aucun cookie de suivi d&apos;audience. La
        seule trace stockée est le cookie de session nécessaire à votre
        authentification, qui est strictement nécessaire au fonctionnement du
        service et ne nécessite pas de consentement.
      </p>
    </LegalPage>
  )
}
