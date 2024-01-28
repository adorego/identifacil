'use client'

import * as React from 'react';

import {CircularProgress, Grid, Paper,} from "@mui/material";
import {dataBajas} from "@/app/dummyData/movimientosDummyData";
import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import FiltrosTables from "..//components/filtrosTables";
import {useEffect, useState} from "react";
import TituloComponent from "@/components/titulo/tituloComponent";

// Datos Dummy
const dummyBajas = dataBajas();

// TODO: Agregar campo de que ppl se da de baja
export default function Page() {

    const [data, setData] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/traslados');
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
            <TituloComponent titulo='Bajas' url='' newEntry='/movimientos/bajas/crear'/>

            <Box mt={3}>
                <Paper elevation={2}>
                    <Box p={3}>
                        <FiltrosTables/>
                    </Box>
                    <CustomTable

                        data={dummyBajas.data}
                        headers={dummyBajas.header}

                        options={
                            {
                                rowsPerPageCustom: 5,
                                targetURL: '/movimientos/bajas',
                                pagination: true,
                                deleteOption: true,
                            }
                        }
                    />
                </Paper>
            </Box>

        </Box>
    )
}