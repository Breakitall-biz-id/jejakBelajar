import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'
  })
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'teacher' | 'student'
          school_id: string | null
          class_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'admin' | 'teacher' | 'student'
          school_id?: string | null
          class_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'teacher' | 'student'
          school_id?: string | null
          class_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          address: string | null
          phone: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          grade: string
          school_id: string
          teacher_id: string | null
          academic_year: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          grade: string
          school_id: string
          teacher_id?: string | null
          academic_year: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          grade?: string
          school_id?: string
          teacher_id?: string | null
          academic_year?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          objectives: string | null
          criteria: string | null
          guidelines: string | null
          class_id: string
          created_by: string
          status: 'draft' | 'active' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          objectives?: string | null
          criteria?: string | null
          guidelines?: string | null
          class_id: string
          created_by: string
          status?: 'draft' | 'active' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          objectives?: string | null
          criteria?: string | null
          guidelines?: string | null
          class_id?: string
          created_by?: string
          status?: 'draft' | 'active' | 'completed'
          created_at?: string
          updated_at?: string
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
  }
}