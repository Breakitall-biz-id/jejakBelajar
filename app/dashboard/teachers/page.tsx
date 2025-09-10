'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { DataTable, StatusBadge, UserAvatar } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Mail, Phone, MapPin, Users, BookOpen, UserCheck } from 'lucide-react'

const teachers = [
  {
    id: 1,
    name: 'Bu Sari Wijaya',
    email: 'sari.wijaya@sman1jkt.sch.id',
    phone: '0812-3456-7890',
    // school: 'SMA Negeri 1 Jakarta',
    subject: 'Bahasa Indonesia',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 3'],
    totalStudents: 108,
    activeProjects: 3,
    status: 'active',
    assignedClass: 'XII IPA 1'
  },
  {
    id: 2,
    name: 'Pak Ahmad Hidayat',
    email: 'ahmad.hidayat@sman1jkt.sch.id',
    phone: '0813-4567-8901',
    // school: 'SMA Negeri 1 Jakarta',
    subject: 'Matematika',
    classes: ['XII IPA 1', 'XI IPA 1', 'XI IPA 2'],
    totalStudents: 96,
    activeProjects: 2,
    status: 'active',
    assignedClass: 'XII IPA 2'
  },
  {
    id: 3,
    name: 'Bu Maya Indira',
    email: 'maya.indira@harapanbangsa.sch.id',
    phone: '0814-5678-9012',
    // school: 'SMA Swasta Harapan Bangsa',
    subject: 'Biologi',
    classes: ['XII IPA 3', 'XI IPA 4'],
    totalStudents: 72,
    activeProjects: 4,
    status: 'active',
    assignedClass: null
  },
  {
    id: 4,
    name: 'Pak Budi Santoso',
    email: 'budi.santoso@santoyusup.sch.id',
    phone: '0815-6789-0123',
    // school: 'SMA Katolik Santo Yusup',
    subject: 'Fisika',
    classes: ['XII IPA 2', 'XI IPA 1'],
    totalStudents: 64,
    activeProjects: 1,
    status: 'inactive',
    assignedClass: 'XII IPA 2'
  }
]

const availableClasses = [
  { id: '1', name: 'XII IPA 1', currentTeacher: null },
  { id: '2', name: 'XII IPA 3', currentTeacher: null },
  { id: '3', name: 'XI IPA 1', currentTeacher: null },
  { id: '4', name: 'XI IPA 2', currentTeacher: null },
]

export default function TeachersPage() {
  const [assignClassDialog, setAssignClassDialog] = useState<{ open: boolean; teacherId: string | null }>({ open: false, teacherId: null })
  const [selectedClass, setSelectedClass] = useState('')
  const [addTeacherDialog, setAddTeacherDialog] = useState(false)
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: ''
  })
  const [successDialog, setSuccessDialog] = useState(false)

  const statusLabels = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    inactive: { label: 'Nonaktif', className: 'bg-gray-100 text-gray-800' }
  }

  const columns = [
    {
      key: 'name',
      header: 'Guru',
      sortable: true,
      render: (item: any) => (
        <div>
          <UserAvatar name={item.name} />
          <div className="ml-11 mt-1">
            <div className="text-sm font-medium text-slate-600">{item.subject}</div>
            {item.assignedClass && (
              <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full inline-block mt-1">
                Wali Kelas: {item.assignedClass}
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
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-slate-400" />
            <span>{item.phone}</span>
          </div>
        </div>
      )
    },
    // ...kolom 'school' dihapus...
    {
      key: 'classes',
      header: 'Kelas yang Diampu',
      render: (item: any) => (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {item.classes.slice(0, 2).map((className: string, index: number) => (
              <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                {className}
              </span>
            ))}
            {item.classes.length > 2 && (
              <span className="text-xs text-slate-500">+{item.classes.length - 2} lainnya</span>
            )}
          </div>
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

  const handleAssignClass = (teacherId: string) => {
    setAssignClassDialog({ open: true, teacherId })
  }

  const saveClassAssignment = () => {
    // Implementation for saving class assignment
    console.log('Assigning class', selectedClass, 'to teacher', assignClassDialog.teacherId)
    setAssignClassDialog({ open: false, teacherId: null })
    setSelectedClass('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Guru</h1>
          <p className="text-slate-500 text-sm">Kelola akun guru dalam sistem</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={() => setAddTeacherDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Guru
        </Button>
      </div>

      <DataTable
        data={teachers}
        columns={columns}
        searchPlaceholder="Cari guru berdasarkan nama, sekolah, atau mata pelajaran..."
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        customActions={(item) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAssignClass(item.id.toString())}
            className="h-8 w-8 p-0 border-green-200 text-green-600 hover:bg-green-50"
          >
            <UserCheck className="h-4 w-4" />
          </Button>
        )}
        itemsPerPage={10}
      />
      {/* Add Teacher Dialog */}
      <Dialog open={addTeacherDialog} onOpenChange={setAddTeacherDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Guru Baru</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); setAddTeacherDialog(false); }}>
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <input
                id="name"
                type="text"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newTeacher.name}
                onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newTeacher.email}
                onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. HP</Label>
              <input
                id="phone"
                type="text"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newTeacher.phone}
                onChange={e => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                required
              />
            </div>
            {/* Input sekolah dihapus */}
            <div className="space-y-2">
              <Label htmlFor="subject">Mata Pelajaran</Label>
              <input
                id="subject"
                type="text"
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newTeacher.subject}
                onChange={e => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAddTeacherDialog(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={async (e) => {
                e.preventDefault();
                const supabase = createClient();
                const { error } = await supabase.from('teachers').insert({
                  name: newTeacher.name,
                  email: newTeacher.email,
                  phone: newTeacher.phone,
                  subject: newTeacher.subject
                });
                if (!error) {
                  setAddTeacherDialog(false);
                  setSuccessDialog(true);
                  setNewTeacher({ name: '', email: '', phone: '', subject: '' });
                } else {
                  console.error('Supabase error:', error);
                  alert('Gagal menyimpan data guru!\n' + (error?.message || ''));
                }
              }}>
                Simpan
              </Button>
              {/* Success Dialog */}
              <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Berhasil!</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 text-center text-blue-600 font-semibold">Data guru berhasil disimpan ke database Supabase.</div>
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={() => setSuccessDialog(false)}>
                      Tutup
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Class Dialog */}
      <Dialog open={assignClassDialog.open} onOpenChange={(open) => setAssignClassDialog({ open, teacherId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Wali Kelas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="class">Pilih Kelas</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas untuk dijadikan wali kelas" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAssignClassDialog({ open: false, teacherId: null })}>
                Batal
              </Button>
              <Button onClick={saveClassAssignment} disabled={!selectedClass}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}