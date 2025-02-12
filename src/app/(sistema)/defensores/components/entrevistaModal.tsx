'use client'

import * as React from 'react';

// MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {
    Box,
    Grid,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl, FormHelperText, FormLabel, RadioGroup, Radio, Typography, CircularProgress,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import es from 'dayjs/locale/es';
dayjs.locale(es);
// IDENTIFACIL Compontenes

import { Controller, useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {toast} from "sonner";
import {EntrevistaType} from "@/app/api/interfaces/entrevistas";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import {actualizarEntrevista, crearEntrevista} from "@/app/api/lib/defensores/entrevistas";
import {ChangeEvent, useEffect, useState} from "react";



const entrevistaAltaInitial: EntrevistaType = {
    seRealizoEntrevista: 'false',
    entrevistaPresencial: 'false',
    fechaEntrevista: null,
    relatoDeEntrevista: '',
}
export default function EntrevistaModal(
    { buttonLabel = 'Agregar', id_intervencion, id_entrevista, openExternal, handleCloseExternal, handleReturn }:
    {handleReturn:(arg0:Object)=>void;handleCloseExternal:()=>void;openExternal:boolean; buttonLabel?: string; id_intervencion?: string; id_entrevista?: string|null|number}) {

    const { register, handleSubmit, getValues, setValue,reset, control, formState: { errors } } = useForm<EntrevistaType>({
        defaultValues: entrevistaAltaInitial,
    });

    const isEditMode = id_entrevista ? true : false;

    const [entrevistaForm, setEntrevistaForm] = useState<EntrevistaType>(entrevistaAltaInitial)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false);



    useEffect(() => {
        setLoading(true)

        if(open) {
            handleClickOpen()
            reset(entrevistaAltaInitial)
        }

        if(id_entrevista && open){
            fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones/${id_intervencion}/entrevistas/${id_entrevista}`).
            then(res=>{
                return res.json()
            }).then(data=>{

                const dataProcessed = {
                    id: data.resultado.id,
                    seRealizoEntrevista: data.resultado.se_realizo_la_entrevista ? 'true' : 'false',
                    entrevistaPresencial: data.resultado.entrevistaPresencial ? 'true' : 'false',
                    fechaEntrevista: dayjs(data.resultado.fecha),
                    relatoDeEntrevista: data.resultado.relato as string,
                }
                reset(dataProcessed)
                setEntrevistaForm(dataProcessed)
            }).finally(()=> {

                setLoading(false)
            })
        }else{
            setLoading(false)
        }
    }, [id_entrevista,open]);

    useEffect(() => {
        if(openExternal)handleClickOpen()

    }, [openExternal]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        reset(entrevistaAltaInitial)
        setOpen(false);
        setEntrevistaForm(entrevistaAltaInitial)

        handleCloseExternal()
    };

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        // @ts-ignore
        setValue(name, value)
        setEntrevistaForm(prev=>({
            ...prev,
            [name]: value == 'true'? 'true' : "false",
        }))

    }

    const onSubmit = async (data:EntrevistaType)=>{
        console.log('Check Entrevista antes de enviar: ', data)
        try {
            const response = isEditMode
                ? await actualizarEntrevista({id_intervencion:id_intervencion as string,bodyData:data, id_entrevista:id_entrevista as string})
                : await crearEntrevista({id_intervencion:id_intervencion as string,bodyData:data})


            if (!response.ok) throw new Error('Error al enviar los datos del registro médico');

            const dataRes = await response.json();

            console.log('Respuesta de entrevista', dataRes)

            toast.success('Entrevista creada correctamente')

            handleClose();
            handleReturn(dataRes)

        } catch (err) {
            console.error(err);
            toast.error(`Error al crear entrevista: ${err}`)
        }

    }

    const onError = (err: any) =>{
        console.log('Check de envio de error de form', err)
        toast.error('Completar los campos requeridos')
    }

    return (
        <React.Fragment>
            <Button variant="text" startIcon={<AddIcon />} color='primary' onClick={handleClickOpen}>
                {buttonLabel}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{
                    minWidth: '550px',
                }}
            >
                {loading && (<>
                    <Box sx={{
                        m: 4,
                    }}>
                        <Box justifyContent='center' alignItems='center'>
                            <CircularProgress />
                            <Box>
                                <Typography>Cargando datos de entrevista...</Typography>
                            </Box>
                        </Box>
                    </Box>
                </>)}
                {!loading && (
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle>Datos de Entrevista</DialogTitle>
                    <DialogContent
                        style={{
                            minWidth: '550px',
                        }}
                    >
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={12} mt={2}>
                                    <Controller
                                        name='seRealizoEntrevista'
                                        rules={{required: true}}
                                        control={control}
                                        render={({field}) => (
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Se realizo la entrevista?</FormLabel>
                                                <RadioGroup
                                                    {...field}
                                                    onChange={handleRadioChange}
                                                    row
                                                >
                                                    <FormControlLabel value={'true'} control={<Radio />} label="Si" />
                                                    <FormControlLabel value={'false'} control={<Radio />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="start" mb={2}>
                                <Grid item sm={6} mt={2}>
                                    <Controller
                                        name='entrevistaPresencial'
                                        defaultValue={'false'}
                                        rules={{required: true}}
                                        control={control}
                                        render={({field}) => (
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Tipo de entrevista?</FormLabel>
                                                <RadioGroup
                                                    {...field}
                                                    value={field.value}
                                                    onChange={handleRadioChange}
                                                    row
                                                >
                                                    <FormControlLabel value={'true'} control={<Radio />} label="Presencial" />
                                                    <FormControlLabel value={'false'} control={<Radio />} label="Virtual" />
                                                </RadioGroup>
                                                <FormHelperText>
                                                    * Campo requerido
                                                </FormHelperText>
                                            </FormControl>
                                            )}
                                        />
                                </Grid>

                                <Grid item sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                        <Controller
                                            name='fechaEntrevista'

                                            rules={{required: true}}
                                            control={control}
                                            render={({field: {value, onChange}, fieldState: {error}}) => (
                                                <>
                                                    <FormControl fullWidth>
                                                        <DatePicker
                                                            format="DD/MM/YYYY"
                                                            value={value}
                                                            onChange={onChange}
                                                            label='Fecha de interenvcion'
                                                            slotProps={{
                                                                textField: {
                                                                    error: !!error, // Highlight text field in red
                                                                    helperText: error?.message, // Show error message if validation fails
                                                                },
                                                            }}
                                                        />
                                                        <FormHelperText>
                                                            * Campo requerido
                                                        </FormHelperText>
                                                    </FormControl>
                                                </>
                                            )}
                                        />
                                    </LocalizationProvider>

                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        InputLabelProps={{ shrink: true }}
                                        rows={4}
                                        defaultValue={''}
                                        label='Breve relato de la entrevista'
                                        {...register('relatoDeEntrevista', {required: 'Relato es requerido',})}
                                        error={!!errors?.relatoDeEntrevista}
                                        helperText={
                                            errors?.relatoDeEntrevista?.message
                                                ? errors.relatoDeEntrevista.message
                                                : '* Campo requerido'
                                        }
                                    />
                                    {/*<Controller
                                        name='relatoDeEntrevista'
                                        rules={{required: true}}
                                        control={control}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={'5'}
                                                        onChange={onChange}
                                                        label='Breve relato de la entrevista'
                                                    />
                                                    <FormHelperText>
                                                        * Campo requerido
                                                    </FormHelperText>
                                                </FormControl>
                                            </>
                                        )}
                                    />*/}


                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ m: 2 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" color="primary" type="submit">Guardar</Button>
                    </DialogActions>
                </form>
                )}
            </Dialog>
        </React.Fragment>
    );
}