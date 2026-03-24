import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/news/NewsCard"
import { createClient } from "@/lib/supabase/server"

export async function LatestNews() {
  const supabase = await createClient()

  const { data: newsList } = await supabase
    .from("news")
    .select("*, category:category_id(*)")
    .order("published_at", { ascending: false })
    .limit(3)

  if (!newsList || newsList.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Últimas noticias</h2>
        <Button variant="outline" size="sm" render={<Link href="/noticias" />}>
          Ver todas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((news) => (
          <div key={news.id} className="relative">
            <NewsCard news={news as Parameters<typeof NewsCard>[0]["news"]} />
          </div>
        ))}
      </div>
    </section>
  )
}
