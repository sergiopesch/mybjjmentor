
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bjj_techniques: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          video_url: string | null
          category: string
          difficulty: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          video_url?: string | null
          category: string
          difficulty: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          video_url?: string | null
          category?: string
          difficulty?: string
          user_id?: string
        }
      }
      training_sessions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          date: string
          start_time: string
          end_time: string
          description: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          date: string
          start_time: string
          end_time: string
          description: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          date?: string
          start_time?: string
          end_time?: string
          description?: string
          user_id?: string
        }
      }
      progress_logs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          date: string
          technique_id: string
          proficiency: number
          notes: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          date: string
          technique_id: string
          proficiency: number
          notes: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          date?: string
          technique_id?: string
          proficiency?: number
          notes?: string
          user_id?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          belt_rank: string | null
          experience_years: number | null
          weight_class: string | null
          goals: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          belt_rank?: string | null
          experience_years?: number | null
          weight_class?: string | null
          goals?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          belt_rank?: string | null
          experience_years?: number | null
          weight_class?: string | null
          goals?: string | null
        }
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
