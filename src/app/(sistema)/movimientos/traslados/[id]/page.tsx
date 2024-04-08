'use client'

import {
    Box,
    Button,
    CardContent,
    CircularProgress,
    FormControl,
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
import {FileUploadOutlined} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import {DatePicker, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import es from 'dayjs/locale/es';
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
    fechaDocumento: null,
    fechaTraslado: null,
    autorizo: 0,
    motivoTraslado: 0,
    medidasSeguridad: [0],
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

    const [establecimientos, setEstablecimientos] = useState<[]>([]);
    const [motivos, setMotivos] = useState<Motivo[]>([]);
    const [medidas, setMedidas] = useState<Medidas[]>([]);
    const [custodio, setCustodio] = useState<[]>([]);
    const [chofer, setChofer] = useState<[]>([]);
    const [vehiculos, setVehiculo] = useState<Vehiculo[]>([]);
    const [funcionario, setFuncionario] = useState<[]>([]);
    const [modalPPL, setModalPPL] = React.useState<number>(0);

    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);
    const [trasladoForm, setTrasladoForm] = useState<TrasladoForm>(initialTrasladoForm);

    const [loading, setLoading] = useState(true);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode: boolean = params?.id !== 'crear';


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
                            PPLs: data.ppls.map((item:any)=>({id_persona: item.persona.id, nombre: item.persona.nombre, apellido: item.persona.apellido, apodo: item.persona.datosPersonales?.apodo, numero_de_identificacion: item.persona.numero_identificacion})),
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

        }else{
            handleLoading(false);
        }
    }, [isEditMode, params.id]);

    // Manejadores para inputs fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setTrasladoForm(prev => ({...prev, [name]: value}));
    };

    // Manejador para actualizar selects
    const handleSelectChange = (event: SelectChangeEvent<string|number|[number]>) => {
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

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const postTraslado = async () => {
        try {
            setLoading(true);

            await delay(5000);

            const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_JSON_SERVER}/traslados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trasladoForm) // trasladoForm contiene los datos de tu formulario
            });

            setLoading(false);

            if (response.ok) {
                openSnackbar("Traslado creado correctamente.", "success");
                router.push('/movimientos/traslados');
            }
            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const data = await response.json();
            console.log('Traslado creado:', data);
        } catch (error) {
            setLoading(false);

            console.error('Error:', error);
        }
    };


    // Manejador de envio
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form_method = isEditMode ? 'PUT' : 'POST'



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
                ppls: Object.keys(trasladoForm.PPLs).map(key=>trasladoForm.PPLs[key].id_persona),
            }

        console.log(form_method)
        console.log(trasladoForm)
        console.log(form_procesado)

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

    /*useEffect(() => {
        // @ts-ignore
        if (isEditMode) {

            setLoading(true);
            fetchFormData(params.id, 'traslados') // Usa la función importada
                .then((data) => {
                    if (data) {
                        console.log(data);
                        setTrasladoForm(data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isEditMode, params.id]);*/

    /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /!*console.log(trasladoForm)*!/
        const response = await sendRequest('/traslados', trasladoForm, params.id, isEditMode);

        setLoading(false);
        if (response.ok) {
            // @ts-ignore
            const message = isEditMode !== 'crear'
                ? 'Traslado actualizado correctamente.'
                : 'Traslado agregado correctamente.';
            openSnackbar(message, 'success');
            router.push('/movimientos/');
        } else {
            openSnackbar('Error en la operación.', 'error');
            console.error('Error:', await response.text());
        }

        postTraslado();
        // console.log(JSON.stringify(trasladoForm))
    };*/

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

    const handleSelectModalChange = (event: SelectChangeEvent) => {
        const value : number = parseInt(event.target.value);
        // @ts-ignore
        if(!trasladoForm.PPLs.includes(value)) {

            setModalPPL(value)
        }else{
            openSnackbar('PPL ya esta agregado', 'warning')
        }

    };

    /*const handleTextModalChange = (field: keyof PPLType) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;

        setModalPPL(prev => ({...prev, [field]: value}));
    };
*/
    const addPPLToState = () => {
        // @ts-ignore

        setTrasladoForm(prev=>({
            ...prev,
            PPLs: [...prev.PPLs, statePPL.find(item=> item.id_persona == modalPPL)]
        }))
        handleClose();
        setModalPPL(0); // Resetear el formulario del modal
    };

    return (
        <Box>
            <TituloComponent titulo={isEditMode ? `Traslado ${trasladoForm.numero_de_documento}` : 'Crear Traslado'}/>

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
                                            label="Nro. del documento"
                                            variant="outlined"
                                            value={trasladoForm.numero_de_documento}
                                            name="numero_de_documento"
                                            onChange={handleInputChange}/>
                                    </Grid>

                                    {/* Fecha del documento */}
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <MobileDatePicker
                                                label="Fecha del documento"
                                                format="DD/MM/YYYY"
                                                name='fechaDocumento'
                                                value={trasladoForm.fechaDocumento ? dayjs(trasladoForm.fechaDocumento) : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setTrasladoForm(prevState => ({
                                                        ...prevState,
                                                        fechaDocumento: newValue,
                                                    }))
                                                }}

                                            />
                                        </FormControl>
                                    </Grid>

                                    {/* Fecha del traslado */}
                                    <Grid item xs={3}>
                                        <MobileDatePicker
                                            label="Fecha del traslado"
                                            format="DD/MM/YYYY"
                                            name='fechaTraslado'
                                            value={trasladoForm.fechaTraslado ? dayjs(trasladoForm.fechaTraslado) : null}
                                            onChange={(newValue: Dayjs | null) => {
                                                setTrasladoForm(prevState => ({
                                                    ...prevState,
                                                    fechaTraslado: newValue,
                                                }))
                                            }}

                                        />
                                    </Grid>

                                    {/* Persona que autorizó traslado */}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Persona que autorizó traslado</InputLabel>
                                            <Select
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
                                        </FormControl>
                                    </Grid>

                                    {/* Tipo de medidas de seguridad */}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Tipo de medidas de seguridad</InputLabel>
                                            <Select
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
                                        </FormControl>
                                    </Grid>

                                    {/* Motivo del traslado */}
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Motivo del traslado</InputLabel>
                                            <Select label='Motivo del traslado'
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
                                        </FormControl>
                                    </Grid>

                                    {/* Descripción del motivo */}
                                    <Grid item xs={12}>
                                        <TextField fullWidth multiline rows={4} label="Descripción del motivo"
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
                                                value={trasladoForm.custodia}
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

                                    {/* Chofer */}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>chofer</InputLabel>
                                            <Select
                                                value={trasladoForm.chofer}
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

                                    {/*Chapa del vehículo*/}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Chapa del vehiculo</InputLabel>
                                            <Select
                                                value={trasladoForm.vehiculoId}
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
                                                value={trasladoForm.vehiculoId}
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

                                    {/* Destino del traslado */}
                                    <Grid item xs={6}>

                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Destino ddel traslado</InputLabel>
                                            <Select
                                                value={trasladoForm.destinoTraslado}
                                                onChange={handleSelectChange}
                                                label="Destino del traslado"
                                                name="destinoTraslado"
                                            >
                                                {/* Replace these menu items with your options */}
                                                {establecimientos.map((row: any) => (
                                                    <MenuItem key={row.id} value={row.id}>
                                                        {row.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Documento adjunto */}
                                    <Grid item xs={6}>

                                        <TextField
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
                                                <Button variant="contained" color="primary" onClick={handleOpen}>
                                                    Agregar PPL
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTable data={trasladoForm.PPLs} headers={headersPPL} showId={true}/>
                                    </Grid>


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
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>PPL</InputLabel>
                                <Select
                                    onChange={handleSelectModalChange}
                                    label="PPL"
                                    name="PPL"
                                >
                                    {/* Replace these menu items with your options */}
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
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={addPPLToState}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </Box>
    );
};

