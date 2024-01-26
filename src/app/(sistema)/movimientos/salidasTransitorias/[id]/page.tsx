'use client'

import * as React from 'react';
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField,} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomTable from "@/components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import {salidasTransitoriasType} from "@/components/utils/penalesType";

const initialState = {
    numeroDocumento: '',
    fechaOficio: '',
    documento: '',
    horaSalida: '',
    diasSalida: '',
    horaLlegada: '',
    diasLlegada: '',
    estado: '',
    tiempoPermiso: '',
}

export default function Page(){
    const [formData, setFormData] = React.useState<salidasTransitoriasType>(initialState);

    const handleChange = (event: { target: { name: string; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    // Manejador de envio
    const handleSubmit = (e: { preventDefault: () => void; }) => {
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
            <Box mb={3}>
                <TituloComponent titulo='Salidas trnasitorias' />
            </Box>
            <Paper elevation={1}>

                <Box p={3}>
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
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker sx={{width: '100%'}} label="Hora Salida"
                                                value={formData.horaSalida}
                                                onChange={(newValue : string | any) => setFormData({
                                                    ...formData,
                                                    horaSalida: newValue,
                                                })}
                                                />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Dias de salidas"
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
                                                onChange={(newValue : any ) => setFormData({
                                                    ...formData,
                                                    horaLlegada: newValue,
                                                })}/>
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
                            <Button variant="contained" sx={{ marginRight: '10px', marginTop: '10px' }} onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <CustomTable showId={true} data={dataEspeciales} headers={headersEspeciales}
                                     options={{
                                         rowsPerPageCustom: 5,
                                         pagination: true,
                                         deleteOption: false
                                     }}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}