'use client'

import * as React from 'react';
import {Box, Breadcrumbs, Grid, Link, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import QueryBlock from "../../../../components/blocks/QueryBlock";
import { BarChart } from '@mui/x-charts/BarChart';
import CustomTable from "../../../../components/CustomTable";
import {masEstaditicasData, rangoEtarioData} from "../../../dummyData/data";
import PenitenciariaFilter from "../components/penitenciariaFilter";

const chartSetting = {
    xAxis: [
        {
            label: 'PPL',
        },
    ],
    width: 480,
    height: 290,
};

const dataset = [
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

];

// Datos dummy
const { header, data } = rangoEtarioData();
const estadisticas = masEstaditicasData();



const valueFormatter = (value: number) => `${value}`;


export default function Page(){

    return(
        <Box >
            <h2>Por ingresos</h2>
            {/*<Breadcrumbs aria-label="breadcrumb" mb={2}>
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link underline="hover" color="inherit" href="/informes">
                    Informes
                </Link>
                <Typography color="text.primary">Ingresos</Typography>
            </Breadcrumbs>*/}

            <PenitenciariaFilter />
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <Paper elevation={2}>
                        <Box p={3}>
                            <Typography variant='h6'>Por grado academico</Typography>
                            <div  className='lineBarChart'>
                                <BarChart
                                    sx={{ width: '100%' }}
                                    dataset={dataset}
                                    yAxis={[{ scaleType: 'band', dataKey: 'grado' }]}
                                    series={[{ dataKey: 'ppl', label: 'Grado academico', valueFormatter, color:'#00A76F' }]}
                                    layout="horizontal"
                                    {...chartSetting}

                                />
                            </div>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={3}>
                    <CustomTable
                        options={
                            {
                                rowsPerPageCustom: 4,
                                title: 'Por lugar de nacimiento',
                                pagination: false,
                                expandedList: '/informes/ingresos/lugar-nacimiento',
                                deleteOption: false
                            }
                        }
                        data={data}
                        headers={header}
                    />
                </Grid>
                <Grid item sm={3}>
                    <CustomTable
                        options={
                            {
                                rowsPerPageCustom: 4,
                                title: 'Por rango etario',
                                pagination: false,
                                expandedList: '/informes/ingresos/rango-etario',
                                deleteOption: false
                            }
                        }
                        data={data}
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
                                expandedList: '/informes/ingresos/mas-estadisticas',
                                deleteOption: false
                            }
                        }
                        data={estadisticas.data}
                        headers={estadisticas.header}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}