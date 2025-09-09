'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Target, Award, Activity, Brain, Heart, Handshake, Lightbulb, User, ArrowUpRight, Clock, BarChart3 } from 'lucide-react'

// Komponen untuk Statistik Card dengan desain yang lebih menarik
function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  gradient = "from-blue-500 to-blue-600"
}: {
  title: string
  value: string | number
  description: string
  icon: any
  trend?: 'up' | 'down'
  trendValue?: string
  gradient?: string
}) {
  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        {trend && trendValue && (
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <ArrowUpRight className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span className="font-medium">{trendValue}</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Komponen Activity Item dengan desain yang lebih fresh
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
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'assessment': return { 
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600', 
        icon: '📊',
        border: 'border-blue-200'
      }
      case 'project': return { 
        bg: 'bg-gradient-to-br from-green-500 to-green-600', 
        icon: '📚',
        border: 'border-green-200'
      }
      case 'reflection': return { 
        bg: 'bg-gradient-to-br from-purple-500 to-purple-600', 
        icon: '💭',
        border: 'border-purple-200'
      }
      case 'observation': return { 
        bg: 'bg-gradient-to-br from-orange-500 to-orange-600', 
        icon: '👁️',
        border: 'border-orange-200'
      }
      default: return { 
        bg: 'bg-gradient-to-br from-gray-500 to-gray-600', 
        icon: '📝',
        border: 'border-gray-200'
      }
    }
  }

  const config = getTypeConfig(type)

  return (
    <div className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border ${config.border} hover:shadow-sm`}>
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          <span className="text-sm">{config.icon}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center text-xs text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  )
}

// Komponen Progress Bar yang lebih cantik
function DimensionProgress({ 
  dimension, 
  score, 
  status, 
  gradient 
}: {
  dimension: string
  score: number
  status: string
  gradient: string
}) {
  const percentage = (score / 4) * 100
  
  const getStatusColor = (status: string) => {
    if (status.includes('Sangat')) return 'text-green-700 bg-green-100'
    if (status === 'Berkembang') return 'text-blue-700 bg-blue-100'
    if (status.includes('Sedang')) return 'text-yellow-700 bg-yellow-100'
    return 'text-gray-700 bg-gray-100'
  }
  
  return (
    <div className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-800">{dimension}</span>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-500 ease-out shadow-sm`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-lg font-bold text-gray-700 min-w-[3rem] text-right">
          {score.toFixed(1)}
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {Math.round(percentage)}% dari target maksimal
      </div>
    </div>
  )
}

export default function DashboardPage() {
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

  const dimensionProgress = [
    { dimension: "Beriman & Berakhlak Mulia", score: 3.2, status: "Berkembang Sesuai Harapan", gradient: "from-blue-500 to-blue-600" },
    { dimension: "Mandiri", score: 2.8, status: "Sedang Berkembang", gradient: "from-green-500 to-green-600" },
    { dimension: "Bergotong Royong", score: 3.6, status: "Berkembang Sesuai Harapan", gradient: "from-purple-500 to-purple-600" },
    { dimension: "Bernalar Kritis", score: 2.9, status: "Sedang Berkembang", gradient: "from-orange-500 to-orange-600" },
    { dimension: "Kreatif", score: 3.4, status: "Berkembang Sesuai Harapan", gradient: "from-pink-500 to-pink-600" }
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section dengan gradient background */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl opacity-10" />
        <div className="relative p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Statistik Penggunaan Sistem
          </h1>
          <p className="text-lg text-gray-600">
            Pantau aktivitas Assessment as Learning (AaL) dalam P5 dan Kokurikuler
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid dengan gradient yang berbeda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengguna Aktif"
          value="1,247"
          description="Siswa, guru, dan admin"
          icon={Users}
          trend="up"
          trendValue="+12%"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Proyek P5 & Kokurikuler"
          value="45"
          description="Proyek sedang berjalan"
          icon={BookOpen}
          trend="up"
          trendValue="+8%"
          gradient="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Assessment Selesai"
          value="8,934"
          description="Penilaian diri, sebaya, observasi"
          icon={GraduationCap}
          trend="up"
          trendValue="+22%"
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Jurnal Refleksi"
          value="2,156"
          description="Refleksi siswa tersubmit"
          icon={Award}
          trend="up"
          trendValue="+18%"
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Instrumen Assessment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Penilaian Diri"
          value="3,456"
          description="Self-assessment siswa"
          icon={User}
          gradient="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Penilaian Sebaya"
          value="2,789"
          description="Peer-assessment antar siswa"
          icon={Handshake}
          gradient="from-teal-500 to-cyan-600"
        />
        <StatCard
          title="Observasi Guru"
          value="1,234"
          description="Lembar observasi diisi"
          icon={Activity}
          gradient="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Feedback Diberikan"
          value="4,567"
          description="Umpan balik dari guru"
          icon={TrendingUp}
          gradient="from-rose-500 to-pink-600"
        />
      </div>

      {/* Dimensi P5 Progress & Activities dengan layout yang lebih baik */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Progress Dimensi P5 - Lebih lebar */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">Progress Dimensi P5</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Rata-rata capaian 5 dimensi Profil Pelajar Pancasila
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">3.2</div>
                  <div className="text-sm text-gray-500">Rata-rata</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {dimensionProgress.map((item, index) => (
                <DimensionProgress
                  key={index}
                  dimension={item.dimension}
                  score={item.score}
                  status={item.status}
                  gradient={item.gradient}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="xl:col-span-1">
          <Card className="border-0 shadow-xl h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Aktivitas Terbaru</CardTitle>
                  <CardDescription>
                    Assessment real-time
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
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
      </div>

      {/* Quick Assessment Stats dengan desain card yang lebih menarik */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Instrumen Penilaian Hari Ini</CardTitle>
              <CardDescription>
                Aktivitas assessment berdasarkan instrumen P5
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">142</div>
              <div className="text-sm font-medium text-blue-600">Kuisioner Penilaian Diri</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl font-bold text-green-700 mb-2">98</div>
              <div className="text-sm font-medium text-green-600">Penilaian Sebaya</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl font-bold text-purple-700 mb-2">67</div>
              <div className="text-sm font-medium text-purple-600">Jurnal Refleksi</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl font-bold text-orange-700 mb-2">34</div>
              <div className="text-sm font-medium text-orange-600">Lembar Observasi</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sintaks PjBL Status dengan design yang lebih modern */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Status Sintaks Project-Based Learning</CardTitle>
              <CardDescription>
                Tahapan PjBL yang sedang berlangsung dalam proyek aktif
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { phase: "Start with the essential question", count: 12, color: "green" },
              { phase: "Design a plan for the project", count: 18, color: "blue" },
              { phase: "Monitor students and progress", count: 8, color: "purple" },
              { phase: "Assess the outcome", count: 5, color: "orange" },
              { phase: "Evaluate the experiences", count: 2, color: "yellow" }
            ].map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-4 bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 rounded-xl border border-${item.color}-200 hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`} />
                  <span className="text-sm font-medium text-gray-800">{item.phase}</span>
                </div>
                <span className={`text-sm font-bold bg-${item.color}-200 text-${item.color}-800 px-3 py-1 rounded-full`}>
                  {item.count} Proyek
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}