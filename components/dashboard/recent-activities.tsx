import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const activities = [
  {
    id: 1,
    user: 'Bu Sari Wijaya',
    action: 'menambahkan proyek baru',
    project: 'Lingkungan Sehat',
    time: '2 jam lalu',
    status: 'new'
  },
  {
    id: 2,
    user: 'Pak Ahmad Hidayat',
    action: 'menyelesaikan penilaian',
    project: 'Teknologi Ramah Lingkungan',
    time: '4 jam lalu',
    status: 'completed'
  },
  {
    id: 3,
    user: 'Bu Maya Indira',
    action: 'mengunggah rubrik penilaian',
    project: 'Budaya Lokal',
    time: '6 jam lalu',
    status: 'updated'
  },
  {
    id: 4,
    user: 'Pak Budi Santoso',
    action: 'membuat kelas baru',
    project: 'XII IPA 3',
    time: '1 hari lalu',
    status: 'new'
  },
  {
    id: 5,
    user: 'Bu Lestari',
    action: 'mengedit kriteria penilaian',
    project: 'Ekonomi Kreatif',
    time: '1 hari lalu',
    status: 'updated'
  }
]

const statusColors = {
  new: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  updated: 'bg-orange-100 text-orange-800'
}

const statusLabels = {
  new: 'Baru',
  completed: 'Selesai',
  updated: 'Update'
}

export function RecentActivities() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Lihat Semua
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {activity.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-600">
                  {activity.action} <span className="font-medium">{activity.project}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <Badge className={statusColors[activity.status as keyof typeof statusColors]}>
                {statusLabels[activity.status as keyof typeof statusLabels]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}