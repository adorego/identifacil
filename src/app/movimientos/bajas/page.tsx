'use client'

import * as React from 'react';
import {
    Box,
    Breadcrumbs, Button,
    Card,
    CardContent,
    FormControl,
    Grid, IconButton,
    InputLabel,
    Link, MenuItem, Paper, Select,
    TextField,
    Typography
} from "@mui/material";
import QueryBlock from "../../../components/blocks/QueryBlock";
import {FileUploadOutlined} from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomTable from "../../../components/CustomTable";



export default function Page(){
    const [formData, setFormData] = React.useState({
        numeroDocumento: '',
        fechaDocumento: '',
        fechaBaja: '',
        tipoBaja: '',
        personaAutoriza: '',
        observaciones: '',
        adjunto: '',
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

    // Manejadro de Select
    const handleSelectChange = (event: any) => {
        const name = event.target.name as keyof typeof formData;
        console.log('valor ' . name);
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
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
                <Typography color="text.primary">Bajas</Typography>
            </Breadcrumbs>

            <QueryBlock />

            <Paper elevation={1} sx={{marginTop: '20px'}}>
                <Box sx={{padding:"20px"}}>
                    <Typography variant='h6' mb={2}>Bajas</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="Nro. de resolución/Oficio"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="numeroDocumento"
                                value={formData.numeroDocumento}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Fecha de resolución/Oficio"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="fechaDocumento"
                                type="date"
                                value={formData.fechaDocumento}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Fecha de baja"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="fechaBaja"
                                type="date"
                                value={formData.fechaBaja}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='normal' variant="outlined">
                                <InputLabel>Tipo de medidas de seguridad</InputLabel>
                                <Select
                                    value={formData.tipoBaja}
                                    onChange={handleSelectChange}
                                    label="Tipo de medidas de seguridad"
                                    name="tipoBaja"
                                >
                                    {/* Replace these menu items with your options */}
                                    <MenuItem value="option1">Baja 1</MenuItem>
                                    <MenuItem value="option2">Baja 2</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Persona que autoriza"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="personaAutoriza"
                                value={formData.personaAutoriza}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Observaciones"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    label='Adjuntar documento de autorización de la salida'
                                    value={formData.adjunto ? formData.adjunto.name : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton component="label" >
                                                <FileUploadOutlined />
                                                <input
                                                    styles={{display:"none"}}
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileChange}
                                                    name="adjunto"
                                                />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '10px' }} onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button variant="outlined"  style={{ marginTop: '10px' }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>


                </Box>
            </Paper>
        </Box>
    )
}