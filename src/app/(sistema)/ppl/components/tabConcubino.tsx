'use client'

import {
    Alert,
    Box,
    Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    Grid, InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Modal,
    Paper, Radio, RadioGroup, Select, SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import style from "./tabConcubino.module.css";
import * as React from "react";
import CustomTable from "@/components/CustomTable";
import {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Add, ContentCopy} from "@mui/icons-material";
import {Edit} from "@mui/icons-material/";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import VerDatosConcubinos from "@/app/(sistema)/ppl/components/concubino/verDatosConcubinos";


const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

interface conyugesTipo {
    id: number | null;
    numero_de_identificacion: string | null;
    tipo_de_identificacion?: number | null;
    nombres: string | null;
    apellidos: string | null;
    es_extranjero: boolean | null;
    fecha_de_nacimiento: Dayjs | null;
    edad: null;
    sexo: null;
    lugar_de_nacimiento: null;
    direccion: null;
    barrio: null;
    compania: null;
    numero_de_contacto: string | null;
    dias_de_visita: number[];

}

const conyugesInitial = {
    id: null,
    numero_de_identificacion: null,
    tipo_de_identificacion: 1,
    nombres: null,
    apellidos: null,
    es_extranjero: null,
    fecha_de_nacimiento: null,
    edad: null,
    sexo: null,
    lugar_de_nacimiento: null,
    direccion: null,
    barrio: null,
    compania: null,
    numero_de_contacto: null,
    dias_de_visita: [1, 2]
}

interface stateDiasDeVisitaType {
    [key: string]: boolean;

    Domingo: boolean;
    Lunes: boolean;
    Martes: boolean;
    Miercoles: boolean;
    Jueves: boolean;
    Viernes: boolean;
    Sabado: boolean;
}


const stateDiasDeVisitaInitial = {
    Domingo: false,
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false,
    Sabado: false
}


export default function TabConcubino({id_persona}: { id_persona: number }) {

    const [stateConyuge, setStateConyuge] = useState<conyugesTipo>(conyugesInitial);
    const [stateConyugeVista, setStateConyugeVista] = useState<conyugesTipo>(conyugesInitial);
    const [stateListaConyuges, setStateListaConyuges] = useState([]);
    const [stateDiasDeVisita, setStateDiasDeVisita] = useState<stateDiasDeVisitaType>(stateDiasDeVisitaInitial);

    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchData = async () => {
            /** Para obtener historial de conyuges */
            try {
                const res = await fetch(`${API_URL}/conyuge/historial_conyuges/${id_persona}`);
                if (!res.ok) throw new Error('Error al obtener el historial de cónyuges');
                const data = await res.json();
                setStateListaConyuges(data);
            } catch (err: any) {
                setError(err.message);
            }

            /** Para obtener El conyuge actual */
            try {
                const res = await fetch(`${API_URL}/conyuge/${id_persona}`);
                if (!res.ok) throw new Error('Error al obtener el cónyuge');
                const data = await res.json();

                // Ajustar el estado del conyuge
                setStateConyugeVista({
                    ...data,
                    numero_de_identificacion: data.numeroDeIdentificacion,
                    fecha_de_nacimiento: data.fecha_de_nacimiento ? dayjs(data.fecha_de_nacimiento) : null,
                    tipo_de_identificacion: data.tipo_de_identificacion?.id,
                });

                // Ajustar el estado de los días de visita
                const diasVisita = {
                    Domingo: data.dias_de_visita.includes(0),
                    Lunes: data.dias_de_visita.includes(1),
                    Martes: data.dias_de_visita.includes(2),
                    Miercoles: data.dias_de_visita.includes(3),
                    Jueves: data.dias_de_visita.includes(4),
                    Viernes: data.dias_de_visita.includes(5),
                    Sabado: data.dias_de_visita.includes(6)
                };
                setStateDiasDeVisita(diasVisita);
            } catch (err: any) {
                setError(err.message);
            }
        };

        if (id_persona) {
            fetchData();
        }
    }, [id_persona]);


    /* HANDLERS DEL DE MENU Y MODALS*/
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (type: string | null = null) => {
        setAnchorEl(null);
        console.log('hola')
        if (type == 'modificar_concubino') {
            setStateConyuge({...stateConyugeVista})
            handleOpenModal()
        }

        if (type == 'agregar_concubino') {
            handleOpenModal()
        }
    };

    const handleOpenModal = () => {
        console.log('hola')
        setOpenModal(true)
    };
    const handleCloseModal = () => setOpenModal(false);

    /* HANDLERS DEL FORM*/
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value

        setStateConyuge((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onDatoSelectChange = (event: SelectChangeEvent<number | string | null>) => {
        const name = event.target.name
        const value = event.target.value

        setStateConyuge((prev: any) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleChangeDiasVisitas = (event: any) => {
        const name = event.target.name
        const value = event.target.value

        setStateDiasDeVisita((prev) => ({
            ...prev,
            [name]: event.target.checked,
        }))
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        // const dias_visitas_procesasdo = Object.keys(stateDiasDeVisita)

        const dias_visitas_procesasdo = Object.keys(stateDiasDeVisita)
            .map((key: string) => {
                if (stateDiasDeVisita[key] === true) {
                    return key;
                } else {
                    return null;
                }
            })
            .filter(key => key !== null)
            .map(key => {
                switch (key) {
                    case 'Domingo':
                        return 1;
                    case 'Lunes':
                        return 2;
                    case 'Martes':
                        return 3;
                    case 'Miercoles':
                        return 4;
                    case 'Jueves':
                        return 5;
                    case 'Viernes':
                        return 6;
                    case 'Sabado':
                        return 7;
                    default:
                        return null;
                }
            })
            .filter(index => index !== null);

        console.log(dias_visitas_procesasdo)
        const formData = new FormData();
        formData.append('id_persona', '35');
        formData.append('numero_de_identificacion', stateConyuge.numero_de_identificacion ?? '');
        formData.append('nombres', stateConyuge.nombres ?? '');
        formData.append('apellidos', stateConyuge.apellidos ?? '');
        formData.append('es_extranjero', stateConyuge.es_extranjero ? 'true' : 'false');
        formData.append('fecha_de_nacimiento', stateConyuge.fecha_de_nacimiento ? stateConyuge.fecha_de_nacimiento.toISOString() : '');
        formData.append('edad', stateConyuge.edad ?? '');
        formData.append('sexo', stateConyuge.sexo ?? '');
        formData.append('lugar_de_nacimiento', stateConyuge.lugar_de_nacimiento ?? '');
        formData.append('direccion', stateConyuge.direccion ?? '');
        formData.append('barrio', stateConyuge.barrio ?? '');
        formData.append('compania', stateConyuge.compania ?? '');
        formData.append('numero_de_contacto', stateConyuge.numero_de_contacto ?? '');
        // formData.append('dias_de_visita', dias_visitas_procesasdo);

        try {
            const response = await fetch(`${API_URL}/conyuge`, {
                method: stateConyuge.id ? 'PUT' : 'POST',
                // body: formData,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...stateConyuge,
                    id_persona: id_persona,
                    dias_de_visita: dias_visitas_procesasdo
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }

            const data = await response.json();
            console.log(data);
            // Manejar la respuesta exitosa
        } catch (err) {
            console.error(err);
            // Manejar el error
        } finally {
            handleCloseModal()
        }
    }


    return (
        <>
            <Box mt={3}>

                <Paper elevation={1}>
                    <Box p={3}>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h6'>
                                Datos de conyugue
                            </Typography>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                variant='outlined'
                                endIcon={<MoreVertIcon/>}
                            >
                                Opciones
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => handleClose('general')}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => handleClose('modificar_concubino')}>
                                    <ListItemIcon>
                                        <Edit fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Modificar concubino</ListItemText>

                                </MenuItem>
                                <MenuItem onClick={() => handleClose('agregar_concubino')}>
                                    <ListItemIcon>
                                        <Add fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Agregar concubino</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Stack>
                        {stateConyugeVista.id
                            ? <VerDatosConcubinos
                                stateConyuge={stateConyugeVista}
                                stateListaConyuges={stateListaConyuges}/>
                            :
                            <Box mt={3}>
                                <Alert severity="info">Este perfil aún no tiene un conyuge asignado.</Alert>
                            </Box>
                        }
                    </Box>
                </Paper>
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Datos de concubino
                    </Typography>
                    <Box mt={2}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <FormLabel>Extranjero:</FormLabel>
                                        <RadioGroup
                                            value={stateConyuge.es_extranjero}
                                            onChange={handleChange}
                                            row
                                            aria-labelledby="Es extranjero"
                                            name="es_extranjero">
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio/>}
                                                label="Si"/>
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio/>}
                                                label="No"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id='tipo-doc-label'>Tipo documento</InputLabel>
                                        <Select
                                            labelId='tipo-doc-label'
                                            value={stateConyuge.tipo_de_identificacion ? stateConyuge.tipo_de_identificacion : 0}
                                            label='Tipo documento'
                                            onChange={onDatoSelectChange}
                                            name="tipo_de_identificacion"
                                        >
                                            <MenuItem value={1}>Cedula de identidad policial</MenuItem>
                                            <MenuItem value={2}>Pasaporte</MenuItem>
                                            <MenuItem value={3}>Prontuario policial</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Nro. documento'
                                        name='numero_de_identificacion'
                                        value={stateConyuge.numero_de_identificacion}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={1}>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Nombre'
                                        name='nombres'
                                        value={stateConyuge.nombres}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Apellido'
                                        name='apellidos'
                                        value={stateConyuge.apellidos}
                                        onChange={handleChange}
                                    />
                                </Grid>


                                <Grid item sm={4}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                            <MobileDatePicker
                                                label="Fecha de nacimiento"
                                                format="DD/MM/YYYY"
                                                name='fecha_de_nacimiento'
                                                value={stateConyuge.fecha_de_nacimiento ? dayjs(stateConyuge.fecha_de_nacimiento) : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setStateConyuge(prevState => ({
                                                        ...prevState,
                                                        fecha_de_nacimiento: newValue,
                                                    }))
                                                }}

                                            />
                                        </LocalizationProvider>
                                        <FormHelperText>* Campo requerido</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Edad'
                                        name='edad'
                                        value={stateConyuge.edad}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <FormLabel>Sexo:</FormLabel>
                                        <RadioGroup
                                            value={stateConyuge.sexo}
                                            onChange={handleChange}
                                            row
                                            aria-labelledby="Sexo"
                                            name="sexo">
                                            <FormControlLabel
                                                value={1}
                                                control={<Radio/>}
                                                label="Feminino"/>
                                            <FormControlLabel
                                                value={2}
                                                control={<Radio/>}
                                                label="Masculino"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        label='Direccion residencia'
                                        name='direccion'
                                        value={stateConyuge.direccion}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Ciudad de residencia'
                                        name='lugar_de_nacimiento'
                                        value={stateConyuge.lugar_de_nacimiento}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Barrio de residencia'
                                        name='barrio'
                                        value={stateConyuge.barrio}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Compañia de residencia'
                                        name='compania'
                                        value={stateConyuge.compania}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label='Numero de contacto'
                                        name='numero_de_contacto'
                                        value={stateConyuge.numero_de_contacto}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControl>
                                        <FormLabel id="dias_visita">Dias de visita:</FormLabel>
                                        <FormGroup row>
                                            <FormControlLabel
                                                value="Domingo"
                                                control={<Checkbox checked={stateDiasDeVisita.Domingo}
                                                                   onChange={handleChangeDiasVisitas} name='Domingo'/>}
                                                label="Domingo"/>
                                            <FormControlLabel
                                                value="Lunes"
                                                control={<Checkbox checked={stateDiasDeVisita.Lunes}
                                                                   onChange={handleChangeDiasVisitas} name='Lunes'/>}
                                                label="Lunes"/>
                                            <FormControlLabel
                                                value="Martes"
                                                control={<Checkbox checked={stateDiasDeVisita.Martes}
                                                                   onChange={handleChangeDiasVisitas} name='Martes'/>}
                                                label="Martes"/>
                                            <FormControlLabel
                                                value="Miercoles"
                                                control={<Checkbox checked={stateDiasDeVisita.Miercoles}
                                                                   onChange={handleChangeDiasVisitas}
                                                                   name='Miercoles'/>}
                                                label="Miercoles"/>
                                            <FormControlLabel
                                                value="Jueves"
                                                control={<Checkbox checked={stateDiasDeVisita.Jueves}
                                                                   onChange={handleChangeDiasVisitas} name='Jueves'/>}
                                                label="Jueves"/>
                                            <FormControlLabel
                                                value="Viernes"
                                                control={<Checkbox checked={stateDiasDeVisita.Viernes}
                                                                   onChange={handleChangeDiasVisitas} name='Viernes'/>}
                                                label="Viernes"/>
                                            <FormControlLabel
                                                value="Sabado"
                                                control={<Checkbox checked={stateDiasDeVisita.Sabado}
                                                                   onChange={handleChangeDiasVisitas} name='Sabado'/>}
                                                label="Sabado"/>
                                        </FormGroup>


                                    </FormControl>
                                    {/*<TextField
                                        fullWidth
                                        label='Dias de visita'
                                        name='dias_de_visita'
                                        value={stateConyuge.dias_de_visita}
                                        onChange={handleChangeDiasVisitas}
                                    />*/}
                                </Grid>

                                <Grid item sm={12}>
                                    <Stack spacing={2} direction='row' justifyContent='start'>
                                        <Button variant='contained' onClick={handleSubmit}>
                                            Guardar
                                        </Button>
                                        <Button variant='outlined' onClick={()=> {
                                            handleCloseModal()
                                            setStateConyuge(conyugesInitial)
                                        }}>
                                            Cancelar
                                        </Button>
                                    </Stack>
                                </Grid>

                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}