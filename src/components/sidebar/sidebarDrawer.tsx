import * as React from 'react';

import {
    AccountBalance,
    AirportShuttle,
    BarChart,
    ExpandLess,
    ExpandMore,
    Fingerprint,
    Hail,
    Mood, Person,
    Settings
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "@/components/sidebar.module.css";
import {CSSObject, Theme, styled, useTheme} from '@mui/material/styles';
import {Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import {usePathname} from "next/navigation";
import {useState} from "react";
import SidebarItem from "@/components/sidebar/sidebarItem";
import SelectorEstablecimiento from "@/components/sidebar/SelectorEstablecimiento";
import {useGlobalContext} from "@/app/Context/store";
import UserNotification from "@/components/notiification/UserNotification";

const drawerWidth = 279;

type OpenMenusKeys = 'registroAccesos' | 'sistema' | 'datosMovimientos' | 'movimientos' | 'datosPenales' | 'visitantes' | 'gestionPPl' | 'gestionUsuarios';

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SidebarDrawer()
{
    const { selectedEstablecimiento, setSelectedEstablecimiento } = useGlobalContext();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openMenus, setOpenMenus] = useState<Record<OpenMenusKeys, boolean>>({
        registroAccesos: false,
        visitantes:false,
        sistema: false,
        datosMovimientos: false,
        movimientos: false,
        datosPenales: false,
        gestionPPl: false,
        gestionUsuarios: false,
    });

    const pathname = usePathname()

    const handleClick = (menu: OpenMenusKeys) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [menu]: !prevOpenMenus[menu]
        }));
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Drawer className='sidebarSippy' variant="permanent" open={open}>
            <DrawerHeader>
                <Box
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                    }}>
                    <Typography variant="h6" className={styles.title} color={'#AAA'} sx={{...(!open && {display: 'none'}),}}>
                        Sippy
                    </Typography>
                </Box>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 1,
                        /*...(open && { display: 'none' }),*/
                    }}
                >
                    <MenuIcon/>
                </IconButton>
            </DrawerHeader>

            <SelectorEstablecimiento open={open} />

            <List aria-labelledby="nested-list-subheader" component="nav">


                {/*<ListItem disablePadding >
                        </ListItem>*/}

                {/* Menu de Dashboard */}
                <SidebarItem
                    icon={<AirportShuttle/>}
                    label="Inicio"
                    path="/inicio"
                    isActive={pathname === '/inicio'}
                />


                {/* <ListItem disablePadding> */}
                <ListItemButton onClick={() => handleClick('registroAccesos')} className={openMenus.registroAccesos ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Fingerprint/>
                    </ListItemIcon>
                    <ListItemText primary={'Accesos PPL'} hidden={false}/>
                    {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Registro PPL"
                            path="/inicio/registro"
                            isActive={pathname === '/inicio/registro/ppl'}
                        />
                        
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Entrada/Salida PPL"
                            path="/acceso/entrada-salida-ppl"
                            isActive={pathname === '/acceso/entrada-salida-ppl'}
                        />
                        
                        
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleClick('visitantes')} className={openMenus.visitantes ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Hail/>
                    </ListItemIcon>
                    <ListItemText primary={'Visitante'} hidden={false}/>
                    {openMenus.visitantes ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.visitantes} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Registro Visitante"
                            path="/inicio/registro/visitante"
                            isActive={pathname === '/inicio/registro/visitante'}
                        />
                        
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Entrada/Salida Visitante"
                            path="/acceso/entrada-salida-visitante"
                            isActive={pathname === '/acceso/entrada-salida-visitante'}
                        />

                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Lista de visitas"
                            path="/acceso/lista-visitas"
                            isActive={pathname === '/acceso/lista-visitas'}
                        />
                        
                    </List>
                </Collapse>

                {/* Menu de PPL */}
                <SidebarItem
                    icon={<Mood/>}
                    label="PPL"
                    path="/ppl"
                    isActive={pathname === '/ppl'}
                />


                {/* ------------------------- Menu gestion ppl ------------------------- */}
                <ListItemButton onClick={() => handleClick('gestionPPl')} className={openMenus.gestionPPl ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary={'Gestion PPL'} hidden={false}/>
                    {openMenus.gestionPPl ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={openMenus.gestionPPl} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Mediadas de fuerza"
                            path="/gestion-ppl/medidas-de-fuerza"
                            isActive={pathname === '/gestion-ppl/medidas-de-fuerza'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Faltas y sanciones"
                            path="/gestion-ppl/faltas"
                            isActive={pathname === '/gestion-ppl/faltas'}
                        />

                    </List>
                </Collapse>

                {/*<SidebarItem
                            icon={<AirportShuttle />}
                            label="Movimientos"
                            path="/movimientos"
                            isActive={pathname === '/movimientos'}
                        />*/}

                {/* ------------------------- Menu Penales ------------------------- */}
                <ListItemButton onClick={() => handleClick('datosPenales')} className={openMenus.datosPenales ? 'active-button' : ''} >
                    <ListItemIcon>
                        <AccountBalance/>
                    </ListItemIcon>
                    <ListItemText primary={'Datos penales'} hidden={false}/>
                    {openMenus.datosPenales ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.datosPenales} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Expedientes"
                            path="/expedientes"
                            isActive={pathname === '/expedientes'}
                        />
                    </List>
                    {/*<List sx={{marginLeft: "20px"}} component="div" disablePadding>
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
                    </List>*/}
                </Collapse>

                {/* ------------------------- Menu Movimientos ------------------------- */}
                <ListItemButton onClick={() => handleClick('movimientos')} className={openMenus.movimientos ? 'active-button' : ''} >
                    <ListItemIcon>
                        <AirportShuttle/>
                    </ListItemIcon>
                    <ListItemText primary={'Movimientos'} hidden={false}/>
                    {openMenus.movimientos ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.movimientos} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Traslados"
                            path="/movimientos/traslados"
                            isActive={pathname === '/movimientos/traslados'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Salidas especiales"
                            path="/movimientos/salidasEspeciales"
                            isActive={pathname === '/movimientos/salidasEspeciales'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Salidas Transitorias"
                            path="/movimientos/salidasTransitorias"
                            isActive={pathname === '/movimientos/salidasTransitorias'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Movimiento interno"
                            path="/movimientos/movimiento-interno"
                            isActive={pathname === '/movimientos/movimiento-interno'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Bajas"
                            path="/movimientos/bajas"
                            isActive={pathname === '/movimientos/bajas'}
                        />

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
                {/* <ListItemButton disabled>
                    <ListItemIcon>
                        <Hail/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión de Visitas'} hidden={false}/>

                </ListItemButton> */}

{/*                <ListItemButton disabled>
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
                </ListItemButton>*/}

                {/* ------------------------- Menu de Sistema ------------------------- */}
                {open ? <Typography variant='overline' display="block" align="left" pl='16px'>
                    Sistema
                </Typography> : ''

                }

                {/*<ListItemButton onClick={() => handleClick('sistema')} className={openMenus.sistema ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Sistema'} hidden={false}/>
                    {openMenus.sistema ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.sistema} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Camaras"
                            path="/sistema/camaras"
                            isActive={pathname === '/sistema/camaras'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Roles"
                            path="/sistema/roles"
                            isActive={pathname === '/sistema/roles'}
                        />

                    </List>
                </Collapse>*/}

                {/* ------------------------- Menu de Sistema movimiento------------------------- */}

                <ListItemButton onClick={() => handleClick('datosMovimientos')} className={openMenus.datosMovimientos ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Datos de movimientos'} hidden={false}/>
                    {openMenus.datosMovimientos ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.datosMovimientos} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Medidas de seguridad"
                            path="/sistema/medidas-seguridad"
                            isActive={pathname === '/sistema/medidas-seguridad'}
                        />
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Motivos de traslados"
                            path="/sistema/motivos-traslados"
                            isActive={pathname === '/sistema/motivos-traslados'}
                        />

                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Personal"
                            path="/sistema/personal"
                            isActive={pathname === '/sistema/personal'}
                        />

                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Vehiculo"
                            path="/sistema/vehiculo"
                            isActive={pathname === '/sistema/vehiculo'}
                        />


                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleClick('gestionUsuarios')} className={openMenus.gestionUsuarios ? 'active-button' : ''} >
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestion de usuario'} hidden={false}/>
                    {openMenus.gestionUsuarios ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>

                <Collapse in={openMenus.gestionUsuarios} timeout="auto" unmountOnExit>
                    <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                        <SidebarItem
                            icon={<span className='subIcon'></span>}
                            label="Roles"
                            path="/sistema/roles"
                            isActive={pathname === '/sistema/roles'}
                        />

                    </List>
                </Collapse>

                {/* <ListItemButton disabled>
                    <ListItemIcon>
                        <ManageAccounts/>
                    </ListItemIcon>
                    <ListItemText primary={'Gestión de Funcionarios'} hidden={false}/>
                </ListItemButton> */}

            </List>
        </Drawer>

    );
}
