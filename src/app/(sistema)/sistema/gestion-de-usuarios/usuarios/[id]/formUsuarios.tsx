'use client'

import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";

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

export default function FormUsuarios({params}: { params: { id: number | string } }){
    const [formState, setFormState] = useState<formUsuarioType>(formUsuarioIntial)

    // Se ejecuta al montar el componente
    useEffect(() => {

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{

        setFormState((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        console.log(formState)
    }

    return(
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            disabled
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
                            onChange={handleChange}
                            name="nombre"
                            value={formState.nombre ?? ''}
                            id="nombre"
                            label="Nombre"
                            variant="outlined"/>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            onChange={handleChange}
                            name="apellido"
                            value={formState.apellido ?? ''}
                            id="apellido"
                            label="apellido"
                            variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={0} style={{
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '10px',
                    paddingBottom: '24px',
                    margin: '4px',
                    marginTop: '25px',
                }}>
                    <Grid item sm={12}>
                        <Box>
                            <Typography variant='subtitle2'>Cambiar contraseña</Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            onChange={handleChange}
                            name="password"
                            value={formState.password ?? ''}
                            id="password"
                            label="Contraseña nueva"
                            variant="outlined"/>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            onChange={handleChange}
                            name="confirmPassword"
                            value={formState.confirmPassword ?? ''}
                            id="confirmPassword"
                            label="Confirmar contraseña nueva"
                            variant="outlined"/>
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