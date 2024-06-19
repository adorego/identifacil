import * as React from 'react';

import {
    AccountBalance,
    AirportShuttle,
    BarChart,
    ExpandLess,
    ExpandMore,
    Fingerprint,
    Hail, ManageAccounts,
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
import AuthStatus from "@/components/authStatus";
import PermissionValidator from "@/components/authComponents/permissionValidator";
import {useSession} from "next-auth/react";

const drawerWidth = 279;

type OpenMenusKeys = 'registroAccesos' | 'sistema' | 'datosMovimientos' | 'movimientos' | 'datosPenales' | 'visitantes' | 'gestionPPl' | 'gestionUsuarios' | 'medidasDeFuerza';

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
        medidasDeFuerza: false,
    });
    const { data: session } : {data:any; } = useSession();
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
                {PermissionValidator('ver_accesos_ppl', session) &&
                (<>
                    <ListItemButton onClick={() => handleClick('registroAccesos')} className={openMenus.registroAccesos ? 'active-button' : ''} >
                        <ListItemIcon>
                            <Fingerprint/>
                        </ListItemIcon>
                        <ListItemText primary={'Accesos PPL'} hidden={false}/>
                        {openMenus.registroAccesos ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                </>)}
                    <Collapse in={openMenus.registroAccesos} timeout="auto" unmountOnExit>
                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                            {PermissionValidator('registrar_ppl', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Registro PPL"
                                path="/inicio/registro/ppl"
                                isActive={pathname === '/inicio/registro/ppl'}
                            />
                            }

                            {PermissionValidator('entrada_salida_ppl', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Entrada/Salida PPL"
                                path="/acceso/entrada-salida-ppl"
                                isActive={pathname === '/acceso/entrada-salida-ppl'}
                            />}


                        </List>
                    </Collapse>


                {/* Menu visitante */}
                {PermissionValidator('ver_visitante', session) &&
                <>
                    <ListItemButton onClick={() => handleClick('visitantes')} className={openMenus.visitantes ? 'active-button' : ''} >
                        <ListItemIcon>
                            <Hail/>
                        </ListItemIcon>
                        <ListItemText primary={'Visitante'} hidden={false}/>
                        {openMenus.visitantes ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                </>}
                    <Collapse in={openMenus.visitantes} timeout="auto" unmountOnExit>
                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>

                            {PermissionValidator('registro_visitante', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Registro Visitante"
                                path="/inicio/registro/visitante"
                                isActive={pathname === '/inicio/registro/visitante'}
                            />
                            }

                            {PermissionValidator('entrada_salida_visitante', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Entrada/Salida Visitante"
                                path="/acceso/entrada-salida-visitante"
                                isActive={pathname === '/acceso/entrada-salida-visitante'}
                            />
                            }

                            {PermissionValidator('lista_visitas', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Lista de visitas"
                                path="/acceso/lista-visitas"
                                isActive={pathname === '/acceso/lista-visitas'}
                            />
                            }

                        </List>
                    </Collapse>


                {/* Menu de PPL */}
                {PermissionValidator('ver_ppl', session) &&
                    <SidebarItem
                        icon={<Mood/>}
                        label="PPL"
                        path="/ppl"
                        isActive={pathname === '/ppl'}
                    />
                }

                {/* ------------------------- Menu gestion ppl ------------------------- */}
                {PermissionValidator('ver_gestion_pl', session) &&
                 (<>
                     <ListItemButton onClick={() => handleClick('gestionPPl')} className={openMenus.gestionPPl ? 'active-button' : ''} >
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary={'Gestion PPL'} hidden={false}/>
                        {openMenus.gestionPPl ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                     </>
                 )}
                    <Collapse in={openMenus.gestionPPl} timeout="auto" unmountOnExit>
                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                            {PermissionValidator('ver_medidas_de_fuerza', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Medidas de fuerza"
                                path="/gestion-ppl/medidas-de-fuerza"
                                isActive={pathname === '/gestion-ppl/medidas-de-fuerza'}
                            />
                            }
                            {PermissionValidator('ver_faltas_y_sanciones', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Faltas y sanciones"
                                path="/gestion-ppl/faltas"
                                isActive={pathname === '/gestion-ppl/faltas'}
                            />
                            }
                        </List>
                    </Collapse>



                {/*<SidebarItem
                            icon={<AirportShuttle />}
                            label="Movimientos"
                            path="/movimientos"
                            isActive={pathname === '/movimientos'}
                        />*/}

                {/* ------------------------- Menu Penales ------------------------- */}
                {PermissionValidator('ver_datos_penales', session) &&
                    <>
                        <ListItemButton onClick={() => handleClick('datosPenales')} className={openMenus.datosPenales ? 'active-button' : ''} >
                            <ListItemIcon>
                                <AccountBalance/>
                            </ListItemIcon>
                            <ListItemText primary={'Datos penales'} hidden={false}/>
                            {openMenus.datosPenales ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                    </>
                }
                        <Collapse in={openMenus.datosPenales} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                {PermissionValidator('ver_expedientes', session) &&
                                <SidebarItem
                                    icon={<span className='subIcon'></span>}
                                    label="Expedientes"
                                    path="/expedientes"
                                    isActive={pathname === '/expedientes'}
                                />
                                }
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
                {PermissionValidator('ver_movimientos', session) &&
                    <>
                        <ListItemButton onClick={() => handleClick('movimientos')} className={openMenus.movimientos ? 'active-button' : ''} >
                            <ListItemIcon>
                                <AirportShuttle/>
                            </ListItemIcon>
                            <ListItemText primary={'Movimientos'} hidden={false}/>
                            {openMenus.movimientos ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                    </>}
                        <Collapse in={openMenus.movimientos} timeout="auto" unmountOnExit>
                            <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                                {PermissionValidator('ver_traslados', session) &&
                                <SidebarItem
                                    icon={<span className='subIcon'></span>}
                                    label="Traslados"
                                    path="/movimientos/traslados"
                                    isActive={pathname === '/movimientos/traslados'}
                                />
                                }
                                {/*<SidebarItem
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
                                />*/}

                            </List>
                        </Collapse>

                        {/* Menu de Reportes */}
                        {PermissionValidator('ver_informes', session) &&
                            <SidebarItem
                                icon={<BarChart/>}
                                label="Informes"
                                path="/informes"
                                isActive={pathname === '/informes'}
                            />
                        }


                {/* ------------------------- Menu de Sistema ------------------------- */}
                {PermissionValidator('ver_menu_sistemas', session) &&
                    (open ? <Typography variant='overline' display="block" align="left" pl='16px'>
                        Sistema
                    </Typography> : '')
                }


                {/* ------------------------- Menu de Sistema movimiento------------------------- */}

                {PermissionValidator('ver_datos_movimientos', session) &&
                <>
                    <ListItemButton onClick={() => handleClick('datosMovimientos')} className={openMenus.datosMovimientos ? 'active-button' : ''} >
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary={'Datos de movimientos'} hidden={false}/>
                        {openMenus.datosMovimientos ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                </>}
                    <Collapse in={openMenus.datosMovimientos} timeout="auto" unmountOnExit>

                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                            {PermissionValidator('ver_medidas_de_seguridad', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Medidas de seguridad"
                                path="/sistema/medidas-seguridad"
                                isActive={pathname === '/sistema/medidas-seguridad'}
                            />
                            }

                            {PermissionValidator('ver_motivos_de_traslados', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Motivos de traslados"
                                path="/sistema/motivos-traslados"
                                isActive={pathname === '/sistema/motivos-traslados'}
                            />
                            }

                            {PermissionValidator('ver_custodios', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Custodios"
                                path="/sistema/personal"
                                isActive={pathname === '/sistema/personal'}
                            />
                            }

                            {PermissionValidator('ver_vehiculo', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Vehiculo"
                                path="/sistema/vehiculo"
                                isActive={pathname === '/sistema/vehiculo'}
                            />
                            }

                            {PermissionValidator('ver_choferes', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Choferes"
                                path="/sistema/choferes"
                                isActive={pathname === '/sistema/choferes'}
                            />
                            }


                        </List>
                    </Collapse>



                {/* ------------------------- Menu de Sistema de medidas de fuerza ------------------------- */}
                {PermissionValidator('ver_datos_medidas_de_fuerza', session) &&
                <>
                    <ListItemButton onClick={() => handleClick('medidasDeFuerza')} className={openMenus.medidasDeFuerza ? 'active-button' : ''} >
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary={'Medidas de fuerza'} hidden={false}/>
                        {openMenus.medidasDeFuerza ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                </>
                }
                    <Collapse in={openMenus.medidasDeFuerza} timeout="auto" unmountOnExit>

                        <List sx={{marginLeft: "20px"}} component="div" disablePadding>
                            {PermissionValidator('ver_tipo_de_medidas_de_fuerza', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Tipos medidas de fuerza"
                                path="/sistema/tipos-medidas-de-fuerza"
                                isActive={pathname === '/sistema/tipos-medidas-de-fuerza'}
                            />
                            }
                            {PermissionValidator('ver_motivos_de_medida_de_fuerza', session) &&
                            <SidebarItem
                                icon={<span className='subIcon'></span>}
                                label="Motivos"
                                path="/sistema/motivos-de-medida-de-fuerza"
                                isActive={pathname === '/sistema/motivos-de-medida-de-fuerza'}
                            />
                            }
                        </List>
                    </Collapse>



                {/* ------------------------- Menu de Sistema de Gestion de usuarios ------------------------- */}

                {PermissionValidator('ver_datos_gestion_usuarios', session) &&
                <SidebarItem
                    icon={<ManageAccounts/>}
                    label="Gestion de usuarios"
                    path="/sistema/gestion-de-usuarios"
                    isActive={pathname === '/sistema/gestion-de-usuarios'}
                />
                }


            </List>

        </Drawer>

    );
}
