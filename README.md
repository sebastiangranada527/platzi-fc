# Platzi FC — Sitio Web Oficial

Sitio web del club de fútbol **Platzi FC**. De equipo amateur a imagen profesional.

**Live:** https://platzi-fc-six.vercel.app

## Estado del MVP

| Sprint | Descripción | Estado |
|--------|-------------|:------:|
| S1 — Setup e infraestructura | Scaffold, Supabase, CI | ✅ |
| S2 — Design system y layout | Header, Footer, brand colors | ✅ |
| S3 — Páginas core + datos | Homepage, Noticias, Equipo | ✅ |
| S4 — Páginas restantes | Partidos, El Club, Contacto | ✅ |
| S5 — SEO, QA y deploy | Sitemap, JSON-LD, favicon, OG image, Vercel | ✅ |

## Stack

- **Framework**: Next.js 16.2 (App Router + TypeScript)
- **Estilos**: Tailwind CSS v4 + shadcn/ui (`@base-ui/react`)
- **Base de datos**: Supabase (PostgreSQL)
- **Hosting**: Vercel Hobby (free tier)
- **Email**: Resend (free tier — 3K emails/mes)
- **Formularios**: React Hook Form + Zod

## Páginas

| Ruta | Descripción | ISR |
|------|-------------|:---:|
| `/` | Homepage: Hero, próximo partido, noticias, sponsors | 60s |
| `/noticias` | Listado de noticias | 60s |
| `/noticias/[slug]` | Detalle de noticia | 3600s |
| `/equipo` | Plantel agrupado por posición | 3600s |
| `/equipo/[slug]` | Ficha individual del jugador | 3600s |
| `/el-club` | Historia, misión, visión, valores | 86400s |
| `/partidos` | Próximos partidos y resultados | 300s |
| `/contacto` | Formulario de contacto | — |

## Setup local

### 1. Clonar el repositorio

```bash
git clone https://github.com/sebastiangranada527/platzi-fc.git
cd platzi-fc
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Completar `.env.local` con los valores del proyecto Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key

# Opcional — si no se configura, el formulario loguea en consola
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=contacto@platzifc.com
```

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
src/
├── app/                  # Rutas y páginas (App Router)
│   ├── layout.tsx        # Root layout con Header y Footer
│   ├── page.tsx          # Homepage
│   ├── noticias/
│   ├── equipo/
│   ├── partidos/
│   ├── el-club/
│   ├── contacto/
│   └── api/contacto/     # API Route para formulario de contacto
├── components/
│   ├── layout/           # Header, Footer, MobileNav, SkipToContent
│   ├── home/             # HeroSection, NextMatch, LatestNews, SponsorsBar
│   ├── news/             # NewsCard
│   ├── team/             # PlayerCard
│   └── ui/               # shadcn/ui components
└── lib/
    ├── supabase/         # client.ts, server.ts, types.ts
    └── utils.ts          # formatDate, formatMatchDate, cn, slugify
```

## Base de datos (Supabase)

Tablas en producción:

| Tabla | Descripción | Registros |
|-------|-------------|:---------:|
| `category` | Categorías de noticias | 3 |
| `club_info` | Información del club (singleton) | 1 |
| `sponsor` | Patrocinadores | 4 |
| `player` | Jugadores y cuerpo técnico | 14 |
| `match` | Partidos (pasados y futuros) | 10 |
| `news` | Noticias y artículos | 8 |

### Gestión de contenido

El contenido se administra desde el **Table Editor de Supabase** (`supabase.com/dashboard`). No se requiere CMS externo en esta fase.

| Acción | Tabla | Pasos |
|--------|-------|-------|
| Crear noticia | `news` | Insert row → llenar title, slug, excerpt, author, category_id |
| Agregar jugador | `player` | Insert row → llenar name, slug, number, position |
| Cargar resultado | `match` | Editar fila → score_home, score_away, status = 'finished' |
| Editar info del club | `club_info` | Editar la única fila existente |

## Nota sobre `@base-ui/react`

shadcn/ui en este proyecto usa `@base-ui/react` como primitivas. El patrón `asChild` **no existe** — se usa la prop `render`:

```tsx
// ✅ Correcto
<Button render={<Link href="/ruta" />}>Ir</Button>

// ❌ No funciona
<Button asChild><Link href="/ruta">Ir</Link></Button>
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción local
npm run lint     # ESLint
```

## Deploy

El proyecto está en producción en **https://platzi-fc-six.vercel.app**

Deploy automático en Vercel desde la rama `master`. Cada push hace deploy a producción; cada PR genera una URL de preview.

Variables de entorno requeridas en el dashboard de Vercel:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key pública de Supabase |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio en producción |
| `RESEND_API_KEY` | API key de Resend (opcional) |
| `CONTACT_EMAIL_TO` | Email destino del formulario (opcional) |
