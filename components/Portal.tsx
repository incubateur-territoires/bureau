import Link from "next/link"
import type { Tool } from "@/lib/tools"

export function Portal({
  userName,
  tools,
}: {
  userName: string
  tools: Tool[]
}) {
  return (
    <div className="portal">
      <div className="portal__body">
        <h1 className="portal__greeting">
          <span className="portal__hello">Bonjour</span> {userName}
        </h1>
        <p className="portal__subtitle">
          Bienvenue dans votre <strong>bureau ANCT</strong>.
        </p>

        <ul className="app-grid">
          {tools.map((tool) => {
            const isExternal = tool.url.startsWith("http")
            return (
              <li key={tool.id}>
                <article className="app-card">
                  {/*
                    Lien étiré : son ::after (CSS) couvre toute la carte, donc
                    un clic n'importe où ouvre l'application. Le lien d'aide
                    « ? » est positionné au-dessus (z-index) pour rester
                    cliquable indépendamment.
                  */}
                  <Link
                    href={tool.url}
                    className="app-card__main"
                    aria-label={`Ouvrir ${tool.name}`}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="app-card__icon">
                      <img src={tool.icon} alt="" aria-hidden="true" />
                      {tool.beta && <span className="app-card__beta">BETA</span>}
                    </span>
                    <h2 className="app-card__name">{tool.name}</h2>
                    <p className="app-card__desc">{tool.description}</p>
                  </Link>

                  {tool.helpUrl && (
                    <a
                      href={tool.helpUrl}
                      className="app-card__help"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Documentation de ${tool.name}`}
                      title={`Documentation de ${tool.name}`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M9.6 9.3a2.4 2.4 0 1 1 3.3 2.2c-.7.3-1 .8-1 1.5v.4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="16.4" r="1" fill="currentColor" />
                      </svg>
                    </a>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
