'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Download, Filter, Calendar, TrendingUp, Users, BookOpen, Award } from 'lucide-react'

const assessmentData = [
  { month: 'Jan', selfAssessment: 45, peerAssessment: 38, teacherObservation: 42, reflection: 35 },
  { month: 'Feb', selfAssessment: 52, peerAssessment: 45, teacherObservation: 48, reflection: 41 },
  { month: 'Mar', selfAssessment: 48, peerAssessment: 42, teacherObservation: 45, reflection: 38 },
  { month: 'Apr', selfAssessment: 58, peerAssessment: 51, teacherObservation: 55, reflection: 47 },
  { month: 'Mei', selfAssessment: 65, peerAssessment: 58, teacherObservation: 62, reflection: 54 },
  { month: 'Jun', selfAssessment: 72, peerAssessment: 65, teacherObservation: 68, reflection: 61 }
]

const dimensionData = [
  { name: 'Beriman, Bertakwa, dan Berakhlak Mulia', value: 85, color: '#3b82f6' },
  { name: 'Berkebinekaan Global', value: 78, color: '#10b981' },
  { name: 'Bergotong Royong', value: 82, color: '#f59e0b' },
  { name: 'Mandiri', value: 75, color: '#ef4444' },
  { name: 'Bernalar Kritis', value: 88, color: '#8b5cf6' },
  { name: 'Kreatif', value: 80, color: '#06b6d4' }
]

const participationData = [
  { month: 'Jan', active: 89, completed: 76 },
  { month: 'Feb', active: 92, completed: 85 },
  { month: 'Mar', active: 88, completed: 82 },
  { month: 'Apr', active: 95, completed: 89 },
  { month: 'Mei', active: 93, completed: 91 },
  { month: 'Jun', active: 97, completed: 94 }
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester1')
  const [selectedSchool, setSelectedSchool] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')

  const schools = ['SMA Negeri 1 Jakarta', 'SMA Swasta Harapan Bangsa', 'SMA Katolik Santo Yusup']
  const classes = ['XII IPA 1', 'XII IPA 2', 'XII IPA 3', 'XI IPA 1', 'XI IPA 2', 'XI IPA 3']

  const exportReport = (format: string) => {
    // Implementation for export functionality
    console.log(`Exporting report in ${format} format`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analytics</h1>
          <p className="text-gray-600 mt-1">Analisis data dan statistik penggunaan sistem</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Laporan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester1">Semester 1 2024/2025</SelectItem>
                <SelectItem value="semester2">Semester 2 2024/2025</SelectItem>
                <SelectItem value="full-year">Tahun Penuh 2024/2025</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Sekolah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Sekolah</SelectItem>
                {schools.map(school => (
                  <SelectItem key={school} value={school}>{school}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessment</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">2,847</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tingkat Partisipasi</p>
                <p className="text-3xl font-bold text-green-600 mt-2">94.2%</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+3.2% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyek Selesai</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">156</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8.7% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Skor</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">82.4</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+2.8% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tren Penggunaan Fitur Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assessmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="month" className="text-gray-600" tick={{ fontSize: 12 }} />
                <YAxis className="text-gray-600" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="selfAssessment" fill="#3b82f6" name="Self Assessment" />
                <Bar dataKey="peerAssessment" fill="#10b981" name="Peer Assessment" />
                <Bar dataKey="teacherObservation" fill="#f59e0b" name="Observasi Guru" />
                <Bar dataKey="reflection" fill="#ef4444" name="Jurnal Refleksi" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Skor per Dimensi P5</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dimensionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${value}`}
                >
                  {dimensionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tren Partisipasi Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" className="text-gray-600" tick={{ fontSize: 12 }} />
              <YAxis className="text-gray-600" tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name === 'active' ? 'Siswa Aktif' : 'Assessment Selesai']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="active"
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Laporan per Kelas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-900">Kelas</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Wali Kelas</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Siswa</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Proyek Aktif</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Assessment Selesai</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Rata-rata Skor</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Partisipasi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium">XII IPA 1</td>
                  <td className="p-3 text-gray-600">Bu Sari Wijaya</td>
                  <td className="p-3">36</td>
                  <td className="p-3">3</td>
                  <td className="p-3">128</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">87.2</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">96.8%</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium">XII IPA 2</td>
                  <td className="p-3 text-gray-600">Pak Ahmad Hidayat</td>
                  <td className="p-3">34</td>
                  <td className="p-3">2</td>
                  <td className="p-3">115</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">83.4</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">94.1%</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium">XI IPA 3</td>
                  <td className="p-3 text-gray-600">Bu Maya Indira</td>
                  <td className="p-3">32</td>
                  <td className="p-3">4</td>
                  <td className="p-3">95</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">89.1</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">92.5%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}