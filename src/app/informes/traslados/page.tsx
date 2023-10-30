'use client'
import * as React from 'React';
import {Box, Breadcrumbs, Grid, Link, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import QueryBlock from "../../../components/blocks/QueryBlock";
import {BarChart} from "@mui/x-charts/BarChart";
import CustomTable from "../../../components/CustomTable";
import PenitenciariaFilter from "../components/penitenciariaFilter";
import {destinosTrasladosData, motivosTrasladosData, rangoTiempoData, reclsusosData} from "../../dummyData/data";

const trasladosDummy = reclsusosData();
const motivosTrasladosDummy = motivosTrasladosData();
const rangoTiempoDymmy = rangoTiempoData();
const destinosDymmy = destinosTrasladosData();

export default  function Page(){

    // TODO: Hacer las paginas de detalle de las tablas
    return(
        <>
            <Box>
                <h2>Informe de Traslados</h2>
                <Breadcrumbs aria-label="breadcrumb" mb={2}>
                    <Link underline="hover" color="inherit" href="/">
                        Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/informes">
                        Informes
                    </Link>
                    <Typography color="text.primary">Ingresos</Typography>
                </Breadcrumbs>
                <PenitenciariaFilter/>
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
                                    expandedList: '/informes/traslados/lugar-nacimiento'
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
                                    expandedList: '/informes/traslados/lugar-nacimiento'
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
                                    expandedList: '/informes/traslados/rango-tiempo'
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
                                    expandedList: '/informes/traslados/destinos-mas-traslados'
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
                                    expandedList: '/informes/traslados/tiempo-reclusion'
                                }
                            }

                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}