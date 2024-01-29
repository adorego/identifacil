

import {Box, Grid, Typography} from "@mui/material";
import * as React from "react";
import {PeopleAlt, VerifiedUser, SyncAlt, WorkHistory} from "@mui/icons-material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CardReport from "@/components/blocks/cardReport";
import PenitenciariaFilter from "@/app/(sistema)/informes/components/penitenciariaFilter";
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

export default function Page() {

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
                                        <PenitenciariaFilter />
                                    </Box>
                                    <Typography variant='h5' mt={3}>
                                        Parte diario
                                    </Typography>

                                    <Grid container mt={3}>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <PeopleAlt fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>1.500</Typography>
                                                    <Typography variant='h6'>
                                                        Capacidad total
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <VerifiedUser fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>253</Typography>
                                                    <Typography variant='h6'>
                                                        Condenados
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <WorkHistory fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>1.270</Typography>
                                                    <Typography variant='h6'>
                                                        Procesados
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Box sx={styles.iconBox}>
                                                    <SyncAlt fontSize='large' color='inherit'/>
                                                </Box>
                                                <Box sx={{ textAlign: 'left', marginLeft: '20px'}}>
                                                    <Typography variant='h4' sx={{fontWeight: '700'}}>58</Typography>
                                                    <Typography variant='h6'>
                                                        En transito
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
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de ingreso' link='/informes/ingresos' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de traslados' link='/informes/traslados' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de visitas' link='/informes/visitas' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de Bajas' link='/informes/ingresos' icon={<SwapHorizIcon color='primary' fontSize='large'/>} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}