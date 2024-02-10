'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {fetchData} from "@/components/utils/utils";

const ENDPOINT : string = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`

const header = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'genero', label: 'Genero' },
    { id: 'fechaDeNacimiento', label: 'Fecha nacimiento', type: 'date' },
    { id: 'estado_perfil', label: 'Estado Perfil' },
]

export default function Page(){
    const [data, setData] = useState(null);


    useEffect(() => {
         // Puedes cambiar la URL según tus necesidades
        fetchData(ENDPOINT)
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
                        <CustomTable headers={header} data={data} showId={false}
                                     options={{
                                         deleteOption: false,
                                         rowsPerPageCustom: 10,
                                         pagination: true,
                                         targetURL: `/ppl`,
                                         busqueda: `numero_de_identificacion`,
                                     }}
                        />
                    </Paper>
                    {/*<DataTableComponent />*/}
                </Grid>
            </Grid>
        </div>
    )
}