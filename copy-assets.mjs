import { cp } from "node:fs/promises"

/**
 * Copie les assets statiques dans la sortie `standalone` de Next.js.
 *
 * Le mode `output: "standalone"` génère un serveur autonome avec son propre
 * `node_modules` tracé (~20 Mo), mais n'y inclut pas `.next/static` ni `public`.
 * On les recopie ici pour que `.next/standalone` soit déployable seul — ce qui
 * permet d'exclure les `node_modules` racine (~3 Go) du slug via `.slugignore`.
 *
 * Voir https://github.com/Scalingo/sample-nextjs-standalone
 */
await cp(".next/static", ".next/standalone/.next/static", { recursive: true })
await cp("public", ".next/standalone/public", { recursive: true })

console.log("✓ Assets copiés dans .next/standalone")
