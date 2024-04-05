'use client'

import * as React from 'react';
import {Box, Breadcrumbs, Button, CircularProgress, Grid, Link, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import QueryBlock from "../../../../components/blocks/QueryBlock";
import { BarChart } from '@mui/x-charts/BarChart';
import CustomTable from "../../../../components/CustomTable";
import {masEstaditicasData, rangoEtarioData} from "../../../dummyData/data";
import PenitenciariaFilter from "../components/penitenciariaFilter";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";
import {api_request, RequestResponse} from "@/lib/api-request";
import {Nacionalidad, NacionalidadesDTO} from "@/model/nacionalidad.model";

const chartSetting = {
    xAxis: [
        {
            label: 'PPL',
        },
    ],
    width: 480,
    height: 290,
};

/*const dataset = [
    {
        ppl: 21,
        grado: 'Primaria',
    },
    {
        ppl: 28,
        grado: 'Secundaria',
    },
    {
        ppl: 41,
        grado: 'Terciaria',
    },
    {
        ppl: 73,
        grado: 'N/D',
    },

];*/

// Datos dummy
const { header, data } = rangoEtarioData();
const estadisticas = masEstaditicasData();

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

const valueFormatter = (value: number) => `${value}`;


export default function Page(){

    const [state, setState] = useState<any>(null)

    const [dataSet, setDataSet] = useState<any>([
        {ppl: 0, grado: 'primaria',},
        {ppl: 0, grado: 'secundaria',},
        {ppl: 0, grado: 'terciaria',},
        {ppl: 0, grado: 'ninguno',},

    ])
    const [dataEstadisticas, setDataEstadistica] = useState<any>([])


    useEffect(() => {


        const apiUrl = `${API_URL}/gestion_ppl/ppls`; // Puedes cambiar la URL según tus necesidades

        fetchData(apiUrl)
            .then(fetchedData => {
                console.log(fetchedData)
                const resultados = {};

                fetchedData.forEach((persona:any)=>{
                    // console.log(persona.datosPersonales? true : false)
                    // console.log(persona.id_persona + ' ' + persona.id_persona.nacionalidad ? 'si' : 'no')

                    if(persona.datosPersonales !== null){

                            console.log(persona.datosPersonales.nacionalidad)
                            const nacionalidad = persona.datosPersonales.nacionalidad.nombre;

                            // @ts-ignore
                        if(resultados[nacionalidad]){
                                // @ts-ignore
                            resultados[nacionalidad]++;
                            }else{
                                // @ts-ignore
                            resultados[nacionalidad] = 1;
                            }

                    }


                })

                // @ts-ignore
                const resumen_nacionalidades = Object.keys(resultados).map(key => ({nacionalidad: key, cantidad: resultados[key]}));



                // @ts-ignore
                setDataSet([
                    {
                        ppl: fetchedData.filter((item:any)=>item.datosEducacion?.nivelAcademico == 'primaria').length,
                        grado: 'primaria',
                    },
                    {
                        ppl: fetchedData.filter((item:any)=>item.datosEducacion?.nivelAcademico == 'secundaria').length,
                        grado: 'secundaria',
                    },
                    {
                        ppl: fetchedData.filter((item:any)=>item.datosEducacion?.nivelAcademico == 'terciaria').length,
                        grado: 'terciaria',
                    },
                    {
                        ppl: fetchedData.filter((item:any)=>item.datosEducacion?.nivelAcademico == 'ninguna').length,
                        grado: 'ninguno',
                    },

                ])

                setDataEstadistica([
                    { id: 1, tipoDato: 'Personas que son cabeza de familia', cantidad: fetchedData.filter((item:any)=>item.datosFamiliares?.esCabezaDeFamilia == true).length},
                    { id: 2, tipoDato: 'Personas con problemas mentales', cantidad: fetchedData.filter((item:any)=>item.datosDeSalud?.saludMental?.sigue_tratamiento_mental == true).length},
                    { id: 3, tipoDato: 'Personas con problemas de escritura y lectura', cantidad: fetchedData.filter((item:any)=>item.datosDeSalud?.limitacionesIdiomaticas?.tieneDificultadParaLeerYEscribir_modificado == true).length},
                    { id: 4, tipoDato: 'Pertenecen a la comunidad LGBTI', cantidad: fetchedData.filter((item:any)=>item.datosPersonales?.perteneceAComunidadLGTBI == true).length},
                    { id: 4, tipoDato: 'Personas con VIH', cantidad: fetchedData.filter((item:any)=>item.datosDeSalud?.vih == true).length},

                ])

                // @ts-ignore
                setState((prev:any)=>({
                    ppls: fetchedData,
                    nacionalidades: resumen_nacionalidades,
                    cabeza_familia: fetchedData.filter((item:any)=>item.datosFamiliares?.esCabezaDeFamilia == true).length,
                    poblacion: fetchedData.length,
                    condenados: fetchedData.filter((item:any)=>item.datosJudiciales?.ingresos_a_prision?.length > 0).length,
                    procesados: fetchedData.length - fetchedData.filter((item:any)=>item.datosJudiciales?.ingresos_a_prision?.length > 0).length,
                    salud_mental: fetchedData.filter((item:any)=>item.datosDeSalud?.saludMental?.sigue_tratamiento_mental == true).length,
                    limitaciones_idiomaticas: fetchedData.filter((item:any)=>item.datosDeSalud?.limitacionesIdiomaticas?.tieneDificultadParaLeerYEscribir_modificado == true).length,
                    vih: fetchedData.filter((item:any)=>item.datosDeSalud?.vih == true).length,
                    comunidad: fetchedData.filter((item:any)=>item.datosPersonales?.perteneceAComunidadLGTBI == true).length,
                    // procesados: fetchedData.filter((item: { datosJudiciales: { ingresos_a_prision: any; }; })=>item.datosJudiciales.ingresos_a_prision)
                }));
            });
    }, []);

    if(state == null){
        return(
            <>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 80px)',
                }}>
                    <Box textAlign='center'>
                        <CircularProgress />
                        <h4>Cargando</h4>
                    </Box>
                </Box>
            </>
        )
    }

    return(
        <Box >


            <Grid container spacing={2} mt={2}>

                <Grid item sm={10}>
                    <h2>Por ingresos</h2>
                </Grid>
                <Grid item sm={2}>
                    <Button fullWidth variant="outlined"  size='small'   href='/informes/ingresos/reporte' >
                        Generar Reporte
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <Paper elevation={2}>
                        <Box p={3}>
                            <Typography variant='h6'>Por grado academico</Typography>
                            <div  className='lineBarChart'>
                                <BarChart
                                    sx={{ width: '100%' }}
                                    dataset={dataSet}
                                    yAxis={[{ scaleType: 'band', dataKey: 'grado' }]}
                                    series={[{ dataKey: 'ppl', label: 'Grado academico', valueFormatter, color:'#00A76F' }]}
                                    layout="horizontal"
                                    {...chartSetting}

                                />
                            </div>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={6}>
                    <CustomTable
                        options={
                            {
                                rowsPerPageCustom: 4,
                                title: 'Por Nacionalidad',
                                pagination: false,

                                deleteOption: false
                            }
                        }
                        data={state.nacionalidades}
                        headers={header}
                    />
                </Grid>
                <Grid item sm={12}>
                    <CustomTable
                        options={
                            {
                                rowsPerPageCustom: 4,
                                title: 'Más estadisticas',
                                pagination: false,

                                deleteOption: false
                            }
                        }
                        data={dataEstadisticas}
                        headers={estadisticas.header}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}