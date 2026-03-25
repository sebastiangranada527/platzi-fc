import { Suspense } from "react"
import { HeroSection } from "@/components/home/HeroSection"
import { NextMatch } from "@/components/home/NextMatch"
import { LatestNews } from "@/components/home/LatestNews"
import { SponsorsBar } from "@/components/home/SponsorsBar"
import { Skeleton } from "@/components/ui/skeleton"

export const revalidate = 60

const sportsTeamJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "Platzi FC",
  sport: "Soccer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://platzi-fc.vercel.app",
  foundingDate: "2020",
  location: {
    "@type": "Place",
    name: "Campo Platzi",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }}
      />
      <HeroSection />
      <Suspense fallback={<div className="bg-[var(--brand-dark)] py-10 h-48" />}>
        <NextMatch />
      </Suspense>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-72 w-full" />
              ))}
            </div>
          </div>
        }
      >
        <LatestNews />
      </Suspense>
      <Suspense fallback={null}>
        <SponsorsBar />
      </Suspense>
    </>
  )
}
