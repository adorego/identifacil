'use client';

import { Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listaUsuario } from '@/app/api/lib/usuarios';


type elementType = {
    selectedItemExternal?: Object;
    handleItemChange?: any;
    queryUrl?: string;
}

type usuarioDefensor = {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    roles: [{
        id:number;
        nombre: string;
    }];
}

export default function AutocompleteDefensor({ selectedItemExternal, handleItemChange }: elementType) {
    const [lista, setLista] = useState<usuarioDefensor[]>([]);
    const [selectedItem, setSelectedItem] = useState<Object>({});

    // console.log(selectedItem);
    useEffect(() => {
        const fetchData = async () => {
            const usuarios = await listaUsuario();
            const { data } = await usuarios.json()
            // console.log('lista de users', data);
            setLista(data)
        };

            fetchData().catch(console.error);
    }, []);

    /** Efecto para */
    useEffect(() => {
        if(handleItemChange){
            handleItemChange(selectedItem);
        }
    }, [selectedItem]);

    useEffect(() => {
        if(handleItemChange){
            handleItemChange(selectedItem);
        }
    }, [selectedItem]);

    useEffect(() => {

        if(lista.length >0 && selectedItemExternal){
            const selectedDefensorObj = lista.find(item=>item.id== selectedItemExternal) ?? []
            if(selectedDefensorObj){
                setSelectedItem(selectedDefensorObj);
            }
        }

    }, [selectedItemExternal,open,lista]);


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
                getOptionLabel={(option) => option.nombre ? `${option.nombre}` : 'Seleccionar Defensor'}
                renderInput={(params) => <TextField {...params} label="Defensores" />}
            />
            <FormHelperText>
                * Campo requerido
            </FormHelperText>
        </FormControl>
    );
}