'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
    Breadcrumbs, Button,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem, Stack,
    Step,
    StepLabel,
    Stepper,
    TextField
} from "@mui/material";
import DataTableComponent from "../../../components/blocks/DataTableComponent";
import QueryBlock from "../../../components/blocks/QueryBlock";
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
import CustomTable from "../../../components/CustomTable";
import FiltrosTables from "./components/filtrosTables";
import SalidasTransitorias from "./salidasTransitorias/SalidasTransitorias";
import {dataBajas, dataSalidasEspeciales, dataTraslados} from "../../dummyData/movimientosDummyData";
import tabTitle from "./components/tabTitle";
import TabTitle from "./components/tabTitle";



export default function Ppl() {
    const [value, setValue] = React.useState('1');
    const [tabName, settabName] = React.useState('Traslados');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        settabName(event.target.name);
        setValue(newValue);
    };


    // Datos Dummy
    const dummyBajas = dataBajas();
    const dummySalidasEspeciales = dataSalidasEspeciales();
    const dummyTraslados = dataTraslados();

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
                                                    label="Bajas"
                                                    name="Bajas"
                                                    value="4"/>
                                            </TabList>
                                        </Box>

                                        <TabPanel value="1" sx={{paddingTop:'20px',}}>
                                            <Grid container spacing={2}>
                                                <Grid item sx={{
                                                    width: '100%',
                                                    marginTop: '20px',
                                                }}>

                                                    <TabTitle tabName={tabName} targetURL={'/movimientos/traslados'} />
                                                    {/*Elemento de tabla de traslados filtros */}
                                                    <FiltrosTables />

                                                    {/* Elemento Tabla de Traslado*/}
                                                    <Grid item sx={{
                                                        width: '100%',
                                                        marginTop: '20px',
                                                    }}>
                                                        <CustomTable
                                                            data={dummyTraslados.data}
                                                            headers={dummyTraslados.header}
                                                            options={{
                                                                targetURL: '/movimientos/traslados',
                                                                rowsPerPageCustom: 5,
                                                                pagination:true,
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
                                                    <SalidasTransitorias />
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