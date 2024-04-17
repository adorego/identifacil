'use client'

import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";


type elementType = {
    selectedCity:any;
    handleCityChange:any;
}

const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/ciudades`;

export default function AutocompleteCiudad({ selectedCity, handleCityChange }: elementType) {
    const [ciudadLista, setCiudadLista] = useState([]);

    console.log(selectedCity)
    useEffect(() => {
        fetch(url).then(response=> response.json()
        ).then(data=>{
            setCiudadLista(data.ciudades)
        }).catch(err=>{
            console.error('Error obteniendo datos', err)
        })

    }, []);



    return (
        <FormControl fullWidth>
            <Autocomplete
                fullWidth={true}
                value={selectedCity ? selectedCity : null}
                onChange={(event, newValue: any) => {
                    // @ts-ignore
                    handleCityChange((prev: any) => ({
                        ...newValue
                    }));
                }}
                id="controllable-states-demo"
                options={ciudadLista}
                getOptionLabel={(option) => option.nombre ? `${option.nombre}` : 'Seleccionar ciudad'}
                renderInput={(params) => <TextField {...params} label="Ciudades"/>}
            />
        </FormControl>
    );
}