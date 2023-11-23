'use client';

import * as React from 'react';
import TituloComponent from "../../../../../components/titulo/tituloComponent";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from 'react';
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";

export default function Page({ params }: { params: { id: number } }){
    const [stateForm, setStateForm] = useState();
    const [loading, setLoading] = React.useState(false);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();

    const handleChange = (e) =>{
        const {name, value} = e.target;

        setStateForm(() =>(
            {
                ...stateForm,
            [name]: value,
            }
        ))
    }

    const postTraslado = async () => {
        try {
            setLoading(true);

            // await delay(5000);

            const response = await fetch('http://localhost:5000/motivosTraslados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stateForm) // formData contiene los datos de tu formulario
            });

            setLoading(false);

            if (response.ok) {
                openSnackbar('Motivo de traslado creada correctamente.');
                router.push('/sistema/motivos-traslado');
            }
            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const data = await response.json();
            console.log('Traslado creado:', data);
        } catch (error) {
            setLoading(false);

            console.error('Error:', error);
        }
    };

    const handleSubmit = () =>{
        postTraslado();
        console.log(JSON.stringify(stateForm))
    }

    return(
        <>
            <TituloComponent titulo='Nueva Motivo de traslado' />
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                name="descripcion"
                                id="descripcion"
                                label="Motivos de traslado"
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
                </Paper>
            </Box>
        </>
    );
}