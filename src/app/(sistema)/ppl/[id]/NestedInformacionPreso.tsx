'use client'

import * as React from 'react';
import {Box, Grid, Paper, Tab, Tabs} from "@mui/material";
import BloqueDatosPersonales from "../../cuestionario/components/BloqueDatosPersonales";
import BloqueEducacion, {datosEducacion} from "../../cuestionario/components/BloqueEducacion";
import BloqueFamiliares from "../../cuestionario/components/BloqueFamiliar";
import BloqueJudicial from "../../cuestionario/components/BloqueJudicial";
import BloqueSalud from "../../cuestionario/components/BloqueSalud";
import BloqueSeguridad from "../../cuestionario/components/BloqueSeguridad";
import Typography from '@mui/material/Typography';
import FormularioDatosPersonales from "@/app/(sistema)/cuestionario/components/FormularioDatosPersonales";
import {
    datosEducacionInicial,
    datosEducacionType, datosFamiliaresInicial, datosFamiliaresType, datosJudicialesInicial, datosJudicialesType,
    datosSaludInicial,
    datosSaludType,
    datosSeguridadInicial,
    datosSeguridadType
} from "@/components/utils/systemTypes";

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



type datosPersonaType = {
    numero_de_identificacion: string;
    nombre: string;
    apellido: string;
    genero: number;
    apodo: string;
    fecha_nacimiento: string;
    datosPersonales:{
        estadoCivil: string;
        lugarDeNacimiento: string;
        direccion: string;
        barrioCompania: string;
        numeroDeContacto: string;
        contactoDeEmergencia1: string;
        contactoDeEmergencia2: string;
        pueblosIndigenas: boolean;
        nombreEtnia: string;
        perteneceAComunidadLGTBI: boolean;
    };
    datosDeSeguridad: datosSeguridadType;
    datosFamiliares: datosFamiliaresType;
    datosEducacion: datosEducacionType;
    datosSalud: datosSaludType;
    datosJudiciales: datosJudicialesType;
}


const datosPersonaInitial = {
    numero_de_identificacion: "",
    nombre: "",
    apellido: "",
    genero: 1,
    apodo: "",
    fecha_nacimiento: "",
    datosPersonales:{
        estadoCivil: "",
        lugarDeNacimiento: "",
        direccion: "",
        barrioCompania: "",
        numeroDeContacto: "",
        contactoDeEmergencia1: "",
        contactoDeEmergencia2: "",
        pueblosIndigenas: false,
        nombreEtnia: "",
        perteneceAComunidadLGTBI: false,
    },
    datosDeSeguridad: datosSeguridadInicial,
    datosFamiliares: datosFamiliaresInicial,
    datosEducacion: datosEducacionInicial,
    datosSalud: datosSaludInicial,
    datosJudiciales: datosJudicialesInicial
}

export default function NestedInformacionPreso({datosPersona=datosPersonaInitial} : { datosPersona:datosPersonaType }) {

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
                                        estadoCivil: datosPersona.datosPersonales.estadoCivil,
                                        lugarDeNacimiento: datosPersona.datosPersonales.lugarDeNacimiento,
                                        direccion: datosPersona.datosPersonales.direccion,
                                        barrioCompania: datosPersona.datosPersonales.barrioCompania,
                                        numeroDeContacto: datosPersona.datosPersonales.numeroDeContacto,
                                        contactoDeEmergencia1: datosPersona.datosPersonales.contactoDeEmergencia1,
                                        contactoDeEmergencia2: datosPersona.datosPersonales.contactoDeEmergencia2,
                                        pueblosIndigenas: datosPersona.datosPersonales.pueblosIndigenas,
                                        nombreEtnia: datosPersona.datosPersonales.nombreEtnia,
                                        perteneceAComunidadLGTBI: datosPersona.datosPersonales.perteneceAComunidadLGTBI,

                                    }}/> : ''
                                }

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>
                                 <BloqueSalud
                                     numeroDeIdentificacion={datosPersona.numero_de_identificacion}
                                     datosAlmacenados={datosPersona.datosSalud}
                                 />
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={2}>
                                 <BloqueSeguridad
                                     datosIniciales={datosPersona.datosDeSeguridad}
                                     numeroDeIdentificacion={datosPersona.numero_de_identificacion}
                                 />
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={3}>
                                 <BloqueEducacion numeroDeIdentificacion={datosPersona.numero_de_identificacion} datosEducacionIniciales={datosPersona.datosEducacion}/>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={4}>
                                 <BloqueFamiliares numeroDeIdentificacion={datosPersona.numero_de_identificacion} datosFamiliaresIniciales={datosPersona.datosFamiliares} />
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={5}>
                                 <BloqueJudicial numeroDeIdentificacion={datosPersona.numero_de_identificacion} datosIniciales={datosPersona.datosJudiciales} />
                            </CustomTabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}