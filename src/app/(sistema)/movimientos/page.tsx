'use client'

import * as React from 'react';

import {
    Breadcrumbs, Button, CircularProgress,
    FormControl,
    Grid,
} from "@mui/material";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomTable from "../../../components/CustomTable";
import FiltrosTables from "./components/filtrosTables";
import Page from "./salidasTransitorias/[id]/page";
import {dataBajas, dataSalidasEspeciales, dataTraslados} from "../../dummyData/movimientosDummyData";
import tabTitle from "./components/tabTitle";
import TabTitle from "./components/tabTitle";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";

const header = [
    { id: "id", label: "id" },
    { id: "documento" , label: "documento" },
    { id: "fechaDocumento" , label: "fechaDocumento" },
    { id: "fechaTraslado" , label: "fechaTraslado" },
    { id: "autorizo" , label: "autorizo" },
    { id: "motivoTraslado" , label: "motivoTraslado" },
    { id: "medidasSeguridad" , label: "medidasSeguridad" },
    { id: "descripcionMotivo" , label: "descripcionMotivo" },
    { id: "custodia" , label: "custodia" },
    { id: "chofer" , label: "chofer" },
    { id: "chapaVehiculo" , label: "chapaVehiculo" },
    { id: "modeloVehiculo" , label: "modeloVehiculo" },
    { id: "destinoTraslado" , label: "destinoTraslado" },
    { id: "documentoAdjunto" , label: "documentoAdjunto" },
    { id: 'ppl', label: "PPLs"}
]

const header2 = [
    { id: 'id', label: 'ID' },
    { id: 'documento', label: 'Nro. documento' },
    { id: 'fechaDocumento', label: 'Fecha Documento' },
    { id: 'fechaTraslado', label: 'Fecha Traslado' },
    { id: 'destinoTraslado', label: 'Destino' },
]

export default function Ppl() {
    const [value, setValue] = React.useState('1');
    const [tabName, settabName] = React.useState('Traslados');
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);



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

    const handleFitros = (value : any) =>{
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
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <TituloComponent titulo='Movimiento' url='' />

            {/*<QueryBlock/>*/}

            <Grid container>
                <Grid item sm={12} mt={4}>
                    <div className='cardContainer'>
                        <Grid container spacing={2}>


                            {/* Elemento de Tabulador */}
                            <Grid item xs={12}>
                                <Box sx={{width: '100%'}}>
                                    <TabContext value={value}>
                                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                            {/*<TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab
                                                    label="Traslados"
                                                    name="Traslados"
                                                    value="1"/>
                                                <Tab
                                                    label="Salidas especiales"
                                                    name="Salidas especiales"
                                                    value="2"/>
                                                <Tab
                                                    label="Salidas transitorias"
                                                    name="Salidas transitorias"
                                                    value="3"/>
                                                <Tab
                                                    label="Bajas"
                                                    name="Bajas"
                                                    value="4"/>
                                            </TabList>*/}
                                        </Box>

                                        <TabPanel value="1" sx={{paddingTop:'20px',}}>
                                            <Grid container spacing={2}>
                                                <Grid item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>

                                                    <TabTitle tabName={tabName} targetURL={'/movimientos/traslados/crear'} />
                                                    {/*Elemento de tabla de traslados filtros */}
                                                    <FiltrosTables dataSinFiltro={data} handleFiltro={handleFitros}/>

                                                    {/* Elemento Tabla de Traslado*/}
                                                    <Grid item sx={{
                                                        width: '100%',
                                                        marginTop: '20px',
                                                    }}>
                                                        <CustomTable
                                                            data={filterData? filterData : data}
                                                            headers={header2}
                                                            showId={true}
                                                            options={{

                                                                targetURL: '/movimientos/traslados',
                                                                rowsPerPageCustom: 5,
                                                                pagination:true,
                                                                deleteOption: true,

                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </TabPanel>


                                        <TabPanel value="2">
                                            <Grid container spacing={2}>
                                                <Grid item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    {/* Elemento Tabla de Salidas Especiales*/}
                                                    <TabTitle tabName={tabName} targetURL={'/movimientos/salidasEspeciales'} />
                                                    <FiltrosTables />
                                                    <Grid item sx={{
                                                        width: '100%',
                                                        marginTop: '20px',
                                                    }}>
                                                        <CustomTable
                                                            data={dummySalidasEspeciales.data}
                                                            headers={dummySalidasEspeciales.header}
                                                            options={{
                                                                targetURL: '/movimientos/salidasEspeciales',
                                                                rowsPerPageCustom: 5,
                                                                pagination:true,
                                                                deleteOption: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="3">
                                            <Grid container spacing={2}>
                                                {/*<Grid item sx={{width: '100%', marginTop: '20px',}}>
                                                    <FiltrosTables />
                                                </Box>*/}
                                                <Grid item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    <TabTitle tabName={tabName}  />
                                                    <Page />
                                                    {/*<CustomTable data={dataTransitorias} headers={headersTransitorias} targetURL={'/movimientos/salidasTransitorias'}/>*/}
                                                </Grid>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="4">
                                            <Grid container spacing={2}>
                                                <Grid item sx={{width: '100%', marginTop: '20px',}}>
                                                    <TabTitle tabName={tabName} targetURL={'/movimientos/bajas'} />
                                                    <FiltrosTables />
                                                </Grid>
                                                <Grid item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    <CustomTable
                                                        data={dummyBajas.data}
                                                        headers={dummyBajas.header}

                                                        options={
                                                        {
                                                            rowsPerPageCustom: 3,
                                                            title: 'Por motivo de medida',
                                                            targetURL: '/movimientos/bajas',
                                                            deleteOption: true,
                                                            pagination: true
                                                        }
                                                        }
                                                        />
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </Grid>


                            {/* fin del contenedor*/}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}