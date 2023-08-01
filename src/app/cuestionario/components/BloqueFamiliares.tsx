import * as React from "react";
import Box from "@mui/material/Box";

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";


export default function BloqueFamiliares (){

    return(
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">¿Es la cabeza de familia/sustento de la familia?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoLiderFamilia"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">Círculo Familiar:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoLiderFamilia"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoNombreMiembroFamilia">Nombre y apellido</InputLabel>
                                    <OutlinedInput
                                        id="datoNombreMiembroFamilia"
                                        defaultValue=""
                                        label="Nombre y apellido"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoVinculoFamiliar">Vinculo</InputLabel>
                                    <OutlinedInput
                                        id="datoVinculoFamiliar"
                                        defaultValue=""
                                        label="Vinculo"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoVinculoSistema">Vinculo con el sistema penitenciario</InputLabel>
                                    <OutlinedInput
                                        id="datoVinculoSistema"
                                        defaultValue=""
                                        label="Vinculo con el sistema penitenciario"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoLugar">Lugar</InputLabel>
                                    <OutlinedInput
                                        id="datoLugar"
                                        defaultValue=""
                                        label="Lugar"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" startIcon={<PersonAddIcon />}>
                                    Agregar familiar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* CONCUBINO */}
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">Concubino</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoLiderFamilia"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="concubinoDocumento">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        id="concubinoDocumento"
                                        defaultValue=""
                                        label="Nro. de documento"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoNombreConcubino">Nombre</InputLabel>
                                    <OutlinedInput
                                        id="datoNombreConcubino"
                                        defaultValue=""
                                        label="Nombre"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoApellidoConcubino">Apellido</InputLabel>
                                    <OutlinedInput
                                        id="datoApellidoConcubino"
                                        defaultValue=""
                                        label="Apellido"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Hijos */}
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datosHijos">Hijos:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datosHijos"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="nombreHijo">Nombre del hijo/a</InputLabel>
                                    <OutlinedInput
                                        id="nombreHijo"
                                        defaultValue=""
                                        label="Nombre del hijo/a"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoNombreConcubino">Edad</InputLabel>
                                    <OutlinedInput
                                        id="datoEdadHijo"
                                        defaultValue=""
                                        label="Edad"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoLugarSistemaHijo">Lugar(Dentro del sistema penitenciario</InputLabel>
                                    <OutlinedInput
                                        id="datoLugarSistemaHijo"
                                        defaultValue=""
                                        label="Lugar(Dentro del sistema penitenciario"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" startIcon={<PersonAddIcon />}>
                                    Agregar familiar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}