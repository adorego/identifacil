'use client'

import * as React from 'react';
import {Box, Paper, Tabs, Tab, Grid} from "@mui/material";
import Typography from '@mui/material/Typography';
import BloqueSalud from "../../cuestionario/components/BloqueSalud";
import BloqueSeguridad from "../../cuestionario/components/BloqueSeguridad";
import BloqueEducacion from "../../cuestionario/components/BloqueEducacion";
import BloqueFamiliares from "../../cuestionario/components/BloqueFamiliares";
import BloqueJudicial from "../../cuestionario/components/BloqueJudicial";

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
                            <Grid item sm={2}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation='vertical'>
                                    <Tab label="Salud" {...a11yProps(0)} />
                                    <Tab label="Seguridad" {...a11yProps(1)} />
                                    <Tab label="Educacion" {...a11yProps(2)} />
                                    <Tab label="Familiares" {...a11yProps(3)} />
                                    <Tab label="Judiciales" {...a11yProps(4)} />
                                </Tabs>
                            </Grid>
                            <Grid item sm={10}>
                                <CustomTabPanel value={value} index={0}>
                                    <BloqueSalud />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <BloqueSeguridad />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <BloqueEducacion />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                    <BloqueFamiliares />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4}>
                                    <BloqueJudicial />
                                </CustomTabPanel>
                            </Grid>

                        </Grid>



                </Box>

            </Paper>
        </>
    )
}