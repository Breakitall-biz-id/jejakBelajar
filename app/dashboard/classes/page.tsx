'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { DataTable, StatusBadge } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Users, BookOpen, GraduationCap, User, UserPlus, MapPin } from 'lucide-react'

export default function ClassesPage() {
  // State untuk data guru dari Supabase
  const [teachers, setTeachers] = useState<any[]>([])

  const students = [
    { id: '1', name: 'Andi Pratama', nisn: '0054321987', classId: null },
    { id: '2', name: 'Siti Nurhaliza', nisn: '0054321988', classId: '1' },
    { id: '3', name: 'Budi Setiawan', nisn: '0054321989', classId: '2' },
    { id: '4', name: 'Dewi Lestari', nisn: '0054321990', classId: null },
    { id: '5', name: 'Rizky Ramadhan', nisn: '0054321991', classId: '4' },
  ]

  // Fungsi untuk membuka dialog assign wali kelas
  const handleAssignTeacher = (classId: string) => {
    setAssignTeacherDialog({ open: true, classId })
  }
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [assignTeacherDialog, setAssignTeacherDialog] = useState<{ open: boolean; classId: string | null }>({ open: false, classId: null })
  const [assignStudentsDialog, setAssignStudentsDialog] = useState<{ open: boolean; classId: string | null }>({ open: false, classId: null })
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    archived: { label: 'Arsip', className: 'bg-gray-100 text-gray-800' },
    inactive: { label: 'Nonaktif', className: 'bg-gray-100 text-gray-800' }
  }

  const gradeLabels = {
    X: { label: 'Kelas X', className: 'bg-indigo-50 text-indigo-600' },
    XI: { label: 'Kelas XI', className: 'bg-indigo-50 text-indigo-600' },
    XII: { label: 'Kelas XII', className: 'bg-indigo-50 text-indigo-600' }
  }

  const columns = [
    {
      key: 'name',
      header: 'Kelas',
      sortable: true,
      render: (item: any) => (
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="text-base font-semibold text-slate-900">{item.name || <span className="italic text-gray-400">(Nama kosong)</span>}</div>
            <StatusBadge status={item.grade} labels={gradeLabels} />
          </div>
          <div className="text-sm font-medium text-slate-600">{item.academicYear}</div>
        </div>
      )
    },
    {
      key: 'teacher',
      header: 'Wali Kelas',
      sortable: true,
      render: (item: any) => (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-indigo-400" />
          <span className="font-medium text-indigo-700">{item.teacher}</span>
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
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-lg font-bold text-purple-600">{item.totalStudents}</span>
            </div>
            <div className="text-xs text-slate-500">Siswa</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{item.activeProjects}</span>
            </div>
            <div className="text-xs text-slate-500">Proyek</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              <span className="text-lg font-bold text-indigo-400">{item.completedProjects}</span>
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
    const fetchData = async () => {
      const supabase = createClient()
      // Ambil data kelas
      const { data: classData, error: classError } = await supabase.from('classes').select('*')
      // Ambil data guru
      const { data: teacherData, error: teacherError } = await supabase.from('teachers').select('*')
      if (teacherError) {
        alert('Gagal ambil data guru!')
        setTeachers([])
      } else {
        setTeachers(teacherData || [])
      }
      if (classError) {
        alert('Gagal konek ke Supabase!')
        setClasses([])
      } else {
        const mapped = (classData || []).map(item => {
          let teacherName = '-';
          if (item.teacher_id && teacherData) {
            const found = teacherData.find((t: any) => t.id === item.teacher_id)
            if (found) teacherName = found.name
          }
          return {
            ...item,
            school: item.school_id,
            teacher: teacherName,
            totalStudents: 0,
            activeProjects: 0,
            completedProjects: 0,
            academicYear: item.academic_year,
          }
        })
        setClasses(mapped)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const [addClassDialogOpen, setAddClassDialogOpen] = useState(false)
  const [editClassDialog, setEditClassDialog] = useState<{ open: boolean; classItem: any | null }>({ open: false, classItem: null })
  const [editClass, setEditClass] = useState({ name: '', grade: '', academic_year: '' })
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
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

  const handleEditClass = (item: any) => {
    setEditClassDialog({ open: true, classItem: item })
    setEditClass({
      name: item.name || '',
      grade: item.grade || '',
      academic_year: item.academicYear || ''
    })
  }

  const saveEditClass = async (e: any) => {
    e.preventDefault()
    if (!editClassDialog.classItem) return
    const supabase = createClient()
    const { error } = await supabase.from('classes').update({
      name: editClass.name,
      grade: editClass.grade,
      academic_year: editClass.academic_year
    }).eq('id', editClassDialog.classItem.id)
    if (!error) {
      setEditClassDialog({ open: false, classItem: null })
      const { data } = await supabase.from('classes').select('*')
      setClasses(data || [])
    } else {
      alert('Gagal edit kelas!')
    }
  }

  const handleDeleteClass = async (item: any) => {
    if (window.confirm(`Yakin ingin menghapus kelas ${item.name}?`)) {
      const supabase = createClient()
      const { error } = await supabase.from('classes').delete().eq('id', item.id)
      if (!error) {
        const { data } = await supabase.from('classes').select('*')
        setClasses(data || [])
      } else {
        alert('Gagal menghapus kelas!')
      }
    }
  }

  const handleAssignStudents = (classId: string) => {
    setAssignStudentsDialog({ open: true, classId })
    // Get unassigned students
    const unassignedStudents = students.filter(student => !student.classId)
    setSelectedStudents([])
  }

  const saveTeacherAssignment = async () => {
    if (!selectedTeacher || !assignTeacherDialog.classId) return
    const supabase = createClient()
    const { error } = await supabase
      .from('classes')
      .update({ teacher_id: selectedTeacher })
      .eq('id', assignTeacherDialog.classId)
    if (error) {
      alert('Gagal assign wali kelas: ' + error.message)
    } else {
      // Refresh data kelas
      const { data: classData } = await supabase.from('classes').select('*')
      // Ambil data guru terbaru
      const { data: teacherData } = await supabase.from('teachers').select('*')
      const mapped = (classData || []).map(item => {
        let teacherName = '-';
        if (item.teacher_id && teacherData) {
          const found = teacherData.find((t: any) => t.id === item.teacher_id)
          if (found) teacherName = found.name
        }
        return {
          ...item,
          school: item.school_id,
          teacher: teacherName,
          totalStudents: 0,
          activeProjects: 0,
          completedProjects: 0,
          academicYear: item.academic_year,
        }
      })
      setClasses(mapped)
      setAssignTeacherDialog({ open: false, classId: null })
      setSelectedTeacher('')
    }
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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-150" onClick={() => setAddClassDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelas
        </Button>
      </div>

      <Dialog open={addClassDialogOpen} onOpenChange={setAddClassDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kelas Baru</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const supabase = createClient();
              const { error } = await supabase.from('classes').insert([newClass]);
              if (error) {
                alert('Gagal tambah kelas: ' + error.message);
              } else {
                setAddClassDialogOpen(false);
                setNewClass({ name: '', grade: '', academic_year: '' });
                // refresh data
                const { data } = await supabase.from('classes').select('*');
                setClasses(data || []);
              }
            }}
          >
            <div>
              <Label>Nama Kelas</Label>
              <input
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newClass.name}
                onChange={e => setNewClass({ ...newClass, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Tingkat</Label>
              <select
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newClass.academic_year}
                onChange={e => setNewClass({ ...newClass, academic_year: e.target.value })}
              />
            </div>
            {/* ID Sekolah dihapus sesuai permintaan */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAddClassDialogOpen(false)}>
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700"
                disabled={!newClass.name || !newClass.grade || !newClass.academic_year}
              >
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DataTable
        data={classes}
        columns={columns}
        searchPlaceholder="Cari kelas atau wali kelas..."
        onEdit={handleEditClass}
        onDelete={handleDeleteClass}
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
      {/* Edit Class Dialog */}
      <Dialog open={editClassDialog.open} onOpenChange={(open) => setEditClassDialog({ open, classItem: open ? editClassDialog.classItem : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kelas</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={saveEditClass}>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Kelas</Label>
              <input
                id="edit-name"
                type="text"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={editClass.name}
                onChange={e => setEditClass({ ...editClass, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-grade">Tingkat</Label>
              <select
                id="edit-grade"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={editClass.grade}
                onChange={e => setEditClass({ ...editClass, grade: e.target.value })}
                required
              >
                <option value="">Pilih Tingkat</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-academic-year">Tahun Ajaran</Label>
              <input
                id="edit-academic-year"
                type="text"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={editClass.academic_year}
                onChange={e => setEditClass({ ...editClass, academic_year: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setEditClassDialog({ open: false, classItem: null })}>
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" disabled={!editClass.name || !editClass.grade || !editClass.academic_year}>
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
                      {teacher.name} {teacher.subject ? `- ${teacher.subject}` : ''}
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