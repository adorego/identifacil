'use client';

import * as React from 'react';
import TituloComponent from "../../../../../components/titulo/tituloComponent";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from 'react';
import {useGlobalContext} from "../../../../Context/store";

export default function Crear(){
    const [stateForm, setStateForm] = useState({numeroIp: '', establecimiento: ''});
    const {userId, setUserId, openSnackbar} = useGlobalContext();
    const [data, setData] = useState([{firstName: ''}])

    useEffect(()=>{
        setUserId('2');
        setData([
            {firstName: 'Time'},
            {firstName: 'Michael'},
            {firstName: 'Kyle'},
        ])
    },[])

    const handleChange = (e: { target: { name: any; value: any; }; }) =>{
        const {name, value} = e.target;

        setStateForm(prev =>(
            {
                ...stateForm,
            [name]: value,
            }
        ))
    }
    const handleClick = () =>{
        openSnackbar("Chofer creado correctamente.", "success");
    }

    const handleSubmit = () =>{
        console.log(JSON.stringify(stateForm))
    }
    return(
        <>
            <TituloComponent titulo='Nuevo rol' />
            <Box mt={4}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <Typography variant='h6'>
                        Datos de la rol
                    </Typography>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                name="Nombre del rol"
                                id="descripcion"
                                label="Nombre del rol"
                                variant="outlined" />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                name="slug"
                                id="slug"
                                label="Codigo"
                                variant="outlined" />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                onChange={handleChange}
                                name="Descripcion del rol"
                                id="descripcion"
                                label="Nombre del rol"
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