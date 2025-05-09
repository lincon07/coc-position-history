import ReusableNavbar from "@/reusables/reusable-navbar";
import { supabase } from "@/types";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, Divider } from "@heroui/react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const nav = useNavigate()
    // get if porcess.env.NODE_ENV is production or development
    const redirectTo = process.env.NODE_ENV === "production" ? "https://comms-coc-tracker.vercel.app/home" : "http://localhost:5173/home"
    const signInWithDiscord =  async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'discord',
          options: {
            redirectTo: 'http://localhost:5173/home',
          }
        })
      }

      const continueAsGuest = async () => {
        // delete data 
        localStorage.removeItem("sb-sermwxknthscfmbyvasf-auth-token")

        // redirect to home
        nav("/home")
      }
    return (
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={10} >
            <ReusableNavbar
                contents={[]}
            />
            <Stack direction={'column'} width={'100%'} spacing={5} padding={5} alignItems={'center'} justifyItems={'center'}>
                <Card
                    style={{
                        padding: '1rem',
                        borderRadius: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                        transition: 'box-shadow 0.3s ease-in-out',
                    }}
                >
                    <CardBody style={{ display: 'fled', flexDirection: 'column', gap: 20, margin: 20 }}>
                        <Typography variant="h5" color="white">
                            Welcome the <strong>Unoffical</strong> Communcations Chain of Command Tracker
                        </Typography>
                    </CardBody>
                    <Divider />
                    <CardFooter style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                        <Button variant="shadow" color="success" onPress={signInWithDiscord}>Login</Button>
                        <Button onPress={continueAsGuest}>Continue as guest</Button>
                    </CardFooter>
                </Card>
            </Stack>
            <Typography style={{ position: 'fixed', bottom: 10, textAlign: 'center', width: '100%', color: 'gray' }}>
                Created by Lincoln P. & Kaden V.
            </Typography>
        </Stack>
    )
}


export default Auth;