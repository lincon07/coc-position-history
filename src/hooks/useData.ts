import { supabase } from "@/types"
import { useEffect, useState } from "react"
import useAuth from "./useAuth"


const useData = () => {
    const [members, setMembers] = useState<any[]>([])
    const [tableLoading, setTableLoading] = useState<boolean>(true)
    const { handleFetchCurrentMember } = useAuth()

    const handleFetchMembers = async () => {
        const { data, error } = await supabase
            .from('coc-members')
            .select('*')

        if (error) {
            console.error('Error fetching members:', error)
        } else {
            console.log('Members:', data)
            setMembers(data)
            setTableLoading(false)
        }
    }
    useEffect(() => {
        handleFetchMembers()
    }, [])

    useEffect(() => {
        const channelB = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'coc-members' },
                (payload) => {
                    console.log('Change received!', payload)
                    handleFetchMembers()
                    handleFetchCurrentMember()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channelB)
        }
    }, [])

    return {
        members,
        tableLoading,
    }
}

export default useData;