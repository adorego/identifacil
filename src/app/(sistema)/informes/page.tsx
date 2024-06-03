'use client'

import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import * as React from "react";
import {PeopleAlt, VerifiedUser, SyncAlt, WorkHistory} from "@mui/icons-material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CardReport from "@/components/blocks/cardReport";
import CheckEstablecimiento from "@/app/(sistema)/informes/components/checkEstablecimientos";
import EstablecimientoBox from "@/app/(sistema)/informes/components/EstablecimientoBox";
import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";

const styles = {
    databox: {
        textAlign: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        marginRight: '10px',
        height: '200px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFF',
    },
    iconBox: {
        background: 'rgb(0, 167, 111, .2)',
        width: '70px',
        height: '70px',
        color: '#00a76f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        marginBottom: '10px'
    }
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;



export default function Page() {
    const [datosCondenados, setDatosCondenados] = useState<any>({})
    const { data: session, status } = useSession();

    useEffect(() => {

        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    useEffect(() => {
        fetch(`${API_URL}/datos_penales/condenados_procesados`).then((res)=>{
            return res.json()
        }).then((data)=>{

            setDatosCondenados(data)
        }).catch((err:any)=>{
            console.log('Error obteniendo datos de condenados', err)
        })

    }, []);




    if (status === 'loading') {
        return(
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        <CircularProgress/>
                    </Box>
                </Box>
            </div>
        )
    }

    if (!session) {
        signIn();
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        Regirigiendo...
                    </Box>
                </Box>
            </div>
        )
    }

    // @ts-ignore
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Informes</h1>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Box>

                                <Box sx={{
                                    width: '100%',
                                    borderRadius: '10px',

                                }}>
                                    <Box>
                                        {/*<PenitenciariaFilter />*/}
                                    </Box>
                                    <Typography variant='h5' mt={3}>
                                        Parte diario
                                    </Typography>

                                    <Grid container mt={3}>
                                        <Grid item sm={4}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <PeopleAlt fontSize='large' color='inherit'/>
                                                </Box>
                                                <EstablecimientoBox />
                                            </Box>

                                        </Grid>
                                        <Grid item sm={4}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <VerifiedUser fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>
                                                        { datosCondenados.condenados ? datosCondenados.condenados : 'N/D'}
                                                    </Typography>
                                                    <Typography variant='h6'>
                                                        Condenados
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <WorkHistory fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>
                                                        { datosCondenados.procesados ? datosCondenados.procesados : 'N/D'}
                                                    </Typography>
                                                    <Typography variant='h6'>
                                                        Procesados
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                </Box>

                            </Box>
                        </Grid>
                        <Grid item sm={12} mt={4}>
                            <Typography variant='h5'>
                                Reportes
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <CardReport nombre='Reporte de ingreso' link='/informes/ingresos' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={4}>
                            <CardReport nombre='Reporte de traslados' link='/informes/traslados' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={4}>
                            <CardReport nombre='Reporte de visitas' link='/informes/visitas' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        {/*<Grid item sm={3}>
                            <CardReport nombre='Reporte de Bajas' link='/informes/ingresos' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>*/}
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}