'use client'
import {API_REGISTRO} from '@/../config'
import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";


import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";

const header = [
    { id: 'id', label: 'id' },
    { id: 'numeroDeExpediente', label: 'Nro. expediente' },
    { id: 'caratula_expediente', label: 'Caratula' },
    { id: 'fecha_del_hecho', label: 'Fecha del hecho', type: 'date' },
    { id: 'fecha_de_compurgamiento_inicial', label: 'Compurgamiento', type: 'date' },
    { id: 'condenado', label: 'Condenado', type: 'boolean' },
]


/*
async function getCausas(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`)
    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}*/

export default function Page(){

    const [data, setData] = useState(null);
    async function fetchData() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`);
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
        fetchData()
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    /*const data = null
    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`;
        fetchData(apiUrl)
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []);*/

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
        <>

            <Box mb={3}>
                <TituloComponent titulo='Causas' newEntry={'/expedientes/crear'}/>
            </Box>
            <Paper>
                <Box>
                    <Box p={3}>
                        <FiltrosTables />
                    </Box>
                    <CustomTable
                        headers={header}
                        data={data}
                        showId={true}
                        options={{
                            rowsPerPageCustom:10,
                            deleteOption: false,
                            pagination: true,
                            targetURL: '/expedientes'
                        }}
                    />
                </Box>
            </Paper>
        </>
    )
}