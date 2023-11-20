'use client';

import {Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {
    AccountBalance,
    AirportShuttle,
    BarChart, CameraIndoor,
    ExpandLess,
    ExpandMore,
    Fingerprint, Hail, Key, ManageAccounts,
    Mood,
    People,
    PermIdentity, Settings
} from "@mui/icons-material";
import { useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import styles from "../sidebar.module.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";


const titulo = "IDENTIFACIL";


export default function SidebarItems(){





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

    const [toggleSidebar, setToggleSidebar] =  useState(false);

    const handleSidebar = () =>{
        setToggleSidebar(!toggleSidebar);
    }
    return(
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
                    href={'/inicio'}>
                    <ListItemIcon>
                        <AirportShuttle />
                    </ListItemIcon>
                    <ListItemText primary={'Panel'} hidden={toggleSidebar}/>
                </ListItemButton>
                {/*</ListItem>*/}


                {/* <ListItem disablePadding> */}
                <ListItemButton onClick={() => handleClick('registroAccesos')}>
                    <ListItemIcon>
                        <Fingerprint/>
                    </ListItemIcon>
                    <ListItemText primary={'Registro de Accesos'} hidden={toggleSidebar}/>
                    {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <ListItemButton onClick={(e) => handleNavigation('/inicio/registro/ppl')}>
                            <ListItemIcon>

                                <PermIdentity/>
                            </ListItemIcon>
                            <ListItemText primary="Ingreso PPL" hidden={toggleSidebar}/>
                        </ListItemButton>

                        <ListItemButton href='/acceso'>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Acceso al Penal" hidden={toggleSidebar}/>
                        </ListItemButton>
                    </List>
                </Collapse>


                <ListItemButton href={'/ppl'}>
                    <ListItemIcon>
                        <Mood/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión PPLs'}  hidden={toggleSidebar}/>
                </ListItemButton>

                <ListItemButton
                    className={pathname === '/movimientos' ? 'active' : ''}
                    href={'/movimientos'}>
                    <ListItemIcon>
                        <AirportShuttle/>
                    </ListItemIcon>
                    <ListItemText primary={'Movimientos'} hidden={toggleSidebar}/>
                </ListItemButton>

                {/* Menu de Reportes */}
                <ListItemButton
                    className={pathname === '/informes' ? 'active' : ''}
                    href={'/informes'}
                >
                    <ListItemIcon>
                        <BarChart  />
                    </ListItemIcon>
                    <ListItemText primary={'Reportes'} hidden={toggleSidebar}/>
                </ListItemButton>



                {/* Menu de Bloqueados */}
                <ListItemButton disabled>
                    <ListItemIcon>
                        <Hail/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión de Visitas'} hidden={toggleSidebar}/>

                </ListItemButton>



                <ListItemButton disabled>
                    <ListItemIcon>
                        <AccountBalance/>
                    </ListItemIcon>
                    <ListItemText primary={'Defensoría'} hidden={toggleSidebar}/>
                </ListItemButton>

                <ListItemButton disabled>
                    <ListItemIcon>
                        <Key/>
                    </ListItemIcon>
                    <ListItemText primary={'Autorizaciones'} hidden={toggleSidebar}/>
                </ListItemButton>


                {/* ------------------------- Menu de Sistema ------------------------- */}
                <Typography variant='overline' display="block" align="left" pl='16px'>
                    Sistema
                </Typography>
                <ListItemButton onClick={() => handleClick('sistema')}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Sistema'} hidden={toggleSidebar}/>
                    {openMenus.sistema ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.sistema} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                        <ListItemButton onClick={(e) => handleNavigation('/sistema/camaras')}>
                            <ListItemIcon>
                                <CameraIndoor/>
                            </ListItemIcon>
                            <ListItemText primary="Camaras" hidden={toggleSidebar}/>
                        </ListItemButton>

                        <ListItemButton onClick={(e) => handleNavigation('/sistema/roles')}>
                            <ListItemIcon>
                                <ManageAccounts/>
                            </ListItemIcon>
                            <ListItemText primary="Roles" hidden={toggleSidebar}/>
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton disabled>
                    <ListItemIcon>
                        <ManageAccounts/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión de Funcionarios'} hidden={toggleSidebar}/>
                </ListItemButton>

            </List>
        </Box>
    )
}