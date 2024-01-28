'use client'

import * as React from 'react';

import {Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Stack, TextField} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ChangeEvent} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {filterByDateRange} from "@/components/utils/utils";

interface FiltrosTablesProps {
    dataSinFiltro: any[]; // Asegúrate de tener el tipo correcto aquí
    handleFiltro: (dataFiltrada: any[]) => void; // Asegúrate de tener el tipo correcto aquí
}
export default function FiltrosTables({ dataSinFiltro, handleFiltro }: FiltrosTablesProps) {
    // Variables para selector de rango de fecha
    const [valueDateStart, setValueDateStart] = React.useState<Dayjs | null>(null);
    const [valueDateEnd, setValueDateEnd] = React.useState<Dayjs | null>(null);

    // Variables para el select
    const [destino, setDestino] = React.useState('');
    const [busqueda, setBusqueda] = React.useState('');

    const handleChangeDestino = (event: SelectChangeEvent) => {
        setDestino(event.target.value as string);

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    }

    const handleClearFilters = () => {
        // Resetear los valores de los filtros a sus valores iniciales
        setBusqueda('');
        setDestino('');
        setValueDateStart(null);
        setValueDateEnd(null);

        // Restaurar los datos originales
        handleFiltro(dataSinFiltro);
    };

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let datosFiltrados = dataSinFiltro.filter(item => {
            const filtroBusqueda = busqueda ? item.documento.toLowerCase().includes(busqueda.toLowerCase()) : true;
            const filtroDestino = destino ? item.destinoTraslado === destino : true;

            return filtroBusqueda && filtroDestino;
        });

        if (valueDateStart && valueDateEnd) {
            datosFiltrados = filterByDateRange(datosFiltrados, valueDateStart, valueDateEnd, 'fechaTraslado');
        } else {
            // Si no hay fechas definidas, no se aplica el filtro de fecha
            console.log('Sin filtro de fecha aplicado');
        }

        handleFiltro(datosFiltrados);
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        id="busqueda"
                        name="busqueda"
                        value={busqueda}
                        onChange={handleChange}
                        label="Buscar por nombre o numero de ppl"
                        type='text'
                        variant="outlined"
                        fullWidth/>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Destino</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={destino}
                            label="Destino"
                            onChange={handleChangeDestino}
                        >
                            <MenuItem value="">Todos los destinos</MenuItem> {/* Opción para no aplicar filtro de destino */}
                            <MenuItem value={'Tacumbu'}>Tacumbu</MenuItem>
                            <MenuItem value={'destino2'}>Destino 2</MenuItem>
                            <MenuItem value={'destino3'}>Destino 3</MenuItem>
                            {/* Agrega aquí más opciones si las necesitas */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha inicial"
                            value={valueDateStart}
                            onChange={(newValueDateStart) => setValueDateStart(newValueDateStart)}
                            sx={{
                                width:'100%',
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha Final"
                            value={valueDateEnd}
                            onChange={(newValueDateEnd) => setValueDateEnd(newValueDateEnd)}
                            sx={{
                                width:'100%',
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <Stack direction='row'>
                        <Button variant='contained' fullWidth sx={{py: '25px '}} onClick={handleSubmit}>
                            Filtrar
                        </Button>
                        <IconButton aria-label="delete"  onClick={handleClearFilters}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Grid>

            </Grid>
        </>
    )
}