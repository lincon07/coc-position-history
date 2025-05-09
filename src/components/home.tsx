import ReusableNavbar from "@/reusables/reusable-navbar"
import { Stack } from "@mui/material"
import { Button } from "@heroui/button"
import { AdminPanelSettings, AdminPanelSettingsOutlined, MoreVertOutlined, SettingsOutlined } from '@mui/icons-material';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@heroui/dropdown";
import "../index.css"
import Members from "@/reusables/member";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavbar } from "@heroui/navbar";
import { useNavigate } from "react-router-dom";
import useData from "@/hooks/useData";
import Confetti from 'react-confetti'


const Home = () => {
    const { currentMember, handleFetchCurrentMember } = useAuth()
    const nav = useNavigate()

    const roles = ["Viewer", "Editor", "Owner"]
    useEffect(() => {
        handleFetchCurrentMember
    }, [])
    return (
        <Stack direction={'column'} height={'100vh'} width={'100vw'} overflow={'auto'}>
            <ReusableNavbar
                contents={[
                    <Stack direction={'row'} spacing={2}>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" style={{ color: 'white' }} variant="light" aria-label="Actions">
                                    <MoreVertOutlined />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Static Actions"
                            >
                                <DropdownItem key="settings" startContent={<AdminPanelSettingsOutlined fontSize="inherit" />}>
                                    Settings
                                </DropdownItem>
                                {(currentMember?.role === "Editor" || currentMember?.role === "Owner") && (
                                    <DropdownItem color="danger" key="admin-portal" startContent={<AdminPanelSettingsOutlined fontSize="inherit" />} onPress={() => { nav("/admin-portal") }}>
                                        Administrative Portal
                                    </DropdownItem>
                                )}
                            </DropdownMenu>


                        </Dropdown>

                    </Stack>
                ]}
            />
            <Stack direction={'column'} padding={5}>
                <Members />
            </Stack>
        </Stack>
    )
}


export default Home