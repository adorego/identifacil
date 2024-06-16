'use client'

import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CardContent,
    CircularProgress,
    FormControl, FormHelperText,
    Grid,
    IconButton,
    InputLabel, Link,
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
    TrasladoForm,
    Vehiculo,
    pplTraslado
} from "@/components/utils/movimientosType"
import React, {useEffect, useState} from 'react';
import {fetchData, fetchFormData, postEntity, postForm} from "@/components/utils/utils";

import CustomTable from "@/components/CustomTable";
import {FileUploadOutlined} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import { LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";

import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import es from 'dayjs/locale/es';
import {signIn, useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

dayjs.locale(es); // Configura dayjs globalmente al español

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

const initialPPL: Array<number> = [0];

const initialTrasladoForm: TrasladoForm = {
    id: 0,
    numero_de_documento: '',
    fechaDocumento: dayjs(),
    fechaTraslado: dayjs(),
    autorizo: 0,
    motivoTraslado: 0,
    medidasSeguridad: 0,
    descripcionMotivo: '',
    custodia: 0,
    chofer: 0,
    vehiculoId: 0,
    origenTraslado: 1,
    destinoTraslado: 0,
    documentoAdjunto: '',
    PPLs: [],
    lastUpdate: '',
};

// Datos para traslados nombre;alias;motivo;fechaTraslado;
const headersPPL = [
    {id: 'id_persona', label: 'ID'},
    {id: 'nombre', label: 'Nombre'},
    {id: 'apellido', label: 'Apellido'},
    {id: 'apodo', label: 'Apodo'},
    {id: 'numero_de_identificacion', label: 'Nro. documento'},
];


const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;
const URL_ENDPOINT = `${API_URL}/movimientos/motivos_de_traslado`;
const URL_ENDPOINT_MEDIDAS = `${API_URL}/movimientos/medidas_de_seguridad`;
const URL_ENDPOINT_CUSTODIO = `${API_URL}/movimientos/custodios`;
const URL_ENDPOINT_CHOFER = `${API_URL}/movimientos/choferes`;
const URL_ENDPOINT_VEHICULOS = `${API_URL}/movimientos/vehiculos`;
const URL_ENDPOINT_ESTABLECIMIENTOS = `${API_URL}/establecimientos`;

// TODO: Cuando se envia el submit se debe bloquear el   boton de guardado
// TODO: Luego de enviar la peticion se debe mostrar una alerta de que se guardo correctamente
// TODO: hacer un spinner que bloquee toda la pantalla cuando carga o guarda los datos
// TODO: Origen de destino debe ser dinamico

export default function Page({params}: { params: { id: number | string } }) {

    /** 1. Estado para capturar datos del FORM */
    const [trasladoForm, setTrasladoForm] = useState<TrasladoForm>(initialTrasladoForm);

    /**2. */
    const [motivos, setMotivos] = useState<Motivo[]>([]);

    /**3. */
    const [medidas, setMedidas] = useState<Medidas[]>([]);

    /**4. */
    const [custodio, setCustodio] = useState<[]>([]);

    /**5. */
    const [chofer, setChofer] = useState<[]>([]);

    /**6. */
    const [vehiculos, setVehiculo] = useState<Vehiculo[]>([]);

    /**7. */
    const [funcionario, setFuncionario] = useState<[]>([]);

    /**8. */
    const [modalPPL, setModalPPL] = React.useState<number>(0);

    /**9. */
    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);

    /**10. */
    const [establecimientos, setEstablecimientos] = useState<[]>([]);

    /**11. State de PPLS Seleccionados */
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{
        id_persona: number;
        nombre: string;
        apellido: string;
    } | null>(null)

    /**12. */
    const [modalSaveButtonStateDisabled, setModalSaveButtonStateDisabled] = useState(false);

    /**13. */
    const [loading, setLoading] = useState(true);

    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode: boolean = params?.id !== 'crear';
    const { data: session, status } = useSession();
    const sessionData = PermissionValidator('crear_traslados', session) || PermissionValidator('actualizar_traslados', session);

    useEffect(() => {

        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    const handleLoading = (value: boolean): void => {
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }

    // Función para cargar los motivos desde el endpoint
    useEffect(() => {

        // TODO: Capturar mejor los datos con excepciones Motivos
        // Fetch para Motivos de traslado
        fetchData(URL_ENDPOINT).then(res => {
            setMotivos(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Meidas de seguridad
        fetchData(URL_ENDPOINT_MEDIDAS).then(res => {
            setMedidas(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Chofer
        fetchData(URL_ENDPOINT_CHOFER).then(res => {
            // @ts-ignore
            setChofer(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Custodio
        fetchData(URL_ENDPOINT_CUSTODIO).then(res => {
            // @ts-ignore
            setCustodio(Object.keys(res).map(key => (res[key])));
        })

        // Fetch para Vehiculo
        fetchData(URL_ENDPOINT_VEHICULOS).then(res => {
            // @ts-ignore
            setVehiculo(Object.keys(res).map(key => (res[key])));
        })


        // Fetch para Establecimientos
        fetchData(URL_ENDPOINT_ESTABLECIMIENTOS).then(res => {
            setEstablecimientos(res.establecimientos);
        })

        // Fetch para PPL lista para traslado
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
            // @ts-ignore
            setStatePPL(res);
        })

        // TODO: Capturar mejor los datos con excepciones para funcionarios
        fetchData(`${API_URL}/movimientos/funcionarios_por_establecimiento/1`).then(res => {
            // @ts-ignore
            setFuncionario(Object.keys(res).map(key => (res[key])))
        })


    }, []);

    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            const GetPorID_URL = `${API_URL}/movimientos/getPorId/${params.id}`

            handleLoading(true);

            fetch(GetPorID_URL)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    // TODO: Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias
                    // TODO: FALTA GUARDAR PPLS

                    if (data.id) {
                        //TODO: Corregir el setter del form para ver el attachment
                        console.log('hola')
                        const datosOrdenados = {
                            id: data.id,
                            numero_de_documento: data.numero_de_documento,
                            fechaDocumento: data.fecha_de_documento,
                            fechaTraslado: data.fecha_de_traslado,
                            autorizo: data.autorizado_por.id,
                            motivoTraslado: data.motivo_de_traslado.id,
                            medidasSeguridad: data.medidas_de_seguridad[0].id,
                            descripcionMotivo: data.descripcion_motivo,
                            custodia: data.custodios[0]?.id,
                            chofer: data.chofer.id,
                            vehiculoId: data.vehiculo.id,
                            origenTraslado: data.origenTraslado.id,
                            destinoTraslado: data.destinoTraslado.id,
                            documentoAdjunto: data.documentoAdjunto,
                            PPLs: data.ppls.map((item: any) => ({
                                id_persona: item.persona.id,
                                nombre: item.persona.nombre,
                                apellido: item.persona.apellido,
                                apodo: item.persona.datosPersonales?.apodo,
                                numero_de_identificacion: item.persona.numero_identificacion
                            })),
                            lastUpdate: '',
                        }

                        console.log(datosOrdenados)

                        setTrasladoForm(datosOrdenados);
                    }
                }).then(() => {
                handleLoading(false);
            })
                .catch(error => {
                    handleLoading(true);
                    console.error('Error:', error)
                }).finally(() => {
                handleLoading(false);
            });

        } else {
            handleLoading(false);
        }
    }, [isEditMode, params.id]);

    // Manejadores para inputs fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTrasladoForm(prev => ({...prev, [name]: value}));
    };

    // Manejador para actualizar selects
    const handleSelectChange = (event: SelectChangeEvent<string | number | [number]>) => {
        const name = event.target.name as keyof typeof trasladoForm;
        // console.log('value: ' + event.target.value);
        setTrasladoForm({
            ...trasladoForm,
            [name]: event.target.value,
        });
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setTrasladoForm(prev => ({...prev, [name]: files[0]}));
        }
    };


    // Manejador de envio
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(PermissionValidator('crear_traslados', session) || PermissionValidator('actualizar_traslados', session)){

            const form_procesado =
                {
                    id: trasladoForm.id,
                    numero_de_documento: trasladoForm.numero_de_documento,
                    fecha_de_documento: trasladoForm.fechaDocumento,
                    fecha_de_traslado: trasladoForm.fechaTraslado,
                    autorizado_por: trasladoForm.autorizo,
                    motivo_de_traslado: trasladoForm.motivoTraslado,
                    medidas_de_seguridad: [trasladoForm.medidasSeguridad],
                    descripcion_motivo: trasladoForm.descripcionMotivo,
                    custodios: [trasladoForm.custodia],
                    chofer: trasladoForm.chofer,
                    vehiculo: trasladoForm.vehiculoId,
                    origenTraslado: trasladoForm.origenTraslado,
                    destinoTraslado: trasladoForm.destinoTraslado,
                    documentoAdjunto: trasladoForm.documentoAdjunto,
                    // @ts-ignore
                    ppls: Object.keys(trasladoForm.PPLs).map(key => trasladoForm.PPLs[key].id_persona),
                }
            if (formTrasladoValidator(form_procesado)) {

                postForm(
                    isEditMode,
                    'movimientos',
                    'movimiento',
                    form_procesado,
                    setLoading,
                    openSnackbar,
                    router,
                    true,
                    '/movimientos/traslados'
                );
            }

        }else{
            openSnackbar('No tienes permiso para realizar esta accion', 'warning')
        }

    }


    // ************ Agrgar PPLS A TRASLADOS Logica MODAL *********
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        // Reseteamos los valores del formulario del modal antes de abrirlo
        // setModalPPL(initialPPL);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectModalChange = (value: number) => {
        const pplEncontrado = trasladoForm.PPLs.find((item: any) => item.id_persona == value)
        console.log(pplEncontrado)
        // @ts-ignore
        if (pplEncontrado?.id_persona !== value) {
            console.log('false')
            setModalPPL(value)
            setModalSaveButtonStateDisabled(true)
        } else {
            console.log('true')
            openSnackbar('PPL ya esta agregado', 'warning')
            setModalSaveButtonStateDisabled(false)
        }

    };

    const handleDeleteRecord = (value: any) => {
        console.log(value.id_persona)
        setTrasladoForm((prev: any) => ({
            ...prev,
            PPLs: trasladoForm.PPLs.filter((item: any) => item.id_persona !== value.id_persona)
        }))
    }

    const addPPLToState = () => {
        // @ts-ignore

        setTrasladoForm(prev => ({
            ...prev,
            PPLs: [...prev.PPLs, statePPL.find(item => item.id_persona == modalPPL)]
        }))
        setPersonasSeleccionadas(null)
        handleClose();
        setModalPPL(0); // Resetear el formulario del modal
    };

    const listaDeItemBread = [
        {nombre: 'Lista de traslados', url: '/movimientos/traslados', lastItem: false},
        {nombre: 'Traslado', url: '', lastItem: true},
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
            <TituloComponent titulo={isEditMode ? `Traslado ${trasladoForm.numero_de_documento}` : 'Crear Traslado'}>
                <BreadCrumbComponent listaDeItems={listaDeItemBread}/>
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
                                    <Grid item xs={3}>
                                        <TextField
                                            fullWidth
                                            disabled={!sessionData}
                                            label="Nro. de documento de traslado"
                                            variant="outlined"
                                            helperText='* Campo requerido'
                                            error={!trasladoForm.numero_de_documento}
                                            value={trasladoForm.numero_de_documento}
                                            name="numero_de_documento"
                                            onChange={handleInputChange}/>
                                    </Grid>

                                    {/* Fecha del documento */}
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <MobileDatePicker
                                                    disabled={!sessionData}
                                                    label="Fecha del documento"
                                                    format="DD/MM/YYYY"
                                                    name='fechaDocumento'
                                                    value={trasladoForm.fechaDocumento ? dayjs(trasladoForm.fechaDocumento) : dayjs()}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setTrasladoForm(prevState => ({
                                                            ...prevState,
                                                            fechaDocumento: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Fecha del traslado */}
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                                <MobileDatePicker
                                                    disabled={!sessionData}
                                                    label="Fecha del traslado"
                                                    format="DD/MM/YYYY"
                                                    name='fechaTraslado'
                                                    value={trasladoForm.fechaTraslado ? dayjs(trasladoForm.fechaTraslado) : dayjs()}
                                                    onChange={(newValue: Dayjs | null) => {
                                                        setTrasladoForm(prevState => ({
                                                            ...prevState,
                                                            fechaTraslado: newValue,
                                                        }))
                                                    }}

                                                />
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Persona que autorizó traslado */}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Persona que autorizó traslado</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.autorizo}
                                                value={trasladoForm.autorizo}
                                                onChange={handleSelectChange}
                                                label="Persona que autorizó traslado"
                                                name="autorizo"
                                            >

                                                <MenuItem value={0}>
                                                    Seleccionar autorizador
                                                </MenuItem>
                                                {funcionario.map((item: any) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.apellido} {item.nombre} - {item.cedula}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Tipo de medidas de seguridad */}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Tipo de medidas de seguridad</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.medidasSeguridad}
                                                value={trasladoForm.medidasSeguridad}
                                                onChange={handleSelectChange}
                                                label="Tipo de medidas de seguridad"
                                                name="medidasSeguridad"
                                            >
                                                <MenuItem value={0}>
                                                    Seleccionar Seleccionar medida
                                                </MenuItem>
                                                {/* Replace these menu items with your options */}
                                                {medidas.map(medida => (
                                                    <MenuItem key={medida.id} value={medida.id}>
                                                        {medida.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Motivo del traslado */}
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Motivo del traslado</InputLabel>
                                            <Select label='Motivo del traslado'
                                                    disabled={!sessionData}
                                                    error={!trasladoForm.motivoTraslado}
                                                    value={trasladoForm.motivoTraslado}
                                                    onChange={handleSelectChange}
                                                    name="motivoTraslado"
                                            >
                                                <MenuItem value={0}>Seleccione un motivo</MenuItem>
                                                {motivos.map((motivo: any) => (
                                                    <MenuItem key={motivo.id} value={motivo.id}>
                                                        {motivo.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Descripción del motivo */}
                                    <Grid item xs={12}>
                                        <TextField fullWidth multiline rows={4} label="Descripción del motivo"
                                                   disabled={!sessionData}
                                                   variant="outlined"
                                                   value={trasladoForm.descripcionMotivo}
                                                   name="descripcionMotivo"
                                                   onChange={handleInputChange}/>
                                    </Grid>

                                    {/* Persona que custodia */}
                                    <Grid item xs={6}>


                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Personal de custodia</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.custodia}
                                                value={trasladoForm.custodia}
                                                onChange={handleSelectChange}
                                                label="Personal de custodia"
                                                name="custodia"
                                            >
                                                <MenuItem value={0}>
                                                    Seleccionar custodio
                                                </MenuItem>
                                                {/* Replace these menu items with your options */}
                                                {custodio.map((row: any, index) => (
                                                    <MenuItem key={index} value={row.id}>
                                                        {row.apellido}, {row.nombre} - {row.cedula}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>

                                    </Grid>

                                    {/* Chofer */}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>chofer</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.chofer}
                                                value={trasladoForm.chofer}
                                                onChange={handleSelectChange}
                                                label="chofer"
                                                name="chofer"
                                            >
                                                <MenuItem value={0}>
                                                    Seleccionar chofer
                                                </MenuItem>
                                                {/* Replace these menu items with your options */}
                                                {chofer.map((row: any) => (
                                                    <MenuItem key={row.id} value={row.id}>
                                                        {row.apellido}, {row.nombre} - {row.cedula}
                                                    </MenuItem>

                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>

                                    </Grid>

                                    {/*Chapa del vehículo*/}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Chapa del vehiculo</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.vehiculoId}
                                                value={trasladoForm.vehiculoId}
                                                onChange={handleSelectChange}
                                                label="Chapa del vehiculo"
                                                name="vehiculoId"
                                            >
                                                <MenuItem value={0}>Seleccionar chapa del vehiculo</MenuItem>
                                                {vehiculos.map(vehiculo => (
                                                    <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                                        {vehiculo.chapa}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/*Modelo del vehículo*/}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Modelo del vehiculo</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.vehiculoId}
                                                value={trasladoForm.vehiculoId}
                                                onChange={handleSelectChange}
                                                label="Modelo del vehiculo"
                                                name="vehiculoId"
                                            >
                                                <MenuItem value={0}>Seleccionar vehiculo</MenuItem>
                                                {vehiculos.map((vehiculo: any) => (
                                                    <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                                        {vehiculo.marca}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Destino del traslado */}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Destino del traslado</InputLabel>
                                            <Select
                                                disabled={!sessionData}
                                                error={!trasladoForm.destinoTraslado}
                                                value={trasladoForm.destinoTraslado}
                                                onChange={handleSelectChange}
                                                label="Destino del traslado"
                                                name="destinoTraslado"
                                            >
                                                <MenuItem value={0}>Seleccionar destino del traslado</MenuItem>
                                                {/* Replace these menu items with your options */}
                                                {establecimientos.map((row: any) => (
                                                    <MenuItem key={row.id} value={row.id}>
                                                        {row.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>* Campo requerido</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Documento adjunto */}
                                    <Grid item xs={6}>

                                        <TextField
                                            disabled={!sessionData}
                                            variant="outlined"
                                            type="text"
                                            label='Documento adjunto'
                                            fullWidth
                                            value={trasladoForm.documentoAdjunto ? trasladoForm.documentoAdjunto.name : ''}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton component="label">
                                                        <FileUploadOutlined/>
                                                        <input
                                                            style={{display: "none"}}
                                                            type="file"
                                                            hidden
                                                            onChange={handleFileChange}
                                                            name="documentoAdjunto"
                                                        />
                                                    </IconButton>
                                                ),
                                            }}
                                        />

                                    </Grid>


                                    {/* Agregar PPL Button */}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2} alignItems='center'>
                                            <Grid item xs={6}>
                                                <Typography variant='h6'>PPLs a ser trasladados</Typography>
                                            </Grid>
                                            <Grid item xs={6} textAlign='right'>
                                                <Button disabled={!sessionData} variant="contained" color="primary" onClick={handleOpen}>
                                                    Agregar PPL
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {trasladoForm.PPLs.length > 0 ?
                                    <Grid item xs={12}>
                                        <CustomTable
                                            data={trasladoForm.PPLs}
                                            headers={headersPPL}
                                            showId={true}
                                            deleteRecord={handleDeleteRecord}
                                            options={{
                                                pagination: true,
                                                deleteOption: sessionData ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    :
                                        <Grid item sm={12}>
                                            <Alert severity='warning'>Debe agregar al menos una PPL</Alert>
                                        </Grid>

                                    }

                                    {(PermissionValidator('crear_traslados', session) || PermissionValidator('actualizar_traslados', session)) &&
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
                                    }

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
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    fullWidth={true}
                                    value={personasSeleccionadas ? personasSeleccionadas : null}
                                    onChange={(event, newValue: any) => {
                                        // @ts-ignore
                                        if (newValue) {
                                            handleSelectModalChange(newValue.id_persona)
                                        }
                                        setPersonasSeleccionadas((prev: any) => ({
                                            ...newValue
                                        }));
                                    }}
                                    id="controllable-states-demo"
                                    options={statePPL}
                                    getOptionLabel={(option) => option.apellido ? `${option.apellido}, ${option.nombre} - ${option.numero_de_identificacion}` : "Seleccionar PPL"}
                                    renderInput={(params) => <TextField {...params} label="Lista de PPLs"/>}
                                />
                            </FormControl>
                        </Grid>
                        {/*<Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>PPL</InputLabel>
                                <Select
                                    onChange={handleSelectModalChange}
                                    label="PPL"
                                    name="PPL"
                                >
                                     Replace these menu items with your options
                                    <MenuItem value={0}>
                                        Seleccionar PPL
                                    </MenuItem>

                                    {statePPL.map((item: any, index: number) => (
                                        <MenuItem key={index} value={item.id_persona}>
                                            {item.nombre + ' ' + item.apellido}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>*/}
                        <Grid item xs={12}>
                            <Button
                                disabled={!modalSaveButtonStateDisabled}
                                variant="contained" color="primary"
                                onClick={addPPLToState}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </Box>
    );
};


const formTrasladoValidator = (formDatos: any) => {
    let esValidado = true;
    console.log('alert 1')
    console.log('alert 222', formDatos.ppls)
    if (!formDatos.numero_de_documento) {
        esValidado = false
        console.log('alert 2')
    }

    if (!formDatos.fecha_de_documento) {
        esValidado = false
        console.log('alert 2')
    }

    if (!formDatos.autorizado_por) {
        esValidado = false
        console.log('alert 3')
    }

    if (!formDatos.chofer) {
        esValidado = false
        console.log('alert 4')
    }

    if (!formDatos.vehiculo) {
        esValidado = false
        console.log('alert 5')
    }

    if (!formDatos.motivo_de_traslado) {
        esValidado = false
        console.log('alert 6')
    }

    if (formDatos.custodios.length <= 0) {
        esValidado = false
        console.log('alert 7')
    }

    if (formDatos.medidas_de_seguridad.length <= 0) {
        esValidado = false
        console.log('alert 8')
    }

    if (formDatos.ppls.length <= 0) {
        esValidado = false
        console.log('alert 8')
    }

    if (!formDatos.destinoTraslado) {
        esValidado = false
        console.log('alert 9')
    }



    return esValidado
}