'use client'

import * as React from 'react';
import CustomTable from "../../../../../components/CustomTable";
import {Grid, Paper, TextField, Typography, Button, Stack, Breadcrumbs, Link, Box} from "@mui/material";
import {lugarNacimientoExtended} from "../../../../dummyData/data";
import PenitenciariaFilter from "../../components/penitenciariaFilter";

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
                    <Typography color="text.primary">Por lugar de nacimiento</Typography>
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
                            title:'Por lugar de nacimiento',
                            pagination: true,
                        }}

                    />
                </Grid>

            </Grid>

        </>
    )
}