'use client'

import * as React from "react";
import sidebar from './SideBar.module.css'
import MenuItem from "./interfaz/MenuItem";

import {
    AccountBalance,
    AirportShuttle,
    Analytics,
    BarChart, CameraIndoor, Circle,
    ExpandLess,
    ExpandMore,
    Fingerprint,
    Hail,
    Key,
    ManageAccounts,
    Mood,
    People,
    PermIdentity, Settings,
    StarBorder
} from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, SvgIcon,
    Typography
} from "@mui/material";


import getConfig from "next/config";
import styles from "./SideBar.module.css";
import {usePathname , useRouter} from "next/navigation";



// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.

export default function SideBar() {

    const titulo = "IDENTIFACIL";
    const [openMenus, setOpenMenus] = React.useState({
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
    return (
        <nav className={sidebar.sidebar}>

            <Box sx={{bgcolor: "#FFFFFF", textAlign: 'center', minHeight: '100vh'}}>
                <Typography variant="h6" className={styles.title} color={'#AAA'}>{titulo}</Typography>
                <hr className='titleSidebar'/>
                <List aria-labelledby="nested-list-subheader" component="nav">


                     {/*<ListItem disablePadding >*/}
                        <ListItemButton
                                        className={pathname === '/inicio' ? 'active' : ''}
                                        href={'/inicio'}>
                            <ListItemIcon>
                                <AirportShuttle />
                            </ListItemIcon>
                            <ListItemText primary={'Panel'}/>
                        </ListItemButton>
                     {/*</ListItem>*/}


                    {/* <ListItem disablePadding> */}
                    <ListItemButton onClick={() => handleClick('registroAccesos')}>
                        <ListItemIcon>
                            <Fingerprint/>
                        </ListItemIcon>
                        <ListItemText primary={'Registro de Accesos'}/>
                        {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                            <ListItemButton onClick={(e) => handleNavigation('/inicio/registro/ppl')}>
                                <ListItemIcon>

                                    <PermIdentity/>
                                </ListItemIcon>
                                <ListItemText primary="Acceso PPL"/>
                            </ListItemButton>
                            <ListItemButton disabled>
                                <ListItemIcon>
                                    <People/>
                                </ListItemIcon>
                                <ListItemText primary="Acceso Visitante"/>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton href={'/ppl'}>
                        <ListItemIcon>
                            <Mood/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión PPLs'} />
                    </ListItemButton>

                    <ListItemButton
                        className={pathname === '/movimientos' ? 'active' : ''}
                        href={'/movimientos'}>
                        <ListItemIcon>
                            <AirportShuttle/>
                        </ListItemIcon>
                        <ListItemText primary={'Movimientos'}/>
                    </ListItemButton>

                    {/* Menu de Reportes */}
                    <ListItemButton
                        className={pathname === '/informes' ? 'active' : ''}
                        href={'/informes'}
                    >
                        <ListItemIcon>
                            <BarChart  />
                        </ListItemIcon>
                        <ListItemText primary={'Reportes'}/>
                    </ListItemButton>



                    {/* Menu de Bloqueados */}
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <Hail/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Visitas'}/>

                    </ListItemButton>

                    <ListItemButton disabled>
                        <ListItemIcon>
                            <ManageAccounts/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Funcionarios'}/>
                    </ListItemButton>

                    <ListItemButton disabled>
                        <ListItemIcon>
                            <AccountBalance/>
                        </ListItemIcon>
                        <ListItemText primary={'Defensoría'}/>
                    </ListItemButton>

                    <ListItemButton disabled>
                        <ListItemIcon>
                            <Key/>
                        </ListItemIcon>
                        <ListItemText primary={'Autorizaciones'}/>
                    </ListItemButton>


                    {/* ------------------------- Menu de Sistema ------------------------- */}
                    <ListItemButton onClick={() => handleClick('sistema')}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary={'Sistema'}/>
                        {openMenus.sistema ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openMenus.sistema} timeout="auto" unmountOnExit>
                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                            <ListItemButton onClick={(e) => handleNavigation('/sistema/camaras')}>
                                <ListItemIcon>
                                    <CameraIndoor/>
                                </ListItemIcon>
                                <ListItemText primary="Camaras"/>
                            </ListItemButton>

                            <ListItemButton onClick={(e) => handleNavigation('/sistema/roles')}>
                                <ListItemIcon>
                                    <ManageAccounts/>
                                </ListItemIcon>
                                <ListItemText primary="Roles"/>
                            </ListItemButton>
                        </List>
                    </Collapse>


                </List>
            </Box>
        </nav>

    )
}