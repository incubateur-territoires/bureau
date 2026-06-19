import { jwtVerify } from "jose"
import { getJwks } from "./discovery"

export interface ProConnectUser {
  sub: string
  email: string
  givenName: string
  usualName: string
}

export async function parseProConnectUserinfo(
  body: string,
  expectedIssuer: string,
  expectedAudience: string,
): Promise<ProConnectUser> {
  let payload: Record<string, unknown>
  if (body.startsWith("{")) {
    payload = JSON.parse(body) as Record<string, unknown>
  } else {
    const jwks = await getJwks()
    const verified = await jwtVerify(body, jwks, {
      issuer: expectedIssuer,
      audience: expectedAudience,
    })
    payload = verified.payload as Record<string, unknown>
  }

  const sub = payload.sub
  const email = payload.email
  if (typeof sub !== "string" || typeof email !== "string") {
    throw new TypeError(
      "Userinfo ProConnect invalide: claims sub/email manquants",
    )
  }

  return {
    sub,
    email,
    givenName: typeof payload.given_name === "string" ? payload.given_name : "",
    usualName: typeof payload.usual_name === "string" ? payload.usual_name : "",
  }
}
