'use client'

import * as React from "react";

import { AccountBalance, AirportShuttle, Analytics, BarChart, ExpandLess, ExpandMore, Fingerprint, Hail, Key, ManageAccounts, Mood, People, PermIdentity, StarBorder } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";

import { Inter } from "next/font/google";
import getConfig from "next/config";
import styles from "./SideBar.module.css";
import { useRouter } from "next/navigation";

const inter = Inter({ 
  subsets: ['latin'],
  weight:'400',
  

});

export default function SideBar(){
  const titulo = "IDENTIFACIL";
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };

  const handleNavigation = (url:string) =>{
    router.push(url);
  }
  return(
      <nav className={inter.className}>
      
      <Box sx={{bgcolor:"#E2E8F0", textAlign:'center', minHeight:'100vh'}} >
        <Typography variant="h3" className={styles.title}>{titulo}</Typography>
        <List
        aria-labelledby="nested-list-subheader"
        component="nav">
          {/* <ListItem disablePadding > */}
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <Analytics  />
              </ListItemIcon>
              <ListItemText primary={'Panel'} />
            </ListItemButton>
                
          {/* </ListItem> */}
          {/* <ListItem disablePadding> */}
            <ListItemButton onClick={handleClick} >
              <ListItemIcon>
                <Fingerprint  />
              </ListItemIcon>
              <ListItemText primary={'Registro de Accesos'}  />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{marginLeft:"20px"}} component="div" disablePadding>
                <ListItemButton onClick={(e) => handleNavigation('/main/registro/ppl')} >
                  <ListItemIcon>
                    <PermIdentity />
                  </ListItemIcon>
                  <ListItemText primary="Acceso PPL" />
                </ListItemButton>
                <ListItemButton >
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="Acceso Visitante" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <Mood  />
              </ListItemIcon>
              <ListItemText primary={'Gestión PPLs'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <Hail />
              </ListItemIcon>
              <ListItemText primary={'Gestión de Visitas'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <AirportShuttle  />
              </ListItemIcon>
              <ListItemText primary={'Traslados'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <BarChart  />
              </ListItemIcon>
              <ListItemText primary={'Reportes'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <ManageAccounts  />
              </ListItemIcon>
              <ListItemText primary={'Gestión de Funcionarios'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <AccountBalance  />
              </ListItemIcon>
              <ListItemText primary={'Defensoría'} />
            </ListItemButton>
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <Key  />
              </ListItemIcon>
              <ListItemText primary={'Autorizaciones'} />
            </ListItemButton>
          {/* </ListItem> */}
        </List>
        </Box> 
      </nav>
    
  )
}