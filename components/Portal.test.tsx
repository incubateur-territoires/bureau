import { describe, it, expect, vi, afterEach } from "vitest"
import type { ComponentProps } from "react"
import { render, screen, cleanup } from "@testing-library/react"
import { Portal } from "./Portal"
import type { Tool } from "@/lib/tools"

vi.mock("next/link", () => ({
  default: (props: ComponentProps<"a">) => <a {...props} />,
}))

const sampleTools: Tool[] = [
  {
    id: "docs",
    name: "Docs",
    description: "Éditeur collaboratif",
    url: "https://docs.example.gouv.fr",
    icon: "/icons/docs.svg",
    targetBlank: true,
  },
  {
    id: "fichiers",
    name: "Fichiers",
    description: "Espace de stockage",
    url: "#",
    icon: "/icons/fichiers.svg",
    beta: true,
    targetBlank: true,
  },
]

afterEach(cleanup)

describe("<Portal>", () => {
  it("affiche le nom de l'utilisateur dans l'accueil", () => {
    render(<Portal userName="Armand Talot" tools={sampleTools} />)
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Armand Talot",
    )
  })

  it("rend une tuile par application", () => {
    render(<Portal userName="X" tools={sampleTools} />)
    expect(screen.getByText("Docs")).toBeTruthy()
    expect(screen.getByText("Fichiers")).toBeTruthy()
  })

  it("n'affiche le badge BETA que sur les apps concernées", () => {
    render(<Portal userName="X" tools={sampleTools} />)
    expect(screen.getAllByText("BETA")).toHaveLength(1)
  })

  it("ouvre les liens externes dans un nouvel onglet de façon sûre", () => {
    render(<Portal userName="X" tools={sampleTools} />)
    const link = screen.getByRole("link", { name: /Docs/ })
    expect(link.getAttribute("target")).toBe("_blank")
    expect(link.getAttribute("rel")).toContain("noopener")
  })

  it("n'ajoute pas target=_blank aux liens internes (#)", () => {
    render(<Portal userName="X" tools={sampleTools} />)
    const link = screen.getByRole("link", { name: /Fichiers/ })
    expect(link.getAttribute("target")).toBeNull()
  })
})
