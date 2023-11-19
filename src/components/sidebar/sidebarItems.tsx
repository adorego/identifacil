'use client';

import {Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
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
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import styles from "../SideBar.module.css";
import {useGlobalContext} from "../../app/Context/store";


const titulo = "IDENTIFACIL";

export default function SidebarItems(){
    const {sidebarStatus, setSidebarStatus} = useGlobalContext();

    useEffect(()=>{
        setSidebarStatus(!sidebarStatus);
    },[])

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

    return(
        <Box>
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

                        <ListItemButton href='/acceso'>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Acceso al Penal" hidden={sidebarStatus}/>
                        </ListItemButton>
                    </List>
                </Collapse>


                <ListItemButton href={'/ppl'}>
                    <ListItemIcon>
                        <Mood/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión PPLs'}  hidden={sidebarStatus}/>
                </ListItemButton>

                <ListItemButton
                    className={pathname === '/movimientos' ? 'active' : ''}
                    href={'/movimientos'}>
                    <ListItemIcon>
                        <AirportShuttle/>
                    </ListItemIcon>
                    <ListItemText primary={'Movimientos'} hidden={sidebarStatus}/>
                </ListItemButton>

                {/* Menu de Reportes */}
                <ListItemButton
                    className={pathname === '/informes' ? 'active' : ''}
                    href={'/informes'}
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
                        <ManageAccounts/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión de Funcionarios'} hidden={sidebarStatus}/>
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
                <ListItemButton onClick={() => handleClick('sistema')}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Sistema'} hidden={sidebarStatus}/>
                    {openMenus.sistema ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.sistema} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                        <ListItemButton onClick={(e) => handleNavigation('/sistema/camaras')}>
                            <ListItemIcon>
                                <CameraIndoor/>
                            </ListItemIcon>
                            <ListItemText primary="Camaras" hidden={sidebarStatus}/>
                        </ListItemButton>

                        <ListItemButton onClick={(e) => handleNavigation('/sistema/roles')}>
                            <ListItemIcon>
                                <ManageAccounts/>
                            </ListItemIcon>
                            <ListItemText primary="Roles" hidden={sidebarStatus}/>
                        </ListItemButton>
                    </List>
                </Collapse>


            </List>
        </Box>
    )
}