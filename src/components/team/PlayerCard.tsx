import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Player } from "@/lib/supabase/types"

const positionColors: Record<string, string> = {
  Portero: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  Defensa: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  Mediocampista: "bg-green-500/20 text-green-700 border-green-500/30",
  Delantero: "bg-red-500/20 text-red-600 border-red-500/30",
}

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
      {/* Photo */}
      <div className="relative aspect-[3/4] bg-gradient-to-b from-[var(--brand-dark)] to-primary/20">
        <div className="absolute inset-0 flex items-end justify-center pb-6 text-7xl opacity-20">
          👤
        </div>
        {player.number !== null && (
          <span className="absolute top-3 right-3 text-5xl font-black text-white/10">
            {player.number}
          </span>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            {player.number !== null && (
              <span className="text-xs font-bold text-primary">#{player.number} </span>
            )}
            <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">
              <Link href={`/equipo/${player.slug}`} className="after:absolute after:inset-0">
                {player.name}
              </Link>
            </h3>
          </div>
        </div>
        {player.position && (
          <Badge
            variant="outline"
            className={`text-xs ${positionColors[player.position] ?? ""}`}
          >
            {player.position}
          </Badge>
        )}
        {player.nationality && (
          <p className="text-xs text-muted-foreground mt-2">{player.nationality}</p>
        )}
      </CardContent>
    </Card>
  )
}
