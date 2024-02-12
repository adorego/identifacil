'use client'

import * as React from 'react';
import {Button, TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {SelectChangeEvent} from "@mui/material/Select";
import {circuloFamiliarStateType} from "@/components/utils/systemTypes";
import {useEffect} from "react";
import {fetchData} from "@/components/utils/utils";

interface FormularioCirculoFamiliarProps {
    onClose: () => void;
    onHandleChangeCirculo: (nuevoMiembro: circuloFamiliarStateType) => void;
}

const circuloFamiliarInitial: circuloFamiliarStateType = {
    nombre: "",
    vinculo_sistema: '',
    relacion: 0,
    establecimiento: 0,
    edad_hijo: null,
    numero_documento_concubino: "",
    lugar_donde_esta_hijo: ""
}

/**
 * Formulario para agregar una persona al form de familiares
 *
 * @param {()=>void} onClose Funcion para cerrar el modal
 * @return Vista de formlario
 * */
export const FormularioCirculoFamiliar: React.FC<FormularioCirculoFamiliarProps> = ({ onClose, onHandleChangeCirculo }) => {
    const [state, setState] = React.useState<circuloFamiliarStateType>(circuloFamiliarInitial)
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
    const handleSelectChange = (event: SelectChangeEvent<number | string> ) => {
        setState(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        });
    };
    const handleSubmit = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        onHandleChangeCirculo(state)
        onClose(); // Cierra el modal después de la acción
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

                    <Grid item sm={12} mt={2}>
                        <TextField
                            label="Nombre y Apellido"
                            name="nombre"
                            value={state.nombre}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth/>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="vinculo-sistema-label">Relacion</InputLabel>
                            <Select
                                labelId="vinculo-sistema-label"
                                id="vinculo_sistema"
                                value={state.relacion}
                                label="relacion"
                                name='relacion'
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
                                {
                                    stateVinculos.map(item =>{
                                        return(
                                            <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                        )
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
                                value={state.establecimiento}
                                label="Establecimiento"
                                name='establecimiento'
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
                                {
                                    stateEstablecimientos.map(item =>{
                                        return(
                                            <MenuItem value={item.id}>{item.nombre}</MenuItem>
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
                                id="vinculo_sistema"
                                value={state.vinculo_sistema}
                                label="Vinculo con el sistema"
                                name='vinculo_sistema'
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={0}>Ninguno</MenuItem>
                                <MenuItem value={1}>Funcionario</MenuItem>
                                <MenuItem value={2}>PPL</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    { state.relacion == 5?

                    <Grid item sm={12}>
                        <TextField
                            onChange={handleChange}
                            label="Edad"
                            type='number'
                            name="edad_hijo"
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                    :null}

                    {/* Si es conyugue */}
                    {state.relacion == 4?
                    <Grid item sm={12}>
                        <TextField
                            onChange={handleChange}
                            label="Número documento"
                            name="numero_documento_concubino"
                            variant="outlined"
                            fullWidth/>
                    </Grid>
                    :null}

                    {/* Si es hijo*/}
                    {state.relacion == 5?
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





