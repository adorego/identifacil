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
    Select, Stack,
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
import {MuiFileInput} from "mui-file-input";
import AddIcon from "@mui/icons-material/Add";

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
    descripcion_de_la_falta: '',
    tipo_falta: 0,
    grado_de_falta: 0,
    victima_falta: {id: 0, nombre: '', apellido: '', documento: ''},
    tipo_victima: 0,
    victimas: [],

};


const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;
const URL_ENDPOINT = `${API_URL}/movimientos/motivos_de_traslado`;

// TODO: Cuando se envia el submit se debe bloquear el boton de guardado
// TODO: Luego de enviar la peticion se debe mostrar una alerta de que se guardo correctamente
// TODO: hacer un spinner que bloquee toda la pantalla cuando carga o guarda los datos
// TODO: Origen de destino debe ser dinamico

export default function Page({params,}: { params: { id: number | string } }) {

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

        if(isEditMode){
            fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/faltas_sanciones/faltas/ppl/1`).then(res=>{
                return res.json()
            }).then(data=>{
                console.log(data)
            })
        }

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

    const handleVictimaChange = (index: number, field: string, value: any) => {
        setStateForm((prevData) => ({
                ...prevData,
                victimas: prevData.victimas?.map((item: any, i: number) =>
                    i === index ? {...item, [field]: value} : item
                )
            })
        );
    }

    // Manejador de envio
    // TODO: Hacer el update
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form_method = isEditMode ? 'PUT' : 'POST'

        // console.log('Falta', stateForm.fecha_falta?.toISOString())
        var fechaFalta = stateForm.fecha_falta;
        var horaFalta = stateForm.hora_falta;
        if (fechaFalta && horaFalta) {
            fechaFalta.hour(horaFalta.hour()).minute(horaFalta.minute()).second(horaFalta.second())
        }

        const formData = new FormData();

        formData.append('ppl', personasSeleccionadas ? personasSeleccionadas.id_persona.toString() : '');
        formData.append('numero_de_resolucion', stateForm.numero_de_resoulucion);
        formData.append('fecha_de_resolucion', stateForm.fecha_resolucion ? stateForm.fecha_resolucion.toISOString() : '');
        if (stateForm.resolucion_falta) formData.append('resolucion_falta', stateForm.resolucion_falta);

        formData.append('descripcion_de_la_falta', stateForm.descripcion_de_la_falta);
        formData.append('grado_de_falta', stateForm.grado_de_falta.toString());
        formData.append('fecha_y_hora_de_la_falta', fechaFalta ? fechaFalta.toISOString() : '');
        if (stateForm.victimas && stateForm.victimas.length > 0) {
            stateForm.victimas.forEach((item: any, i: number) => {
                formData.append(`victimas_de_la_falta[${i}][ci]`, stateForm.victimas ? stateForm.victimas[i].documento : '');
                formData.append(`victimas_de_la_falta[${i}][nombre]`, stateForm.victimas ? stateForm.victimas[i].nombre : '');
                formData.append(`victimas_de_la_falta[${i}][apellido]`, stateForm.victimas ? stateForm.victimas[i].apellido : '');
                formData.append(`tipos_de_victimas[${i}]`, stateForm.victimas ? stateForm.victimas[i].tipos_de_victima.toString() : '');
            })
        }

        try {
            const response = await fetch(`${API_URL}/faltas_sanciones/faltas`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos del registro médico');
            }

            openSnackbar('Falta guardado correctamente.', 'success')

        } catch (err) {
            console.log(err)
        }
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
                                                name='hora_falta'

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
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label='Nro. de resolucion'
                                            name='numero_de_resoulucion'
                                            value={stateForm.numero_de_resoulucion}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
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
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <MuiFileInput
                                                fullWidth
                                                required
                                                error={!stateForm.resolucion_falta}
                                                value={stateForm.resolucion_falta}
                                                variant="outlined"
                                                label="Seleccionar documento"
                                                getInputText={(value) => value ? value.name : ''}
                                                onChange={(newValue) => {
                                                    setStateForm((prev: any) => ({
                                                        ...prev,
                                                        resolucion_falta: newValue,
                                                    }))
                                                }}
                                            />
                                        </FormControl>
                                        <FormHelperText>* Campo requerido</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='Descripcion de la falta'
                                            name='descripcion_de_la_falta'
                                            onChange={handleChange}
                                            value={stateForm.descripcion_de_la_falta}
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
                                                value={stateForm.grado_de_falta}
                                                onChange={handleSelectChange}
                                                label="Seleccionar PPL"
                                                name="grado_de_falta"
                                            >

                                                <MenuItem value={0}>Seleccionar grado</MenuItem>
                                                <MenuItem value={1}>Leve</MenuItem>
                                                <MenuItem value={2}>Grave</MenuItem>
                                                <MenuItem value={3}>Severo</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/*<Grid item xs={6}>
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
                                    </Grid>*/}

                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item sm={12}>
                                        <Typography variant='subtitle1' fontWeight='bold' mb={2}>Victimas</Typography>

                                    </Grid>

                                    {stateForm.victimas?.map((item: any, index: number) => (
                                        <Grid item sm={12} key={index}>
                                            <Stack spacing={1} direction='row' justifyContent='space-around'>
                                                <TextField
                                                    fullWidth
                                                    label='Nro. de documento'
                                                    name='documento'
                                                    value={stateForm.victimas ? stateForm.victimas[index].documento : ''}
                                                    onChange={(e) => handleVictimaChange(index, 'documento', e.target.value)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label='Nombre'
                                                    name='nombre'
                                                    value={stateForm.victimas ?stateForm.victimas[index].nombre : ''}
                                                    onChange={(e) => handleVictimaChange(index, 'nombre', e.target.value)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label='Victima de Apellido falta'
                                                    name='apellido'
                                                    value={stateForm.victimas ? stateForm.victimas[index].apellido : ''}
                                                    onChange={(e) => handleVictimaChange(index, 'apellido', e.target.value)}
                                                />
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Tipo de Victima</InputLabel>
                                                    <Select
                                                        value={stateForm.victimas ? stateForm.victimas[index].tipos_de_victima : ' '}
                                                        onChange={(e) => handleVictimaChange(index, 'tipos_de_victima', e.target.value)}
                                                        label="Seleccionar PPL"
                                                        name="tipos_de_victima"
                                                    >

                                                        <MenuItem value={0}>Seleccionar tipo</MenuItem>
                                                        <MenuItem value={1}>PPL</MenuItem>
                                                        <MenuItem value={2}>Funcionario</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                    ))}
                                    <Grid item sm={12}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon/>}
                                            onClick={
                                                () => {
                                                    console.log('trigger button')
                                                    setStateForm((prev: any) => {
                                                        return {
                                                            ...prev,
                                                            victimas: [...prev.victimas, {
                                                                documento: '',
                                                                nombre: '',
                                                                apellido: '',
                                                            }]
                                                        }
                                                    })
                                                }
                                            }
                                        >
                                            Agregar Victima
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
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

