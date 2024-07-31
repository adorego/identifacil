'use client'

import {
    Autocomplete,
    Box,
    Button,
    CardContent,
    CircularProgress,
    FormControl, FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {
    Medidas,
    Motivo,
    PPLType,
    TrasladoForm,
    Vehiculo,
    pplTraslado
} from "@/components/utils/movimientosType"
import React, {useEffect, useState} from 'react';
import {fetchData, fetchFormData, postEntity, postForm} from "@/components/utils/utils";

import CustomTable from "@/components/CustomTable";
import {Add, FileUploadOutlined} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {signIn, useSession} from "next-auth/react";
import {faltasForm} from "@/app/(sistema)/gestion-ppl/faltas/[id]/componentes/faltasTypes";

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const intialFaltasForm: faltasForm = {
    id: 0,
    ppl: {id: 0, nombre: '', apellido: '', documento: ''},
    fecha_falta: dayjs(),
    hora_falta: dayjs(),
    numero_de_resoulucion: '',
    fecha_resolucion: dayjs(),
    descripcion_falta: '',
    tipo_falta: 0,
    grado_falta: 0,
    victima_falta: {id: 0, nombre: '', apellido: '', documento: ''},
    tipo_victima: 0,

};


const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;
const URL_ENDPOINT = `${API_URL}/movimientos/motivos_de_traslado`;
const URL_ENDPOINT_MEDIDAS = `${API_URL}/movimientos/medidas_de_seguridad`;
const URL_ENDPOINT_CUSTODIO = `${API_URL}/movimientos/custodios`;
const URL_ENDPOINT_CHOFER = `${API_URL}/movimientos/choferes`;
const URL_ENDPOINT_VEHICULOS = `${API_URL}/movimientos/vehiculos`;
const URL_ENDPOINT_ESTABLECIMIENTOS = `${API_URL}/establecimientos`;

// TODO: Cuando se envia el submit se debe bloquear el boton de guardado
// TODO: Luego de enviar la peticion se debe mostrar una alerta de que se guardo correctamente
// TODO: hacer un spinner que bloquee toda la pantalla cuando carga o guarda los datos
// TODO: Origen de destino debe ser dinamico

export default function Page({params}: { params: { id: number | string } }) {

    // Estados del form
    const [stateForm, setStateForm] = useState<faltasForm>(intialFaltasForm);

    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{
        id_persona: number;
        nombre: string;
        apellido: string;
        numero_de_identificacion?: string | number;
    } | null>(null)

    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);




    const [loading, setLoading] = useState(false);

    // Variables del form
    const isEditMode: boolean = params?.id !== 'crear';

    // Hooks del form
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const {data: session, status} = useSession();


    useEffect(() => {
        Promise.all([
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
                // @ts-ignore
                setStatePPL(res);
            }),
            /*fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/tipo_de_medida_de_fuerza`).then(res => {
                // @ts-ignore
                setStateTiposMedidas(res);
            }),
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/motivo_de_medida_de_fuerza`).then(res => {
                // @ts-ignore
                setStateMotivosMedidas(res);
            }),*/

        ]).finally(() => {
            console.info('Finished loading data.')
        })
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    // Manejador para actualizar selects
    const handleSelectChange = (event: SelectChangeEvent<string | number | [number]>) => {
        const name = event.target.name as keyof typeof stateForm;
        // console.log('value: ' + event.target.value);
        setStateForm({
            ...stateForm,
            [name]: event.target.value,
        });
    };

    // Manejador de envio
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form_method = isEditMode ? 'PUT' : 'POST'

        console.log('Form de motivos', stateForm)
    }


    if (status === 'loading') {
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        <CircularProgress/>
                    </Box>
                </Box>
            </div>
        )
    }

    if (!session) {
        signIn();
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        Regirigiendo...
                    </Box>
                </Box>
            </div>
        )
    }

    return (
        <Box>
            <TituloComponent titulo={isEditMode ? `Faltas y sanciones` : 'Crear Faltas y sanciones'}>
                <BreadCrumbComponent listaDeItems={[
                    {nombre: 'Lista de faltas y sanciones', url: '/gestion-ppl/medidas-de-fuerza/', lastItem: false},
                    {nombre: 'Faltas y sanciones', url: '', lastItem: true}
                ]}/>
            </TituloComponent>

            {/*<QueryBlock/>*/}
            <Box mt={4}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <CardContent>
                        {/*<Typography variant='h6' mb={2}>Detalles del traslado</Typography>*/}
                        {loading
                            ? (
                                <Box sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '35vh',
                                }}>
                                    <CircularProgress/>
                                </Box>)
                            : (<form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    {/* Nro. del documento */}
                                    <Grid item xs={6}>
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
                                                options={statePPL}
                                                getOptionLabel={(option) => option.apellido ? `${option.apellido}, ${option.nombre} - ${option.numero_de_identificacion}` : "Seleccionar PPL"}
                                                renderInput={(params) =>
                                                    <TextField
                                                        error={!personasSeleccionadas}
                                                        {...params} label="PPL"/>}
                                            />
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>


                                    {/* Fecha del traslado */}
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>

                                            <DatePicker
                                                label="Fecha de la falta"
                                                format="DD/MM/YYYY"
                                                name='fecha_falta'
                                                value={stateForm.fecha_falta ? dayjs(stateForm.fecha_falta) : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setStateForm(prevState => ({
                                                        ...prevState,
                                                        fecha_falta: newValue,
                                                    }))
                                                }}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <TimePicker
                                                label="Hora de la falta"
                                                format="hh:mm"
                                                name='fecha_falta'
                                                value={stateForm.hora_falta ? dayjs(stateForm.hora_falta) : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setStateForm(prevState => ({
                                                        ...prevState,
                                                        hora_falta: newValue,
                                                    }))
                                                }}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Nro. de resolucion'
                                            name='numero_resolucion'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <DatePicker
                                                label="Fecha de la resolcuion"
                                                format="DD/MM/YYYY"
                                                name='fecha_falta'
                                                value={stateForm.fecha_resolucion ? dayjs(stateForm.fecha_resolucion) : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setStateForm(prevState => ({
                                                        ...prevState,
                                                        fecha_resolucion: newValue,
                                                    }))
                                                }}

                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Resolucion documento'
                                            name='resolcuion_documento'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='Descripcion de la falta'
                                            name='descripcion_falta'
                                            onChange={handleChange}
                                            value={stateForm.descripcion_falta}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Tipo de falta</InputLabel>
                                            <Select
                                                value={stateForm.tipo_falta}
                                                onChange={handleSelectChange}
                                                label="Seleccionar PPL"
                                                name="tipo_falta"
                                            >

                                                <MenuItem value={0}>Seleccionar falta</MenuItem>
                                                <MenuItem value={1}>Conflicto interno</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Grado de falta</InputLabel>
                                            <Select
                                                value={stateForm.grado_falta}
                                                onChange={handleSelectChange}
                                                label="Seleccionar PPL"
                                                name="grado_falta"
                                            >

                                                <MenuItem value={0}>Seleccionar grado</MenuItem>
                                                <MenuItem value={1}>Leve</MenuItem>
                                                <MenuItem value={2}>Grave</MenuItem>
                                                <MenuItem value={3}>Severo</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Victima de la falta'
                                            name='victima_falta'
                                            value={stateForm.victima_falta}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label='Tipo victima'
                                            name='tipo_victima'
                                            value={stateForm.tipo_victima}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit" // Cambiar a type="submit"
                                        >
                                            {loading ?
                                                <CircularProgress color='success' size={24}/> : "Guardar"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>)
                        }

                    </CardContent>
                </Paper>
            </Box>
        </Box>
    );
};

