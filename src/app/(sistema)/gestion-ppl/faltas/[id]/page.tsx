'use client'

import {
    Autocomplete,
    Box,
    Button,
    CardContent,
    CircularProgress,
    FormControl, FormHelperText,
    Grid, IconButton,
    InputLabel,
    MenuItem, Modal,
    Paper,
    Select, Stack,
    TextField,
    Typography,
} from '@mui/material';
import {
    pplTraslado
} from "@/components/utils/movimientosType"
import React, {useEffect, useState} from 'react';
import {fetchData} from "@/components/utils/utils";

import CustomTable from "@/components/CustomTable";
import {Add, FileUploadOutlined} from "@mui/icons-material";
import {SelectChangeEvent} from '@mui/material/Select';
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from 'next/navigation';
import {DatePicker, LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {signIn, useSession} from "next-auth/react";
import {faltasForm} from "@/app/(sistema)/gestion-ppl/faltas/[id]/componentes/faltasTypes";
import {MuiFileInput} from "mui-file-input";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import {downloadFile} from "@/components/utils/formUtils";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import es from 'dayjs/locale/es';
import DeleteIcon from "@mui/icons-material/Delete";
import {onConsultarRegistroCivil} from "@/components/utils/utils_client";

dayjs.locale(es); // Configura dayjs globalmente al español



const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';

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
    tipo_de_falta: 0,
    grado_de_falta: 0,
    victima_falta: {id: 0, nombre: '', apellido: '', documento: ''},
    tipo_victima: 0,
    victimas: [],
    tipos_de_sanciones_lista: [],
    sanciones: [],
};


interface SancionesModalType {
    id: number;
    falta: number;
    resolucion_sancion: File | null;
    tipoDeSancion: number;
    fechaInicio: Dayjs | null;
    fechaFin: Dayjs | null;

}

const sancionesModalInitial: SancionesModalType =
    {
        id: 0,
        falta: 0,
        resolucion_sancion: null,
        tipoDeSancion: 0,
        fechaInicio: dayjs(),
        fechaFin: dayjs(),
    }


const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;


// TODO: Cuando se envia el submit se debe bloquear el boton de guardado
// TODO: Luego de enviar la peticion se debe mostrar una alerta de que se guardo correctamente
// TODO: hacer un spinner que bloquee toda la pantalla cuando carga o guarda los datos
// TODO: Origen de destino debe ser dinamico

export default function Page({params,}: { params: { id: number | string } }) {

    // 1. Estado del form principal de Faltas
    const [stateForm, setStateForm] = useState<faltasForm>(intialFaltasForm);

    // 2. Estado del Modal de sanciones
    const [modalForm, setModalForm] = useState<SancionesModalType>(sancionesModalInitial)

    // 3. Estado auxiliar de las persona seleccionada del form de faltas.
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{
        id_persona: number;
        nombre: string;
        apellido: string;
        numero_de_identificacion?: string | number;
    } | null>(null)

    // 4. Estado auxiliar para lista de PPLS
    const [statePPL, setStatePPL] = useState<pplTraslado[]>([]);

    // 5. Estado para manejar el Loading de la vista
    const [loading, setLoading] = useState(false);

    // Variables del form
    const isEditMode: boolean = params?.id !== 'crear';

    // Hooks del form
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();

    // Hook para obtener datos de sesion del AuthNext
    const {data: session, status} = useSession();


    useEffect(() => {
        Promise.all([
            /** Se obtienen datos para poblar select de PPLS **/
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
                // @ts-ignore
                setStatePPL(res);
            }),
            /** Se obtienen datos para poblar select de Tipo de Faltas **/
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/faltas_sanciones/tipos_de_sanciones`).then(res => {
                // @ts-ignore
                setStateForm((prev: any) => ({
                    ...prev,
                    tipos_de_sanciones_lista: res.tipos_de_sanciones,
                }));
            })

        ]).finally(() => {
            console.info('Finished loading data.')
        })

        if (isEditMode) {

            /** Se obtienen datos para poblar formulario con datos existentes **/
            fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/faltas_sanciones/faltas/${params.id}`).then(res => {
                return res.json()
            }).then(data => {

                let data_processed = {
                    id: data.id ? data.id : 0,
                    ppl: {
                        id: data.ppl.persona.id,
                        nombre: data.ppl.persona.nombre,
                        apellido: data.ppl.persona.apellido,
                        documento: data.ppl.persona.numero_identificacion
                    },
                    fecha_falta: dayjs(data.fecha_y_hora_de_la_falta),
                    hora_falta: dayjs(data.fecha_y_hora_de_la_falta),
                    numero_de_resoulucion: data.numero_de_resolucion,
                    fecha_resolucion: dayjs(data.fecha_de_la_resolucion),
                    descripcion_de_la_falta: data.descripcion_de_la_falta,
                    resolucion_falta: data.archivo_de_resolucion,
                    tipo_de_falta: 0,
                    grado_de_falta: data.grado_de_falta ? data.grado_de_falta.id : 0,
                    victimas: data.victimas_de_la_falta ? data.victimas_de_la_falta.map((jsonString: string) => {
                        const obj = JSON.parse(jsonString);
                        return {
                            documento: obj.ci,
                            nombre: obj.nombre,
                            apellido: obj.apellido
                        };
                    }) : {id: 0, nombre: '', apellido: '', documento: ''},
                    tipo_victima: 0,
                    sanciones: data.sanciones_aplicadas.map((item:any)=>({
                        id: item.id,
                        fecha_inicio: item.fecha_inicio,
                        fecha_fin: item.fecha_fin,
                        resolucion: item. resolucion && (
                            <Link href={`${ASSETS_URL}${data.resolucion}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                        ),
                    })),

                };

                // Carga PPL existente en estado auxiliar
                if (data.ppl.persona) {
                    setPersonasSeleccionadas({
                        ...data.ppl.persona,
                        id_persona: data.ppl.persona.id,
                    });
                }


                if (data.archivo_de_resolucion) {

                    const descargarArchivos = async (archivoURL: string) => {
                        const fileBlob = await downloadFile(archivoURL);
                        const file = new File([fileBlob], `${archivoURL.split('/').pop()}`, {type: fileBlob.type});


                        setStateForm((prev: any) => ({
                            ...prev,
                            resolucion_falta: file,
                            resolucion_falta_url: archivoURL,
                        }))
                        /** seteador de estado para guardaar la url de un archivo preguardado y mostrar*/
                        /*
                            setDatosFormulario((prev: any) => ({
                                ...prev,
                                oficioJudicial_documento: archivoURL,
                            }))
                        */

                    }

                    descargarArchivos(`${ASSETS_URL}${data.archivo_de_resolucion}`)

                }

                //@ts-ignore
                setStateForm((prev) => ({
                    ...prev,
                    ...data_processed
                }))
            })
        }

    }, []);

    // ************ Agrgar PPLS A TRASLADOS Logica MODAL *********
    const [open, setOpen] = React.useState(false);


    // Manejador para abrir el Modal
    const handleOpen = () => {
        // Reseteamos los valores del formulario del modal antes de abrirlo
        // setStateRegistroMedicoModal(registroInitial)

        setOpen(true);
    };

    // Manejador para cerrar el Modal
    const handleClose = () => {
        setOpen(false);
    };

    // Manejadores de elementos del form
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

    /**
     *  Handler para actualizar la propiedad de victimas cargadas
     *
     *  @param index number posicion donde se va actualizar el campo
     *  @param field string Campo que se va actualizar dentro del objeto de la sancion
     *  @param value any Valor para cargar en el campo del objeto
     *
     * */
    const handleVictimaChange = (index: number, field: string, value: any) => {
        setStateForm((prevData) => ({
                ...prevData,
                victimas: prevData.victimas?.map((item: any, i: number) =>
                    i === index ? {...item, [field]: value} : item
                )
            })
        );
    }

    /**
     *  Handler para actualizar la propiedad de victimas cargadas
     *
     *  @param index number posicion donde se va actualizar el campo
     *  @param field string Campo que se va actualizar dentro del objeto de la sancion
     *  @param value any Valor para cargar en el campo del objeto
     * */
    const handleSancionesChange = (index: number, field: string, value: any) => {
        setStateForm((prevData) => ({
                ...prevData,
                sanciones: prevData.sanciones?.map((item: any, i: number) =>
                    i === index ? {...item, [field]: value} : item
                )
            })
        );
    }

    const handleDocumentoVictima = async (index: number, field: string, value: any) => {
        const datosCedula = await onConsultarRegistroCivil(value)

        if(datosCedula){

            setStateForm((prevData) => ({
                    ...prevData,
                    victimas: prevData.victimas?.map((item: any, i: number) =>
                        i === index ? {
                            ...item,
                            nombre: datosCedula.nombres,
                            apellido: datosCedula.apellidos,
                        } : item
                    )
                })
            );
        }else{
            openSnackbar('Cedula no fue encontrada', 'warning')
        }
    }

    const modalSancionesValidator = () =>{
        let isValid: boolean = false;

        if(
            modalForm.tipoDeSancion
            && modalForm.fechaFin
            && modalForm.fechaInicio
            && modalForm.resolucion_sancion
        ){
            isValid = true;
        }else{
            isValid = false;
        }
        return isValid;
    }

    // Manejador de envio de Modal de Sanciones
    const handleSubmitModalSanciones = async (e:any) => {
        e.preventDefault();

        if(modalSancionesValidator()){
            // Se inicializa form data
            const formData = new FormData();
            console.log(stateForm)
            // Se arma datos para enviar luego la peticion
            if(stateForm.id) formData.append('falta', stateForm.id.toString() );
            formData.append('tipoDeSancion', modalForm.tipoDeSancion.toString());
            formData.append('fechaInicio', modalForm.fechaInicio ? dayjs(modalForm.fechaInicio).format('YYYY-MM-DD') : '');
            formData.append('fechaFin', modalForm.fechaFin ? dayjs(modalForm.fechaFin).format('YYYY-MM-DD') : '');
            if (modalForm.resolucion_sancion) formData.append('resolucion_sancion', modalForm.resolucion_sancion);

            // Envio de datos
            try {
                const response = await fetch(`${API_URL}/faltas_sanciones/sanciones`, {
                    method: modalForm.id !== 0 ? 'PUT' : 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error al enviar los datos de sancion');
                }else{
                    fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/faltas_sanciones/faltas/${stateForm.id}`).then(res => {
                        return res.json()
                    }).then(data=>{
                        console.log(data)
                        setStateForm((prev:any)=>({
                            ...prev,
                            sanciones: data.sanciones_aplicadas.map((item:any)=>({
                                id: item.id,
                                fecha_inicio: item.fecha_inicio,
                                fecha_fin: item.fecha_fin,
                                resolucion: item. resolucion && (
                                    <Link href={`${ASSETS_URL}${data.resolucion}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                                ),
                            })),
                        }))
                    })
                }

                openSnackbar('Sancion guardada correctamente.', 'success')
                handleClose() // Se cierra el modal

            } catch (err) {
                console.log(err)
            }
        }else{
            openSnackbar('Debe completar los campos obligatorios', 'error')
        }

    }

    const victimasValidator = ()=>{
        if(stateForm.victimas){

            const areAllValuesValid = stateForm.victimas.every(obj =>
                Object.values(obj).every(value =>
                    value !== null && value !== '' && value !== 0 && (!Array.isArray(value) || value.length !== 0)
                )
            );

            // console.log('Victimas', areAllValuesValid);
            return areAllValuesValid
        }
    }

    const handleDeleteVictima = (index:number)=>{

        if(stateForm.victimas){
            if ((index < 0 || index >= stateForm.victimas.length)) throw new Error('Invalid position');

            setStateForm((prev:any)=>({
                ...prev,
                victimas: stateForm.victimas && stateForm.victimas.slice(0, index).concat(stateForm.victimas.slice(index + 1)),
            }))

        }
        console.log(index)
    }

    const formValidator = (data?:any) =>{
        let isValid = false;

        if(
            personasSeleccionadas
            && stateForm.fecha_falta
            && stateForm.hora_falta
            && stateForm.numero_de_resoulucion
            && stateForm.fecha_resolucion
            && stateForm.resolucion_falta
            && stateForm.descripcion_de_la_falta
            && stateForm.grado_de_falta
            && (stateForm.victimas && stateForm.victimas.length > 0)
            && victimasValidator()
        ){

            isValid = true;
        }else{

            isValid = false;
        }

        return isValid;
    }

    // Manejador de envio
    // TODO: Hacer el update
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(formValidator()){
            const form_method = isEditMode ? 'PUT' : 'POST'


            // Se concatena ambos datos de fecha y hora en una sola variable
            var fechaFalta = stateForm.fecha_falta;
            var horaFalta = stateForm.hora_falta;
            if (fechaFalta && horaFalta) {
                fechaFalta.hour(horaFalta.hour()).minute(horaFalta.minute()).second(horaFalta.second())
            }

            const formData = new FormData(); // Se inicializa form data

            // Se arman la informacion para enviar peticion
            formData.append('ppl', personasSeleccionadas ? personasSeleccionadas.id_persona.toString() : '');
            formData.append('numero_de_resolucion', stateForm.numero_de_resoulucion);
            formData.append('fecha_de_resolucion', stateForm.fecha_resolucion ? stateForm.fecha_resolucion.toISOString() : '');
            if (stateForm.resolucion_falta) formData.append('resolucion_falta', stateForm.resolucion_falta);
            formData.append('descripcion_de_la_falta', stateForm.descripcion_de_la_falta);
            formData.append('tipo_de_falta', stateForm.tipo_de_falta ? stateForm.tipo_de_falta.toString() : '0');
            formData.append('grado_de_falta', stateForm.grado_de_falta.toString());
            formData.append('fecha_y_hora_de_la_falta', fechaFalta ? fechaFalta.toISOString() : '');
            if (stateForm.victimas && stateForm.victimas.length > 0) {
                stateForm.victimas.forEach((item: any, i: number) => {
                    formData.append(`victimas_de_la_falta[${i}][ci]`, stateForm.victimas ? stateForm.victimas[i].documento : '');
                    formData.append(`victimas_de_la_falta[${i}][nombre]`, stateForm.victimas ? stateForm.victimas[i].nombre : '');
                    formData.append(`victimas_de_la_falta[${i}][apellido]`, stateForm.victimas ? stateForm.victimas[i].apellido : '');
                    // formData.append(`tipos_de_victimas[${i}]`, stateForm.victimas ? stateForm.victimas[i].tipos_de_victima.toString() : '');
                })
            }


            // Envio de datos
            try {
                const paramURL = stateForm.id !== 0 ? ('/' + params.id) : ''

                fetch(`${API_URL}/faltas_sanciones/faltas${paramURL}`, {
                    method: stateForm.id !== 0 ? 'PUT' : 'POST',
                    body: formData,
                }).then(res => res.json()).then(data => {
                    setStateForm((prev:any)=>({
                        ...prev,
                        // @ts-ignore
                        id: data.id
                    }))
                    openSnackbar('Falta guardada correctamente.', 'success')
                }).catch(error => console.log(error, 'Error al enviar los datos de la falta'));



            } catch (err) {
                console.log(err)
            }
        }else{
            openSnackbar('Debe completar campos requeridos', 'error')
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
                    {nombre: 'Lista de faltas y sanciones', url: '/gestion-ppl/faltas/', lastItem: false},
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
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
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
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
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
                                        <FormHelperText>* Campo requerido</FormHelperText>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            error={!stateForm.numero_de_resoulucion}
                                            label='Nro. de resolucion'
                                            name='numero_de_resoulucion'
                                            value={stateForm.numero_de_resoulucion}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>* Campo requerido</FormHelperText>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
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
                                            </LocalizationProvider>
                                            <FormHelperText>* Campo requerido</FormHelperText>
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
                                        {isEditMode && stateForm.resolucion_falta_url ?
                                            <Link href={`${stateForm.resolucion_falta_url}`} target="_blank"
                                                  rel="noopener noreferrer">Ver documento adjunto</Link>
                                            : ''}
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
                                            error={!stateForm.descripcion_de_la_falta}
                                            value={stateForm.descripcion_de_la_falta}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Tipo de falta</InputLabel>
                                            <Select
                                                error={!stateForm.tipo_de_falta}
                                                value={stateForm.tipo_de_falta}
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
                                                error={!stateForm.grado_de_falta}
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
                                                    error={(stateForm.victimas && !stateForm.victimas[index].documento)}
                                                    value={stateForm.victimas ? stateForm.victimas[index].documento : ''}
                                                    onBlur={(e)=>handleDocumentoVictima(index, 'documento', e.target.value)}
                                                    onChange={(e)=>handleVictimaChange(index, 'documento', e.target.value)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label='Nombre'
                                                    name='nombre'
                                                    error={(stateForm.victimas && !stateForm.victimas[index].nombre)}
                                                    value={stateForm.victimas ? stateForm.victimas[index].nombre : ''}
                                                    onChange={(e) => handleVictimaChange(index, 'nombre', e.target.value)}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label='Victima de Apellido falta'
                                                    name='apellido'
                                                    error={(stateForm.victimas && !stateForm.victimas[index].apellido)}
                                                    value={stateForm.victimas ? stateForm.victimas[index].apellido : ''}
                                                    onChange={(e) => handleVictimaChange(index, 'apellido', e.target.value)}
                                                />
                                                <IconButton aria-label="delete" onClick={(e)=>handleDeleteVictima(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                {/*<FormControl fullWidth variant="outlined">
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
                                                </FormControl>*/}
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

                                {stateForm.id !==0 &&
                                <Grid container spacing={2} mt={2}>
                                    <Grid item sm={12}>
                                        <Typography variant='subtitle1' fontWeight='bold' mb={0}>Sanciones</Typography>

                                    </Grid>
                                    <Grid item sm={12}>

                                        {(stateForm.sanciones && stateForm.sanciones.length > 0) &&
                                        <CustomTable
                                            showId={true}
                                            //@ts-ignore
                                            data={stateForm.sanciones}
                                            headers={[
                                                { id: 'id', label: 'ID' },
                                                { id: 'fecha_inicio', label: 'Fecha inicio' },
                                                { id: 'fecha_fin', label: 'Fecha fin' },
                                                { id: 'resolucion', label: 'Resolucion' },
                                            ]}
                                        />
                                        }
                                    </Grid>

                                    <Grid item sm={12}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon/>}
                                            onClick={handleOpen}
                                        >
                                            Agregar Sanción
                                        </Button>
                                    </Grid>
                                </Grid>
                                }
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
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={styleModal}
                >
                    <Typography variant="h6" marginBottom={2}>Agregar Sancion</Typography>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Stack spacing={1} direction='column' gap={2} justifyContent='space-around'>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Tipo de sancion</InputLabel>
                                    <Select
                                        label="Seleccionar PPL"
                                        name="tipoDeSancion"
                                        error={modalForm.tipoDeSancion == 0}
                                        value={modalForm ? modalForm.tipoDeSancion : 0}
                                        onChange={(e) => setModalForm((prev :any)=>({
                                            ...prev,
                                            tipoDeSancion: e.target.value,
                                        }))}
                                    >

                                        <MenuItem value={0}>Seleccionar tipo</MenuItem>
                                        {stateForm.tipos_de_sanciones_lista && stateForm.tipos_de_sanciones_lista.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                                        ))}

                                    </Select>
                                    <FormHelperText>* Campo requerido</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                    <DatePicker
                                        label="Fecha de inicio"
                                        format="DD/MM/YYYY"
                                        name='fechaInicio'
                                        value={modalForm ? modalForm.fechaInicio : null}
                                        onChange={(newValue: Dayjs | null) => {
                                            setModalForm(prevState => ({
                                                ...prevState,
                                                fechaInicio: newValue,
                                            }))
                                        }}

                                    />
                                    </LocalizationProvider>
                                    <FormHelperText>* Campo requerido</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                    <DatePicker
                                        label="Fecha de fin"
                                        format="DD/MM/YYYY"
                                        name='fechaFin'
                                        value={modalForm ? modalForm.fechaFin : null}
                                        onChange={(newValue: Dayjs | null) => {
                                            setModalForm(prevState => ({
                                                    ...prevState,
                                                    fechaFin: newValue,
                                            }))
                                        }}
                                    />
                                    </LocalizationProvider>
                                    <FormHelperText>* Campo requerido</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth>
                                    <MuiFileInput
                                        fullWidth
                                        required
                                        //@ts-ignore
                                        error={!modalForm.resolucion_sancion}
                                        value={modalForm ? modalForm.resolucion_sancion : null}
                                        variant="outlined"
                                        label="Seleccionar documento"
                                        name='resolucion_sancion'
                                        getInputText={(value) => value ? value.name : ''}
                                        onChange={(newValue) => {
                                            setModalForm(prevState => ({
                                                ...prevState,
                                                resolucion_sancion: newValue,
                                            }))
                                        }}

                                    />
                                    {/*{ isEditMode && stateForm.resolucion_falta_url ?
                                                        <Link href={`${stateForm.resolucion_falta_url}`} target="_blank" rel="noopener noreferrer">Ver documento adjunto</Link>
                                                        : ''}*/}
                                    <FormHelperText>* Campo requerido</FormHelperText>
                                </FormControl>

                            </Stack>
                        </Grid>


                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSubmitModalSanciones}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </Box>
    );
};

