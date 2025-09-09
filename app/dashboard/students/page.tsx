'use client'

import { useState } from 'react'
import { DataTable, StatusBadge, UserAvatar } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Mail, Users, BookOpen, Award, UserPlus, MapPin } from 'lucide-react'

const students = [
  {
    id: 1,
    name: 'Andi Pratama',
    email: 'andi.pratama@student.sch.id',
    nisn: '0054321987',
    class: 'XII IPA 1',
    school: 'SMA Negeri 1 Jakarta',
    teacher: 'Bu Sari Wijaya',
    activeProjects: 2,
    completedAssessments: 8,
    averageScore: 85,
    status: 'active',
    assignedClass: 'XII IPA 1'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@student.sch.id',
    nisn: '0054321988',
    class: 'XII IPA 1',
    school: 'SMA Negeri 1 Jakarta',
    teacher: 'Bu Sari Wijaya',
    activeProjects: 2,
    completedAssessments: 12,
    averageScore: 92,
    status: 'active',
    assignedClass: 'XII IPA 1'
  },
  {
    id: 3,
    name: 'Budi Setiawan',
    email: 'budi.setiawan@student.sch.id',
    nisn: '0054321989',
    class: 'XII IPA 2',
    school: 'SMA Negeri 1 Jakarta',
    teacher: 'Pak Ahmad Hidayat',
    activeProjects: 1,
    completedAssessments: 6,
    averageScore: 78,
    status: 'active',
    assignedClass: 'XII IPA 2'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    email: 'dewi.lestari@student.sch.id',
    nisn: '0054321990',
    class: 'XI IPA 3',
    school: 'SMA Swasta Harapan Bangsa',
    teacher: 'Bu Maya Indira',
    activeProjects: 3,
    completedAssessments: 10,
    averageScore: 88,
    status: 'active',
    assignedClass: 'XI IPA 3'
  },
  {
    id: 5,
    name: 'Rizky Ramadhan',
    email: 'rizky.ramadhan@student.sch.id',
    nisn: '0054321991',
    class: 'XII IPA 3',
    school: 'SMA Katolik Santo Yusup',
    teacher: 'Pak Budi Santoso',
    activeProjects: 0,
    completedAssessments: 3,
    averageScore: 65,
    status: 'inactive',
    assignedClass: null
  }
]

const availableClasses = [
  { id: '1', name: 'XII IPA 1', school: 'SMA Negeri 1 Jakarta' },
  { id: '2', name: 'XII IPA 2', school: 'SMA Negeri 1 Jakarta' },
  { id: '3', name: 'XII IPA 3', school: 'SMA Katolik Santo Yusup' },
  { id: '4', name: 'XI IPA 1', school: 'SMA Swasta Harapan Bangsa' },
  { id: '5', name: 'XI IPA 2', school: 'SMA Swasta Harapan Bangsa' },
]

export default function StudentsPage() {
  const [assignClassDialog, setAssignClassDialog] = useState<{ open: boolean; studentId: string | null }>({ open: false, studentId: null })
  const [selectedClassForAssignment, setSelectedClassForAssignment] = useState('')

  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    inactive: { label: 'Nonaktif', className: 'bg-gray-100 text-gray-800' }
  }

  const columns = [
    {
      key: 'name',
      header: 'Siswa',
      sortable: true,
      render: (item: any) => (
        <div>
          <UserAvatar name={item.name} />
          <div className="ml-11 mt-1">
            <div className="text-sm text-slate-600">NISN: {item.nisn}</div>
            {item.assignedClass && (
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mt-1">
                Kelas: {item.assignedClass}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Kontak',
      render: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="truncate">{item.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'class',
      header: 'Kelas & Sekolah',
      sortable: true,
      render: (item: any) => (
        <div className="space-y-1">
          <div className="font-medium text-slate-900">{item.class}</div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>{item.school}</span>
          </div>
          <div className="text-sm text-slate-600">Wali: {item.teacher}</div>
        </div>
      )
    },
    {
      key: 'stats',
      header: 'Statistik',
      render: (item: any) => (
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">{item.activeProjects}</span>
            </div>
            <div className="text-xs text-slate-500">Proyek</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{item.completedAssessments}</span>
            </div>
            <div className="text-xs text-slate-500">Assessment</div>
          </div>
        </div>
      )
    },
    {
      key: 'averageScore',
      header: 'Rata-rata Skor',
      sortable: true,
      render: (item: any) => {
        const getScoreColor = (score: number) => {
          if (score >= 85) return 'text-green-600 bg-green-50'
          if (score >= 70) return 'text-yellow-600 bg-yellow-50'
          return 'text-red-600 bg-red-50'
        }
        
        return (
          <div className={`text-center p-2 rounded-lg ${getScoreColor(item.averageScore)}`}>
            <div className="text-2xl font-bold">{item.averageScore}</div>
          </div>
        )
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <StatusBadge status={item.status} labels={statusLabels} />
      )
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleAssignClass = (studentId: string) => {
    setAssignClassDialog({ open: true, studentId })
  }

  const saveClassAssignment = () => {
    // Implementation for saving class assignment
    console.log('Assigning student', assignClassDialog.studentId, 'to class', selectedClassForAssignment)
    setAssignClassDialog({ open: false, studentId: null })
    setSelectedClassForAssignment('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Siswa</h1>
          <p className="text-slate-500 text-sm">Kelola akun siswa dalam sistem</p>
        </div>
        <Button className="bg-slate-900 hover:brightness-110 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Siswa
        </Button>
      </div>

      <DataTable
        data={students}
        columns={columns}
        searchPlaceholder="Cari siswa berdasarkan nama, email, atau NISN..."
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        customActions={(item) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAssignClass(item.id.toString())}
            className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        )}
        itemsPerPage={10}
      />

      {/* Assign Class Dialog */}
      <Dialog open={assignClassDialog.open} onOpenChange={(open) => setAssignClassDialog({ open, studentId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Siswa ke Kelas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="class">Pilih Kelas</Label>
              <Select value={selectedClassForAssignment} onValueChange={setSelectedClassForAssignment}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas untuk siswa" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - {cls.school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAssignClassDialog({ open: false, studentId: null })}>
                Batal
              </Button>
              <Button onClick={saveClassAssignment} disabled={!selectedClassForAssignment}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}