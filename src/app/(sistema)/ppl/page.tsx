'use client'

import * as React from 'react';

import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";


const ENDPOINT : string = `/gestion_ppl/ppls`

const header = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'genero', label: 'Genero' },
    { id: 'fechaDeNacimiento', label: 'Fecha nacimiento', type: 'date' },
    { id: 'estado_perfil', label: 'Estado Perfil' },
]

/*async function getDatos(endpoint:string=""){

    const res = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}${endpoint}`)


    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}*/

export default function Page(){

    const [listaPersonas, setListaPersonas] = useState([])

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud fetch:', error);
            return null; // o manejar el error de manera adecuada
        }
    }

    useEffect(() => {
        console.log('get ppl')
        fetchData()
            .then(fetchedData => {
                setListaPersonas(fetchedData);
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez



    if (listaPersonas.length <= 0) {
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
                        {/*<Box p={3}>
                            <FiltrosTables/>
                        </Box>*/}
                        <CustomTable headers={header} data={listaPersonas} showId={false}
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