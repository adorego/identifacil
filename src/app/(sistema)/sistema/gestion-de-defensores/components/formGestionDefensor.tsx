'use client'

import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { EntrevistaType } from '@/app/api/interfaces/entrevistas';

interface formUsuarioType {
    id:number | null;
    nombre:string;
    apellido: string
    password:string;
    confirmPassword:string;
    numero_documento: string;
}

const formUsuarioIntial = {
    id: null,
    nombre: '',
    apellido: '',
    password: '',
    confirmPassword: '',
    numero_documento: ''
}


// TODO: POST DE USUARIO,
// TODO: Del return del POST USUARIO obtener ID para crear defensor.
// TODO: Verificar que los nombres sean iguales
// TODO: Se debe hacer get ID de defensor por id usuario para obtener datos y poblar el form
// TODO: Actualizacion de Usuario
export default function FormGestionDefensor({params}: { params: { id: number | string } }){
    const [formState, setFormState] = useState<formUsuarioType>(formUsuarioIntial)

    const { register, handleSubmit, getValues, setValue,reset, control, formState: { errors } } = useForm<{
        nombre: string;
        apellido: string;
        telefono: string;
        supervisor: boolean;
        circunscripcion: number;
        roles: number;
    }>({
        nombre: '',
        apellido: '',
        telefono: '',
        supervisor: false,
        circunscripcion: 0,
        roles: 0,
    });

    const isEditMode = params.id ? true : false;

    // Se ejecuta al montar el componente
    useEffect(() => {

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{

        setFormState((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e:any)=>{
        e.preventDefault()
        console.log(formState)
    }

    return(
        <>
            <form onSubmit={onSubmit} autoComplete="off">
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            onChange={handleChange}
                            name="numero_documento"
                            value={formState.numero_documento ?? ''}
                            id="numero_documento"
                            label="Número de documento"
                            variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            // InputLabelProps={{ shrink: true }}
                            defaultValue={''}
                            label='nombre'
                            {...register('nombre', {required: 'Nombre es requerido',})}
                            error={!!errors?.nombre}
                            helperText={
                                errors?.nombre?.message
                                    ? errors.nombre.message
                                    : '* Campo requerido'
                            }
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            // InputLabelProps={{ shrink: true }}
                            defaultValue={''}
                            label='apellido'
                            {...register('apellido', {required: 'Apellido es requerido',})}
                            error={!!errors?.apellido}
                            helperText={
                                errors?.apellido?.message
                                    ? errors.apellido.message
                                    : '* Campo requerido'
                            }
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            name="telefono"
                            label="telefono"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            name="supervisor"
                            label="supervisor"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            name="circunscripcion"
                            label="circunscripcion"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            name="roles"
                            label="roles"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <Stack spacing={2} direction='row' justifyContent='flex-start'>
                            <Button variant='contained' type='submit'>
                                Guardar
                            </Button>
                            <Button variant='outlined'>
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

            </form>

        </>
    )
}