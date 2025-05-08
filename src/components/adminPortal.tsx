import useData from "@/hooks/useData"
import ReusableNavbar from "@/reusables/reusable-navbar"
import { Button, Chip, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react"
import { CheckCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Stack } from "@mui/material"


const AdminPortal = () => {
    const { members } = useData()

    const roleColors = {
        "Owner": "primary",
        "Editor": "warning",
        "Viewer": "secondary"
    }

    const rankColors = {
        "Administration": "danger",
        "Senior Staff": "secondary",
        "Staff": "warning",
        "SiT": "secondary"
    }

    const communityRanks = [
        "Administration",
        "Senior Staff",
        "Staff",
        "SiT"
    ]

    const ranks = [
        "Dispatch Director",
        "Dispatch Assistant Director",
        "Dispatch Assistant Director",
        "Dispatch Assistant Director",
        "Dispatch Manger II",
        "Dispatch Manger I",
        "Dispatch Supervisor III",
        "Dispatch Supervisor II",
        "Dispatch Supervisor I",
        "Senior Operator II",
        "Senior Operator I",
    ]

    const roles = [
        "Owner",
        "Editor",
        "Viewer"
    ]
    return (
        <Stack direction={'column'} spacing={5}>
            <ReusableNavbar contents={[]} />
            <Stack direction={'column'} padding={2} >
                <Table isHeaderSticky>
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn align="start">Dept. Rank</TableColumn>
                        <TableColumn>Community Rank</TableColumn>
                        <TableColumn>Role</TableColumn>
                        <TableColumn>Action(s)</TableColumn>
                    </TableHeader>
                    <TableBody items={members?.sort((a, b) => ranks.indexOf(a?.currentRank?.rank) - ranks.indexOf(b?.currentRank?.rank)) || undefined}>
                        {(member) => (
                            <TableRow>
                                <TableCell>
                                    <User
                                        name={member?.Name}
                                        description={member?.callsign}
                                        draggable={false}
                                        avatarProps={{
                                            src: member?.profile
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        label="Dept. Rank"
                                        fullWidth
                                        value={member?.currentRank?.rank}
                                        selectedKeys={[member?.currentRank?.rank]}
                                    >
                                        {ranks.map((rank) => (
                                            <SelectItem
                                                key={rank}
                                                color={rankColors[member?.currentRank?.community] as any}
                                                variant="flat"
                                                textValue={rank}
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
                                        label="Community Rank"
                                        value={member?.currentRank?.community}
                                        selectedKeys={[member?.currentRank?.community]}
                                        fullWidth
                                    >
                                        {communityRanks.map((rank) => (
                                            <SelectItem
                                                key={rank}
                                                variant="flat"
                                                textValue={rank}
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
                                        label="Role"
                                        value={member?.role}
                                        selectedKeys={[member?.role]}
                                        fullWidth
                                    >
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role}
                                                variant="flat"
                                                color={roleColors[role] as any}
                                                textValue={role}
                                            >
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} spacing={2}>
                                        <Button isIconOnly variant="shadow" color="success" isDisabled><CheckCircleOutline /></Button>
                                        <Button isIconOnly variant="shadow" color="danger" isDisabled><DeleteOutline /></Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Stack>
        </Stack>
    )
}

export default AdminPortal