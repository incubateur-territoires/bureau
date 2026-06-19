# Politique de sécurité

## Signalement d'une vulnérabilité

L'ANCT prend la sécurité de ses applications au sérieux. Si vous découvrez une
vulnérabilité dans ce projet, merci de la signaler de manière responsable.

### Procédure

- **Ne pas** ouvrir d'issue publique décrivant la vulnérabilité
- Envoyer un email à `securite@anct.gouv.fr` avec :
  - une description du problème
  - les étapes pour le reproduire
  - l'impact potentiel
- Vous recevrez un accusé de réception dans les meilleurs délais

### Périmètre

Ce dépôt est un **proof of concept (POC)** non déployé en production. Les
signalements sont néanmoins les bienvenus et seront évalués en fonction de leur
pertinence pour le projet final.

## Bonnes pratiques

- Ne jamais commiter de secrets (clés API, mots de passe, tokens) dans le dépôt
- Utiliser des variables d'environnement pour toute configuration sensible
- Signaler tout exemple de secret exposé découvert dans l'historique du dépôt
