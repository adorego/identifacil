'use client';

import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listaUsuario } from '@/app/api/lib/usuarios';
import { listaPPL } from '@/app/api/lib/ppl/ppl';


type elementType = {
    selectedItemExternal?: Object;
    handleItemChange?: any;
    queryUrl?: string;
}

type PPL = {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    roles: [{
        id:number;
        nombre: string;
    }];
}

export default function AutocompletePPL({ selectedItemExternal, handleItemChange }: elementType) {
    const [lista, setLista] = useState<PPL[]>([]);
    const [selectedItem, setSelectedItem] = useState<Object>({});

    // console.log(selectedItem);
    useEffect(() => {

        const fetchData = async () => {
            const usuarios = await listaPPL();
            const { data } = await usuarios.json()

            // console.log('lista de PPL', data);
            if(data){
                setLista(data)
            }
        };

            fetchData().catch(console.error);

    }, []);


    return (
        <FormControl fullWidth>
            <Autocomplete
                fullWidth={true}
                value={selectedItem ? selectedItem : null}
                onChange={(event, newValue: any) => {
                    // @ts-ignore
                    setSelectedItem((prev: any) => ({
                        ...newValue,
                    }));
                }}
                id="controllable-states-demo"
                options={lista}
                getOptionLabel={(option) => option.nombre ? `${option.nombre}` : 'Seleccionar PPL'}
                renderInput={(params) => <TextField {...params} label="PPL" />}
            />
        </FormControl>
    );
}