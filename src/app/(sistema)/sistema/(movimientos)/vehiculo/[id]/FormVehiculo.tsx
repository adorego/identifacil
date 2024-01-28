'use client'

import {Box, Button, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {sendRequest} from "@/app/api";

interface MyState {
    id: number;
    chapa: string;
    modelo: string;
    lastUpdate: string;

}
const initialState: MyState = {
    id: 0,
    chapa: "",
    modelo: "",
    lastUpdate: ""
}

export default function FormVehiculo({params} : { params: { id: number } }){
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode : number | string = params && params.id;

    const handleLoading = (value:boolean):void =>{
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }
    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            handleLoading(true);
            fetch(`http://localhost:5000/vehiculo?id=${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias
                    if (data.length > 0 && data[0].modelo) {
                        setStateForm({
                            id: data[0].id,
                            modelo: data[0].modelo,
                            chapa: data[0].chapa,
                            lastUpdate: '' // Asegúrate de definir un valor por defecto para las propiedades faltantes
                        });
                    }
                }).then( ()=>{
                handleLoading(false);
            })
                .catch(error => {
                    handleLoading(false);
                    console.error('Error:', error)
                });
            handleLoading(false);
        }
    }, [isEditMode, params.id]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;


        setStateForm((prevState) =>(
            {
                ...prevState,
                [name]: value,
            }
        ))
    }


    const handleSubmit = async () => {
        setLoading(true);

        const response = await sendRequest('vehiculo', stateForm, params.id, isEditMode);

        setLoading(false);
        if (response.ok) {
            // @ts-ignore
            const message = isEditMode !== 'crear'
                ? 'Vehiculo actualizado correctamente.'
                : 'vehiculo agregado correctamente.';
            openSnackbar(message, 'success');
            router.push('/sistema/vehiculo');
        } else {
            openSnackbar('Error en la operación.', 'error');
            console.error('Error:', await response.text());
        }
    };



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

    return(
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="chapa"
                        value={stateForm.chapa}
                        id="chapa"
                        label="Chapa"
                        variant="outlined" />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="modelo"
                        value={stateForm.modelo}
                        id="modelo"
                        label="Modelo"
                        variant="outlined" />
                </Grid>
            </Grid>
            <Grid item sm={12} mt={4}>
                <Stack direction='row' spacing={2}>

                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant='outlined' onClick={()=>router.push('/sistema/vehiculo')}>
                        Cancelar
                    </Button>
                </Stack>
            </Grid>
        </>
    )

}