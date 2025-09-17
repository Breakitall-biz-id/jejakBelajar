import * as React from 'react'
import { createClient } from '@/lib/supabase'

export function TeacherNameById({ teacherId }: { teacherId: string }) {
    const [name, setName] = React.useState('')
    React.useEffect(() => {
        if (!teacherId) return setName('')
        const fetchName = async () => {
            const supabase = createClient()
            const { data } = await supabase.from('teachers').select('name').eq('id', teacherId).single()
            setName(data?.name || '')
        }
        fetchName()
    }, [teacherId])
    return <span>{name || '-'}</span>
}