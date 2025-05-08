

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const ReusableNavbar = (props: { contents: React.ReactNode[] }) => {
    const location = useLocation()
    const [pageName, SetPageName] = useState<string | null>(null)

    useEffect(() => {
        const path = location.pathname.split("/").pop()
        if (path) {
            SetPageName(path.charAt(0).toUpperCase() + path.slice(1))
        } else {
            SetPageName("Home")
        }
    }, [location.pathname])

    return (
        <Navbar maxWidth="full" isBordered style={{ backgroundColor: 'transparent', height: 90}}>
            <Stack direction={'row'} alignItems={'center'} width={'100%'} padding={2}>
                <Stack direction={'row'} alignItems={'center'} flexGrow={1} spacing={2}>
                    <img src="./comms.png" width={60} />
                    <Stack direction="column">
                        <Typography
                            textAlign="center"
                            color="white"
                            fontSize={20}
                            fontFamily="'Hamilton', cursive"
                        >
                            Chain of Command
                        </Typography>
                        <Typography
                            textAlign="center"
                            color="white"
                            fontFamily="'Hamilton', cursive"
                            fontSize={20}
                        >
                            Tracker
                        </Typography>
                    </Stack>

                </Stack>
                {props.contents}
            </Stack>
        </Navbar>)
}


export default ReusableNavbar;