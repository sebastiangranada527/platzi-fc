# Platzi FC — Guía para Claude

Sitio web oficial de Platzi FC. Next.js 16 App Router + Supabase + Tailwind v4. **Lee `node_modules/next/dist/docs/` antes de escribir código** — esta versión puede tener APIs diferentes a tu training data.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (úsalo para verificar tu trabajo)
npm run lint     # ESLint
npx tsc --noEmit # type-check sin compilar
```

## Stack

| Capa | Tecnología | Nota crítica |
|------|-----------|-------------|
| Framework | Next.js 16.2.1 App Router + TypeScript | Lee los docs en `node_modules/next/dist/docs/` |
| Estilos | Tailwind CSS v4 | Config en `globals.css`, **no existe `tailwind.config.ts`** |
| Componentes | shadcn/ui sobre `@base-ui/react` | **No es Radix UI** — ver patrones críticos abajo |
| Base de datos | Supabase (PostgreSQL) | Tipos generados en `src/lib/supabase/types.ts` |
| Email | Resend (opcional) | Si `RESEND_API_KEY` no existe, el form loguea en consola |

## Patrones críticos — leer antes de escribir código

### `@base-ui/react`: prop `render` en lugar de `asChild`

```tsx
// ❌ NO funciona — asChild no existe en @base-ui
<Button asChild><Link href="/ruta">Ir</Link></Button>

// ✅ Correcto
<Button render={<Link href="/ruta" />}>Ir</Button>
```

### Tailwind v4: tokens en `globals.css`

Los colores de marca se definen en `src/app/globals.css` dentro de `@theme inline {}`:
- `--brand-green: #98CA3F` → usar como `text-primary` o `var(--brand-green)`
- `--brand-dark: #0a0e1a` → usar como `var(--brand-dark)`

No crear `tailwind.config.ts` — no existe en este proyecto.

### Cliente Supabase: dos versiones

```ts
// Server Components, Route Handlers, Server Actions:
import { createClient } from "@/lib/supabase/server"
const supabase = await createClient()

// Client Components (navegador):
import { createClient } from "@/lib/supabase/client"
const supabase = createClient()
```

### ISR: revalidación por ruta

| Ruta | `revalidate` |
|------|:---:|
| `/`, `/noticias` | 60s |
| `/partidos` | 300s |
| `/noticias/[slug]`, `/equipo`, `/equipo/[slug]` | 3600s |
| `/el-club` | 86400s |

## Estructura del proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── layout.tsx          # Root layout — metadata base, Header, Footer
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Sitemap XML dinámico
│   ├── robots.ts           # robots.txt
│   ├── icon.svg            # Favicon
│   ├── opengraph-image.tsx # OG image global
│   ├── noticias/           # Listado + detalle [slug]
│   ├── equipo/             # Grid + ficha [slug]
│   ├── partidos/           # Próximos y resultados
│   ├── el-club/            # Historia y valores
│   ├── contacto/           # Formulario (Client Component)
│   └── api/contacto/       # POST — Zod + Resend
├── components/
│   ├── ui/                 # shadcn/ui: button, card, badge, input, sheet…
│   ├── layout/             # Header, Footer, MobileNav, SkipToContent
│   ├── home/               # HeroSection, NextMatch, LatestNews, SponsorsBar
│   ├── news/               # NewsCard
│   └── team/               # PlayerCard
└── lib/
    ├── supabase/
    │   ├── client.ts       # Browser client
    │   ├── server.ts       # Server client (cookies)
    │   └── types.ts        # Tipos generados — regenerar con MCP si cambia el schema
    └── utils.ts            # cn(), formatDate(), formatMatchDate(), slugify()
```

## Tablas de Supabase

`news` · `player` · `match` · `club_info` · `category` · `sponsor`

Constraints relevantes:
- `player.position`: `'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero'`
- `match.status`: `'scheduled' | 'live' | 'finished' | 'postponed'`

Si modificas el schema, regenera los tipos: usa el MCP de Supabase o `supabase gen types typescript`.

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=        # requerida
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # requerida
NEXT_PUBLIC_SITE_URL=            # default: https://platzi-fc-six.vercel.app
RESEND_API_KEY=                  # opcional — email de contacto
CONTACT_EMAIL_TO=                # opcional — destino del formulario
```

Ver `.env.local.example` para el template completo.
