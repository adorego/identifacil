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
    OutlinedInput, Button
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";

interface MyState {
    nivelAcademico: string;
    institucionEducativa: string;
    oficio: boolean;
    nombreOficio: string;
    ultimoTrabajo: string;
}

const initialState: MyState = {
    nivelAcademico: '',
    institucionEducativa: '',
    oficio: true,
    nombreOficio: '',
    ultimoTrabajo: '',
};

export default function BloqueEducacion() {
    const [state, setState] = useState<MyState>(initialState);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(JSON.stringify(state));
    }


    // Captura cada cambio de estado de los elementos del form y guarda en el state
    const handleChange = (event: any) => {

        const inputName: string = event.target.name;
        let inputValue: any = '';

        // Si es oficio el nombre del input se convierte el valor a booleano
        if(inputName === 'oficio'){
            inputValue = event.target.value === 'true';
        }else{
            inputValue = event.target.value;
        }


        setState({
            ...state,
            [inputName]: inputValue,
        });

        // console.log(state)
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >

                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoEducacion">Nivel Academico</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoEducacion"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="primaria" control={
                                    <Radio
                                        value='primaria'
                                        checked={state.nivelAcademico === 'primaria'}
                                        onChange={handleChange}
                                        name='nivelAcademico'
                                    />
                                } label="Primaria"/>
                                <FormControlLabel value="secundaria" control={
                                    <Radio
                                        value='secundaria'
                                        checked={state.nivelAcademico === 'secundaria'}
                                        onChange={handleChange}
                                        name='nivelAcademico'
                                    />
                                } label="Secundaria"/>
                                <FormControlLabel value="terciaria" control={
                                    <Radio
                                        value='terciaria'
                                        checked={state.nivelAcademico === 'terciaria'}
                                        onChange={handleChange}
                                        name='nivelAcademico'
                                    />
                                } label="Terciaria"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="institucionEducactia">Institución educativa</InputLabel>
                            <OutlinedInput
                                name="institucionEducativa"
                                label="Institución educativa"
                                value={state.institucionEducativa}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoOficio">Cuenta con algún oficio</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoOficio"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si"
                                                  control={
                                                      <Radio
                                                          value={true}
                                                          checked={state.oficio === true}
                                                          onChange={handleChange}
                                                          name='oficio'
                                                      />
                                                  } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value={false}
                                        checked={state.oficio === false}
                                        onChange={handleChange}
                                        name='oficio'
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoOficio">Oficio</InputLabel>
                            <OutlinedInput
                                name="nombreOficio"
                                value={state.nombreOficio}
                                label="Oficio"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                            <OutlinedInput
                                name="ultimoTrabajo"
                                value={state.ultimoTrabajo}
                                label="Ultimo lugar de trabajo"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12} mt={4}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}