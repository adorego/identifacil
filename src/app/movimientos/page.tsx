'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
    Breadcrumbs,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    TextField
} from "@mui/material";
import DataTableComponent from "../../components/blocks/DataTableComponent";
import QueryBlock from "../../components/blocks/QueryBlock";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomTable from "../../components/CustomTable";
import FiltrosTables from "./components/filtrosTables";



export default function Ppl() {
    const [value, setValue] = React.useState('1');
    const [tabName, settabName] = React.useState('Traslados');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        settabName(event.target.name);
        setValue(newValue);
    };


    // Datos para traslados
    const headersTraslados = [
        { id: 'id', label: 'ID' },
        { id: 'documento', label: 'Nro. documento' },
        { id: 'tipoTraslado', label: 'Tipo traslado' },
        { id: 'fechaTraslado', label: 'Fecha Traslado' },
        { id: 'destino', label: 'Destino' },
    ];
    const dataTraslados = [
        {id: 1, documento: '123456/1231', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 2, documento: '123456/1232', tipoTraslado: 'Expulsion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 3, documento: '123456/1233', tipoTraslado: 'Expulsion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 4, documento: '123456/1234', tipoTraslado: 'Extradicion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 5, documento: '123456/1235', tipoTraslado: 'Extradicion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 6, documento: '123456/1236', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 7, documento: '123456/1237', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 8, documento: '123456/1238', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 9, documento: '123456/1239', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 10, documento: '123456/12310', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        {id: 11, documento: '123456/12311', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
    ];

    // Datos para Salidas Transitorias
    const headersEspeciales = [
        { id: 'id', label: 'ID' },
        { id: 'tipoSalida', label: 'Tipo de salida' },
        { id: 'momentoSalida', label: 'Fecha y hora de salida' },
        { id: 'momentoEntrada', label: 'Fecha Traslado' },
        { id: 'destino', label: 'Destino' },
    ];
    const dataEspeciales = [
        {id: 1, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 2, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 3, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 4, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 5, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 6, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 7, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 8, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 9, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 10, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        {id: 11, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
    ];

    // Datos para Salidas Transitorias
    const headersTransitorias = [
        { id: 'id', label: 'ID' },
        { id: 'momentoSalida', label: 'Fecha y hora de salida' },
        { id: 'momentoEntrada', label: 'Fecha Traslado' },
        { id: 'estado', label: 'Estado' },
    ];
    const dataTransitorias = [
        {id: 1,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 2,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 3,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 4,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 5,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 6,  momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 7,  momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 8,  momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 9,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 10,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
        {id: 11,  momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', estado: 'completado', url: '/movimientos/salidaTransitoria'},
    ];

    // Datos para Salidas Extradiciones
    const headersExtradiciones = [
        { id: 'id', label: 'ID' },
        { id: 'nroDocumento', label: 'Nro. OJ' },
        { id: 'fechaTraslado', label: 'Fecha Traslado' },
        { id: 'destino', label: 'Destino' },
    ];
    const dataExtradiciones = [
        {id: 1,  nroDocumento: '12201/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 2,  nroDocumento: '12202/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 3,  nroDocumento: '12203/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 4,  nroDocumento: '12204/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 5,  nroDocumento: '12205/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 6,  nroDocumento: '12206/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 7,  nroDocumento: '12207/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 8,  nroDocumento: '12208/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 9,  nroDocumento: '12209/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 10,  nroDocumento: '12210/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        {id: 11,  nroDocumento: '12211/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
    ];

    return (
        <div>
            <h2>Movimientos</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Typography color="text.primary">Movimientos</Typography>
            </Breadcrumbs>

            <QueryBlock/>

            <Grid container>
                <Grid item sm={12} mt={4}>
                    <div className='cardContainer'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>
                                    {tabName}
                                </Typography>

                            </Grid>

                            {/* Elemento de Tabulador */}
                            <Grid item xs={12}>
                                <Box sx={{width: '100%'}}>
                                    <TabContext value={value}>
                                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
                                                    label="Extradicciones"
                                                    name="Extradicciones"
                                                    value="4"/>
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <Grid container spacing={2}>
                                                <Box item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    {/*Elemento de tabla de traslados filtros */}

                                                    <FiltrosTables />

                                                    {/* Elemento Tabla de Traslado*/}
                                                    <Box item sx={{
                                                        width: '100%',
                                                        marginTop: '20px',
                                                    }}>
                                                        <CustomTable data={dataTraslados} headers={headersTraslados} targetURL={'/movimientos/traslados'}/>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                        </TabPanel>


                                        <TabPanel value="2">
                                            <Grid container spacing={2}>
                                                <Box item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    {/* Elemento Tabla de Traslado*/}

                                                    <FiltrosTables />
                                                    <Box item sx={{
                                                        width: '100%',
                                                        marginTop: '20px',
                                                    }}>
                                                        <CustomTable data={dataEspeciales} headers={headersEspeciales} targetURL={'/movimientos/salidasEspeciales'}/>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="3">
                                            <Grid container spacing={2}>
                                                <Box item sx={{width: '100%', marginTop: '20px',}}>
                                                    <FiltrosTables />
                                                </Box>
                                                <Box item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    <CustomTable data={dataTransitorias} headers={headersTransitorias} targetURL={'/movimientos/salidasTransitorias'}/>
                                                </Box>

                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="4">
                                            <Grid container spacing={2}>
                                                <Box item sx={{width: '100%', marginTop: '20px',}}>
                                                    <FiltrosTables />
                                                </Box>
                                                <Box item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>
                                                    <CustomTable data={dataExtradiciones} headers={headersExtradiciones} targetURL={'/movimientos/extradiciones'}/>
                                                </Box>
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