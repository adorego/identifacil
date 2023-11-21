import * as React from "react";
import {FormEvent, useState} from 'react';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Grid,
    Box,
    InputLabel,
    OutlinedInput, Button, Typography, TextField, Select, MenuItem, Stack
} from "@mui/material";


interface MyState {
    nombre: string;
    apellido: string;
    apodo: string;
    estadoCivil: string;
    fechaNacimiento: string;
    nacionalidad: string;
    lugarNacimiento: string;
    sexo: string;
    tipoDocument: string;
    numeroDocumento: string;
    direccion: string;
    barrio: string;
    compania: string;
    numeroContacto: string;
    contactoEmergencia1: string;
    contactoEmergencia2: string;
    puebloIndigena: boolean;
    nombreEtnia: string;
    grupoLgbti: string;

}

const initialState: MyState = {
    nombre: '',
    apellido: '',
    apodo: '',
    estadoCivil: '',
    fechaNacimiento: '',
    nacionalidad: '',
    lugarNacimiento: '',
    sexo: '',
    tipoDocument: '',
    numeroDocumento: '',
    direccion: '',
    barrio: '',
    compania: '',
    numeroContacto: '',
    contactoEmergencia1: '',
    contactoEmergencia2: '',
    puebloIndigena: false,
    nombreEtnia: '',
    grupoLgbti: '',

}


export default function BloqueDatosPersonales(){

    const [state, setState] = useState<MyState>(initialState);
    const [formData, setFormData] = useState<MyState>(initialState);


    // Manejador para actualizar selects
    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formData;
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };


    // Captura cambio de estados de inputs que no sean booleanos y guardan en el state
    const handleChange = (event: any) => {

        const inputName: string = event.target.name;
        let inputValue: any = '';

        inputValue = event.target.value;


        setState({
            ...state,
            [inputName]: inputValue,
        });
    }
    return(
        <>
            <Box>
                <Typography variant='h6'>
                    Datos Personales
                </Typography>
                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="grupoSanguineo">
                                Nombre
                            </InputLabel>
                            <OutlinedInput
                                label="Nombre"
                                name="nombre"
                                value={state.nombre}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="grupoSanguineo">
                                Apellido
                            </InputLabel>
                            <OutlinedInput
                                label="Apellido"
                                name="apellido"
                                value={state.apellido}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="apodo">
                                Apodo
                            </InputLabel>
                            <OutlinedInput
                                label="Apodo"
                                name="apodo"
                                value={state.apodo}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>

                            <TextField
                                fullWidth
                                label="Estado civil"
                                name="estadoCivil"
                                value={state.estadoCivil}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />

                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth={true}>
                            <TextField
                                fullWidth
                                label="Fecha de nacimiento"
                                name="fechaNacimiento"
                                type='date'
                                value={state.fechaNacimiento}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Nacionalidad</InputLabel>
                            <Select
                                value={formData.nacionalidad}
                                onChange={handleSelectChange}
                                label="Nacionalidad"
                                name="nacionalidad"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Lugar de nacimiento</InputLabel>
                            <Select
                                value={formData.lugarNacimiento}
                                onChange={handleSelectChange}
                                label="Luagar de nacimiento"
                                name="lugarNacimiento"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Direccion"
                            name="direccion"
                            value={state.direccion}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Barrio</InputLabel>
                            <Select
                                value={formData.compania}
                                onChange={handleSelectChange}
                                label="Barrio"
                                name="compania"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Compañia</InputLabel>
                            <Select
                                value={formData.compania}
                                onChange={handleSelectChange}
                                label="Compañia"
                                name="compania"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            label="Numero de contacto"
                            name="numeroContacto"
                            value={state.numeroContacto}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Contacto de emergencia 1</InputLabel>
                            <Select
                                value={formData.contactoEmergencia1}
                                onChange={handleSelectChange}
                                label="Contacto de emergencia 1"
                                name="contactoEmergencia1"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Contacto de emergencia 2</InputLabel>
                            <Select
                                value={formData.contactoEmergencia2}
                                onChange={handleSelectChange}
                                label="Contacto de emergencia 2"
                                name="contactoEmergencia2"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* ------------------------ Pueblo Indigena -------------------------------------*/}
                    <Grid item sm={12}>
                        <Typography variant='h6'>
                            Pueblo indigenas
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Pertenece a un pueblo indigena</InputLabel>
                            <Select
                                value={formData.puebloIndigena}
                                onChange={handleSelectChange}
                                label="Pertenece a un pueblo indigena"
                                name="puebloIndigena"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre de la etnia"
                            name="nombreEtnia"
                            value={state.nombreEtnia}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* ------------------------ Comunidad LGBTI -------------------------------------*/}
                    <Grid item sm={12}>
                        <Typography variant='h6'>
                            Comunidad LGBTI
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Pertenece a la comunidad</InputLabel>
                            <Select
                                value={formData.grupoLgbti}
                                onChange={handleSelectChange}
                                label="Pertenece a la comunidad"
                                name="grupoLgbti"
                            >
                                {/* Replace these menu items with your options */}
                                <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <Stack direction="row" spacing={2}>
                            <Button variant='contained'>
                                Guardar
                            </Button>
                            <Button variant='outlined'>
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}