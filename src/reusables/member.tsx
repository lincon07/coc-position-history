import { Stack, Typography } from "@mui/material"

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Divider } from "@heroui/divider"
import { Button } from "@heroui/button"
import { Image } from "@heroui/image"
import { Chip } from "@heroui/chip"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react"
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react"

const Members = () => {
    const memberModal = useDisclosure();
    const supabase = createClient('https://sermwxknthscfmbyvasf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcm13eGtudGhzY2ZtYnl2YXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTY4NzgsImV4cCI6MjA2MjI5Mjg3OH0.7cwZEy-35XEUUNOSCO3wIjFU6IMfuRtr6iM4TNJjBks')
    const [members, setMembers] = useState<any[]>([])
    const [selectedMember, setSelectedMember] = useState<any>(null)

    const handleOpenDetails = (member: any) => {
        memberModal.onOpen()
        setSelectedMember(member)
    }


    const handleFetchMembers = async () => {
        const { data, error } = await supabase
            .from('coc-members')
            .select('*')

        if (error) {
            console.error('Error fetching members:', error)
        } else {
            console.log('Members:', data)
            setMembers(data)
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
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channelB)
        }
    }, [])


    function convertDaysToYearsAndDays(totalDays: number): string {
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;

        const parts = [];
        if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
        if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);

        return parts.length > 0 ? parts.join(", ") : "0 days";
    }


    return (
        <Stack direction={'column'} width={'100%'} height={'100%'} spacing={3}>
            <Typography alignSelf={'center'} fontFamily={"josefin sans"} fontSize={30} fontWeight={600}>Communications Administration</Typography>
            <Stack style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 30 }}>
                {
                    members?.filter((member) => member?.currentRank?.community === "Administration")
                        .map((member, _index) => {
                            return (
                                <Card
                                    isPressable
                                    onPress={() => { handleOpenDetails(member) }}
                                    style={{
                                        minWidth: '15%',
                                        maxWidth: '20%',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(8px)',
                                        WebkitBackdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 60px rgba(0, 0, 0, 0.4)"}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.2)"}
                                >
                                    <CardHeader style={{ justifyContent: 'center' }}>
                                        <Typography fontFamily={"josefin sans"}>{member?.Name}</Typography>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-4" style={{ alignItems: 'center' }}>
                                        <Image
                                            alt="Card background"
                                            src={`https://cdn.discordapp.com/avatars/${member?.discordID}/${member?.profile}.png`}
                                            width={150}
                                            isZoomed
                                            isBlurred
                                            style={{ borderRadius: "50%" }}
                                        />
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <Stack direction={'row'} spacing={2}>
                                            <Chip size="sm" color="danger" variant="flat">{member?.currentRank?.rank}</Chip>
                                            <Chip size="sm" color="success" variant="flat">{convertDaysToYearsAndDays(Number(member?.TIR))}</Chip>
                                        </Stack>
                                    </CardFooter>
                                </Card>
                            )
                        })
                }

            </Stack>

            <Typography alignSelf={'center'} fontFamily={"josefin sans"} fontSize={30} fontWeight={600}>Communications Senior Staff</Typography>
            <Stack style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 30 }}>
                {
                    members?.filter((_member, index, self) =>
                        index === self.findIndex((m) => m.currentRank.community === "Senior Staff")
                    ).map((member, _index) => {
                        return (
                            <Card
                                isPressable
                                onPress={() => { handleOpenDetails(member) }}
                                style={{
                                    minWidth: '15%',
                                    maxWidth: '30%',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 60px rgba(0, 0, 0, 0.4)"}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.2)"}
                            >
                                <CardHeader style={{ justifyContent: 'center' }}>
                                    <Typography fontFamily={"josefin sans"}>{member?.Name}</Typography>
                                </CardHeader>
                                <CardBody className="overflow-visible py-4" style={{ alignItems: 'center' }}>
                                    <Image
                                        alt="Card background"
                                        src={`https://cdn.discordapp.com/avatars/${member?.discordID}/${member?.profile}.png`}
                                        width={150}
                                        isZoomed
                                        isBlurred
                                        style={{ borderRadius: "50%" }}
                                    />
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <Stack direction={'row'} spacing={2}>
                                        <Chip size="sm" color="danger" variant="flat">{member?.currentRank?.rank}</Chip>
                                        <Chip size="sm" color="success" variant="flat">{convertDaysToYearsAndDays(Number(member?.TIR))}</Chip>
                                    </Stack>
                                </CardFooter>
                            </Card>
                        )
                    })}

            </Stack>

            <Modal onClose={memberModal.onClose} isOpen={memberModal.isOpen} size="md" style={{ zIndex: 1000 }}>
                <ModalContent>
                    <ModalHeader>
                        <Stack>
                            <Typography fontFamily={"josefin sans"} fontSize={20}>Aaron W. C-100</Typography>
                        </Stack>
                    </ModalHeader>
                    <Divider />
                    <ModalBody>
                        <Stack spacing={3}>
                            <Stack alignItems="center" spacing={0.5}>

                                <Typography className="text-default-800 font-bold text-xl tracking-wide">
                                    {selectedMember?.Rank}
                                </Typography>
                                <Typography className="text-small text-default-500">
                                    C-100 • Website ID: 88548
                                </Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography className="text-sm text-default-600">Serve Time</Typography>
                                    <Typography className="text-sm text-default-800">Sep. 22, 2022 – Nov. 25, 2024</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography className="text-sm text-default-600">Time in Rank</Typography>
                                    <Typography className="text-sm text-success-500">1 year, 2 months</Typography>
                                </Stack>
                            </Stack>

                            <Divider />

                            <Stack spacing={1}>
                                <Typography className="text-xs text-default-600">Performance Tags</Typography>
                                <Stack style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                    <Chip size="sm" variant="flat" color="success">Top 5 Most Active</Chip>
                                    <Chip size="sm" variant="flat" color="warning">Longest Serving Director</Chip>
                                    <Chip size="sm" variant="flat" color="secondary">Top 5 Most Active</Chip>
                                    <Chip size="sm" variant="flat" color="primary">Leadership Board</Chip>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                        <ModalFooter>
                            <Button variant="flat" color="danger" onPress={memberModal.onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </ModalContent>

            </Modal>
        </Stack>
    )
}



export default Members