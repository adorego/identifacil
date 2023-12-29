'use client'

import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import {Box, CircularProgress, Paper} from "@mui/material";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";


const header = [
    { id: 'caratula', label: 'Caratula' },
    { id: 'nroCausa', label: 'Nro. de la causa' },
    { id: 'hechoPunible', label: 'Hecho punible' },
    { id: 'compurgamiento', label: 'Compurgamiento' },
    { id: 'situacionProcesal', label: 'Situación procesal' },
]

const ENDPOINT = 'http://localhost:5000/causas'
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
        <>
            <Box mb={3}>
                <TituloComponent titulo='Causas' newEntry={'/datos-penales/causas/crear'}/>
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
                            targetURL: '/datos-penales/causas'
                        }}
                    />
                </Box>
            </Paper>
        </>
    )
}