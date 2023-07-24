import { Grid } from "@mui/material";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar"
import StatusNav from "@/components/StatusNav";
import TopNav from "@/components/TopNav";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ['latin'] })
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item sm={4} className={inter.className}>
          <SideBar />
        </Grid>
        <Grid item sm={8}>
          <TopNav />
          <StatusNav />
          {children}
        </Grid>
      </Grid>
      
    </>
    
  )
}