'use client'

import {Box, Breadcrumbs, CircularProgress, Grid, Link, Paper} from "@mui/material";
import {destinosTrasladosData, motivosTrasladosData, rangoTiempoData, reclsusosData} from "../../../dummyData/data";

import CustomTable from "../../../../components/CustomTable";
import PenitenciariaFilter from "../components/penitenciariaFilter";
import React, {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const trasladosDummy = reclsusosData();
const motivosTrasladosDummy = motivosTrasladosData();
const rangoTiempoDymmy = rangoTiempoData();
const destinosDymmy = destinosTrasladosData();

const headerInternos = [
    { id: 'nombre', label: 'Nombre y Apellido' },
    { id: 'apellido', label: 'Alias' },
    { id: 'cantidad_de_traslado', label: 'Cantidad' },
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default  function Page(){

    const [data, setData] = useState({
        ppl_con_mas_traslados: [],
        motivos_con_cantidad: [],
        medidas_de_seguridad_con_cantidad: [],
        destinos_con_cantidad: []
    });

    useEffect(() => {
        fetchData(`${API_URL}/movimientos/informe_traslados`)
            .then(fetchedData => {
                console.log(fetchedData)


                //@ts-ignore
                if(fetchedData){
                    setData({
                        destinos_con_cantidad: fetchedData.destinos_con_cantidad?.map((item:any)=>{
                            return item[1]
                        }),
                        medidas_de_seguridad_con_cantidad: fetchedData.medidas_de_seguridad_con_cantidad?.map((item:any)=>{
                            return item[1]
                        }),
                        ppl_con_mas_traslados :fetchedData.ppl_con_mas_traslados?.map((item:any)=>{
                            return item[1]
                        }),
                        motivos_con_cantidad :fetchedData.motivos_con_cantidad?.map((item:any)=>{
                            return item[1]
                        })
                    });
                }
            });
    }, []);

    if (!data) {
        return(
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        <CircularProgress/>
                    </Box>
                </Box>
            </div>
        )
    }
    // TODO: Hacer las paginas de detalle de las tablas
    return(
        <>
            <Box>
                <h2>Informe de Traslados</h2>
                {/*<Breadcrumbs aria-label="breadcrumb" mb={2}>
                    <Link underline="hover" color="inherit" href="/">
                        Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/informes">
                        Informes
                    </Link>
                    <Typography color="text.primary">Ingresos</Typography>
                </Breadcrumbs>*/}
                {/*<PenitenciariaFilter/>*/}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <CustomTable
                            data={data.ppl_con_mas_traslados}
                            headers={[
                                { id: 'apellido', label: 'Nombre' },
                                { id: 'nombre', label: 'Nombre' },
                                { id: 'cantidad_de_traslado', label: 'Cantidad' },
                            ]}
                            options={
                                {
                                    rowsPerPageCustom: 5,
                                    title: 'Internos con mas traslados',
                                    pagination: false,
                                    /*expandedList: '/informes/traslados/lugar-nacimiento',*/
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>
                    <Grid item sm={6}>
                        <CustomTable
                            data={data.motivos_con_cantidad}
                            headers={[
                                { id: 'nombre', label: 'Motivo' },
                                { id: 'cantidad', label: 'Cantidad' },
                            ]}
                            options={
                                {
                                    rowsPerPageCustom: 5,
                                    title: 'Por motivo de traslados',
                                    pagination: false,
                                    /*expandedList: '/informes/traslados/lugar-nacimiento',*/
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>

                    <Grid item sm={6}>
                        <CustomTable
                            data={data.destinos_con_cantidad}
                            headers={[
                                { id: 'destino', label: 'Motivo' },
                                { id: 'cantidad', label: 'Cantidad' },
                            ]}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Destino con mas cantidad',
                                    pagination: false,
                                    /*expandedList: '/informes/traslados/rango-tiempo',*/
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>


                    <Grid item sm={6}>
                        <CustomTable
                            data={data.medidas_de_seguridad_con_cantidad}
                            headers={[
                                { id: 'medida', label: 'Motivo' },
                                { id: 'cantidad', label: 'Cantidad' },
                            ]}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Tiempo de reclusion',
                                    pagination: false,
                                    /*expandedList: '/informes/traslados/tiempo-reclusion',*/
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}