'use client'

import * as React from 'react';
import {Box, Button, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {FormSkeleton} from "@/components/skeletons/FormSkeleton";



interface MyState {
    id: number;
    medidaSeguridad: string;
    lastUpdate: string;

}
const initialState: MyState = {
    id: 0,
    medidaSeguridad: "",
    lastUpdate: ""
}
export default function FormMedidasSeguridad({params} : { params: { id: number } }){
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;

    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:5000/medidaSeguridad?id=${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias
                    if (data.length > 0 && data[0].medidaSeguridad) {
                        setStateForm({
                            id: data[0].id,
                            medidaSeguridad: data[0].medidaSeguridad,
                            lastUpdate: '' // Asegúrate de definir un valor por defecto para las propiedades faltantes
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
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
            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode
                ? `http://localhost:5000/medidaSeguridad/${params.id}`
                : 'http://localhost:5000/medidaSeguridad';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stateForm),
            });

            setLoading(false);
            if (response.ok) {
                const message = isEditMode
                    ? 'Medida de seguridad actualizada correctamente.'
                    : 'Medida de seguridad creada correctamente.';
                openSnackbar(message, 'success');
                router.push('/sistema/medidas-seguridad');
            } else {
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    const handleSubmit = () =>{
        postTraslado();
        // console.log(JSON.stringify(stateForm))
    }

        if (stateForm.id == 0) {
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

    return(
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="medidaSeguridad"
                        value={stateForm.medidaSeguridad ?? ''}
                        id="chapa"
                        label="Medidas de seguridad"
                        variant="outlined" />
                </Grid>
            </Grid>
            <Grid item sm={12} mt={4}>
                <Stack direction='row' spacing={2}>

                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant='outlined'>
                        Cancelar
                    </Button>
                </Stack>
            </Grid>
        </>
    )

}