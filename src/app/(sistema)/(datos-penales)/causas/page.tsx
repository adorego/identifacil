'use client'

import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from "react";

import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";
import {fetchData} from "@/components/utils/utils";

const header = [
    { id: 'caratula', label: 'Caratula' },
    { id: 'nroCausa', label: 'Nro. de la causa' },
    { id: 'hechoPunible', label: 'Hecho punible' },
    { id: 'compurgamiento', label: 'Compurgamiento' },
    { id: 'situacionProcesal', label: 'Situación procesal' },
]

export default function Page(){

    const [data, setData] = useState(null);
    console.log('Causas:', data);
    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/causas`;
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
        <>
            <Box mb={3}>
                <TituloComponent titulo='Causas' newEntry={'/causas/crear'}/>
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
                            rowsPerPageCustom:5,
                            deleteOption: false,
                            pagination: true,
                            targetURL: '/causas'
                        }}
                    />
                </Box>
            </Paper>
        </>
    )
}