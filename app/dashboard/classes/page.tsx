'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { DataTable, StatusBadge } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Users, BookOpen, GraduationCap, User, UserPlus, MapPin } from 'lucide-react'

const teachers = [
  { id: '2', name: 'Bu Sari Wijaya', subject: 'Bahasa Indonesia' },
  { id: '3', name: 'Pak Ahmad Hidayat', subject: 'Matematika' },
  { id: '4', name: 'Bu Maya Indira', subject: 'Biologi' },
  { id: '5', name: 'Pak Budi Santoso', subject: 'Fisika' },
  { id: '6', name: 'Bu Lestari Dewi', subject: 'Sejarah' },
  { id: '7', name: 'Pak Wahyu Santoso', subject: 'Kimia' },
]

const students = [
  { id: '1', name: 'Andi Pratama', nisn: '0054321987', classId: null },
  { id: '2', name: 'Siti Nurhaliza', nisn: '0054321988', classId: '1' },
  { id: '3', name: 'Budi Setiawan', nisn: '0054321989', classId: '2' },
  { id: '4', name: 'Dewi Lestari', nisn: '0054321990', classId: null },
  { id: '5', name: 'Rizky Ramadhan', nisn: '0054321991', classId: '4' },
]

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [assignTeacherDialog, setAssignTeacherDialog] = useState<{ open: boolean; classId: string | null }>({ open: false, classId: null })
  const [assignStudentsDialog, setAssignStudentsDialog] = useState<{ open: boolean; classId: string | null }>({ open: false, classId: null })
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    archived: { label: 'Arsip', className: 'bg-orange-100 text-orange-800' }
  }

  const gradeLabels = {
    X: { label: 'Kelas X', className: 'bg-blue-100 text-blue-800' },
    XI: { label: 'Kelas XI', className: 'bg-green-100 text-green-800' },
    XII: { label: 'Kelas XII', className: 'bg-purple-100 text-purple-800' }
  }

  const columns = [
    {
      key: 'name',
      header: 'Kelas',
      sortable: true,
      render: (item: any) => (
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="font-semibold text-slate-900">{item.name}</div>
            <StatusBadge status={item.grade} labels={gradeLabels} />
          </div>
          <div className="text-sm text-slate-600">{item.academicYear}</div>
        </div>
      )
    },
    {
      key: 'school',
      header: 'Sekolah',
      sortable: true,
      render: (item: any) => (
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-slate-600">{item.school}</span>
        </div>
      )
    },
    {
      key: 'teacher',
      header: 'Wali Kelas',
      sortable: true,
      render: (item: any) => (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-slate-400" />
          <span className="font-medium text-slate-900">{item.teacher}</span>
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
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">{item.totalStudents}</span>
            </div>
            <div className="text-xs text-slate-500">Siswa</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{item.activeProjects}</span>
            </div>
            <div className="text-xs text-slate-500">Aktif</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              <span className="text-lg font-bold text-purple-600">{item.completedProjects}</span>
            </div>
            <div className="text-xs text-slate-500">Selesai</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <StatusBadge status={item.status} labels={statusLabels} />
      )
    }
  ]

useEffect(() => {
  const fetchClasses = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from('classes').select('*')
    if (error) {
      alert('Gagal konek ke Supabase!')
      setClasses([])
    } else {
      // Mapping agar field sesuai dengan kebutuhan DataTable
      const mapped = (data || []).map(item => ({
        ...item,
        school: item.school_id, // atau mapping ke nama sekolah jika ada
        teacher: '-',           // mapping ke nama guru jika ada
        totalStudents: 0,       // isi sesuai kebutuhan/statistik
        activeProjects: 0,
        completedProjects: 0,
        academicYear: item.academic_year,
      }))
      setClasses(mapped)
    }
    setLoading(false)
  }
  fetchClasses()
}, [])

  const [addClassDialogOpen, setAddClassDialogOpen] = useState(false)
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    school_id: '',
    academic_year: '',
  })

  const handleTambahKelas = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('classes').insert([
      {
        name: 'Kelas Baru',
        grade: 'X',
        school_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        academic_year: '2024/2025',
      }
    ])
    if (error) {
      alert('Gagal tambah kelas: ' + error.message)
    } else {
      alert('Berhasil tambah kelas!')
      const { data } = await supabase.from('classes').select('*')
      setClasses(data || [])
    }
  }

  const handleAssignTeacher = (classId: string) => {
    setAssignTeacherDialog({ open: true, classId })
  }

  const handleAssignStudents = (classId: string) => {
    setAssignStudentsDialog({ open: true, classId })
    // Get unassigned students
    const unassignedStudents = students.filter(student => !student.classId)
    setSelectedStudents([])
  }

  const saveTeacherAssignment = () => {
    // Implementation for saving teacher assignment
    console.log('Assigning teacher', selectedTeacher, 'to class', assignTeacherDialog.classId)
    setAssignTeacherDialog({ open: false, classId: null })
    setSelectedTeacher('')
  }

  const saveStudentAssignment = () => {
    // Implementation for saving student assignment
    console.log('Assigning students', selectedStudents, 'to class', assignStudentsDialog.classId)
    setAssignStudentsDialog({ open: false, classId: null })
    setSelectedStudents([])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Kelas</h1>
          <p className="text-slate-500 text-sm">Kelola kelas dan tahun ajaran dalam sistem</p>
        </div>
        <Button className="bg-slate-900 hover:brightness-110 text-white" onClick={() => setAddClassDialogOpen(true)}  >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelas
        </Button>
      </div>

      <Dialog open={addClassDialogOpen} onOpenChange={setAddClassDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kelas Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Kelas</Label>
              <input
                className="w-full border rounded p-2"
                value={newClass.name}
                onChange={e => setNewClass({ ...newClass, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Tingkat</Label>
              <select
                className="w-full border rounded p-2"
                value={newClass.grade}
                onChange={e => setNewClass({ ...newClass, grade: e.target.value })}
              >
                <option value="">Pilih Tingkat</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>
            <div>
              <Label>Tahun Ajaran</Label>
              <input
                className="w-full border rounded p-2"
                value={newClass.academic_year}
                onChange={e => setNewClass({ ...newClass, academic_year: e.target.value })}
              />
            </div>
            <div>
              <Label>ID Sekolah</Label>
              <input
                className="w-full border rounded p-2"
                value={newClass.school_id}
                onChange={e => setNewClass({ ...newClass, school_id: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddClassDialogOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={async () => {
                  const supabase = createClient()
                  const { error } = await supabase.from('classes').insert([newClass])
                  if (error) {
                    alert('Gagal tambah kelas: ' + error.message)
                  } else {
                    alert('Berhasil tambah kelas!')
                    setAddClassDialogOpen(false)
                    setNewClass({ name: '', grade: '', school_id: '', academic_year: '' })
                    // refresh data
                    const { data } = await supabase.from('classes').select('*')
                    setClasses(data || [])
                  }
                }}
                disabled={
                  !newClass.name || !newClass.grade || !newClass.school_id || !newClass.academic_year
                }
              >
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DataTable
        data={classes}
        columns={columns}
        searchPlaceholder="Cari kelas atau wali kelas..."
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        customActions={(item) => (
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAssignTeacher(item.id.toString())}
              className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAssignStudents(item.id.toString())}
              className="h-8 w-8 p-0 border-green-200 text-green-600 hover:bg-green-50"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        )}
        itemsPerPage={10}
      />

      {/* Assign Teacher Dialog */}
      <Dialog open={assignTeacherDialog.open} onOpenChange={(open) => setAssignTeacherDialog({ open, classId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Wali Kelas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="teacher">Pilih Guru</Label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih guru sebagai wali kelas" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAssignTeacherDialog({ open: false, classId: null })}>
                Batal
              </Button>
              <Button onClick={saveTeacherAssignment} disabled={!selectedTeacher}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Students Dialog */}
      <Dialog open={assignStudentsDialog.open} onOpenChange={(open) => setAssignStudentsDialog({ open, classId: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Siswa ke Kelas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Pilih Siswa (yang belum memiliki kelas)</Label>
              <div className="max-h-60 overflow-y-auto border rounded-lg p-4 space-y-2">
                {students.filter(student => !student.classId).map(student => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={student.id}
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, student.id])
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== student.id))
                        }
                      }}
                      className="rounded"
                    />
                    <label htmlFor={student.id} className="text-sm">
                      {student.name} - NISN: {student.nisn}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAssignStudentsDialog({ open: false, classId: null })}>
                Batal
              </Button>
              <Button onClick={saveStudentAssignment} disabled={selectedStudents.length === 0}>
                Assign {selectedStudents.length} Siswa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}