'use client'

import * as React from 'react'
import {useState} from "react";
import {libertadesType} from "@/components/utils/penalesType";
import {Button, Grid, Stack, TextField, Typography} from "@mui/material";
import {handleInputChange} from "@/components/utils/formUtils";


const initData = {
    nroOficio: '',
    fechaOficio: '',
    caratula: '',
    fechaLibertad: '',
    fechaCompurgamiento: '',
    tipoLibertad: '',
    comentarios: '',
    adjunto: '',
}

export default function FormLibertades(){

    const [formState, setFormState] = useState<libertadesType>(initData)

    const handleChange = (event : any) => {
        handleInputChange(event, formState, setFormState);
    };

    const handleSubmit = () => {
        console.log(formState)
    }


    return(
        <>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Datos de libertad otorgada
                    </Typography>
                </Grid>

                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Nro. oficio"
                        variant="outlined"
                        value={formState.nroOficio}
                        name="nroOficio"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha del oficio"
                        variant="outlined"
                        value={formState.fechaOficio}
                        name="fechaOficio"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha de libertad"
                        variant="outlined"
                        value={formState.fechaLibertad}
                        name="fechaLibertad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha compurgamiento"
                        variant="outlined"
                        value={formState.fechaCompurgamiento}
                        name="fechaCompurgamiento"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Tipo libertad"
                        variant="outlined"
                        value={formState.tipoLibertad}
                        name="tipoLibertad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Comentarios"
                        variant="outlined"
                        value={formState.comentarios}
                        name="comentarios"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Adjuntar oficio"
                        variant="outlined"
                        value={formState.adjunto}
                        name="adjunto"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' onClick={handleSubmit}>Guardar</Button>
                        <Button variant='outlined'>Cancelar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}