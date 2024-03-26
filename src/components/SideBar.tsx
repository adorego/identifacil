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
    Group,
    Hail,
    HowToReg,
    Key,
    ManageAccounts,
    Mood,
    People,
    PermIdentity,
    PersonAdd,
    Settings,
    TransferWithinAStation
} from "@mui/icons-material";
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
import {usePathname, useRouter} from "next/navigation";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarItem from "./sidebar/sidebarItem";
import styles from "./sidebar.module.css";
import {useGlobalContext} from "@/app/Context/store";
import {useState} from "react";

const titulo : string = "SiPPy";
type OpenMenusKeys = 'registroAccesos' | 'sistema' | 'datosMovimientos' | 'movimientos' | 'datosPenales';


// TODO: Cuando se entra en una pagina interna se debe seguir marcando la pagina principal.
export default function SideBar() {

    const [openMenus, setOpenMenus] = useState<Record<OpenMenusKeys, boolean>>({
        registroAccesos: false,
        sistema: false,
        datosMovimientos: false,
        movimientos: false,
        datosPenales: false,
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
        /*<nav className={`${styles.sidebar} ${sidebarStatus? 'sidebarOpen' : 'sidebarClosed'}`}>*/
        <nav className={`${styles.sidebar} sidebarOpen`}>

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
                            <ListItemText primary={'Registro de Accesos'} hidden={false}/>
                            {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                                <ListItemButton onClick={(e) => handleNavigation('/inicio/registro/ppl')}>
                                    <ListItemIcon>
                                        <HowToReg/>
                                    </ListItemIcon>
                                    <ListItemText primary="Registro PPL" hidden={false}/>
                                </ListItemButton>

                                <ListItemButton onClick={(e) => handleNavigation('/inicio/registro/visitante')}>
                                    <ListItemIcon>
                                        <PersonAdd/>
                                    </ListItemIcon>
                                    <ListItemText primary="Registro Visitante" hidden={false}/>
                                </ListItemButton>

                                <ListItemButton onClick={(e) => handleNavigation('/acceso/entrada-salida-ppl')}>
                                    <ListItemIcon>
                                        <TransferWithinAStation/>
                                    </ListItemIcon>
                                    <ListItemText primary="Entrada/Salida PPL" hidden={false}/>
                                </ListItemButton>
                                <ListItemButton onClick={(e) => handleNavigation('/acceso/entrada-salida-visitante')}>
                                    <ListItemIcon>
                                        <Group/>
                                    </ListItemIcon>
                                    <ListItemText primary="Entrada/Salida Visitante" hidden={false}/>
                                </ListItemButton>
                                <ListItemButton onClick={(e) => handleNavigation('/identificacion')}>
                                    <ListItemIcon>
                                        <FaceOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary="Identificación" hidden={false}/>
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
                        {/*<SidebarItem
                            icon={<AirportShuttle />}
                            label="Movimientos"
                            path="/movimientos"
                            isActive={pathname === '/movimientos'}
                        />*/}

                       {/* ------------------------- Menu Penales ------------------------- */}
                       <ListItemButton onClick={() => handleClick('datosPenales')}>
                            <ListItemIcon>
                                <AccountBalance/>
                            </ListItemIcon>
                            <ListItemText primary={'Datos penales'} hidden={false}/>
                            {openMenus.datosPenales ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
 
                        <Collapse in={openMenus.datosPenales} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Causas"
                                    path="/causas"
                                    isActive={pathname === '/expedientes'}
                                />
                            </List>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Audiencias"
                                    path="/audiencias"
                                    isActive={pathname === '/audiencias'}
                                />
                            </List>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Libertades"
                                    path="/libertades"
                                    isActive={pathname === '/libertades'}
                                />
                            </List>
                        </Collapse>

                        {/* ------------------------- Menu Movimientos ------------------------- */}
                        <ListItemButton onClick={() => handleClick('movimientos')}>
                            <ListItemIcon>
                                <AirportShuttle/>
                            </ListItemIcon>
                            <ListItemText primary={'Movimientos'} hidden={false}/>
                            {openMenus.movimientos ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openMenus.movimientos} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Traslados"
                                    path="/movimientos/traslados"
                                    isActive={pathname === '/movimientos/traslados'}
                                />
                                {/*<SidebarItem
                                    icon={<Settings/>}
                                    label="Salidas especiales"
                                    path="/movimientos/salidasEspeciales"
                                    isActive={pathname === '/movimientos/salidasEspeciales'}
                                />
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Salidas Transitorias"
                                    path="/movimientos/salidasTransitorias"
                                    isActive={pathname === '/movimientos/salidasTransitorias'}
                                />
                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Bajas"
                                    path="/movimientos/bajas"
                                    isActive={pathname === '/movimientos/bajas'}
                                />
*/}
                            </List>
                        </Collapse>

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
                            <ListItemText primary={'Gestión de Visitas'} hidden={false}/>

                        </ListItemButton>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <AccountBalance/>
                            </ListItemIcon>
                            <ListItemText primary={'Defensoría'} hidden={false}/>
                        </ListItemButton>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <Key/>
                            </ListItemIcon>
                            <ListItemText primary={'Autorizaciones'} hidden={false}/>
                        </ListItemButton>

                        {/* ------------------------- Menu de Sistema ------------------------- */}
                        <Typography variant='overline' display="block" align="left" pl='16px'>
                            Sistema
                        </Typography>
                        <ListItemButton onClick={() => handleClick('sistema')}>
                            <ListItemIcon>
                                <Settings/>
                            </ListItemIcon>
                            <ListItemText primary={'Sistema'} hidden={false}/>
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
                            <ListItemText primary={'Datos de movimientos'} hidden={false}/>
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

                                {/*<SidebarItem
                                    icon={<Settings/>}
                                    label="Personal"
                                    path="/sistema/personal"
                                    isActive={pathname === '/sistema/personal'}
                                />

                                <SidebarItem
                                    icon={<Settings/>}
                                    label="Vehiculo"
                                    path="/sistema/vehiculo"
                                    isActive={pathname === '/sistema/vehiculo'}
                                />*/}


                            </List>
                        </Collapse>

                        {/* ------------------------- Fin de movimientos ------------------------- */}

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <ManageAccounts/>
                            </ListItemIcon>
                            <ListItemText primary={'Gestión de Funcionarios'} hidden={false}/>
                        </ListItemButton>

                    </List>
                </Box>

            </Box>
        </nav>

    )
}