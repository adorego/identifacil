'use client'

import * as React from 'react'
import {useState} from "react";
import {libertadType} from "@/components/utils/penalesType";
import {handleInputChange} from "@/components/utils/formUtils";
import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";

const initialDataForm = {
    id: 0,
    nroOficio: "",
    fechaOficio: "",
    fechaLibertad: "",
    fechaCompurgamiento: "",
    tipoLibertad: "",
    comentarios: "",
    adjunto: "",
}

export default function FormLibertades(){
    const [datosFormulario, setDatosFormularios] = useState<libertadType>(initialDataForm);

    const handleChange = (event : any) => {
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handleSubmit = () => {
        console.log(datosFormulario)
    }
    return(
        <Box p={3}>
            <Typography variant='h6' >Datos de libertad</Typography>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Nro de ofocio"
                        variant="outlined"
                        value={datosFormulario.nroOficio}
                        name="nroOficio"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha oficio"
                        variant="outlined"
                        value={datosFormulario.fechaOficio}
                        name="fechaOficio"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha compurgamiento"
                        variant="outlined"
                        value={datosFormulario.fechaCompurgamiento}
                        name="fechaCompurgamiento"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha libertad"
                        variant="outlined"
                        value={datosFormulario.fechaLibertad}
                        name="fechaLibertad"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Tipo de libertad"
                        variant="outlined"
                        value={datosFormulario.tipoLibertad}
                        name="tipoLibertad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Comentarios"
                        variant="outlined"
                        value={datosFormulario.comentarios}
                        name="comentarios"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Adjuntar archivos"
                        variant="outlined"
                        value={datosFormulario.adjunto}
                        name="adjunto"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
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