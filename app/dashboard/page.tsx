'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Target, Award, Activity, Brain, Heart, Handshake, Lightbulb, User } from 'lucide-react'
import { createClient } from '@/lib/supabase'

// Komponen untuk Statistik Card
function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  color = "text-blue-600"
}: {
  title: string
  value: string | number
  description: string
  icon: any
  trend?: 'up' | 'down'
  trendValue?: string
  color?: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
        {trend && trendValue && (
          <div className={`flex items-center text-xs mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trendValue} dari bulan lalu
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Komponen untuk Activity Item
function ActivityItem({
  title,
  description,
  time,
  type
}: {
  title: string
  description: string
  time: string
  type: 'assessment' | 'project' | 'reflection' | 'observation'
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assessment': return 'bg-blue-100 text-blue-800'
      case 'reflection': return 'bg-purple-100 text-purple-800'
      case 'observation': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assessment': return '📊'
      case 'project': return '📚'
      case 'reflection': return '💭'
      case 'observation': return '👁️'
      default: return '📝'
    }
  }

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs ${getTypeColor(type)}`}>
          {getTypeIcon(type)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}

// Komponen Progress Bar untuk Dimensi P5
function DimensionProgress({
  dimension,
  score,
  status,
  color
}: {
  dimension: string
  score: number
  status: string
  color: string
}) {
  const percentage = (score / 4) * 100

  return (
    <div className="p-4 rounded-lg border bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{dimension}</span>
        <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700`}>
          {status}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-gray-600">{score.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRole = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      // Jika email guru@jejakbelajar.id, set role ke 'teacher' langsung
      if (data?.user?.email === 'guru@jejakbelajar.id') {
        setRole('teacher')
        setLoading(false)
        return
      }
      // Jika email admin@jejakbelajar.id, set role ke 'admin' langsung
      if (data?.user?.email === 'admin@jejakbelajar.id') {
        setRole('admin')
        setLoading(false)
        return
      }
      // Cek role dari user_metadata atau ambil dari tabel profiles
      let userRole = data?.user?.user_metadata?.role || null
      if (!userRole && data?.user?.email) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('email', data.user.email).single()
        userRole = profile?.role || null
      }
      setRole(userRole)
      setLoading(false)
    }
    fetchRole()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading dashboard...</div>
  }

  if (!role) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Akun tidak memiliki role, hubungi admin.</div>
  }

  // ADMIN DASHBOARD
  if (role === 'admin') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600 mb-4">Kelola akun guru/murid, kelas, tahun ajaran, struktur data, laporan agregat, statistik penggunaan, dan reset akun.</p>
        {/* Fitur admin: manajemen akun, kelas, tahun ajaran, laporan agregat, statistik, reset akun */}
        {/* ...tampilkan komponen admin di sini... */}
      </div>
    )
  }

  // GURU DASHBOARD
  if (role === 'teacher' || role === 'guru') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
        <p className="text-gray-600 mb-4">
          Selamat datang, Anda login sebagai <span className="font-semibold text-blue-700">Guru</span>. Silakan gunakan menu di sebelah kiri untuk mengakses fitur utama Anda.
        </p>
      </div>
    )
  }

  // MURID DASHBOARD
  if (role === 'student' || role === 'murid') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Murid</h1>
        <p className="text-gray-600 mb-4">Akses projek, penilaian diri/teman, jurnal, komentar guru, skor rata-rata penilaian teman.</p>
        {/* Fitur murid: akses projek, penilaian diri/teman, jurnal, komentar guru, skor rata-rata */}
        {/* ...tampilkan komponen murid di sini... */}
      </div>
    )
  }

  // Default fallback
  return <div className="min-h-screen flex items-center justify-center text-red-500">Role tidak dikenali.</div>
}