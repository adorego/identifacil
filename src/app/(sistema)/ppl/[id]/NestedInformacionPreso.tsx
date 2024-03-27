'use client'

import * as React from 'react';

import {Box, Grid, Paper, Tab, Tabs} from "@mui/material";
import {
    datosDeSalud2Initial, datosDeSalud2Type,
    datosEducacionInicial,
    datosEducacionType,
    datosFamiliaresInicial,
    datosFamiliaresType,
    datosJudicialesInicial,
    datosJudicialesType,
    datosSeguridadInicial,
    datosSeguridadType
} from "@/components/utils/systemTypes";
import BloqueDatosPersonales from "../../cuestionario/components/BloqueDatosPersonales";

import BloqueEducacion from "../../cuestionario/components/BloqueEducacion";
import BloqueFamiliares from "../../cuestionario/components/BloqueFamiliar";
import BloqueJudicial from "../../cuestionario/components/BloqueJudicial";
import BloqueSalud from "../../cuestionario/components/BloqueSalud";
import BloqueSeguridad from "../../cuestionario/components/BloqueSeguridad";
import FormularioDatosPersonales from "@/app/(sistema)/cuestionario/components/FormularioDatosPersonales";
import BloqueGaleria from "@/app/(sistema)/cuestionario/components/BloqueGaleria";


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
    numero_de_identificacion: any;
    id_persona: number | null;
    nombre: string;
    apellido: string;
    genero: number;
    apodo: string;
    fechaDeNacimiento: string;
    datosPersonales: {
        id: number | null;
        estadoCivil: {
            id: number | null;
        };
        lugarDeNacimiento: string;
        direccion: string;
        barrioCompania: string;
        nacionalidad: {
            id: number | null;
        };
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
    datosDeSalud: datosDeSalud2Type;
    datosJudiciales: datosJudicialesType;
    registro_de_fotos: Array<{ nombre: string; foto: string; }>
}


const datosPersonaInitial: datosPersonaType = {
    id_persona: 0,
    nombre: "",
    apellido: "",
    genero: 1,
    numero_de_identificacion: "",
    apodo: "",
    fechaDeNacimiento: "",
    datosPersonales: {
        id: null,
        estadoCivil: {
            id: null,
        },
        lugarDeNacimiento: "",
        direccion: "",
        barrioCompania: "",
        nacionalidad: {
            id: null,
        },
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
    datosDeSalud: datosDeSalud2Initial,
    datosJudiciales: datosJudicialesInicial,
    registro_de_fotos: [],
}

export default function NestedInformacionPreso({datosPersona = datosPersonaInitial}: { datosPersona: datosPersonaType }) {

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
                                <Tab label="Galeria" {...a11yProps(6)} />
                            </Tabs>
                        </Grid>
                        <Grid item sm={10}>
                            <CustomTabPanel value={value} index={0}>

                                {datosPersona ?
                                    <FormularioDatosPersonales datosDeIdentificacion={{
                                        id_persona: datosPersona.id_persona,
                                        id_datos_personales: datosPersona.datosPersonales?.id,
                                        nombres: datosPersona.nombre,
                                        apellidos: datosPersona.apellido,
                                        apodo: datosPersona.apodo,
                                        codigo_genero: datosPersona.genero,
                                        fechaDeNacimiento: datosPersona.fechaDeNacimiento,
                                        nacionalidad: datosPersona?.datosPersonales?.nacionalidad?.id,
                                        estadoCivil: datosPersona?.datosPersonales?.estadoCivil?.id,
                                        lugarDeNacimiento: datosPersona?.datosPersonales?.lugarDeNacimiento,
                                        direccion: datosPersona?.datosPersonales?.direccion,
                                        barrioCompania: datosPersona?.datosPersonales?.barrioCompania,
                                        numeroDeContacto: datosPersona?.datosPersonales?.numeroDeContacto,
                                        contactoDeEmergencia1: datosPersona?.datosPersonales?.contactoDeEmergencia1,
                                        contactoDeEmergencia2: datosPersona?.datosPersonales?.contactoDeEmergencia2,
                                        pueblosIndigenas: datosPersona?.datosPersonales?.pueblosIndigenas,
                                        nombreEtnia: datosPersona?.datosPersonales?.nombreEtnia,
                                        perteneceAComunidadLGTBI: datosPersona?.datosPersonales?.perteneceAComunidadLGTBI,
                                        numero_de_identificacion: datosPersona.numero_de_identificacion

                                    }}/> : ''
                                }

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>

                                <BloqueSalud
                                     id_persona={datosPersona.id_persona}
                                     datosAlmacenados={datosPersona.datosDeSalud}
                                  codigo_genero={datosPersona.genero}
                                />
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={2}>
                                <BloqueSeguridad
                                    datosIniciales={datosPersona.datosDeSeguridad}
                                    id_persona={datosPersona.id_persona}
                                />
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={3}>
                                <BloqueEducacion id_persona={datosPersona.id_persona}
                                                 datosEducacionIniciales={datosPersona.datosEducacion}/>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={4}>
                                <BloqueFamiliares id_persona={datosPersona.id_persona}
                                                  datosFamiliaresIniciales={datosPersona.datosFamiliares}/>
                            </CustomTabPanel>


                            <CustomTabPanel value={value} index={5}>
                                <BloqueJudicial id_persona={datosPersona.id_persona}
                                                datosIniciales={datosPersona.datosJudiciales}/>
                            </CustomTabPanel>
{}
                            <CustomTabPanel value={value} index={6}>
                                <BloqueGaleria datosIniciales={datosPersona.registro_de_fotos} id_persona={datosPersona.id_persona}/>
                            </CustomTabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}

