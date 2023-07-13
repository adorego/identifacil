'use client'

import * as React from 'react';

import {CircularProgress, Paper} from "@mui/material";
import {dataBajas, dataSalidasEspeciales, dataTraslados} from "@/app/dummyData/movimientosDummyData";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import FiltrosTables from "../components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";

const headers = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre y apellido' },
    { id: 'salidaFecha', label: 'Fecha salida' },
    { id: 'entradaFecha', label: 'Fecha entrada' },
    { id: 'estado', label: 'Estado' },
]

export default function Ppl() {
    const [data, setData] = useState(null);


    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/salidasTransitorias');
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
        <div>
            <TituloComponent titulo='Salidas transitorias' url=''/>
            <Box mt={3}>
                <Paper elevation={1}>
                    <Box p={3}>
                        <FiltrosTables/>
                    </Box>
                    <CustomTable headers={headers} data={data} showId={true} options={{
                        pagination: true,
                        deleteOption: true,
                        rowsPerPageCustom: 5,
                        targetURL: '/movimientos/salidasTransitorias',

                    }}/>
                </Paper>
            </Box>

        </div>
    )
}