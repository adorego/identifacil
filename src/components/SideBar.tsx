
import {Box, Typography} from "@mui/material";
import styles from "./sidebar.module.css";
import SidebarItems from "./sidebar/sidebarItems";



// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.

export default function SideBar() {


    return (
        <nav className={styles.sidebar}>

            <Box sx={{bgcolor: "#FFFFFF", textAlign: 'center', minHeight: '100vh'}}>


                <SidebarItems />

            </Box>
        </nav>

    )
}