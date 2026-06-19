import { describe, it, expect, vi, beforeEach } from "vitest"
import { SignJWT, generateKeyPair, type JWTVerifyGetKey } from "jose"

vi.mock("./discovery", () => ({ getJwks: vi.fn() }))
import { getJwks } from "./discovery"
import { parseProConnectUserinfo } from "./userinfo"

const ISS = "https://proconnect.test.gouv.fr"
const AUD = "test-client-id"

describe("parseProConnectUserinfo", () => {
  beforeEach(() => vi.clearAllMocks())

  it("parse un userinfo JSON valide", async () => {
    const body = JSON.stringify({
      sub: "abc-123",
      email: "agent@anct.gouv.fr",
      given_name: "Armand",
      usual_name: "Talot",
    })

    const user = await parseProConnectUserinfo(body, ISS, AUD)

    expect(user).toEqual({
      sub: "abc-123",
      email: "agent@anct.gouv.fr",
      givenName: "Armand",
      usualName: "Talot",
    })
  })

  it("rejette si les claims sub/email manquent", async () => {
    const body = JSON.stringify({ sub: "abc-123" })
    await expect(parseProConnectUserinfo(body, ISS, AUD)).rejects.toThrow(
      TypeError,
    )
  })

  it("vérifie la signature d'un userinfo JWT et extrait les claims", async () => {
    const { publicKey, privateKey } = await generateKeyPair("RS256")
    vi.mocked(getJwks).mockResolvedValue(
      publicKey as unknown as JWTVerifyGetKey,
    )

    const jwt = await new SignJWT({
      email: "agent@anct.gouv.fr",
      given_name: "Armand",
      usual_name: "Talot",
    })
      .setProtectedHeader({ alg: "RS256" })
      .setSubject("abc-123")
      .setIssuer(ISS)
      .setAudience(AUD)
      .sign(privateKey)

    const user = await parseProConnectUserinfo(jwt, ISS, AUD)

    expect(user.sub).toBe("abc-123")
    expect(user.email).toBe("agent@anct.gouv.fr")
    expect(user.usualName).toBe("Talot")
  })

  it("rejette un JWT signé avec un mauvais issuer", async () => {
    const { publicKey, privateKey } = await generateKeyPair("RS256")
    vi.mocked(getJwks).mockResolvedValue(
      publicKey as unknown as JWTVerifyGetKey,
    )

    const jwt = await new SignJWT({ email: "x@y.fr" })
      .setProtectedHeader({ alg: "RS256" })
      .setSubject("abc")
      .setIssuer("https://attaquant.example.com")
      .setAudience(AUD)
      .sign(privateKey)

    await expect(parseProConnectUserinfo(jwt, ISS, AUD)).rejects.toThrow()
  })
})
