'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, Stack, TextField, Typography} from "@mui/material";
import {handleInputChange} from "@/components/utils/formUtils";
import {causaInitialData, CausaType} from "@/components/utils/penalesType";
import {fetchData, fetchFormData, postEntity} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";


// TODO: Hacer completado de form cuando es update o /crear
export default function FormCausa({params} : { params: { id: number | string } }){
    //@ts-ignore
    const [datosFormulario, setDatosFormularios] = useState<CausaType>(causaInitialData);
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
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handleSubmit = () => {
        console.log(JSON.stringify(datosFormulario))
        postEntity(
            isEditMode,
            '/datos_penales/causas',
            'Causas',
            params,
            datosFormulario,
            setLoading,
            openSnackbar,
            router
        );
    }



    useEffect(() => {
        if (isEditMode !== 'crear') {

            setLoading(true);
            fetchFormData(params.id, 'causas') // Usa la función importada
                .then((data) => {
                    if (data) {
                        setDatosFormularios(data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }else{

        }
    }, [isEditMode, params.id]);

    if (datosFormulario.id == 0 && isEditMode !== 'crear') {
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
                        value={datosFormulario.numeroDeDocumento}
                        name="nroCausa"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Año causa"
                        variant="outlined"
                        value={datosFormulario.anho}
                        name="ano"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Fecha de aprension y detención"
                        variant="outlined"
                        value={datosFormulario.fecha_de_aprehension}
                        name="fechaAprension"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Caratula"
                        variant="outlined"
                        value={datosFormulario.caratula_causa}
                        name="caratula"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Hecho punible"
                        variant="outlined"
                        value={datosFormulario.hechos_punibles}
                        name="hechoPunible"
                        onChange={handleChange}/>
                </Grid>


                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Situación procesal"
                        variant="outlined"
                        value={datosFormulario.estado_procesal}
                        name="situacionProcesal"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Años"
                        variant="outlined"
                        value={datosFormulario.tiempo_de_condena}
                        name="tiempoDeCondenaAnos"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Meses"
                        variant="outlined"
                        value={datosFormulario.tiempo_de_condena}
                        name="tiempoDeCondenaMeses"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="¿Cuentas con años extras de condena por medida de seguridad?"
                        variant="outlined"
                        value={datosFormulario.tiene_anhos_extra_de_seguridad}
                        name="anosExtrasDeCondenaPorMedidaDeSeguridad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Años"
                        variant="outlined"
                        value={datosFormulario.tiempo_de_seguridad}
                        name="anosDeCondenaPorMedidasDeSeguridad"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Meses"
                        variant="outlined"
                        value={datosFormulario.tiempo_de_seguridad}
                        name="mesesDeCondenaPorMedidasDeSeguridad"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Sentencia definitiva"
                        variant="outlined"
                        value={datosFormulario.sentencia_definitiva}
                        name="sentenciaDefinitiva"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        fullWidth
                        label="En caracter de"
                        variant="outlined"
                        value={datosFormulario.sentencia_definitiva}
                        name="sentenciaDescripcion"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Compurgamiento inicial"
                        variant="outlined"
                        value={datosFormulario.fecha_de_compurgamiento_inicial}
                        name="compurgamiento"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Compurgamiento recalculado"
                        variant="outlined"
                        value={datosFormulario.fecha_de_compurgamiento_recalculada}
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
                        value={datosFormulario.juzgado_de_tribunal_de_sentencia}
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
                        label="Fecha del hecho"
                        variant="outlined"
                        value={datosFormulario.lugar_del_hecho}
                        name="fechaHecho"
                        onChange={handleChange}/>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Lugar del hecho"
                        variant="outlined"
                        value={datosFormulario.lugar_del_hecho}
                        name="lugarHecho"
                        onChange={handleChange}/>
                </Grid>

                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Link de la noticia"
                        variant="outlined"
                        value={datosFormulario.link_de_noticia}
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
                                value={datosFormulario.defensor.nombreDelDefensor}
                                name="nombreDelDefensor"
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                label="Nombre del Defensor"
                                variant="outlined"
                                value={datosFormulario.defensor.telefonoDelDefensor}
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