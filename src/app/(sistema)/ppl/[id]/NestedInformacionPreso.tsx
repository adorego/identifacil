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
import PermissionValidator from "@/components/authComponents/permissionValidator";
import {useSession} from "next-auth/react";

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
    contacto_embajada?: {
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
    contacto_embajada: {
        id: 0,
        nombre: '',
        numero: '1231414',
        pais: {
            id: 0
        },
    },
    registro_de_fotos: [],
}

export default function NestedInformacionPreso({datosPersona = datosPersonaInitial}: {
    datosPersona: datosPersonaType
}) {

    const [value, setValue] = React.useState(0);

    const [datosPPL, setdatosPPL] = useState<datosPersonaType>(datosPersonaInitial)

    const {data: session}: { data: any; } = useSession();

    useEffect(() => {
        if (datosPersona) {
            setdatosPPL(datosPersona)
        }
    }, [datosPersona]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Perfil',
            permission: 'ver_ppl_form_perfil',
            component: <FormularioDatosPersonales
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
                    contactoDeEmergencia1: datosPPL?.datosPersonales?.contactoDeEmergencia1 ? datosPPL?.datosPersonales?.contactoDeEmergencia1 : '',
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
                }}/>
        },
        {
            label: 'Salud', permission: 'ver_ppl_form_salud', component: <BloqueSalud
                id_persona={datosPPL.id_persona}
                datosAlmacenados={datosPPL.datosDeSalud}
                codigo_genero={datosPPL.genero}
                onSetDatosPPL={setdatosPPL}
            />
        },
        {
            label: 'Seguridad', permission: 'ver_ppl_form_seguridad', component: <BloqueSeguridad
                datosIniciales={datosPPL.datosDeSeguridad}
                id_persona={datosPPL.id_persona}
                onSetDatosPPL={setdatosPPL}
            />
        },
        {
            label: 'Educacion', permission: 'ver_ppl_form_educacion', component: <BloqueEducacion
                id_persona={datosPPL.id_persona}
                datosEducacionIniciales={datosPPL.datosEducacion}
                onSetDatosPPL={setdatosPPL}
            />
        },
        {
            label: 'Familiares', permission: 'ver_ppl_form_familiares', component: <BloqueFamiliares
                id_persona={datosPPL.id_persona}
                datosFamiliaresIniciales={datosPPL.datosFamiliares}
                onSetDatosPPL={setdatosPPL}
            />
        },
        {
            label: 'Judiciales', permission: 'ver_ppl_form_judiciales', component: <BloqueJudicial
                id_persona={datosPPL.id_persona}
                datosIniciales={datosPPL.datosJudiciales}
                onSetDatosPPL={setdatosPPL}
            />
        },
        {
            label: 'Galeria', permission: 'ver_ppl_form_galeria', component: <BloqueGaleria
                datosIniciales={datosPPL.registro_de_fotos}
                id_persona={datosPPL.id_persona}
                onSetDatosPPL={setdatosPPL}
            />
        }
    ];

    const filteredTabs = tabs.filter(tab => PermissionValidator(tab.permission, session));

    return (
        <Box pt={3}>
            <Paper elevation={1}>
                <Box p={2}>
                    <Grid container>
                        <Grid item sm={2} sx={{
                            borderRight: '1px solid lightgray',
                        }}>
                            <Tabs
                                className='vertical-tab'
                                value={value} onChange={handleChange} aria-label="basic tabs example"
                                orientation='vertical'>
                                {filteredTabs.map((tab, index) => (
                                    <Tab key={index} label={tab.label} {...a11yProps(index)} />
                                ))}
                            </Tabs>
                        </Grid>
                        <Grid item sm={10}>
                            {filteredTabs.map((tab, index) => (
                                <CustomTabPanel key={index} value={value} index={index}>
                                    {tab.component}
                                </CustomTabPanel>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}
