'use client'

import * as React from 'react';

import {Box, Grid, Paper, Tab, Tabs} from "@mui/material";

import BloqueDatosPersonales from "../../cuestionario/components/BloqueDatosPersonales.tsx.back";
import BloqueEducacion from "../../cuestionario/components/BloqueEducacion.tsx.back";
import BloqueFamiliares from "../../cuestionario/components/BloqueFamiliares.tsx.back";
import BloqueJudicial from "../../cuestionario/components/BloqueJudicial.tsx.back";
import BloqueSalud from "../../cuestionario/components/BloqueSalud.tsx.back";
import BloqueSeguridad from "../../cuestionario/components/BloqueSeguridad.tsx.back";
import Typography from '@mui/material/Typography';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
            {value === index && (
                <Box sx={{ p: 3, backgroundColor: '#FFF', }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function NestedInformacionPreso(){

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <>
            <Paper elevation={1}>
                <Box p={2}>
                        <Grid container>
                            <Grid item sm={2} sx={{
                                borderRight: '1px solid lightgray',
                            }}>
                                <Tabs
                                    value={value} onChange={handleChange} aria-label="basic tabs example" orientation='vertical'>
                                    <Tab label="Perfil" {...a11yProps(0)} />
                                    <Tab label="Salud" {...a11yProps(1)} />
                                    <Tab label="Seguridad" {...a11yProps(2)} />
                                    <Tab label="Educacion" {...a11yProps(3)} />
                                    <Tab label="Familiares" {...a11yProps(4)} />
                                    <Tab label="Judiciales" {...a11yProps(5)} />
                                </Tabs>
                            </Grid>
                            <Grid item sm={10}>
                                <CustomTabPanel value={value} index={0}>
                                    <BloqueDatosPersonales />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <BloqueSalud />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <BloqueSeguridad />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                    <BloqueEducacion />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4}>
                                    <BloqueFamiliares />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={5}>
                                    <BloqueJudicial />
                                </CustomTabPanel>
                            </Grid>

                        </Grid>



                </Box>

            </Paper>
        </>
    )
}