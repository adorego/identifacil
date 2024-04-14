'use client'

import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";

interface MyState {
    id?: number | null;
    nombre: string;
    apellido: string;
    cedula: string;

}
const initialState: MyState = {
    id: null,
    nombre: "",
    apellido: "",
    cedula: "",
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function FormChoferes({params} : { params: { id: number | string } }){
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = React.useState(true);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode = params.id !== 'crear';

    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            setLoading(true)
            fetch(`${API_URL}/movimientos/choferes`)
                .then(response => response.json())
                .then(data => {

                    console.log(Object.keys(data).map(key=>data[key]).find((item:any)=>item.id == params.id))
                    const datosChofer = Object.keys(data).map(key=>data[key]).find((item:any)=>item.id == params.id);



                    if (data) {
                        setStateForm({
                            id: datosChofer.id,
                            nombre: datosChofer.nombre,
                            apellido: datosChofer.apellido,
                            cedula: datosChofer.cedula,

                        });
                    }
                })
                .catch(error => console.error('Error:', error)).finally(()=>{
                    setLoading(false)
            });
        }else{
            setLoading(false)
        }
    }, [isEditMode, params.id]);

    const handleChange = (e: any) =>{
        const {name, value} = e.target;


        setStateForm((prevState) =>(
            {
                ...prevState,
                [name]: value,
            }
        ))
    }


    const handleSubmit = async () =>{
        try {
            setLoading(true);

            // @ts-ignore
            const method = isEditMode ? 'PUT' : 'POST';


            // @ts-ignore
            const url = isEditMode
                ? `${API_URL}/movimientos/choferes/${params.id}`
                : `${API_URL}/movimientos/choferes`;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stateForm),
            });

            // console.log(response.message)
            if (response.ok) {
                // @ts-ignore
                const message = isEditMode
                    ? 'Chofer actualizada correctamente.'
                    : 'Chofer creada correctamente.';

                openSnackbar(message, 'success');

                router.push('/sistema/choferes');
            } else {
                console.log(response)
                openSnackbar('Error en la petición', 'error');
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }

    }


    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '35vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return(
        <>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="nombre"
                        value={stateForm.nombre}
                        id="nombre"
                        label="Nombre del chofer"
                        variant="outlined" />
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="apellido"
                        value={stateForm.apellido}
                        id="apellido"
                        label="Apellido del chofer"
                        variant="outlined" />
                </Grid>
                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name="cedula"
                        value={stateForm.cedula}
                        id="cedula"
                        label="Numero de documento"
                        variant="outlined" />
                </Grid>

            </Grid>
            <Grid item sm={12} mt={4}>
                <Stack direction='row' spacing={2}>

                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant='outlined' onClick={()=>router.push('/sistema/choferes')}>
                        Cancelar
                    </Button>
                </Stack>
            </Grid>
        </>
    )
}