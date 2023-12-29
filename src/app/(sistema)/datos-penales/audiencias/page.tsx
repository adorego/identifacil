'use client'

import * as React from 'react'
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, CircularProgress, Paper} from "@mui/material";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

const header = [
    {id: 'nroOficio', label: 'Numero audiencia'},
    {id: 'causa', label: 'Caratula/Causa'},
    {id: 'formaDeAudiencia', label: 'Modalidad'},
    {id: 'fechaAudiencia', label: 'Fecha audiencia'},
    {id: 'estado', label: 'Estado'},
]

const ENDPOINT  = 'http://localhost:5000/audiencias'


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
            {console.log(data)}
            <TituloComponent titulo='Audiencias' />
            <Box mt={3}>
                <Paper>
                    <Box p={3}>
                        <FiltrosTables/>
                    </Box>
                    <Box>
                        <CustomTable
                            showId={true}
                            data={data}
                            headers={header}
                            options={{
                                deleteOption: false,
                                targetURL: '/datos-penales/audiencias',
                                pagination: true,
                                rowsPerPageCustom: 10,
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </>
    )
}