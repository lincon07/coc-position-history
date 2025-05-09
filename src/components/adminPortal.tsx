import useData from "@/hooks/useData"
import ReusableNavbar from "@/reusables/reusable-navbar"
import { supabase } from "@/types"
import { Button, Card, CardBody, CardHeader, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, User } from "@heroui/react"
import { AddOutlined, CheckCircleOutline, DeleteOutline, HomeOutlined } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import "../index.css"
import { open } from "fs"
import { useNavigate } from "react-router-dom"

const AdminPortal = () => {
    const { members, tableLoading } = useData()
    const newMember = useDisclosure()
    const nav = useNavigate()

    const [updates, setUpdates] = useState<{ [discordID: number]: any }>({})
    const [mewMemberName, setNewMemberName] = useState<string>("")
    const [newMemberCallsign, setNewMemberCallsign] = useState<string>("")
    const [newMemberRank, setNewMemberRank] = useState<string>("")
    const [newMemberCommunity, setNewMemberCommunity] = useState<string>("")
    const [newMemberRole, setNewMemberRole] = useState<string>("")
    const [mewMemberProfile, setNewMemberProfile] = useState<string>("")


    const roleColors = {
        Owner: "primary",
        Editor: "warning",
        Viewer: "secondary",
    }
    const rankColors = {
        Administration: "danger",
        "Senior Staff": "secondary",
        Staff: "warning",
        SiT: "secondary",
    }

    const communityRanks = ["Administration", "Senior Staff", "Staff", "SiT"]

    const ranks = [
        "Dispatch Director",
        "Dispatch Deputy Director",
        "Dispatch Assistant Director",
        "Dispatch Manager II",
        "Dispatch Manager I",
        "Dispatch Supervisor III",
        "Dispatch Supervisor II",
        "Dispatch Supervisor I",
        "Senior Operator II",
        "Senior Operator I",
    ]

    const roles = ["Owner", "Editor", "Viewer"]

    const handleChange = (id: number, field: string, value: string) => {
        setUpdates((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }))
    }

    const handleUpdateMember = async (id: string) => {
        const { data, error } = await supabase
            .from('coc-members')
            .update({ role: "Viewer" })
            .eq('discordID', id)
            .select()


        if (error) {
            console.error("❌ Error updating:", error.message)
        } else {
            console.log("✅ Updated successfully")
            setUpdates({}) // Clear all updates after saving one
        }
    }

    const handleCreateMember = async () => {
        if (!mewMemberName || !newMemberCallsign || !newMemberRank || !newMemberCommunity || !newMemberRole) {
            console.error("❌ Error: All fields are required")
            return
        }
        const payload = {
            Name: mewMemberName,
            callsign: newMemberCallsign,
            currentRank: {
                rank: newMemberRank,
                community: newMemberCommunity,
            },
            profile: mewMemberProfile,
            role: newMemberRole,
        }

        const { data, error } = await supabase
            .from('coc-members')
            .insert(payload)
            .select()

        if (data) {
            console.log("✅ Member created successfully:", data)
            newMember.onClose()
            setNewMemberName("")
            setNewMemberCallsign("")
            setNewMemberRank("")
            setNewMemberCommunity("")
            setNewMemberRole("")
        };
        if (error) {
            console.error("❌ Error creating member:", error.message)
        }
    }
    return (
        <Stack direction="column" height={'100vh'}>
            <ReusableNavbar contents={[
                <Button
                    isIconOnly
                    size="lg"
                    variant="flat"
                    onPress={() => nav("/home")}
                    >
                    <HomeOutlined  />
                    </Button>
                    
            ]} />
            <Stack direction="column" padding={5} spacing={4} overflow={'auto'} height={'100%'} width={'100%'} justifyContent={'center'}>
                <Card
                    style={{
                        backdropFilter: 'blur(50px)',
                        WebkitBackdropFilter: 'blur(50px)',
                        background: 'rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                    }}
                    className="rounded-lg overflow-hidden"
                >
                    <CardHeader className="px-6 py-4">
                        <Stack direction="row" spacing={2} alignItems="center" width={"100%"}>
                            <Typography variant="h5" className="text-white" flexGrow={1}>
                                Chain of Command
                            </Typography>
                            <Button
                                size="sm"
                                variant="solid"
                                // classname for frosted glass
                                className="bg-white/10 backdrop-blur-md text-white"
                                startContent={<AddOutlined />}
                                onPress={newMember.onOpen}
                            >
                                Create Member
                            </Button>
                        </Stack>
                    </CardHeader>

                    <Divider className="border-white/20" />

                    <CardBody className="p-0 overflow-auto">
                        {/* wrap in an extra div so the scrollbar sits on the frosted bg too */}
                        <div className="p-4 bg-transparent backdrop-blur-md">
                            <Table
                                isCompact
                                classNames={{
                                    wrapper: `
            rounded-lg
            bg-transparent
            backdrop-blur-sm
            p-0
            border border-white/10
          `,
                                    thead: `
            bg-transparent
          `,
                                    th: `
            text-white uppercase tracking-wide text-sm
            bg-transparent
            border-b border-white/20
            py-2
          `,
                                    tr: `
            bg-transparent
            even:bg-transparent
            hover:bg-white/10
            transition-colors
          `,
                                    td: `
            bg-transparent
            text-gray-200
            py-3
          `,
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>Name</TableColumn>
                                    <TableColumn>Dept. Rank</TableColumn>
                                    <TableColumn>Community Rank</TableColumn>
                                    <TableColumn>Role</TableColumn>
                                    <TableColumn>Action(s)</TableColumn>
                                </TableHeader>

                                <TableBody
                                    isLoading={tableLoading}
                                    loadingContent={<Spinner size="lg" />}
                                    items={
                                        members?.sort(
                                            (a, b) =>
                                                ranks.indexOf(a?.currentRank?.rank) -
                                                ranks.indexOf(b?.currentRank?.rank)
                                        ) || []
                                    }
                                >
                                    {(member) => (
                                        <TableRow key={member.discordID}>
                                            <TableCell>
                                                <User
                                                    name={member.Name}
                                                    description={member.callsign}
                                                    avatarProps={{ src: member.profile }}
                                                    draggable={false}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Select
                                                    size="sm"
                                                    variant="underlined"
                                                    fullWidth
                                                    selectedKeys={[
                                                        updates[member.discordID]?.rank ||
                                                        member.currentRank.rank,
                                                    ]}
                                                    onSelectionChange={(value) =>
                                                        handleChange(
                                                            member.discordID,
                                                            'rank',
                                                            value as string
                                                        )
                                                    }
                                                >
                                                    {ranks.map((rank) => (
                                                        <SelectItem key={rank}>{rank}</SelectItem>
                                                    ))}
                                                </Select>
                                            </TableCell>

                                            <TableCell>
                                                <Select
                                                    size="sm"
                                                    variant="underlined"
                                                    fullWidth
                                                    selectedKeys={[
                                                        updates[member.discordID]?.community ||
                                                        member.currentRank.community,
                                                    ]}
                                                    onSelectionChange={(value) =>
                                                        handleChange(
                                                            member.discordID,
                                                            'community',
                                                            value as string
                                                        )
                                                    }
                                                >
                                                    {communityRanks.map((rank) => (
                                                        <SelectItem key={rank}>{rank}</SelectItem>
                                                    ))}
                                                </Select>
                                            </TableCell>

                                            <TableCell>
                                                <Select
                                                    size="sm"
                                                    variant="underlined"
                                                    fullWidth
                                                    selectedKeys={[
                                                        updates[member.discordID]?.role || member.role,
                                                    ]}
                                                    onSelectionChange={(value) =>
                                                        handleChange(
                                                            member.discordID,
                                                            'role',
                                                            value.anchorKey
                                                        )
                                                    }
                                                >
                                                    {roles.map((role) => (
                                                        <SelectItem key={role}>{role}</SelectItem>
                                                    ))}
                                                </Select>
                                            </TableCell>

                                            <TableCell>
                                                <Stack direction="row" spacing={2}>
                                                    <Button
                                                        isIconOnly
                                                        variant="shadow"
                                                        color="success"
                                                        size="sm"
                                                        onPress={() =>
                                                            handleUpdateMember(member.discordID)
                                                        }
                                                    >
                                                        <CheckCircleOutline />
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        variant="shadow"
                                                        color="danger"
                                                        size="sm"
                                                        isDisabled
                                                    >
                                                        <DeleteOutline />
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>

            </Stack>

            <Modal isOpen={newMember.isOpen} onClose={newMember.onClose} size="md" style={{ zIndex: 1000 }}>
                <ModalContent>
                    <ModalHeader>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography>Create Member</Typography>
                        </Stack>
                    </ModalHeader>
                    <Divider />
                    <ModalBody>
                        <Stack direction="column" spacing={2}>
                            <Input
                                label={"Name"}
                                placeholder="Enter the member's name"
                                onChange={(e) => setNewMemberName(e.target.value)}
                            />

                            <Input
                                label={"Callsign"}
                                placeholder="Enter the member's Callsign"
                                onChange={(e) => setNewMemberCallsign(e.target.value)}
                            />

                            <Input
                                label={"Profile URL"}
                                placeholder="Enter the member's Profile"
                                description={
                                    <Button variant="light" size="sm" color="primary" onPress={() => window.open("https://discordlookup.com/user", "_blank")}>
                                        Get Profile URL
                                    </Button>
                                }
                                onChange={(e) => setNewMemberProfile(e.target.value)}
                            />

                            <Select
                                size="sm"
                                variant="flat"
                                fullWidth
                                label="Dept. Rank"
                                placeholder="Select the member's department rank"
                                value={newMemberRank}
                                onSelectionChange={(value) => setNewMemberRank(value.anchorKey as string)}
                            >
                                {ranks.map((rank) => (
                                    <SelectItem
                                        key={rank}
                                        textValue={rank}
                                    >
                                        {rank}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                size="sm"
                                variant="flat"
                                fullWidth
                                label="Community Rank"
                                placeholder="Select the member's community rank"
                                value={newMemberCommunity}
                                onSelectionChange={(value) => setNewMemberCommunity(value.anchorKey as string)}
                            >
                                {communityRanks.map((rank) => (
                                    <SelectItem key={rank} textValue={rank}>{rank}</SelectItem>
                                ))}
                            </Select>

                            <Select
                                size="sm"
                                variant="flat"
                                fullWidth
                                label="Role"
                                placeholder="Select the member's role"
                                value={newMemberRole}
                                onSelectionChange={(value) => setNewMemberRole(value.anchorKey as string)}
                            >
                                {roles.map((role) => (
                                    <SelectItem key={role} textValue={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </Select>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction="row" spacing={2}>
                            <Button variant="light" color="danger" onPress={() => { }}>
                                Cancel
                            </Button>
                            <Button variant="solid" color="primary" onPress={handleCreateMember}>
                                Create Member
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    )
}

export default AdminPortal