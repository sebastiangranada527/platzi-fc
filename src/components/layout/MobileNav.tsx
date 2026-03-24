"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/equipo", label: "Equipo" },
  { href: "/partidos", label: "Partidos" },
  { href: "/el-club", label: "El Club" },
  { href: "/contacto", label: "Contacto" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="md:hidden"
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            aria-label="Abrir menú"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-[var(--brand-dark)] border-white/10 w-72">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <nav className="flex flex-col gap-1 mt-8" aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md text-lg font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
