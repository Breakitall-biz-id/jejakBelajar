'use client'

import { DataTable, StatusBadge } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Users, BookOpen } from 'lucide-react'

const academicYears = [
  {
    id: 1,
    year: '2024/2025',
    startDate: '2024-07-15',
    endDate: '2025-06-30',
    semester1Start: '2024-07-15',
    semester1End: '2024-12-20',
    semester2Start: '2025-01-06',
    semester2End: '2025-06-30',
    totalSchools: 12,
    totalClasses: 48,
    totalStudents: 1420,
    status: 'active'
  },
  {
    id: 2,
    year: '2023/2024',
    startDate: '2023-07-17',
    endDate: '2024-06-28',
    semester1Start: '2023-07-17',
    semester1End: '2023-12-22',
    semester2Start: '2024-01-08',
    semester2End: '2024-06-28',
    totalSchools: 10,
    totalClasses: 42,
    totalStudents: 1280,
    status: 'completed'
  },
  {
    id: 3,
    year: '2025/2026',
    startDate: '2025-07-14',
    endDate: '2026-06-29',
    semester1Start: '2025-07-14',
    semester1End: '2025-12-19',
    semester2Start: '2026-01-05',
    semester2End: '2026-06-29',
    totalSchools: 0,
    totalClasses: 0,
    totalStudents: 0,
    status: 'planned'
  }
]

export default function AcademicYearsPage() {
  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    completed: { label: 'Selesai', className: 'bg-blue-100 text-blue-800' },
    planned: { label: 'Direncanakan', className: 'bg-yellow-100 text-yellow-800' }
  }

  const columns = [
    {
      key: 'year',
      header: 'Tahun Ajaran',
      sortable: true,
      render: (item: any) => (
        <div className="font-semibold text-slate-900">{item.year}</div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <StatusBadge status={item.status} labels={statusLabels} />
      )
    },
    {
      key: 'period',
      header: 'Periode',
      render: (item: any) => (
        <div className="text-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{new Date(item.startDate).toLocaleDateString('id-ID')} - {new Date(item.endDate).toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      )
    },
    {
      key: 'semester1',
      header: 'Semester 1',
      render: (item: any) => (
        <div className="text-xs text-slate-600">
          {new Date(item.semester1Start).toLocaleDateString('id-ID')} - {new Date(item.semester1End).toLocaleDateString('id-ID')}
        </div>
      )
    },
    {
      key: 'semester2',
      header: 'Semester 2',
      render: (item: any) => (
        <div className="text-xs text-slate-600">
          {new Date(item.semester2Start).toLocaleDateString('id-ID')} - {new Date(item.semester2End).toLocaleDateString('id-ID')}
        </div>
      )
    },
    {
      key: 'stats',
      header: 'Statistik',
      render: (item: any) => (
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">{item.totalSchools}</span>
            <span className="text-xs text-slate-500">Sekolah</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">{item.totalClasses}</span>
            <span className="text-xs text-slate-500">Kelas</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">{item.totalStudents}</span>
            <span className="text-xs text-slate-500">Siswa</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Tahun Ajaran</h1>
          <p className="text-slate-500 text-sm">Kelola tahun ajaran dan periode akademik</p>
        </div>
        <Button className="bg-slate-900 hover:brightness-110 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Tahun Ajaran
        </Button>
      </div>

      <DataTable
        data={academicYears}
        columns={columns}
        searchPlaceholder="Cari tahun ajaran..."
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        itemsPerPage={10}
      />
    </div>
  )
}