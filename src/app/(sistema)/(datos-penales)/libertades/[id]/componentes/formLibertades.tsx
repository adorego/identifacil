'use client'

import * as React from 'react'
import {useEffect, useState} from "react";

import {libertadesType} from "@/components/utils/penalesType";
import {Box, Button, CircularProgress, Grid, Stack, TextField, Typography} from "@mui/material";
import {handleInputChange} from "@/components/utils/formUtils";
import {fetchFormData} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";


const initData = {
    id: 0,
    nroOficio: '',
    fechaOficio: '',
    caratula: '',
    fechaLibertad: '',
    fechaCompurgamiento: '',
    tipoLibertad: '',
    comentarios: '',
    adjunto: '',
}

export default function FormLibertades({ params }: { params: { id: number } }){

    const [formState, setFormState] = useState<libertadesType>(initData)
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;

    const handleLoading = (value:boolean):void =>{
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }

    const handleChange = (event : any) => {
        handleInputChange(event, formState, setFormState);
    };

    const handleSubmit = () => {
        console.log(formState)
    }


    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetchFormData(params.id, 'libertades') // Usa la función importada
                .then((data) => {
                    if (data) {
                        setFormState(data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isEditMode, params.id]);


    // Si el ID del state es Cero es porque todavia no cargo el dato del ENDPOINT y va mostrar el spinner de carga
    if (formState.id == 0) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress/>
            </Box>
        );
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