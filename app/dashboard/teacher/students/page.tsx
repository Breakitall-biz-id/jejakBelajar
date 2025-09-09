'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Users, 
  Eye, 
  MessageSquare, 
  Download, 
  Award, 
  BookOpen, 
  TrendingUp,
  Calendar,
  FileText,
  Star
} from 'lucide-react'

const students = [
  {
    id: 1,
    name: 'Andi Pratama',
    nisn: '0054321987',
    email: 'andi.pratama@student.sch.id',
    activeProjects: 2,
    completedAssessments: 8,
    averageScore: 85,
    lastActivity: '2 jam lalu',
    selfAssessments: 5,
    peerAssessments: 3,
    reflectionJournals: 4,
    teacherObservations: 2,
    feedback: 'Siswa yang aktif dan kreatif dalam mengerjakan proyek',
    status: 'active'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nisn: '0054321988',
    email: 'siti.nurhaliza@student.sch.id',
    activeProjects: 2,
    completedAssessments: 12,
    averageScore: 92,
    lastActivity: '1 jam lalu',
    selfAssessments: 6,
    peerAssessments: 4,
    reflectionJournals: 5,
    teacherObservations: 3,
    feedback: 'Siswa berprestasi dengan kemampuan analisis yang baik',
    status: 'active'
  },
  {
    id: 3,
    name: 'Budi Setiawan',
    nisn: '0054321989',
    email: 'budi.setiawan@student.sch.id',
    activeProjects: 1,
    completedAssessments: 6,
    averageScore: 78,
    lastActivity: '5 jam lalu',
    selfAssessments: 3,
    peerAssessments: 2,
    reflectionJournals: 2,
    teacherObservations: 1,
    feedback: 'Perlu lebih aktif dalam diskusi kelompok',
    status: 'active'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    nisn: '0054321990',
    email: 'dewi.lestari@student.sch.id',
    activeProjects: 3,
    completedAssessments: 10,
    averageScore: 88,
    lastActivity: '3 jam lalu',
    selfAssessments: 5,
    peerAssessments: 3,
    reflectionJournals: 4,
    teacherObservations: 2,
    feedback: 'Siswa yang konsisten dan bertanggung jawab',
    status: 'active'
  }
]

export default function TeacherStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const [feedback, setFeedback] = useState('')

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student)
  }

  const handleGiveFeedback = (student: any) => {
    setSelectedStudent(student)
    setFeedback(student.feedback || '')
    setFeedbackDialog(true)
  }

  const saveFeedback = () => {
    // Implementation for saving feedback
    console.log('Saving feedback for student:', selectedStudent?.id, feedback)
    setFeedbackDialog(false)
    setSelectedStudent(null)
    setFeedback('')
  }

  const downloadReport = (student: any) => {
    // Implementation for downloading individual report
    console.log('Downloading report for student:', student.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Siswa Kelas XII IPA 1</h1>
          <p className="text-gray-600 mt-1">Kelola dan pantau perkembangan siswa dalam proyek P5</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Laporan Kelas
          </Button>
        </div>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">36</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Skor</p>
                <p className="text-3xl font-bold text-green-600 mt-2">85.8</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyek Aktif</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assessment Selesai</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">128</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">NISN: {student.nisn}</p>
                </div>
                <div className={`text-center p-2 rounded-lg ${getScoreColor(student.averageScore)}`}>
                  <div className="text-lg font-bold">{student.averageScore}</div>
                  <div className="text-xs">Rata-rata</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Assessment Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-blue-600">{student.activeProjects}</span>
                  </div>
                  <div className="text-xs text-gray-500">Proyek Aktif</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-600">{student.completedAssessments}</span>
                  </div>
                  <div className="text-xs text-gray-500">Assessment</div>
                </div>
              </div>

              {/* Assessment Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Self Assessment</span>
                  <span className="font-medium">{student.selfAssessments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Peer Assessment</span>
                  <span className="font-medium">{student.peerAssessments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Jurnal Refleksi</span>
                  <span className="font-medium">{student.reflectionJournals}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Observasi Guru</span>
                  <span className="font-medium">{student.teacherObservations}</span>
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Aktivitas terakhir: {student.lastActivity}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewDetails(student)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Detail
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGiveFeedback(student)}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Feedback
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => downloadReport(student)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedStudent && !feedbackDialog} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Siswa - {selectedStudent?.name}</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                    {selectedStudent.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">NISN: {selectedStudent.nisn}</p>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>
                <div className={`text-center p-3 rounded-lg ${getScoreColor(selectedStudent.averageScore)}`}>
                  <div className="text-2xl font-bold">{selectedStudent.averageScore}</div>
                  <div className="text-sm">Rata-rata Skor</div>
                </div>
              </div>

              {/* Assessment Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Ringkasan Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Self Assessment</span>
                        <Badge variant="secondary">{selectedStudent.selfAssessments}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Peer Assessment</span>
                        <Badge variant="secondary">{selectedStudent.peerAssessments}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Jurnal Refleksi</span>
                        <Badge variant="secondary">{selectedStudent.reflectionJournals}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Observasi Guru</span>
                        <Badge variant="secondary">{selectedStudent.teacherObservations}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Aktivitas Proyek</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Proyek Aktif</span>
                        <Badge className="bg-blue-100 text-blue-800">{selectedStudent.activeProjects}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Assessment</span>
                        <Badge className="bg-green-100 text-green-800">{selectedStudent.completedAssessments}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Aktivitas Terakhir</span>
                        <span className="text-sm text-gray-600">{selectedStudent.lastActivity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Feedback */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Feedback Terakhir</h4>
                  <p className="text-gray-700">{selectedStudent.feedback}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Berikan Feedback - {selectedStudent?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Umpan Balik Tertulis</Label>
              <Textarea
                id="feedback"
                placeholder="Tuliskan feedback untuk siswa..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setFeedbackDialog(false)}>
                Batal
              </Button>
              <Button onClick={saveFeedback}>
                Simpan Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}