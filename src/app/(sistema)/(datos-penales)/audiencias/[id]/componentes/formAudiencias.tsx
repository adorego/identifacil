'use client'

import {Box, Button, CircularProgress, Grid, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {handleInputChange} from "@/components/utils/formUtils";
import * as React from "react";
import {audienciaType} from "@/components/utils/penalesType";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {fetchFormData} from "@/components/utils/utils";

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
export default function FormAudiencias({ params }: { params: { id: number } }){
    const [datosFormulario, setDatosFormularios] = useState<audienciaType>(initialDataForm);
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;

    const handleLoading = (value:boolean):void => {
        setLoading(value);
    }

        const handleChange = (event : any) => {
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handleSubmit = () => {
        console.log(datosFormulario)
    }

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetchFormData(params.id, 'audiencias') // Usa la función importada
                .then((data) => {
                    if (data) {
                        setDatosFormularios(data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isEditMode, params.id]);

    // Si el ID del estate es 0 es porque esta el dato inicializado del state y todavia no cargo del ENDPOINT
    if (datosFormulario.id == 0) {
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