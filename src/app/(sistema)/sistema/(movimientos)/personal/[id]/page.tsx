'use client';

import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState} from 'react';
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";

interface MyState {
    id: number;
    nombre: string;
    tipo: string;
    lastUpdate: string;

}
const initialState: MyState = {
    id: 0,
    nombre: "",
    tipo: "",
    lastUpdate: ""
}
export default function Page({ params }: { params: { id: number } }){
    const [stateForm, setStateForm] = useState<MyState>(initialState);
    const [loading, setLoading] = React.useState(false);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();

    const handleChange = (e: any) =>{
        const {name, value} = e.target;


        setStateForm((prevState) =>(
            {
                ...prevState,
            [name]: value,
            }
        ))
    }

    const postTraslado = async () => {
        try {
            setLoading(true);

            // await delay(5000);

            const response = await fetch('http://localhost:5000/personal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stateForm) // formData contiene los datos de tu formulario
            });

            setLoading(false);

            if (response.ok) {
                openSnackbar('Personal creado correctamente.', 'success');
                router.push('/sistema/personal');
            }
            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const data = await response.json();
            console.log('Personal creado:', data);
        } catch (error) {
            setLoading(false);

            console.error('Error:', error);
        }
    };

    const handleSubmit = () =>{
        postTraslado();
        // console.log(JSON.stringify(stateForm))
    }

    return(
        <>
            <TituloComponent titulo='Nuevo Personal' />
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                name="nombre"
                                value={stateForm.nombre}
                                id="nombre"
                                label="Nombre del chofer autorizado"
                                variant="outlined" />
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo personal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="tipo"
                                    name="tipo"
                                    value={stateForm.tipo}
                                    label="Tipo personal"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Seleccionar</em>
                                    </MenuItem>
                                    <MenuItem value={'chofer'}>Chofer</MenuItem>
                                    <MenuItem value={'custodio'}>Custodio</MenuItem>
                                    <MenuItem value={'Guardia'}>Guardia</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} mt={4}>
                        <Stack direction='row' spacing={2}>

                            <Button variant='contained' onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button variant='outlined'>
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
}