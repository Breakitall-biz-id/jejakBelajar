'use client'

import { useState } from 'react'
import { ProjectWizard } from '@/components/ui/project-wizard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus, 
  Edit, 
  Eye, 
  Users, 
  Calendar, 
  Target, 
  FileText,
  Settings,
  BookOpen,
  Award,
  CheckCircle
} from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Lingkungan Sehat dan Berkelanjutan',
    description: 'Proyek untuk menganalisis dan merancang solusi permasalahan lingkungan di sekitar sekolah dengan pendekatan kearifan lokal',
    theme: 'Kearifan Lokal',
    dimension: 'Berkebinekaan Global',
    objectives: 'Siswa mampu mengidentifikasi masalah lingkungan dan merancang solusi berkelanjutan',
    criteria: 'Kreativitas solusi, analisis masalah, presentasi, kolaborasi tim',
    guidelines: 'Lakukan observasi lingkungan sekolah, identifikasi masalah, buat proposal solusi, implementasi mini project',
    participants: 36,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    progress: 65,
    rubric: {
      excellent: '85-100: Solusi sangat kreatif dan inovatif',
      good: '70-84: Solusi baik dengan analisis yang tepat',
      fair: '55-69: Solusi cukup dengan beberapa kekurangan',
      poor: '0-54: Solusi kurang tepat atau tidak lengkap'
    }
  },
  {
    id: 2,
    title: 'Teknologi Ramah Lingkungan',
    description: 'Mengembangkan teknologi sederhana yang ramah lingkungan untuk mengatasi masalah sampah di lingkungan sekolah',
    theme: 'Rekayasa dan Teknologi',
    dimension: 'Kreatif',
    objectives: 'Siswa mampu merancang dan membuat teknologi sederhana ramah lingkungan',
    criteria: 'Inovasi teknologi, kebermanfaatan, presentasi, dokumentasi proses',
    guidelines: 'Riset teknologi ramah lingkungan, desain prototype, buat dan uji coba, dokumentasi hasil',
    participants: 36,
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    progress: 45,
    rubric: {
      excellent: '85-100: Teknologi sangat inovatif dan bermanfaat',
      good: '70-84: Teknologi baik dengan fungsi yang jelas',
      fair: '55-69: Teknologi cukup dengan beberapa kekurangan',
      poor: '0-54: Teknologi kurang berfungsi atau tidak sesuai'
    }
  }
]

const themes = [
  'Kearifan Lokal',
  'Rekayasa dan Teknologi', 
  'Kewirausahaan',
  'Bhinneka Tunggal Ika',
  'Suara Demokrasi'
]

const dimensions = [
  'Beriman, Bertakwa, dan Berakhlak Mulia',
  'Berkebinekaan Global',
  'Bergotong Royong',
  'Mandiri',
  'Bernalar Kritis',
  'Kreatif'
]

export default function TeacherProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [editDialog, setEditDialog] = useState(false)
  const [createWizard, setCreateWizard] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: '',
    dimension: '',
    objectives: '',
    criteria: '',
    guidelines: '',
    startDate: '',
    endDate: '',
    rubric: {
      excellent: '',
      good: '',
      fair: '',
      poor: ''
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const handleViewProject = (project: any) => {
    setSelectedProject(project)
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      theme: project.theme,
      dimension: project.dimension,
      objectives: project.objectives,
      criteria: project.criteria,
      guidelines: project.guidelines,
      startDate: project.startDate,
      endDate: project.endDate,
      rubric: project.rubric
    })
    setEditDialog(true)
  }

  const handleCreateProject = () => {
    setCreateWizard(true)
  }

  const handleSaveProject = (projectData: any) => {
    console.log('Saving new project:', projectData)
    // Implementation for saving project
  }

  const saveProject = () => {
    // Implementation for saving project
    console.log('Saving project:', formData)
    setEditDialog(false)
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Proyek P5</h1>
          <p className="text-gray-600 mt-1">Kelola proyek Penguatan Profil Pelajar Pancasila untuk kelas XII IPA 1</p>
        </div>
        <Button onClick={handleCreateProject} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Buat Proyek Baru
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">{project.theme}</span>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                    {project.dimension}
                  </Badge>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status === 'active' ? 'Aktif' : project.status === 'draft' ? 'Draft' : 'Selesai'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-blue-600">{project.participants}</span>
                  </div>
                  <div className="text-xs text-gray-500">Peserta</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-600">{project.progress}%</span>
                  </div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress Proyek</span>
                  <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.startDate).toLocaleDateString('id-ID')} - {new Date(project.endDate).toLocaleDateString('id-ID')}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewProject(project)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Detail
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEditProject(project)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject && !editDialog} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Proyek - {selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{selectedProject.participants}</div>
                    <div className="text-sm text-gray-600">Peserta</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-purple-600">{selectedProject.theme}</div>
                    <div className="text-sm text-gray-600">Tema</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{selectedProject.progress}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informasi Proyek</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="font-semibold">Deskripsi</Label>
                      <p className="text-gray-700 mt-1">{selectedProject.description}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Dimensi P5</Label>
                      <p className="text-gray-700 mt-1">{selectedProject.dimension}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Periode</Label>
                      <p className="text-gray-700 mt-1">
                        {new Date(selectedProject.startDate).toLocaleDateString('id-ID')} - {new Date(selectedProject.endDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tujuan & Kriteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="font-semibold">Tujuan Pembelajaran</Label>
                      <p className="text-gray-700 mt-1">{selectedProject.objectives}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Kriteria Penilaian</Label>
                      <p className="text-gray-700 mt-1">{selectedProject.criteria}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Panduan Proyek</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedProject.guidelines}</p>
                </CardContent>
              </Card>

              {/* Rubrik */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rubrik Penskoran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Sangat Baik (85-100)</div>
                      <p className="text-green-700 text-sm mt-1">{selectedProject.rubric.excellent}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Baik (70-84)</div>
                      <p className="text-blue-700 text-sm mt-1">{selectedProject.rubric.good}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-yellow-800">Cukup (55-69)</div>
                      <p className="text-yellow-700 text-sm mt-1">{selectedProject.rubric.fair}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-800">Perlu Perbaikan (0-54)</div>
                      <p className="text-red-700 text-sm mt-1">{selectedProject.rubric.poor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit/Create Project Dialog */}
      <Dialog open={editDialog} onOpenChange={() => setEditDialog(false)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Proyek</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Judul Proyek</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Masukkan judul proyek"
                />
              </div>
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Select value={formData.theme} onValueChange={(value) => setFormData({...formData, theme: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tema" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map(theme => (
                      <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Deskripsi proyek"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="dimension">Dimensi P5</Label>
              <Select value={formData.dimension} onValueChange={(value) => setFormData({...formData, dimension: value})}>
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
              <Label htmlFor="objectives">Tujuan Pembelajaran</Label>
              <Textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                placeholder="Tujuan pembelajaran yang ingin dicapai"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="criteria">Kriteria Penilaian</Label>
              <Textarea
                id="criteria"
                value={formData.criteria}
                onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                placeholder="Kriteria yang akan dinilai"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="guidelines">Panduan Proyek</Label>
              <Textarea
                id="guidelines"
                value={formData.guidelines}
                onChange={(e) => setFormData({...formData, guidelines: e.target.value})}
                placeholder="Langkah-langkah pengerjaan proyek"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            {/* Rubrik Section */}
            <div>
              <Label className="text-lg font-semibold">Rubrik Penskoran</Label>
              <div className="space-y-3 mt-3">
                <div>
                  <Label htmlFor="excellent">Sangat Baik (85-100)</Label>
                  <Textarea
                    id="excellent"
                    value={formData.rubric.excellent}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, excellent: e.target.value}})}
                    placeholder="Deskripsi untuk nilai sangat baik"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="good">Baik (70-84)</Label>
                  <Textarea
                    id="good"
                    value={formData.rubric.good}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, good: e.target.value}})}
                    placeholder="Deskripsi untuk nilai baik"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="fair">Cukup (55-69)</Label>
                  <Textarea
                    id="fair"
                    value={formData.rubric.fair}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, fair: e.target.value}})}
                    placeholder="Deskripsi untuk nilai cukup"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="poor">Perlu Perbaikan (0-54)</Label>
                  <Textarea
                    id="poor"
                    value={formData.rubric.poor}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, poor: e.target.value}})}
                    placeholder="Deskripsi untuk nilai perlu perbaikan"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditDialog(false)}>
                Batal
              </Button>
              <Button onClick={saveProject}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Creation Wizard */}
      <ProjectWizard 
        open={createWizard} 
        onOpenChange={setCreateWizard}
        onSave={handleSaveProject}
      />
    </div>
  )
}