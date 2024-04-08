import {
    Box,
    Button,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Grid,
    InputLabel, ListSubheader,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {DatePicker, DateValidationError, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {EstadoCivil, EstadoCivilDTO} from "@/model/estadoCivil.model";
import {Nacionalidad, NacionalidadesDTO} from "@/model/nacionalidad.model";
import {RequestResponse, api_request} from "@/lib/api-request";
import dayjs, {Dayjs} from "dayjs";

import {DatosDeIdentificacion} from "@/components/registro/identificacionForm";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {FormValidator} from "@/app/middleware/formValidator";
import {LoadingButton} from "@mui/lab";

interface datosPersonales {
    id_persona: number | null;
    numeroDeIdentificacion: string | any;
    nombre: string;
    tiene_cedula: boolean;
    nombre_modificado: boolean;
    codigo_genero: number;
    apellido: string;
    apellido_modificado: boolean;
    apodo: string;
    apodo_modificado: boolean;
    estadoCivil: string;
    estadoCivil_modificado: boolean;
    fechaDeNacimiento: Dayjs | null;
    fechaDeNacimiento_modificado: boolean;
    nacionalidad: number;
    nacionalidad_modificado: boolean;
    lugarDeNacimiento: string;
    lugarDeNacimiento_modificado: boolean;
    sexo: string;
    sexo_modificado: boolean;
    tipoDeDocumento: string | number;
    tipoDeDocumento_modificado: boolean;
    direccion: string;
    direccion_modificado: boolean;
    barrioCompania: string;
    barrioCompania_modificado: boolean;
    numeroDeContacto: string;
    numeroDeContacto_modificado: boolean;
    contactoDeEmergencia1: string;
    contactoDeEmergencia1_modificado: boolean;
    contactoDeEmergencia2: string;
    contactoDeEmergencia2_modificado: boolean;
    pueblosIndigenas: boolean;
    pueblosIndigenas_modificado: boolean;
    nombreEtnia: string;
    nombreEtnia_modificado: boolean;
    perteneceAComunidadLGTBI: boolean;
    perteneceAComunidadLGTBI_modificado: boolean;
    grupoLGTBI: string;
    grupoLGTBI_modificado: boolean;
    tiene_contacto_en_embajada: boolean;
    nombre_contacto_en_embajada: string;
    telefono_contacto_en_embajada: string;
    pais_embajada: number;
    foto: string | null;
    departamento: number;
    ciudad: number;

}

const datosPersonalesInicial: datosPersonales = {
    id_persona: null,
    numeroDeIdentificacion: null,
    nombre: '',
    apellido: '',
    tiene_cedula: true,
    apodo: '',
    codigo_genero: 0,
    estadoCivil: '1',
    fechaDeNacimiento: null,
    nacionalidad: 1,
    lugarDeNacimiento: '',
    sexo: '',
    tipoDeDocumento: 1,
    direccion: '',
    barrioCompania: '',
    numeroDeContacto: '',
    contactoDeEmergencia1: '',
    contactoDeEmergencia2: '',
    pueblosIndigenas: false,
    nombreEtnia: '',
    nombre_modificado: false,
    apellido_modificado: false,
    apodo_modificado: false,
    estadoCivil_modificado: false,
    fechaDeNacimiento_modificado: false,
    nacionalidad_modificado: false,
    lugarDeNacimiento_modificado: false,
    sexo_modificado: false,
    tipoDeDocumento_modificado: false,
    direccion_modificado: false,
    barrioCompania_modificado: false,
    numeroDeContacto_modificado: false,
    contactoDeEmergencia1_modificado: false,
    contactoDeEmergencia2_modificado: false,
    pueblosIndigenas_modificado: false,
    nombreEtnia_modificado: false,
    grupoLGTBI: '',
    grupoLGTBI_modificado: false,
    perteneceAComunidadLGTBI: false,
    perteneceAComunidadLGTBI_modificado: false,
    tiene_contacto_en_embajada: false,
    nombre_contacto_en_embajada: '',
    telefono_contacto_en_embajada: '',
    pais_embajada: 0,
    foto: '',
    departamento: 1,
    ciudad: 1,
}

export interface BloqueDatosPersonalesProps {
    datosDeIdentificacion: DatosDeIdentificacion;
    handleAccordion?: (s: string) => void;

}


const BloqueDatosPersonales: FC<BloqueDatosPersonalesProps> = ({datosDeIdentificacion, handleAccordion}) => {
    console.log(datosDeIdentificacion)
    let numero_doc_procesado : string | null | undefined = '';

    switch (datosDeIdentificacion.tipo_identificacion) {
        case 1:{
            numero_doc_procesado = datosDeIdentificacion.cedula_identidad
            break;
        }
        case 2:{
            numero_doc_procesado = datosDeIdentificacion.numeroDeIdentificacion
            break;
        }case 3:{
            numero_doc_procesado = datosDeIdentificacion.prontuario
            break;
        }
        default:{
            numero_doc_procesado = datosDeIdentificacion.cedula_identidad
            break;
        }

    }


    const [datosPersonalesState, setDatosPersonalesState] = useState<datosPersonales>({
        ...datosPersonalesInicial,
        fechaDeNacimiento: dayjs(datosDeIdentificacion.fecha_nacimiento),
        tiene_cedula: datosDeIdentificacion.tiene_cedula,
        tipoDeDocumento: datosDeIdentificacion.tipo_identificacion ? datosDeIdentificacion.tipo_identificacion : 1,
        fechaDeNacimiento_modificado: true,
        id_persona: datosDeIdentificacion.id_persona,
        numeroDeIdentificacion: numero_doc_procesado,
        nombre: datosDeIdentificacion.nombres,
        nombre_modificado: true,
        apellido: datosDeIdentificacion.apellidos,
        apellido_modificado: true,
        codigo_genero: datosDeIdentificacion.codigo_genero ? datosDeIdentificacion.codigo_genero : 0,
        nacionalidad: datosDeIdentificacion.tiene_cedula ? 1 : 2,
        foto: datosDeIdentificacion.foto ? datosDeIdentificacion.foto : ''

    });


    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    const [nacionalidades, setNacionalidades] = useState<Array<Nacionalidad>>([]);
    const [datosObligatorios, setDatosObligatorios] = useState<Object>({})
    const [estadosCiviles, setEstadosCiviles] = useState<Array<EstadoCivil>>([]);
    const {openSnackbar} = useGlobalContext();


    /** Efecto para obtener datos para elementos del formulario
     * */
    useEffect(
        () => {
            const getNacionalidades = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/nacionalidades`;
                try {
                    const respuesta: RequestResponse = await api_request<NacionalidadesDTO>(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    // console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        setNacionalidades(respuesta.datos.nacionalidades);
                    } else {
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }
            }

            const getEstadosCiviles = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/estados_civiles`;
                try {
                    const respuesta: RequestResponse = await api_request<EstadoCivilDTO>(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    // console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        setEstadosCiviles(respuesta.datos.estadosCiviles);
                    } else {
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }
            }

            getEstadosCiviles();
            getNacionalidades();

            setDatosObligatorios(prev => ({
                ...prev,
                estadoCivil: {
                    requerido: true,
                    actualizado: false,
                },
            }))


        }, []
    )

    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setDatosPersonalesState(
            (prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
                [`${event.target.name}_modificado`]: true
            }))
    }

    const onDatoSelectChange = (event: SelectChangeEvent<number | string>) => {
        setDatosPersonalesState(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: event.target.value,
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

    const onOptionSelectChange = (event: ChangeEvent<HTMLInputElement>) => {

        setDatosPersonalesState(
            (prev) => {
                return (
                    {
                        ...prev,
                        [event.target.name]: (event.target.value === 'true'),
                        [`${event.target.name}_modificado`]: true
                    }
                )
            }
        )
    }

    const onFechaNacimientoChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {

        setDatosPersonalesState(
            (prev) => ({
                ...prev,
                fechaDeNacimiento: value,
                fechaDeNacimiento_modificado: true
            })
        )
    }

    const onDatosPersonalesSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setConsultaLoading(true)

        console.log('test')
        if (datosDeIdentificacion.id_persona && FormValidator(datosObligatorios, datosPersonalesState)) {
            const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_personales`;
            const datosDelFormulario: datosPersonales = Object.assign({}, datosPersonalesState);
            datosDelFormulario.numeroDeIdentificacion = datosDeIdentificacion.cedula_identidad ? datosDeIdentificacion.cedula_identidad : null;


            const respuesta = await api_request(url, {
                method: 'POST',
                body: JSON.stringify(datosDelFormulario),
                headers: {'Content-Type': 'application/json'}
            })

            if (respuesta.success) {
                setConsultaLoading(false)
                setDatosPersonalesState(prev => ({
                    ...prev,
                    id: respuesta.datos.id,
                }))
                openSnackbar("Datos guardados correctamente", "success")
                if (handleAccordion) {
                    handleAccordion('')
                }
            } else {
                if (respuesta.error) {
                    setConsultaLoading(false)

                    openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`, `error`);
                    log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                    if (handleAccordion) {
                        handleAccordion('')
                    }
                }
            }

        } else {
            setConsultaLoading(false)
            openSnackbar("Falta el número de identificación", "error");
        }
    }

    return (
        <Box component={'form'} autoComplete="off" mx={2}>
            <Typography variant='h6'>
                Datos Personales
            </Typography>

            <Grid container spacing={2}>
                <Grid item sm={3}>
                    {/*{console.log(datosPersonalesState.foto)}*/}
                    <Box className='contenedorFotoPerfil'>
                        <img src={`${process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER}${datosPersonalesState.foto}`} alt=""/>
                    </Box>
                </Grid>
                <Grid item sm={9}>
                    <Grid container spacing={2} my={2}>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="nombre">
                                    Nombre
                                </InputLabel>
                                <OutlinedInput
                                    disabled
                                    readOnly={true}
                                    label="Nombre"
                                    name="nombre"
                                    value={datosPersonalesState.nombre}
                                    onChange={onDatoChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="apellido">
                                    Apellido
                                </InputLabel>
                                <OutlinedInput
                                    disabled
                                    readOnly={true}
                                    label="Apellido"
                                    name="apellido"
                                    value={datosPersonalesState.apellido}
                                    onChange={onDatoChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="apodo">
                                    Apodo
                                </InputLabel>
                                <OutlinedInput
                                    label="Apodo"
                                    name="apodo"
                                    value={datosPersonalesState.apodo}
                                    onChange={onDatoChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Nacionalidad</InputLabel>
                                <Select
                                    value={datosPersonalesState.nacionalidad}
                                    onChange={onDatoSelectChange}
                                    label="Nacionalidad"
                                    name="nacionalidad"
                                >
                                    {nacionalidades ? nacionalidades.map(
                                        (data, id) => {
                                            return (
                                                <MenuItem key={id} value={data.id}>{data.nombre}</MenuItem>
                                            )
                                        }
                                    ) : null}


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel>Tipo de documento</InputLabel>

                                <Select
                                    id="tipo_documento"
                                    name="tipo_documento"
                                    label='Tipo documento'
                                    value={datosPersonalesState.tipoDeDocumento}
                                >

                                    <MenuItem value={1}>Cedula de identidad policial</MenuItem>
                                    <MenuItem value={2}>Pasaporte</MenuItem>
                                    <MenuItem value={3}>Prontuario</MenuItem>


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel>Numero de documento</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    value={datosPersonalesState.numeroDeIdentificacion}
                                    label="Numero de documento"
                                    name="numeroDeIdentificacion"
                                    disabled
                                    inputProps={{readOnly: true,}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="estado_civil">
                                    Genero
                                </InputLabel>
                                <Select
                                    id="estado_civil_id"
                                    name="codigo_genero"
                                    label='Genero'
                                    value={datosPersonalesState.codigo_genero}
                                >

                                    <MenuItem value={1}>Femenino</MenuItem>
                                    <MenuItem value={2}>Masculino</MenuItem>


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="estado_civil">
                                    Estado Civil
                                </InputLabel>
                                <Select
                                    id="estado_civil_id"
                                    name="estadoCivil"
                                    label='Estado Civil'
                                    value={datosPersonalesState.estadoCivil}
                                    onChange={onDatoSelectChange}
                                >
                                    <MenuItem value={0}>Seleccionar estado civil</MenuItem>
                                    {estadosCiviles ? estadosCiviles.map(
                                        (estadoCivil, id) => {
                                            return (
                                                <MenuItem key={id}
                                                          value={estadoCivil.id}>{estadoCivil.nombre}</MenuItem>
                                            )
                                        }
                                    ) : null}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <DatePicker

                                    value={datosPersonalesState.fechaDeNacimiento ? dayjs(datosPersonalesState.fechaDeNacimiento, 'DD/MM/YYYY') : null}
                                    format="DD/MM/YYYY"
                                    disabled
                                    onChange={onFechaNacimientoChange}
                                    label={"Fecha de nacimiento"}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    autoComplete="off"
                                    disabled
                                    fullWidth
                                    label="Edad"
                                    name="edad"
                                    value={datosPersonalesState.fechaDeNacimiento ? dayjs().diff(dayjs(datosDeIdentificacion.fecha_nacimiento), 'year') : null}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} my={2}>


                <Grid item xs={4}>
                    <TextField
                        autoComplete="off"
                        fullWidth
                        label="Ciudad de Nacimiento"
                        name="lugarDeNacimiento"
                        value={datosPersonalesState.lugarDeNacimiento}
                        onChange={onDatoChange}>

                    </TextField>

                </Grid>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Datos de residencia
                    </Typography>
                </Grid>

                <Grid item sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Ciudad</InputLabel>
                        <Select
                            value={datosPersonalesState.ciudad}
                            onChange={onDatoSelectChange}
                            label="Ciudad"
                            name="ciudad"
                        >
                            <MenuItem value={1}>Asuncion</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={3}>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            value={datosPersonalesState.departamento}
                            onChange={onDatoSelectChange}
                            label="Departamento"
                            name="departamento"
                        >
                            <MenuItem value={1}>Asuncion</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label="Direccion"
                        name="direccion"
                        value={datosPersonalesState.direccion}
                        onChange={onDatoChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Barrio/Compañia</InputLabel>
                        <OutlinedInput
                            name="barrioCompania"
                            label='Barrio/Compañia'
                            value={datosPersonalesState.barrioCompania}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item sm={4}>
                    <TextField
                        fullWidth
                        label="Numero de contacto"
                        name="numeroDeContacto"
                        value={datosPersonalesState.numeroDeContacto}
                        onChange={onDatoChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Contacto de emergencia 1"
                            fullWidth
                            name="contactoDeEmergencia1"
                            value={datosPersonalesState.contactoDeEmergencia1}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Contacto de emergencia 2"
                            fullWidth
                            name="contactoDeEmergencia2"
                            value={datosPersonalesState.contactoDeEmergencia2}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>


            {/* Bloque Extranjero*/}
            {datosDeIdentificacion.es_extranjero ?
                <Grid container spacing={2} my={2}>
                    <Grid item sm={12}>
                        <Typography variant='h6'>
                            Datos de Extranjeros
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>Mantiene contacto con la embajada:</FormLabel>
                            <RadioGroup
                                value={datosPersonalesState.tiene_contacto_en_embajada}
                                onChange={onOptionSelectChange}
                                row
                                aria-labelledby="tiene_contacto_en_embajada"
                                name="tiene_contacto_en_embajada">
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
                    {datosPersonalesState.tiene_contacto_en_embajada ?
                        (
                            <>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        name='nombre_contacto_en_embajada'
                                        label='Nombre de contacto'
                                        onChange={onDatoChange}
                                        value={datosPersonalesState.nombre_contacto_en_embajada}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        name='telefono_contacto_en_embajada'
                                        label='Número de contacto de contacto'
                                        onChange={onDatoChange}
                                        value={datosPersonalesState.telefono_contacto_en_embajada}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Pais de embajada</InputLabel>
                                        <Select
                                            value={datosPersonalesState.pais_embajada}
                                            onChange={onDatoSelectChange}
                                            label="Pais de embajada"
                                            name="pais_embajada"
                                        >
                                            <MenuItem value={1}>Brasil</MenuItem>
                                            <MenuItem value={2}>Argentina</MenuItem>
                                            <MenuItem value={3}>Chile</MenuItem>
                                            <MenuItem value={3}>Bolivia</MenuItem>
                                        </Select>
                                        <FormHelperText>Pais donde se encuentra la embajada</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </>
                        )
                        : null}
                </Grid>

                : null}
            <Grid container spacing={2} my={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Pueblos indigenas
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <FormLabel>Pertenece a un pueblo indigena</FormLabel>
                        <RadioGroup
                            value={datosPersonalesState.pueblosIndigenas}
                            onChange={onOptionSelectChange}
                            row
                            aria-labelledby="gestioacion"
                            name="pueblosIndigenas">
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
                {datosPersonalesState.pueblosIndigenas ?
                    <Grid item sm={6}>
                        <FormControl className='pueblosSelector' fullWidth variant="outlined">
                            <InputLabel>Pueblos indigena</InputLabel>
                            <Select
                                value={datosPersonalesState.nombreEtnia}
                                onChange={onDatoSelectChange}
                                label="Pueblos indigena"
                                name="nombreEtnia"
                            >
                                <MenuItem value={'0'}>Seleccionar pueblo indigena</MenuItem>
                                <ListSubheader>Guarani</ListSubheader>
                                <MenuItem value={'141'}>Aché</MenuItem>
                                <MenuItem value={'142'}>Avá Guarani</MenuItem>
                                <MenuItem value={'143'}>Mbyá Guarani</MenuItem>
                                <MenuItem value={'144'}>Paî Tavyterã</MenuItem>
                                <MenuItem value={'145'}>Guaraní Occidental</MenuItem>
                                <MenuItem value={'146'}>Guaraní Ñandeva</MenuItem>

                                <ListSubheader>Lengua Maskoy</ListSubheader>
                                <MenuItem value={'251'}>Enlhet Norte</MenuItem>
                                <MenuItem value={'252'}>Enxet Sur</MenuItem>
                                <MenuItem value={'253'}>Sanapana</MenuItem>
                                <MenuItem value={'254'}>Angaité</MenuItem>
                                <MenuItem value={'255'}>Guaná</MenuItem>
                                <MenuItem value={'256'}>Toba Maskoy</MenuItem>

                                <ListSubheader>Mataco Mataguayo</ListSubheader>
                                <MenuItem value={'361'}>Nivaclé</MenuItem>
                                <MenuItem value={'362'}>Maká</MenuItem>
                                <MenuItem value={'363'}>Manjui</MenuItem>

                                <ListSubheader>Zamuco</ListSubheader>
                                <MenuItem value={'361'}>Ayoreo</MenuItem>
                                <MenuItem value={'362'}>Ybytoso</MenuItem>
                                <MenuItem value={'363'}>Tomárãho</MenuItem>

                                <ListSubheader>Guaicurú</ListSubheader>
                                <MenuItem value={'581'}>Qom</MenuItem>

                                <ListSubheader>Códigos especiales</ListSubheader>
                                <MenuItem value={'990'}>Otros pueblos indígena n.c.p(Especifique)</MenuItem>
                                <MenuItem value={'997'}>No indigena</MenuItem>
                                <MenuItem value={'999'}>Ignorado</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    : null}
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Comunidad LGBTI
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <FormLabel>Pertenece a la comunidad</FormLabel>
                        <RadioGroup
                            value={datosPersonalesState.perteneceAComunidadLGTBI}
                            onChange={onOptionSelectChange}
                            row
                            name="perteneceAComunidadLGTBI">
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
                {/*<Grid item sm={8}>
                    <TextField
                        fullWidth
                        label="Nombre de la comunidad"
                        name="grupoLGTBI"
                        value={datosPersonalesState.grupoLGTBI}
                        onChange={onDatoChange}
                        disabled={!datosPersonalesState.perteneceAComunidadLGTBI}
                    />
                </Grid>*/}
                <Grid item sm={12}>
                    <Stack direction="row" spacing={2}>
                        <LoadingButton
                            sx={{
                                minHeight: "100%",
                                px: "48px",
                                height: '48px'
                            }}
                            onClick={onDatosPersonalesSubmit}
                            loading={consultaLoading}
                            loadingPosition='end'
                            variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                        </LoadingButton>

                        {/* <Button variant='outlined'>
              Cancelar
            </Button> */}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BloqueDatosPersonales;
