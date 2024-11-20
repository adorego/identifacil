'use client';

import { Autocomplete, FormControl, TextField, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listaPPL } from '@/app/api/lib/ppl/ppl';
import { Controller } from 'react-hook-form';

type elementType = {
    name: string; // Name of the field for react-hook-form
    control: any; // Control from react-hook-form
    rules?: object; // Validation rules
    defaultValue?: object; // Default value for the field
};

type PPL = {
    id: number;
    id_persona?: number;
    nombre: string;
    apellido: string;
    ci: string;
    roles: [
        {
            id: number;
            nombre: string;
        }
    ];
};

export default function AutocompletePPL({ name, control, rules, defaultValue }: elementType) {
    const [lista, setLista] = useState<PPL[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const usuarios = await listaPPL();
            const { data } = await usuarios.json();

            if (data) {
                setLista(data);
            }
        };

        fetchData().catch(console.error);
    }, []);

    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue || null}
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
                                option.nombre ? `${option.nombre} ${option.apellido}` : ''
                            }
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="PPL"
                                    error={!!error} // Highlight field in red if error exists
                                    // helperText={error?.message} // Display validation error message
                                />
                            )}
                        />
                        {error ? (
                            <FormHelperText >
                                {error.message || '* Campo requerido'}
                            </FormHelperText>
                        ):
                            <FormHelperText>
                                * Campo requerido
                            </FormHelperText>
                        }
                    </>
                )}
            />
        </FormControl>
    );
}
