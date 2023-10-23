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



export default function Ppl() {
    const [value, setValue] = React.useState('1');


    // Variables para el select
    const [condena, setCondena] = React.useState('');
    const [tabName, settabName] = React.useState('Traslados');
    const handleChangeCondena = (event: SelectChangeEvent) => {
        setCondena(event.target.value as string);

    };

    // Variables para selector de rango de fecha
    const [valueDateStart, setValueDateStart] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [valueDateEnd, setValueDateEnd] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        settabName(event.target.name);
        console.log(tabName);
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
        { id: 'momentoSalida', label: 'Fecha y hora de salida' },
        { id: 'momentoEntrada', label: 'Fecha Traslado' },
        { id: 'estado', label: 'Estado' },
    ];
    const dataExtradiciones = [
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

    return (
        <div>
            <h2>Movimientos - {condena}</h2>

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

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={3}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Condena</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={condena}
                                                                    label="Condena"
                                                                    onChange={handleChangeCondena}
                                                                >
                                                                    <MenuItem value={10}>Ten</MenuItem>
                                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    label="Fecha inicial"
                                                                    value={valueDateStart}
                                                                    onChange={(newValueDateStart) => setValueDateStart(newValueDateStart)}
                                                                    sx={{
                                                                        width:'100%',
                                                                    }}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    label="Fecha Final"
                                                                    value={valueDateEnd}
                                                                    onChange={(newValueDateEnd) => setValueDateEnd(newValueDateEnd)}
                                                                    sx={{
                                                                        width:'100%',
                                                                    }}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <TextField id="outlined-basic" label="Buscar por nombre o numero de ppl"
                                                                       variant="outlined" fullWidth/>
                                                        </Grid>
                                                    </Grid>

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
                                                    {/*Elemento de tabla de traslados filtros */}

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={3}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Condena</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={condena}
                                                                    label="Condena"
                                                                    onChange={handleChangeCondena}
                                                                >
                                                                    <MenuItem value={10}>Ten</MenuItem>
                                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    label="Fecha inicial"
                                                                    value={valueDateStart}
                                                                    onChange={(newValueDateStart) => setValueDateStart(newValueDateStart)}
                                                                    sx={{
                                                                        width:'100%',
                                                                    }}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    label="Fecha Final"
                                                                    value={valueDateEnd}
                                                                    onChange={(newValueDateEnd) => setValueDateEnd(newValueDateEnd)}
                                                                    sx={{
                                                                        width:'100%',
                                                                    }}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <TextField id="outlined-basic" label="Buscar por nombre o numero de ppl"
                                                                       variant="outlined" fullWidth/>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Elemento Tabla de Traslado*/}
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
                                            <Box item sx={{
                                                width: '100%',
                                                marginTop: '20px',
                                            }}>
                                                <CustomTable data={dataTransitorias} headers={headersTransitorias} targetURL={'/movimientos/salidasTransitorias'}/>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value="4">
                                            <Box item sx={{
                                                width: '100%',
                                                marginTop: '20px',
                                            }}>
                                                <CustomTable data={dataExtradiciones} headers={headersExtradiciones} targetURL={'/movimientos/extradiciones'}/>
                                            </Box>
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