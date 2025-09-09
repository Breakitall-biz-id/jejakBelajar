'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Eye, 
  Plus, 
  Edit, 
  Calendar, 
  User,
  FileText,
  Star,
  CheckCircle,
  Clock,
  BookOpen
} from 'lucide-react'

const observations = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Andi Pratama',
    projectTitle: 'Lingkungan Sehat dan Berkelanjutan',
    date: '2024-01-20',
    dimension: 'Berkebinekaan Global',
    score: 85,
    notes: 'Siswa menunjukkan kemampuan berkolaborasi yang baik dengan teman-teman dari latar belakang yang berbeda. Mampu menghargai pendapat yang beragam dalam diskusi kelompok.',
    criteria: {
      collaboration: 4,
      communication: 4,
      creativity: 3,
      criticalThinking: 4,
      responsibility: 4
    },
    status: 'completed'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Siti Nurhaliza',
    projectTitle: 'Lingkungan Sehat dan Berkelanjutan',
    date: '2024-01-20',
    dimension: 'Berkebinekaan Global',
    score: 92,
    notes: 'Siswa sangat aktif dalam memimpin diskusi dan mampu memfasilitasi perbedaan pendapat dengan baik. Menunjukkan sikap inklusif dan menghargai keberagaman.',
    criteria: {
      collaboration: 5,
      communication: 5,
      creativity: 4,
      criticalThinking: 5,
      responsibility: 5
    },
    status: 'completed'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Budi Setiawan',
    projectTitle: 'Teknologi Ramah Lingkungan',
    date: '2024-01-22',
    dimension: 'Kreatif',
    score: 0,
    notes: '',
    criteria: {
      collaboration: 0,
      communication: 0,
      creativity: 0,
      criticalThinking: 0,
      responsibility: 0
    },
    status: 'draft'
  }
]

const reflectionJournals = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Andi Pratama',
    projectTitle: 'Lingkungan Sehat dan Berkelanjutan',
    date: '2024-01-21',
    content: 'Hari ini saya belajar tentang pentingnya menjaga lingkungan. Saya merasa senang bisa bekerja sama dengan teman-teman untuk mencari solusi masalah sampah di sekolah. Tantangan terbesar adalah meyakinkan teman-teman lain untuk ikut serta dalam program ini.',
    reflection: 'Saya menyadari bahwa perubahan kecil yang kita lakukan bisa berdampak besar. Ke depannya, saya ingin lebih aktif dalam kegiatan lingkungan.',
    score: 88,
    feedback: 'Refleksi yang baik, menunjukkan pemahaman mendalam tentang dampak tindakan terhadap lingkungan.',
    status: 'reviewed'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Siti Nurhaliza',
    projectTitle: 'Lingkungan Sehat dan Berkelanjutan',
    date: '2024-01-21',
    content: 'Proyek ini membuka mata saya tentang kompleksitas masalah lingkungan. Saya belajar bahwa solusi tidak selalu sederhana dan perlu melibatkan berbagai pihak. Diskusi dengan teman-teman dari berbagai latar belakang memberikan perspektif yang berbeda.',
    reflection: 'Saya merasa lebih percaya diri dalam memimpin diskusi dan menghargai perbedaan pendapat. Ini adalah pembelajaran berharga untuk masa depan.',
    score: 0,
    feedback: '',
    status: 'pending'
  }
]

const students = [
  { id: 1, name: 'Andi Pratama' },
  { id: 2, name: 'Siti Nurhaliza' },
  { id: 3, name: 'Budi Setiawan' },
  { id: 4, name: 'Dewi Lestari' }
]

const projects = [
  { id: 1, title: 'Lingkungan Sehat dan Berkelanjutan' },
  { id: 2, title: 'Teknologi Ramah Lingkungan' }
]

const dimensions = [
  'Beriman, Bertakwa, dan Berakhlak Mulia',
  'Berkebinekaan Global',
  'Bergotong Royong',
  'Mandiri',
  'Bernalar Kritis',
  'Kreatif'
]

export default function TeacherObservationsPage() {
  const [activeTab, setActiveTab] = useState('observations')
  const [selectedObservation, setSelectedObservation] = useState<any>(null)
  const [selectedJournal, setSelectedJournal] = useState<any>(null)
  const [observationDialog, setObservationDialog] = useState(false)
  const [journalDialog, setJournalDialog] = useState(false)
  const [observationForm, setObservationForm] = useState({
    studentId: '',
    projectTitle: '',
    dimension: '',
    notes: '',
    criteria: {
      collaboration: 0,
      communication: 0,
      creativity: 0,
      criticalThinking: 0,
      responsibility: 0
    }
  })
  const [journalFeedback, setJournalFeedback] = useState('')
  const [journalScore, setJournalScore] = useState(0)

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    if (score > 0) return 'text-red-600 bg-red-50'
    return 'text-gray-600 bg-gray-50'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCreateObservation = () => {
    setObservationForm({
      studentId: '',
      projectTitle: '',
      dimension: '',
      notes: '',
      criteria: {
        collaboration: 0,
        communication: 0,
        creativity: 0,
        criticalThinking: 0,
        responsibility: 0
      }
    })
    setObservationDialog(true)
  }

  const handleEditObservation = (observation: any) => {
    setSelectedObservation(observation)
    setObservationForm({
      studentId: observation.studentId.toString(),
      projectTitle: observation.projectTitle,
      dimension: observation.dimension,
      notes: observation.notes,
      criteria: observation.criteria
    })
    setObservationDialog(true)
  }

  const handleReviewJournal = (journal: any) => {
    setSelectedJournal(journal)
    setJournalFeedback(journal.feedback || '')
    setJournalScore(journal.score || 0)
    setJournalDialog(true)
  }

  const saveObservation = () => {
    // Calculate total score based on criteria
    const criteriaValues = Object.values(observationForm.criteria)
    const totalScore = Math.round((criteriaValues.reduce((a: number, b: number) => a + b, 0) / criteriaValues.length) * 20)
    
    console.log('Saving observation:', { ...observationForm, score: totalScore })
    setObservationDialog(false)
    setSelectedObservation(null)
  }

  const saveJournalReview = () => {
    console.log('Saving journal review:', {
      journalId: selectedJournal?.id,
      score: journalScore,
      feedback: journalFeedback
    })
    setJournalDialog(false)
    setSelectedJournal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Observasi & Jurnal Refleksi</h1>
          <p className="text-gray-600 mt-1">Kelola observasi siswa dan review jurnal refleksi</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('observations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'observations'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Lembar Observasi
          </button>
          <button
            onClick={() => setActiveTab('journals')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'journals'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Jurnal Refleksi
          </button>
        </nav>
      </div>

      {/* Observations Tab */}
      {activeTab === 'observations' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleCreateObservation} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Buat Observasi Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {observations.map((observation) => (
              <Card key={observation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {observation.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{observation.studentName}</h3>
                        <p className="text-sm text-gray-600">{observation.projectTitle}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(observation.status)}>
                      {observation.status === 'completed' ? 'Selesai' : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(observation.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    {observation.score > 0 && (
                      <div className={`text-center p-2 rounded-lg ${getScoreColor(observation.score)}`}>
                        <div className="text-lg font-bold">{observation.score}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      {observation.dimension}
                    </Badge>
                  </div>

                  {observation.notes && (
                    <p className="text-sm text-gray-700 line-clamp-3">{observation.notes}</p>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedObservation(observation)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditObservation(observation)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Journals Tab */}
      {activeTab === 'journals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reflectionJournals.map((journal) => (
              <Card key={journal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-semibold">
                          {journal.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{journal.studentName}</h3>
                        <p className="text-sm text-gray-600">{journal.projectTitle}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(journal.status)}>
                      {journal.status === 'reviewed' ? 'Sudah Dinilai' : 'Menunggu Review'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(journal.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    {journal.score > 0 && (
                      <div className={`text-center p-2 rounded-lg ${getScoreColor(journal.score)}`}>
                        <div className="text-lg font-bold">{journal.score}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 line-clamp-4">{journal.content}</p>
                  </div>

                  {journal.feedback && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">{journal.feedback}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedJournal(journal)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Baca
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReviewJournal(journal)}
                      className="flex-1"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {journal.status === 'reviewed' ? 'Edit Nilai' : 'Beri Nilai'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Observation Detail Dialog */}
      <Dialog open={!!selectedObservation && !observationDialog} onOpenChange={() => setSelectedObservation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Observasi - {selectedObservation?.studentName}</DialogTitle>
          </DialogHeader>
          {selectedObservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Proyek</Label>
                  <p className="text-gray-700">{selectedObservation.projectTitle}</p>
                </div>
                <div>
                  <Label className="font-semibold">Tanggal</Label>
                  <p className="text-gray-700">{new Date(selectedObservation.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              
              <div>
                <Label className="font-semibold">Dimensi P5</Label>
                <p className="text-gray-700">{selectedObservation.dimension}</p>
              </div>

              <div>
                <Label className="font-semibold">Catatan Observasi</Label>
                <p className="text-gray-700">{selectedObservation.notes}</p>
              </div>

              <div>
                <Label className="font-semibold">Penilaian Kriteria</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex justify-between">
                    <span>Kolaborasi</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= selectedObservation.criteria.collaboration ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Komunikasi</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= selectedObservation.criteria.communication ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Kreativitas</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= selectedObservation.criteria.creativity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Berpikir Kritis</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= selectedObservation.criteria.criticalThinking ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span>Tanggung Jawab</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= selectedObservation.criteria.responsibility ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className={`inline-block p-4 rounded-lg ${getScoreColor(selectedObservation.score)}`}>
                  <div className="text-2xl font-bold">{selectedObservation.score}</div>
                  <div className="text-sm">Skor Total</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Journal Detail Dialog */}
      <Dialog open={!!selectedJournal && !journalDialog} onOpenChange={() => setSelectedJournal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Jurnal Refleksi - {selectedJournal?.studentName}</DialogTitle>
          </DialogHeader>
          {selectedJournal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Proyek</Label>
                  <p className="text-gray-700">{selectedJournal.projectTitle}</p>
                </div>
                <div>
                  <Label className="font-semibold">Tanggal</Label>
                  <p className="text-gray-700">{new Date(selectedJournal.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Isi Jurnal</Label>
                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                  <p className="text-gray-700">{selectedJournal.content}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Refleksi</Label>
                <div className="bg-blue-50 p-4 rounded-lg mt-2">
                  <p className="text-blue-800">{selectedJournal.reflection}</p>
                </div>
              </div>

              {selectedJournal.feedback && (
                <div>
                  <Label className="font-semibold">Feedback Guru</Label>
                  <div className="bg-green-50 p-4 rounded-lg mt-2">
                    <p className="text-green-800">{selectedJournal.feedback}</p>
                  </div>
                </div>
              )}

              {selectedJournal.score > 0 && (
                <div className="text-center">
                  <div className={`inline-block p-4 rounded-lg ${getScoreColor(selectedJournal.score)}`}>
                    <div className="text-2xl font-bold">{selectedJournal.score}</div>
                    <div className="text-sm">Skor</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Observation Dialog */}
      <Dialog open={observationDialog} onOpenChange={setObservationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedObservation ? 'Edit Observasi' : 'Buat Observasi Baru'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="student">Siswa</Label>
                <Select value={observationForm.studentId} onValueChange={(value) => setObservationForm({...observationForm, studentId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id.toString()}>{student.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project">Proyek</Label>
                <Select value={observationForm.projectTitle} onValueChange={(value) => setObservationForm({...observationForm, projectTitle: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih proyek" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.title}>{project.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="dimension">Dimensi P5</Label>
              <Select value={observationForm.dimension} onValueChange={(value) => setObservationForm({...observationForm, dimension: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih dimensi P5" />
                </SelectTrigger>
                <SelectContent>
                  {dimensions.map(dimension => (
                    <SelectItem key={dimension} value={dimension}>{dimension}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Catatan Observasi</Label>
              <Textarea
                id="notes"
                value={observationForm.notes}
                onChange={(e) => setObservationForm({...observationForm, notes: e.target.value})}
                placeholder="Tuliskan hasil observasi..."
                rows={4}
              />
            </div>

            <div>
              <Label className="font-semibold">Penilaian Kriteria (1-5)</Label>
              <div className="space-y-3 mt-2">
                {Object.entries(observationForm.criteria).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key === 'criticalThinking' ? 'Berpikir Kritis' : key === 'collaboration' ? 'Kolaborasi' : key === 'communication' ? 'Komunikasi' : key === 'creativity' ? 'Kreativitas' : 'Tanggung Jawab'}</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setObservationForm({
                            ...observationForm,
                            criteria: {...observationForm.criteria, [key]: i}
                          })}
                        >
                          <Star className={`w-5 h-5 ${i <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setObservationDialog(false)}>
                Batal
              </Button>
              <Button onClick={saveObservation}>
                Simpan Observasi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Journal Review Dialog */}
      <Dialog open={journalDialog} onOpenChange={setJournalDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Jurnal - {selectedJournal?.studentName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Isi Jurnal</Label>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p className="text-gray-700">{selectedJournal?.content}</p>
              </div>
            </div>

            <div>
              <Label className="font-semibold">Refleksi Siswa</Label>
              <div className="bg-blue-50 p-4 rounded-lg mt-2">
                <p className="text-blue-800">{selectedJournal?.reflection}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="score">Skor (0-100)</Label>
              <input
                type="number"
                id="score"
                min="0"
                max="100"
                value={journalScore}
                onChange={(e) => setJournalScore(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              />
            </div>

            <div>
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={journalFeedback}
                onChange={(e) => setJournalFeedback(e.target.value)}
                placeholder="Berikan feedback untuk jurnal refleksi siswa..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setJournalDialog(false)}>
                Batal
              </Button>
              <Button onClick={saveJournalReview}>
                Simpan Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}