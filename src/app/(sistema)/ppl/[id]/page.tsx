'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Grid, Stack, Box} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import defaultProfile from '@/common/blank-profile-picture-973460_960_720.webp';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NestedInformacionPreso from "./NestedInformacionPreso";
import TabDatosPersonales from "@/app/(sistema)/ppl/[id]/components/tabDatosPenales";
import TituloComponent from "@/components/titulo/tituloComponent";
import Image from "next/image";
import {useEffect} from "react";




export default function Page({ params }: { params: { id: string } }) {
    const [value, setValue] = React.useState('1');
    const [state, setState] = React.useState<{id: string}>({id: ''});

    useEffect(() => {
        setState({
            id: params.id,
        })
    }, [params.id]);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                <TituloComponent titulo='PPL' />
            </Stack>
             {/*@ts-ignore*/}

            <Grid container sx={{
                bgcolor: "#FFF",
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                marginTop: '20px',
            }}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid p={3} item sm={12}>
                            <Stack direction='row'>
                                <Box className='imageContainer' sx={{marginRight: '40px'}}>
                                    <Image
                                        src={defaultProfile.src}
                                        alt=''
                                        loading="lazy"
                                        width={'150'}
                                        height={'150'}
                                        style={{

                                            borderRadius: '10px',
                                        }}
                                    />
                                </Box>
                                <Stack direction='column' justifyContent='center'>
                                    <Grid container mt={1} spacing={2}>
                                        <Grid item m={0}>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Nombre y apellido
                                            </Typography>
                                            <Typography variant="body1" display="block" sx={{fontWeight: '600',}}>
                                                Juan Jos Perez Gomez (Josei)
                                            </Typography>
                                        </Grid>
                                        <Grid item pt={0}>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Estado Procesal
                                            </Typography>
                                            <Typography variant="body1" display="block"
                                                        sx={{fontWeight: '600',}}>
                                                Condenado
                                            </Typography>
                                        </Grid>
                                        <Grid item pt={0}>
                                            <Typography variant="overline" display="block" mb={0}>
                                                Fecha de ingreso
                                            </Typography>
                                            <Typography variant="body1" display="block"
                                                        sx={{fontWeight: '600',}}>
                                                01/01/2023
                                            </Typography>
                                        </Grid>
                                        <Grid item pt={0}>
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
                    {/*<Grid className="tabProfileNavigator" container sx={{
                            borderTop: '1px solid #e0e0e0',
                        }}>
                            <Grid xs={12} item>
                                <Stack alignItems="flex-end">
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Perfil" {...a11yProps(0)} />
                                            <Tab label="Información" {...a11yProps(1)} />
                                            <Tab label="Datos penales" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>*/}
                </Grid>
            </Grid>
            <Box mt={3}>
                <TabContext value={value}>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {/*<Tab label="Perfil" value="1" />*/}
                            <Tab label="Informaciones" value="1" />
                            <Tab label="Datos penales" value="2" />
                        </TabList>
                    </Box>

                    {/* Contenidos de tabs */}
                    <Box>
                        {/*<TabPanel value="1" sx={{p:'0'}}>
                            <Grid container mt={2} spacing={2}>
                                <Grid item xs={8}>

                                    <DocumentosJudicialesTable />

                                    <CustomTable options={{
                                        title: 'Ultimos documentos judiciales/penales/etc',
                                        targetURL: '/',
                                        rowsPerPageCustom: 10,
                                        deleteOption: false,
                                        pagination: false,
                                        expandedList: '/'
                                    }}/>

                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <ProximasAudicienciasTable />
                                        <CustomTable
                                            data={audienciasDummy.data}
                                            headers={audienciasDummy.header}
                                            options={{
                                                title: 'Proximas audiencias',
                                                rowsPerPageCustom: 3,
                                                deleteOption: false,
                                                pagination: false,
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
                                                deleteOption: false,
                                                expandedList: '/',
                                                pagination: false,
                                                targetURL: '/',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </TabPanel>*/}
                        <TabPanel value="1" sx={{p:'0'}}>
                            <NestedInformacionPreso datoID={state.id}/>
                        </TabPanel>
                        <TabPanel value="2" sx={{p:'0'}}>
                            <TabDatosPersonales />
                        </TabPanel>
                    </Box>
                </TabContext>
            </Box>

        </Box>
    )
}