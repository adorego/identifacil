'use client'

import {Box, Breadcrumbs, Grid, Link, Paper} from "@mui/material";
import {destinosTrasladosData, motivosTrasladosData, rangoTiempoData, reclsusosData} from "../../../dummyData/data";

import CustomTable from "../../../../components/CustomTable";
import PenitenciariaFilter from "../components/penitenciariaFilter";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const trasladosDummy = reclsusosData();
const motivosTrasladosDummy = motivosTrasladosData();
const rangoTiempoDymmy = rangoTiempoData();
const destinosDymmy = destinosTrasladosData();



const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default  function Page(){

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData(`${API_URL}/movimientos`)
            .then(fetchedData => {
                console.log(fetchedData)
                console.log(Object.keys(fetchedData).map(key=>fetchedData[key]).map(item=>({

                    id: item.id,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })))
                // TODO: veritifcar porque hace problema typescript aca

                //@ts-ignore
                setData(Object.keys(fetchedData).map(key => fetchedData[key]).map(item => ({
                    ...item,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })));
            });
    }, []);

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
                            data={trasladosDummy.rowsCustom}
                            headers={trasladosDummy.headersCustom}
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
                            data={motivosTrasladosDummy.data}
                            headers={motivosTrasladosDummy.header}
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

                    <Grid item sm={4}>
                        <CustomTable
                            data={rangoTiempoDymmy.data}
                            headers={rangoTiempoDymmy.header}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Por rango de tiempo',
                                    pagination: false,
                                    expandedList: '/informes/traslados/rango-tiempo',
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>

                    <Grid item sm={4}>
                        <CustomTable
                            data={destinosDymmy.data}
                            headers={destinosDymmy.header}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Destinos con mas traslados',
                                    pagination: false,
                                    expandedList: '/informes/traslados/destinos-mas-traslados',
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>

                    <Grid item sm={4}>
                        <CustomTable
                            data={destinosDymmy.data}
                            headers={destinosDymmy.header}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Tiempo de reclusion',
                                    pagination: false,
                                    expandedList: '/informes/traslados/tiempo-reclusion',
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