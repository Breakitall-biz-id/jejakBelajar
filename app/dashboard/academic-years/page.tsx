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
    1: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    0: { label: 'Selesai', className: 'bg-blue-100 text-blue-800' },
    2: { label: 'Direncanakan', className: 'bg-yellow-100 text-yellow-800' }
  }

  const periodeLabels: Record<number, string> = {
    1: 'Ganjil',
    2: 'Genap'
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
      key: 'startDate',
      header: 'Tanggal Mulai',
      render: (item: any) => (
        <div className="text-sm">{new Date(item.startDate).toLocaleDateString('id-ID')}</div>
      )
    },
    {
      key: 'endDate',
      header: 'Tanggal Selesai',
      render: (item: any) => (
        <div className="text-sm">{new Date(item.endDate).toLocaleDateString('id-ID')}</div>
      )
    },
    {
      key: 'periode',
      header: 'Periode',
      render: (item: any) => (
        <div className="text-sm font-medium">{periodeLabels[item.periode]}</div>
      )
    }
  ]

  // State untuk data tahun ajaran
  const [academicYears, setAcademicYears] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newYear, setNewYear] = useState<{
    startYear: string;
    endYear: string;
    status: number;
    startDate: string;
    endDate: string;
    periode: number;
  }>({
    startYear: '',
    endYear: '',
    status: 1,
    startDate: '',
    endDate: '',
    periode: 1
  })

  // Ambil data dari Supabase saat mount
  useEffect(() => {
    const fetchAcademicYears = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
      if (!error && data) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          year: item.year,
          status: item.status,
          startDate: item.start_date,
          endDate: item.end_date,
          periode: item.periode ?? 1 // pastikan ini ada!
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
      status: editYear.status,
      start_date: editYear.startDate,
      end_date: editYear.endDate,
      periode: editYear.periode
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
          periode: item.periode ?? 1,
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
          periode: item.periode ?? 1,
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
              const yearString = `${newYear.startYear}/${newYear.endYear}`
              const { error } = await supabase.from('academic_years').insert([
                {
                  year: yearString,
                  status: newYear.status,
                  start_date: newYear.startDate,
                  end_date: newYear.endDate,
                  periode: newYear.periode
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
                    periode: item.periode ?? 1,
                    status: item.status
                  }))
                  setAcademicYears(mapped)
                }
                setAddDialogOpen(false)
                setNewYear({
                  startYear: '',
                  endYear: '',
                  status: 1,
                  startDate: '',
                  endDate: '',
                  periode: 1
                })
              }
              setLoading(false)
            }}
          >
            <div>
              <Label>Tahun Ajaran</Label>
              <div className="flex gap-2">
                <select
                  className="block w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newYear.startYear}
                  onChange={e => setNewYear({ ...newYear, startYear: e.target.value })}
                  required
                >
                  <option value="">Tahun Awal</option>
                  {Array.from({ length: 16 }, (_, i) => 2015 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="self-center">/</span>
                <select
                  className="block w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newYear.endYear}
                  onChange={e => setNewYear({ ...newYear, endYear: e.target.value })}
                  required
                >
                  <option value="">Tahun Akhir</option>
                  {Array.from({ length: 16 }, (_, i) => 2015 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
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

            <div>
              <Label>Status</Label>
              <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.status} onChange={e => setNewYear({ ...newYear, status: Number(e.target.value) })}>
                <option value={1}>Aktif</option>
                <option value={0}>Selesai</option>
                <option value={2}>Direncanakan</option>
              </select>
            </div>
            <div>
              <Label>Periode</Label>
              <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={newYear.periode} onChange={e => setNewYear({ ...newYear, periode: Number(e.target.value) })}>
                <option value={1}>Ganjil</option>
                <option value={2}>Genap</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setAddDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" disabled={!newYear.startYear || !newYear.endYear || !newYear.startDate || !newYear.endDate || !newYear.periode}>
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
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault()
              setLoading(true)
              const yearString = `${editYear.startYear}/${editYear.endYear}`
              const supabase = createClient()
              supabase.from('academic_years').update({
                year: yearString,
                status: editYear.status,
                start_date: editYear.startDate,
                end_date: editYear.endDate,
                periode: editYear.periode
              }).eq('id', editYear.id).then(async ({ error }) => {
                if (error) {
                  alert('Gagal edit tahun ajaran: ' + error.message)
                } else {
                  const { data } = await supabase.from('academic_years').select('*').order('year', { ascending: false })
                  if (data) {
                    const mapped = data.map((item: any) => ({
                      id: item.id,
                      year: item.year,
                      startYear: item.year.split('/')[0],
                      endYear: item.year.split('/')[1],
                      startDate: item.start_date,
                      endDate: item.end_date,
                      periode: item.periode,
                      status: item.status
                    }))
                    setAcademicYears(mapped)
                  }
                  setEditDialogOpen(false)
                  setEditYear(null)
                }
                setLoading(false)
              })
            }}>
              {/* ...existing code... */}
              <Label>Tahun Ajaran</Label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  className="block w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Tahun Awal"
                  value={editYear.startYear || (editYear.year ? editYear.year.split('/')[0] : '')}
                  onChange={e => setEditYear({ ...editYear, startYear: e.target.value })}
                  required
                />
                <span className="self-center">/</span>
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  className="block w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Tahun Akhir"
                  value={editYear.endYear || (editYear.year ? editYear.year.split('/')[1] : '')}
                  onChange={e => setEditYear({ ...editYear, endYear: e.target.value })}
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

              <div>
                <Label>Status</Label>
                <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.status} onChange={e => setEditYear({ ...editYear, status: Number(e.target.value) })}>
                  <option value={1}>Aktif</option>
                  <option value={0}>Selesai</option>
                  <option value={2}>Direncanakan</option>
                </select>
              </div>
              <div>
                <Label>Periode</Label>
                <select className="block w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50" value={editYear.periode} onChange={e => setEditYear({ ...editYear, periode: Number(e.target.value) })}>
                  <option value={1}>Ganjil</option>
                  <option value={2}>Genap</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setEditDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 text-white font-semibold hover:bg-blue-700" disabled={!editYear.year || !editYear.startDate || !editYear.endDate || !editYear.periode}>
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