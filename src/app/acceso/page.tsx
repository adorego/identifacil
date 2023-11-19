'use client'

import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
    Box, Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select, Stack,
    TextField,
    Typography
} from "@mui/material";

export default function Page() {

    return (
        <Box>
            <Paper elevation={1} sx={{p: '20px'}}>
                <Typography variant='h5' sx={{
                    fontWeight: '700',
                }}>
                    Registro de Acceso
                </Typography>
                <Divider sx={{mt: '10px',}}/>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm='2' sx={{borderRight: '1px solid lightgray' }}>
                        <Box sx={{
                            bgcolor: 'lightgray',
                            borderRadius: '10px',
                            width: '150px',
                            height: '150px',
                            margin: 'auto'
                        }}>

                        </Box>
                    </Grid>
                    <Grid item sm='10' sx={{

                        background: '#FFF !important',
                    }}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
                                    Datos adicionales
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl fullWidth variant="outlined">

                                    <TextField
                                        margin="normal"
                                        label="Tipo de visita"
                                        value=""
                                        name="email"
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
                                    PPL a visitar
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    label="Número de documento"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
                                    Datos PPL a visitar
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    label="Nombre"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    label="Apellido"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Apodo"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Nacionalidad"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Tipo doc"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Nro. documento"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Sexo"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Estado civil"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Fecha nacimiento"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <TextField
                                    margin="normal"
                                    label="Edad"
                                    value=""
                                    name="email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={12} mt={2}>
                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained'>
                                        Siguiente
                                    </Button>
                                    <Button variant='outlined'>
                                        Atras
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Confirmacion block*/}
                {/*<Box mt={2} textAlign='center'>
                    <Box sx={{
                        color: 'green'
                    }}>
                        <CheckIcon fontSize='large'/>
                    </Box>
                    <Typography variant='h6'>
                        Entrada Aprobada
                    </Typography>
                    <div>
                        Motivo:  Visitante PPL
                    </div>
                    <div>Entrada - Fecha y hora: 21/06/2023</div>
                    <div>Salida - Fecha y hora: ----</div>
                    <div>Persona Autorizada: Juan Jose Gonzalez Martinez</div>
                    <div>PPL a visitar: Roberto Javier Cabriza Lopez</div>
                </Box>*/}
            </Paper>

        </Box>
    )
}