'use client'

import {

    Button,
    FormControl,
    FormLabel,
    Grid, InputLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import * as React from "react";
import { ChangeEvent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormControlLabel from '@mui/material/FormControlLabel';
import { crearUsuario } from '@/app/api/lib/usuarios/usuario';
import { createDefensor } from '@/app/api/lib/defensores/defensores';
import { API_DEFENSORES_USUARIO_GET } from '@/app/api/lib/endpoint';

type usuarioDefensorType = {
    nombre: string;
    apellido: string;
    tipo: string | 'publico' | 'privado';
    nro_documento: string;
    password: string;
    confirmPassword: string;
    telefono: string;
    supervisor: boolean | 'true' | 'false';
    circunscripcion: number;
    roles: number;
}

const usuarioDefensorInitial:usuarioDefensorType = {
    apellido: '',
    nombre: '',
    nro_documento: '',
    password: '',
    confirmPassword: '',
    tipo: '',
    telefono: '',
    supervisor: 'false',
    circunscripcion: 0,
    roles: 0,
}


// TODO: POST DE USUARIO,
// TODO: Del return del POST USUARIO obtener ID para crear defensor.
// TODO: Verificar que los nombres sean iguales
// TODO: Se debe hacer get ID de defensor por id usuario para obtener datos y poblar el form
// TODO: Actualizacion de Usuario

export default function FormGestionDefensor({params}: { params: { id: number | string } }){

    const { register, handleSubmit,  setValue, watch, control, formState: { errors } } = useForm<usuarioDefensorType>(
        { defaultValues:usuarioDefensorInitial }
    );

    const isEditMode = params.id !== 'crear';
    const formValues = watch()

    // Se ejecuta al montar el componente
    useEffect(() => {
        console.log('Es modo edicion?' , isEditMode)

        if(params.id !== 'crear'){
            fetch(`${API_DEFENSORES_USUARIO_GET}/${params.id}`).then(response => response.json()).then((data)=>{
                console.log('GET DATOS DEFENSOR USUARIO', data)
            })
        }

    }, []);

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        //@ts-ignore
        setValue(name, value)


    }

    // Funcion para ejecutar query de creacion de usuario
    const onCreateUser = async (data : usuarioDefensorType)=>{
        const userData = {
            nombres:data.nombre,
            apellidos:data.apellido,
            ci: data.nro_documento,
            clave: data.password,
            roles:[5]
        }

        try {
            // TODO: Agregar actualizacion
            const response = isEditMode
                ? await crearUsuario(userData) : await crearUsuario(userData)


            if (!response.ok) throw new Error('Error al enviar los datos del usuario nuevo');

            const dataRes = await response.json();

            toast.success('Usuario creado correctamente')

            return dataRes.dataRes.id


        } catch (err) {
            console.error(err);
            toast.error(`Error al crear usuario: ${err}`)
        }
    }


    // Funcion para ejecutar query de creacion de defensor
    const onCreateDefensor = async (data : usuarioDefensorType, userID:number)=>{
        const defensorData = {
            nombre:data.nombre,
            apellido:data.apellido,
            telefono:data.telefono,
            tipo: data.tipo,
            supervisor:data.supervisor,
            circunscripcion: "1",
            usuario: userID
        }

        // TODO: Agregar actualizacion
        try {
            const response = isEditMode ? await createDefensor(defensorData) : await createDefensor(defensorData)


            if (!response.ok) throw new Error('Error al enviar los datos del registro médico');

            const dataRes = await response.json();

            toast.success('Defensor creada correctamente')

            return dataRes.dataRes

        } catch (err) {
            console.error(err);
            toast.error(`Error al crear defensor: ${err}`)
        }
    }

    const onSubmit = async (data:usuarioDefensorType)=>{

        console.log('Check usuario: ', data)
        // console.log(formState)
        // http://localhost:4001/api/registro/auth/registro

        const responseCreateUsuario = await onCreateUser(data)

        if(responseCreateUsuario){
            onCreateDefensor(data, responseCreateUsuario)

        }

    }

    const onError = (err: any) =>{
        console.log('Check de envio de error de form', err)
        toast.error('Completar los campos requeridos')
    }

    return(
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>

                <Grid container spacing={2} >
                    <Grid item sm={12}>
                        <Typography variant='h5'>
                            Datos de defensor
                        </Typography>

                    </Grid>
                    <Grid item sm={4}>
                        <Controller
                            name='supervisor'
                            rules={{required: true}}
                            control={control}
                            render={({field}) => (
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">¿Es supervisor?</FormLabel>
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
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Número de documento"
                            variant="outlined"
                            {...register('nro_documento', {required: 'Número de documento es requerido'})}
                            error={!!errors?.nro_documento}
                            helperText={
                                errors?.nro_documento?.message
                                    ? errors.nro_documento.message
                                    : '* Campo requerido'
                            }

                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>

                    <Grid item sm={6}>

                        <TextField
                            fullWidth
                            label="Contraseña"
                            variant="outlined"
                            type='password'
                            {...register('password', {required: 'Contraseña es requerida'})}
                            error={!!errors?.password}
                            helperText={
                                errors?.password?.message
                                    ? errors.password.message
                                    : '* Campo requerido'
                            }

                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Repetir contraseña"
                            variant="outlined"
                            type='password'
                            {...register("confirmPassword", {
                                required: true,
                                validate: (val: string) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })}
                            error={formValues.password !== formValues.confirmPassword}
                            helperText={
                                formValues.password == formValues.confirmPassword
                                    ? '* Campo requerido'
                                    : 'Contraseña no coincide'
                            }

                        />
                    </Grid>

                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            // InputLabelProps={{ shrink: true }}
                            defaultValue={''}
                            label='Nombre'
                            {...register('nombre', { required: 'Nombre es requerido', })}
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
                            label='Apellido'
                            {...register('apellido', { required: 'Apellido es requerido', })}
                            error={!!errors?.apellido}
                            helperText={
                                errors?.apellido?.message
                                    ? errors.apellido.message
                                    : '* Campo requerido'
                            }
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            variant="outlined"
                            {...register('telefono', {required: "Número de telefono es requerido"})}
                            error={!!errors?.telefono}
                            helperText={
                                errors?.apellido?.message
                                    ? errors.apellido.message
                                    : '* Campo requerido'
                            }
                        />
                    </Grid>

                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            disabled
                            name="circunscripcion"
                            label="circunscripcion"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="tipo-defensor">Tipo defensor</InputLabel>
                            <Select
                                inputProps={register('tipo', {
                                    required: 'Selecione un tipo',
                                })}
                                defaultValue=''
                                fullWidth
                                error={!!errors?.tipo}
                                label="Tipo defensor"
                                variant="outlined"
                            >
                                <MenuItem value=''>Seleccionar tipo</MenuItem>
                                <MenuItem value='publico'>Publico</MenuItem>
                                <MenuItem value='privado'>Privado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            disabled
                            value={'defensor'}
                            fullWidth
                            name="tipo"
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