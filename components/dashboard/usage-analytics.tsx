'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Self Assessment', value: 35, color: '#3b82f6' },
  { name: 'Peer Assessment', value: 25, color: '#10b981' },
  { name: 'Observasi Guru', value: 20, color: '#f59e0b' },
  { name: 'Jurnal Refleksi', value: 15, color: '#ef4444' },
  { name: 'Catatan Harian', value: 5, color: '#8b5cf6' }
]

export function UsageAnalytics() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Most Popular Courses</CardTitle>
            <CardDescription className="text-gray-600">
              Distribusi penggunaan fitur assessment
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              This Year
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Persentase']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
              formatter={(value) => <span className="text-gray-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}