'use client'

import * as React from 'react';

import {
    CircularProgress,

    Grid, Paper,
} from "@mui/material";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomTable from "../../../../components/CustomTable";
import Page from "../salidasTransitorias/[id]/page";
import {dataBajas, dataSalidasEspeciales, dataTraslados} from "../../../dummyData/movimientosDummyData";
import TabTitle from "../components/tabTitle";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";

const header = [
    {id: "id", label: "id"},
    {id: "documento", label: "documento"},
    {id: "fechaDocumento", label: "fechaDocumento"},
    {id: "fechaTraslado", label: "fechaTraslado"},
    {id: "autorizo", label: "autorizo"},
    {id: "motivoTraslado", label: "motivoTraslado"},
    {id: "medidasSeguridad", label: "medidasSeguridad"},
    {id: "descripcionMotivo", label: "descripcionMotivo"},
    {id: "custodia", label: "custodia"},
    {id: "chofer", label: "chofer"},
    {id: "chapaVehiculo", label: "chapaVehiculo"},
    {id: "modeloVehiculo", label: "modeloVehiculo"},
    {id: "destinoTraslado", label: "destinoTraslado"},
    {id: "documentoAdjunto", label: "documentoAdjunto"},
    {id: 'ppl', label: "PPLs"}
]

const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'documento', label: 'Nro. documento'},
    {id: 'fechaDocumento', label: 'Fecha Documento'},
    {id: 'fechaTraslado', label: 'Fecha Traslado'},
    {id: 'destinoTraslado', label: 'Destino'},
]

export default function Ppl() {
    const [value, setValue] = React.useState('1');
    const [tabName, settabName] = React.useState('Traslados');
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        settabName(event.target.name);
        setValue(newValue);
    };

    // Datos Dummy
    const dummyBajas = dataBajas();
    const dummySalidasEspeciales = dataSalidasEspeciales();


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

    const handleFitros = (value) => {
        console.log(value)
        setFilterData(value)
    }

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

            <TituloComponent titulo='Traslados' url='asd' newEntry='traslados/crear'/>
            <Paper elevation={1} sx={{
                mt: '32px'
            }}>
                {/*<TabTitle tabName={tabName} targetURL={'/movimientos/traslados/crear'} />*/}
                {/*Elemento de tabla de traslados filtros */}
                <Box px={3} py={3}>
                    <FiltrosTables dataSinFiltro={data} handleFiltro={handleFitros}/>
                </Box>

                {/* Elemento Tabla de Traslado*/}
                <Box>
                    <CustomTable
                        data={filterData ? filterData : data}
                        headers={header2}
                        showId={true}
                        options={{

                            targetURL: '/movimientos/traslados',
                            rowsPerPageCustom: 5,
                            pagination: true,
                            deleteOption: true,

                        }}
                    />
                </Box>

            </Paper>
        </Box>
    )
}