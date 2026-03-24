import type { Metadata } from "next"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { formatMatchDate } from "@/lib/utils"
import type { Match, MatchStatus } from "@/lib/supabase/types"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Partidos",
  description: "Calendario de partidos, resultados y próximas fechas de Platzi FC.",
}

const statusLabel: Record<MatchStatus, string> = {
  scheduled: "Programado",
  live: "En vivo",
  finished: "Finalizado",
  postponed: "Postergado",
}

const statusClass: Record<MatchStatus, string> = {
  scheduled: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  live: "bg-green-500/20 text-green-600 border-green-500/30 animate-pulse",
  finished: "bg-muted text-muted-foreground",
  postponed: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
}

export default async function PartidosPage() {
  const supabase = await createClient()

  const { data: upcoming } = await supabase
    .from("match")
    .select("*")
    .in("status", ["scheduled", "live"])
    .order("match_date", { ascending: true })

  const { data: past } = await supabase
    .from("match")
    .select("*")
    .eq("status", "finished")
    .order("match_date", { ascending: false })
    .limit(10)

  const MatchRow = ({ match }: { match: Match }) => {
    const status = (match.status ?? "scheduled") as MatchStatus
    return (
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Equipo local */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">⚽</div>
              <span className="font-bold">
                {match.is_home ? "Platzi FC" : match.opponent}
              </span>
            </div>

            {/* Marcador / VS */}
            <div className="flex flex-col items-center min-w-[80px] text-center gap-1">
              {status === "finished" ? (
                <span className="text-2xl font-black">
                  {match.score_home} — {match.score_away}
                </span>
              ) : (
                <span className="text-xl font-black text-muted-foreground">VS</span>
              )}
              <Badge variant="outline" className={`text-xs ${statusClass[status]}`}>
                {statusLabel[status]}
              </Badge>
            </div>

            {/* Equipo visitante */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="font-bold">
                {match.is_home ? match.opponent : "Platzi FC"}
              </span>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">🏆</div>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t text-xs text-muted-foreground">
            {match.match_date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatMatchDate(match.match_date)}
              </span>
            )}
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {match.venue}
              </span>
            )}
            {match.competition && (
              <Badge variant="outline" className="text-xs">
                {match.competition}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-2">Partidos</h1>
      <p className="text-muted-foreground mb-12">Calendario y resultados — Temporada 2026</p>

      {/* Próximos */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-primary">📅</span> Próximos partidos
        </h2>
        {!upcoming || upcoming.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center border rounded-lg">
            No hay partidos programados próximamente.
          </p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((match) => <MatchRow key={match.id} match={match} />)}
          </div>
        )}
      </section>

      {/* Resultados */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-primary">📊</span> Resultados
        </h2>
        {!past || past.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center border rounded-lg">
            Todavía no hay resultados cargados.
          </p>
        ) : (
          <div className="space-y-3">
            {past.map((match) => <MatchRow key={match.id} match={match} />)}
          </div>
        )}
      </section>
    </div>
  )
}
