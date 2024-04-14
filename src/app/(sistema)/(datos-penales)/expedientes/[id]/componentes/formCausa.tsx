'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress, Divider,
    FormControl, FormControlLabel, FormLabel,
    Grid, IconButton, InputLabel, Paper, Radio, RadioGroup, Select,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {handleInputChange} from "@/components/utils/formUtils";
import {causaInitialData, CausaType, PPLsEnExpedienteDTO} from "@/components/utils/penalesType";
import {fetchData, fetchFormData, formatDate, postEntity} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import ModalPersona from "@/app/(sistema)/(datos-penales)/componentes/ModalPersona";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from '@mui/icons-material/Create';
import ValidacionesExpedientes
    from "@/app/(sistema)/(datos-penales)/expedientes/[id]/componentes/validacionesExpedientes";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import SubmitExpediente from "@/app/(sistema)/(datos-penales)/expedientes/[id]/componentes/submitExpediente";
import {router} from "next/client";
import {Add} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

type camposFormType = {
    id: number;
    nombre: string;
    codigo?: string;
}[];

type formDatosType = {
    hechos_punibles: camposFormType;
    causas: camposFormType;
    circunscripciones: camposFormType;
    ciudad: camposFormType;
}


type HechoPunible = {
    id: number;
    nombre: string;
    codigo: string;
    causas: Causa[];
};

type Causa = {
    id: number;
    codigo: string;
    nombre: string;
};

type HechoPunibleConCausa = {
    hechoPunibleId: number;
    causaId: number;
};

// TODO: Hacer completado de form cuando es update o /crear
export default function FormCausa({params}: { params: { id: number | string } }) {

    //@ts-ignore

    /** 1. Datos Captados del Formulario */
    const [datosFormulario, setDatosFormularios] = useState<CausaType>(causaInitialData);

    /** 2, Datos de los elementos del formulario */
    const [stateCamposForm, setStateCamposForm] = useState<formDatosType>({
        hechos_punibles: [], circunscripciones: [], ciudad: [], causas: []
    })

    /** 3. Lista de hechos punibles */
    const [hechosPunibles, setHechosPunibles] = useState<HechoPunible[]>([]); // Supongamos que esto viene de una API

    /** 4, Lista de hechos punibles seleccionados en el form */
    const [selecciones, setSelecciones] = useState<HechoPunibleConCausa[]>([]);

    /** 5. Estado para manejar estado del modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /** 6. persona para editar */
    const [editPersona, setEditPersona] = useState(null);

    const [consultaLoading, setConsultaLoading] = useState(false)

    const [loading, setLoading] = useState(true);

    const {openSnackbar} = useGlobalContext();
    const router: AppRouterInstance = useRouter();
    const isEditMode = params.id !== 'crear';
    const ENDPOINT_API = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API


    /** Obtener Hechos punibles y causas*/
    useEffect(() => {
        setLoading(true)
        // Hechos punibles

        Promise.all([
            fetchData(`${ENDPOINT_API}/datos_penales/hechos_punibles`).then((res) => {

                const causasArray: Array<{ id: number; nombre: string; codigo: string; causa_id: number; }> = [];
                // @ts-ignore
                res.hechosPunibles.forEach(hechoPunible => {
                    // @ts-ignore
                    hechoPunible.causas.forEach(causa => {
                        causasArray.push({
                            id: causa.id,
                            nombre: causa.nombre,
                            codigo: causa.codigo,
                            causa_id: hechoPunible.id
                        });
                    });
                });

                setHechosPunibles(prev => ([...res.hechosPunibles]))
            }),
            // Circunscripciones
            fetchData(`${ENDPOINT_API}/datos_penales/circunscripciones`).then((res) => {
                setStateCamposForm(prev => ({...prev, circunscripciones: [...res.circunscripciones]}))
            }),
            // Ciudades
            fetchData(`${ENDPOINT_API}/datos_penales/ciudades`).then((res) => {
                setStateCamposForm(prev => ({...prev, ciudad: [...res.ciudades]}))
            })
        ]).then(()=>{
            setLoading(false)
        }).catch((err)=>{
            console.log('Error obteniendo datos para formulario', err)
        }).finally(()=>{
            // console.log('Finally')
            setLoading(false)
        })



    }, []);


    /**
     * Get data de datos guardados previamentes de expediente
     * */
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes/${params.id}`) // Usa la función importada
                .then((data) => {
                    if (data) {
                        let ppl_ajustado = []
                        if (data.hechosPuniblesCausas.length > 0) {
                            setSelecciones(data.hechosPuniblesCausas.map((item: any) => ({
                                hechoPunibleId: item.hecho_punible?.id,
                                causaId: item.causa_judicial?.id
                            })))
                        }
                        // console.log(data.ppls_en_expediente[0].hechosPuniblesCausas.map((item: { hecho_punible: { id: any; }; causa_judicial: { id: any; }; })=>([item.hecho_punible.id, item.causa_judicial.id])))

                        if (data.ppls_en_expediente.length > 0) {
                            ppl_ajustado = data.ppls_en_expediente.map((item: any) => ({
                                id_persona: item.ppl?.persona?.id,
                                nombre: item.ppl?.persona?.nombre,
                                apellido: item.ppl?.persona?.apellido,
                                condenado: item.condenado,
                                hechosPuniblesCausas: item.hechosPuniblesCausas.length>0?   item.hechosPuniblesCausas.map((item: { hecho_punible: { id: any; }; causa_judicial: { id: any; }; })=>([item.hecho_punible.id, item.causa_judicial.id])) : [],
                                defensor: item.defensor?.id ? item.defensor?.id : 0,
                                sentencia_definitiva: item.sentencia_definitiva,
                                fecha_sentencia_definitiva: item?.fecha_sentencia_definitiva,
                                condena: {
                                    anhos: item.condena?.tiempo_de_condena?.anhos ? item.condena?.tiempo_de_condena?.anhos  : 0,
                                    meses: item?.condena?.tiempo_de_condena?.meses ? item.condena?.tiempo_de_condena?.meses : 0
                                },
                                fecha_de_aprehension: item.fecha_de_aprehension,
                                tiene_anhos_extra_por_medida_de_seguridad: item.condena?.tiene_anhos_extra_por_medida_de_seguridad ? item.condena?.tiene_anhos_extra_por_medida_de_seguridad : false,
                                anhos_extra_por_medida_de_seguridad: {
                                    meses: item.condena?.anhos_extra_por_medida_de_seguridad?.meses ? item.condena?.anhos_extra_por_medida_de_seguridad.meses: 0,
                                    anhos: item.condena?.anhos_extra_por_medida_de_seguridad?.anhos ? item.condena?.anhos_extra_por_medida_de_seguridad.anhos : 0
                                },
                                fecha_de_compurgamiento_inicial: item.condena?.fecha_de_compurgamiento_inicial ? item.condena?.fecha_de_compurgamiento_inicial : null,


                            }))
                        }
                        // console.log(data)
                        //console.log(ppl_ajustado)

                        setDatosFormularios({
                            ...data,
                            //hechos_punibles: data.hechos_punibles.map((item: { id: any; }) => (item.id)),
                            hechosPuniblesCausas: data.hechosPuniblesCausas.length > 0 ? data.hechosPuniblesCausas.map((item: any) => ({
                                hechoPunibleId: item.hecho_punible?.id,
                                causaId: item.causa_judicial?.id
                            })) : null,
                            despacho_judicial: data.despacho_judicial ? '' : null,
                            circunscripcion: data.circunscripcion ? data.circunscripcion.id : null,
                            ciudad: data.ciudad ? data.ciudad.id : null,
                            ppls_en_expediente: ppl_ajustado,
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {

        }
    }, [isEditMode]);

    const handleChange = (event: any) => {
        event.preventDefault();

        handleInputChange(event, datosFormulario, setDatosFormularios);
        /*if (event.target.name == 'numeroDeExpediente') {
            setDatosFormularios((prevState: any) => ({
                ...prevState,
                numeroDeDocumento: parseInt(event.target.value),
            }))
        }*/
    };

    const handleBooleanChange = (event: any) => {
        event.preventDefault();
        setDatosFormularios((prevState: any) => ({
            ...prevState,
            [event.target.name]: event.target.value == 'true',
        }))
    };

    const handleAgregar = () => {
        const nuevaSeleccion = {hechoPunibleId: 0, causaId: 0};
        setSelecciones([...selecciones, nuevaSeleccion]);
    };


    // Handler para cambiar el hecho punible
    const handleHechoPunibleChange = (index: number, nuevoHechoPunibleId: number) => {
        const nuevasSelecciones = selecciones.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    hechoPunibleId: nuevoHechoPunibleId,
                    causaId: hechosPunibles.find(hp => hp.id === nuevoHechoPunibleId)?.causas[0].id || 0,
                };
            }
            return seleccion;
        });
        setSelecciones(nuevasSelecciones);
    };

    const handleCausaChange = (index: number, nuevaCausaId: number) => {
        const nuevasSelecciones = selecciones.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    causaId: nuevaCausaId,
                };
            }
            return seleccion;
        });
        setSelecciones(nuevasSelecciones);
    };

    // Handler para eliminar una fila de selección
    const handleEliminar = (index: number) => {
        const nuevasSelecciones = selecciones.filter((_, idx) => idx !== index);
        setSelecciones(nuevasSelecciones);
    };


    const handleDespachoJudicial = (event: { target: { name: any; value: any; }; }) => {
        setDatosFormularios((prev: any) => ({
            ...prev,
            /*despacho_judicial: parseInt(event.target.value),*/
            juzgado_de_tribunal_de_sentencia: String(event.target.value),
        }))
    }

    // TODO: Fix any type

    /** Funcion para obtener personas del formulario de personas en el Expediente
     *
     * @param persona se recibe un objeto persona del array
     * @param editMode parametro para determinar si es que el PPL existe es nuevo o una edicion. Para evitar que se
     * cargue desde el form de agregar
     * */
    const handlerPersona = (persona: any, editMode: boolean) => {
        setIsModalOpen(false)
        const indexOfPerson = datosFormulario.ppls_en_expediente.findIndex((item: any) => item.id_persona == persona.id_persona)

        console.log('Index de persona encontrada en el estado', indexOfPerson)
        console.log(editMode)


        // SI PPL ES NUEVO y no existe en el array
        if (indexOfPerson < 0) {
            console.log('caso 1')
            setDatosFormularios((prev: any) => ({
                ...prev,
                ppls_en_expediente: [...prev.ppls_en_expediente, persona]
            }))
        }

        // si el PPL EXISTE en el array se modifica en el index existente
        if (indexOfPerson >= 0 && editMode) {
            console.log('caso 2')
            setDatosFormularios((prev: any) => {
                let newArray = prev.ppls_en_expediente
                // @ts-ignore
                newArray[indexOfPerson] = persona

                return ({
                    ...prev,
                    ppls_en_expediente: newArray
                })
            })
        }
        //
        if (indexOfPerson >= 0 && !editMode) {
            console.log('caso 3')
            openSnackbar(`La PPL ${persona.nombre} ${persona.apellido} ya se encuentra vinculada al expediente`, 'warning')
        }
    }

    
    /**
     * Manejador para borrar PPLs de lista de personas
     * si el ID del ppl que se recibe se encuentra dentro del array de objetos del estado se borra
     *
     * @param persona
     */
    const handleDeletePPL = (valor: number | null) => {
        console.log(valor)
        setDatosFormularios((prev: any) => ({
            ...prev,
            ppls_en_expediente: datosFormulario.ppls_en_expediente.filter((item:any, index:number) => index !== valor)
        }))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenModal = (func: () => void) => {
        func()
    }

    const handleEdit = (valor: number | null = null) => {

        const personaParaEditar = datosFormulario.ppls_en_expediente
            .find((item:any, index:number) => index == valor);


        // @ts-ignore
        setEditPersona(personaParaEditar);
        setIsModalOpen(true); // Esto abrirá el modal

    }

    const testClick = (e: any) => {
        e.preventDefault()
        console.log('test')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(validacionFormCausas()){
            postData()
        }

    }

    const validacionFormCausas = () =>{
        let esValidado = false

        for(const item of selecciones){


            if(item.causaId == 0 || item.hechoPunibleId == 0){
                openSnackbar('Seleccionar correcamente hechos punibles/causas', 'error')
                break;
            }else{
                esValidado = true;
            }
        }

        return esValidado
    }

    const isCausaSelected = (hechoPunibleId:number, causaId:number) => {
        return selecciones.some(seleccion =>
            seleccion.hechoPunibleId === hechoPunibleId && seleccion.causaId === causaId
        );
    };


    const postData = async () => {

        const form_method = isEditMode ? 'PUT' : 'POST'

        const endpoint_api = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`
        const stateForm: any = {
            ...datosFormulario,
            hechosPuniblesCausas: selecciones.map((item: any) => Object.values(item)),
        }




        if (stateForm.hechosPuniblesCausas.length <= 0 || stateForm.caratula_expediente == '' || stateForm.numeroDeExpediente == "") {
            openSnackbar('Completar campos requeridos', 'warning')
        } else {

            try {
                setConsultaLoading(true);


                const url = form_method == 'PUT'
                    ? `${endpoint_api}/${params.id}` // PUT
                    : `${endpoint_api}`; // POST

                // console.log(stateForm)
                console.log(form_method)
                console.log(url)

                const response = await fetch(url, {
                    method: form_method,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(stateForm),
                });



                if (response.ok) {
                    const message = form_method == 'PUT'
                        ? `expediente actualizada correctamente.`
                        : `expediente creada correctamente.`;

                    openSnackbar(message, 'success');

                    router.push(`/expedientes`);
                } else {
                    // Aquí manejas los códigos de estado específicos
                    console.log(response.status)
                    switch (response.status) {
                        case 500:
                            openSnackbar('Petición incorrecta, faltan campos.', 'warning');
                            break;
                        case 522:
                            openSnackbar('Ya existe un documento con este número de expediente.', 'warning');
                            break;
                        case 524:
                            openSnackbar('No se puede guardar dos causas iguales del mismo hecho punible.', 'warning');
                            break;

                        // Puedes añadir más códigos de estado según sea necesario
                        default:
                            openSnackbar('Error en el servidor, intenta más tarde.', 'error');
                    }
                    throw new Error(`Error en la petición: ${response.status}`);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            } finally {
                setConsultaLoading(false);
            }
        }


    }


    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <>

            <Box>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography variant='h6'>
                            Detalle de Expediente
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={4}>
                        <TextField
                            error={datosFormulario.numeroDeExpediente == ''}
                            helperText={datosFormulario.numeroDeExpediente == "" ? '* Campo requerido' : ''}
                            fullWidth
                            label="Nro. de expediente"
                            variant="outlined"
                            value={datosFormulario.numeroDeExpediente}
                            name="numeroDeExpediente"
                            onChange={handleChange}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={4}>
                        <FormControl>
                            <FormLabel id="situacion-procesal-field">Situacion procesal</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="situacion-procesal-field"
                                name="condenado"
                                onChange={handleBooleanChange}
                                value={datosFormulario.condenado}
                            >
                                <FormControlLabel value={false} control={<Radio/>} label="Procesado"/>
                                <FormControlLabel value={true} control={<Radio/>} label="Condenado"/>


                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {datosFormulario.condenado &&

                        <Grid item sm={4}>
                            <TextField
                                fullWidth
                                label="Nro. S.D. "
                                variant="outlined"
                                value={datosFormulario.sentencia_definitiva}
                                name="sentencia_definitiva"
                                onChange={handleChange}/>
                        </Grid>
                    }
                    {datosFormulario.condenado ?
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    name='fecha_sentencia_definitiva'
                                    onChange={(newValue: Dayjs | null) => {
                                        setDatosFormularios((prevState: any) => ({
                                            ...prevState,
                                            fecha_sentencia_definitiva: newValue,
                                        }))
                                    }}
                                    value={datosFormulario.fecha_sentencia_definitiva ? dayjs(datosFormulario.fecha_sentencia_definitiva) : null}
                                    label="Fecha documento"/>
                            </FormControl>
                        </Grid>
                        : null}


                </Grid>



                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            label="Caratula"
                            error={datosFormulario.caratula_expediente == ''}
                            helperText={datosFormulario.caratula_expediente == "" ? '* Campo requerido' : ''}
                            placeholder='Agregar una caratula...'
                            multiline
                            rows={2}
                            variant="outlined"
                            value={datosFormulario.caratula_expediente}
                            name="caratula_expediente"
                            onChange={handleChange}/>
                    </Grid>

                </Grid>

                {/* Hechos punibles */}
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Typography variant='h6'>Hechos Punibles</Typography>
                        <Typography variant='caption' color='error' ml={2}>
                            * Campo requerido
                        </Typography>
                    </Grid>

                </Grid>

                {selecciones.map((seleccion, index) => (
                    <Grid container spacing={2} mt={1} key={index}>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="hechosPunibles-field">Hechos punibles</InputLabel>
                                <Select
                                    label='Hechos punibles' value={seleccion.hechoPunibleId}
                                    onChange={(e) => handleHechoPunibleChange(index, parseInt(e.target.value as string))}
                                >
                                        <MenuItem disabled value={0}>Seleccionar hecho punible</MenuItem>
                                    fullWidth {hechosPunibles.map((hp) => (
                                        <MenuItem key={hp.id} value={hp.id}>{hp.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={5}>
                            <FormControl fullWidth>
                                <InputLabel id="causas-field">Causas</InputLabel>
                                <Select
                                    label='causas'
                                    value={seleccion.causaId ? seleccion.causaId : 0}
                                    onChange={(e) => handleCausaChange(index, parseInt(e.target.value as string))}
                                >
                                    <MenuItem value={0} disabled>
                                        Seleccionar causa
                                    </MenuItem>
                                    {hechosPunibles.find(hp => hp.id === seleccion.hechoPunibleId)?.causas.map((causa) => {
                                        const isDisabled = isCausaSelected(seleccion.hechoPunibleId, causa.id);



                                        // TODO: Calcular aca si ya existe en el estado de daos seleccionados

                                        return(
                                            <MenuItem key={causa.id} value={causa.id} disabled={isDisabled}>
                                                {causa.nombre}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1} alignItems='center'>
                            <button onClick={() => handleEliminar(index)}>X</button>
                        </Grid>
                    </Grid>
                ))}
                <Grid container spacing={2} mt={1}>
                    <Grid item>
                        <Button startIcon={<Add />} variant='text' onClick={handleAgregar}>Agregar Hecho Punible</Button>

                    </Grid>
                </Grid>


                <Grid container spacing={2} mt={1}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <Typography variant='h6'>Datos adicionales</Typography>
                        </Grid>

                    </Grid>

                </Grid>

                <Grid container spacing={2} mt={1}>

                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="circunscripcion-field">Circunscripciones</InputLabel>
                            <Select
                                labelId="circunscripcion-field"
                                id="circunscripcion"
                                name='circunscripcion'
                                value={datosFormulario.circunscripcion}
                                label="circunscripcion"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Seleccionar circunscripcion</MenuItem>
                                {stateCamposForm.circunscripciones.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                ))}


                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item sm={6}>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Juzgado de tribunal de sentencia</InputLabel>
                            <Select
                                label="Juzgado de tribunal de sentencia"
                                variant="outlined"
                                value={typeof datosFormulario.juzgado_de_tribunal_de_sentencia == 'number' ? String(datosFormulario.juzgado_de_tribunal_de_sentencia) : datosFormulario.juzgado_de_tribunal_de_sentencia}
                                name="juzgado_de_tribunal_de_sentencia"
                                onChange={handleDespachoJudicial}
                            >
                                <MenuItem value={''}>Seleccionar dato</MenuItem>
                                <MenuItem value={1}>Juzgado San Lorenzo</MenuItem>
                                <MenuItem value={0}>Asuncion</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Secretaria"
                            variant="outlined"
                            value={datosFormulario.secretaria}
                            name="secretaria"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={6}>

                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fecha_del_hecho'
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios((prevState: any) => ({
                                        ...prevState,
                                        fecha_del_hecho: newValue,
                                    }))
                                }}
                                value={datosFormulario.fecha_del_hecho ? dayjs(datosFormulario.fecha_del_hecho) : null}
                                label="Fecha del hecho"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="ciudad-field">Ciudad</InputLabel>
                            <Select
                                labelId="ciudad-field"
                                id="ciudad"
                                name='ciudad'
                                value={datosFormulario.ciudad}
                                label="Ciudad"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Seleccionar ciudad</MenuItem>
                                {stateCamposForm.ciudad.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                ))}


                            </Select>
                        </FormControl>
                        {/*<TextField
                            fullWidth
                            label="Ciudad"
                            variant="outlined"
                            value={datosFormulario.ciudad}
                            name="ciudad"
                            onChange={handleChange}/>*/}
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Barrio"
                            variant="outlined"
                            value={datosFormulario.lugar_del_hecho}
                            name="lugar_del_hecho"
                            onChange={handleChange}/>
                    </Grid>

                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Link de la noticia"
                            variant="outlined"
                            value={datosFormulario.link_de_noticia}
                            name="link_de_noticia"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={12}>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>


                    <Grid item sm={12} mt={1}>
                        <ModalPersona
                            onHandlerPersona={handlerPersona}
                            editPersona={editPersona}
                            onClose={handleCloseModal}
                            onOpen={isModalOpen}/>
                    </Grid>


                    <Grid item sm={12}>
                        <TableContainer>
                            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre y Apellido</TableCell>
                                        <TableCell>Situacion procesal</TableCell>
                                        <TableCell align="right">Fecha de detencion</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(datosFormulario.ppls_en_expediente?.length > 0 && datosFormulario.ppls_en_expediente[0] !== null) ?

                                        (datosFormulario.ppls_en_expediente.map((item: any, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >

                                                <TableCell align="left">{item.nombre + ' ' + item.apellido}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.condenado ? 'Condenado' : 'Procesado'}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatDate(item.fecha_de_aprehension)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Stack spacing={2} direction='row' justifyContent='right'>
                                                        <IconButton aria-label="edit" size="small"
                                                                    onClick={(persona) => handleEdit(index)}>
                                                            <CreateIcon fontSize="inherit"/>
                                                        </IconButton>
                                                        <IconButton aria-label="delete" size="small"
                                                                    onClick={(persona) => handleDeletePPL(index)}>
                                                            <DeleteIcon fontSize="inherit"/>
                                                        </IconButton>

                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        )))
                                        : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/*<ul>
                            {(datosFormulario.ppls_en_expediente.length > 0 && datosFormulario.ppls[0] !== null) ?

                                (datosFormulario.ppls_en_expediente.map((item: any) => (
                                    <li key={item.id_persona}>
                                        {item.nombre} {item.apellido} ({item.apodo})
                                        <IconButton aria-label="delete" size="small"
                                                    onClick={(persona) => handleDeletePPL(item.id_persona)}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                    </li>
                                )))
                                : null}
                        </ul>
                        <div>
                            {privados_libertad.map((persona, index) => (
                                <div key={index}>
                                     Renderiza la información de la persona aquí
                                    {persona.nombre}
                                </div>
                            ))}
                        </div>*/}
                    </Grid>

                </Grid>

                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Stack direction='row' spacing={2}>
                            <LoadingButton
                                sx={{
                                    minHeight: "100%",
                                    px: "48px",
                                    height: '48px'
                                }}
                                onClick={handleSubmit}
                                loading={consultaLoading}
                                loadingPosition='start'
                                startIcon={<SaveIcon />}
                                variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                            </LoadingButton>
                            <Button variant='outlined' onClick={()=>router.push('/expedientes')} sx={{
                                minHeight: "100%",
                                px: "48px",
                                height: '48px'
                            }}>
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>


            </Box>
        </>


    );
}

