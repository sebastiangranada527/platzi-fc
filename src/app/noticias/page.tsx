import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { NewsCard } from "@/components/news/NewsCard"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Noticias",
  description: "Todas las noticias de Platzi FC: crónicas, entrevistas, novedades del club y más.",
}

export default async function NoticiasPage() {
  const supabase = await createClient()

  const { data: newsList } = await supabase
    .from("news")
    .select("*, category:category_id(*)")
    .order("published_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-2">Noticias</h1>
      <p className="text-muted-foreground mb-10">
        Lo último del mundo Platzi FC
      </p>

      {!newsList || newsList.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-5xl mb-4">📰</p>
          <p className="text-lg font-medium">Próximamente las primeras noticias</p>
          <p className="text-sm mt-2">Volvé pronto para estar al día con el club.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <div key={news.id} className="relative">
              <NewsCard news={news as Parameters<typeof NewsCard>[0]["news"]} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
