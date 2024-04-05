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
import {Add, FileUploadOutlined} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

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
    {id: 'id', label: 'ID'},
    {id: 'fecha', label: 'Fecha registro'},
    {id: 'descripcion', label: 'Descripcion registro medico'},
    {id: 'adjunto', label: 'Documento adjunto'},
];


const dataMedidas = [
    {id: 1, fecha: '01/01/2024', descripcion: 'Verificacion de estado de PPL', adjunto: 'ver doc. adjunto'  },
    {id: 2, fecha: '01/01/2024', descripcion: 'Verificacion de estado de PPL', adjunto: 'ver doc. adjunto'  },
    {id: 3, fecha: '01/01/2024', descripcion: 'Verificacion de estado de PPL', adjunto: 'ver doc. adjunto'  },
    {id: 4, fecha: '01/01/2024', descripcion: 'Verificacion de estado de PPL', adjunto: 'ver doc. adjunto'  },
]

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

    const [loading, setLoading] = useState(false);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode: boolean = params?.id !== 'crear';


    const handleLoading = (value: boolean): void => {
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }

    // Función para cargar los motivos desde el endpoint



    // Cargar datos para edición
    /*useEffect(() => {
        if (isEditMode) {
            // const GetPorID_URL = `${API_URL}/movimientos/getPorId/${params.id}`

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
    }, [isEditMode, params.id]);*/

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
            <TituloComponent titulo={isEditMode ? `Medida de fuerza` : 'Crear Medidas de Fuerza'}/>

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
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Nro. del documento"
                                            variant="outlined"
                                            value={trasladoForm.numero_de_documento}
                                            name="numero_de_documento"
                                            onChange={handleInputChange}/>
                                    </Grid>


                                    {/* Fecha del traslado */}
                                    <Grid item xs={4}>
                                        <DatePicker
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
                                            <InputLabel>Tipo de medida de fuerza</InputLabel>
                                            <Select
                                                value={trasladoForm.autorizo}
                                                onChange={handleSelectChange}
                                                label="Tipo de medida de fuerza"
                                                name="autorizo"
                                            >

                                                <MenuItem value={0}>Seleccionar medida de fuerza</MenuItem>
                                                <MenuItem value={1}>Huelga de hambre</MenuItem>
                                                <MenuItem value={2}>Encadanamiento</MenuItem>
                                                <MenuItem value={3}>Lesiones Fisicas</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Motivo</InputLabel>
                                            <Select
                                                value={trasladoForm.autorizo}
                                                onChange={handleSelectChange}
                                                label="Motivo"
                                                name="autorizo"
                                            >

                                                <MenuItem value={0}>Seleccionar medida de fuerza</MenuItem>
                                                <MenuItem value={1}>Huelga de hambre</MenuItem>
                                                <MenuItem value={2}>Encadanamiento</MenuItem>
                                                <MenuItem value={3}>Lesiones Fisicas</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>




                                    {/* Documento adjunto */}
                                    {/* Fecha del documento */}
                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <DatePicker
                                                label="Fecha y hora de inicio"
                                                format="DD/MM/YYYY"
                                                name='fecha_inicio'
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
                                    <Grid item xs={6}>
                                        <FormControl fullWidth={true}>
                                            <DatePicker
                                                label="Fecha y hora de inicio"
                                                format="DD/MM/YYYY"
                                                name='fecha_inicio'
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





                                    {/* Agregar PPL Button */}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2} alignItems='center'>
                                            <Grid item xs={6}>
                                                <Typography variant='h6'>Historial medico</Typography>
                                            </Grid>
                                            <Grid item xs={6} textAlign='right'>
                                                <Button startIcon={<Add />} variant="text" color="primary" onClick={handleOpen}>
                                                    Agregar registro medico
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTable
                                            data={dataMedidas}
                                            headers={headersPPL}
                                            showId={true}/>
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

