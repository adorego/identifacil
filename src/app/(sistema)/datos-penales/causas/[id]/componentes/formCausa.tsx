'use client'

import * as React from 'react';
import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {handleInputChange} from "@/components/utils/formUtils";


const initialDataForm = {
    id: 0,
    nroCausa: '',
    ano: '',
    fechaAprension: '',
    caratula: '',
    hechoPunible: '',
    situacionProcesal: '',
    condenado: '',
    tiempoDeCondenaAnos: 0,
    compurgamiento: '',
    tiempoDeCondenaMeses: 0,
    anosExtrasDeCondenaPorMedidaDeSeguridad: false,
    anosDeCondenaPorMedidasDeSeguridad: 0,
    mesesDeCondenaPorMedidasDeSeguridad: 0,
    sentenciaDefinitiva: '',
    sentenciaDescripcion: '',
    fechaCompurgamientoCalculada: '',
    circunscripcion: '',
    secretaria: '',
    fechaHecho: '',
    juzgadoDeEjecucionOSentencia: '',
    nombreDelFamiliar: '',
    telefonoDelFamiliar: '',
    lugarHecho: '',
    linkDeNoticia: '',
    defensor: '',
    nombreDelDefensor: '',
    telefonoDelDefensor: ''

};


// TODO: Hacer completado de form cuando es update o /crear
export default function FormCausa(){
    const [datosFormulario, setDatosFormularios] = useState<CausaType>(initialDataForm);

    const handleChange = (event : any) => {
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handleSubmit = () => {
        console.log(datosFormulario)
    }

    return(

        <Box>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Datos de la causa
                    </Typography>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Nro. causa"
                        variant="outlined"
                        value={datosFormulario.nroCausa}
                        name="nroCausa"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Año causa"
                        variant="outlined"
                        value={datosFormulario.ano}
                        name="ano"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Fecha de aprension y detención"
                        variant="outlined"
                        value={datosFormulario.fechaAprension}
                        name="fechaAprension"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Caratula"
                        variant="outlined"
                        value={datosFormulario.caratula}
                        name="caratula"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Hecho punible"
                        variant="outlined"
                        value={datosFormulario.hechoPunible}
                        name="hechoPunible"
                        onChange={handleChange}/>
                </Grid>


                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Situación procesal"
                        variant="outlined"
                        value={datosFormulario.situacionProcesal}
                        name="situacionProcesal"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Años"
                        variant="outlined"
                        value={datosFormulario.tiempoDeCondenaAnos}
                        name="tiempoDeCondenaAnos"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Meses"
                        variant="outlined"
                        value={datosFormulario.tiempoDeCondenaMeses}
                        name="tiempoDeCondenaMeses"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="¿Cuentas con años extras de condena por medida de seguridad?"
                        variant="outlined"
                        value={datosFormulario.anosExtrasDeCondenaPorMedidaDeSeguridad}
                        name="anosExtrasDeCondenaPorMedidaDeSeguridad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Años"
                        variant="outlined"
                        value={datosFormulario.anosDeCondenaPorMedidasDeSeguridad}
                        name="anosDeCondenaPorMedidasDeSeguridad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Meses"
                        variant="outlined"
                        value={datosFormulario.mesesDeCondenaPorMedidasDeSeguridad}
                        name="mesesDeCondenaPorMedidasDeSeguridad"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Sentencia definitiva"
                        variant="outlined"
                        value={datosFormulario.sentenciaDefinitiva}
                        name="sentenciaDefinitiva"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        fullWidth
                        label="En caracter de"
                        variant="outlined"
                        value={datosFormulario.sentenciaDescripcion}
                        name="sentenciaDescripcion"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Compurgamiento inicial"
                        variant="outlined"
                        value={datosFormulario.compurgamiento}
                        name="compurgamiento"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Compurgamiento recalculado"
                        variant="outlined"
                        value={datosFormulario.fechaCompurgamientoCalculada}
                        name="fechaCompurgamientoCalculada"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Circuscrinpcion"
                        variant="outlined"
                        value={datosFormulario.circunscripcion}
                        name="circunscripcion"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Juzgado de tribunal de sentencia"
                        variant="outlined"
                        value={datosFormulario.juzgadoDeEjecucionOSentencia}
                        name="juzgadoDeEjecucionOSentencia"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Secretaria"
                        variant="outlined"
                        value={datosFormulario.secretaria}
                        name="secretaria"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Nombre de familiar (Notificar ingreso)"
                        variant="outlined"
                        value={datosFormulario.nombreDelFamiliar}
                        name="nombreDelFamiliar"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Teléfono del familiar"
                        variant="outlined"
                        value={datosFormulario.telefonoDelFamiliar}
                        name="telefonoDelFamiliar"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Fecha del hecho"
                        variant="outlined"
                        value={datosFormulario.fechaHecho}
                        name="fechaHecho"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Lugar del hecho"
                        variant="outlined"
                        value={datosFormulario.lugarHecho}
                        name="lugarHecho"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Link de la noticia"
                        variant="outlined"
                        value={datosFormulario.linkDeNoticia}
                        name="linkDeNoticia"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={12}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <Typography>Defensor</Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                label="Tipo defensor"
                                variant="outlined"
                                value={datosFormulario.defensor}
                                name="defensor"
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                label="Nombre del Defensor"
                                variant="outlined"
                                value={datosFormulario.nombreDelDefensor}
                                name="nombreDelDefensor"
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                label="Nombre del Defensor"
                                variant="outlined"
                                value={datosFormulario.telefonoDelDefensor}
                                name="telefonoDelDefensor"
                                onChange={handleChange}/>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item sm={12} mt={1}>
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button variant='outlined'>
                            Cancelar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>

    )
}