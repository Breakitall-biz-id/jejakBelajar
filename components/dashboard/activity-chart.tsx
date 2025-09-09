'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', active: 12000, completed: 8400 },
  { month: 'Feb', active: 19000, completed: 12000 },
  { month: 'Mar', active: 15000, completed: 9800 },
  { month: 'Apr', active: 17800, completed: 11200 },
  { month: 'Mei', active: 22000, completed: 14800 },
  { month: 'Jun', active: 25400, completed: 18600 },
  { month: 'Jul', active: 18200, completed: 12400 },
  { month: 'Agt', active: 21000, completed: 15800 },
  { month: 'Sep', active: 28000, completed: 19200 },
  { month: 'Okt', active: 24500, completed: 17100 },
  { month: 'Nov', active: 19800, completed: 13400 },
  { month: 'Des', active: 26200, completed: 18900 }
]

export function ActivityChart() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Top courses over time</CardTitle>
            <CardDescription className="text-gray-600">
              Analisis aktivitas proyek bulanan
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              Last Month
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="month" 
              className="text-gray-600"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-gray-600"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="active" 
              fill="#6366f1" 
              name="Proyek Aktif"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="completed" 
              fill="#06b6d4" 
              name="Proyek Selesai"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}