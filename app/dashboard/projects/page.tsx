'use client'

import { DataTable, StatusBadge } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus, Users, Calendar, Target, MapPin } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Lingkungan Sehat dan Berkelanjutan',
    description: 'Proyek untuk menganalisis dan merancang solusi permasalahan lingkungan di sekitar sekolah',
    class: 'XII IPA 1',
    teacher: 'Bu Sari Wijaya',
    school: 'SMA Negeri 1 Jakarta',
    theme: 'Kearifan Lokal',
    dimension: 'Berkebinekaan Global',
    participants: 36,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    progress: 65
  },
  {
    id: 2,
    title: 'Teknologi Ramah Lingkungan',
    description: 'Mengembangkan teknologi sederhana yang ramah lingkungan untuk mengatasi masalah sampah',
    class: 'XII IPA 2',
    teacher: 'Pak Ahmad Hidayat',
    school: 'SMA Negeri 1 Jakarta',
    theme: 'Rekayasa dan Teknologi',
    dimension: 'Kreatif',
    participants: 34,
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    progress: 45
  },
  {
    id: 3,
    title: 'Budaya Lokal dalam Era Digital',
    description: 'Dokumentasi dan promosi budaya lokal melalui media digital',
    class: 'XI IPA 3',
    teacher: 'Bu Maya Indira',
    school: 'SMA Swasta Harapan Bangsa',
    theme: 'Kearifan Lokal',
    dimension: 'Berkebinekaan Global',
    participants: 32,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    progress: 30
  },
  {
    id: 4,
    title: 'Ekonomi Kreatif Berbasis UMKM',
    description: 'Menganalisis dan mengembangkan UMKM lokal melalui inovasi produk',
    class: 'XII IPA 3',
    teacher: 'Pak Budi Santoso',
    school: 'SMA Katolik Santo Yusup',
    theme: 'Kewirausahaan',
    dimension: 'Mandiri',
    participants: 28,
    status: 'draft',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    progress: 10
  },
  {
    id: 5,
    title: 'Gerakan Anti Bullying',
    description: 'Kampanye dan program pencegahan bullying di lingkungan sekolah',
    class: 'XI IPS 1',
    teacher: 'Bu Lestari Dewi',
    school: 'SMA Negeri 1 Jakarta',
    theme: 'Bhinneka Tunggal Ika',
    dimension: 'Berkebinekaan Global',
    participants: 30,
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2023-12-15',
    progress: 100
  }
]

export default function ProjectsPage() {
  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    draft: { label: 'Draft', className: 'bg-yellow-100 text-yellow-800' },
    completed: { label: 'Selesai', className: 'bg-blue-100 text-blue-800' }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const columns = [
    {
      key: 'title',
      header: 'Proyek',
      sortable: true,
      render: (item: any) => (
        <div>
          <div className="font-semibold text-slate-900 mb-1">{item.title}</div>
          <div className="text-sm text-slate-600 line-clamp-2 mb-2">{item.description}</div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">{item.theme}</span>
          </div>
        </div>
      )
    },
    {
      key: 'class',
      header: 'Kelas & Guru',
      sortable: true,
      render: (item: any) => (
        <div className="space-y-1">
          <div className="font-medium text-slate-900">{item.class}</div>
          <div className="text-sm text-slate-600">{item.teacher}</div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="text-xs">{item.school}</span>
          </div>
        </div>
      )
    },
    {
      key: 'period',
      header: 'Periode',
      render: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Mulai: {new Date(item.startDate).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="text-sm text-slate-600">
            Selesai: {new Date(item.endDate).toLocaleDateString('id-ID')}
          </div>
        </div>
      )
    },
    {
      key: 'participants',
      header: 'Peserta',
      render: (item: any) => (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-bold text-blue-600">{item.participants}</span>
          </div>
          <div className="text-xs text-slate-500">Siswa</div>
        </div>
      )
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (item: any) => (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm font-bold text-slate-900">{item.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.progress)}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <div className="space-y-2">
          <StatusBadge status={item.status} labels={statusLabels} />
          <div className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
            {item.dimension}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Proyek P5</h1>
          <p className="text-slate-500 text-sm">Kelola proyek Penguatan Profil Pelajar Pancasila</p>
        </div>
        <Button className="bg-slate-900 hover:brightness-110 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Proyek
        </Button>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchPlaceholder="Cari proyek berdasarkan judul atau deskripsi..."
        onView={(item) => console.log('View', item)}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        itemsPerPage={10}
      />
    </div>
  )
}