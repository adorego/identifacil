'use client'

import * as React from 'react';
import {Box, Button, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {FormSkeleton} from "@/components/loadingScreens/FormSkeleton";
import log from "loglevel";

interface MyState {
    id: number;
    nombre: string;
    lastUpdate: string;

}
const initialState: MyState = {
    id: 0,
    nombre: "",
    lastUpdate: ""
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API

// TODO: Corregir errores de Tyepescrit en is edit mode
export default function FormTipoMedidasDeFuerza({params} : { params: { id: number | string } }){
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = params.id !== 'crear';

    const handleLoading = (value:boolean):void =>{
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }

    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            handleLoading(true);
            fetch(`${API_URL}/tipo_de_medida_de_fuerza/${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias

                    if (data) {
                        // Los nombress de form y atributos del state deben ser lo mismo que el endpoint
                        // o sino deberian hacer una normalizacion
                        setStateForm(data);
                    }
                }).then( ()=>{
                    handleLoading(false);
            })
                .catch(error => {
                    handleLoading(true);
                    log.error('Error:', error)
                }).finally(()=>{
                handleLoading(false);
            });

        }else {
            handleLoading(false);
        }
    }, [isEditMode, params.id]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStateForm(prevState => ({
            ...prevState,
            [name]: value ?? '' // Asegúrate de que el valor no sea nulo o indefinido
        }));
    }


    // Enviar datos de formulario
    const postTraslado = async () => {
        try {
            setLoading(true);

            // @ts-ignore
            const method = isEditMode ? 'PUT' : 'POST';
            console.log('metodo: ' + isEditMode)

            // @ts-ignore
            const url = isEditMode
                ? `${API_URL}/tipo_de_medida_de_fuerza/${params.id}`
                : `${API_URL}/tipo_de_medida_de_fuerza/`;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stateForm),
            });

            setLoading(false);

            if (response.ok) {
                // @ts-ignore
                const message = isEditMode ?
                    'Medidas de fuerza actualizada correctamente.'
                    : 'Medidas de fuerza creada correctamente.';
                openSnackbar(message, 'success');
                router.push('/sistema/tipos-medidas-de-fuerza');
            } else {
                if(response.status){
                    openSnackbar('Este tipo de medida de fuerza ya existe', 'error');
                    throw new Error(`Error en la petición: ${response.status}`);
                }

            }
        } catch (error) {
            setLoading(false);
            console.log('Error:', 2);
            // openSnackbar(error, 'error');
        }
    };

    const handleSubmit = () =>{
        if(stateForm.nombre){
            postTraslado();
        }else{
            openSnackbar('Debe completar el campo de medida de fuerza', 'warning')
        }

    }

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '35vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleCancelar = () =>{
        router.push('/sistema/tipos-medidas-de-fuerza');
    }

    return(
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="nombre"
                        value={stateForm.nombre ?? ''}
                        id="nombre"
                        label="Tipo de medidas de fuerza"
                        variant="outlined" />
                </Grid>
            </Grid>
            <Grid item sm={12} mt={4}>
                <Stack direction='row' spacing={2}>

                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant='outlined' onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </Stack>
            </Grid>
        </>
    )

}