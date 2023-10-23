'use client'

import * as React from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography, Grid, IconButton, Modal, Breadcrumbs, Link,
} from '@mui/material';

import {FileUploadOutlined} from "@mui/icons-material";
import QueryBlock from "../../../components/blocks/QueryBlock";

export default  function Page(){
    const [formData, setFormData] = React.useState({
        hechoPunible: '',
        tipoSalida: '',
        personaCustodia: '',
        chapaVehiculo: '',
        fechaHoraSalida: '',
        lugarTraslado: '',
        chofer: '',
        modeloVehiculo: '',
        fechaHoraRegreso: '',
        documentoAutorizacion: '',
        documentoCumplimiento: '',
        observaciones: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };


    // Manejador de envio
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        console.log(JSON.stringify(formData));
    };

    return(
        <Box>
            <h2>Movimientos</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link underline="hover" color="inherit" href="/movimientos">
                    Movimientos
                </Link>
                <Typography color="text.primary">Salidas especiales</Typography>
            </Breadcrumbs>

            <QueryBlock/>
            <Card sx={{marginTop:"20px"}}>
                <CardContent>
                    <Typography variant='h6' mb={2}>Salidas especiales</Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>

                            <TextField
                                label="Hecho Punible"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="hechoPunible"
                                value={formData.hechoPunible}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" variant="outlined">
                                <InputLabel>Tipo de salida</InputLabel>
                                <Select
                                    name="tipoSalida"
                                    value={formData.tipoSalida}
                                    onChange={handleChange}
                                    label="Tipo de salida"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="1">Emergencia Familiar</MenuItem>
                                    {/* Aquí puedes agregar tus opciones */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Persona que custodia"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="personaCustodia"
                            value={formData.personaCustodia}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={6}>


                            <TextField
                                label="Chapa del vehiculo"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="chapaVehiculo"
                                value={formData.chapaVehiculo}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />


                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Fecha y hora de salida"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="fechaHoraSalida"
                            type="datetime-local"
                            value={formData.fechaHoraSalida}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Especificar lugar de traslado"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lugarTraslado"
                            value={formData.lugarTraslado}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Chofer"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="chofer"
                            value={formData.chofer}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Modelo del vehículo"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="modeloVehiculo"
                            value={formData.modeloVehiculo}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Fecha y hora de regreso"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="fechaHoraRegreso"
                            type="datetime-local"
                            value={formData.fechaHoraRegreso}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    label='Adjuntar documento de autorización de la salida'
                                    value={formData.documentoAutorizacion ? formData.documentoAutorizacion.name : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton component="label" >
                                                <FileUploadOutlined />
                                                <input
                                                    styles={{display:"none"}}
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileChange}
                                                    name="documentoAutorizacion"
                                                />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>

                                <TextField
                                    label="Adjuntar documento de cumplimiento del traslado"
                                    variant="outlined"
                                    fullWidth
                                    name='documentCumplientoContainer'
                                    value={formData.documentoCumplimiento ? formData.documentoCumplimiento.name : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton component="label" >
                                                <FileUploadOutlined />
                                                <input
                                                    styles={{display:"none"}}
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileChange}
                                                    name="documentoCumplimiento"
                                                />
                                            </IconButton>
                                        ),
                                    }}
                                />

                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="Observaciones"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '10px' }} onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                            Cancelar
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}