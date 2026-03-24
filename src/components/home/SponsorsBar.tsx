import { createClient } from "@/lib/supabase/server"

export async function SponsorsBar() {
  const supabase = await createClient()

  const { data: sponsors } = await supabase
    .from("sponsor")
    .select("*")
    .eq("is_active", true)
    .order("tier")

  if (!sponsors || sponsors.length === 0) return null

  return (
    <section className="border-y border-border py-8">
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest text-center mb-6">
          Nuestros patrocinadores
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground font-semibold text-sm transition-colors"
              aria-label={`Patrocinador: ${sponsor.name}`}
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
