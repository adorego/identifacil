'use client'

import * as React from 'react';

import {CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import FiltrosTables from "../components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";
import { dataSalidasEspeciales } from "@/app/dummyData/movimientosDummyData";

export default function Ppl() {
    const [data, setData] = useState(null);

    // Datos Dummy
    const dummySalidasEspeciales = dataSalidasEspeciales();

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5001/traslados');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // const data = await response.json();
            // return data
            return await response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud fetch:', error);
            return null; // o manejar el error de manera adecuada
        }
    }

    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData()
            .then(fetchedData => {

                setData(fetchedData);
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez


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

    return (
        <Box>
            <Box mb={3}>
                <TituloComponent titulo='Salidas especiales' url='/movimientos/salidasEspeciales' newEntry='/movimientos/salidasEspeciales/crear' />
            </Box>
            <Paper elevation={1}>
                <Box p={3}>
                    <FiltrosTables/>
                </Box>
                <CustomTable
                    data={dummySalidasEspeciales.data}
                    headers={dummySalidasEspeciales.header}
                    showId={true}
                    options={{

                        targetURL: '/movimientos/salidasEspeciales',
                        rowsPerPageCustom: 5,
                        pagination: true,
                        deleteOption: true,
                    }}
                />
            </Paper>


        </Box>
    )
}