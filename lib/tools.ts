export interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon: string
  /** Page de documentation / centre d'aide du produit. Optionnel. */
  helpUrl?: string
  beta?: boolean
  targetBlank?: boolean
}

export const tools: Tool[] = [
  {
    id: "fichiers",
    name: "Fichiers",
    description: "Espace de stockage",
    url: "https://fichiers.suite.anct.gouv.fr",
    icon: "/icons/fichiers.svg",
    helpUrl: "https://aide.suite.anct.gouv.fr/socle/fichiers",
    targetBlank: true,
  },
  {
    id: "docs",
    name: "Docs",
    description: "Éditeur de texte collaboratif",
    url: "https://docs.numerique.gouv.fr",
    icon: "/icons/docs.svg",
    targetBlank: true,
  },
  {
    id: "visio",
    name: "Visio",
    description: "Visioconférence et transcription",
    url: "https://visio.suite.anct.gouv.fr",
    icon: "/icons/visio.png",
    helpUrl:
      "https://docs.numerique.gouv.fr/docs/2b2d85c6-f76f-4c0a-83eb-fa494678eb10/",
    beta: true,
    targetBlank: true,
  },
  {
    id: "transcript",
    name: "Transcripts",
    description: "Transcription audio en texte",
    url: "https://transcripts.numerique.gouv.fr",
    icon: "/icons/transcript.svg",
    targetBlank: true,
  },
  {
    id: "projets",
    name: "Projets",
    description: "Gestion de projets",
    url: "https://projets.suite.anct.gouv.fr",
    icon: "/icons/projets.svg",
    targetBlank: true,
  },
  {
    id: "grist",
    name: "Grist",
    description: "Tableur et base de données",
    url: "https://grist.incubateur.anct.gouv.fr",
    icon: "/icons/grist.png",
    helpUrl: "https://support.getgrist.com/",
    targetBlank: true,
  },
  {
    id: "assistant-ia",
    name: "Assistant IA",
    description: "Agent conversationnel",
    url: "https://assistant.numerique.gouv.fr",
    icon: "/icons/ai.svg",
    helpUrl:
      "https://docs.numerique.gouv.fr/docs/5be2a9c9-f6fc-494a-a831-1354b1de5c1b/",
    beta: true,
    targetBlank: true,
  },
  {
    id: "france-transfert",
    name: "France Transfert",
    description: "Envoi de fichiers lourds",
    url: "https://francetransfert.numerique.gouv.fr",
    icon: "/icons/france-transfert.svg",
    targetBlank: true,
  },
  {
    id: "tchap",
    name: "Tchap",
    description: "Tchat interministériel",
    url: "https://tchap.gouv.fr",
    icon: "/icons/tchap.svg",
    helpUrl:
      "https://docs.numerique.gouv.fr/docs/b1ba66ea-2760-4608-a1ac-aa3748c6358f/",
    targetBlank: true,
  },
  {
    id: "mattermost",
    name: "Mattermost",
    description: "Tchat ANCT",
    url: "https://chat.incubateur.anct.gouv.fr",
    icon: "/icons/mattermost.svg",
    targetBlank: true,
  },
]
