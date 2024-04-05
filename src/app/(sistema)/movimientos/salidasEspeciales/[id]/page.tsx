'use client'

import * as React from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography, Grid, IconButton, Breadcrumbs, Link, Paper, Autocomplete,
} from '@mui/material';

import {FileUploadOutlined} from "@mui/icons-material";
import QueryBlock from "@/components/blocks/QueryBlock";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";
import {SelectChangeEvent} from "@mui/material/Select";
import {pplTraslado, Vehiculo} from "@/components/utils/movimientosType";
import {DatePicker, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";

const initialState = {
    hechoPunible: '',
    tipoSalida: '',
    personaCustodia: '',
    chapaVehiculo: '',
    fechaHoraSalida: '',
    lugarTraslado: '',
    chofer: '',
    modeloVehiculo: '',
    fechaHoraRegreso: '',
    documentoAutorizacion: {
        name: ''
    },
    documentoCumplimiento: {
        name: ''
    },
    observaciones: '',
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;
const URL_ENDPOINT_CUSTODIO = `${API_URL}/movimientos/custodios`;
const URL_ENDPOINT_CHOFER = `${API_URL}/movimientos/choferes`;
const URL_ENDPOINT_VEHICULOS = `${API_URL}/movimientos/vehiculos`;
const URL_ENDPOINT_ESTABLECIMIENTOS = `${API_URL}/establecimientos`;

export default  function Page(){
    const [formData, setFormData] = React.useState<any>(initialState);


    const [establecimientos, setEstablecimientos] = useState<[]>([]);
    const [chofer, setChofer] = useState<[]>([]);
    const [funcionario, setFuncionario] = useState<[]>([]);
    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);
    const [personasLista, setPersonasLista] = useState<Array<any>>([])

    /** State de PPLS Seleccionados */
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{ id_persona: number; nombre: string; apellido: string; } | null>(null)

    /** Estado para lista de vehiculos */
    const [vehiculos, setVehiculo] = useState<Vehiculo[]>([]);

    /** Estado para lista de custodios */
    const [custodio, setCustodio] = useState<[]>([]);

    /** Estado para pagina de carga */
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        fetchData(URL_ENDPOINT_CUSTODIO).then(res => {
            console.log(res)
            // @ts-ignore
            setCustodio(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Vehiculo
        fetchData(URL_ENDPOINT_VEHICULOS).then(res => {
            // @ts-ignore
            setVehiculo(Object.keys(res).map(key => (res[key])));
        })

        fetchData(URL_ENDPOINT_CHOFER).then(res => {
            // @ts-ignore
            setChofer(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Establecimientos
        fetchData(URL_ENDPOINT_ESTABLECIMIENTOS).then(res => {
            setEstablecimientos(res.establecimientos);
        })

        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
            setPersonasLista(prev => ([...res]))
        })


        fetchData(URL_ENDPOINT_CHOFER).then(res => {
            // @ts-ignore
            setChofer(Object.keys(res).map(key => (res[key])));
        })


    }, []);



    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setFormData((prevData:any) => ({ ...prevData, [name]: value }));
    };


    const handleSelectChange = (event: SelectChangeEvent<string|number|[number]>) => {
        const name = event.target.name as keyof typeof formData;
        // console.log('value: ' + event.target.value);
        setFormData((prev:any)=>({
            ...prev,
            [name]: event.target.value,
        }));
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData((prev:any) => ({ ...prev, [name]: files[0] }));
        }
    };


    // Manejador de envio
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
        console.log(JSON.stringify(formData));
    };

    return(
        <Box>

            <TituloComponent titulo='Salidas especiales' />


            <Paper elevation={1} sx={{
                mt: '40px',
            }}>
                <Box p={4}>

                    <Grid container spacing={2} >


                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    fullWidth={true}
                                    value={personasSeleccionadas ? personasSeleccionadas : null}
                                    onChange={(event, newValue: any) => {
                                        // @ts-ignore
                                        setPersonasSeleccionadas((prev: any) => ({
                                            ...newValue
                                        }));
                                    }}
                                    id="controllable-states-demo"
                                    options={personasLista}
                                    getOptionLabel={(option) => `${option.apellido}, ${option.nombre} - ${option.numero_de_identificacion}`}
                                    renderInput={(params) => <TextField {...params} label="Lista de PPLs"/>}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                label="Hecho Punible"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="hechoPunible"
                                value={formData.hechoPunible}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth  variant="outlined">
                                <InputLabel>Tipo de salida</InputLabel>
                                <Select
                                    name="tipoSalida"
                                    value={formData.tipoSalida}
                                    onChange={handleChange}
                                    label="Tipo de salida"
                                >
                                    <MenuItem value={0}><em>None</em></MenuItem>
                                    <MenuItem value={1}>Emergencia Familiar</MenuItem>
                                    <MenuItem value={2}>Duelo</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Personal de custodia</InputLabel>
                                <Select
                                    value={formData.custodia}
                                    onChange={handleSelectChange}
                                    label="Personal de custodia"
                                    name="custodia"
                                >
                                    {/* Replace these menu items with your options */}
                                    {custodio.map((row: any, index) => (
                                        <MenuItem key={index} value={row.id}>
                                            {row.apellido}, {row.nombre} - {row.cedula}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/*Chapa del vehículo*/}
                        <Grid item xs={6}>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Chapa del vehiculo</InputLabel>
                                <Select
                                    value={formData.vehiculoId}
                                    onChange={handleSelectChange}
                                    label="Chapa del vehiculo"
                                    name="vehiculoId"
                                >

                                    {vehiculos.map(vehiculo => (
                                        <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                            {vehiculo.chapa}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Modelo del vehículo*/}
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Modelo del vehiculo</InputLabel>
                                <Select
                                    value={formData.vehiculoId}
                                    onChange={handleSelectChange}
                                    label="Modelo del vehiculo"
                                    name="vehiculoId"
                                >

                                    {vehiculos.map((vehiculo: any) => (
                                        <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                            {vehiculo.marca}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={6}>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel>chofer</InputLabel>
                                <Select
                                    value={formData.chofer}
                                    onChange={handleSelectChange}
                                    label="chofer"
                                    name="chofer"
                                >
                                    {/* Replace these menu items with your options */}
                                    {chofer.map((row: any) => (
                                        <MenuItem key={row.id} value={row.id}>
                                            {row.apellido}, {row.nombre} - {row.cedula}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Especificar lugar de traslado"
                                variant="outlined"
                                fullWidth
                                name="lugarTraslado"
                                value={formData.lugarTraslado}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <MobileDatePicker
                                    label="Hora de salida"
                                    format="DD/MM/YYYY"
                                    name='fechaDocumento'
                                    value={formData.fechaDocumento ? dayjs(formData.fechaDocumento) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setFormData((prevState:any) => ({
                                            ...prevState,
                                            fechaDocumento: newValue,
                                        }))
                                    }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Fecha de salida"
                                    format="DD/MM/YYYY"
                                    name='horaDeRegreso'
                                    value={formData.horaDeRegreso ? dayjs(formData.horaDeRegreso) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setFormData((prevState:any) => ({
                                            ...prevState,
                                            fechaDocumento: newValue,
                                        }))
                                    }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <MobileDatePicker
                                    label="hora de regreso"
                                    format="DD/MM/YYYY"
                                    name='fechaDocumento'
                                    value={formData.fechaDocumento ? dayjs(formData.fechaDocumento) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setFormData((prevState:any) => ({
                                            ...prevState,
                                            fechaDocumento: newValue,
                                        }))
                                    }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TimePicker
                                    label="Fecha de regreso"
                                    format="DD/MM/YYYY"
                                    name='horaDeRegreso'
                                    value={formData.horaDeRegreso ? dayjs(formData.horaDeRegreso) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setFormData((prevState:any) => ({
                                            ...prevState,
                                            fechaDocumento: newValue,
                                        }))
                                    }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    label='Adjuntar documento de autorización de la salida'
                                    value={formData.documentoAutorizacion ? formData.documentoAutorizacion.name : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton component="label" >
                                                <FileUploadOutlined />
                                                <input
                                                    style={{display:"none"}}
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileChange}
                                                    name="documentoAutorizacion"
                                                />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>

                            <TextField
                                label="Adjuntar documento de cumplimiento del traslado"
                                variant="outlined"
                                fullWidth
                                name='documentCumplientoContainer'
                                value={formData.documentoCumplimiento ? formData.documentoCumplimiento.name : ''}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton component="label" >
                                            <FileUploadOutlined />
                                            <input
                                                style={{display:"none"}}
                                                type="file"
                                                hidden
                                                onChange={handleFileChange}
                                                name="documentoCumplimiento"
                                            />
                                        </IconButton>
                                    ),
                                }}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Observaciones"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '10px' }} onClick={handleSubmit}>
                                Guardar
                            </Button>

                        </Grid>
                    </Grid>
                </Box>
                </Paper>

        </Box>
    )
}