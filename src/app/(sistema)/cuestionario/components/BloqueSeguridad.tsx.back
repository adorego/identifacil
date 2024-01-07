import * as React from "react";
import Box from "@mui/material/Box";


import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup
} from "@mui/material";
import {ChangeEvent, useState} from "react";

interface MyState{
    riesgoParaPersonal: boolean;
    riesgoParaPersonalRpta: string;
    riesgoReclusos: boolean;
    riesgoReclusosRpta: string;
    riesgoPorReclusos: boolean;
    riesgoPorReclusosRpta: string;
    danhoPropiedad: boolean;
    danhoPropiedadRpta: string;
    miembroGrupo: boolean;
    miembroGrupoRpta: string;
    entrenamientoMilitar: boolean;
    entrenamientoMilitarRpta: string;
    funcionarioPublico: boolean;
    funcionarioPublicoRpta: string;

}

const initialState: MyState = {
    riesgoParaPersonal: false,
    riesgoParaPersonalRpta: '',
    riesgoReclusos: false,
    riesgoReclusosRpta: '',
    riesgoPorReclusos: false,
    riesgoPorReclusosRpta: '',
    danhoPropiedad: false,
    danhoPropiedadRpta: '',
    miembroGrupo: false,
    miembroGrupoRpta: '',
    entrenamientoMilitar: false,
    entrenamientoMilitarRpta: '',
    funcionarioPublico: false,
    funcionarioPublicoRpta: '',
}

export default function BloqueSeguridad ({ onCloseAccordion }){

    const [state, setState] = useState<MyState>(initialState)

    const handleChange = (event: any)=>{
        const inputName: string = event.target.name;

        setState({
            ...state,
            [inputName]: event.target.value,
        });
    }

    const handleBoolean = (event:  ChangeEvent<HTMLInputElement>) => {

        const inputName: string = event.target.name;
        const inputValue = event.target.value === 'true';

        setState({
            ...state,
            [inputName]: inputValue,
        });

    }

    // captura click en boton guardar para luego enviar objeto como JSON
    const  handleClick = (event: any)=>{
        event.preventDefault();
        onCloseAccordion(); // Cierra el acordeon

        // Convierte a JSON el state
        console.log(JSON.stringify(state));

        // TODO: Hacer FETCH
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
                <Grid container spacing={2} >

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoPersona;">¿Riesgo para el personal?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoPersona;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.riesgoParaPersonal === true}
                                        name='riesgoParaPersonal'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.riesgoParaPersonal === false}
                                        name='riesgoParaPersonal'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='riesgoParaPersonalRpta'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                name="riesgoParaPersonalRpta"
                                value={state.riesgoParaPersonalRpta}
                                onChange={handleChange}
                                label="Observacion"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoRecluso;">¿Riesgo para otros reclusos?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoRecluso;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.riesgoReclusos === true}
                                        name='riesgoReclusos'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.riesgoReclusos === false}
                                        name='riesgoReclusos'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='riesgoReclusosRpta'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                name="riesgoReclusosRpta"
                                value={state.riesgoReclusosRpta}
                                onChange={handleChange}
                                label="Observacion"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoOtroRecluso;">¿Riesgo de ser lesionado por otros reclusos?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoOtroRecluso;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.riesgoPorReclusos === true}
                                        name='riesgoPorReclusos'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.riesgoPorReclusos === false}
                                        name='riesgoPorReclusos'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='riesgoPorReclusosRpta;'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                name="riesgoPorReclusosRpta"
                                value={state.riesgoPorReclusosRpta}
                                onChange={handleChange}
                                label="Observacion"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="danhoPropiedad;">¿Riesgo de dañar la propiedad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="danhoPropiedad;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.danhoPropiedad === true}
                                        name='danhoPropiedad'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.danhoPropiedad === false}
                                        name='danhoPropiedad'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='danhoPropiedadRpta'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                name="danhoPropiedadRpta"
                                value={state.danhoPropiedadRpta}
                                onChange={handleChange}
                                label="Observacion"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="grupoAmenaza;">¿Miembro de un grupo que constituye una amenaza para la seguridad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="grupoAmenaza;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.miembroGrupo === true}
                                        name='miembroGrupo'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.miembroGrupo === false}
                                        name='miembroGrupo'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="miembroGrupoRpta"
                            >Nombre del grupo
                            </InputLabel>
                            <OutlinedInput
                                name="miembroGrupoRpta"
                                value={state.miembroGrupoRpta}
                                onChange={handleChange}
                                label="Nombre del grupo"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="entrenamientoMilitar;">¿Entrenamiento militar previo?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="entrenamientoMilitar"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.entrenamientoMilitar === true}
                                        name='entrenamientoMilitar'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.entrenamientoMilitar === false}
                                        name='entrenamientoMilitar'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="entrenamientoMilitarRpta"
                            >Agregar Respuesta
                            </InputLabel>
                            <OutlinedInput
                                name="entrenamientoMilitarRpta"
                                value={state.entrenamientoMilitarRpta}
                                onChange={handleChange}
                                label="Agregar Respuesta"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="funcionarioPublico;">¿Era funcionario público?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="funcionarioPublico;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        value='true'
                                        checked={state.funcionarioPublico === true}
                                        name='funcionarioPublico'
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value='false'
                                        checked={state.funcionarioPublico === false}
                                        name='funcionarioPublico'
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='funcionarioPublicoRpta'>Agregar cargo</InputLabel>
                            <OutlinedInput
                                name="funcionarioPublicoRpta"
                                value={state.funcionarioPublicoRpta}
                                onChange={handleChange}
                                label="Agregar cargo"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <Button onClick={handleClick} variant='contained'>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}