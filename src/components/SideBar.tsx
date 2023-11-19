
import sidebar from './SideBar.module.css'
import {Box, Typography} from "@mui/material";
import styles from "./SideBar.module.css";
import SidebarItems from "./sidebar/sidebarItems";



// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.

export default function SideBar() {

    return (
        <nav className={sidebar.sidebar}>

            <Box sx={{bgcolor: "#FFFFFF", textAlign: 'center', minHeight: '100vh'}}>


                <SidebarItems />

            </Box>
        </nav>

    )
}