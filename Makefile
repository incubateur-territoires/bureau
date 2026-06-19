# ==============================================================================
# Makefile - Portail ProConnect ANCT
# ==============================================================================

.PHONY: help install dev build start lint test deploy

# ------------------------------------------------------------------------------
# Variables
# ------------------------------------------------------------------------------

NODE_VERSION := 20

# ------------------------------------------------------------------------------
# Cibles principales
# ------------------------------------------------------------------------------

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances
	npm install

dev: ## Lance le serveur de développement
	npm run dev

build: ## Construit l'application pour la production
	npm run build

start: ## Lance l'application en production
	npm run start

lint: ## Lance le linter
	npm run lint

# ------------------------------------------------------------------------------
# Déploiement
# ------------------------------------------------------------------------------

deploy: build ## Déploie sur Scalingo
	git push scalingo main

# ------------------------------------------------------------------------------
# Utilitaires
# ------------------------------------------------------------------------------

clean: ## Nettoie les fichiers temporaires
	rm -rf .next node_modules

reset: clean install ## Réinitialise le projet

# ------------------------------------------------------------------------------
# Docker
# ------------------------------------------------------------------------------

docker-build: ## Construit l'image Docker
	docker build -t bureau-anct .

docker-run: ## Lance le conteneur Docker
	docker run -p 3000:3000 bureau-anct
