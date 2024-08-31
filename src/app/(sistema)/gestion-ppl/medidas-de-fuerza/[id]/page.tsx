'use client'

import {
    Autocomplete,
    Box,
    Button,
    CardContent,
    CircularProgress,
    FormControl, FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {
    pplTraslado
} from "@/components/utils/movimientosType"
import React, {useEffect, useState} from 'react';
import {fetchData} from "@/components/utils/utils";

import CustomTable from "@/components/CustomTable";
import {Add} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import {LocalizationProvider, MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";

import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
import es from 'dayjs/locale/es';

import {MuiFileInput} from "mui-file-input";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";

dayjs.locale(es); // Configura dayjs globalmente al español
dayjs.extend(customParseFormat);

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


// Datos para traslados nombre;alias;motivo;fechaTraslado;
const headersPPL = [
    {id: 'id', label: 'ID'},
    {id: 'fecha', label: 'Fecha registro'},
    {id: 'diagnostico', label: 'Descripcion registro medico'},
    {id: 'archivo_registro_medico', label: 'Documento adjunto', type: 'customCode'},
];

interface medidaFuerzaType {
    id: number | null;
    ppl: number;
    tipo_de_medida_de_fuerza: number;
    fecha_inicio: Dayjs | null;
    fecha_fin: Dayjs | null;
    motivo: number;
    exigencias?: string;
    negociadores?: number;
    estado: string;
    hora_inicio?: Dayjs | null;
    hora_fin?: Dayjs | null;
}

const medidaFuerzaInitial = {
    id: null,
    ppl: 0,
    tipo_de_medida_de_fuerza: 0,
    fecha_inicio: dayjs(),
    fecha_fin: null,
    motivo: 0,
    estado: 'EN_PROCESO',
    hora_inicio: null,
    hora_fin: null,
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;
const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';


const registroInitial = {fecha_consulta: dayjs(), diagnostico: '', file: null}

export default function Page({params}: { params: { id: number | string } }) {


    const [stateMedidasDeFuerza, setStateMedidasDeFuerza] = useState<medidaFuerzaType>(medidaFuerzaInitial);

    const [loading, setLoading] = useState(false);

    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{
        id_persona: number;
        nombre: string;
        apellido: string;
        numero_de_identificacion?: string | number;
    } | null>(null)

    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);

    const [stateTiposMedidas, setStateTiposMedidas] = useState([]);

    const [stateMotivosMedidas, setStateMotivosMedidas] = useState([]);

    const [stateHistorialMedico, setStateHistorialMedico] = useState([]);

    const [stateRegistroMedicoModal, setStateRegistroMedicoModal] = useState<{
        fecha_consulta: Dayjs | null;
        diagnostico: string;
        documento_registro_medico?: File | null;
    }>(registroInitial);

    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode: boolean = params?.id !== 'crear';

    const { data: session, status } = useSession();


    // Verica el estado de la sesion
    useEffect(() => {

        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    // se carga la primera vez que carga la vista
    useEffect(() => {
        // Fetch para PPL lista para traslado

        if (isEditMode) {
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/medida_de_fuerza/${params.id}`).then((res: any) => {
                // @ts-ignore

                console.log(res)
                const dato_procesado = {
                    ...res,
                    motivo: res.motivo ? res.motivo.id : null,
                    tipo_de_medida_de_fuerza: res.tipo_de_medida_de_fuerza ? res.tipo_de_medida_de_fuerza.id : null,
                    fecha_fin: res.fecha_fin ? dayjs(res.fecha_fin).format('YYYY-MM-DD') : null,
                    fecha_inicio: res.fecha_inicio ? dayjs(res.fecha_inicio).format('YYYY-MM-DD') : null,
                    hora_inicio: res.hora_inicio ? dayjs(res.hora_inicio, "HH:mm:ss") : null,
                    hora_fin: res.hora_fin ? dayjs(res.hora_fin, "HH:mm:ss") : null,
                    ppl: res.ppl ? res.ppl.persona.id : null,
                }
                console.log(dato_procesado)
                setStateMedidasDeFuerza(dato_procesado)

                setPersonasSeleccionadas({
                    id_persona: res.ppl.persona.id,
                    nombre: res.ppl.persona.nombre,
                    apellido: res.ppl.persona.apellido,
                    numero_de_identificacion: res.ppl.persona.numero_identificacion,
                })

            })

            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_medico/${params.id}`).then(res => {

                const datos_procesados = res.map((data:any)=>({
                    ...data,
                    archivo_registro_medico: data. archivo_registro_medico && (
                        <Link href={`${ASSETS_URL}${data.archivo_registro_medico}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                    )
                }))

                setStateHistorialMedico(datos_procesados)
            })
        }

        // Si es modo edicion bloquea los campos completados
        if (isEditMode) {

        }


        Promise.all([
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
                // @ts-ignore
                setStatePPL(res);
            }),
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/tipo_de_medida_de_fuerza`).then(res => {
                // @ts-ignore
                setStateTiposMedidas(res);
            }),
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/motivo_de_medida_de_fuerza`).then(res => {
                // @ts-ignore
                setStateMotivosMedidas(res);
            }),

        ]).finally(() => {
            console.info('Finished loading data.')
        })

    }, []);

    // Se actualiza cuando se agrega un
    useEffect(() => {
        if(params.id !== 'crear'){
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_medico/${params.id}`).then(res => {

                if(res){

                    const datos_procesados = res.map((data:any)=>({
                        ...data,
                        archivo_registro_medico: data. archivo_registro_medico && (
                            <Link href={`${ASSETS_URL}${data.archivo_registro_medico}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                        )
                    }))
                    setStateHistorialMedico(datos_procesados)

                }
            })
        }
    }, [statePPL]);

    const handleSelectChange = (event: SelectChangeEvent<string | number | [number]>) => {
        const name = event.target.name;

        setStateMedidasDeFuerza((prev: any) => ({
            ...prev,
            [name]: event.target.value,
        }));
    }

    const formValidator = ()=>{
        let formEsValidado: boolean;


        if( !!stateMedidasDeFuerza.motivo
            && !!stateMedidasDeFuerza.tipo_de_medida_de_fuerza
            && !!stateMedidasDeFuerza.fecha_inicio
            // @ts-ignore
            && !!personasSeleccionadas.id_persona
            && !!stateMedidasDeFuerza.hora_inicio
        ){
            formEsValidado = true
        }else{
            formEsValidado =  false
        }


        if(stateMedidasDeFuerza.estado == 'FINALIZADO'){

            if(stateMedidasDeFuerza.hora_fin && stateMedidasDeFuerza.fecha_fin){
                formEsValidado = true
            }else{
                formEsValidado = false
            }
        }


        return formEsValidado;
    }

    // Manejador de envio
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        if(formValidator()){

            const form_method = isEditMode ? 'PUT' : 'POST'

            // TODO: Armar logica de post
            // TODO: Agregar PPL Agregado en el autocomplete

            const state_procesado = {
                ...stateMedidasDeFuerza,
                ppl: personasSeleccionadas ? personasSeleccionadas.id_persona : null,
                hora_inicio: stateMedidasDeFuerza.hora_inicio ? dayjs(stateMedidasDeFuerza.hora_inicio).format('hh:mm:ss') : null,
                fecha_de_inicio: stateMedidasDeFuerza.fecha_inicio,
                fecha_de_fin: stateMedidasDeFuerza.fecha_fin,
            }


            try {
                const response = await fetch(`${API_URL}/medida_de_fuerza${isEditMode ? ('/' + params.id) : '' }`, {
                    method: stateMedidasDeFuerza.id ? 'PUT' : 'POST',
                    // body: formData,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(state_procesado),
                });

                if (!response.ok) {
                    throw new Error('Error al enviar los datos');
                }

                const data = await response.json();

                // Manejar la respuesta exitosa
                openSnackbar(`${stateMedidasDeFuerza.id ? 'Medida de fuerza actualizado correctamente' : 'Medida de fuerza creado correctamente'}`)
                router.push('/gestion-ppl/medidas-de-fuerza');
            } catch (err) {
                console.error(err);
                // Manejar el error
            }
        }else{
            openSnackbar('Completar campos requeridos', 'error')
        }
    }

    // ************ Agrgar PPLS A TRASLADOS Logica MODAL *********
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        // Reseteamos los valores del formulario del modal antes de abrirlo
        setStateRegistroMedicoModal(registroInitial)

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formModalValidator = () =>{
        return !!stateRegistroMedicoModal.fecha_consulta && !!stateRegistroMedicoModal.diagnostico && !!stateRegistroMedicoModal.documento_registro_medico;
    }

    const handleSubmitModalMedico = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(formModalValidator()){
            const formData = new FormData();
            formData.append('fecha', stateRegistroMedicoModal.fecha_consulta ? stateRegistroMedicoModal.fecha_consulta.toISOString() : '');
            formData.append('diagnostico', stateRegistroMedicoModal.diagnostico);
            if (stateRegistroMedicoModal.documento_registro_medico) {
                formData.append('documento_registro_medico', stateRegistroMedicoModal.documento_registro_medico);
            }

            try {
                const response = await fetch(`${API_URL}/registro_medico/${params.id}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error al enviar los datos del registro médico');
                }

                openSnackbar('Registro medico guardado correctamente.', 'success')

                const data = await response.json();

                // Manejar la respuesta exitosa
                // @ts-ignore
                setStateHistorialMedico((prev: any) => [...prev, stateRegistroMedicoModal]);
                fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_medico/${params.id}`).then(res => {

                    const datos_procesados = res.map((data:any)=>({
                        ...data,
                        archivo_registro_medico: data. archivo_registro_medico && (
                            <Link href={`${ASSETS_URL}${data.archivo_registro_medico}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                        )
                    }))

                    setStateHistorialMedico(datos_procesados)

                }).catch(err=>console.log(err)).finally(()=>{
                    setStateRegistroMedicoModal(registroInitial)
                    handleClose();
                })

            } catch (err) {
                console.error(err);
                // Manejar el error
            }
        }else{
            openSnackbar('Completar campos requeridos', 'error')
        }

    };

    const listaDeItemBread = [
        {nombre:'Lista de medidas de fuerza', url:'/gestion-ppl/medidas-de-fuerza/', lastItem: false},
        {nombre:'Medidas de fuerza', url:'', lastItem: true},
    ];


    if (status === 'loading') {
        return(
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
            <TituloComponent titulo={isEditMode ? `Medida de fuerza` : 'Crear Medidas de Fuerza'}>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
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
                                    <Grid item xs={8}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                disabled={isEditMode}
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
                                    <Grid item xs={4}>

                                    </Grid>

                                    {/* Persona que autorizó traslado */}
                                    <Grid item xs={8}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Tipo de medida de fuerza !</InputLabel>
                                            <Select
                                                disabled={isEditMode}
                                                value={stateMedidasDeFuerza.tipo_de_medida_de_fuerza}
                                                error={!stateMedidasDeFuerza.tipo_de_medida_de_fuerza}
                                                onChange={handleSelectChange}
                                                label="Tipo de medida de fuerza"
                                                name="tipo_de_medida_de_fuerza"
                                            >
                                                <MenuItem value={0}>Seleccionar tipo de medida</MenuItem>
                                                {stateTiposMedidas ? stateTiposMedidas.map(
                                                    (data: any, id) => {
                                                        return (
                                                            <MenuItem key={id} value={data.id}>{data.nombre}</MenuItem>
                                                        )
                                                    }
                                                ) : null}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Motivo</InputLabel>
                                            <Select
                                                disabled={isEditMode}
                                                value={stateMedidasDeFuerza.motivo}
                                                error={!stateMedidasDeFuerza.motivo}
                                                onChange={handleSelectChange}
                                                label="motivo"
                                                name="motivo"
                                            >
                                                <MenuItem value={0}>Seleccionar motivo de medida</MenuItem>
                                                {stateMotivosMedidas ? stateMotivosMedidas.map(
                                                    (data: any, id) => {
                                                        return (
                                                            <MenuItem key={id} value={data.id}>{data.nombre}</MenuItem>
                                                        )
                                                    }
                                                ) : null}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Estado</InputLabel>
                                            <Select
                                                value={stateMedidasDeFuerza.estado}
                                                onChange={handleSelectChange}
                                                label="Estado"
                                                name="estado"
                                            >
                                                <MenuItem value={'EN_PROCESO'}>En proceso</MenuItem>
                                                <MenuItem value={'FINALIZADO'}>Finalizado</MenuItem>
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>

                                    {/* Documento adjunto */}
                                    {/* Fecha del documento */}
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <MobileDatePicker
                                                    disabled={isEditMode}
                                                    label="Fecha de inicio"
                                                    format="DD/MM/YYYY"
                                                    name='fecha_inicio'
                                                    value={stateMedidasDeFuerza.fecha_inicio ? dayjs(stateMedidasDeFuerza.fecha_inicio) : null}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setStateMedidasDeFuerza((prevState: any) => ({
                                                            ...prevState,
                                                            fecha_inicio: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <TimePicker
                                                    disabled={isEditMode}
                                                    label="Hora de inicio"
                                                    format="hh:mm"
                                                    name='hora_inicio'
                                                    value={stateMedidasDeFuerza.hora_inicio ? dayjs(stateMedidasDeFuerza.hora_inicio) : null}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setStateMedidasDeFuerza((prevState: any) => ({
                                                            ...prevState,
                                                            hora_inicio: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <MobileDatePicker
                                                    label="Fecha de finalizacion"
                                                    format="DD/MM/YYYY"
                                                    disabled={isEditMode && stateMedidasDeFuerza.estado == 'FINALIZADO'}
                                                    name='fecha_fin'
                                                    value={stateMedidasDeFuerza.fecha_fin ? dayjs(stateMedidasDeFuerza.fecha_fin) : null}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setStateMedidasDeFuerza((prevState: any) => ({
                                                            ...prevState,
                                                            fecha_fin: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            {stateMedidasDeFuerza.estado == 'FINALIZADO' && (<FormHelperText>* Campo requerido</FormHelperText>)}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <TimePicker
                                                    disabled={isEditMode && stateMedidasDeFuerza.estado == 'FINALIZADO'}
                                                    label="Hora de finalizacion"
                                                    format="hh:mm"
                                                    name='hora_fin'
                                                    value={stateMedidasDeFuerza.hora_fin ? dayjs(stateMedidasDeFuerza.hora_fin) : null}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setStateMedidasDeFuerza((prevState: any) => ({
                                                            ...prevState,
                                                            hora_fin: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            {stateMedidasDeFuerza.estado == 'FINALIZADO' && (<FormHelperText>* Campo requerido</FormHelperText>)}
                                        </FormControl>
                                    </Grid>

                                    {/* Agregar PPL Button */}
                                    {stateMedidasDeFuerza.id &&
                                        (<>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2} alignItems='center'>
                                                    <Grid item xs={6}>
                                                        <Typography variant='h6'>Historial medico</Typography>
                                                    </Grid>
                                                    <Grid item xs={6} textAlign='right'>
                                                        { (stateMedidasDeFuerza.id && stateMedidasDeFuerza.estado !== 'FINALIZADO') &&
                                                        <Button startIcon={<Add/>} variant="text" color="primary"
                                                                onClick={handleOpen}>
                                                            Agregar registro medico
                                                        </Button>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomTable
                                                    data={stateHistorialMedico}
                                                    headers={headersPPL}
                                                    showId={true}/>
                                            </Grid>
                                        </>)
                                    }

                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit" // Cambiar a type="submit"
                                        >
                                            {loading ?
                                                <CircularProgress color='success' size={24}/> : "Guardar Cambios"}
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>)
                        }

                    </CardContent>

                </Paper>
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={styleModal}
                >
                    <Typography variant="h6" marginBottom={2}>Agregar PPL</Typography>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                    <MobileDatePicker
                                        label="Fecha de consulta"
                                        format="DD/MM/YYYY"
                                        name='fecha_consulta'
                                        value={stateRegistroMedicoModal.fecha_consulta ? dayjs(stateRegistroMedicoModal.fecha_consulta) : dayjs()}
                                        onChange={(newValue: Dayjs | null) => {
                                            setStateRegistroMedicoModal((prevState: any) => ({
                                                ...prevState,
                                                fecha_consulta: newValue,
                                            }))
                                        }}

                                    />
                                </LocalizationProvider>
                                <FormHelperText>* Campo requerido</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                error={!stateRegistroMedicoModal.diagnostico}
                                rows='4'
                                label='Diagnostico'
                                name='diagnostico'
                                value={stateRegistroMedicoModal.diagnostico}
                                onChange={(e) => {
                                    setStateRegistroMedicoModal((prev: any) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }}
                            />
                            <FormHelperText>* Campo requerido</FormHelperText>
                        </Grid>


                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <MuiFileInput
                                    fullWidth
                                    required
                                    error={!stateRegistroMedicoModal.documento_registro_medico}
                                    value={stateRegistroMedicoModal.documento_registro_medico}
                                    variant="outlined"
                                    label="Seleccionar documento"
                                    getInputText={(value) => value ? value.name : ''}
                                    onChange={(newValue) => {
                                        setStateRegistroMedicoModal((prev:any) => ({
                                            ...prev,
                                            documento_registro_medico: newValue,
                                        }))
                                    }}
                                />
                            </FormControl>
                            <FormHelperText>* Campo requerido</FormHelperText>
                        </Grid>


                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSubmitModalMedico}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>

        </Box>
);
};

