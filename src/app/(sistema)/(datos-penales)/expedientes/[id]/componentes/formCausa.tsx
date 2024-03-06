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
    Grid, IconButton, InputLabel, Radio, RadioGroup, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {handleInputChange} from "@/components/utils/formUtils";
import {causaInitialData, causaInitialDataPoblado, CausaType} from "@/components/utils/penalesType";
import {fetchData, fetchFormData, postEntity} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import ModalPersona from "@/app/(sistema)/(datos-penales)/componentes/ModalPersona";
import DeleteIcon from "@mui/icons-material/Delete";
import {forEachEntryModule} from "next/dist/build/webpack/utils";

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

const hechosPuniblesIntitial: camposFormType = [
    {id: 1, nombre: 'asesinato'}
]

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
    const [datosFormulario, setDatosFormularios] = useState<CausaType>(causaInitialData);
    const [stateCamposForm, setStateCamposForm] = useState<formDatosType>({
        hechos_punibles: [],
        circunscripciones: [],
        ciudad: [],
        causas: []
    })
    const [privados_libertad, set_privados_libertad] = useState<Array<any>>([])
    const [hechosPunibles, setHechosPunibles] = useState<HechoPunible[]>([]); // Supongamos que esto viene de una API
    const [selecciones, setSelecciones] = useState<HechoPunibleConCausa[]>([]);

    const [loading, setLoading] = useState(true);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;
    const ENDPOINT_API = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API

    /** Obtener Hechos punibles y causas*/
    useEffect(() => {
        // Hechos punibles
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

            // console.log(causasArray)


            setHechosPunibles(prev => ([...res.hechosPunibles]))
        })

        // Circunscripciones
        fetchData(`${ENDPOINT_API}/datos_penales/circunscripciones`).then((res) => {
            setStateCamposForm(prev => ({...prev, circunscripciones: [...res.circunscripciones]}))
        })

        // Ciudades
        fetchData(`${ENDPOINT_API}/datos_penales/circunscripciones`).then((res) => {
            setStateCamposForm(prev => ({...prev, ciudad: [...res.circunscripciones]}))
        })

    }, []);

    /** Se obtiene los modelos completos de PPL con el ID guardado en el array de ppl de la causa*/
    useEffect(() => {

        /*if (datosFormulario.ppls.length > 0) {

            const obtenerPersonaPorId = async (id: { id_persona: number | null; nombre: string; apellido: string } | number) => {
                const response = await fetch(`${ENDPOINT_API}/gestion_ppl/ppls/id/${id}`);
                if (!response.ok) throw new Error('Error al obtener la persona');
                return response.json();
            };
            if (datosFormulario.ppls.length > 0 && datosFormulario.ppls.every(id => typeof id === 'number')) {

                const promesas = datosFormulario.ppls.map((id) => obtenerPersonaPorId(id)
                );


                Promise.all(promesas)
                    .then(personas => {
                        setDatosFormularios(prev => ({
                            ...prev,
                            ppls: [...personas]
                        }));

                    })
                    .catch(error => {
                        console.error('Error al obtener las personas:', error);
                    });
            }


        }*/

    }, [datosFormulario.ppls]);

    const handleChange = (event: any) => {
        event.preventDefault();

        handleInputChange(event, datosFormulario, setDatosFormularios);
        if (event.target.name == 'numeroDeDocumento') {
            setDatosFormularios(prevState => ({
                ...prevState,
                numeroDeExpediente: parseInt(event.target.value),
            }))
        }
    };

    const handleBooleanChange = (event: any) => {
        event.preventDefault();
        setDatosFormularios(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value == 'true',
        }))
    };

    const handleAgregar = () => {
        const nuevaSeleccion = {hechoPunibleId: hechosPunibles[0].id, causaId: hechosPunibles[0].causas[0].id};
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


    const handleDefensor = (event: { target: { name: any; value: any; }; }) => {
        console.log(event.target.name)
        setDatosFormularios(prev => ({
            ...prev,
            defensor: {
                ...prev.defensor,
                [event.target.name]: event.target.value,
            }
        }))
    }

    const handleDespachoJudicial = (event: { target: { name: any; value: any; }; }) => {
        setDatosFormularios(prev => ({
            ...prev,
            despacho_judicial: parseInt(event.target.value),
            juzgado_de_tribunal_de_sentencia: String(event.target.value),
        }))
    }

    const handlerPersona = (persona: { id_persona: number | null; nombre: string; apellido: string; }) => {
        if(datosFormulario.ppls[0] == null){
            setDatosFormularios(prev => ({
                ...prev,
                ppls: [persona]
            }))
        }else{
            if ((!datosFormulario.ppls.some(item => item.id_persona == persona.id_persona) && datosFormulario.ppls[0] !== null)) {
                setDatosFormularios(prev => ({
                    ...prev,
                    ppls: [...prev.ppls, persona]
                }))
            }
        }

    }

    /** Manejador para borrar PPLs de lista de personas
     *si el ID del ppl que se recibe se encuentra dentro del array de objetos del estado se borra
     *
     * @param persona
     */
    const handleDeletePPL = (persona: number | null) => {

        setDatosFormularios(prev => ({
            ...prev,
            ppls: datosFormulario.ppls.filter(item => item.id_persona !== persona)
        }))
    }


    const handleSubmit = () => {

        const post_mehtod = isEditMode == 'crear' ? 'POST' : 'PUT'
        const endpoint_api = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`
        const stateForm = {
            ...datosFormulario,
            hechosPuniblesCausas: selecciones.map(item => Object.values(item)),
            defensor: 1,
            ppls: datosFormulario.ppls.map(item => item.id_persona),
            despacho_judicial: null,
        }

        // console.log(selecciones.map(item => Object.values(item)))
        console.log(isEditMode)
        // console.log(datosFormulario.defensor)
        postEntity(
            post_mehtod,
            endpoint_api,
            'expedientes',
            params,
            stateForm,
            setLoading,
            openSnackbar,
            router
        );
    }


    useEffect(() => {
        if (isEditMode !== 'crear') {
            setLoading(true);
            fetchFormData(params.id, '/datos_penales/expedientes') // Usa la función importada
                .then((data) => {
                    if (data) {
                        if(data.hechosPuniblesCausas.length > 0 ){
                            setSelecciones(data.hechosPuniblesCausas.map((item: any) => ({hechoPunibleId: item.hecho_punible?.id, causaId: item.causa_judicial?.id})))
                        }
                        setDatosFormularios({
                            ...data,
                            //hechos_punibles: data.hechos_punibles.map((item: { id: any; }) => (item.id)),
                            hechosPuniblesCausas: data.hechosPuniblesCausas.length > 0 ? data.hechosPuniblesCausas.map((item: any) => ({hechoPunibleId: item.hecho_punible?.id, causaId: item.causa_judicial?.id})) : null,
                            despacho_judicial: data.despacho_judicial ? data.despacho_judicial.id : null,
                            circunscripcion: data.circunscripcion ? data.circunscripcion.id : null,
                            ciudad: data.ciudad ? data.ciudad.id : null,
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {

        }
    }, [isEditMode, params.id]);

    if (datosFormulario.id == 0 && isEditMode !== 'crear') {
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
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Nro. de expediente"
                            variant="outlined"
                            value={datosFormulario.numeroDeExpediente}
                            name="numeroDeDocumento"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaDeExpediente'
                                value={datosFormulario.fechaDeExpediente ? dayjs(datosFormulario.fechaDeExpediente) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fechaDeExpediente: newValue,
                                    }))
                                }}
                                label="Fecha de aprension y detención"/>

                        </FormControl>
                        {/*<TextField
                            fullWidth
                            label="Fecha expediente"
                            variant="outlined"
                            value={dayjs(datosFormulario.fechaDeExpediente)}
                            name="fechaDeExpediente"
                            onChange={handleChange}/>*/}
                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>
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
                </Grid>

                {/* Hechos punibles */}

                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            label="Caratula"
                            multiline
                            rows={2}
                            variant="outlined"
                            value={datosFormulario.caratula_expediente}
                            name="caratula_expediente"
                            onChange={handleChange}/>
                    </Grid>
                    {/*<Grid item sm={6}>

                        {stateCamposForm.hechos_punibles.length > 0 ?
                            <Autocomplete
                                multiple
                                id="hechos-punibles"

                                options={stateCamposForm.hechos_punibles ? stateCamposForm.hechos_punibles : []} // Usa las opciones por defecto
                                value={datosFormulario.hechos_punibles}
                                onChange={(event, newValue) => {
                                    setDatosFormularios(prev => ({...prev, hechos_punibles: newValue,}));
                                }}

                                getOptionLabel={(option) => option.nombre}
                                renderTags={(value, getTagProps) =>
                                    //@ts-ignore
                                    value.map((option: { id: number, nombre: string }, index) => (
                                        <Chip
                                            //@ts-ignore
                                            key={option.id}
                                            label={option.nombre}
                                            {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Hecho punible"
                                        placeholder="Seleccione hechos punibles"
                                        sx={{margin: '0 !important', width: '100% !important'}}
                                    />
                                )}
                            />
                            : null}
                    </Grid>*/}
                </Grid>

                {selecciones.map((seleccion, index) => (
                    <Grid container spacing={2} mt={1} key={index}>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="hechosPunibles-field">Hechos punibles</InputLabel>
                                <Select
                                    label='Hechos punibles'
                                    value={seleccion.hechoPunibleId}
                                    onChange={(e) => handleHechoPunibleChange(index, parseInt(e.target.value as string))}
                                >
                                    {hechosPunibles.map((hp) => (
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
                                    value={seleccion.causaId}
                                    onChange={(e) => handleCausaChange(index, parseInt(e.target.value as string))}
                                >
                                    {hechosPunibles.find(hp => hp.id === seleccion.hechoPunibleId)?.causas.map((causa) => (
                                        <MenuItem key={causa.id} value={causa.id}>{causa.nombre}</MenuItem>
                                    ))}
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
                        <Button variant='contained' onClick={handleAgregar}>Agregar Hecho Punible</Button>
                    </Grid>
                </Grid>
                {datosFormulario.condenado ?
                    <Grid container spacing={2} mt={1}>

                        <Grid item sm={3}>
                            <TextField
                                fullWidth
                                label="Nro. S.D. "
                                variant="outlined"
                                value={datosFormulario.sentencia_definitiva}
                                name="sentencia_definitiva"
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item sm={2}>
                            <TextField
                                fullWidth
                                label="Meses"
                                variant="outlined"
                                value={datosFormulario.sentencia_tiempo}
                                name="sentencia_definitiva"
                                onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    : null}
                {/*<Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="hechosPunibles-field">Hechos punibles</InputLabel>
                            <Select
                                labelId="hechosPunibles-field"
                                id="hechosPunibles-1"
                                name='hechosPunibles-1'
                                value={stateHechosPunibles[1].hecho_punible|| ""}
                                label="Hechos punibles"
                                onChange={(event)=>handleHechoPunible(event)}
                            >
                                <MenuItem value={0}>Seleccionar hecho punible</MenuItem>
                                {stateCamposForm.hechos_punibles.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                ))}


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="expedientes-field">Causas</InputLabel>
                            <Select
                                labelId="expedientes-field"
                                id="expedientes-1"
                                name='expedientes'
                                value={datosFormulario.expedientes}
                                label="Causas"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Seleccionar causa</MenuItem>
                                {stateCamposForm.expedientes.map((item, index) => {

                                    return(
                                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                    </Grid>*/}


                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Divider>Expdiente extendido</Divider>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaAprension'
                                value={datosFormulario.fecha_de_aprehension ? dayjs(datosFormulario.fecha_de_aprehension) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fecha_de_aprehension: newValue,
     /*                                   fecha_de_aprehension_modificado: true,*/
                                    }))
                                }}
                                label="Fecha de aprension y detención"/>

                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <Stack spacing={2} direction='row' alignItems='center'>
                            <Typography variant='overline'>
                                Tiempo de condena:
                            </Typography>
                            <TextField
                                label="Meses"
                                variant="outlined"
                                value={datosFormulario.tiempo_de_condena}
                                name="tiempo_de_condena"
                                onChange={handleChange}/>
                        </Stack>
                    </Grid>
                </Grid>
                {/*<Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Años"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_condena}
                            name="tiempoDeCondenaAnos"
                            onChange={handleChange}/>
                    </Grid>*/}
                {/*<Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Meses"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_condena}
                            name="tiempo_de_condena"
                            onChange={handleChange}/>
                    </Grid>*/}

                <Grid container spacing={2} mt={1} alignItems={'end'}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="anhosDeExtraSeguridad">¿Cuentas con años extras de condena por medida de
                                seguridad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="anhosDeExtraSeguridad"
                                name="tiene_anhos_extra_de_seguridad"
                                onChange={handleBooleanChange}
                                value={datosFormulario.tiene_anhos_extra_de_seguridad}
                            >
                                <FormControlLabel value={false} control={<Radio/>} label="No"/>
                                <FormControlLabel value={true} control={<Radio/>} label="Si"/>


                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {datosFormulario.tiene_anhos_extra_de_seguridad?
                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Meses"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_seguridad}
                            name="tiempo_de_seguridad"
                            onChange={handleChange}/>
                    </Grid>
                        : null}
                    {/*<Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Años"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_seguridad}
                            name="anosDeCondenaPorMedidasDeSeguridad"
                            onChange={handleChange}/>
                    </Grid>*/}
                </Grid>

                <Grid container spacing={2} mt={1}>

                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='compurgamiento'
                                value={datosFormulario.fecha_de_compurgamiento_inicial ? dayjs(datosFormulario.fecha_de_compurgamiento_inicial) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fecha_de_compurgamiento_inicial: newValue,
                                        fecha_de_compurgamiento_inicial_modificado: true,
                                    }))
                                }}
                                label="Compurgamiento inicial"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        {/*<FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaCompurgamientoCalculada'
                                value={datosFormulario.fecha_de_compurgamiento_recalculada ? dayjs(datosFormulario.fecha_de_compurgamiento_recalculada) : null}
                                onChange={(newValue: Dayjs | null) => {
                                    setDatosFormularios(prevState => ({
                                        ...prevState,
                                        fecha_de_compurgamiento_recalculada: newValue,
                                        fecha_de_compurgamiento_recalculada_modificado: true,
                                    }))
                                }}
                                label="Compurgamiento recalculado"/>
                        </FormControl>*/}
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
                                name='fechaHecho'
                                value={dayjs('11/1/2001')}
                                onChange={handleChange}
                                disabled
                                label="Fecha del hecho"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label="Lugar del hecho"
                            variant="outlined"
                            value={datosFormulario.lugar_del_hecho}
                            name="lugar_del_hecho"
                            onChange={handleChange}/>
                    </Grid>

                    <Grid item sm={12}>
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
                    <Grid item sm={12}>
                        <Typography>Defensor</Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                label="Tipo"
                                variant="outlined"
                                value={datosFormulario.defensor.tipo}
                                name="tipo"
                                onChange={handleDefensor}
                            >
                                <MenuItem value={'publico'}>Publico</MenuItem>
                                <MenuItem value={'privado'}>Privado</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Nombre del Defensor"
                            variant="outlined"
                            value={datosFormulario.defensor.nombre ? datosFormulario.defensor.nombre : ''}
                            name="nombre"
                            onChange={handleDefensor}/>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Nombre del Defensor"
                            variant="outlined"
                            value={datosFormulario.defensor.apellido ? datosFormulario.defensor.apellido : ''}
                            name="apellido"
                            onChange={handleDefensor}/>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Telefono"
                            variant="outlined"
                            value={datosFormulario.defensor.telefono ? datosFormulario.defensor.telefono : ''}
                            name="telefono"
                            onChange={handleDefensor}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Typography>PPLs vinculados</Typography>
                    </Grid>
                    <Grid item sm={12} mt={1}>
                        <ModalPersona onHandlerPersona={handlerPersona}/>
                    </Grid>

                    <Grid item sm={12}>
                        <ul>
                            {(datosFormulario.ppls.length > 0 && datosFormulario.ppls[0] !== null) ?

                                (datosFormulario.ppls.map((item: {
                                    id_persona: number | null;
                                    nombre: string;
                                    apellido: string
                                }) => (
                                    <li key={item.id_persona}>
                                        {item.nombre} {item.apellido}
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
                                    {/* Renderiza la información de la persona aquí */}
                                    {persona.nombre}
                                </div>
                            ))}
                        </div>
                    </Grid>

                </Grid>

                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Stack direction='row' spacing={2}>
                            <Button variant='contained' onClick={handleSubmit}>
                                Guardar
                            </Button>
                            <Button variant='outlined'>
                                Cancelar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>


            </Box>
        </>


    );
}

