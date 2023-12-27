'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Breadcrumbs, Grid, Link, Stack, Box} from "@mui/material";
import {Tabs, Tab} from "@mui/material";
import {TabContext} from "@mui/lab";
import CustomTable from "@/components/CustomTable";
import {proximaAudienciaData, visitaData} from "@/app/dummyData/data";
import NestedInformacionPreso from "./NestedInformacionPreso";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const audienciasDummy = proximaAudienciaData();
const visitaDummy = visitaData();


function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 0, mt: '20px'}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Page({ params }: { params: { id: number } }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Typography variant='h4' mt={0}>PPL</Typography>

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

            <TabContext value={value}>

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
                                    <Grid item sm={6}>
                                        <Stack direction='row'>
                                            <div className='imageContainer' m={2} sx={{marginRight: '40px'}}>

                                                <img
                                                    src='https://source.unsplash.com/collection/1118917/480x480'
                                                    alt=''
                                                    loading="lazy"
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: '10px',
                                                    }}
                                                />
                                            </div>
                                            <Stack
                                                justifyContent='center'
                                                sx={{}}
                                                marginLeft={2}>
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
                                                        <Typography variant="body1" display="block"
                                                                    sx={{fontWeight: '600',}}>
                                                            Condenado
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="overline" display="block" mb={0}>
                                                            Fecha de ingreso
                                                        </Typography>
                                                        <Typography variant="body1" display="block"
                                                                    sx={{fontWeight: '600',}}>
                                                            01/01/2023
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="overline" display="block" mb={0}>
                                                            Penitenciaria
                                                        </Typography>
                                                        <Typography variant="body1" display="block"
                                                                    sx={{fontWeight: '600',}}>
                                                            Minga Guazu
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Stack>
                                        </Stack>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid className="tabProfileNavigator" container sx={{
                            borderTop: '1px solid #e0e0e0',
                        }}>

                            <Grid xs={12} item>
                                <Stack alignItems="flex-end">
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>

                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Perfil" {...a11yProps(0)} />
                                            <Tab label="Información" {...a11yProps(1)} />
                                            <Tab label="Datos penales" {...a11yProps(2)} />
                                            <Tab label="Fotografias" {...a11yProps(3)} />
                                            <Tab label="Documentos" {...a11yProps(4)} />
                                        </Tabs>
                                    </Box>


                                </Stack>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* widgets */}
                {/*<Grid container mt={2}>
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
                </Grid>*/}

                {/* Tablas */}
                <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>

                            {/*<DocumentosJudicialesTable />*/}

                            <CustomTable options={{
                                title: 'Ultimos documentos judiciales/penales/etc',
                                targetURL: '/',
                                rowsPerPageCustom: 10,
                                expandedList: '/'
                            }}/>

                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                {/*<ProximasAudicienciasTable />*/}
                                <CustomTable
                                    data={audienciasDummy.data}
                                    headers={audienciasDummy.header}
                                    options={{
                                        title: 'Proximas audiencias',
                                        rowsPerPageCustom: 3,
                                        expandedList: '/',
                                        targetURL: '/',
                                    }}
                                />
                            </Box>
                            <Box mt={2}>
                                <CustomTable
                                    data={visitaDummy.data}
                                    headers={visitaDummy.header}
                                    options={{
                                        title: 'Ultimas visitas',
                                        rowsPerPageCustom: 3,
                                        expandedList: '/',
                                        targetURL: '/',
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>

                    <NestedInformacionPreso/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    Item Three
                </CustomTabPanel>
            </TabContext>
        </Box>
    )
}