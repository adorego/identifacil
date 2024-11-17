'use client';

import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NextResponse } from 'next/server';
import { listaExpedientes } from '@/app/api/lib/expediente';


type elementType = {
    label: string;
    selectedItemExternal?: Object;
    handleItemChange?: any;
    queryUrl?: string;
    fetchFunction?: ()=>NextResponse;
}

type causa = {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    roles: [{
        id:number;
        nombre: string;
    }];
}

export default function AutocompleteExpediente({ label='default',selectedItemExternal, handleItemChange, queryUrl, fetchFunction }: elementType) {
    // Estados
    const [lista, setLista] = useState<causa[]>([]);
    const [selectedItem, setSelectedItem] = useState<Object>({});


    useEffect(() => {

        const fetchData = async () => {
            const response = await listaExpedientes();
            const { data } = await response.json()
            //console.log('lista de expedientes', data);
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
            const selectedDefensorObj = lista.find(item=>item.id== selectedItemExternal)

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
                getOptionLabel={(option) => option.caratula_expediente ? `${option.numeroDeExpediente} - ${option.caratula_expediente}` : `Seleccionar ${label}`}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </FormControl>
    );
}