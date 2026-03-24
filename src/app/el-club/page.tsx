import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "El Club",
  description: "Historia, misión, visión y valores de Platzi FC. Conocé quiénes somos y de dónde venimos.",
}

export default async function ElClubPage() {
  const supabase = await createClient()

  const { data: club } = await supabase
    .from("club_info")
    .select("*")
    .limit(1)
    .single()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero */}
      <div className="relative bg-[var(--brand-dark)] text-white rounded-2xl p-10 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-5 text-[20rem] font-black flex items-center justify-center leading-none pointer-events-none">
          ⚽
        </div>
        <div className="relative">
          <h1 className="text-5xl font-black mb-2">
            {club?.name ?? "Platzi FC"}
          </h1>
          {club?.founded_year && (
            <p className="text-primary font-semibold text-lg">
              Fundado en {club.founded_year}
            </p>
          )}
        </div>
      </div>

      {/* Historia */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-primary">📖</span> Historia
        </h2>
        {club?.history ? (
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <p className="text-sm italic">[Historia del club — próximamente]</p>
          </div>
        ) : (
          <div className="bg-muted/50 rounded-xl p-8 text-center text-muted-foreground">
            <p className="text-4xl mb-3">🏟️</p>
            <p>La historia del club estará disponible muy pronto.</p>
          </div>
        )}
      </section>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>🎯</span> Misión
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {club?.mission ?? "Formar jugadores y comunidad con espíritu de superación, compañerismo y pasión por el fútbol."}
          </p>
        </div>
        <div className="bg-[var(--brand-dark)]/5 border border-[var(--brand-dark)]/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>🔭</span> Visión
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {club?.vision ?? "Ser el referente del fútbol amateur con la mejor proyección digital y la comunidad más unida."}
          </p>
        </div>
      </div>

      {/* Valores */}
      {(club?.values && club.values.length > 0) && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">💪</span> Valores
          </h2>
          <div className="flex flex-wrap gap-3">
            {club.values.map((value) => (
              <span
                key={value}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
              >
                {value}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Sede */}
      {club?.stadium && (club.stadium as Record<string, string>).name && (
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">🏟️</span> Nuestra sede
          </h2>
          <div className="border rounded-xl p-6 space-y-2 text-sm">
            <p className="font-semibold text-lg">
              {(club.stadium as Record<string, string>).name}
            </p>
            {(club.stadium as Record<string, string>).address && (
              <p className="text-muted-foreground">
                📍 {(club.stadium as Record<string, string>).address}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
