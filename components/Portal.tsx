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
                <Link
                  href={tool.url}
                  className="app-card"
                  aria-label={tool.name}
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
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
