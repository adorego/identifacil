'use client'

import React, { useState, useEffect } from 'react';
import { Button, CircularProgress,  CardContent,  Grid,  TextField,  FormControl,  InputLabel,  Select,
    MenuItem,  Typography, IconButton, Box, Modal, Paper, } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {FileUploadOutlined} from "@mui/icons-material";
import CustomTable from "@/components/CustomTable";
import {useRouter} from 'next/navigation';
import {useGlobalContext} from "@/app/Context/store";
import TituloComponent from "@/components/titulo/tituloComponent";
import {
    TrasladoForm,
    PPLType,
    Motivo,
    Medidas,
    Personal,
    Vehiculo,
    pplTraslado
} from "@/components/utils/movimientosType"
import {sendRequest} from "@/app/api";
import {fetchFormData, postEntity} from "@/components/utils/utils";



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

const initialPPL: { id: string } = {
    id: '0',
};

const initialTrasladoForm: TrasladoForm = {
    id: 0,
    documento: '',
    fechaDocumento: '',
    fechaTraslado: '',
    autorizo: '',
    motivoTraslado: '',
    medidasSeguridad: '',
    descripcionMotivo: '',
    custodia: '',
    chofer: '',
    vehiculoId: '',
    destinoTraslado: '',
    documentoAdjunto: '',
    PPLs: [],
    lastUpdate: '',
};

// Datos para traslados nombre;alias;motivo;fechaTraslado;
const headersPPL = [
    { id: 'id', label: 'ID' },
    { id: 'nombreApellido', label: 'Nombre y apellido' },
    { id: 'alias', label: 'Alias' },
    { id: 'motivo', label: 'Motivo de Traslado' },
    { id: 'fechaTraslado', label: 'Fecha traslado' },
];

const URL_ENDPOINT = 'http://localhost:5000/motivoTraslados';
const URL_ENDPOINT_MEDIDAS = 'http://localhost:5000/medidaSeguridad';
const URL_ENDPOINT_PERSONAL = 'http://localhost:5000/personal';
const URL_ENDPOINT_VEHICULOS = 'http://localhost:5000/vehiculo';

// TODO: Cuando se envia el submit se debe bloquear el boton de guardado
// TODO: Luego de enviar la peticion se debe mostrar una alerta de que se guardo correctamente
// TODO: hacer un spinner que bloquee toda la pantalla cuando carga o guarda los datos

export default function Page({ params }: { params: { id: number } }) {

    const [motivos, setMotivos] = useState<Motivo[]>([]);
    const [medidas, setMedidas] = useState<Medidas[]>([]);
    const [personal, setPersonal] = useState<Personal[]>([]);
    const [vehiculos, setVehiculo] = useState<Vehiculo[]>([]);
    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);

    const [trasladoForm, setTrasladoForm] = useState<TrasladoForm>(initialTrasladoForm);
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;



    const handleLoading = (value:boolean):void =>{
        // console.log('ahora ' + value);
        setLoading(value);
        // console.log('edit:' + isEditMode)
    }

    // Función para cargar los motivos desde el endpoint
    useEffect(() => {

        async function cargarMotivos() {
            try {
                const respuesta = await fetch(URL_ENDPOINT);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMotivos(datos);
                } else {
                    throw new Error(`Error: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al cargar los motivos:', error);
            }
        }

        const fetchMedidas = async () => {
            try {
                const respuesta = await fetch(URL_ENDPOINT_MEDIDAS);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMedidas(datos);

                } else {
                    throw new Error(`Error: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al cargar los medidas:', error);
            }
        };
        const fetchPersonal = async () => {
            try {
                const respuesta = await fetch(URL_ENDPOINT_PERSONAL);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setPersonal(datos);

                } else {
                    throw new Error(`Error: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al cargar los medidas:', error);
            }
        };

        const fetchVehiculos = async () => {
            try {
                const respuesta = await fetch(URL_ENDPOINT_VEHICULOS);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setVehiculo(datos);
                    console.log(datos)
                } else {
                    throw new Error(`Error: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al cargar los vehiculos:', error);
            }
        };

        const fetchPplTraslado = async () => {
            try {
                const respuesta = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/PPL`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setStatePPL(datos);
                    console.log(datos)
                } else {
                    throw new Error(`Error: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al cargar los PPLs:', error);
            }
        };

        cargarMotivos();
        fetchMedidas();
        fetchPersonal();
        fetchVehiculos();
        fetchPplTraslado();
    }, []);


    // Cargar datos para edición
    useEffect(() => {
        if (isEditMode) {
            handleLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/traslados?id=${params.id}`)
                .then(response => response.json())
                .then(data => {
                    // TODO: Asegúrate de que el array no esté vacío y de que el objeto tenga las propiedades necesarias
                    // TODO: FALTA GUARDAR PPLS

                    if (data.length > 0 && data[0].documento) {
                        //TODO: Corregir el setter del form para ver el attachment
                        setTrasladoForm({
                            id: data[0].id,
                            documento: data[0].documento,
                            fechaDocumento: data[0].fechaDocumento,
                            fechaTraslado: data[0].fechaTraslado,
                            autorizo: data[0].autorizo,
                            motivoTraslado: data[0].motivoTraslado,
                            medidasSeguridad: data[0].medidasSeguridad,
                            descripcionMotivo: data[0].descripcionMotivo,
                            custodia: data[0].custodia,
                            chofer: data[0].chofer,
                            PPLs: data[0].PPLs,
                            vehiculoId: data[0].vehiculoId,
                            destinoTraslado: data[0].destinoTraslado,
                            documentoAdjunto: '',
                            lastUpdate: '' // Asegúrate de definir un valor por defecto para las propiedades faltantes
                        });
                    }
                }).then( ()=>{
                handleLoading(false);
            })
                .catch(error => {
                    handleLoading(true);
                    console.error('Error:', error)
                }).finally(()=>{
                handleLoading(false);
            });

        }
    }, [isEditMode, params.id]);

    // Manejadores para inputs fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTrasladoForm(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para actualizar selects
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof trasladoForm;
        console.log('value: ' + event.target.value);
        setTrasladoForm({
            ...trasladoForm,
            [name]: event.target.value,
        });
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setTrasladoForm(prev => ({ ...prev, [name]: files[0] }));
        }
    };


    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const postTraslado = async () => {
        try {
            setLoading(true);

            await delay(5000);

            const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/traslados`, {
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
    const handleSubmit = () => {

        postEntity(
            isEditMode,
            'traslados',
            'Traslados',
            params,
            trasladoForm,
            setLoading,
            openSnackbar,
            router
        );
    }

    useEffect(() => {
        // @ts-ignore
        if (isEditMode !== 'crear') {

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
        }else{

        }
    }, [isEditMode, params.id]);
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

    const [modalPPL, setModalPPL] = React.useState(initialPPL);

    const handleOpen = () => {
        // Reseteamos los valores del formulario del modal antes de abrirlo
        setModalPPL(initialPPL);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectModalChange = (field: keyof PPLType) => (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setModalPPL(prev => ({ ...prev, [field]: value }));
    };

    const handleTextModalChange = (field: keyof PPLType) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setModalPPL(prev => ({ ...prev, [field]: value }));
    };

    const addPPLToState = () => {
        // @ts-ignore
        setTrasladoForm(prevState => ({
            ...prevState,
            PPLs: [...prevState.PPLs, modalPPL.id]
        }));
        handleClose();
        setModalPPL(initialPPL); // Resetear el formulario del modal
    };

    return (
        <Box>
            <TituloComponent titulo={`Traslado ${trasladoForm.documento}`} />

            {/*<QueryBlock/>*/}
            <Box mt={4}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                <CardContent>
                    {/*<Typography variant='h6' mb={2}>Detalles del traslado</Typography>*/}
                    { loading
                        ?  (
                            <Box sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '35vh',
                            }}>
                            <CircularProgress />
                        </Box>)
                        : (<form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Nro. del documento */}
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Nro. del documento"
                                        variant="outlined"
                                        value={trasladoForm.documento}
                                        name="documento"
                                        onChange={handleInputChange}/>
                                </Grid>

                                {/* Fecha del documento */}
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Fecha del documento" type="date"
                                               variant="outlined"
                                               value={trasladoForm.fechaDocumento}
                                               name="fechaDocumento"
                                               onChange={handleInputChange}
                                               InputLabelProps={{ shrink: true }} />
                                </Grid>

                                {/* Fecha del traslado */}
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Fecha del traslado" type="date"
                                               variant="outlined"
                                               value={trasladoForm.fechaTraslado}
                                               name="fechaTraslado"
                                               onChange={handleInputChange}
                                               InputLabelProps={{ shrink: true }} />
                                </Grid>

                                {/* Persona que autorizó traslado */}
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Persona que autorizó traslado" variant="outlined"
                                               value={trasladoForm.autorizo}
                                               name="autorizo"
                                               onChange={handleInputChange}/>
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
                                            {/* Replace these menu items with your options */}
                                            {medidas.map(medida => (
                                                <MenuItem key={medida.id} value={medida.id}>
                                                    {medida.medidaSeguridad}
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
                                            <MenuItem value="">Seleccione un motivo</MenuItem>
                                            {motivos.map(motivo => (
                                                <MenuItem key={motivo.id} value={motivo.id}>
                                                    {motivo.descripcion}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Descripción del motivo */}
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline rows={4} label="Descripción del motivo" variant="outlined"
                                               value={trasladoForm.descripcionMotivo}
                                               name="descripcionMotivo"
                                               onChange={handleInputChange}/>
                                </Grid>

                                {/* Persona que custodia */}
                                <Grid item xs={6}>
                                    {/*<TextField fullWidth label="Persona que custodia" variant="outlined"
                                               value={trasladoForm.custodia}
                                               name="custodia"
                                               onChange={handleInputChange}/>*/}

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Personal de custodia</InputLabel>
                                        <Select
                                            value={trasladoForm.custodia}
                                            onChange={handleSelectChange}
                                            label="Personal de custodia"
                                            name="custodia"
                                        >
                                            {/* Replace these menu items with your options */}
                                            {personal.filter(row => row.tipo === 'custodio').map(row => (
                                                <MenuItem key={row.id} value={row.id}>
                                                    {row.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Grid>

                                {/* Chofer */}
                                <Grid item xs={6}>
                                    {/*                                    <TextField fullWidth label="Chofer" variant="outlined"
                                               value={trasladoForm.chofer}
                                               name="chofer"
                                               onChange={handleInputChange}/>*/}

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>chofer</InputLabel>
                                        <Select
                                            value={trasladoForm.chofer}
                                            onChange={handleSelectChange}
                                            label="chofer"
                                            name="chofer"
                                        >
                                            {/* Replace these menu items with your options */}
                                            {personal.filter(row => row.tipo === 'chofer').map(row => (
                                                <MenuItem key={row.id} value={row.id}>
                                                    {row.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Grid>

                                {/* Chapa del vehículo */}
                                <Grid item xs={6}>

                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={trasladoForm.vehiculoId}
                                            onChange={handleSelectChange}
                                            label="Chapa"
                                            name="vehiculoId"
                                        >
                                            {/* Replace these menu items with your options */}
                                            {vehiculos.map(vehiculo => (
                                                <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                                    {vehiculo.chapa}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Modelo del vehículo */}
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Modelo del vehiculo</InputLabel>
                                        <Select
                                            value={trasladoForm.vehiculoId}
                                            onChange={handleSelectChange}
                                            label="Modelo del vehiculo"
                                            name="vehiculoId"
                                        >
                                            {/* Replace these menu items with your options */}
                                            {vehiculos.map(vehiculo => (
                                                <MenuItem key={vehiculo.id} value={vehiculo.id}>
                                                    {vehiculo.modelo}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Destino del traslado */}
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Destino del traslado" variant="outlined"
                                               value={trasladoForm.destinoTraslado}
                                               name="destinoTraslado"
                                               onChange={handleInputChange}/>
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
                                                <IconButton component="label" >
                                                    <FileUploadOutlined />
                                                    <input
                                                        style={{display:"none"}}
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

                                {/* Documento adjunto */}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit" // Cambiar a type="submit"
                                    >
                                        {loading ? <CircularProgress color='success' size={24} /> : "Guardar Cambios"}
                                    </Button>
                                </Grid>

                                {/* PPLs a ser trasladados */}


                                {/* Agregar PPL Button */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
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
                                <Grid item xs={12} >
                                    <CustomTable data={trasladoForm.PPLs} headers={headersPPL} showId={true}/>
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
                                    value={modalPPL.id}
                                    label='PPL'
                                    onChange={handleSelectModalChange('id')}
                                >
                                    {/* Aquí puedes agregar los PPLs precargados */}
                                    {
                                        statePPL.map(
                                            (item) => {
                                                return (
                                                    <MenuItem key={item.id} value={item.id}>{item.nombre + ' ' + item.apellido}</MenuItem>
                                                )
                                            }
                                        )
                                    }
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

