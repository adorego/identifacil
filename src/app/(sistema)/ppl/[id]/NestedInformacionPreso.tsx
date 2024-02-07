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
import FormularioDatosPersonales from "@/app/(sistema)/cuestionario/components/FormularioDatosPersonales";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3, backgroundColor: '#FFF',}}>
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


export default function NestedInformacionPreso({datosPersona, datosPersonales} : any) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box pt={3}>
            <Paper elevation={1}>
                <Box p={2}>
                    <Grid container>
                        <Grid item sm={2} sx={{
                            borderRight: '1px solid lightgray',
                        }}>
                            <Tabs
                                value={value} onChange={handleChange} aria-label="basic tabs example"
                                orientation='vertical'>
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

                                { datosPersona ?
                                    <FormularioDatosPersonales datosDeIdentificacion={{
                                        cedula_identidad: datosPersona.numero_de_identificacion,
                                        nombres: datosPersona.nombre,
                                        apellidos: datosPersona.apellido,
                                        apodo: datosPersona.apodo,
                                        codigo_genero: datosPersona.genero,
                                        fecha_nacimiento: '1989/07/20',
                                        estadoCivil: datosPersonales['estadoCivil'],
                                        lugarDeNacimiento: datosPersonales['lugarDeNacimiento'],
                                        direccion: datosPersonales['direccion'],
                                        barrioCompania: datosPersonales['barrioCompania'],
                                        numeroDeContacto: datosPersonales['numeroDeContacto'],
                                        contactoDeEmergencia1: datosPersonales['contactoDeEmergencia1'],
                                        contactoDeEmergencia2: datosPersonales['contactoDeEmergencia2'],
                                        pueblosIndigenas: datosPersonales['pueblosIndigenas'],
                                        nombreEtnia: datosPersonales['nombreEtnia'],
                                        perteneceAComunidadLGTBI: datosPersonales['perteneceAComunidadLGTBI'],

                                    }}/> : ''
                                }

                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                {/* <BloqueSalud /> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                {/* <BloqueSeguridad /> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                                {/* <BloqueEducacion /> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={4}>
                                {/* <BloqueFamiliares /> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={5}>
                                {/* <BloqueJudicial /> */}
                            </CustomTabPanel>
                        </Grid>

                    </Grid>


                </Box>

            </Paper>
        </Box>
    )
}