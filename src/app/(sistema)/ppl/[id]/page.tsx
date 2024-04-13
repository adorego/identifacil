'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Grid, Stack, Box, CircularProgress} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NestedInformacionPreso from "./NestedInformacionPreso";
import TabDatosPersonales from "@/app/(sistema)/ppl/components/tabDatosPenales";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";
import Image from "next/image";
import avatar from "@/common/blank-profile-picture-973460_960_720.webp"
import {
    datosDeSalud2Initial, datosDeSalud2Type,
    datosEducacionInicial,
    datosEducacionType, datosFamiliaresInicial,
    datosFamiliaresType,
    datosJudicialesInicial,
    datosJudicialesType,
    datosSeguridadInicial, datosSeguridadType
} from "@/components/utils/systemTypes";
import TabSalidaTransitoia from "@/app/(sistema)/ppl/components/tabSalidasTransitorias";
import TabSalidaTransitoria from "@/app/(sistema)/ppl/components/tabSalidasTransitorias";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";



type dataType = {
    id_persona: number;
    nombre: string;
    apellido: string;
    apodo: string;
    foto: string;
    fechaDeNacimiento: string;
    establecimiento_penitenciario?: string | number;
    genero: number;
    fecha_nacimiento: string;
    numero_de_identificacion: string;
    datosPersonales:{
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
    registro_de_fotos: Array<{nombre:string; foto:string}>;
    tiene_contacto_en_embajada: boolean;
    departamento: {
        id: number;
    }
    ciudad: {
        id: number;
    }
    contacto_embajada?:{
        id: number;
        nombre: string;
        numero: string;
        pais:{
            id: number;
        }
    }
}

const initialData = {
    id_persona: 0,
    nombre: '',
    apellido: '',
    apodo: '',
    foto: '',
    fechaDeNacimiento: '',
    registro_de_fotos: [],
    establecimiento_penitenciario: '',
    genero: 2,
    fecha_nacimiento: '',
    numero_de_identificacion: '',
    datosPersonales:{
        id: null,
        estadoCivil:{
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
    tiene_contacto_en_embajada: false,
    departamento: {
        id: 0,
    },
    ciudad: {
        id:0,
    },
    contactoDeEmbajada:{
        id: 0,
        nombre: '',
        numero: '',
        pais:{
            id: 0
        }
    }
}

const ENDPOINT = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls/id/`;
export default function Page({ params }: { params: { id: number } }) {
    /**1. For tabs position */
    const [value, setValue] = React.useState('1');

    /**2. Para datoss precargados */
    const [data, setData] = React.useState<dataType>(initialData);

    /**3. For tabs position */
    const [stateDataProfile, setStateDataProfile] = useState<any>({})

    /**4. For loaders */
    const [loading, setLoading] = React.useState(true);
    const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';


    useEffect(() => {


        setLoading(true)

        fetchData(`${ENDPOINT}${params.id}`)
            .then(fetchedData => {
                setStateDataProfile((prev:any)=>{
                    const datoDeCondena = fetchedData.datosJudiciales?.ingresos_a_prision?.find((item:any)=>item.ultimo_ingreso == true).expedienteJudicial?.condenado;
                    let condenadoValue = '';

                    if(datoDeCondena !== null && datoDeCondena !== undefined){
                        if(datoDeCondena){
                            condenadoValue = 'Condenado'
                        }else{
                            condenadoValue = 'Procesado'
                        }
                    }else{
                        condenadoValue = 'N/D'
                    }

                    return({

                        condenado: condenadoValue,
                        fecha_ingreso: fetchedData.datosJudiciales?.ingresos_a_prision.length > 0 ? fetchedData.datosJudiciales?.ingresos_a_prision.find((item:any)=>item.ultimo_ingreso).fecha_ingreso : 'N/D'
                    })
                })
                setData(fetchedData);
            }).finally(()=> {

            setLoading(false)
        });
    }, []);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const listaDeItemBread = [
        {nombre:'Lista de PPL', url:'', lastItem: false},
        {nombre:`${data ? data.nombre + ' ' + data.apellido  : 'PPL'}`, url:'', lastItem: true},
    ];


    return (
        <Box>
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                <TituloComponent titulo='PPL'>
                    <BreadCrumbComponent listaDeItems={listaDeItemBread} />
                </TituloComponent>
            </Stack>

            <Grid container sx={{bgcolor: "#FFF", border: '1px solid #e0e0e0', borderRadius: '10px', marginTop: '20px',}}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid p={3} item sm={12}>
                            <Stack direction='row'>
                                <Box className='imageContainer' sx={{marginRight: '40px'}}>
                                    {
                                        !loading ?
                                        <img src={`${ASSETS_URL}${data.foto}`} className='imageProfile' alt={`foto-perfil-${data.nombre + '-' + data.apellido}`}/>
                                        :
                                            (
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <CircularProgress />
                                                </Box>
                                            )
                                    }

                                </Box>
                                <Stack direction='column' justifyContent='center'>

                                    { loading ?
                                        'Cargando'
                                        : <Grid container mt={1} spacing={2}>
                                            <Grid item m={0}>
                                                <Typography variant="overline" display="block" mb={0}>
                                                    Nombre y apellido
                                                </Typography>
                                                <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                    {data.nombre} {data.apellido} {data.apodo ? `(${data.apodo})` : ''}
                                                </Typography>
                                            </Grid>
                                            <Grid item pt={0}>
                                                <Typography variant="overline" display="block" mb={0}>
                                                    Estado Procesal
                                                </Typography>
                                                <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                    {stateDataProfile.condenado}
                                                </Typography>
                                            </Grid>
                                            <Grid item pt={0}>
                                                <Typography variant="overline" display="block" mb={0}>
                                                    Fecha de ingreso
                                                </Typography>
                                                <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                    {stateDataProfile.fecha_ingreso}
                                                </Typography>
                                            </Grid>
                                            <Grid item pt={0}>
                                                <Typography variant="overline" display="block" mb={0}>
                                                    Penitenciaria
                                                </Typography>
                                                <Typography variant="body1" display="block"
                                                            sx={{fontWeight: '600',}}>
                                                    {data.establecimiento_penitenciario ? data.establecimiento_penitenciario : 'Minga Guazu'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }

                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                    {/*<Grid className="tabProfileNavigator" container sx={{
                            borderTop: '1px solid #e0e0e0',
                        }}>
                            <Grid xs={12} item>
                                <Stack alignItems="flex-end">
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Perfil" {...a11yProps(0)} />
                                            <Tab label="Información" {...a11yProps(1)} />
                                            <Tab label="Datos penales" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>*/}
                </Grid>
            </Grid>
            <Box mt={3}>
                <TabContext value={value}>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Informaciones" value="1" />
                            <Tab label="Datos penales" value="2" />
                            {/*<Tab label="Salidas Transitorias" value="3" />*/}
                            {/*<Tab label="Perfil" value="1" />*/}
                        </TabList>
                    </Box>

                    {/* Contenidos de tabs */}
                    <Box>
                        {/*<TabPanel value="1" sx={{p:'0'}}>
                            <Grid container mt={2} spacing={2}>
                                <Grid item xs={8}>

                                    <DocumentosJudicialesTable />

                                    <CustomTable options={{
                                        title: 'Ultimos documentos judiciales/penales/etc',
                                        targetURL: '/',
                                        rowsPerPageCustom: 10,
                                        deleteOption: false,
                                        pagination: false,
                                        expandedList: '/'
                                    }}/>

                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <ProximasAudicienciasTable />
                                        <CustomTable
                                            data={audienciasDummy.data}
                                            headers={audienciasDummy.header}
                                            options={{
                                                title: 'Proximas audiencias',
                                                rowsPerPageCustom: 3,
                                                deleteOption: false,
                                                pagination: false,
                                                expandedList: '/',
                                                targetURL: '/',
                                            }}
                                        />
                                    </Box>
                                    <Box mt={2}>
                                        <CustomTable
                                            data={visitaDummy.data}
                                            headers={visitaDummy.header}
                                            options={{
                                                title: 'Ultimas visitas',
                                                rowsPerPageCustom: 3,
                                                deleteOption: false,
                                                expandedList: '/',
                                                pagination: false,
                                                targetURL: '/',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </TabPanel>*/}
                        <TabPanel value="1" sx={{p:'0'}}>
                            <NestedInformacionPreso datosPersona={data} />
                        </TabPanel>
                        <TabPanel value="2" sx={{p:'0'}}>
                            <TabDatosPersonales idPersona={data.id_persona}/>
                        </TabPanel>
                        <TabPanel value="3" sx={{p:'0'}}>
                            <TabSalidaTransitoria id_persona={data.id_persona} />
                        </TabPanel>
                    </Box>
                </TabContext>
            </Box>

        </Box>
    )
}