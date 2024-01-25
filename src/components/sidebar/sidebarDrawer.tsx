import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import styles from "@/components/sidebar.module.css";
import {Box, Collapse, Select, FormControl, Typography, InputLabel, MenuItem} from "@mui/material";
import SidebarItem from "@/components/sidebar/sidebarItem";
import {usePathname, useRouter} from "next/navigation";

import {
    AccountBalance,
    AirportShuttle, BarChart,
    ExpandLess,
    ExpandMore,
    FaceOutlined,
    Fingerprint, Hail, Key, ManageAccounts, Mood,
    People,
    PermIdentity, Settings
} from "@mui/icons-material";
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";

const drawerWidth = 279;

type OpenMenusKeys = 'registroAccesos' | 'sistema' | 'datosMovimientos' | 'movimientos' | 'datosPenales';

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

export default function SidebarDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
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
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [age, setAge] = React.useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <Drawer variant="permanent" open={open}>
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
            <Box sx={{p: '20px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Establecimiento penitenciario</InputLabel>
                    {open ? <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Establecimiento penitenciario"
                            onChange={handleChange}
                        >
                            {/*<MenuItem>Seleccionar establecimiento</MenuItem>*/}
                            <MenuItem value={1}>Minga Guazu</MenuItem>
                            {/*<MenuItem value={2}>Emboscada</MenuItem>*/}
                        </Select>
                    : ''
                    }

                </FormControl>
            </Box>

            <List aria-labelledby="nested-list-subheader" component="nav">


                {/*<ListItem disablePadding >
                        </ListItem>*/}

                {/* Menu de Dashboard */}
                <SidebarItem
                    icon={<AirportShuttle/>}
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
                                <PermIdentity/>
                            </ListItemIcon>
                            <ListItemText primary="Ingreso PPL" hidden={false}/>
                        </ListItemButton>

                        <ListItemButton onClick={(e) => handleNavigation('/acceso')}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Acceso al Penal" hidden={false}/>
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
                            isActive={pathname === '/causas'}
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
                        <SidebarItem
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
                {open ? <Typography variant='overline' display="block" align="left" pl='16px'>
                    Sistema
                </Typography> : ''

                }

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

                        <SidebarItem
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
                        />


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
        </Drawer>

    );
}
