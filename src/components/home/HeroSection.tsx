import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative bg-[var(--brand-dark)] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            white 40px,
            white 41px
          )`,
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 py-24 md:py-36 flex flex-col items-center text-center gap-6">
        <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
          Temporada 2026
        </Badge>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Platzi <span className="text-primary">FC</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
          De equipo amateur a imagen profesional. Seguí cada partido, conocé a
          nuestros jugadores y viví la pasión de Platzi FC.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button size="lg" className="font-semibold" render={<Link href="/partidos" />}>
            Ver partidos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/equipo" />}
          >
            Conocer el equipo
          </Button>
        </div>
      </div>
    </section>
  )
}
