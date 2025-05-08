import { supabase } from "@/types"
import { useEffect, useState } from "react"


const useAuth = () => {
    const [currentMember, setCurrentMember] = useState<any | null>(null)
    const member = localStorage.getItem("sb-sermwxknthscfmbyvasf-auth-token")

    const handleFetchCurrentMember = async () => {
        const parsedMember = member ? JSON.parse(member) : null
        const discordID = parsedMember?.user?.user_metadata?.provider_id

        console.log("paresed member", parsedMember)
        console.log("discordID", discordID)
        const { data, error } = await supabase
            .from('coc-members')
            .select('*')
            .eq('discordID', discordID)
            .single()

        if (error) {
            console.error('Error fetching current member:', error)
        } else {
            console.log('Current member:', data)
            setCurrentMember(data)
        }
    }


    useEffect(() => {
        const channelB = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'coc-members' },
                () => {
                    handleFetchCurrentMember()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channelB)
        }
    }, [])


    useEffect(() => {
        handleFetchCurrentMember()
    }, [member])

    return {
        currentMember,
        handleFetchCurrentMember
    }
}

export default useAuth;