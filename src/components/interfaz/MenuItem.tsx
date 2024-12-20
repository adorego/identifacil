import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import * as React from "react";

export default function MenuItem({name="", link="", children=""}) {

    return (
        <ListItemButton sx={{}} className={'active'} href={link}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItemButton>

        /*
        *                     <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <Mood/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión PPLs'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <Hail/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Visitas'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <AirportShuttle/>
                        </ListItemIcon>
                        <ListItemText primary={'traslados'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <BarChart/>
                        </ListItemIcon>
                        <ListItemText primary={'Reportes'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <ManageAccounts/>
                        </ListItemIcon>
                        <ListItemText primary={'Gestión de Funcionarios'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <AccountBalance/>
                        </ListItemIcon>
                        <ListItemText primary={'Defensoría'}/>
                    </ListItemButton>
                    <ListItemButton sx={{}}>
                        <ListItemIcon>
                            <Key/>
                        </ListItemIcon>
                        <ListItemText primary={'Autorizaciones'}/>
                    </ListItemButton>*/
    );
}