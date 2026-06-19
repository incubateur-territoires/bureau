import { describe, it, expect } from "vitest"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { tools } from "./tools"

describe("catalogue d'applications (tools)", () => {
  it("expose au moins une application", () => {
    expect(tools.length).toBeGreaterThan(0)
  })

  it("a des identifiants uniques", () => {
    const ids = tools.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("a un nom, une description et une url non vides", () => {
    for (const t of tools) {
      expect(t.name.trim(), `name de ${t.id}`).not.toBe("")
      expect(t.description.trim(), `description de ${t.id}`).not.toBe("")
      expect(t.url.trim(), `url de ${t.id}`).not.toBe("")
    }
  })

  it("référence des icônes présentes dans public/", () => {
    for (const t of tools) {
      const path = join(process.cwd(), "public", t.icon)
      expect(existsSync(path), `icône manquante: ${t.icon} (${t.id})`).toBe(true)
    }
  })

  it("ouvre les liens externes (http) dans un nouvel onglet", () => {
    const external = tools.filter((t) => t.url.startsWith("http"))
    for (const t of external) {
      expect(t.targetBlank, `${t.id} devrait ouvrir un nouvel onglet`).toBe(true)
    }
  })
})
