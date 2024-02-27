'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
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
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import ModalPersona from "@/app/(sistema)/(datos-penales)/componentes/ModalPersona";
import DeleteIcon from "@mui/icons-material/Delete";

type camposFormType = {
    id: number,
    nombre: string,
}[];

type formDatosType = {
    hechos_punibles: camposFormType;
    circunscripciones: camposFormType;
    ciudad: camposFormType;
}

const hechosPuniblesIntitial: camposFormType = [
    {id: 1, nombre: 'asesinato'}
]


// TODO: Hacer completado de form cuando es update o /crear
export default function FormCausa({params}: { params: { id: number | string } }) {
    //@ts-ignore
    const [datosFormulario, setDatosFormularios] = useState<CausaType>(causaInitialData);
    const [stateCamposForm, setStateCamposForm] = useState<formDatosType>({hechos_punibles: [], circunscripciones: [], ciudad: []})
    const [privados_libertad, set_privados_libertad] = useState<Array<any>>([])

    const [loading, setLoading] = useState(true);
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();
    const isEditMode = params && params.id;
    const ENDPOINT_API = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API

    useEffect(() => {
        // Hechos punibles
        fetchData(`${ENDPOINT_API}/datos_penales/hechos_punibles`).then((res) => {
            setStateCamposForm(prev => (
                {
                    ...prev,
                    hechos_punibles: Array.isArray(res.hechosPunibles) ? res.hechosPunibles : []
                }))
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

    // Se obtiene los modelos completos de PPL con el ID guardado en el array de ppl de la causa
    useEffect(() => {
        const obtenerPersonaPorId = async (id: { id_persona: number | null; nombre: string; apellido: string } | number) => {
            const response = await fetch(`${ENDPOINT_API}/gestion_ppl/ppls/id/${id}`);
            if (!response.ok) throw new Error('Error al obtener la persona');
            return response.json();
        };


        if (datosFormulario.ppls.length > 0 && datosFormulario.ppls.every(id => typeof id === 'number')) {

            const promesas = datosFormulario.ppls.map((id)  => obtenerPersonaPorId(id)
            );


            Promise.all(promesas)
                .then(personas => {
                    setDatosFormularios(prev=>({
                        ...prev,
                        ppls:[...personas]
                    }));

                })
                .catch(error => {console.error('Error al obtener las personas:', error);});
        }

    }, [datosFormulario.ppls]);

    const handleChange = (event: any) => {
        event.preventDefault();
        handleInputChange(event, datosFormulario, setDatosFormularios);
    };

    const handlerPersona = (persona: {id_persona:number | null; nombre:string; apellido:string;}) =>{
        if(!datosFormulario.ppls.some(item=> item.id_persona == persona.id_persona)){
            setDatosFormularios(prev=>({
                ...prev,
                ppls:[...prev.ppls, persona]
            }))
        }

    }

    /** Manejador para borrar PPLs de lista de personas
     *si el ID del ppl que se recibe se encuentra dentro del array de objetos del estado se borra
     *
     * @param persona
     */
    const handleDeletePPL = (persona: number | null) =>{

        setDatosFormularios(prev=>({
            ...prev,
            ppls:datosFormulario.ppls.filter(item=> item.id_persona !== persona)
        }))
    }



    const handleSubmit = () => {

        const post_mehtod = isEditMode == 'crear' ? 'POST' : 'PUT'
        const endpoint_api = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/causas`
        const stateForm = {
            ...datosFormulario,
            hechos_punibles: datosFormulario.hechos_punibles.map(item=>(item.id)),
            defensor: datosFormulario.defensor.id,
            ppls: datosFormulario.ppls.map(item=>item.id_persona)
        }

        console.log(stateForm)
        postEntity(
            'POST',
            endpoint_api,
            'causas',
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
            fetchFormData(params.id, '/datos_penales/causas') // Usa la función importada
                .then((data) => {
                    if (data) {

                        setDatosFormularios({
                            ...data,
                            //hechos_punibles: data.hechos_punibles.map((item: { id: any; }) => (item.id)),
                            hechos_punibles: data.hechos_punibles,
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
                            Datos de la causa
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Nro. causa"
                            variant="outlined"
                            value={datosFormulario.numeroDeDocumento}
                            name="numeroDeDocumento"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Año causa"
                            variant="outlined"
                            value={datosFormulario.anho}
                            name="anho"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={3}>

                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaAprension'
                                value={datosFormulario.fecha_de_aprehension ? dayjs(datosFormulario.fecha_de_aprehension) : ''}
                                onChange={handleChange}
                                label="Fecha de aprension y detención"/>

                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            label="Caratula"
                            multiline
                            rows={2}
                            maxRows={4}
                            variant="outlined"
                            value={datosFormulario.caratula_causa}
                            name="caratula_causa"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={6}>

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
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="situacion_procesal_field">Situación procesal</InputLabel>
                            <Select
                                label="Situación procesal"
                                variant="outlined"
                                value={datosFormulario.condenado ? 'true' : 'false'}
                                name="condenado"
                                onChange={handleChange}
                            >
                                <MenuItem value={'false'}>Procesado</MenuItem>
                                <MenuItem value={'true'}>Condenado</MenuItem>
                            </Select>
                        </FormControl>
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
                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Meses"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_condena}
                            name="tiempoDeCondenaMeses"
                            onChange={handleChange}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1} alignItems={'end'}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="anhosDeExtraSeguridad">¿Cuentas con años extras de condena por medida de
                                seguridad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="anhosDeExtraSeguridad"
                                name="anosExtrasDeCondenaPorMedidaDeSeguridad"
                                onChange={handleChange}
                                value={datosFormulario.tiene_anhos_extra_de_seguridad}
                            >
                                <FormControlLabel value={false} control={<Radio/>} label="No"/>
                                <FormControlLabel value={true} control={<Radio/>} label="Si"/>


                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Meses"
                            variant="outlined"
                            value={datosFormulario.tiempo_de_seguridad}
                            name="mesesDeCondenaPorMedidasDeSeguridad"
                            onChange={handleChange}/>
                    </Grid>
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

                    <Grid item sm={2}>
                        <TextField
                            fullWidth
                            label="Sentencia definitiva"
                            variant="outlined"
                            value={datosFormulario.sentencia_definitiva}
                            name="sentenciaDefinitiva"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={7}>
                        <TextField
                            fullWidth
                            label="En caracter de"
                            variant="outlined"
                            value={datosFormulario.sentencia_definitiva}
                            name="sentenciaDescripcion"
                            onChange={handleChange}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>

                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='compurgamiento'
                                value={datosFormulario.fecha_de_compurgamiento_inicial ? dayjs(datosFormulario.fecha_de_compurgamiento_inicial) : ''}
                                onChange={handleChange}
                                label="Compurgamiento inicial"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <DatePicker
                                format="DD/MM/YYYY"
                                name='fechaCompurgamientoCalculada'
                                value={datosFormulario.fecha_de_compurgamiento_recalculada ? dayjs(datosFormulario.fecha_de_compurgamiento_recalculada) : ''}
                                onChange={handleChange}
                                label="Compurgamiento recalculado"/>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>

                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="circunscripcion-field">Circunscripciones</InputLabel>
                            <Select
                                labelId="circunscripcion-field"
                                id="circunscripcion"
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
                        <TextField
                            fullWidth
                            label="Juzgado de tribunal de sentencia"
                            variant="outlined"
                            value={datosFormulario.juzgado_de_tribunal_de_sentencia}
                            name="juzgado_de_tribunal_de_sentencia"
                            onChange={handleChange}/>
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
                                name="defensor"
                                onChange={handleChange}
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
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Nombre del Defensor"
                            variant="outlined"
                            value={datosFormulario.defensor.apellido ? datosFormulario.defensor.apellido : ''}
                            name="apellido"
                            onChange={handleChange}/>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label="Telefono"
                            variant="outlined"
                            value={datosFormulario.defensor.telefono ? datosFormulario.defensor.telefono : ''}
                            name="telefonoDelDefensor"
                            onChange={handleChange}/>
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
                        { datosFormulario.ppls.length > 0 ?
                            (datosFormulario.ppls.map((item :{id_persona:number | null; nombre: string; apellido:string})=>(
                                <li key={item.id_persona}>
                                    {item.nombre} {item.apellido}
                                    <IconButton aria-label="delete" size="small" onClick={(persona)=>handleDeletePPL(item.id_persona)}>
                                        <DeleteIcon fontSize="inherit" />
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