import useData from "@/hooks/useData"
import ReusableNavbar from "@/reusables/reusable-navbar"
import { supabase } from "@/types"
import { Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import { CheckCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { useState } from "react"
import "../index.css"

const AdminPortal = () => {
    const { members } = useData()
    const [updates, setUpdates] = useState<{ [discordID: number]: any }>({})

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
        "Dispatch Assistant Director",
        "Dispatch Manger II",
        "Dispatch Manger I",
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
            .update({ role: "Editor" })
            .eq('discordID', id)
            .select()


        if (error) {
            console.error("❌ Error updating:", error.message)
        } else {
            console.log("✅ Updated successfully")
            setUpdates({}) // Clear all updates after saving one
        }
    }

    return (
        <Stack direction="column" spacing={5}>
            <ReusableNavbar contents={[]} />
            <Stack direction="column" padding={2} spacing={4}>
                <Table isHeaderSticky>
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn align="start">Dept. Rank</TableColumn>
                        <TableColumn>Community Rank</TableColumn>
                        <TableColumn>Role</TableColumn>
                        <TableColumn>Action(s)</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={
                            members?.sort(
                                (a, b) => ranks.indexOf(a?.currentRank?.rank) - ranks.indexOf(b?.currentRank?.rank)
                            ) || []
                        }
                    >
                        {(member) => (
                                <TableRow key={member.discordID}>
                                    <TableCell>
                                        <User
                                            name={member?.Name}
                                            description={member?.callsign}
                                            avatarProps={{ src: member?.profile }}
                                            draggable={false}
                                        />
                                    </TableCell>

                                    <TableCell align="left">
                                        <Select
                                            size="sm"
                                            variant="flat"
                                            fullWidth
                                            label="Dept. Rank"
                                            selectedKeys={[updates[member.discordID]?.rank || member.currentRank?.rank]}
                                            onSelectionChange={(value) =>
                                                handleChange(member.discordID, "rank", value as string)
                                            }
                                        >
                                            {ranks.map((rank) => (
                                                <SelectItem
                                                    key={rank}
                                                    color={rankColors[member?.currentRank?.community] as any}
                                                >
                                                    {rank}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </TableCell>

                                    <TableCell>
                                        <Select
                                            size="sm"
                                            variant="flat"
                                            fullWidth
                                            label="Community Rank"
                                            selectedKeys={[updates[member.discordID]?.community || member.currentRank?.community]}
                                            onSelectionChange={(value) =>
                                                handleChange(member.discordID, "community", value as string)
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
                                            variant="flat"
                                            fullWidth
                                            label="Role"
                                            selectedKeys={
                                                [updates[member.discordID]?.role || member.role] ? [updates[member.discordID]?.role || member.role] :
                                                    [member.role]
                                            }
                                            onSelectionChange={(value) => {
                                                handleChange(member.discordID, "role", value.anchorKey);
                                                console.log("Selected value:", value.anchorKey);
                                            }}
                                        >
                                            {roles.map((role) => (
                                                <SelectItem key={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                isIconOnly
                                                variant="shadow"
                                                color="success"
                                                onPress={() => handleUpdateMember(member.discordID)}
                                            >
                                                <CheckCircleOutline />
                                            </Button>
                                            <Button isIconOnly variant="shadow" color="danger" isDisabled>
                                                <DeleteOutline />
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Button variant="solid" color="primary">Create Member</Button>
            </Stack>
        </Stack>
    )
}

export default AdminPortal