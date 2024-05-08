'use client'
import {API_REGISTRO} from '@/../config'
import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";


import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";

const header = [
    {id: 'id', label: 'id'},
    {id: 'numeroDeExpediente', label: 'Nro. expediente'},
    {id: 'caratula_expediente', label: 'Caratula'},
    {id: 'fecha_del_hecho', label: 'Fecha del hecho', type: 'date'},
    {id: 'fecha_de_compurgamiento_inicial', label: 'Compurgamiento', type: 'date'},
    {id: 'condenado', label: 'Condenado', type: 'boolean'},
]


/*
async function getCausas(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`)
    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}*/

export default function Page() {

    const [data, setData] = useState(null);
    const [dataFiltrado, setDataFiltrado] = useState(null);

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


    const onHandleFiltro = (value: any) => {
        setDataFiltrado(value)
    }
    const listaDeItemBread = [
        {nombre:'Expedientes judiciales', url:'', lastItem: true},
    ];
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
        <>

            <Box mb={3}>
                <TituloComponent  titulo='Expedientes judiciales' newEntry={'/expedientes/crear'}>
                    <BreadCrumbComponent listaDeItems={listaDeItemBread} />
                </TituloComponent>
            </Box>
            <Paper>
                <Box>
                    <Box p={3}>
                        <FiltrosTables
                            placeholderSearchBar="Buscar por número de expediente..."
                            fecha_inicial="Fecha hecho desde"
                            fecha_final="Fecha hecho hasta"
                            dateSearchField='fecha_del_hecho'
                            searchField='numeroDeExpediente'
                            dataSinFiltro={data} handleFiltro={onHandleFiltro}/>
                    </Box>
                    <CustomTable
                        headers={header}
                        data={dataFiltrado ? dataFiltrado : data}
                        showId={true}
                        options={{
                            rowsPerPageCustom: 10,
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