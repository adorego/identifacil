'use client';

import * as React from 'react';
import TituloComponent from "../../../../components/titulo/tituloComponent";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {useEffect} from 'react';
import {useGlobalContext} from "../../../Context/store";

export default function Crear(){
    const {userId, setUserId, data, setData} = useGlobalContext();

    useEffect(()=>{
        setUserId('2');
        setData([
            {firstName: 'Time'},
            {firstName: 'Michael'},
            {firstName: 'Kyle'},
        ])
    },[])

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
                    <p>
                        User ID: {userId}
                    </p>
                    <p>
                        First Name:
                    </p>
                    <ol>
                        {data.map((e,i)=><li key={i}>{e.firstName}</li>)}
                    </ol>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                name="outlined-basic"
                                label="Establecimiento penitenciario"
                                variant="outlined" />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                name="outlined-basic2"
                                label="Ip de la rol"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid item sm={12} mt={4}>
                        <Stack direction='row' spacing={2}>

                            <Button variant='contained'>
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