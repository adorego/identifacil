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
    marca: string;
    chasis: string;
    anho: number;

}

const initialState: MyState = {
    id: 0,
    chapa: "",
    marca: "",
    chasis: "",
    anho: 0,
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function FormVehiculo({params} : { params: { id: number | string} }){
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
            fetch(`${API_URL}/movimientos/vehiculos`)
                .then(response => response.json())
                .then(data => {

                    // console.log(Object.keys(data).map(key=>data[key]).find((item:any)=>item.id == params.id))
                    const datosVehiculos = Object.keys(data).map(key=>data[key]).find((item:any)=>item.id == params.id);


                    if (data){
                        setStateForm({
                            id: datosVehiculos.id,
                            marca: datosVehiculos.marca,
                            chapa: datosVehiculos.chapa,
                            chasis: datosVehiculos.chasis,
                            anho: datosVehiculos.anho,
                        });
                    }

                    /*if (data.length > 0 && data[0].modelo) {
                        setStateForm({
                            id: data[0].id,
                            modelo: data[0].modelo,
                            chapa: data[0].chapa,
                            lastUpdate: ''
                        });
                    }*/
                }).then( ()=>{
                handleLoading(false);
            }).catch(error => {
                    handleLoading(false);
                    console.error('Error:', error)
                }).finally(()=>{
                setLoading(false);
            })

            handleLoading(false);

        }else{
            setLoading(false);
        }
    }, [isEditMode, params.id]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;

        if(name !== 'anho'){

            setStateForm((prevState) =>(
                {
                    ...prevState,
                    [name]: value,
                }
            ))
        }else{
            if(value.match(/^\d*\.?\d*$/)){
                setStateForm((prevState) =>(
                    {
                        ...prevState,
                        [name]: value,
                    }
                ))
            }

        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // @ts-ignore
            const method = isEditMode ? 'PUT' : 'POST';
            console.log('metodo: ' + isEditMode)
            console.log('metodo: ' + isEditMode)

            // @ts-ignore
            const url = isEditMode
                ? `${API_URL}/movimientos/vehiculos/${params.id}`
                : `${API_URL}/movimientos/vehiculos`;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stateForm),
            });

            // console.log(response.message)
            if (response.ok) {
                // @ts-ignore
                const message = isEditMode
                    ? 'Vehiculo actualizada correctamente.'
                    : 'Vehiculo creada correctamente.';

                openSnackbar(message, 'success');

                router.push('/sistema/vehiculo');
            } else {
                console.log(response)
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit_old = async () => {
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
                        name="marca"
                        value={stateForm.marca}
                        id="marca"
                        label="Marca"
                        variant="outlined" />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="chasis"
                        value={stateForm.chasis}
                        id="chasis"
                        label="Chasis"
                        variant="outlined" />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="anho"
                        value={stateForm.anho}
                        id="anho"
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