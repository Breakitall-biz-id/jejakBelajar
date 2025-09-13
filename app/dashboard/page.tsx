'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Target, Award, Activity, Brain, Heart, Handshake, Lightbulb, User } from 'lucide-react'

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
      case 'project': return 'bg-green-100 text-green-800'
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
        <p className="text-xs text-gray-400 mt-1">{time}</p>
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
  // Sample data untuk aktivitas terbaru P5
  const recentActivities = [
    {
      title: "Jurnal Refleksi P5 Diselesaikan",
      description: "28 siswa menyelesaikan jurnal refleksi Proyek Kewirausahaan",
      time: "5 menit yang lalu",
      type: "reflection" as const
    },
    {
      title: "Penilaian Diri Baru",
      description: "45 kuisioner penilaian diri dimensi Beriman & Berakhlak Mulia",
      time: "12 menit yang lalu",
      type: "assessment" as const
    },
    {
      title: "Observasi Pembelajaran",
      description: "Guru mengisi 15 lembar observasi dimensi Bernalar Kritis",
      time: "23 menit yang lalu",
      type: "observation" as const
    },
    {
      title: "Proyek P5 Baru",
      description: "Proyek Budaya Lokal untuk Kelas XI-IPA 2 telah dibuat",
      time: "1 jam yang lalu",
      type: "project" as const
    },
    {
      title: "Penilaian Sebaya Selesai",
      description: "Dimensi Bergotong Royong - 32 siswa saling menilai",
      time: "2 jam yang lalu",
      type: "assessment" as const
    }
  ]

  // Data untuk progress dimensi P5
  const dimensionProgress = [
    { dimension: "Beriman & Berakhlak Mulia", score: 3.2, status: "Berkembang", color: "blue" },
    { dimension: "Mandiri", score: 2.8, status: "Sedang Berkembang", color: "green" },
    { dimension: "Bergotong Royong", score: 3.6, status: "Berkembang", color: "purple" },
    { dimension: "Bernalar Kritis", score: 2.9, status: "Sedang Berkembang", color: "orange" },
    { dimension: "Kreatif", score: 3.4, status: "Berkembang", color: "pink" }
  ]

  // ...existing code...
  // Import chart
  // ...existing code...
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistik Penggunaan Sistem</h1>
        <p className="text-gray-600">Pantau aktivitas Assessment as Learning (AaL) dalam P5 dan Kokurikuler</p>
      </div>

      {/* Statistics Cards Grid - P5 Focused */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengguna Aktif"
          value="1,247"
          description="Siswa, guru, dan admin"
          icon={Users}
          trend="up"
          trendValue="+12%"
          color="text-blue-600"
        />
        <StatCard
          title="Proyek P5 & Kokurikuler"
          value="45"
          description="Proyek sedang berjalan"
          icon={BookOpen}
          trend="up"
          trendValue="+8%"
          color="text-green-600"
        />
        <StatCard
          title="Assessment Selesai"
          value="8,934"
          description="Penilaian diri, sebaya, observasi"
          icon={GraduationCap}
          trend="up"
          trendValue="+22%"
          color="text-purple-600"
        />
        <StatCard
          title="Jurnal Refleksi"
          value="2,156"
          description="Refleksi siswa tersubmit"
          icon={Award}
          trend="up"
          trendValue="+18%"
          color="text-orange-600"
        />
      </div>

      {/* Instrumen Assessment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Penilaian Diri"
          value="3,456"
          description="Self-assessment siswa"
          icon={User}
          color="text-indigo-600"
        />
        <StatCard
          title="Penilaian Sebaya"
          value="2,789"
          description="Peer-assessment antar siswa"
          icon={Handshake}
          color="text-teal-600"
        />
        <StatCard
          title="Observasi Guru"
          value="1,234"
          description="Lembar observasi diisi"
          icon={Activity}
          color="text-yellow-600"
        />
        <StatCard
          title="Feedback Diberikan"
          value="4,567"
          description="Umpan balik dari guru"
          icon={TrendingUp}
          color="text-rose-600"
        />
      </div>

      {/* Dimensi P5 Progress & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Dimensi P5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Progress Dimensi P5
            </CardTitle>
            <CardDescription>
              Rata-rata capaian 5 dimensi Profil Pelajar Pancasila
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dimensionProgress.map((item, index) => (
              <DimensionProgress
                key={index}
                dimension={item.dimension}
                score={item.score}
                status={item.status}
                color={item.color}
              />
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Assessment dan refleksi siswa real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                type={activity.type}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Assessment Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Instrumen Penilaian Hari Ini</CardTitle>
          <CardDescription>
            Aktivitas assessment berdasarkan instrumen P5
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">142</div>
              <div className="text-sm text-blue-600">Kuisioner Penilaian Diri</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">98</div>
              <div className="text-sm text-green-600">Penilaian Sebaya</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">67</div>
              <div className="text-sm text-purple-600">Jurnal Refleksi</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">34</div>
              <div className="text-sm text-orange-600">Lembar Observasi</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sintaks PjBL Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Sintaks Project-Based Learning</CardTitle>
          <CardDescription>
            Tahapan PjBL yang sedang berlangsung dalam proyek aktif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Start with the essential question</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">12 Proyek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Design a plan for the project</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">18 Proyek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">Monitor students and progress</span>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">8 Proyek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium">Assess the outcome</span>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">5 Proyek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">Evaluate the experiences</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">2 Proyek</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}