import Link from "next/link"
import { MobileNav } from "./MobileNav"

const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/equipo", label: "Equipo" },
  { href: "/partidos", label: "Partidos" },
  { href: "/el-club", label: "El Club" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--brand-dark)]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white text-xl hover:opacity-90 transition-opacity"
          aria-label="Platzi FC - Inicio"
        >
          <span className="text-primary">⚽</span>
          <span>
            Platzi <span className="text-primary">FC</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  )
}
