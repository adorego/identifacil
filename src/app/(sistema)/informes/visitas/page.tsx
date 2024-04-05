'use client'

import {Box, Breadcrumbs, Grid, Link, Paper} from "@mui/material";

import CustomTable from "../../../../components/CustomTable";
import PenitenciariaFilter from "../components/penitenciariaFilter";
import {visitaData} from "../../../dummyData/data";

const visitasDummy = visitaData();

export default  function Page(){

    // TODO: Hacer las paginas de detalle de las tablas
    // TODO: Considerar un componente dinamico que desmonte y monte el detalle y los resumenes
    return(
        <>
            <Box>
                <h2>Informe de visitas</h2>

                {/*<PenitenciariaFilter/>*/}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <CustomTable
                            data={visitasDummy.data}
                            headers={visitasDummy.header}
                            options={
                                {
                                    rowsPerPageCustom: 3,
                                    title: 'Por motivo de medida',
                                    pagination: false,
                                    expandedList: '/movimientos/bajas/',
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>
                    <Grid item sm={6}>
                        <CustomTable
                            data={visitasDummy.data}
                            headers={visitasDummy.header}
                            options={
                                {
                                    rowsPerPageCustom: 3,
                                    title: 'Por rango de tiempo',
                                    pagination: false,
                                    expandedList: '/informes/traslados/lugar-nacimiento',
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>

                    <Grid item sm={6}>
                        <CustomTable
                            data={visitasDummy.data}
                            headers={visitasDummy.header}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Por situacion procesal',
                                    pagination: false,
                                    expandedList: '/informes/traslados/rango-tiempo',
                                    deleteOption:false,
                                }
                            }

                        />
                    </Grid>

                    <Grid item sm={6}>
                        <CustomTable
                            data={visitasDummy.data}
                            headers={visitasDummy.header}
                            options={
                                {
                                    rowsPerPageCustom: 4,
                                    title: 'Por hecho punible',
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