'use client'

import {Box, Button, CircularProgress, Grid, Paper, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";


interface MyState {
    id: number;
    nombre: string;
    lastUpdate: string;

}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

const initialState: MyState = {
    id: 0,
    nombre: "",
    lastUpdate: ""
}

export default function FormMotivoTraslado({params}: {
    params: {
        id: number
    }
}) {
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = React.useState(true);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    // @ts-ignore
    const isEditMode = params.id !== 'crear';


    // Cargar datos para edición
    useEffect(() => {

        if (isEditMode) {
            setLoading(true)
            fetch(`${API_URL}/movimientos/motivos_de_traslado/${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias

                        if (data) {
                            // Los nombress de form y atributos del state deben ser lo mismo que el endpoint
                            // o sino deberian hacer una normalizacion
                            setStateForm(data);
                        }

                    setLoading(false)
                })
                .catch(error => console.error('Error:', error));
        }else{
            setLoading(false)
        }
    }, [isEditMode, params.id]);

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        setStateForm((prevState) => (
            {
                ...prevState,
                [name]: value,
            }
        ))
    }

    const postTraslado = async () => {
        setLoading(true);

        try {
            // @ts-ignore
            const method = isEditMode ? 'PUT' : 'POST';
            // @ts-ignore
            const url = isEditMode ?
                `${API_URL}/movimientos/motivos_de_traslado/${params.id}`
                : `${API_URL}/movimientos/motivos_de_traslado/`;

            const response = await fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(stateForm),
            });


            if (response.ok) {
                // @ts-ignore
                const message = isEditMode ?
                    'Medida de seguridad actualizada correctamente.'
                    : 'Medida de seguridad creada correctamente.';
                openSnackbar(message, 'success');
                router.push('/sistema/motivos-traslados');
            } else {
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if(stateForm.nombre){

            postTraslado();
        }else{
            openSnackbar('De completar el campo de motivo de traslado', 'warning')
        }
        // console.log(JSON.stringify(stateForm))
    }

    const handleCancelar = () => {
        router.push('/sistema/motivos-traslados');
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

    return (
        <>

            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="nombre"
                        value={stateForm.nombre}
                        id="nombre"
                        label="Motivo de traslado"
                        variant="outlined"/>
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