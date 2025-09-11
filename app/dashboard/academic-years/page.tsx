'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { DataTable, StatusBadge } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Calendar, Users, BookOpen } from 'lucide-react'

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

  // State untuk data tahun ajaran
  const [academicYears, setAcademicYears] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newYear, setNewYear] = useState({
    year: '',
    startDate: '',
    endDate: '',
    semester1Start: '',
    semester1End: '',
    semester2Start: '',
    semester2End: '',
    totalSchools: 0,
    totalClasses: 0,
    totalStudents: 0,
    status: 'planned'
  })

  // Ambil data dari Supabase saat mount
  useEffect(() => {
    const fetchAcademicYears = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
      if (!error && data) {
        // Mapping snake_case ke camelCase agar tidak invalid date
        const mapped = data.map((item: any) => ({
          id: item.id,
          year: item.year,
          startDate: item.start_date,
          endDate: item.end_date,
          semester1Start: item.semester1_start,
          semester1End: item.semester1_end,
          semester2Start: item.semester2_start,
          semester2End: item.semester2_end,
          totalSchools: item.total_schools ?? 0,
          totalClasses: item.total_classes ?? 0,
          totalStudents: item.total_students ?? 0,
          status: item.status
        }))
        setAcademicYears(mapped)
      }
      setLoading(false)
    }
    fetchAcademicYears()
  }, [])

  // State untuk edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editYear, setEditYear] = useState<any | null>(null)

  // Fungsi edit
  const handleEdit = (item: any) => {
    setEditYear({ ...item })
    setEditDialogOpen(true)
  }

  // Fungsi simpan edit
  const saveEditYear = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('academic_years').update({
      year: editYear.year,
      start_date: editYear.startDate,
      end_date: editYear.endDate,
      semester1_start: editYear.semester1Start,
      semester1_end: editYear.semester1End,
      semester2_start: editYear.semester2Start,
      semester2_end: editYear.semester2End,
      total_classes: editYear.totalClasses,
      total_students: editYear.totalStudents,
      status: editYear.status
    }).eq('id', editYear.id)
    if (error) {
      alert('Gagal edit tahun ajaran: ' + error.message)
    } else {
      // Refresh data
      const { data } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
      if (data) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          year: item.year,
          startDate: item.start_date,
          endDate: item.end_date,
          semester1Start: item.semester1_start,
          semester1End: item.semester1_end,
          semester2Start: item.semester2_start,
          semester2End: item.semester2_end,
          totalSchools: item.total_schools ?? 0,
          totalClasses: item.total_classes ?? 0,
          totalStudents: item.total_students ?? 0,
          status: item.status
        }))
        setAcademicYears(mapped)
      }
      setEditDialogOpen(false)
      setEditYear(null)
    }
    setLoading(false)
  }

  // Fungsi delete
  const handleDelete = async (item: any) => {
    if (!window.confirm(`Yakin ingin menghapus tahun ajaran ${item.year}?`)) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('academic_years').delete().eq('id', item.id)
    if (error) {
      alert('Gagal hapus tahun ajaran: ' + error.message)
    } else {
      // Refresh data
      const { data } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
      if (data) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          year: item.year,
          startDate: item.start_date,
          endDate: item.end_date,
          semester1Start: item.semester1_start,
          semester1End: item.semester1_end,
          semester2Start: item.semester2_start,
          semester2End: item.semester2_end,
          totalSchools: item.total_schools ?? 0,
          totalClasses: item.total_classes ?? 0,
          totalStudents: item.total_students ?? 0,
          status: item.status
        }))
        setAcademicYears(mapped)
      }
    }
    setLoading(false)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Manajemen Tahun Ajaran</h1>
          <p className="text-slate-500 text-sm">Kelola tahun ajaran dan periode akademik</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all duration-150" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Tahun Ajaran
        </Button>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Tahun Ajaran Baru</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async e => {
              e.preventDefault()
              setLoading(true)
              const supabase = createClient()
              const { error } = await supabase.from('academic_years').insert([
                {
                  year: newYear.year,
                  start_date: newYear.startDate,
                  end_date: newYear.endDate,
                  semester1_start: newYear.semester1Start,
                  semester1_end: newYear.semester1End,
                  semester2_start: newYear.semester2Start,
                  semester2_end: newYear.semester2End,
                  total_classes: newYear.totalClasses,
                  total_students: newYear.totalStudents,
                  status: newYear.status
                }
              ])
              if (error) {
                alert('Gagal tambah tahun ajaran: ' + error.message)
              } else {
                // Refresh data dari Supabase
                const { data } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
                if (data) {
                  const mapped = data.map((item: any) => ({
                    id: item.id,
                    year: item.year,
                    startDate: item.start_date,
                    endDate: item.end_date,
                    semester1Start: item.semester1_start,
                    semester1End: item.semester1_end,
                    semester2Start: item.semester2_start,
                    semester2End: item.semester2_end,
                    totalSchools: item.total_schools ?? 0,
                    totalClasses: item.total_classes ?? 0,
                    totalStudents: item.total_students ?? 0,
                    status: item.status
                  }))
                  setAcademicYears(mapped)
                }
                setAddDialogOpen(false)
                setNewYear({
                  year: '',
                  startDate: '',
                  endDate: '',
                  semester1Start: '',
                  semester1End: '',
                  semester2Start: '',
                  semester2End: '',
                  totalSchools: 0,
                  totalClasses: 0,
                  totalStudents: 0,
                  status: 'planned'
                })
              }
              setLoading(false)
            }}
          >
            <div>
              <Label>Tahun Ajaran</Label>
              <input
                className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={newYear.year}
                onChange={e => setNewYear({ ...newYear, year: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tanggal Mulai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.startDate} onChange={e => setNewYear({ ...newYear, startDate: e.target.value })} required />
              </div>
              <div>
                <Label>Tanggal Selesai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.endDate} onChange={e => setNewYear({ ...newYear, endDate: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Semester 1 Mulai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.semester1Start} onChange={e => setNewYear({ ...newYear, semester1Start: e.target.value })} required />
              </div>
              <div>
                <Label>Semester 1 Selesai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.semester1End} onChange={e => setNewYear({ ...newYear, semester1End: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Semester 2 Mulai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.semester2Start} onChange={e => setNewYear({ ...newYear, semester2Start: e.target.value })} required />
              </div>
              <div>
                <Label>Semester 2 Selesai</Label>
                <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.semester2End} onChange={e => setNewYear({ ...newYear, semester2End: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Jumlah Kelas</Label>
                <input type="number" min={0} className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.totalClasses} onChange={e => setNewYear({ ...newYear, totalClasses: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Jumlah Siswa</Label>
                <input type="number" min={0} className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.totalStudents} onChange={e => setNewYear({ ...newYear, totalStudents: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.status} onChange={e => setNewYear({ ...newYear, status: e.target.value })}>
                <option value="planned">Direncanakan</option>
                <option value="active">Aktif</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAddDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" disabled={!newYear.year || !newYear.startDate || !newYear.endDate || !newYear.semester1Start || !newYear.semester1End || !newYear.semester2Start || !newYear.semester2End}>
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DataTable
        data={academicYears}
        columns={columns}
        searchPlaceholder="Cari tahun ajaran..."
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
      />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tahun Ajaran</DialogTitle>
          </DialogHeader>
          {editYear && (
            <form className="space-y-4" onSubmit={saveEditYear}>
              <div>
                <Label>Tahun Ajaran</Label>
                <input
                  className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editYear.year}
                  onChange={e => setEditYear({ ...editYear, year: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tanggal Mulai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.startDate} onChange={e => setEditYear({ ...editYear, startDate: e.target.value })} required />
                </div>
                <div>
                  <Label>Tanggal Selesai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.endDate} onChange={e => setEditYear({ ...editYear, endDate: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Semester 1 Mulai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.semester1Start} onChange={e => setEditYear({ ...editYear, semester1Start: e.target.value })} required />
                </div>
                <div>
                  <Label>Semester 1 Selesai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.semester1End} onChange={e => setEditYear({ ...editYear, semester1End: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Semester 2 Mulai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.semester2Start} onChange={e => setEditYear({ ...editYear, semester2Start: e.target.value })} required />
                </div>
                <div>
                  <Label>Semester 2 Selesai</Label>
                  <input type="date" className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.semester2End} onChange={e => setEditYear({ ...editYear, semester2End: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Jumlah Kelas</Label>
                  <input type="number" min={0} className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.totalClasses} onChange={e => setEditYear({ ...editYear, totalClasses: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Jumlah Siswa</Label>
                  <input type="number" min={0} className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.totalStudents} onChange={e => setEditYear({ ...editYear, totalStudents: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.status} onChange={e => setEditYear({ ...editYear, status: e.target.value })}>
                  <option value="planned">Direncanakan</option>
                  <option value="active">Aktif</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setEditDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" disabled={!editYear.year || !editYear.startDate || !editYear.endDate || !editYear.semester1Start || !editYear.semester1End || !editYear.semester2Start || !editYear.semester2End}>
                  Simpan
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}