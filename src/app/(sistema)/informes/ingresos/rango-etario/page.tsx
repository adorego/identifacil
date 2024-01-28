'use client'

import * as React from 'react';

import {Box, Breadcrumbs, Button, Grid, Link, Paper, Stack, TextField, Typography} from "@mui/material";

import CustomTable from "../../../../../components/CustomTable";
import PenitenciariaFilter from "../../components/penitenciariaFilter";
import {lugarNacimientoExtended} from "../../../../dummyData/data";

const dummyData = lugarNacimientoExtended()


export default function Page() {

    return (
        <>
            <Box mb={2}>
                <h2>Por ingresos</h2>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/informes">
                        Informes
                    </Link>
                    <Link underline="hover" color="inherit" href="/informes/ingresos">
                        Ingresos
                    </Link>
                    <Typography color="text.primary">Por rango etario</Typography>
                </Breadcrumbs>
            </Box>


            <PenitenciariaFilter />

            <Grid container mt={2}>
                <Grid item sm={12}>
                    <CustomTable
                        data={dummyData.data}
                        headers={dummyData.header}
                        options={{
                            rowsPerPageCustom: 10,
                            title:'Por rango etario',
                            pagination: true,
                            deleteOption:false,
                        }}

                    />
                </Grid>

            </Grid>

        </>
    )
}