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
import TrasladosTable from "./components/TrasladosTable";



export default function Ppl() {
    const [value, setValue] = React.useState('1');

    // Variables para el select
    const [condena, setCondena] = React.useState('');
    const handleChangeCondena = (event: SelectChangeEvent) => {
        setCondena(event.target.value as string);
    };

    // Variables para selector de rango de fecha
    const [valueDateStart, setValueDateStart] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [valueDateEnd, setValueDateEnd] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                                    Traslados
                                </Typography>

                            </Grid>

                            {/* Elemento de Tabulador */}
                            <Grid item xs={12}>
                                <Box sx={{width: '100%'}}>
                                    <TabContext value={value}>
                                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="Traslados" value="1"/>
                                                <Tab label="Salidas especiales" value="2"/>
                                                <Tab label="Salidas transitorias" value="3"/>
                                                <Tab label="Extradicciones" value="4"/>
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
                                                        <TrasladosTable />
                                                    </Box>
                                                </Box>
                                                <Grid item sm={3}>

                                                </Grid>
                                                <Grid item sm={3}>

                                                </Grid>
                                                <Grid item sm={3}>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>
                                        <TabPanel value="2">Item Two</TabPanel>
                                        <TabPanel value="3">Item Three</TabPanel>
                                        <TabPanel value="4">Item Four</TabPanel>
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