'use client'

import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    IconButton
} from "@mui/material";
import * as React from "react";
import {Add, Delete} from "@mui/icons-material";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API
const API_AUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API

export default function FormRoles({params}: { params: { id: number | string } }) {

    /** 1. Form del estado*/
    const [formState, setFormState] = useState<{ nombre: string; permisos: Array<number>; }>({
        nombre: "",
        permisos: []
    })

    /** 2. Form del lista de permisos */
    const [statePermisos, setStatePermisos] = useState([]);
    const [loading, setLoading] = useState(true);

    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode = params.id !== 'crear';

    useEffect(() => {


        if(isEditMode){
            fetch(`${API_AUTH_URL}/rol/${params.id}`).then(response => response.json()).then(data => {
                console.log(data)
                if (data) {
                    setFormState({
                        ...data,
                        permisos: data.permisos.map((item:any)=>item.id)
                    })
                }
            })
        }

        fetch(`${API_AUTH_URL}/permiso`).then(response => response.json()).then(data => {
            // console.log(data)
            if (data) {
                setStatePermisos(data)
            }
        })

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState((prevState: any) => ({
            ...prevState,
            [name]: value ?? '' // Asegúrate de que el valor no sea nulo o indefinido
        }));
    }

    const handleAddPermiso = () => {
        setFormState((prev) => ({
            ...prev,
            permisos: [...prev.permisos, 0] // Agregar un valor temporal para el nuevo permiso
        }))
    }

    const handlePermisoChange = (index: number, value: number) => {
        setFormState((prev) => {
            const updatedPermisos = [...prev.permisos];

            // Verificar si el permiso ya existe en el array
            if (updatedPermisos.includes(value)) {
                // Mostrar un mensaje de error o hacer alguna acción específica
                openSnackbar("Este permiso ya ha sido seleccionado.", "error");
                return prev;
            }

            // Actualizar el permiso en el índice correspondiente
            updatedPermisos[index] = value;
            return {
                ...prev,
                permisos: updatedPermisos
            };
        });
    }

    const handleDeletePermiso = (index: number) => {
        setFormState((prev) => {
            const updatedPermisos = [...prev.permisos];
            updatedPermisos.splice(index, 1); // Eliminar el permiso del array
            return {
                ...prev,
                permisos: updatedPermisos
            };
        });
    }

    const handleSubmit = () => {
        const dataToSubmit = {
            nombre: formState.nombre,
            permisos: formState.permisos.filter(permiso => permiso !== 0) // Eliminar permisos no seleccionados
        };

        fetch(`${API_AUTH_URL}/rol${ isEditMode ? ("/" + params.id) : "" }`, {
            method: isEditMode ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSubmit)
        }).then(response => response.json()).then(data => {
            if (data.success) {
                if(isEditMode){
                    openSnackbar('Rol actualizado correctamente', 'success');
                }else{
                    openSnackbar('Rol creado correctamente', 'success');
                }
                router.push('/sistema/gestion-de-usuarios');
            } else {
                openSnackbar(data.message, 'error');
            }
        });
    }

    return (
        <>

            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="nombre"
                        value={formState.nombre ?? ''}
                        id="nombre"
                        label="Nombre"
                        variant="outlined"/>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Box>
                        <Typography variant='caption'>Lista de Permisos</Typography>
                    </Box>
                </Grid>
            </Grid>
            {formState.permisos.map((permiso, index) => (
                <Grid container spacing={2} mt={2} key={index}>
                    <Grid item sm={6} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>

                        <FormControl fullWidth>
                            <InputLabel id={`permiso-${index}-label`}>Permiso</InputLabel>
                            <Select
                                labelId={`permiso-${index}-label`}
                                value={permiso}
                                onChange={(e) => handlePermisoChange(index, e.target.value as number)}
                                label='Permiso'
                            >
                                <MenuItem disabled value={0}>Seleccionar permiso</MenuItem>
                                {statePermisos.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>{item.nombre} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton
                            color="secondary"
                            onClick={() => handleDeletePermiso(index)}
                        >
                            <Delete/>
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Grid container spacing={2} mt={0}>
                <Grid item sm={12}>
                    <Button
                        variant='text'
                        onClick={handleAddPermiso}
                        startIcon={<Add/>}>
                        Agregar permiso
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>

                <Grid item sm={12} mt={4}>
                    <Stack direction='row' spacing={2}>

                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button variant='outlined' onClick={() => {
                            router.push('/sistema/gestion-de-usuarios');
                        }}>
                            Cancelar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
