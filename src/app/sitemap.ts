import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://platzi-fc.vercel.app"

  const supabase = await createClient()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partidos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/el-club`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  const { data: news } = await supabase
    .from("news")
    .select("slug, updated_at")

  const newsRoutes: MetadataRoute.Sitemap = (news ?? []).map((n) => ({
    url: `${baseUrl}/noticias/${n.slug}`,
    lastModified: new Date(n.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const { data: players } = await supabase
    .from("player")
    .select("slug, updated_at")
    .eq("is_active", true)

  const playerRoutes: MetadataRoute.Sitemap = (players ?? []).map((p) => ({
    url: `${baseUrl}/equipo/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...newsRoutes, ...playerRoutes]
}
