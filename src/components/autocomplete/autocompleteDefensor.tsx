import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listaUsuario } from '@/app/api/lib/usuarios';
import { Controller } from 'react-hook-form';
import {listaDefensores} from "@/app/api/lib/defensores/defensores";

type elementType = {
    name: string; // Name of the field (required for react-hook-form)
    control: any; // Control from react-hook-form
    rules?: object; // Validation rules for the field
};

type usuarioDefensor = {
    apellido: string;
    id: number;
    nombre: string;
    supervisor: boolean;
    telefono: string;
    tipo: string;
};

export default function AutocompleteDefensor({ name, control, rules }: elementType) {
    const [lista, setLista] = useState<usuarioDefensor[]>([]);

    useEffect(() => {

        fetchData().catch(console.error);
        fetchDataDefensores().catch(console.error);
    }, []);

    const fetchData = async () => {
        const usuarios = await listaUsuario();
        const { data } = await usuarios.json();
        //setLista(data);
    };

    const fetchDataDefensores = async () => {
        const usuarios = await listaDefensores();
        const { data } = await usuarios.json();

        setLista(data.defensores);
    };


    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Autocomplete
                            fullWidth
                            value={value || null}
                            onChange={(event, newValue) => {
                                onChange(newValue); // Pass selected value to react-hook-form
                            }}
                            options={lista}
                            getOptionLabel={(option) =>
                                option.nombre ? `${option.nombre} ${option.apellido} [${option.tipo}]` : ''
                            }
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Defensores"
                                    error={!!error} // Highlight field in red if error exists
                                    // helperText={error?.message} // Display validation error message
                                />
                            )}
                        />
                        {error ? (
                            <FormHelperText >
                                {error.message || '* Campo requerido'}
                            </FormHelperText>
                        ) : <FormHelperText >* Campo requerido</FormHelperText>
                        }
                    </>
                )}
            />
        </FormControl>
    );
}
