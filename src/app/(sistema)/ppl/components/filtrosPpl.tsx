'use client'

import * as React from 'react';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {ChangeEvent} from "react";
import {filterByDateRange} from "@/components/utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import {Search} from "@mui/icons-material";


interface FiltrosTablesProps {
    dataSinFiltro?: {} | any; // Asegúrate de tener el tipo correcto aquí
    handleFiltro?: (dataFiltrada: any[]) => void; // Asegúrate de tener el tipo correcto aquí
    searchField?: string;
    dateSearchField?: string;
    placeholderSearchBar?: string | null;
    fecha_final?: string | null;
    fecha_inicial?: string | null;
}
export default function FiltrosPpl({ dataSinFiltro, handleFiltro, searchField, dateSearchField, placeholderSearchBar= null,fecha_inicial = null, fecha_final = null }: FiltrosTablesProps) {
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
        if (handleFiltro) {
            handleFiltro(dataSinFiltro);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        let datosFiltrados = dataSinFiltro;

        if(searchField){
            //@ts-ignore
            datosFiltrados = dataSinFiltro.filter((item: { [searchField]: string; destinoTraslado: string; }) => {
                //@ts-ignore
                const filtroBusqueda = busqueda ? item[searchField].toLowerCase().includes(busqueda.toLowerCase()) : true;
                const filtroDestino = destino ? item.destinoTraslado === destino : true;

                return filtroBusqueda && filtroDestino;
            });
        }
        if(dateSearchField && valueDateStart){
            const testData = datosFiltrados.filter((item:any)=> {


                console.log(dayjs(item[dateSearchField]) )
                console.log(valueDateEnd)
                console.log(item[dateSearchField] == dayjs(item[dateSearchField]))

                return item[dateSearchField] == dayjs(item[dateSearchField])
            })

            console.log(testData)

            /*if (valueDateStart && valueDateEnd) {
                datosFiltrados = filterByDateRange(datosFiltrados, valueDateStart, valueDateEnd, dateSearchField);
            } else {
                // Si no hay fechas definidas, no se aplica el filtro de fecha
                console.log('Sin filtro de fecha aplicado');
            }*/
        }
        // console.log(datosFiltrados)
        if (handleFiltro) {
            handleFiltro(datosFiltrados);
        }
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="busqueda"
                        name="busqueda"
                        value={busqueda}
                        onChange={handleChange}
                        label={placeholderSearchBar ? placeholderSearchBar : "Buscar por numero de documento..."}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <Search />
                            </InputAdornment>,
                        }}
                    />
                </Grid>
                {/*<Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Destino</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={destino}
                            label="Destino"
                            onChange={handleChangeDestino}
                        >
                            <MenuItem value="">Todos los destinos</MenuItem>  Opción para no aplicar filtro de destino
                            <MenuItem value={'Tacumbu'}>Tacumbu</MenuItem>
                            <MenuItem value={'destino2'}>Destino 2</MenuItem>
                            <MenuItem value={'destino3'}>Destino 3</MenuItem>
                             Agrega aquí más opciones si las necesitas
                        </Select>
                    </FormControl>
                </Grid>*/}
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={fecha_inicial ? fecha_inicial : "Fecha inicial"}
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
                            label={fecha_final ? fecha_final : "Fecha Final"}
                            value={valueDateEnd}
                            onChange={(newValueDateEnd) => {
                                console.log(newValueDateEnd)

                                return setValueDateEnd(newValueDateEnd)

                            }}
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