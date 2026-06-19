# Bureau ANCT

> **🚧 Proof of Concept (POC) — non déployé en production**
>
> Ce dépôt est un prototype en cours de validation. Il présente l'interface
> et le workflow d'authentification d'un portail d'accès aux outils numériques
> de l'ANCT. Les fonctionnalités sont volontairement limitées (voir
> [Statut du POC](#statut-du-poc)).

Portail interne permettant aux agents de l'ANCT d'accéder à l'ensemble de leurs
outils numériques (Tchap, Docs, Grist, Visio, etc.) via une authentification
unique ProConnect.

## Statut du POC

Ce projet est un **proof of concept** destiné à une démonstration à un groupe
de travail. Il n'est **pas déployé en production** et ne doit pas être utilisé
tel quel pour un service réel.

### Ce qui fonctionne

- Authentification ProConnect (OIDC + PKCE) via NextAuth v5
- Mode démo local simulant le workflow ProConnect sans identifiants réels
- Affichage du catalogue d'outils sous forme de grille de tuiles
- En-tête et pied de page conformes aux standards de l'État (ui-kit La Suite)
- Page de connexion dédiée
- Tests unitaires (Vitest) — 24 tests couvrant l'auth, le catalogue, les utils

### Limitations connues

- **Pages légales manquantes** : les liens « Mentions légales »,
  « Politique de confidentialité » et « Accessibilité » du pied de page
  pointent vers des pages non implémentées (404)
- **Outils avec URL placeholder** : certains outils du catalogue
  (`Fichiers`, `Projets`, `Assistant IA`, `Mattermost`) ont une URL `#` —
  la liste définitive des outils et de leurs liens est en cours d'arbitrage
- **Pas de tests de bout en bout** (E2E) — seuls des tests unitaires sont en place
- **Pas de conformité RGAA auditée** — l'accessibilité n'a pas été formellement vérifiée
- **Pas de connexion à un backend** — le catalogue est codé en dur
  dans [`app/lib/tools.ts`](app/lib/tools.ts)

### Décisions techniques

Le projet utilise [`@gouvfr-lasuite/ui-kit`](https://github.com/suitenumerique/ui-kit)
(la bibliothèque de composants de « La Suite numérique ») plutôt que
[`@codegouvfr/react-dsfr`](https://github.com/codegouvfr/react-dsfr). Ce choix
pourrait être remis en question après validation du POC.

## Démarrage rapide

### Prérequis

- Node.js >= 20
- npm >= 9

### Installation

```bash
npm install
```

### Lancement en local (mode démo, sans ProConnect)

Le mode démo simule le workflow ProConnect : l'utilisateur clique sur
« Se connecter », puis sur le bouton ProConnect, et est authentifié
instantanément avec l'email configuré. Aucun secret ProConnect n'est nécessaire.

```bash
cp .env.template .env.local
# Dans .env.local, désactiver l'auth réelle et fournir un email de démo :
#   AUTH_ENABLED=false
#   AUTH_DEV_BYPASS_EMAIL=marie.curie@anct.gouv.fr
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Lancement avec ProConnect réel

```bash
cp .env.template .env.local
# Renseigner dans .env.local :
#   PROCONNECT_ISSUER=https://proconnect.integraci.gouv.fr
#   PROCONNECT_CLIENT_ID=...
#   PROCONNECT_CLIENT_SECRET=...
#   AUTH_SECRET=$(openssl rand -hex 32)
#   AUTH_ENABLED=true   (valeur par défaut)
npm run dev
```

## Variables d'environnement

| Variable | Description | Requis |
|---|---|---|
| `AUTH_ENABLED` | `true` (défaut) active ProConnect ; `false` active le mode démo | non |
| `AUTH_DEV_BYPASS_EMAIL` | Email de l'utilisateur en mode démo (ignoré en production) | mode démo |
| `PROCONNECT_ISSUER` | URL de l'issuer ProConnect | auth réelle |
| `PROCONNECT_CLIENT_ID` | Client ID ProConnect | auth réelle |
| `PROCONNECT_CLIENT_SECRET` | Client secret ProConnect | auth réelle |
| `AUTH_SECRET` | Secret de chiffrement des sessions (`openssl rand -hex 32`) | auth réelle |

## Structure du projet

```
app/                                 # Routing uniquement
├── api/auth/[...nextauth]/route.ts  # Routes NextAuth
├── connexion/page.tsx               # Page de connexion (bouton ProConnect)
├── layout.tsx                       # Layout racine
├── page.tsx                         # Accueil (welcome / portal)
├── not-found.tsx                    # 404 française
├── globals.css                      # Styles
└── icon.svg                         # Favicon

components/                          # Composants UI partagés
├── Header.tsx                       # En-tête (Marianne, ANCT, menu utilisateur)
├── Footer.tsx                       # Pied de page
├── MarianneBrand.tsx                # Bloc Marianne + logo ANCT
├── Portal.tsx                       # Grille des outils
├── Providers.tsx                    # SessionProvider, ui-kit
└── WelcomeGuest.tsx                 # Vue d'accueil non connecté

lib/                                 # Logique métier
├── env.ts                           # Validation des variables d'env (zod)
├── auth.ts                          # Provider ProConnect (OIDC) + provider démo
├── auth.config.ts                   # Config NextAuth de base
├── tools.ts                         # Catalogue des outils
├── initials.ts                      # Calcul des initiales
└── infrastructure/proconnect/       # Discovery OIDC + parsing userinfo (JWT/JSON)

public/
├── icons/                           # Icônes des outils (SVG)
└── images/logo.svg                  # Logo ANCT
```

## Stack technique

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript strict**
- **NextAuth v5** (OIDC ProConnect, sessions JWT)
- **`@gouvfr-lasuite/ui-kit`** (LaGaufre, UserMenu, Footer, ProConnectButton)
- **Tailwind CSS v4** (PostCSS)
- **Vitest** + Testing Library

## Catalogue des outils

Le catalogue est défini dans [`app/lib/tools.ts`](app/lib/tools.ts). Chaque outil
comporte un id, un nom, une description, une URL, une icône et un flag
`targetBlank`. Le flag `beta` affiche un badge.

Pour ajouter ou modifier un outil, éditer ce fichier.

## Tests

```bash
npm run test        # Vitest (unitaires)
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint
```

## Déploiement

Le déploiement cible est **Scalingo**. La configuration se trouve dans
[`scalingo.json`](scalingo.json). Le [`Dockerfile`](Dockerfile) utilise le mode
`standalone` de Next.js et est fourni à titre indicatif.

```bash
git push scalingo main
```

> ⚠️ Le POC n'est pas déployé. Le déploiement sera configuré après validation.

## Sécurité

Pour signaler une vulnérabilité, voir [`SECURITY.md`](SECURITY.md).

## Licence

Ce projet est sous licence MIT — voir [LICENSE](LICENSE).

## Contexte

Développé par l'[Agence Nationale de la Cohésion des Territoires (ANCT)](https://anct.gouv.fr).
