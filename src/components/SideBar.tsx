'use client';

import * as React from "react";

import {
    AccountBalance,
    AirportShuttle,
    BarChart,
    CameraIndoor,
    ExpandLess,
    ExpandMore,
    FaceOutlined,
    Fingerprint,
    Hail,
    Key,
    ManageAccounts,
    Mood,
    People,
    PermIdentity,
    Settings
} from "@mui/icons-material";
import {Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarItems from "./sidebar/sidebarItems";
import styles from "./sidebar.module.css";
import {useGlobalContext} from "../app/Context/store";

// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.

const titulo = "IDENTIFACIL";

export default function SideBar() {



    const [openMenus, setOpenMenus] = useState({
        registroAccesos: false,
        sistema: false,
        // Puedes agregar más menús aquí en el futuro
    });
    const router = useRouter();
    const pathname = usePathname()

    const handleClick = (menu) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [menu]: !prevOpenMenus[menu]
        }));
    };

    const handleNavigation = (url: string) => {
        router.push(url);
    }


    const { sidebarStatus, setSidebarStatus} = useGlobalContext();

    const handleSidebar = () =>{
        setSidebarStatus(!sidebarStatus);
    }

    return (
        <nav className={`${styles.sidebar} ${sidebarStatus? 'sidebarOpen' : 'sidebarClosed'}`}>

            <Box sx={{bgcolor: "#FFFFFF", textAlign: 'center', minHeight: '100vh'}}>


                <Box>
                    <Box sx={{
                        height:'64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid #E2E8F0',
                        m: '0 20px',

                    }}>

                        <Stack  spacing={1} direction='row' alignItems='center' justifyContent='space-between' width='100%'>

                            <Typography variant="h6" className={styles.title} color={'#AAA'} >
                                {titulo}
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{mr: 2}}
                                onClick={handleSidebar}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Stack>
                    </Box>
                    <List aria-labelledby="nested-list-subheader" component="nav">


                        {/*<ListItem disablePadding >*/}
                        <ListItemButton
                            className={pathname === '/inicio' ? 'active' : ''}
                            onClick={(e) => handleNavigation('/inicio')}
                        >
                            <ListItemIcon>
                                <AirportShuttle />
                            </ListItemIcon>
                            <ListItemText primary={'Panel'} hidden={sidebarStatus}/>
                        </ListItemButton>
                        {/*</ListItem>*/}


                        {/* <ListItem disablePadding> */}
                        <ListItemButton onClick={() => handleClick('registroAccesos')}>
                            <ListItemIcon>
                                <Fingerprint/>
                            </ListItemIcon>
                            <ListItemText primary={'Registro de Accesos'} hidden={sidebarStatus}/>
                            {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <ListItemButton onClick={(e) => handleNavigation('/inicio/registro/ppl')}>
                                    <ListItemIcon>

                                        <PermIdentity/>
                                    </ListItemIcon>
                                    <ListItemText primary="Ingreso PPL" hidden={sidebarStatus}/>
                                </ListItemButton>

                                <ListItemButton onClick={(e) => handleNavigation('/acceso')}>
                                    <ListItemIcon>
                                        <People/>
                                    </ListItemIcon>
                                    <ListItemText primary="Acceso al Penal" hidden={sidebarStatus}/>
                                </ListItemButton>
                                <ListItemButton onClick={(e) => handleNavigation('/identificacion')}>
                                    <ListItemIcon>
                                        <FaceOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary="Identificación" hidden={sidebarStatus}/>
                                </ListItemButton>
                            </List>
                        </Collapse>


                        <ListItemButton
                            className={pathname === '/ppl' ? 'active' : ''}
                            onClick={(e) => handleNavigation('/ppl')}>
                            <ListItemIcon>
                                <Mood/>
                            </ListItemIcon>
                            <ListItemText primary={'Gestión PPLs'}  hidden={sidebarStatus}/>
                        </ListItemButton>

                        <ListItemButton
                            className={pathname === '/movimientos' ? 'active' : ''}
                            onClick={(e) => handleNavigation('/movimientos')}>
                            <ListItemIcon>
                                <AirportShuttle/>
                            </ListItemIcon>
                            <ListItemText primary={'Movimientos'} hidden={sidebarStatus}/>
                        </ListItemButton>

                        {/* Menu de Reportes */}
                        <ListItemButton
                            className={pathname === '/informes' ? 'active' : ''}
                            onClick={(e) => handleNavigation('/informes')}
                        >
                            <ListItemIcon>
                                <BarChart  />
                            </ListItemIcon>
                            <ListItemText primary={'Reportes'} hidden={sidebarStatus}/>
                        </ListItemButton>



                        {/* Menu de Bloqueados */}
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <Hail/>
                            </ListItemIcon>
                            <ListItemText primary={'Gestión de Visitas'} hidden={sidebarStatus}/>

                        </ListItemButton>



                        <ListItemButton disabled>
                            <ListItemIcon>
                                <AccountBalance/>
                            </ListItemIcon>
                            <ListItemText primary={'Defensoría'} hidden={sidebarStatus}/>
                        </ListItemButton>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <Key/>
                            </ListItemIcon>
                            <ListItemText primary={'Autorizaciones'} hidden={sidebarStatus}/>
                        </ListItemButton>


                        {/* ------------------------- Menu de Sistema ------------------------- */}
                        <Typography variant='overline' display="block" align="left" pl='16px'>
                            Sistema
                        </Typography>
                        <ListItemButton onClick={() => handleClick('sistema')}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary={'Sistema'} hidden={sidebarStatus}/>
                            {openMenus.sistema ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openMenus.sistema} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                                <ListItemButton
                                    className={pathname === '/sistema/camaras' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('/sistema/camaras')}>
                                    <ListItemIcon>
                                        <CameraIndoor/>
                                    </ListItemIcon>
                                    <ListItemText primary="Camaras" hidden={sidebarStatus}/>
                                </ListItemButton>

                                <ListItemButton
                                    className={pathname === '/sistema/roles' ? 'active' : ''}
                                    onClick={(e) => handleNavigation('/sistema/roles')}>
                                    <ListItemIcon>
                                        <ManageAccounts/>
                                    </ListItemIcon>
                                    <ListItemText primary="Roles" hidden={sidebarStatus}/>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <ManageAccounts/>
                            </ListItemIcon>
                            <ListItemText primary={'Gestión de Funcionarios'} hidden={sidebarStatus}/>
                        </ListItemButton>

                    </List>
                </Box>

            </Box>
        </nav>

    )
}