import * as React from 'react';
import TituloComponent from "../../../../components/titulo/tituloComponent";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";

export default function Crear(){

    return(
        <>
            <TituloComponent titulo='Nueva camara' />
            <Box mt={4}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <Typography variant='h6'>
                        Datos de la camara
                    </Typography>
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
                                label="Ip de la camara"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid sm={12} mt={4}>
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