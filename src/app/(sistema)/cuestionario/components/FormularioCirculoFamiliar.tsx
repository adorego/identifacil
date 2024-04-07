'use client'

import * as React from 'react';
import {Button, TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {SelectChangeEvent} from "@mui/material/Select";
import {circuloFamiliarStateType} from "@/components/utils/systemTypes";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";

interface FormularioCirculoFamiliarProps {
    onClose: () => void;
    onHandleChangeCirculo: (nuevoMiembro: circuloFamiliarStateType, editMode:boolean) => void;
    savedState?: any;
    open: boolean
}

const familiarInitialState = {
    id: 0,
    nombre: "",
    esFuncionario: false,
    apellido: "",
    vinculo: {
        id: 1,
        nombre: null,
    },
    establecimiento: {
        id: 1,
        nombre: null,
    },
    edad: null,
    lugar_donde_esta_hijo: null
}

export const FormularioCirculoFamiliar: React.FC<FormularioCirculoFamiliarProps> = ({ onClose, onHandleChangeCirculo,savedState=null }) => {
    const [state, setState] = React.useState<circuloFamiliarStateType>(familiarInitialState)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setState(familiarInitialState)
    }, [open]);


    useEffect(() => {
        if(savedState){
            console.log('datos previos')
            setState(savedState)
            setEditMode(true);
        }else{
            console.log('Datos iniciales')
            setState(familiarInitialState)
            setEditMode(false);
        }

    }, [savedState]);

    const [stateVinculos, setStateVinculos] = React.useState<{id:number, nombre:string}[]>([])
    const [stateEstablecimientos, setStateEstablecimiento] = React.useState<{id:number, nombre:string}[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev =>{
          return{
              ...prev,
              [event.target.name]: event.target.value,
          }
        })
    };

    const handleSelectChange = (event: SelectChangeEvent<number|string | null>) => {
        console.log(event.target.value)
        setState(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        });
    };

    const handlerEstablecimientos = (event: SelectChangeEvent<number|string | null>) => {
        const establecimientoActual = stateEstablecimientos.find(establecimiento => establecimiento.id === event.target.value)
        if(establecimientoActual){
            setState(prev=>{
                return{
                    ...prev,
                    establecimiento: {
                        id: establecimientoActual.id,
                        nombre: establecimientoActual.nombre
                    }
                }
            });
        }
    };

    const handlerVinculos = (event: SelectChangeEvent<number|string | null>) => {
        const vinculoActual = stateVinculos.find(vinculo => vinculo.id === event.target.value)
        if(vinculoActual){
            setState(prev=>{
                return{
                    ...prev,
                    vinculo: {
                        id: vinculoActual.id,
                        nombre: vinculoActual.nombre
                    }
                }
            });
        }
    };

    const handleEsFuncionario = (event: SelectChangeEvent<number|string | null>) => {
        setState(prev=>{
            return{
                ...prev,
                esFuncionario: event.target.value === 'true',
            }
        });
    };

    const onHandleCloseForm = ()=>{
        setState(familiarInitialState)
        onClose();
    }

    const handleSubmit = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        onHandleChangeCirculo(state, editMode)
        onHandleCloseForm(); // Cierra el modal después de la acción*/
    }

    useEffect(() => {

        const apiUrl = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API; // Puedes cambiar la URL según tus necesidades
        fetchData(apiUrl+'/vinculos_familiares')
            .then(fetchedData => {
                setStateVinculos(fetchedData.vinculos_familiares);
            });

        fetchData(apiUrl+'/establecimientos')
            .then(fetchedData => {
                setStateEstablecimiento(fetchedData.establecimientos);
            });
    }, []);


    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <Grid container spacing={2}>

                    <Grid item sm={6} mt={2}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={state.nombre}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                    <Grid item sm={6} mt={2}>
                        <TextField
                            label="Apellido"
                            name="apellido"
                            value={state.apellido}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth/>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="vinculo-sistema-label">Vinculo familiar</InputLabel>
                            <Select
                                labelId="vinculo-sistema-label"
                                id="vinculo"
                                value={state.vinculo?.id}
                                label="Vinculo familiar"
                                name='relacion'
                                onChange={handlerVinculos}
                            >
                                <MenuItem disabled value={""}>Seleccionar vinculo</MenuItem>
                                {
                                    stateVinculos.map((item, index) =>{
                                        if(item.id !== 3){
                                            return(
                                                <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                            )
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="establecimiento-label">Establecimiento</InputLabel>
                            <Select
                                labelId="establecimiento-label"
                                id="establecimiento"
                                value={state.establecimiento?.id ? state.establecimiento.id : 0}
                                label="Establecimiento"
                                name='establecimiento'
                                onChange={handlerEstablecimientos}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
                                {
                                    stateEstablecimientos.map((item, index) =>{
                                        return(
                                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="vinculo-sistema-label">Vinculo con el sistema</InputLabel>
                            <Select
                                labelId="vinculo-sistema-label"
                                id="vinculo"
                                value={state.esFuncionario?.toString()}
                                label="Vinculo con el sistema"
                                name='vinculo'
                                onChange={handleEsFuncionario}
                            >
                                <MenuItem disabled value={''}>Seleccionar establecimiento</MenuItem>
                                <MenuItem value={"true"}>Funcionario</MenuItem>
                                <MenuItem value={"false"}>PPL</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Si es hijo*/}
                    { state.vinculo?.id == 2 ?
                    <Grid item sm={12}>
                        <TextField
                            onChange={handleChange}
                            label="Edad"
                            type='number'
                            name="edad"
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                    :null}

                    {/* Si es conyugue */}
                    {/*{state.vinculo?.id == 3?
                    <Grid item sm={12}>
                        <TextField
                            onChange={handleChange}
                            label="Número documento"
                            name="numero_documento_concubino"
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                    :null}*/}

                    {/* Si es hijo*/}
                    {state.vinculo?.id == 2?
                    <Grid item sm={12}>
                        <TextField
                            onChange={handleChange}
                            label="Lugar donde se encuentra"
                            name="lugar_donde_esta_hijo"
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                        :null}
                    <Grid item sm={12}>
                        <Button variant={'contained'} type='submit'>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>


        </form>
    )
}





