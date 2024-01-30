'use client'

import * as React from 'react'

import {Box, CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from "react";

import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";
import {fetchData} from "@/components/utils/utils";

const header = [
    {id: 'nroOficio', label: 'Nro. oficio'},
    {id: 'caratula', label: 'Caratula'},
    {id: 'fechaLibertad', label: 'Fecha libertad'},
    {id: 'tipoLibertad', label: 'Tipo libertad'},
]

const ENDPOINT = 'http://localhost:5000/causas'
export default function Page(){
    const [data, setData] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000' + '/libertades';

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
            <TituloComponent titulo='Libertades' />

            <Box mt={3}>
                <Paper elevation={1}>
                    <Box p={3}>
                        <FiltrosTables/>
                    </Box>
                    <CustomTable
                        data={data}
                        headers={header}
                        showId={true}
                        options={{
                            deleteOption: false,
                            targetURL: '/libertades',
                            rowsPerPageCustom: 5,
                            pagination: true,
                        }}
                    />
                </Paper>
            </Box>
        </>
    )
}