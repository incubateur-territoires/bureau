export function initials(user: { name?: string | null; email: string }): string {
  const source = user.name?.trim() || user.email
  return source
    .split(/[\s.@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}
