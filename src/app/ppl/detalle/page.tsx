'use client'

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Breadcrumbs, Grid, Link, Step, StepLabel, Stepper} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import DataTableComponent from "../../../components/blocks/DataTableComponent";
import {Tabs, Tab} from "@mui/material";
import DataVizWidget from "../../../components/blocks/DataVizWidget";
import CardBlock from "../../../components/blocks/CardBlock";
import SimpleTable from "../../../components/blocks/SimpleTable";
import DocumentosJudicialesTable from "./DocumentosJudicialesTable";
import ProximasAudicienciasTable from "./ProximasAudicienciasTable";


const steps = [
    'Reconocimiento',
    'Datos Personales',
    'Cuestionarios',
];


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Detalle() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <Typography variant='h4' mt={0} >PPL</Typography>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Gestion de PPL
                </Link>
                <Typography color="text.primary">Juan Jose Perez Gomez</Typography>
            </Breadcrumbs>

            {/* Header */}
            <Grid container sx={{
                bgcolor: "#FFF",
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                marginTop: '20px',
            }}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container m={2}>
                                <Grid item xs={2}>
                                    <div className='imageContainer' m={2}></div>
                                </Grid>
                                <Grid item xs={10} sx={{bgColor: 'red',}}>
                                    <Typography variant="overline" display="block" mb={0}>
                                        Nombre y apellido
                                    </Typography>
                                    <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                        Juan Jos Perez Gomez (Jose'i)
                                    </Typography>
                                    <Grid container mt={1} spacing={2}>
                                        <Grid item>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Estado Procesal
                                            </Typography>
                                            <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                Condenado
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Fecha de ingreso
                                            </Typography>
                                            <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                01/01/2023
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Penitenciaria
                                            </Typography>
                                            <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                Minga Guazu
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid className="tabProfileNavigator" container sx={{
                        borderTop: '1px solid #e0e0e0',
                    }}>
                        <Grid xs={4}></Grid>
                        <Grid xs={8} item>
                            <Box sx={{width: '100%'}}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Perfil" {...a11yProps(0)} />
                                        <Tab label="Informacion" {...a11yProps(1)} />
                                        <Tab label="Datos Penales" {...a11yProps(2)} />
                                        <Tab label="Fotografias" {...a11yProps(2)} />
                                        <Tab label="Documentos" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* widgets */}
            <Grid container mt={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid className='cardContainer'>
                                <Grid container spacing={2}>
                                    <DataVizWidget />
                                    <DataVizWidget />

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid className='cardContainer'>
                                <Typography>Visitas este mes</Typography>
                                <Typography variant={'h4'}>120</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container mt={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid className='cardContainer' px={0} py={0} sx={{}}>
                                <Typography variant={"h6"} mb={2} px={2} pt={2}>Ultimos documentos judiciales</Typography>
                                <DocumentosJudicialesTable />

                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid className='cardContainer' px={0} py={0} sx={{}}>

                                        <Typography variant={"h6"} mb={2} px={2} pt={2}>Proximas audiencias</Typography>
                                        <ProximasAudicienciasTable />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}