'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Download, Filter, Eye, FileText, Users, Award, TrendingUp, Calendar } from 'lucide-react'

const classData = [
  { month: 'Jan', selfAssessment: 32, peerAssessment: 28, teacherObservation: 30, reflection: 25 },
  { month: 'Feb', selfAssessment: 38, peerAssessment: 35, teacherObservation: 36, reflection: 32 },
  { month: 'Mar', selfAssessment: 35, peerAssessment: 32, teacherObservation: 34, reflection: 29 },
  { month: 'Apr', selfAssessment: 42, peerAssessment: 38, teacherObservation: 40, reflection: 36 },
  { month: 'Mei', selfAssessment: 45, peerAssessment: 42, teacherObservation: 44, reflection: 40 }
]

const dimensionData = [
  { name: 'Beriman, Bertakwa, dan Berakhlak Mulia', value: 82, color: '#3b82f6' },
  { name: 'Berkebinekaan Global', value: 88, color: '#10b981' },
  { name: 'Bergotong Royong', value: 85, color: '#f59e0b' },
  { name: 'Mandiri', value: 79, color: '#ef4444' },
  { name: 'Bernalar Kritis', value: 91, color: '#8b5cf6' },
  { name: 'Kreatif', value: 86, color: '#06b6d4' }
]

const studentReports = [
  {
    id: 1,
    name: 'Andi Pratama',
    nisn: '0054321987',
    totalAssessments: 8,
    averageScore: 85,
    selfAssessments: 5,
    peerAssessments: 3,
    observations: 2,
    reflections: 4,
    lastActivity: '2 jam lalu',
    strengths: ['Kolaborasi', 'Komunikasi'],
    improvements: ['Kreativitas'],
    progress: [
      { month: 'Jan', score: 78 },
      { month: 'Feb', score: 82 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 87 },
      { month: 'Mei', score: 85 }
    ]
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nisn: '0054321988',
    totalAssessments: 12,
    averageScore: 92,
    selfAssessments: 6,
    peerAssessments: 4,
    observations: 3,
    reflections: 5,
    lastActivity: '1 jam lalu',
    strengths: ['Berpikir Kritis', 'Tanggung Jawab'],
    improvements: ['Kolaborasi'],
    progress: [
      { month: 'Jan', score: 88 },
      { month: 'Feb', score: 90 },
      { month: 'Mar', score: 92 },
      { month: 'Apr', score: 94 },
      { month: 'Mei', score: 92 }
    ]
  },
  {
    id: 3,
    name: 'Budi Setiawan',
    nisn: '0054321989',
    totalAssessments: 6,
    averageScore: 78,
    selfAssessments: 3,
    peerAssessments: 2,
    observations: 1,
    reflections: 2,
    lastActivity: '5 jam lalu',
    strengths: ['Kreativitas'],
    improvements: ['Komunikasi', 'Kolaborasi'],
    progress: [
      { month: 'Jan', score: 72 },
      { month: 'Feb', score: 75 },
      { month: 'Mar', score: 78 },
      { month: 'Apr', score: 80 },
      { month: 'Mei', score: 78 }
    ]
  }
]

export default function TeacherReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester1')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [reportType, setReportType] = useState('class')

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const downloadClassReport = () => {
    console.log('Downloading class report for period:', selectedPeriod)
  }

  const downloadStudentReport = (student: any) => {
    console.log('Downloading individual report for student:', student.id)
  }

  const viewStudentDetail = (student: any) => {
    setSelectedStudent(student)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analytics</h1>
          <p className="text-gray-600 mt-1">Analisis perkembangan siswa dan kelas XII IPA 1</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={downloadClassReport}>
            <Download className="w-4 h-4 mr-2" />
            Unduh Laporan Kelas
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
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Jenis Laporan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class">Laporan Kelas</SelectItem>
                <SelectItem value="individual">Laporan Individual</SelectItem>
                <SelectItem value="project">Laporan per Proyek</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Eye className="w-4 h-4 mr-2" />
              Tampilkan Laporan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Class Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessment</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">248</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Kelas</p>
                <p className="text-3xl font-bold text-green-600 mt-2">85.2</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+2.8% dari bulan lalu</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Siswa Aktif</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">34/36</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>94.4% partisipasi</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyek Selesai</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">2/3</p>
                <div className="flex items-center text-sm text-blue-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>1 proyek berlangsung</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tren Assessment Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classData}>
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

      {/* Individual Student Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Individual Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentReports.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">NISN: {student.nisn}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`text-center p-3 rounded-lg ${getScoreColor(student.averageScore)}`}>
                      <div className="text-xl font-bold">{student.averageScore}</div>
                      <div className="text-xs">Rata-rata</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => viewStudentDetail(student)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => downloadStudentReport(student)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{student.selfAssessments}</div>
                    <div className="text-xs text-gray-500">Self Assessment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{student.peerAssessments}</div>
                    <div className="text-xs text-gray-500">Peer Assessment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{student.observations}</div>
                    <div className="text-xs text-gray-500">Observasi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{student.reflections}</div>
                    <div className="text-xs text-gray-500">Refleksi</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-1">Kekuatan:</div>
                    <div className="flex flex-wrap gap-1">
                      {student.strengths.map((strength, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-orange-700 mb-1">Perlu Ditingkatkan:</div>
                    <div className="flex flex-wrap gap-1">
                      {student.improvements.map((improvement, index) => (
                        <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detail Laporan - {selectedStudent.name}</h2>
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Tutup
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className={`inline-block p-4 rounded-lg ${getScoreColor(selectedStudent.averageScore)}`}>
                      <div className="text-3xl font-bold">{selectedStudent.averageScore}</div>
                      <div className="text-sm">Rata-rata Skor</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{selectedStudent.totalAssessments}</div>
                    <div className="text-sm text-gray-600">Total Assessment</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">{selectedStudent.lastActivity}</div>
                    <div className="text-sm text-gray-600">Aktivitas Terakhir</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Tren Perkembangan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={selectedStudent.progress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Kekuatan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedStudent.strengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700">Area Pengembangan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedStudent.improvements.map((improvement: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}