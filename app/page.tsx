import { getCurrentUser } from "@/lib/auth"
import { tools } from "@/lib/tools"
import { Portal } from "@/components/Portal"
import { WelcomeGuest } from "@/components/WelcomeGuest"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    return <WelcomeGuest />
  }

  return (
    <Portal userName={user.name || user.email || "Agent ANCT"} tools={tools} />
  )
}
