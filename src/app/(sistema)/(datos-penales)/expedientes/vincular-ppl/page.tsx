'use client'

import * as React from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

export default function Page(){


    return(
        <>
            <Box>
                <Typography variant='h5'>
                    Agregar PPL
                </Typography>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaAprension'
                                /*value={datosFormulario.fecha_de_aprehension ? dayjs(datosFormulario.fecha_de_aprehension) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fecha_de_aprehension: newValue,
                                        /!*                                   fecha_de_aprehension_modificado: true,*!/
                                    }))
                                }}*/
                                label="Fecha de aprension y detención"/>

                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <Stack spacing={2} direction='row' alignItems='center'>
                            <Typography variant='overline'>
                                Tiempo de condena:
                            </Typography>
                            <TextField
                                label="Meses"
                                variant="outlined"
                                name="tiempo_de_condena"
                                /*onChange={handleChange}*/
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1} alignItems={'end'}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="anhosDeExtraSeguridad">¿Cuentas con años extras de condena por medida de
                                seguridad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="anhosDeExtraSeguridad"
                                name="tiene_anhos_extra_de_seguridad"
                                /*onChange={handleBooleanChange}
                                value={datosFormulario.tiene_anhos_extra_de_seguridad}*/
                            >
                                <FormControlLabel value={false} control={<Radio/>} label="No"/>
                                <FormControlLabel value={true} control={<Radio/>} label="Si"/>


                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {/*{datosFormulario.tiene_anhos_extra_de_seguridad?*/}
                        <Grid item sm={2}>
                            <TextField
                                fullWidth
                                label="Meses"
                                variant="outlined"
                                /*value={datosFormulario.tiempo_de_seguridad}
                                onChange={handleChange}*/
                                name="tiempo_de_seguridad"
                            />
                        </Grid>
                        {/*: null}*/}
                    {/*<Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Años"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_seguridad}
                            name="anosDeCondenaPorMedidasDeSeguridad"
                            onChange={handleChange}/>
                    </Grid>*/}
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='compurgamiento'
                                /*value={datosFormulario.fecha_de_compurgamiento_inicial ? dayjs(datosFormulario.fecha_de_compurgamiento_inicial) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fecha_de_compurgamiento_inicial: newValue,
                                        fecha_de_compurgamiento_inicial_modificado: true,
                                    }))
                                }}*/
                                label="Compurgamiento inicial"/>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
