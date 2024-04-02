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
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";

interface datosPersonales {
    id_persona: number | null;
    numero_de_identificacion: string;
    nombre: string;
    nombre_modificado: boolean;
    apellido: string;
    apellido_modificado: boolean;
    apodo: string;
    apodo_modificado: boolean;
    estadoCivil?: number | null;
    estadoCivil_modificado: boolean;
    fechaDeNacimiento: Dayjs | null;
    fechaDeNacimiento_modificado: boolean;
    nacionalidad: number | null;
    nacionalidad_modificado: boolean;
    lugarDeNacimiento: string;
    lugarDeNacimiento_modificado: boolean;
    sexo: string;
    codigo_genero?: number;
    sexo_modificado: boolean;
    tipoDeDocumento: number | null;
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
    es_extranjero: boolean;
    mantiene_contacto_con_consulado_o_embajada: boolean;
    nombre_de_contacto_en_consulado_o_embajada: string;
    numero_de_contacto_en_consulado_o_embajada: string;
    pais_de_embajada: number;

}

const datosPersonalesInicial: datosPersonales = {
    nombre_de_contacto_en_consulado_o_embajada: '',
    numero_de_contacto_en_consulado_o_embajada: '',
    mantiene_contacto_con_consulado_o_embajada: false,
    pais_de_embajada: 0,
    es_extranjero: false,
    id_persona: null,
    numero_de_identificacion: "",
    nombre: '',
    apellido: '',
    apodo: '',
    estadoCivil: null,
    fechaDeNacimiento: null,
    nacionalidad: null,
    lugarDeNacimiento: '',
    sexo: '',
    codigo_genero: 0,
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
    tipoDeDocumento: 0,
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


}

export interface BloqueDatosPersonalesProps {
    datosDeIdentificacion: {
        numero_de_identificacion: string;
        id_persona: number | null;
        id_datos_personales: number | null;
        nombres: string;
        apellidos: string;
        fechaDeNacimiento: string;
        codigo_genero: number;
        apodo: string;
        estadoCivil?: number | null;
        nacionalidad?: number | null;
        lugarDeNacimiento: string;
        direccion: string;
        barrioCompania: string;
        numeroDeContacto: string;
        contactoDeEmergencia1: string;
        contactoDeEmergencia2: string;
        pueblosIndigenas: boolean;
        nombreEtnia: string;
        perteneceAComunidadLGTBI: boolean;

    };
    tipo_de_documento?: number | null;

}

const BloqueDatosPersonales: FC<BloqueDatosPersonalesProps> = ({datosDeIdentificacion, tipo_de_documento = null}) => {

    // console.log(datosDeIdentificacion)

    const [datosPersonalesState, setDatosPersonalesState] = useState<datosPersonales>({
        ...datosPersonalesInicial
    });

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    useEffect(() => {
        if (datosDeIdentificacion) {
            setDatosPersonalesState(prevState => {
                return {
                    ...prevState,
                    id_persona: datosDeIdentificacion.id_persona,
                    fechaDeNacimiento: dayjs(datosDeIdentificacion.fechaDeNacimiento, "YYYY-MM-DD"),
                    fechaDeNacimiento_modificado: true,
                    numero_de_identificacion: datosDeIdentificacion.numero_de_identificacion,
                    tipoDeDocumento: tipo_de_documento ? tipo_de_documento : 0,
                    nombre: datosDeIdentificacion.nombres,
                    nombre_modificado: true,
                    apellido: datosDeIdentificacion.apellidos,
                    apellido_modificado: true,
                    nacionalidad: datosDeIdentificacion.nacionalidad ?? null,
                    codigo_genero: datosDeIdentificacion.codigo_genero,
                    apodo: datosDeIdentificacion.apodo,
                    estadoCivil: datosDeIdentificacion.estadoCivil ?? null,
                    lugarDeNacimiento: datosDeIdentificacion.lugarDeNacimiento,
                    direccion: datosDeIdentificacion.direccion,
                    barrioCompania: datosDeIdentificacion.barrioCompania,
                    numeroDeContacto: datosDeIdentificacion.numeroDeContacto,
                    contactoDeEmergencia1: datosDeIdentificacion.contactoDeEmergencia1,
                    contactoDeEmergencia2: datosDeIdentificacion.contactoDeEmergencia2,
                    pueblosIndigenas: datosDeIdentificacion.pueblosIndigenas,
                    nombreEtnia: datosDeIdentificacion.nombreEtnia,
                    perteneceAComunidadLGTBI: datosDeIdentificacion.perteneceAComunidadLGTBI,
                    es_extranjero: tipo_de_documento == 2
                }
            })
        }
    }, [datosDeIdentificacion]);

    const [nacionalidades, setNacionalidades] = useState<Array<Nacionalidad>>([]);
    const [estadosCiviles, setEstadosCiviles] = useState<Array<EstadoCivil>>([]);
    const {openSnackbar} = useGlobalContext();


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

            getNacionalidades();

        }, []
    )

    useEffect(
        () => {
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
        }, []
    )

    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name);
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

    const onDatoSelectChange = (event: SelectChangeEvent<number | string | null>) => {
        setDatosPersonalesState(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: event.target.value ?? null,
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

    const onOptionSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log("Name of event:", event.target.name);
        setDatosPersonalesState(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: (event.target.value === 'true'),
                        [`${event.target.name}_modificado`]: true
                    }
                )
            }
        )
    }

    const onFechaNacimientoChange = (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
        // console.log(value);
        setDatosPersonalesState(
            (previus) => {
                return (
                    {
                        ...previus,
                        fechaDeNacimiento: value,
                        fechaDeNacimiento_modificado: true
                    }
                )
            }
        )
    }

    const onDatosPersonalesSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setConsultaLoading(true)


        const methodForm = datosDeIdentificacion.id_datos_personales ? 'PUT' : 'POST';
        const url = datosDeIdentificacion.id_datos_personales ?
            `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_personales/${datosDeIdentificacion.id_datos_personales}`
            : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_personales/`
        const datosDelFormulario: datosPersonales = Object.assign({}, datosPersonalesState);

        console.log(JSON.stringify({
            ...datosDelFormulario,
            genero: datosDelFormulario.codigo_genero,
        }))

        const respuesta = await api_request(url, {
            method: methodForm,
            body: JSON.stringify(datosDelFormulario),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (respuesta.success) {
            setDatosPersonalesState(prev=>({
                ...prev,
                id: respuesta.datos.id,
            }))
            setConsultaLoading(false)
            openSnackbar("Datos guardados correctamente", "success")
        } else {
            if (respuesta.error) {
                setConsultaLoading(false)
                openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`, `error`);
                log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
            }
        }

        // console.log("Respuesta:", respuesta);

    }

    return (

        <Box component={'form'} autoComplete="off">

            <Typography variant='h6'>
                Datos Personales
            </Typography>
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
                <Grid item sm={4}>
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
                <Grid item sm={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="estado_civil">
                            Estado Civil
                        </InputLabel>
                        <Select
                            id="estado_civil_id"
                            name="estadoCivil"
                            label='Estado Civil'
                            value={datosPersonalesState.estadoCivil ? datosPersonalesState.estadoCivil : ''}
                            onChange={onDatoSelectChange}
                        >
                            {estadosCiviles ? estadosCiviles.map(
                                (estadoCivil, id) => {
                                    return (
                                        <MenuItem key={id} value={estadoCivil.id}>{estadoCivil.nombre}</MenuItem>
                                    )
                                }
                            ) : null}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="codigo_genero">
                            Genero
                        </InputLabel>
                        <Select
                            disabled
                            id="codigo_genero"
                            name="codigo_genero"
                            label='Genero'
                            value={datosPersonalesState.codigo_genero}
                            onChange={onDatoSelectChange}
                        >
                            <MenuItem value={1}>Femenino</MenuItem>
                            <MenuItem value={2}>Masculino</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id='tipo-doc-label'>Tipo de documento</InputLabel>
                        <Select
                            labelId='tipo-doc-label'
                            value={datosPersonalesState.tipoDeDocumento ? datosPersonalesState.tipoDeDocumento : 0}
                            label='Tipo de documento'
                            onChange={onDatoSelectChange}
                            name="tipoDeDocumento"
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
                        disabled
                        label='Número de documento'
                        name='numero_de_identificacion'
                        value={datosPersonalesState.numero_de_identificacion}
                    />
                </Grid>
                <Grid item sm={4}>
                    <FormControl fullWidth={true}>
                        <DatePicker
                            readOnly={true}
                            disabled
                            value={datosPersonalesState.fechaDeNacimiento}
                            format="DD/MM/YYYY"
                            onChange={onFechaNacimientoChange}
                            label={"Fecha de nacimiento"}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id='nacionalidad-label'>Nacionalidad</InputLabel>
                        <Select
                            labelId='nacionalidad-label'
                            value={datosPersonalesState.nacionalidad ? datosPersonalesState.nacionalidad : ''}
                            onChange={onDatoSelectChange}
                            label="Nacionalidad"
                            name="nacionalidad"
                        >
                            {nacionalidades ? nacionalidades.map(
                                (data, id) => {
                                    return (
                                        <MenuItem key={data.id} value={data.id}>{data.nombre}</MenuItem>
                                    )
                                }
                            ) : null}


                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoComplete="off"
                        fullWidth
                        label="Ciudad de Nacimiento"
                        name="lugarDeNacimiento"
                        value={datosPersonalesState.lugarDeNacimiento}
                        onChange={onDatoChange}>

                    </TextField>

                </Grid>
                <Grid item sm={6}>
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
                            label="Barrio/Compañia"
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

                {/* Seccion extranjeros*/}
                {datosPersonalesState.es_extranjero ?
                    (<Grid item sm={12}>
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
                                        value={datosPersonalesState.mantiene_contacto_con_consulado_o_embajada}
                                        onChange={onOptionSelectChange}
                                        row
                                        aria-labelledby="mantiene_contacto_con_consulado_o_embajada"
                                        name="mantiene_contacto_con_consulado_o_embajada">
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
                            {datosPersonalesState.mantiene_contacto_con_consulado_o_embajada ?
                                (
                                    <>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                name='nombre_de_contacto_en_consulado_o_embajada'
                                                label='Nombre de contacto'
                                                onChange={onDatoChange}
                                                value={datosPersonalesState.nombre_de_contacto_en_consulado_o_embajada}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                name='numero_de_contacto_en_consulado_o_embajada'
                                                label='Número de contacto de contacto'
                                                onChange={onDatoChange}
                                                value={datosPersonalesState.numero_de_contacto_en_consulado_o_embajada}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>Pais de embajada</InputLabel>
                                                <Select
                                                    value={datosPersonalesState.pais_de_embajada}
                                                    onChange={onDatoSelectChange}
                                                    label="Pais de embajada"
                                                    name="pais_de_embajada"
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
                    </Grid>)

                    : null}

                {/* Seccion pueblos indigenas */}
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Pueblo indigenas
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
                <Grid item sm={6}>

                    {
                        datosPersonalesState.pueblosIndigenas ?
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

                            : null
                    }

                </Grid>

                {/* Seccion Comunidad LGBTI */}
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
                <Grid item sm={8}>

                    {/*<TextField
                        fullWidth
                        label="Nombre de la comunidad"
                        name="grupoLGTBI"
                        value={datosPersonalesState.grupoLGTBI}
                        onChange={onDatoChange}
                        disabled={!datosPersonalesState.perteneceAComunidadLGTBI}
                    />*/}


                </Grid>
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

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BloqueDatosPersonales;
