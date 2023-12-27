'use client'

import * as React from 'react';
import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const ENDPOINT : string = 'http://localhost:5000/PPL'

const header = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre y apellido' },
    { id: 'alias', label: 'apellido' },
    { id: 'fechaNacimiento', label: 'Fecha nacimiento' },
    { id: 'estadoPerfil', label: 'Estado Perfil' },
]

export default function Page(){
    const [data, setData] = useState(null);


    useEffect(() => {
        const apiUrl = ENDPOINT; // Puedes cambiar la URL según tus necesidades
        fetchData(apiUrl)
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []);

    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress/>
            </Box>
        );
    }

    return(
        <div>
            <TituloComponent titulo='Gestion PPL' />

            <Grid container mt={3}>
                <Grid item sm={12}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <FiltrosTables/>
                        </Box>
                        <CustomTable headers={header} data={data} showId={true}
                                     options={{
                                         deleteOption: false,
                                         rowsPerPageCustom: 10,
                                         pagination: true,
                                         targetURL: '/ppl'
                                     }}
                        />
                    </Paper>
                    {/*<DataTableComponent />*/}
                </Grid>
            </Grid>
        </div>
    )
}