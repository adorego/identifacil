'use client'

import * as React from 'react';

// MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {
    Box,
    Grid,
    IconButton,
    MenuItem,
    Select,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel, FormControl, FormHelperText, InputAdornment, OutlinedInput,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {Close, FileUploadOutlined, Label} from '@mui/icons-material';

// IDENTIFACIL Compontenes
import AutocompleteDefensor from '@/components/autocomplete/autocompleteDefensor';
import AutocompletePPL from '@/components/autocomplete/autocompletePPL';
import AutocompleteExpediente from '@/components/autocomplete/autocompleteExpediente';
import { Controller, useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiFileInput } from 'mui-file-input';
import { fetchData } from '@/components/utils/utils';
import Link from 'next/link';
import { API_INTERVENCION_POST } from '@/app/api/lib/endpoint';
import dayjs, {Dayjs} from "dayjs";
import {toast} from "sonner";
import {intervencionAltaType} from "@/app/api/interfaces/intervenciones";
import {getIntervencion, listaEntrevistaPorIntervencion} from "@/app/api/lib/defensores/intervenciones";
import {useEffect, useState} from "react";

type IntervencionModalType = {
    buttonLabel: string;
    id_intervencion?: string;
    openModalExternal?: boolean;
}

const intervencionAltaInitial: intervencionAltaType = {
    idDefensor: "",
    tipoIntervencion: "ALTA",
    idPersonaPPL: "",
    idExpediente: "",
    circunscripcion: "",
    fechaInicioProceso: null,
    oficio_judicial_alta_intervencion_url: '',
}

export default function IntervencionModal({ buttonLabel = 'Agregar',id_intervencion,openModalExternal }: IntervencionModalType) {

    // React hook form y sus funciones
    const { register, handleSubmit, getValues, setValue,reset, control, formState: { errors } } = useForm<intervencionAltaType>({
        defaultValues: intervencionAltaInitial,
    });

    ///1. Form de estado de
    const [formIntervencion, setFormIntervencion] = useState<intervencionAltaType>(intervencionAltaInitial)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Si se recibe un ID desde el componente padre
    useEffect(() => {
        if(open){
            reset(intervencionAltaInitial)

            const isEditMode = id_intervencion ? 'PUT' : 'POST';

            console.log('is  edit mode?', isEditMode)
        }

        if(open && id_intervencion){
            setLoading(true)
            reset(intervencionAltaInitial)

            const fetchData = async () => {
                const response = await getIntervencion({id_intervencion:id_intervencion as string});

                const { data } = await response.json()

                console.log('DATOS OBTENIDOS DE INTERVENCION', data.resultado)

                const intervencionProcesadas :intervencionAltaType = {
                    // ...data.resultado,
                    circunscripcion: '1',
                    tipoIntervencion: data.resultado.activo ? "ALTA" : "BAJA",
                    fechaInicioProceso: dayjs(data.resultado.fecha_inicio_intervencion),
                    idDefensor: data.resultado.defensor.id,
                    idPersonaPPL: data.resultado.ppl.persona.id,
                    idExpediente: data.resultado.expediente.id,
                    oficio_judicial_alta_intervencion_url: data.resultado.oficio_judicial_alta_intervencion,
                }
                setValue('tipoIntervencion', "ALTA")
                handleDefensorChange(data.resultado.defensor.id)
                reset(intervencionProcesadas)
                setFormIntervencion(intervencionProcesadas)
            };

            fetchData().catch(console.error).finally(()=>setLoading(false));
        }else{
            setLoading(false)
        }

    }, [id_intervencion,open]);

    const handleDefensorChange = (value: { id:number|string })=>{
        setValue('idDefensor', value.id as string)
    }

    const handleExpedienteChange = (value: { id:number|string })=>{
        setValue('idExpediente', value.id as string)
    }

    const handlePplChange = (value: { id_persona:number|string })=>{
        setValue('idPersonaPPL', value.id_persona as string)
    }

    // Arma el form data para enviar la peticion
    const buildFormData = (data:intervencionAltaType)=>{

        const formData = new FormData();

        formData.append('idDefensor', data.idDefensor ? data.idDefensor.toString() : '');
        formData.append('idPersonaPPL', data.idPersonaPPL ? data.idPersonaPPL.toString() : '');
        formData.append('idExpediente', data.idExpediente ? data.idExpediente.toString() : '');
        formData.append('circunscripcion', '1');
        formData.append('fechaInicioProceso', data.fechaInicioProceso ? data.fechaInicioProceso.toISOString() : '');

        // Se verifica si el dato existe ya que podria ser nulo
        if (data.oficio_judicial_alta_intervencion) {
            formData.append('oficio_judicial_alta_intervencion', data.oficio_judicial_alta_intervencion);
        }
        return formData;
    }

    // Funcion para envio del formulario
    const onSubmit = async (data:intervencionAltaType)=>{
        console.log('Check test: ', data)

        const formData = buildFormData(data)

        const isEditMode = id_intervencion ? 'PUT' : 'POST';


        try {
            const response = await fetch(`${API_INTERVENCION_POST}`, {
                method: isEditMode,
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos del registro médico');
            }


            const dataRes = await response.json();

            toast.success('Intervencion creada correctamente')

            handleClose();


        } catch (err) {
            console.error(err);
            toast.success(`Error al crear intervencion: ${err}`)
        }

    }



    return (
        <React.Fragment>
            <Button variant="contained" color='primary' onClick={handleClickOpen}>
                {buttonLabel}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{
                    minWidth: '550px',
                }}
            >
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Datos de Intervencion</DialogTitle>
                    <DialogContent
                        style={{
                            minWidth: '550px',
                        }}
                    >
                        {loading && ( <>
                            Cargando...
                        </>)}

                        {!loading &&(
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={12} mt={2}>
                                    <FormControl fullWidth>

                                        <Controller
                                            name='tipoIntervencion'
                                            control={control}
                                            defaultValue={''}
                                            render={({field: {onChange,value},}) => (
                                                <>
                                                    <InputLabel>
                                                        Tipo de intervencion
                                                    </InputLabel>
                                                    <Select
                                                        onChange={onChange}
                                                        fullWidth
                                                        label="Tipo de intervencion"
                                                        defaultValue={''}
                                                        value={value}
                                                    >
                                                        <MenuItem value={''} disabled>Seleccionar tipo de
                                                            intervencion</MenuItem>
                                                        <MenuItem value={'ALTA'}>Alta</MenuItem>
                                                        <MenuItem value={'BAJA'}>Baja</MenuItem>
                                                    </Select>
                                                    <FormHelperText>
                                                        * Campo requerido
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12}>
                                    <AutocompleteDefensor selectedItemExternal={formIntervencion.idDefensor} handleItemChange={handleDefensorChange}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <AutocompletePPL
                                        selectedItemExternal={formIntervencion.idPersonaPPL}
                                        handleItemChange={handlePplChange}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <AutocompleteExpediente label={'Expediente'}
                                                            selectedItemExternal={formIntervencion.idExpediente}
                                                            handleItemChange={handleExpedienteChange}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <Controller
                                            name='fechaInicioProceso'
                                            rules={{required: true}}
                                            control={control}
                                            render={({field: {value, onChange}}) => (
                                                <>
                                                    <FormControl fullWidth>
                                                        <DatePicker
                                                            value={value}
                                                            onChange={onChange}
                                                            label='Fecha de interenvcion'

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
                                <Grid item sm={12}>
                                    {(typeof formIntervencion.oficio_judicial_alta_intervencion_url == 'object' || !formIntervencion.oficio_judicial_alta_intervencion_url) && (
                                    <Controller
                                        name="oficio_judicial_alta_intervencion"
                                        control={control}
                                        render={({field, fieldState}) => (
                                            <>
                                                <FormControl fullWidth>
                                                    <label>
                                                        Documentos adjuntos
                                                    </label>
                                                    <MuiFileInput
                                                        {...field}
                                                        placeholder={'Adjuntar acrhivo...'}
                                                        helperText={fieldState.invalid ? "Archivo invalido" : ""}
                                                        error={fieldState.invalid}

                                                    />
                                                </FormControl>
                                            </>

                                        )}

                                    />
                                    )}
                                    {(typeof formIntervencion.oficio_judicial_alta_intervencion_url == 'string' && formIntervencion.oficio_judicial_alta_intervencion_url) && (
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel htmlFor="document_alta_alt_url">Documento adjunto de alta</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                value={formIntervencion.oficio_judicial_alta_intervencion_url}
                                                id="document_alta_alt_url"
                                                type={'text'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={()=>setFormIntervencion((prev)=>({...prev,oficio_judicial_alta_intervencion_url: ''}))}
                                                            edge="end"
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Documento adjunto de alta"
                                            />
                                        </FormControl>
                                    )}

                                </Grid>
                            </Grid>
                        </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ m: 2 }}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" color="primary" type="submit">Guardar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}