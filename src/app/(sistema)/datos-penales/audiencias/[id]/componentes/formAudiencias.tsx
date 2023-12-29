'use client'

import {Button, Grid, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {handleInputChange} from "@/components/utils/formUtils";
import * as React from "react";

const initialDataForm = {
    id: 0,
    causa: "",
    nroOficio: "",
    formaDeAudiencia: "",
    circunscripcion: "",
    juzgado: "",
    requiereTrasladoOtraInstitucion: false,
    medidasSeguridad: false,
    transitoAdministrativo: false,
    destinoAdministrativo: "",
    archivoJudicial: "",
    notaPedido: ""
}

// TODO: Hacer autocompletado cuando es upadte
export default function FormAudiencias(){
    const [datosFormulario, setDatosFormularios] = useState<audienciaType>(initialDataForm);

    const handleChange = (event : any) => {
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handleSubmit = () => {
        console.log(datosFormulario)
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Audiencia ####
                    </Typography>

                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Causa"
                        variant="outlined"
                        value={datosFormulario.causa}
                        name="nroCausa"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Nro de ofocio"
                        variant="outlined"
                        value={datosFormulario.nroOficio}
                        name="nroOficio"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Modalidad"
                        variant="outlined"
                        value={datosFormulario.formaDeAudiencia}
                        name="formaDeAudiencia"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Circuscripción judicial"
                        variant="outlined"
                        value={datosFormulario.circunscripcion}
                        name="circunscripcion"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Juzgado"
                        variant="outlined"
                        value={datosFormulario.juzgado}
                        name="juzgado"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="¿Requiere traslado a otra penitenciaria/institución?(Comparecencia)"
                        variant="outlined"
                        value={datosFormulario.requiereTrasladoOtraInstitucion}
                        name="requiereTrasladoOtraInstitucion"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="¿Requiere acompañamiento policial?(Comparecencia)"
                        variant="outlined"
                        value={datosFormulario.medidasSeguridad}
                        name="medidasSeguridad"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={8}>
                    <TextField
                        fullWidth
                        label="¿Requiere traslado a otra penitenciaria/institucion como transito administrativo?(Comparecencia)"
                        variant="outlined"
                        value={datosFormulario.transitoAdministrativo}
                        name="transitoAdministrativo"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Penitenciaria/Institucion (Comparecencia)"
                        variant="outlined"
                        value={datosFormulario.transitoAdministrativo}
                        name="transitoAdministrativo"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Oficio judicial de traslado"
                        variant="outlined"
                        value={datosFormulario.archivoJudicial}
                        name="archivoJudicial"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Oficio judicial de traslado"
                        variant="outlined"
                        value={datosFormulario.notaPedido}
                        name="notaPedido"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' onClick={handleSubmit}>Guardar</Button>
                        <Button variant='outlined' >Cancelar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}