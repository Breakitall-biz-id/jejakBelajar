'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Clock, 
  User, 
  Globe,
  Grid3X3,
  Calendar,
  Target,
  FileText,
  Star
} from 'lucide-react'

interface ProjectWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (projectData: any) => void
}

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

const priorities = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
  { value: 'not-urgent', label: 'Not Urgent', color: 'bg-gray-100 text-gray-800' }
]

const durations = [
  '1 Week', '2 Weeks', '3 Weeks', '1 Month', '2 Months', '3 Months'
]

export function ProjectWizard({ open, onOpenChange, onSave }: ProjectWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: '',
    dimension: '',
    priority: 'not-urgent',
    duration: '1 Month',
    teacher: 'Bu Sari Wijaya',
    language: 'Bahasa Indonesia',
    objectives: '',
    criteria: '',
    guidelines: '',
    rubric: {
      excellent: '',
      good: '',
      fair: '',
      poor: ''
    },
    thumbnail: null
  })

  const steps = [
    { id: 1, title: 'Tentang Proyek', icon: FileText },
    { id: 2, title: 'Standar Penila', icon: Star },
    { id: 3, title: 'Review & Selesai', icon: Target }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
    setCurrentStep(1)
    setFormData({
      title: '',
      description: '',
      theme: '',
      dimension: '',
      priority: 'not-urgent',
      duration: '1 Month',
      teacher: 'Bu Sari Wijaya',
      language: 'Bahasa Indonesia',
      objectives: '',
      criteria: '',
      guidelines: '',
      rubric: {
        excellent: '',
        good: '',
        fair: '',
        poor: ''
      },
      thumbnail: null
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Thumbnail Area */}
            <div className="bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 rounded-xl h-48 relative flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="w-32 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs text-center">
                    <div className="font-semibold">Project Preview</div>
                    <div className="text-xs opacity-80">Thumbnail</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Update thumbnail
              </Button>
            </div>

            {/* Project Icon & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Grid3X3 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Nama Proyek"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="text-xl font-semibold border-none p-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Grid3X3 className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-sm text-gray-600">Category</Label>
                    <Select value={formData.theme} onValueChange={(value) => setFormData({...formData, theme: value})}>
                      <SelectTrigger className="border-none p-0 h-auto focus:ring-0">
                        <SelectValue placeholder="Pilih tema" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map(theme => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${priorities.find(p => p.value === formData.priority)?.color}`}>
                      {priorities.find(p => p.value === formData.priority)?.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-sm text-gray-600">Estimate duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                      <SelectTrigger className="border-none p-0 h-auto focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map(duration => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-sm text-gray-600">Guru</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          SW
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{formData.teacher}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-sm text-gray-600">Language</Label>
                    <div className="text-sm font-medium mt-1">{formData.language}</div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Dimensi P5</Label>
                <Select value={formData.dimension} onValueChange={(value) => setFormData({...formData, dimension: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih dimensi P5" />
                  </SelectTrigger>
                  <SelectContent>
                    {dimensions.map(dimension => (
                      <SelectItem key={dimension} value={dimension}>{dimension}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="text-sm text-gray-500 text-right mb-2">{formData.description.length}/400</div>
              <Textarea
                placeholder="Deskripsi proyek yang akan dikerjakan siswa..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                maxLength={400}
                className="resize-none"
              />
            </div>

            {/* Learning Path Hint */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 italic">
                Berikan gambaran kepada siswa tentang alur pembelajaran dalam proyek ini
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="objectives" className="text-base font-semibold">Tujuan Pembelajaran</Label>
              <Textarea
                id="objectives"
                placeholder="Tujuan pembelajaran yang ingin dicapai dalam proyek ini..."
                value={formData.objectives}
                onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="criteria" className="text-base font-semibold">Kriteria Penilaian</Label>
              <Textarea
                id="criteria"
                placeholder="Kriteria yang akan dinilai dalam proyek ini..."
                value={formData.criteria}
                onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="guidelines" className="text-base font-semibold">Panduan Proyek</Label>
              <Textarea
                id="guidelines"
                placeholder="Langkah-langkah pengerjaan proyek..."
                value={formData.guidelines}
                onChange={(e) => setFormData({...formData, guidelines: e.target.value})}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-base font-semibold">Rubrik Penskoran</Label>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="excellent" className="text-sm font-medium text-green-700">Sangat Baik (85-100)</Label>
                  <Textarea
                    id="excellent"
                    placeholder="Deskripsi untuk nilai sangat baik..."
                    value={formData.rubric.excellent}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, excellent: e.target.value}})}
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="good" className="text-sm font-medium text-blue-700">Baik (70-84)</Label>
                  <Textarea
                    id="good"
                    placeholder="Deskripsi untuk nilai baik..."
                    value={formData.rubric.good}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, good: e.target.value}})}
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fair" className="text-sm font-medium text-yellow-700">Cukup (55-69)</Label>
                  <Textarea
                    id="fair"
                    placeholder="Deskripsi untuk nilai cukup..."
                    value={formData.rubric.fair}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, fair: e.target.value}})}
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="poor" className="text-sm font-medium text-red-700">Perlu Perbaikan (0-54)</Label>
                  <Textarea
                    id="poor"
                    placeholder="Deskripsi untuk nilai perlu perbaikan..."
                    value={formData.rubric.poor}
                    onChange={(e) => setFormData({...formData, rubric: {...formData.rubric, poor: e.target.value}})}
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Proyek</h3>
              <p className="text-gray-600">Periksa kembali detail proyek sebelum menyimpan</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <Label className="font-semibold">Nama Proyek</Label>
                <p className="text-gray-700 mt-1">{formData.title || 'Belum diisi'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Tema</Label>
                  <p className="text-gray-700 mt-1">{formData.theme || 'Belum dipilih'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Dimensi P5</Label>
                  <p className="text-gray-700 mt-1">{formData.dimension || 'Belum dipilih'}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Deskripsi</Label>
                <p className="text-gray-700 mt-1">{formData.description || 'Belum diisi'}</p>
              </div>

              <div>
                <Label className="font-semibold">Durasi</Label>
                <p className="text-gray-700 mt-1">{formData.duration}</p>
              </div>

              {formData.objectives && (
                <div>
                  <Label className="font-semibold">Tujuan Pembelajaran</Label>
                  <p className="text-gray-700 mt-1">{formData.objectives}</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold">Buat Proyek</h2>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Step {currentStep}:</span>
              <div className="flex items-center space-x-1">
                {React.createElement(steps[currentStep - 1].icon, { className: "w-4 h-4 text-indigo-600" })}
                <span className="text-sm font-medium text-indigo-600">
                  {steps[currentStep - 1].title}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Next: {currentStep < steps.length ? steps[currentStep].title : 'Selesai'}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button size="sm" onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Simpan Proyek
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}