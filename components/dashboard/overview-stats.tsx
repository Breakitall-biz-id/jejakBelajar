import { StatCard } from '@/components/ui/stat-card'
import { Users, GraduationCap, BookOpen, School } from 'lucide-react'

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Sekolah"
        value="12"
        change={{ value: "20.5%", type: "increase" }}
        icon={School}
        iconColor="text-blue-600 bg-blue-50"
      />
      
      <StatCard
        title="Total Guru"
        value="248"
        change={{ value: "15.3%", type: "increase" }}
        icon={Users}
        iconColor="text-green-600 bg-green-50"
      />
      
      <StatCard
        title="Total Siswa"
        value="3,524"
        change={{ value: "8.7%", type: "increase" }}
        icon={GraduationCap}
        iconColor="text-purple-600 bg-purple-50"
      />
      
      <StatCard
        title="Proyek Aktif"
        value="89"
        change={{ value: "12.1%", type: "increase" }}
        icon={BookOpen}
        iconColor="text-orange-600 bg-orange-50"
      />
    </div>
  )
}