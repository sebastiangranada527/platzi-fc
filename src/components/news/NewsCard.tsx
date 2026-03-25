import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDateShort } from "@/lib/utils"
import type { News, Category } from "@/lib/supabase/types"

type NewsWithCategory = News & { category: Category | null }

interface NewsCardProps {
  news: NewsWithCategory
  headingLevel?: "h2" | "h3"
}

export function NewsCard({ news, headingLevel: Heading = "h3" }: NewsCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-[var(--brand-dark)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
          ⚽
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {news.category && (
            <Badge variant="secondary" className="text-xs">
              {news.category.name}
            </Badge>
          )}
          {news.featured && (
            <Badge className="text-xs bg-primary text-[#0a0e1a] border-primary font-semibold">
              Destacada
            </Badge>
          )}
        </div>

        <Heading className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/noticias/${news.slug}`} className="after:absolute after:inset-0">
            {news.title}
          </Link>
        </Heading>

        {news.excerpt && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {news.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t">
          <span>{formatDateShort(news.published_at)}</span>
          {news.author && <span>{news.author}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
