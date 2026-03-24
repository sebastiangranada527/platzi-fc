import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-black text-primary mb-2">4</p>
      <div className="text-6xl mb-2">⚽</div>
      <p className="text-8xl font-black text-primary mb-6">4</p>
      <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Este balón se fue fuera del campo. La página que buscas no existe o fue movida.
      </p>
      <Button render={<Link href="/" />}>Volver al inicio</Button>
    </section>
  )
}
