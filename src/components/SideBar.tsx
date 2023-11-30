'use client';

import * as React from "react";

import { AccountBalance,  AirportShuttle,  BarChart,  CameraIndoor,  ExpandLess,  ExpandMore,  FaceOutlined,
    Fingerprint,  Hail,  Key,  ManageAccounts,  Mood,  People,  PermIdentity,  Settings } from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from 'next/link'

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarItems from "./sidebar/sidebarItem";
import styles from "./sidebar.module.css";
import {useGlobalContext} from "@/app/Context/store";
import SidebarItem from "./sidebar/sidebarItem";


const titulo : string = "IDENTIFACIL";
type OpenMenusKeys = 'registroAccesos' | 'sistema' | 'datosMovimientos';



// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.
export default function SideBar() {

    const [openMenus, setOpenMenus] = useState<Record<OpenMenusKeys, boolean>>({
        registroAccesos: false,
        sistema: false,
        datosMovimientos: false,
    });

    const router = useRouter();
    const pathname = usePathname()

    const handleClick = (menu: OpenMenusKeys) => {
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


                        {/*<ListItem disablePadding >
                        </ListItem>*/}

                        {/* Menu de Dashboard */}
                        <SidebarItem
                            icon={<AirportShuttle />}
                            label="Dashboard"
                            path="/inicio"
                            isActive={pathname === '/inicio'}
                        />


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

                        {/* Menu de PPL */}
                        <SidebarItem
                            icon={<Mood/>}
                            label="PPL"
                            path="/ppl"
                            isActive={pathname === '/ppl'}
                        />

                        {/* Menu de Movimientos */}
                        <SidebarItem
                            icon={<AirportShuttle />}
                            label="Movimientos"
                            path="/movimientos"
                            isActive={pathname === '/movimientos'}
                        />


                        {/* Menu de Reportes */}
                        <SidebarItem
                            icon={<BarChart/>}
                            label="Informes"
                            path="/informes"
                            isActive={pathname === '/informes'}
                        />

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
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Camaras"
                                    path="/sistema/camaras"
                                    isActive={pathname === '/sistema/camaras'}
                                />
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Roles"
                                    path="/sistema/roles"
                                    isActive={pathname === '/sistema/roles'}
                                />

                            </List>
                        </Collapse>

                        {/* ------------------------- Menu de Sistema movimiento------------------------- */}

                        <ListItemButton onClick={() => handleClick('datosMovimientos')}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary={'Datos de movimientos'} hidden={sidebarStatus}/>
                            {openMenus.datosMovimientos ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openMenus.datosMovimientos} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Medidas de seguridad"
                                    path="/sistema/medidas-seguridad"
                                    isActive={pathname === '/sistema/medidas-seguridad'}
                                />
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Motivos de traslados"
                                    path="/sistema/motivos-traslados"
                                    isActive={pathname === '/sistema/motivos-traslados'}
                                />

                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Personal"
                                    path="/sistema/personal"
                                    isActive={pathname === '/sistema/personal'}
                                />

                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Vehiculo"
                                    path="sistema/vehiculo"
                                    isActive={pathname === '/sistema/vehiculo'}
                                />


                            </List>
                        </Collapse>

                        {/* ------------------------- Fin de movimientos ------------------------- */}

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