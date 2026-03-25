import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { formatMatchDate } from "@/lib/utils"

export async function NextMatch() {
  const supabase = await createClient()

  const { data: match } = await supabase
    .from("match")
    .select("*")
    .eq("status", "scheduled")
    .order("match_date", { ascending: true })
    .limit(1)
    .single()

  if (!match) return null

  return (
    <section className="bg-[var(--brand-dark)] py-10">
      <div className="container mx-auto px-4">
        <p className="text-white/50 text-xs uppercase tracking-widest mb-4 text-center">
          Próximo partido
        </p>
        <Card className="bg-[var(--brand-dark-card)] border-white/10 text-white max-w-2xl mx-auto">
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Local */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                ⚽
              </div>
              <span className="font-bold text-lg text-center">Platzi FC</span>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                {match.is_home ? "Local" : "Visitante"}
              </Badge>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-3xl font-black text-white/60">VS</span>
              <div className="flex items-center gap-1 text-xs text-white/50">
                <Calendar className="w-3 h-3" />
                {match.match_date ? formatMatchDate(match.match_date) : "Por confirmar"}
              </div>
              {match.competition && (
                <Badge variant="outline" className="border-white/20 text-white/60 text-xs mt-1">
                  {match.competition}
                </Badge>
              )}
            </div>

            {/* Rival */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                🏆
              </div>
              <span className="font-bold text-lg text-center">{match.opponent}</span>
              {match.venue && (
                <span className="flex items-center gap-1 text-xs text-white/50">
                  <MapPin className="w-3 h-3" />
                  {match.venue}
                </span>
              )}
            </div>
          </div>
        </Card>

        <div className="text-center mt-4">
          <Button
            variant="link"
            className="text-primary hover:text-primary/80"
            render={<Link href="/partidos" />}
          >
            Ver todos los partidos →
          </Button>
        </div>
      </div>
    </section>
  )
}
