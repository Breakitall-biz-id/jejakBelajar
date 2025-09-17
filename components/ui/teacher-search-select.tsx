import * as React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { createClient } from '@/lib/supabase'

export interface TeacherSearchSelectProps {
    value: string | null
    onChange: (teacherId: string) => void
    placeholder?: string
}

export function TeacherSearchSelect({ value, onChange, placeholder }: TeacherSearchSelectProps) {
    const [teachers, setTeachers] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true)
            const supabase = createClient()
            const { data, error } = await supabase.from('teachers').select('id, name')
            if (!error && data) setTeachers(data)
            setLoading(false)
        }
        fetchTeachers()
    }, [])

    return (
        <Select value={value || ''} onValueChange={tid => onChange(tid)}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder || 'Pilih wali kelas'} />
            </SelectTrigger>
            <SelectContent>
                {teachers.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
