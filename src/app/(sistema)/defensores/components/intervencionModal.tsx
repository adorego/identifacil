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
    InputLabel, FormControl, FormHelperText, InputAdornment, OutlinedInput, FormLabel, RadioGroup, Radio,
} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {Close, FileUploadOutlined, Label} from '@mui/icons-material';

// IDENTIFACIL Compontenes
import AutocompleteDefensor from '@/components/autocomplete/autocompleteDefensor';
import AutocompletePPL from '@/components/autocomplete/autocompletePPL';
import AutocompleteExpediente from '@/components/autocomplete/autocompleteExpediente';
import {Controller, useForm} from 'react-hook-form';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MuiFileInput} from 'mui-file-input';
import {fetchData} from '@/components/utils/utils';
import Link from 'next/link';
import {API_INTERVENCION_POST} from '@/app/api/lib/endpoint';
import dayjs, {Dayjs} from "dayjs";
import {toast} from "sonner";
import {intervencionAltaType} from "@/app/api/interfaces/intervenciones";
import {getIntervencion, listaEntrevistaPorIntervencion} from "@/app/api/lib/defensores/intervenciones";
import {useEffect, useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import es from 'dayjs/locale/es';
dayjs.locale(es);

type IntervencionModalType = {
    buttonLabel: string;
    id_intervencion?: string;
    openModalExternal?: boolean;
    handleReturn?: (arg0: any) => void;
}

const intervencionAltaInitial: intervencionAltaType = {
    idDefensor: "",
    activo: 'true',
    idPersonaPPL: "",
    idExpediente: "",
    circunscripcion: "",
    fechaInicioProceso: null,
    fechaFinDelProceso: null,
    oficio_judicial_alta_intervencion_url: '',
}

const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';

export default function IntervencionModal({
                                              buttonLabel = 'Agregar',
                                              id_intervencion,
                                              openModalExternal,
                                              handleReturn
                                          }: IntervencionModalType) {

    // React hook form y sus funciones
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        watch,
        control,
        formState: {errors}
    } = useForm<intervencionAltaType>({
        defaultValues: intervencionAltaInitial,
    });

    ///1. Form de estado de
    const [formIntervencion, setFormIntervencion] = useState<intervencionAltaType>(intervencionAltaInitial)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const tipoIntervencion = watch('activo');

    // Si se recibe un ID desde el componente padre
    useEffect(() => {
        // Si hay cambios en el parametro OPEN (Se abre el modal) Puede ser para creacion o actualizacion

        if (open) {
            reset(intervencionAltaInitial)

            // Si hay cambios en el parametro id_intervecion implica que es actualizacion
            if (id_intervencion) {
                setLoading(true)

                fetchData().catch(console.error).finally(() => setLoading(false));
            } else {
                setLoading(false)
            }

        }

    }, [id_intervencion, open]);


    const fetchData = async () => {
        const response = await getIntervencion({id_intervencion: id_intervencion as string});

        const {data} = await response.json()

        // console.log('DATOS OBTENIDOS DE INTERVENCION', data.resultado)
        // console.log('DATOS OBTENIDOS DE ACTIVO', typeof data.resultado.activo)

        // Se formatea los datos para el form
        const intervencionProcesadas: intervencionAltaType = {
            // ...data.resultado,
            circunscripcion: '1',
            activo: data.resultado.activo ? 'true' : 'false',
            fechaInicioProceso: dayjs(data.resultado.fecha_inicio_intervencion),
            fechaFinDelProceso: data.resultado.fecha_fin_intervencion ? dayjs(data.resultado.fecha_fin_intervencion) : null,
            idDefensor: data.resultado.defensor,
            idPersonaPPL: data.resultado.ppl.persona,
            idExpediente: data.resultado.expediente,
            oficio_judicial_alta_intervencion_url: data.resultado.oficio_judicial_alta_intervencion,
            oficio_judicial_baja_intervencion_url: data.resultado.oficio_judicial_baja_intervencion,
        }

        // TODO: verificar si es necesario siguiente linea
        // setValue('activo', 'true') // Se inicializa campo de tipo de form Alta o Baja
        handleDefensorChange(data.resultado.defensor.id) //se setea defensor en el autocomplote
        reset(intervencionProcesadas) // se coloca los datos obtenidos en el estado del react-hook-form
        setFormIntervencion(intervencionProcesadas) // se setea datos en estado de form para que vuelva a renderizar el DOM


        await descargarArchivos(`${ASSETS_URL}${data.resultado.oficio_judicial_alta_intervencion}`, 'oficio_judicial_alta_intervencion')
        await descargarArchivos(`${ASSETS_URL}${data.resultado.oficio_judicial_baja_intervencion}`, 'oficio_judicial_baja_intervencion')

    };

    // Funcion para bajar archivo desde la URL del GET para volver a convertir a archivo
    const descargarArchivos = async (archivoURL: string, propiedad: string) => {
        const fileBlob = await downloadFile(archivoURL);
        const file = new File([fileBlob], `${archivoURL.split('/').pop()}`, {type: fileBlob.type});

        // @ts-ignore Da error aca porque espera solo strings que tengan los nombres de las propiedades del estado/form
        setValue(propiedad, file)

        /** seteador de estado para guardaar la url de un archivo preguardado y mostrar*/
        setFormIntervencion((prev: any) => ({
            ...prev,
            [propiedad]: file,
        }))

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

/*    const handleTipoIntervencionChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setValue("activo", event.target.value == 'true' ? 'true' : 'false')
        setFormIntervencion((prev) => ({
            ...prev,
            activo: event.target.value == 'true' ? 'true' : 'false',
        }))
    }*/

    const handleDefensorChange = (value: { id: number | string }) => {
        setValue('idDefensor', value.id as string)
    }

    const handleExpedienteChange = (value: { id: number | string }) => {
        setValue('idExpediente', value.id as string)
    }

    const handlePplChange = (value: { id_persona: number | string }) => {
        setValue('idPersonaPPL', value.id_persona as string)
    }

    const onErrors = (data: any) => {
        console.log('Error log submit', data)
        console.log('Error log submit', errors)
        toast.error(`Debe completar los campos requeridos`)
    }

    // Funcion para envio del formulario
    const onSubmit = async (data: intervencionAltaType) => {
        console.log('1. Check test: ', data)

        const formData = buildFormData(data)


        const isEditMode = id_intervencion ? 'PUT' : 'POST';

        const ENDPOINT_QUERY = `${API_INTERVENCION_POST}${isEditMode == 'PUT' ? ('/' + id_intervencion) : ''}`

        try {
            const response = await fetch(`${ENDPOINT_QUERY}`, {
                method: isEditMode,
                body: formData,
            });

            if (!response.ok) throw new Error('Error al enviar los datos de intervencion');

            const dataRes = await response.json();

            if (isEditMode == 'POST') toast.success('Intervencion creada correctamente')
            else toast.success('Intervencion actualizada correctament')

            // Retorna el Objeto del query
            if (handleReturn) handleReturn(dataRes)

            handleClose();


        } catch (err) {
            console.error(err);
            toast.error(`Error al crear intervencion: ${err}`)
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
                <form noValidate onSubmit={handleSubmit(onSubmit, onErrors)}>
                    <DialogTitle>Datos de Intervencion.</DialogTitle>
                    <DialogContent
                        style={{
                            minWidth: '550px',
                        }}
                    >
                        {loading && (<>
                            Cargando...
                        </>)}

                        {!loading && (
                            <Box>
                                <Grid container spacing={2}>
                                    {/* CAMPO TIPO */}
                                    <Grid item sm={12} mt={2}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name="activo"
                                                control={control}
                                                rules={{ required: 'Debe seleccionar el tipo de intervención' }}
                                                defaultValue={'true'}
                                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                    <>
                                                        <FormLabel id="tipo-intervencion-label">Tipo de intervención</FormLabel>
                                                        <RadioGroup row value={value} onChange={onChange}>
                                                            <FormControlLabel value={'true'} control={<Radio />} label="Alta" />
                                                            <FormControlLabel
                                                                disabled={id_intervencion ? false : true}
                                                                value={'false'} control={<Radio />} label="Baja" />
                                                        </RadioGroup>
                                                        {error && (
                                                            <FormHelperText style={{ color: 'red' }}>
                                                                {error.message || '* Campo requerido'}
                                                            </FormHelperText>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>

                                    {/* CAMPO DEFENSOR*/}
                                    <Grid item sm={12}>
                                        <AutocompleteDefensor
                                            name="idDefensor"
                                            control={control} // Pass control from useForm
                                            rules={{ required: 'Debe seleccionar un defensor' }} // Add validation rules
                                        />
                                    </Grid>


                                    {/*CAMPO PPL*/}
                                    <Grid item sm={12}>
                                        <AutocompletePPL
                                            name="idPersonaPPL" // Field name for react-hook-form
                                            control={control} // Pass control from useForm
                                            rules={{ required: 'Debe seleccionar un PPL' }} // Add validation rules
                                        />
                                    </Grid>


                                    {/* CAMPO EXPEDIENTE */}
                                    <Grid item sm={12}>
                                        <AutocompleteExpediente
                                            name="idExpediente" // Field name for react-hook-form
                                            label="Expediente" // Label for the input
                                            control={control} // Pass control from useForm
                                            rules={{ required: 'Debe seleccionar un expediente' }} // Add validation rules
                                        />
                                    </Grid>


                                    {/* CAMPO INICIO INTERVENCION*/}
                                    <Grid item sm={6}>

                                            <Controller
                                                name='fechaInicioProceso'
                                                rules={{required: true}}
                                                control={control}
                                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                                    <>
                                                        <FormControl fullWidth error={!!errors.fechaInicioProceso}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                            <DatePicker
                                                                format="DD/MM/YYYY"
                                                                value={value}
                                                                onChange={onChange}
                                                                label='Fecha de inicio de interenvcion'
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
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </>
                                                )}
                                            />
                                    </Grid>

                                    {/* CAMPO FIN INTERVENCION*/}
                                    {(tipoIntervencion==='false') && (
                                        <Grid item sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <Controller
                                                    name='fechaFinDelProceso'
                                                    rules={{required: true}}

                                                    control={control}
                                                    render={({field: {value, onChange}, fieldState: {error}}) => (
                                                        <>
                                                            <FormControl fullWidth error={!!errors.fechaFinDelProceso}>
                                                                <DatePicker
                                                                    format="DD/MM/YYYY"
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    label='Fecha de fin de interenvcion'
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
                                    )}

                                    {/* CAMPO DOCUMENTO ALTA */}
                                    <Grid item sm={12}>
                                        {(typeof formIntervencion.oficio_judicial_alta_intervencion_url == 'object' || !formIntervencion.oficio_judicial_alta_intervencion_url) && (
                                            <Controller
                                                name="oficio_judicial_alta_intervencion"
                                                rules={{required: true}}
                                                control={control}
                                                render={({field, fieldState}) => (
                                                    <FormControl fullWidth>
                                                        <label>
                                                            Documentos adjuntos de alta
                                                        </label>
                                                        <MuiFileInput
                                                            {...field}
                                                            placeholder={'Adjuntar acrhivo...'}
                                                            helperText={fieldState.invalid ? "* Campo es requerido" : "* Campo es requerido"}
                                                            error={fieldState.invalid}
                                                        />
                                                    </FormControl>
                                                )}

                                            />
                                        )}
                                        {(typeof formIntervencion.oficio_judicial_alta_intervencion_url == 'string' && formIntervencion.oficio_judicial_alta_intervencion_url) && (
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel htmlFor="document_alta_alt_url">Documento adjunto de
                                                    alta</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    value={formIntervencion.oficio_judicial_alta_intervencion_url}
                                                    id="document_alta_alt_url"
                                                    placeholder={'Adjuntar acrhivo'}
                                                    type={'text'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => {
                                                                    setValue('oficio_judicial_alta_intervencion', null)
                                                                    setFormIntervencion((prev) => ({
                                                                        ...prev,
                                                                        oficio_judicial_alta_intervencion_url: '',
                                                                        oficio_judicial_alta_intervencion: null,
                                                                    }))
                                                                }}
                                                                edge="end"
                                                            >
                                                                <Close/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Documento adjunto de alta"
                                                />
                                            </FormControl>
                                        )}

                                    </Grid>

                                    {/* CAMPO DOCUMENTO BAJA */}
                                    {(tipoIntervencion === 'false') && (
                                        <Grid item sm={12} mt={2}>
                                            {(typeof formIntervencion.oficio_judicial_baja_intervencion_url == 'object' || !formIntervencion.oficio_judicial_baja_intervencion_url) && (
                                                <Controller
                                                    name="oficio_judicial_baja_intervencion"
                                                    control={control}
                                                    rules={{required: true}}
                                                    render={({field, fieldState}) => (
                                                        <>
                                                            <FormControl fullWidth>
                                                                <label>
                                                                    Documentos adjuntos de baja
                                                                </label>
                                                                <MuiFileInput
                                                                    {...field}
                                                                    placeholder={'Adjuntar acrhivo...'}
                                                                    helperText={'* Campo es requerido'}
                                                                    error={!!errors.oficio_judicial_baja_intervencion}

                                                                />
                                                            </FormControl>
                                                        </>

                                                    )}

                                                />
                                            )}
                                            {(typeof formIntervencion.oficio_judicial_baja_intervencion_url == 'string' && formIntervencion.oficio_judicial_baja_intervencion_url) && (
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel htmlFor="document_baja_alt_url">Documento adjunto de
                                                        baja</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        placeholder={'!!!Adjuntar acrhivo...'}
                                                        error={!!errors.oficio_judicial_baja_intervencion}
                                                        value={formIntervencion.oficio_judicial_baja_intervencion_url}
                                                        id="document_baja_alt_url"
                                                        type={'text'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={() => setFormIntervencion((prev) => ({
                                                                        ...prev,
                                                                        oficio_judicial_baja_intervencion_url: ''
                                                                    }))}
                                                                    edge="end"
                                                                >
                                                                    <Close/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Documento adjunto de baja"
                                                    />
                                                </FormControl>
                                            )}

                                        </Grid>
                                    )}
                                </Grid>

                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{m: 2}}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" color="primary" type="submit">Guardar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

async function downloadFile(url: string) {
    const response = await fetch(url);
    return response.blob(); // Obtiene el contenido del archivo como Blob
}


// Arma el form data para enviar la peticion
const buildFormData = (data: intervencionAltaType) => {
    console.log('check datos defensores', data.idPersonaPPL)
    // console.log('check datos defensores', typeof data.activo)
    const formData = new FormData();

    // @ts-ignore
    formData.append('activo', data.activo == 'true' ? 'true' : 'false');
    // @ts-ignore
    formData.append('idDefensor', data.idDefensor ? data.idDefensor.id : '');

    // @ts-ignore Si es para creacion el PPL tiene id_persona
    if(data.idPersonaPPL.id_persona){
        // @ts-ignore
        formData.append('idPersonaPPL', data.idPersonaPPL ? data.idPersonaPPL.id_persona : '');

    }else{
        // @ts-ignore Si es para actualizacion el PPL tiene solo campo ID
        formData.append('idPersonaPPL', data.idPersonaPPL ? data.idPersonaPPL.id : '');
    }
    // @ts-ignore
    formData.append('idExpediente', data.idExpediente ? data.idExpediente.id : '');
    formData.append('circunscripcion', '1');
    formData.append('fechaInicioProceso', data.fechaInicioProceso ? data.fechaInicioProceso.toISOString() : '');
    if(data.fechaFinDelProceso)formData.append('fechaFinDelProceso', data.fechaFinDelProceso ? data.fechaFinDelProceso.toISOString() : '');

    // Se verifica si el dato existe ya que podria ser nulo
    if (data.oficio_judicial_alta_intervencion) {
        formData.append('oficio_judicial_alta_intervencion', data.oficio_judicial_alta_intervencion);
    }
    // Se verifica si el dato existe ya que podria ser nulo
    if (data.oficio_judicial_baja_intervencion) {
        formData.append('oficio_judicial_baja_intervencion', data.oficio_judicial_baja_intervencion);
    }
    return formData;
}