export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      club_info: {
        Row: {
          badge: Json | null
          colors: Json | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          founded_year: number | null
          history: Json | null
          id: string
          mission: string | null
          name: string
          social_media: Json | null
          stadium: Json | null
          updated_at: string
          values: string[] | null
          vision: string | null
        }
        Insert: {
          badge?: Json | null
          colors?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          founded_year?: number | null
          history?: Json | null
          id?: string
          mission?: string | null
          name?: string
          social_media?: Json | null
          stadium?: Json | null
          updated_at?: string
          values?: string[] | null
          vision?: string | null
        }
        Update: {
          badge?: Json | null
          colors?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          founded_year?: number | null
          history?: Json | null
          id?: string
          mission?: string | null
          name?: string
          social_media?: Json | null
          stadium?: Json | null
          updated_at?: string
          values?: string[] | null
          vision?: string | null
        }
        Relationships: []
      }
      match: {
        Row: {
          competition: string | null
          created_at: string
          id: string
          is_home: boolean | null
          match_date: string | null
          matchday: number | null
          opponent: string | null
          opponent_logo: Json | null
          score_away: number | null
          score_home: number | null
          status: string | null
          summary: Json | null
          updated_at: string
          venue: string | null
        }
        Insert: {
          competition?: string | null
          created_at?: string
          id?: string
          is_home?: boolean | null
          match_date?: string | null
          matchday?: number | null
          opponent?: string | null
          opponent_logo?: Json | null
          score_away?: number | null
          score_home?: number | null
          status?: string | null
          summary?: Json | null
          updated_at?: string
          venue?: string | null
        }
        Update: {
          competition?: string | null
          created_at?: string
          id?: string
          is_home?: boolean | null
          match_date?: string | null
          matchday?: number | null
          opponent?: string | null
          opponent_logo?: Json | null
          score_away?: number | null
          score_home?: number | null
          status?: string | null
          summary?: Json | null
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          body: Json | null
          category_id: string | null
          created_at: string
          excerpt: string | null
          featured: boolean
          id: string
          main_image: Json | null
          published_at: string
          seo: Json | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          body?: Json | null
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          main_image?: Json | null
          published_at?: string
          seo?: Json | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          body?: Json | null
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          main_image?: Json | null
          published_at?: string
          seo?: Json | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      player: {
        Row: {
          bio: Json | null
          created_at: string
          date_of_birth: string | null
          height_cm: number | null
          id: string
          is_active: boolean
          is_staff: boolean
          name: string
          nationality: string | null
          number: number | null
          photo: Json | null
          position: string | null
          slug: string
          social_media: Json | null
          stats: Json | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          bio?: Json | null
          created_at?: string
          date_of_birth?: string | null
          height_cm?: number | null
          id?: string
          is_active?: boolean
          is_staff?: boolean
          name: string
          nationality?: string | null
          number?: number | null
          photo?: Json | null
          position?: string | null
          slug: string
          social_media?: Json | null
          stats?: Json | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          bio?: Json | null
          created_at?: string
          date_of_birth?: string | null
          height_cm?: number | null
          id?: string
          is_active?: boolean
          is_staff?: boolean
          name?: string
          nationality?: string | null
          number?: number | null
          photo?: Json | null
          position?: string | null
          slug?: string
          social_media?: Json | null
          stats?: Json | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      sponsor: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          logo: Json | null
          name: string
          tier: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo?: Json | null
          name: string
          tier?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo?: Json | null
          name?: string
          tier?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type Category = Tables<"category">
export type ClubInfo = Tables<"club_info">
export type Match = Tables<"match">
export type News = Tables<"news">
export type Player = Tables<"player">
export type Sponsor = Tables<"sponsor">

export type MatchStatus = "scheduled" | "live" | "finished" | "postponed"
export type PlayerPosition = "Portero" | "Defensa" | "Mediocampista" | "Delantero"
export type SponsorTier = "principal" | "oficial" | "colaborador"
