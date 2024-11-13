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
    InputLabel, FormControl, FormHelperText,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { FileUploadOutlined, Label } from '@mui/icons-material';

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

type intervencionAltaType = {
    idDefensor: string;
    tipoIntervencion: string;
    idPersonaPPL: string;
    idExpediente: string;
    circunscripcion: string;
    fechaInicioProceso: string;
    oficio_judicial_alta_intervencion?: File;
}

const intervencionAltaInitial: intervencionAltaType = {
    idDefensor: "",
    tipoIntervencion: "ALTA",
    idPersonaPPL: "",
    idExpediente: "",
    circunscripcion: "",
    fechaInicioProceso: "",
}
export default function IntervencionModal({ buttonLabel = 'Agregar' }) {

    const { register, handleSubmit, getValues, setValue,reset, control, formState: { errors } } = useForm<intervencionAltaType>({
        defaultValues: intervencionAltaInitial,
    });


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(open){
            reset(intervencionAltaInitial)
        }

    }, [open]);

    const handleDefensorChange = (value: { id:number|string })=>{
        setValue('idDefensor', value.id as string)
    }

    const handleExpedienteChange = (value: { id:number|string })=>{
        setValue('idExpediente', value.id as string)
    }

    const handlePplChange = (value: { id:number|string })=>{
        setValue('idPersonaPPL', value.id as string)
    }

    const onSubmit = async (data:intervencionAltaType)=>{
        console.log('Check test: ', data)

        /*const formData = new FormData();
        formData.append('id', data.fecha_consulta ? stateRegistroMedicoModal.fecha_consulta.toISOString() : '');

        if (data.oficio_judicial_alta_intervencion) {
            formData.append('documento_registro_medico', data.oficio_judicial_alta_intervencion);
        }*/

        try {
            const response = await fetch(`${API_INTERVENCION_POST}`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos del registro médico');
            }


            const dataRes = await response.json();
            console.log(dataRes)
            handleClose();


        } catch (err) {
            console.error(err);
            // Manejar el error
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                        <Box>
                            <Grid container spacing={2}>

                                <Grid item sm={12} mt={2}>
                                    <FormControl fullWidth>

                                        <Controller
                                            name='tipoIntervencion'
                                            control={control}
                                            defaultValue={''}
                                            render={({ field: { onChange }, }) => (
                                                <>
                                                    <InputLabel>
                                                        Tipo de intervencion
                                                    </InputLabel>
                                                    <Select
                                                        onChange={onChange}
                                                        fullWidth
                                                        label="Tipo de intervencion"
                                                        defaultValue={''}
                                                    >
                                                        <MenuItem value={''} disabled >Seleccionar tipo de intervencion</MenuItem>
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
                                    <AutocompleteDefensor handleItemChange={handleDefensorChange} />
                                </Grid>
                                <Grid item sm={12}>
                                    <AutocompletePPL handleItemChange={handlePplChange}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <AutocompleteExpediente label={'Expediente'} handleItemChange={handleExpedienteChange} />
                                </Grid>
                                <Grid item sm={12}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <Controller
                                            name='fechaInicioProceso'
                                            rules={{ required: true }}
                                            control={control}
                                            render={({ field:{value, onChange} }) => (
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
                                    <Controller
                                        name="oficio_judicial_alta_intervencion"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <FormControl fullWidth>
                                                    <label>
                                                        Documentos adjuntos
                                                    </label>
                                                    <MuiFileInput
                                                        {...field}
                                                        helperText={fieldState.invalid ? "Archivo invalido" : ""}
                                                        error={fieldState.invalid}
                                                    />
                                                </FormControl>

                                            </>

                                        )}
                                    />

                                </Grid>
                            </Grid>
                        </Box>
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