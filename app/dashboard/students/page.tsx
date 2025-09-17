
"use client"

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { TeacherSearchSelect } from '@/components/ui/teacher-search-select'
import { TeacherNameById } from '@/components/ui/teacher-name-by-id'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Mail, Users, BookOpen, Award, UserPlus, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function StudentsPage() {
  // Edit student dialog state
  const [editStudentDialog, setEditStudentDialog] = useState<{ open: boolean; student: any | null }>({ open: false, student: null });
  const [editStudent, setEditStudent] = useState({ name: '', email: '', nisn: '', class: '', teacher_id: '' });

  // Handler for edit button
  const handleEditStudent = (item: any) => {
    setEditStudentDialog({ open: true, student: item });
    setEditStudent({
      name: item.name || '',
      email: item.email || '',
      nisn: item.nisn || '',
      class: item.class || '',
      teacher_id: item.teacher_id || ''
    });
  };

  // Save edit student
  const saveEditStudent = async (e: any) => {
    e.preventDefault();
    if (!editStudentDialog.student) return;
    const supabase = createClient();
    const { error } = await supabase.from('students').update({
      name: editStudent.name,
      email: editStudent.email,
      nisn: editStudent.nisn,
      class: editStudent.class,
      teacher_id: editStudent.teacher_id
    }).eq('id', editStudentDialog.student.id);
    if (!error) {
      setEditStudentDialog({ open: false, student: null });
      // Refresh students
      const { data } = await supabase.from('students').select('*');
      setStudents(data || []);
    } else {
      alert('Gagal mengedit data siswa! ' + (error.message || error.details || ''));
    }
  };

  // Handler for delete button
  const handleDeleteStudent = async (item: any) => {
    if (window.confirm(`Yakin ingin menghapus siswa ${item.name}?`)) {
      const supabase = createClient();
      const { error } = await supabase.from('students').delete().eq('id', item.id);
      if (!error) {
        // Refresh students
        const { data } = await supabase.from('students').select('*');
        setStudents(data || []);
      } else {
        alert('Gagal menghapus siswa! ' + (error.message || error.details || ''));
      }
    }
  };
  const [students, setStudents] = useState<any[]>([])
  const [availableClasses, setAvailableClasses] = useState<any[]>([])
  const [assignClassDialog, setAssignClassDialog] = useState<{ open: boolean; studentId: string | null }>({ open: false, studentId: null })
  const [selectedClassForAssignment, setSelectedClassForAssignment] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    nisn: '',
    class: '',
    status: 'active',
    teacher_id: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleAddStudent = async () => {
    // Only send relevant fields, always set status to 'active'
    if (!newStudent.name || !newStudent.email || !newStudent.nisn || !newStudent.class) {
      alert('Semua field wajib diisi!')
      return
    }
    setIsSaving(true)
    const supabase = createClient()
    const studentToSave = {
      name: newStudent.name,
      email: newStudent.email,
      nisn: newStudent.nisn,
      class: newStudent.class,
      teacher_id: newStudent.teacher_id,
      status: 1
    }
    const { error } = await supabase.from('students').insert([studentToSave])
    setIsSaving(false)
    if (!error) {
      setAddDialogOpen(false)
      setNewStudent({ name: '', email: '', nisn: '', class: '', status: 'active', teacher_id: '' })
      // Refresh students
      const { data } = await supabase.from('students').select('*')
      setStudents(data || [])
    } else {
      alert('Gagal menambah siswa! ' + (error.message || error.details || ''))
    }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('students').select('*')
      if (!error && data) {
        setStudents(data)
      }
    }
    const fetchClasses = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('classes').select('*')
      if (!error && data) {
        setAvailableClasses(data)
      }
    }
    fetchStudents()
    fetchClasses()
  }, [])
  const statusLabels: Record<string, { label: string; className: string }> = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    inactive: { label: 'Nonaktif', className: 'bg-red-100 text-red-800' }
  }

  // Status dialog state
  const [statusDialog, setStatusDialog] = useState<{ open: boolean; student: any | null }>({ open: false, student: null });

  // Handler untuk klik status badge
  function handleStatusClick(student: any) {
    setStatusDialog({ open: true, student });
  }

  // Handler untuk update status
  const handleChangeStatus = async (newStatus: 'active' | 'inactive') => {
    if (!statusDialog.student) return;
    const supabase = createClient();
    const statusValue = newStatus === 'active' ? 1 : 0;
    const { error } = await supabase.from('students').update({ status: statusValue }).eq('id', statusDialog.student.id);
    if (!error) {
      setStatusDialog({ open: false, student: null });
      // Refresh students
      const { data } = await supabase.from('students').select('*');
      setStudents(data || []);
    } else {
      alert('Gagal mengubah status siswa! ' + (error.message || error.details || ''));
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Siswa',
      sortable: true,
      render: (item: any) => (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={item.avatarUrl || undefined} alt={item.name || 'Siswa'} />
            <AvatarFallback>{item.name ? item.name[0] : '?'}</AvatarFallback>
          </Avatar>
          <div className="ml-4 mt-1">
            <div className="text-base font-semibold text-slate-900">{item.name || <span className="italic text-gray-400">(Nama kosong)</span>}</div>
            <div className="text-sm font-medium text-slate-600">NISN: {item.nisn || <span className="italic text-gray-400">(NISN kosong)</span>}</div>
            {item.assignedClass && (
              <Badge className="bg-indigo-50 text-indigo-600 rounded-full mt-1">Kelas: {item.assignedClass}</Badge>
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
      header: 'Kelas',
      sortable: true,
      render: (item: any) => (
        <div className="space-y-1">
          <div className="font-medium text-slate-900">{item.class}</div>
          <div className="text-sm text-slate-600">Wali: <TeacherNameById teacherId={item.teacher_id} /></div>
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
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{item.activeProjects}</span>
            </div>
            <div className="text-xs text-slate-500">Proyek</div>
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
        <span onClick={() => handleStatusClick(item)} style={{ cursor: 'pointer' }}>
          <StatusBadge status={item.status === 1 ? 'active' : 'inactive'} labels={statusLabels} />
        </span>
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
    <div className="py-8 px-4 md:px-8">
      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Siswa</h1>
            <p className="text-slate-500 text-sm">Kelola akun siswa dalam sistem</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow px-6 py-2 flex items-center gap-2 transition-colors duration-150" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>

        <DataTable
          data={students}
          columns={columns}
          searchPlaceholder="Cari siswa berdasarkan nama, email, atau NISN..."
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          customActions={(item: any) => (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAssignClass(item.id.toString())}
              className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          )}
          itemsPerPage={10}
        />
        {/* Edit Student Dialog */}
        <Dialog open={editStudentDialog.open} onOpenChange={(open) => setEditStudentDialog({ open, student: open ? editStudentDialog.student : null })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Siswa</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={saveEditStudent}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Nama</Label>
                  <input
                    id="edit-name"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={editStudent.name}
                    onChange={e => setEditStudent({ ...editStudent, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <input
                    id="edit-email"
                    type="email"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={editStudent.email}
                    onChange={e => setEditStudent({ ...editStudent, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-nisn">NISN</Label>
                  <input
                    id="edit-nisn"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={editStudent.nisn}
                    onChange={e => setEditStudent({ ...editStudent, nisn: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-class">Kelas</Label>
                  <input
                    id="edit-class"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={editStudent.class}
                    onChange={e => setEditStudent({ ...editStudent, class: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-teacher">Wali Kelas</Label>
                  <TeacherSearchSelect
                    value={editStudent.teacher_id}
                    onChange={(id) => setEditStudent({ ...editStudent, teacher_id: id })}
                    placeholder="Cari & pilih wali kelas"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setEditStudentDialog({ open: false, student: null })}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-6">
                  Simpan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <DialogHeader>
            <DialogTitle className="font-semibold text-lg text-slate-900">Tambah Siswa Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama</Label>
                <input
                  id="name"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Nama siswa"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={newStudent.email}
                  onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="Email siswa"
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="nisn">NISN</Label>
                <input
                  id="nisn"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={newStudent.nisn}
                  onChange={e => setNewStudent({ ...newStudent, nisn: e.target.value })}
                  placeholder="NISN"
                />
              </div>
              <div>
                <Label htmlFor="class">Kelas</Label>
                <Select value={newStudent.class} onValueChange={(val: string) => setNewStudent({ ...newStudent, class: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.name}>
                        {cls.name} - {cls.school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="teacher">Wali Kelas</Label>
                <TeacherSearchSelect
                  value={newStudent.teacher_id}
                  onChange={id => setNewStudent({ ...newStudent, teacher_id: id })}
                  placeholder="Cari & pilih wali kelas"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-6" onClick={handleAddStudent} disabled={isSaving || !newStudent.name || !newStudent.email || !newStudent.nisn || !newStudent.class}>
                  {isSaving ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={statusDialog.open} onOpenChange={(open) => setStatusDialog({ open, student: open ? statusDialog.student : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Status Siswa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status-select">Pilih Status</Label>
              <Select
                value={statusDialog.student?.status === 1 ? 'active' : 'inactive'}
                onValueChange={(val) => handleChangeStatus(val as 'active' | 'inactive')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setStatusDialog({ open: false, student: null })}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Assign Class Dialog */}
      <Dialog open={assignClassDialog.open} onOpenChange={(open: boolean) => setAssignClassDialog({ open, studentId: null })}>
        <DialogContent className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <DialogHeader>
            <DialogTitle className="font-semibold text-lg text-slate-900">Assign Siswa ke Kelas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="class">Pilih Kelas</Label>
              <Select value={selectedClassForAssignment} onValueChange={(val: string) => setSelectedClassForAssignment(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas untuk siswa" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - {cls.school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAssignClassDialog({ open: false, studentId: null })}>
                Batal
              </Button>
              <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700 px-6" onClick={saveClassAssignment} disabled={!selectedClassForAssignment}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}