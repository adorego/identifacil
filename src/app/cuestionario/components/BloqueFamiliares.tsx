import * as React from "react";
import Box from "@mui/material/Box";

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {ChangeEvent, useState} from "react";


interface MyState{
    cabezaFamilia: boolean;
    circuloFamiliar: boolean;
    familia: object;
    tieneConcubino: boolean;
    concubinoDocumento: string;
    concubinoNombre: string;
    concubinoApellido: string;
    tieneHijos: boolean;
    hijos: object;
}

const initialState: MyState = {
    cabezaFamilia: false,
    circuloFamiliar: false,
    familia: {},
    tieneConcubino: false,
    concubinoDocumento: '',
    concubinoNombre: '',
    concubinoApellido: '',
    tieneHijos: false,
    hijos: {},
}

interface Familiar {
    nombre: string;
    vinculo: string;
    sistema: string;
    reclusion: string;
}

interface Hijos {
    nombre: string;
    edad: number;
    lugar: string;
}

export default function BloqueFamiliares (){
    const [state, setState] = useState<MyState>(initialState);

    // Captura cada cambio de estado de los elementos del form y guarda en el state
    const handleChange = (event: any) => {
        const inputName: any = event.target.name;
        const inputValue: any = event.target.value;

        setState({
            ...state,
            [inputName]: inputValue,
        })
    }


    const handleBoolean = (event:  ChangeEvent<HTMLInputElement>) =>{

        const inputName: any = event.target.name;
        const inputValue: any = event.target.value === 'true';

        setState({
            ...state,
            [inputName]: inputValue,
        })
    }


    const [familiares, setFamiliares] = useState<Familiar[]>([
        { nombre: '', vinculo: '', sistema: '', reclusion: '' }
    ]);

    const [hijos, setHijos] = useState<Hijos[]>([
        { nombre: '', edad: 0, lugar: '' }
    ]);

    const handleFamilia = () => {
        setFamiliares([...familiares, { nombre: '', vinculo: '', sistema: '', reclusion: '' }]);
    };

    const handleHijos= () => {
        setHijos([...hijos, { nombre: '', edad: 0, lugar: '' }]);
    };



    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        const nuevosFamiliares = [...familiares];
        nuevosFamiliares[index][name] = value;

        setFamiliares(nuevosFamiliares);

        setState({
            ...state,
            familia: [...familiares],
        })
    };

    const handleInputChangeHijos = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        const nuevosHijos = [...hijos];
        nuevosHijos[index][name] = value;

        setHijos(nuevosHijos);

        setState({
            ...state,
            hijos: [...hijos],
        })
    };

    const handleSubmit = (event: any) =>{
        setState({
            ...state,
            familia: [...familiares],
        })

        console.log(state)
    }


    return(
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">¿Es la cabeza de familia/sustento de la familia?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoLiderFamilia"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.cabezaFamilia}
                                        onChange={handleBoolean}
                                        name='cabezaFamilia'
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={!state.cabezaFamilia}
                                        onChange={handleBoolean}
                                        name='cabezaFamilia'
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} sx={{
                        background: '#f9f9f9',
                        padding: '20px',
                        margin: '20px',
                        borderRadius: '12px',
                        border: '1px solid #dfdfdf',
                    }}>

                        <FormControl>
                            <FormLabel id="circuloFamiliarLabel">Círculo Familiar:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="circuloFamiliarLabel"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.circuloFamiliar}
                                        onChange={handleBoolean}
                                        name='circuloFamiliar'
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={!state.circuloFamiliar}
                                        onChange={handleBoolean}
                                        name='circuloFamiliar'
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        {/*Comienzo de familia */}
                        {familiares.map((familiar, index) => (
                        <Grid container spacing={2} mt={2} key={index}>

                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="familiaNombre">Nombre y apellido</InputLabel>
                                    <OutlinedInput
                                        name="nombre"
                                        value={familiar.nombre}
                                        label='Nombre y apellido'
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoVinfamiliaVinculoculoFamiliar">Vinculo</InputLabel>
                                    <OutlinedInput
                                        name="vinculo"
                                        value={familiar.vinculo}
                                        label="Vinculo"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="vinculoSistema">Vinculo con el sistema penitenciario</InputLabel>
                                    <OutlinedInput
                                        name="sistema"
                                        value={familiar.sistema}
                                        label="Vinculo con el sistema penitenciario"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="lugarReclusion">Lugar</InputLabel>
                                    <OutlinedInput
                                        name="reclusion"
                                        value={familiar.reclusion}
                                        label="Lugar"
                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        ))}
                        {/* Button Add Familiar */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item sm={12}>
                                <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleFamilia}>
                                    Agregar familiar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* CONCUBINO */}
                    <Grid item sm={12} mt={2}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">Concubino</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoLiderFamilia"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.tieneConcubino}
                                        onChange={handleBoolean}
                                        name='tieneConcubino'
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio

                                        value='false'
                                        checked={!state.tieneConcubino}
                                        onChange={handleBoolean}
                                        name='tieneConcubino'
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="concubinoDocumento">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        name="concubinoDocumento"
                                        value={state.concubinoDocumento}
                                        label="Nro. de documento"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoNombreConcubino">Nombre</InputLabel>
                                    <OutlinedInput
                                        name="concubinoNombre"
                                        value={state.concubinoNombre}
                                        label="Nombre"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoApellidoConcubino">Apellido</InputLabel>
                                    <OutlinedInput
                                        name="concubinoApellido"
                                        value={state.concubinoApellido}
                                        label="Apellido"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Hijos */}
                    <Grid item sm={12} sx={{
                        background: '#f9f9f9',
                        padding: '20px',
                        margin: '20px',
                        borderRadius: '12px',
                        border: '1px solid #dfdfdf',
                    }}>
                        <FormControl>
                            <FormLabel id="datosHijos">Hijos:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datosHijos"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        name='tieneHijos'
                                        value='true'
                                        checked={state.tieneHijos}
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        name='tieneHijos'
                                        value='false'
                                        checked={!state.tieneHijos}
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        {hijos.map((hijos, index) => (
                        <Grid container spacing={2} key={index} mt={2}>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="nombreHijo">Nombre del hijo/a</InputLabel>
                                    <OutlinedInput
                                        name="nombre"
                                        value={hijos.nombre}
                                        onChange={(event) => handleInputChangeHijos(index, event)}
                                        label="Nombre del hijo/a"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoNombreConcubino">Edad</InputLabel>
                                    <OutlinedInput
                                        name="edad"
                                        value={hijos.edad}
                                        onChange={(event) => handleInputChangeHijos(index, event)}
                                        label="Edad"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoLugarSistemaHijo">Lugar(Dentro del sistema penitenciario</InputLabel>
                                    <OutlinedInput
                                        name="lugar"
                                        onChange={handleInputChangeHijos}
                                        value={hijos.lugar}
                                        onChange={(event) => handleInputChangeHijos(index, event)}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        ))}
                        <Grid container spacing={2} mt={2}>
                            <Grid item sm={12}>
                                <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleHijos}>
                                    Agregar hijo/a
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={12}>
                        <Button variant="contained"  onClick={handleSubmit}>
                            Guardar cambios
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}