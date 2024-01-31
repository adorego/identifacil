'use client'

import * as React from 'react';
import {Box, Grid, Paper, Tab, Tabs} from "@mui/material";
import BloqueDatosPersonales from "../../cuestionario/components/BloqueDatosPersonales";
import BloqueEducacion from "../../cuestionario/components/BloqueEducacion";
import BloqueFamiliares from "../../cuestionario/components/BloqueFamiliar";
import BloqueJudicial from "../../cuestionario/components/BloqueJudicial";
import BloqueSalud from "../../cuestionario/components/BloqueSalud";
import BloqueSeguridad from "../../cuestionario/components/BloqueSeguridad";
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
                    {children}
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



export default function NestedInformacionPreso({datoID=""}:{datoID:string}){

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <Box pt={3}>
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
                                     <BloqueDatosPersonales datosDeIdentificacion={{cedula_identidad: '3636681', nombres: 'Fernando', apellidos:'Vera Cuenca', codigo_genero: '2', fecha_nacimiento: '20/07/1989'}} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                     <BloqueSalud numeroDeIdentificacion={'3636681'}  />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                     <BloqueSeguridad numeroDeIdentificacion={'3636681'}/>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                     <BloqueEducacion  numeroDeIdentificacion={'3636681'}/>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={4}>
                                     <BloqueFamiliares  numeroDeIdentificacion={'3636681'}/>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={5}>
                                     <BloqueJudicial  numeroDeIdentificacion={'3636681'}/>
                                </CustomTabPanel>
                            </Grid>

                        </Grid>



                </Box>

            </Paper>
        </Box>
    )
}