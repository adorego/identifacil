import {Grid} from "@mui/material";
import {Inter} from "next/font/google";
import SideBar from "@/components/SideBar"
import StatusNav from "../../components/StatusNav";
import TopNav from "../../components/TopNav";

const inter = Inter({subsets: ['latin']})
export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Grid container spacing={0}>
                <Grid item md={2} sd={3} className={inter.className}>
                    <SideBar/>
                </Grid>
                <Grid item md={10} sd={9}>
                    <TopNav/>
                    <Grid container>
                        <Grid item padding={'20px'}>
                            <StatusNav/>
                        </Grid>
                    </Grid>
                    {children}
                </Grid>
            </Grid>

        </>

    )
}