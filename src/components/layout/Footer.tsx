import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/equipo", label: "Equipo" },
  { href: "/partidos", label: "Partidos" },
  { href: "/el-club", label: "El Club" },
  { href: "/contacto", label: "Contacto" },
]

const legalLinks = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
]

export function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] border-t border-white/10 text-white/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl mb-3">
              <span className="text-primary">⚽</span>
              <span>
                Platzi <span className="text-primary">FC</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Club de fútbol amateur con espíritu profesional. Formando jugadores y comunidad.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Secciones
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>contacto@platzifc.com</li>
              <li className="flex gap-4 mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Instagram de Platzi FC"
                >
                  Instagram
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="X (Twitter) de Platzi FC"
                >
                  X
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="YouTube de Platzi FC"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Platzi FC. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
