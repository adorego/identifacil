'use client'

import {Button, Grid, Paper, Stack, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";


interface MyState {
    id: number;
    descripcion: string;
    lastUpdate: string;

}

const initialState: MyState = {
    id: 0,
    descripcion: "",
    lastUpdate: ""
}

export default function FormMotivoTraslado({params}: {
    params: {
        id: number
    }
}) {
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = React.useState(false);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;


    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:5000/motivoTraslados?id=${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias
                    if (data.length > 0 && data[0].descripcion) {
                        setStateForm({
                            id: data[0].id,
                            descripcion: data[0].descripcion,
                            lastUpdate: '' // Asegúrate de definir un valor por defecto para las propiedades faltantes
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, [isEditMode, params.id]);

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        setStateForm((prevState) => (
            {
                ...prevState,
                [name]: value,
            }
        ))
    }

    const postTraslado = async () => {
        setLoading(true);

        try {
            // @ts-ignore
            const method = isEditMode !== 'crear' ? 'PUT' : 'POST';
            // @ts-ignore
            const url = isEditMode !== 'crear'
                ? `http://localhost:5000/motivoTraslados/${params.id}`
                : 'http://localhost:5000/motivoTraslados';

            const response = await fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(stateForm),
            });


            if (response.ok) {
                // @ts-ignore
                const message = isEditMode !== 'crear'
                    ? 'Medida de seguridad actualizada correctamente.'
                    : 'Medida de seguridad creada correctamente.';
                openSnackbar(message, 'success');
                router.push('/sistema/motivos-traslados');
            } else {
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        postTraslado();
        // console.log(JSON.stringify(stateForm))
    }

    const handleCancelar = () => {
        router.push('/sistema/motivos-traslados');
    }

    return (
        <>

            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="descripcion"
                        value={stateForm.descripcion}
                        id="chapa"
                        label="Descripción"
                        variant="outlined"/>
                </Grid>
            </Grid>
            <Grid item sm={12} mt={4}>
                <Stack direction='row' spacing={2}>

                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant='outlined' onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </Stack>
            </Grid>

        </>
    )
}