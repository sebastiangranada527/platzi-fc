import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: news } = await supabase
    .from("news")
    .select("title, excerpt")
    .eq("slug", slug)
    .single()

  if (!news) return {}

  return {
    title: news.title,
    description: news.excerpt ?? undefined,
  }
}

export default async function NoticiaDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news } = await supabase
    .from("news")
    .select("*, category:category_id(*)")
    .eq("slug", slug)
    .single()

  if (!news) notFound()

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="text-sm text-muted-foreground mb-8 flex gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/noticias" className="hover:text-foreground transition-colors">Noticias</Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{news.title}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {(news.category as { name: string } | null)?.name && (
            <Badge variant="secondary">
              {(news.category as { name: string }).name}
            </Badge>
          )}
          {news.featured && (
            <Badge className="bg-primary/20 text-primary border-primary/30">Destacada</Badge>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{news.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={news.published_at}>{formatDate(news.published_at)}</time>
          {news.author && (
            <>
              <span>·</span>
              <span>{news.author}</span>
            </>
          )}
        </div>
      </header>

      <div className="aspect-video bg-gradient-to-br from-primary/20 to-[var(--brand-dark)] rounded-xl mb-8 flex items-center justify-center text-6xl opacity-40">
        ⚽
      </div>

      {news.excerpt && (
        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 mb-8">
          {news.excerpt}
        </p>
      )}

      {news.body ? (
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-sm italic">
            [Contenido completo disponible próximamente]
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground">Contenido no disponible.</p>
      )}

      <div className="mt-12 pt-8 border-t">
        <Button variant="outline" render={<Link href="/noticias" />}>
          ← Volver a noticias
        </Button>
      </div>
    </article>
  )
}
