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
import NoDataBox from "@/components/loadingScreens/noDataBox";

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
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        // TODO: Capturar mejor los datos con excepciones para funcionarios
        fetchData(`${API_URL}/movimientos/funcionarios_por_establecimiento/1`).then(res => {
            // @ts-ignore
            setFuncionario(Object.keys(res).map(key => (res[key])))
        })

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
        }).then(()=>{
            setLoading(false)
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

    if(loading){
        return(
            <>
                <NoDataBox />
            </>
        )
    }

    return(
        <Box>

            <TituloComponent titulo='Movimiento interno' />


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

                        <Grid item xs={6}>

                            <TextField
                                label="Destino anterior"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="hechoPunible"
                                value={formData.hechoPunible}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <TextField
                                label="Destino actual"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="hechoPunible"
                                value={formData.hechoPunible}
                                onChange={handleChange}
                            />
                        </Grid>

{/*                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Persona que autorizó traslado</InputLabel>
                                <Select
                                    value={trasladoForm.autorizo}
                                    onChange={handleSelectChange}
                                    label="Persona que autorizó traslado"
                                    name="autorizo"
                                >
                                    Replace these menu items with your options
                                    <MenuItem value={0}>
                                        Seleccionar autorizador
                                    </MenuItem>
                                    {funcionario.map((item: any) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.apellido} {item.nombre} - {item.cedula}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>*/}

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <MobileDatePicker
                                    label="Fecha del cambio"
                                    format="DD/MM/YYYY"
                                    name='fecha_cambio'
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
                        <Grid item xs={6}>


                                {/*<FormControl fullWidth variant="outlined">
                                    <InputLabel>Persona que autorizó traslado</InputLabel>
                                    <Select
                                        value={formData.autorizo}
                                        onChange={handleSelectChange}
                                        label="Persona que autorizó traslado"
                                        name="autorizo"
                                    >
                                        Replace these menu items with your options
                                        <MenuItem value={0}>
                                            Seleccionar autorizador
                                        </MenuItem>
                                        {funcionario.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.apellido} {item.nombre} - {item.cedula}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>*/}
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Persona que autorizó traslado</InputLabel>
                                <Select
                                    value={formData.autorizo}
                                    onChange={handleSelectChange}
                                    label="Persona que autorizó traslado"
                                    name="autorizo"
                                >

                                    <MenuItem value={0}>
                                        Seleccionar autorizador
                                    </MenuItem>
                                    <MenuItem  value={1}>
                                        Lopez, Fernando - 534244
                                    </MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Motivo de cambio"
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