import CardBlock from "../../../components/blocks/CardBlock";
import {Box, Card, CardContent, CardMedia, Grid, Paper, Typography} from "@mui/material";
import ingresosIMG from '../../../common/acceso-ppl.png';
import penalesIMG from '../../../common/control-ppl.png';
import trasladosIMG from '../../../common/traslados.png';
import Link from "next/link";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CardReport from "@/components/blocks/cardReport";
const styles = {
    databox: {
        textAlign: 'center',
        border: '1px solid lightgray',
        borderRadius: '10px',
        marginRight: '10px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'Center',
        background: '#FFF',
    }
}

export default function Page() {

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
                                    <Typography variant='h5'>
                                        Parte diario
                                    </Typography>
                                    <Grid container mt={3}>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Typography variant='h3'>1500</Typography>
                                                Capacidad total
                                            </Box>

                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Typography variant='h3'>1500</Typography>
                                                Condenados
                                            </Box>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Typography variant='h3'>1500</Typography>
                                                Procesados
                                            </Box>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Box sx={styles.databox}>
                                                <Typography variant='h3'>1500</Typography>
                                                En transito
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
                            <CardReport nombre='Reporte de ingreso' link='/informes/ingresos' icon={<SwapHorizIcon fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de traslados' link='/informes/traslados' icon={<SwapHorizIcon fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de visitas' link='/informes/visitas' icon={<SwapHorizIcon fontSize='large'/>} />
                        </Grid>
                        <Grid item sm={3}>
                            <CardReport nombre='Reporte de Bajas' link='/informes/ingresos' icon={<SwapHorizIcon fontSize='large'/>} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}