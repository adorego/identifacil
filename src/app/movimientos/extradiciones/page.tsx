'use client'

import * as React from 'react';
import {
    Box,
    Breadcrumbs, Button,
    Card,
    CardContent,
    FormControl,
    Grid, IconButton,
    InputLabel,
    Link, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import QueryBlock from "../../../components/blocks/QueryBlock";
import {FileUploadOutlined} from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomTable from "../../../components/CustomTable";



export default function Page(){
    const [formData, setFormData] = React.useState({
        situacionProcesal: '',
        fechaSolicitud: '',
        documentoSolicitud: '',
        otroDocumento: '',

    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    // Manejador de envio
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        console.log(JSON.stringify(formData));
    };


    return(
        <Box>
            <h2>Movimientos</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link underline="hover" color="inherit" href="/movimientos">
                    Movimientos
                </Link>
                <Typography color="text.primary">Extradiciones</Typography>
            </Breadcrumbs>

            <QueryBlock/>
            <Card sx={{marginTop:"20px"}}>
                <CardContent>
                    <Typography variant='h6' mb={2}>Extradiciones</Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={6}>

                            <TextField
                                label="Situacion procesal"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="situacionProcesal"
                                value={formData.situacionProcesal}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Fecha de solicitud"
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                name="fechaSolicitud"
                                type="date"
                                value={formData.fechaSolicitud}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                label='Documento de la solicitud'
                                value={formData.documentoSolicitud ? formData.documentoSolicitud.name : ''}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton component="label" >
                                            <FileUploadOutlined />
                                            <input
                                                styles={{display:"none"}}
                                                type="file"
                                                hidden
                                                onChange={handleFileChange}
                                                name="documentoSolicitud"
                                            />
                                        </IconButton>
                                    ),
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                label='Otros documentos'
                                value={formData.otroDocumento ? formData.otroDocumento.name : ''}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton component="label" >
                                            <FileUploadOutlined />
                                            <input
                                                styles={{display:"none"}}
                                                type="file"
                                                hidden
                                                onChange={handleFileChange}
                                                name="otroDocumento"
                                            />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '10px' }} onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>
        </Box>
    )
}