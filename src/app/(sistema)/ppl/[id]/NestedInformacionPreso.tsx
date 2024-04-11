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
import {useEffect, useState} from "react";


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
    id_persona: number;
    nombre: string;
    tiene_contacto_en_embajada: boolean;
    tipo_de_documento?: {
        id: number | null;
    };
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
    datosJudiciales: datosJudicialesType | any;
    departamento: any;
    ciudad: any;
    contacto_embajada?:{
        id: number;
        nombre: string;
        numero: string;
        pais: {
            id: number
        },
    };
    registro_de_fotos: Array<{ nombre: string; foto: string; }>
}


const datosPersonaInitial: datosPersonaType = {
    id_persona: 0,
    nombre: "",
    apellido: "",
    genero: 1,
    numero_de_identificacion: "",
    apodo: "",
    tiene_contacto_en_embajada: false,
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
    departamento: 1,
    ciudad: 1,
    contacto_embajada:{
        id: 0,
        nombre: '',
        numero: '1231414',
        pais: {
            id:0
        },
    },
    registro_de_fotos: [],
}

export default function NestedInformacionPreso({datosPersona = datosPersonaInitial}: { datosPersona: datosPersonaType }) {


    const [value, setValue] = React.useState(0);

    const [datosPPL, setdatosPPL] = useState<datosPersonaType>(datosPersonaInitial)

    useEffect(() => {


        if(datosPersona){
            setdatosPPL(datosPersona)
        }
    }, [datosPersona]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box pt={3}>

            <Paper elevation={1}>
                <Box p={2}>
                    <Grid container>
                        <Grid  item sm={2} sx={{
                            borderRight: '1px solid lightgray',
                        }}>
                            <Tabs
                                className='vertical-tab'
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

                                    <FormularioDatosPersonales
                                        tipo_de_documento={datosPPL.tipo_de_documento?.id}
                                        onSetDatosPPL={setdatosPPL}
                                        datosDeIdentificacion={{
                                            id_persona: datosPPL.id_persona,
                                            id_datos_personales: datosPPL.datosPersonales?.id,
                                            nombres: datosPPL.nombre,
                                            apellidos: datosPPL.apellido,
                                            apodo: datosPPL.apodo,
                                            codigo_genero: datosPPL.genero,
                                            fechaDeNacimiento: datosPPL.fechaDeNacimiento,
                                            nacionalidad: datosPPL?.datosPersonales?.nacionalidad?.id,
                                            estadoCivil: datosPPL?.datosPersonales?.estadoCivil?.id,
                                            lugarDeNacimiento: datosPPL?.datosPersonales?.lugarDeNacimiento,
                                            direccion: datosPPL?.datosPersonales?.direccion ? datosPPL?.datosPersonales?.direccion : '',
                                            barrioCompania: datosPPL?.datosPersonales?.barrioCompania ? datosPPL?.datosPersonales?.barrioCompania : '',
                                            numeroDeContacto: datosPPL?.datosPersonales?.numeroDeContacto ? datosPPL?.datosPersonales?.numeroDeContacto : '',
                                            contactoDeEmergencia1: datosPPL?.datosPersonales?.contactoDeEmergencia1  ? datosPPL?.datosPersonales?.contactoDeEmergencia1 : '',
                                            contactoDeEmergencia2: datosPPL?.datosPersonales?.contactoDeEmergencia2 ? datosPPL?.datosPersonales?.contactoDeEmergencia2 : '',
                                            pueblosIndigenas: datosPPL?.datosPersonales?.pueblosIndigenas,
                                            nombreEtnia: datosPPL?.datosPersonales?.nombreEtnia,
                                            perteneceAComunidadLGTBI: datosPPL?.datosPersonales?.perteneceAComunidadLGTBI,
                                            numero_de_identificacion: datosPPL.numero_de_identificacion,
                                            tiene_contacto_en_embajada: datosPPL.tiene_contacto_en_embajada,
                                            departamento: datosPPL.departamento?.id ? datosPPL.departamento.id : 0,
                                            ciudad: datosPPL.ciudad?.id ? datosPPL.ciudad?.id : 0,
                                            contacto_embajada: {
                                                id: datosPPL.contacto_embajada?.id ? datosPPL.contacto_embajada.id : 0,
                                                nombre: datosPPL.contacto_embajada?.nombre ? datosPPL.contacto_embajada.nombre : '',
                                                numero: datosPPL.contacto_embajada?.numero ? datosPPL.contacto_embajada.numero : '',
                                                pais: {
                                                    id: datosPPL.contacto_embajada?.pais?.id ? datosPPL.contacto_embajada.pais.id : 0,
                                                }
                                            }
                                        }}
                                    />


                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>

                                <BloqueSalud
                                    id_persona={datosPPL.id_persona}
                                    datosAlmacenados={datosPPL.datosDeSalud}
                                    codigo_genero={datosPPL.genero}
                                    onSetDatosPPL={setdatosPPL}
                                />

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={2}>

                                    <BloqueSeguridad
                                        datosIniciales={datosPPL.datosDeSeguridad}
                                        id_persona={datosPPL.id_persona}
                                        onSetDatosPPL={setdatosPPL}
                                    />

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={3}>

                                    <BloqueEducacion
                                        id_persona={datosPPL.id_persona}
                                        datosEducacionIniciales={datosPPL.datosEducacion}
                                        onSetDatosPPL={setdatosPPL}
                                    />

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={4}>

                                    <BloqueFamiliares
                                        id_persona={datosPPL.id_persona}
                                        datosFamiliaresIniciales={datosPPL.datosFamiliares}
                                        onSetDatosPPL={setdatosPPL}
                                    />

                            </CustomTabPanel>


                            <CustomTabPanel value={value} index={5}>

                                    <BloqueJudicial
                                        id_persona={datosPPL.id_persona}
                                        datosIniciales={datosPPL.datosJudiciales}
                                        onSetDatosPPL={setdatosPPL}
                                    />

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={6}>

                                    <BloqueGaleria
                                        datosIniciales={datosPPL.registro_de_fotos}
                                        id_persona={datosPPL.id_persona}
                                        onSetDatosPPL={setdatosPPL}
                                    />

                            </CustomTabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}

