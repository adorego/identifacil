'use client'

import * as React from "react";
import sidebar from './SideBar.module.css'
import MenuItem from "./interfaz/MenuItem";

import {
    AccountBalance,
    AirportShuttle,
    Analytics,
    BarChart,
    ExpandLess,
    ExpandMore,
    Fingerprint,
    Hail,
    Key,
    ManageAccounts,
    Mood,
    People,
    PermIdentity,
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

import {Inter} from "next/font/google";
import getConfig from "next/config";
import styles from "./SideBar.module.css";
import {useRouter} from "next/navigation";

const inter = Inter({
    subsets: ['latin'],
    weight: '400',


});

export default function SideBar() {
    const titulo = "IDENTIFACIL";
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const handleClick = () => {
        setOpen(!open);
    };

    const handleNavigation = (url: string) => {
        router.push(url);
    }
    return (
        <nav className={sidebar.sidebar}>

            <Box sx={{bgcolor: "#FFFFFF", textAlign: 'center', minHeight: '100vh'}}>
                <Typography variant="h6" className={styles.title} color={'#AAA'}>{titulo}</Typography>
                <hr className='titleSidebar'/>
                <List
                    aria-labelledby="nested-list-subheader"
                    component="nav">
                    {/* <ListItem disablePadding > */}

                    <MenuItem name={'Panel'} link={'/inicio'} children={<AirportShuttle sx={{ color:'#00A76F' }}/>}/>

                    {/* </ListItem> */}
                    {/* <ListItem disablePadding> */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <Fingerprint/>
                        </ListItemIcon>
                        <ListItemText primary={'Registro de Accesos'}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>
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

                    {/*<ListItemButton sx={{}} className={'active'} href={link}>
                        <ListItemIcon>
                            {children}
                        </ListItemIcon>
                        <ListItemText primary={name}/>
                    </ListItemButton>*/}

                    <ListItemButton sx={{}} href={'/ppl'}>
                        <ListItemIcon>
                            <Mood/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión PPLs'} />
                    </ListItemButton>

                    <ListItemButton sx={{}} href={'/movimientos'}>
                        <ListItemIcon>
                            <AirportShuttle/>
                        </ListItemIcon>
                        <ListItemText primary={'Movimientos'}/>
                    </ListItemButton>

                    <ListItemButton sx={{}} href={'/informes'}>
                        <ListItemIcon>
                            <BarChart/>
                        </ListItemIcon>
                        <ListItemText primary={'Reportes'}/>
                    </ListItemButton>

                    <ListItemButton sx={{}} disabled>
                        <ListItemIcon>
                            <Hail/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Visitas'}/>

                    </ListItemButton>

                    <ListItemButton sx={{}} disabled>
                        <ListItemIcon>
                            <ManageAccounts/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Funcionarios'}/>
                    </ListItemButton>

                    <ListItemButton sx={{}} disabled>
                        <ListItemIcon>
                            <AccountBalance/>
                        </ListItemIcon>
                        <ListItemText primary={'Defensoría'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}} disabled>
                        <ListItemIcon>
                            <Key/>
                        </ListItemIcon>
                        <ListItemText primary={'Autorizaciones'}/>
                    </ListItemButton>


                </List>
            </Box>
        </nav>

    )
}