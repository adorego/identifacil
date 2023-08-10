import { Grid } from "@mui/material";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar"
import StatusNav from "../../components/StatusNav";
import TopNav from "../../components/TopNav";

const inter = Inter({ subsets: ['latin'] })
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item sm={2} className={inter.className}>
          <SideBar />
        </Grid>
        <Grid item sm={10}>
          <TopNav />
          <StatusNav />
          {children}
        </Grid>
      </Grid>
      
    </>
    
  )
}