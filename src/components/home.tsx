import ReusableNavbar from "@/reusables/reusable-navbar"
import { Stack } from "@mui/material"
import { Button } from "@heroui/button"
import { MoreVertOutlined, SettingsOutlined } from '@mui/icons-material';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@heroui/dropdown";
import "../index.css"
import Members from "@/reusables/member";


const Home = () => {

    const handleTest = async () => {
        const res = await fetch("http://localhost:5000/api/sheets-data");
        const data = await res.json();
        console.log("Google Sheets data:", data);
    };

    return (
        <Stack direction={'column'} height={'100vh'} width={'100vw'}  overflow={'auto'}>
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
                                <DropdownItem key="settings" startContent={<SettingsOutlined />}>
                                    Settings
                                </DropdownItem>
                                <DropdownItem key="test" onClick={handleTest}>
                                    Test
                                </DropdownItem>
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