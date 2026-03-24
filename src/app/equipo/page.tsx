import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { PlayerCard } from "@/components/team/PlayerCard"
import type { PlayerPosition } from "@/lib/supabase/types"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Equipo",
  description: "Conocé el plantel completo de Platzi FC: jugadores, posiciones, estadísticas y cuerpo técnico.",
}

const positions: PlayerPosition[] = ["Portero", "Defensa", "Mediocampista", "Delantero"]

export default async function EquipoPage() {
  const supabase = await createClient()

  const { data: players } = await supabase
    .from("player")
    .select("*")
    .eq("is_active", true)
    .eq("is_staff", false)
    .order("number", { ascending: true })

  const { data: staff } = await supabase
    .from("player")
    .select("*")
    .eq("is_active", true)
    .eq("is_staff", true)

  const byPosition = (pos: PlayerPosition) =>
    players?.filter((p) => p.position === pos) ?? []

  const hasPlayers = players && players.length > 0

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-2">Equipo</h1>
      <p className="text-muted-foreground mb-12">Plantel temporada 2026</p>

      {!hasPlayers ? (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-5xl mb-4">👕</p>
          <p className="text-lg font-medium">Plantel en construcción</p>
          <p className="text-sm mt-2">Pronto conocerás a todos los jugadores.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {positions.map((pos) => {
            const group = byPosition(pos)
            if (group.length === 0) return null
            return (
              <section key={pos}>
                <h2 className="text-xl font-bold mb-6 pb-2 border-b flex items-center gap-2">
                  <span className="text-primary text-2xl">
                    {pos === "Portero" ? "🧤" : pos === "Defensa" ? "🛡️" : pos === "Mediocampista" ? "⚙️" : "🎯"}
                  </span>
                  {pos}s
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.map((player) => (
                    <div key={player.id} className="relative">
                      <PlayerCard player={player} />
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Cuerpo técnico */}
      {staff && staff.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b">Cuerpo técnico</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {staff.map((member) => (
              <div key={member.id} className="relative">
                <PlayerCard player={member} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
