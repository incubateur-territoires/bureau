import { describe, it, expect } from "vitest"
import { initials } from "./initials"

describe("initials", () => {
  it("prend les deux premières initiales du nom", () => {
    expect(initials({ name: "Armand Talot", email: "x@y.fr" })).toBe("AT")
  })

  it("met en majuscules", () => {
    expect(initials({ name: "armand talot", email: "x@y.fr" })).toBe("AT")
  })

  it("gère un prénom seul", () => {
    expect(initials({ name: "Armand", email: "x@y.fr" })).toBe("A")
  })

  it("préserve les accents", () => {
    expect(initials({ name: "Élise Martin", email: "x@y.fr" })).toBe("ÉM")
  })

  it("retombe sur l'email si le nom est vide ou blanc", () => {
    expect(initials({ name: "   ", email: "jean.dupont@anct.gouv.fr" })).toBe(
      "JD",
    )
  })

  it("retombe sur l'email si le nom est null", () => {
    expect(initials({ name: null, email: "agent@anct.gouv.fr" })).toBe("AA")
  })

  it("gère les espaces multiples", () => {
    expect(initials({ name: "Marie   Claire", email: "x@y.fr" })).toBe("MC")
  })
})
