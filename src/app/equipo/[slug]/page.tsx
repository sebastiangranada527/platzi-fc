import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: player } = await supabase
    .from("player")
    .select("name, position, nationality")
    .eq("slug", slug)
    .single()

  if (!player) return {}

  return {
    title: player.name,
    description: `Ficha de ${player.name} — ${player.position ?? "Jugador"} de Platzi FC${player.nationality ? ` · ${player.nationality}` : ""}.`,
  }
}

export default async function PlayerDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: player } = await supabase
    .from("player")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!player) notFound()

  const stats = player.stats as Record<string, number> | null

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://platzi-fc.vercel.app"

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    nationality: player.nationality ?? undefined,
    url: `${baseUrl}/equipo/${player.slug}`,
    memberOf: {
      "@type": "SportsTeam",
      name: "Platzi FC",
      url: baseUrl,
    },
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <nav className="text-sm text-muted-foreground mb-8 flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/equipo" className="hover:text-foreground transition-colors">Equipo</Link>
        <span>/</span>
        <span className="text-foreground">{player.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="aspect-[3/4] bg-gradient-to-b from-[var(--brand-dark)] to-primary/20 rounded-xl flex items-end justify-center pb-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-7xl font-black text-white/10">
            {player.number}
          </div>
          <div className="text-7xl opacity-30">👤</div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            {player.number !== null && (
              <p className="text-primary font-bold text-lg">#{player.number}</p>
            )}
            <h1 className="text-4xl font-black mb-2">{player.name}</h1>
            <div className="flex flex-wrap gap-2">
              {player.position && (
                <Badge variant="secondary">{player.position}</Badge>
              )}
              {player.is_staff && <Badge>Cuerpo técnico</Badge>}
              {player.nationality && (
                <Badge variant="outline">{player.nationality}</Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {player.date_of_birth && (
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">
                  Fecha de nacimiento
                </p>
                <p className="font-medium">{formatDate(player.date_of_birth)}</p>
              </div>
            )}
            {player.height_cm && (
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Altura</p>
                <p className="font-medium">{player.height_cm} cm</p>
              </div>
            )}
            {player.weight_kg && (
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Peso</p>
                <p className="font-medium">{player.weight_kg} kg</p>
              </div>
            )}
          </div>

          {stats && Object.keys(stats).length > 0 && (
            <div>
              <h2 className="font-bold mb-3">Estadísticas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: "goals", label: "Goles" },
                  { key: "assists", label: "Asist." },
                  { key: "matchesPlayed", label: "Partidos" },
                  { key: "yellowCards", label: "T. Amar." },
                ].map(({ key, label }) =>
                  stats[key] !== undefined ? (
                    <Card key={key}>
                      <CardContent className="p-3 text-center">
                        <p className="text-2xl font-black text-primary">{stats[key]}</p>
                        <p className="text-xs text-muted-foreground">{label}</p>
                      </CardContent>
                    </Card>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t">
        <Button variant="outline" render={<Link href="/equipo" />}>
          ← Volver al equipo
        </Button>
      </div>
    </div>
  )
}
