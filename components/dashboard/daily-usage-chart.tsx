'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { createClient } from '@/lib/supabase'

export default function DailyUsageChart() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient()
            // Ambil data login harian dari tabel users_logins
            const { data: logins, error } = await supabase
                .from('users_logins')
                .select('login_at')
            if (error) return setLoading(false)
            // Group by date
            const grouped: Record<string, number> = {}
            logins?.forEach((row: any) => {
                const date = row.login_at?.slice(0, 10)
                if (date) grouped[date] = (grouped[date] || 0) + 1
            })
            // Convert to array for chart
            const chartData = Object.entries(grouped).map(([date, count]) => ({ date, count }))
            chartData.sort((a, b) => a.date.localeCompare(b.date))
            setData(chartData)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Card className="shadow-sm border-gray-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Statistik Penggunaan Harian</CardTitle>
                <CardDescription className="text-gray-600">
                    Grafik login harian pengguna
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center text-gray-400">Memuat data...</div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}
