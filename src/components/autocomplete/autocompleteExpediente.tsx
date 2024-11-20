'use client';

import { Autocomplete, FormControl, TextField, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { listaExpedientes } from '@/app/api/lib/expediente';
import { Controller } from 'react-hook-form';

type elementType = {
    name: string; // Name of the field for react-hook-form
    label: string; // Label for the field
    control: any; // Control from react-hook-form
    rules?: object; // Validation rules
    defaultValue?: object; // Default value
};

type causa = {
    id: number;
    numeroDeExpediente: string;
    caratula_expediente: string;
};

export default function AutocompleteExpediente({ name, label, control, rules, defaultValue }: elementType) {
    const [lista, setLista] = useState<causa[]>([]);

    // Fetch list of expedientes
    useEffect(() => {
        const fetchData = async () => {
            const response = await listaExpedientes();
            const { data } = await response.json();
            setLista(data);
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
                            onChange={(event, newValue: any) => {
                                onChange(newValue); // Update value in react-hook-form
                            }}
                            options={lista}
                            getOptionLabel={(option) =>
                                option.caratula_expediente
                                    ? `${option.numeroDeExpediente} - ${option.caratula_expediente}`
                                    : `Seleccionar ${label}`
                            }
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={label}
                                    error={!!error} // Highlight in red if there’s an error
                                    helperText={error?.message} // Display validation message
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
