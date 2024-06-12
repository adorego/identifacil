'use client'

import Box from "@mui/material/Box";
import CustomTable from "@/components/CustomTable";
import {Paper, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {useEffect, useState} from "react";
import * as React from "react";
import TabRoles from "@/app/(sistema)/sistema/gestion-de-usuarios/components/tabRoles";
import TabUsuarios from "@/app/(sistema)/sistema/gestion-de-usuarios/components/tabUsuarios";
import TabPermisos from "@/app/(sistema)/sistema/gestion-de-usuarios/components/tabPermisos";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const APIAUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API;



export default function TableView(){

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return(
        <>
            <Box mt={4} component={Paper} sx={{ width: '100%' }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px:3, pt:2 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Usuarios" {...a11yProps(0)} />
                        <Tab label="Roles" {...a11yProps(1)} />
                        <Tab label="Permisos" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TabUsuarios />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TabRoles />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <TabPermisos />
                </CustomTabPanel>
            </Box>



        </>
    )
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}