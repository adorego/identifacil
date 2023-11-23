'use client'

import * as React from 'react';
import {Box, CircularProgress} from "@mui/material";
import CustomTable from "../../../../components/CustomTable";
import {useEffect, useState} from "react";

export default function Page(){

    const [data, setData] = useState(null);

    // Datos para armar el header de la tabla
    const header = [
        { id: 'id', label: 'ID' },
        { id: 'descripcion', label: 'Descripcion' },
    ]

    async function fetchData() {
        // TODO: Si viene vacio o da error no mostrar la tabla por que explota
        try {
            const response = await fetch('http://localhost:5000/motivosTraslados');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
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

    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return(

        <Box>
            {console.log(data)}
            <Box mt={4}>
                <CustomTable
                    showId={true}
                    headers={header}
                    data={data}
                    options={{
                        title: 'Motivos de traslado',
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/motivos-traslado/crear',
                        targetURL:`/sistema/motivos-traslado/`,
                    }}
                />

            </Box>

        </Box>
    )
}