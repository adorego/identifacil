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
    Link, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import QueryBlock from "../../../../components/blocks/QueryBlock";
import {FileUploadOutlined} from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomTable from "../../../../components/CustomTable";



export default function SalidasTransitorias(){
    const [formData, setFormData] = React.useState({
        numeroDocumento: '',
        fechaOficio: '',
        documento: '',
        horaSalida: '',
        diasSalida: '',
        horaLlegada: '',
        diasLlegada: '',
        estado: '',
        tiempoPermiso: '',
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

    // Datos para Salidas especiales
    const headersEspeciales = [
        { id: 'id', label: 'ID' },
        { id: 'momentoSalida', label: 'Fecha/Hora salida' },
        { id: 'observacionSalida', label: 'Observacion' },
        { id: 'momentoEntrada', label: 'Fecha/Hora entrada' },
        { id: 'observacionEntrada', label: 'Observacion' },
    ];
    const dataEspeciales = [
        {id: 1,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 2,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 3,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 4,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 5,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 6,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 7,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 8,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 9,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 10,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
        {id: 11,  momentoSalida: '01/01/2023 09:00', observacionSalida: 'N/D',  momentoEntrada: '01/01/2023 09:00', observacionEntrada: 'N/D', url: '/movimientos/extradiciones'},
    ];
    return(
        <Box>

            <Grid container spacing={2}>

                <Grid item xs={3}>

                    <TextField
                        label="Nro documento"
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Fecha oficio"
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        name="fechaOficio"
                        type="date"
                        value={formData.fechaOficio}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    {/*<TextField
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        label='Adjuntar documento'
                        value={formData.documento ? formData.documento.name : ''}
                        InputProps={{
                            endAdornment: (
                                <IconButton component="label" >
                                    <FileUploadOutlined />
                                    <input
                                        styles={{display:"none"}}
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                        name="documento"
                                    />
                                </IconButton>
                            ),
                        }}
                    />
*/}
                </Grid>

                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker sx={{width: '100%'}} label="Hora Salida"
                                        value={formData.horaSalida}
                                        onChange={(newValue) => setFormData({
                                            ...formData,
                                            horaSalida: newValue,
                                        })}
                                        name='horaSalida' />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Dias de salida"
                        variant="outlined"
                        sx={{width: '100%', marginTop:'8px'}}
                        fullWidth
                        margin='normal'
                        name="diasSalida"
                        value={formData.diasSalida}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker sx={{width: '100%'}}
                                        label="Hora llegada"
                                        value={formData.horaLlegada}
                                        onChange={(newValue) => setFormData({
                                            ...formData,
                                            horaLlegada: newValue,
                                        })}
                                        name='horaLlegada' />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Dias de llegada"
                        variant="outlined"
                        sx={{width: '100%', marginTop:'8px'}}
                        fullWidth
                        margin="normal"
                        name="diasLlegada"
                        value={formData.diasLlegada}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            label="Estado"

                        >
                            <MenuItem value="1">Estado 1</MenuItem>
                            <MenuItem value="2">Estado 2</MenuItem>
                            <MenuItem value="3">Estado 3</MenuItem>
                            {/* Aquí puedes agregar tus opciones */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Tiempo de permiso"
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        name="tiempoPermiso"
                        value={formData.tiempoPermiso}
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


            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <CustomTable data={dataEspeciales} headers={headersEspeciales} targetURL='' />
                </Grid>
            </Grid>
        </Box>
    )
}