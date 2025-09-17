"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function TeacherFeedbackPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Umpan Balik & Komentar</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Fitur ini akan menampilkan dan mengelola seluruh umpan balik tertulis guru untuk murid di kelas bimbingan Anda.</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">Silakan pilih murid dari daftar untuk melihat atau menulis umpan balik. Integrasi data penilaian dan komentar akan segera tersedia.</p>
                </CardContent>
            </Card>
        </div>
    )
}
