import {
    Autocomplete,
    Box,
    Button, CircularProgress,
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
import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import SaveIcon from '@mui/icons-material/Save';
import {DatePicker, DateValidationError, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {CiudadType, DepartamentoType, EstadoCivil, EstadoCivilDTO} from "@/model/estadoCivil.model";
import {Nacionalidad, NacionalidadesDTO} from "@/model/nacionalidad.model";
import {RequestResponse, api_request} from "@/lib/api-request";
import dayjs, {Dayjs} from "dayjs";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";
import {usePathname, useRouter} from "next/navigation";
import AutocompleteCiudad from "@/components/hooks/autocompleteCiudad";
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

interface datosPersonales {
    flag?: boolean;
    id_persona: number | null;
    numero_de_identificacion: string;
    nombre: string;
    apellido: string;
    apodo: string;
    estadoCivil?: number | null;
    fechaDeNacimiento: Dayjs | null;
    nacionalidad: number | null;
    lugarDeNacimiento: string;
    sexo: string;
    codigo_genero?: number;
    tipoDeDocumento: number | null;
    direccion: string;
    barrioCompania: string;
    numeroDeContacto: string;
    contactoDeEmergencia1: string;
    contactoDeEmergencia2: string;
    pueblosIndigenas: boolean;
    nombreEtnia: string;
    perteneceAComunidadLGTBI: boolean;
    nombreDeContactoDeEmergencia1?: string;
    nombreDeContactoDeEmergencia2?: string;
    grupoLGTBI: string;
    es_extranjero: boolean;
    tiene_contacto_en_embajada: boolean;
    nombre_contacto_en_embajada: string;
    contactoDeEmbajada_numero: string;
    pais_embajada: number;
    telefono_contacto_en_embajada: string;
    departamento: number;
    ciudad: number;
    contacto_embajada: {
        id: number,
        nombre: string,
        numero: string,
        pais: number,
    };

}

const datosPersonalesInicial: datosPersonales = {
    flag: false,
    nombre_contacto_en_embajada: '',
    contactoDeEmbajada_numero: '',
    tiene_contacto_en_embajada: false,
    pais_embajada: 0,
    es_extranjero: false,
    id_persona: null,
    numero_de_identificacion: "",
    nombre: '',
    apellido: '',
    apodo: '',
    estadoCivil: 0,
    fechaDeNacimiento: null,
    nacionalidad: 0,
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
    tipoDeDocumento: 0,
    grupoLGTBI: '',
    perteneceAComunidadLGTBI: false,
    telefono_contacto_en_embajada: '',
    departamento: 0,
    ciudad: 0,
    contacto_embajada: {
        id: 0,
        nombre: '',
        numero: 'string',
        pais: 0,
    }
}

export interface BloqueDatosPersonalesProps {
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;
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
        tiene_contacto_en_embajada: boolean;
        contactoDeEmbajada_id?: number;
        nombreDeContactoDeEmergencia1?: string;
        nombreDeContactoDeEmergencia2?: string;
        contactoDeEmbajada_nombre?: string;
        contactoDeEmbajada_numero?: string;
        departamento: number;
        ciudad: number;
        contacto_embajada: {
            id: number;
            nombre: string;
            numero: string;
            pais?: {
                id: number;
            };
        };

    };
    tipo_de_documento?: number | null;

}

const BloqueDatosPersonales: FC<BloqueDatosPersonalesProps> = (
    {
        datosDeIdentificacion,
        tipo_de_documento = null,
        onSetDatosPPL
    }) => {


    /** 1. Estado */
    const [datosPersonalesState, setDatosPersonalesState] = useState<datosPersonales>({
        ...datosPersonalesInicial
    });

    /** 2. Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    /** 3. Estado para manejo de spinner de boton de solicitud de guardado */
    const [loading, setLoading] = useState(true)

    /** 4. */
    const [nacionalidades, setNacionalidades] = useState<Array<Nacionalidad>>([]);
    const [paises, setPaises] = useState<Array<{ id: number; nombre: string; }>>([]);

    /** 5. */
    const [estadosCiviles, setEstadosCiviles] = useState<Array<EstadoCivil>>([]);

    /** 6. */
    const [departamentosLista, setDepartamentosLista] = useState<Array<DepartamentoType>>([]);

    /** 7. */
    const [ciudadLista, setCiudadLista] = useState<Array<CiudadType>>([]);

    /** 8. Estado para autcomplete de ciudades*/
    const [selectedCity, setSelectedCity] = useState<any>({});

    const {data: session}: { data: any; } = useSession();
    const sessionData = PermissionValidator('crear_ppl_form_perfil', session) || PermissionValidator('actualizar_ppl_form_perfil', session);
    const pathname = usePathname()
    const router = useRouter();
    const {openSnackbar} = useGlobalContext();


    useEffect(() => {

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
                        respuesta.datos.nacionalidades.sort((a: { ID: number; nombre: string; }, b: {
                            ID: number;
                            nombre: any;
                        }) => {

                            if (a.ID !== b.ID) {
                                return a.ID - b.ID;
                            }
                            return a.nombre.localeCompare(b.nombre);

                        })

                        setNacionalidades(respuesta.datos.nacionalidades);
                    } else {
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }


            }

            const getPaises = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/paises`;
                try {
                    const respuesta: RequestResponse = await api_request(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    // console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        respuesta.datos.paises.sort((a: { ID: number; nombre: string; }, b: {
                            ID: number;
                            nombre: any;
                        }) => {

                            if (a.ID !== b.ID) {
                                return a.ID - b.ID;
                            }
                            return a.nombre.localeCompare(b.nombre);

                        })

                        console.log(respuesta.datos.paises)

                        setPaises(respuesta.datos.paises);

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

            const getDepartamentos = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/departamentos`;
                try {

                    const respuesta: RequestResponse = await api_request<EstadoCivilDTO>(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    // console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        setDepartamentosLista(respuesta.datos);
                    } else {
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }
            }

            const getCiudades = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/ciudades`;
                try {

                    const respuesta: RequestResponse = await api_request<EstadoCivilDTO>(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    // console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        setCiudadLista(respuesta.datos.ciudades);
                    } else {
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }
            }

            Promise.all([
                getEstadosCiviles(),
                getNacionalidades(),
                getPaises(),
                getDepartamentos(),
                getCiudades()
            ]).then(() => {
                console.log('Finished loading elements')
            }).finally(() => {
                console.log('Ending promises.')
                setLoading(false)
            })

        }, []
    )


    useEffect(() => {

        if (datosDeIdentificacion) {
            setDatosPersonalesState((prevState: any) => {
                // console.log(datosDeIdentificacion)
                return {
                    ...prevState,
                    id_persona: datosDeIdentificacion.id_persona,
                    fechaDeNacimiento: dayjs(datosDeIdentificacion.fechaDeNacimiento, "YYYY-MM-DD"),
                    numero_de_identificacion: datosDeIdentificacion.numero_de_identificacion,
                    tipoDeDocumento: tipo_de_documento ? tipo_de_documento : 0,
                    nombre: datosDeIdentificacion.nombres,
                    apellido: datosDeIdentificacion.apellidos,
                    nacionalidad: datosDeIdentificacion.nacionalidad ?? null,
                    codigo_genero: datosDeIdentificacion.codigo_genero,
                    apodo: datosDeIdentificacion.apodo,
                    estadoCivil: datosDeIdentificacion.estadoCivil ?? null,
                    lugarDeNacimiento: datosDeIdentificacion.lugarDeNacimiento,
                    direccion: datosDeIdentificacion.direccion,
                    barrioCompania: datosDeIdentificacion.barrioCompania,
                    numeroDeContacto: datosDeIdentificacion.numeroDeContacto,
                    nombreDeContactoDeEmergencia1: datosDeIdentificacion.nombreDeContactoDeEmergencia1,
                    nombreDeContactoDeEmergencia2: datosDeIdentificacion.nombreDeContactoDeEmergencia2,
                    contactoDeEmergencia1: datosDeIdentificacion.contactoDeEmergencia1,
                    contactoDeEmergencia2: datosDeIdentificacion.contactoDeEmergencia2,
                    pueblosIndigenas: datosDeIdentificacion.pueblosIndigenas,
                    nombreEtnia: datosDeIdentificacion.nombreEtnia,
                    perteneceAComunidadLGTBI: datosDeIdentificacion.perteneceAComunidadLGTBI,
                    es_extranjero: tipo_de_documento == 2,
                    tiene_contacto_en_embajada: datosDeIdentificacion.tiene_contacto_en_embajada,
                    nombre_contacto_en_embajada: datosDeIdentificacion.contacto_embajada.nombre,
                    contactoDeEmbajada_id: datosDeIdentificacion.contacto_embajada.id,
                    telefono_contacto_en_embajada: datosDeIdentificacion.contacto_embajada.numero,
                    pais_embajada: datosDeIdentificacion.contacto_embajada.pais?.id ? datosDeIdentificacion.contacto_embajada.pais.id : 0,
                    departamento: datosDeIdentificacion.departamento,
                    ciudad: datosDeIdentificacion.ciudad,
                }
            })
        }
    }, [datosDeIdentificacion]);


    /**
     * Estado que actualiza el estado general cada vez que hay una modificacion en el estado de
     *  ciudad de nacimiento seleccionado
     * */
    useEffect(() => {
        console.log(selectedCity)
        setDatosPersonalesState((prev: any) => ({
            ...prev,
            lugarDeNacimiento: selectedCity.id
        }))
    }, [selectedCity]);


    /**
     * Efecto que carga el estado del autocomplete de cidad de naciomiento si es que hay datos iniciales y si ya esta
     * cargado el estado de lista de ciudades* */
    useEffect(() => {

        if (datosDeIdentificacion.lugarDeNacimiento && ciudadLista.length > 0) {
            const lugarEncontrado = ciudadLista.find(item => item.id == parseInt(datosDeIdentificacion.lugarDeNacimiento))
            setSelectedCity(lugarEncontrado)
        }

    }, [datosDeIdentificacion.ciudad, ciudadLista]);


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

    const onDatoChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {

        const {value} = event.target;

        const regex = /^\+?[0-9\(\)\s]*\.?[0-9\(\)\s]*$/;

        if (value.match(regex)) {
            setDatosPersonalesState(
                (prev) => {
                    return (
                        {
                            ...prev,
                            [event.target.name]: value

                        }
                    )
                }
            )
        }

    }

    const onDatoSelectChange = (event: SelectChangeEvent<number | string | null>) => {
        const nombreSelect = event.target.name
        const valorSelect = event.target.value

        if (nombreSelect == 'departamento') {
            setDatosPersonalesState((prev: any) => ({
                ...prev,
                ciudad: 0,
                [nombreSelect]: valorSelect
            }))
        } else {

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

    const extranjeroValidator = () => {
        let esValidado = true
        if (datosPersonalesState.tiene_contacto_en_embajada) {
            if (!datosPersonalesState.nombre_contacto_en_embajada && !datosPersonalesState.telefono_contacto_en_embajada && !datosPersonalesState.pais_embajada) {
                esValidado = false
            }

        }

        return esValidado
    }


    const onDatosPersonalesSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (sessionData) {
            setConsultaLoading(true)

            if (datosPersonalesState.departamento && datosPersonalesState.ciudad && datosPersonalesState.estadoCivil && extranjeroValidator()) {
                const methodForm = datosDeIdentificacion.id_datos_personales ? 'PUT' : 'POST';
                const url = datosDeIdentificacion.id_datos_personales ?
                    `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_personales/${datosDeIdentificacion.id_datos_personales}`
                    : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_personales/`
                const datosDelFormulario: datosPersonales = Object.assign({}, datosPersonalesState);


                const respuesta = await api_request(url, {
                    method: methodForm,
                    body: JSON.stringify(datosDelFormulario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (respuesta.success) {

                    setDatosPersonalesState(prev => ({
                        ...prev,
                        id: respuesta.datos.id,
                    }))
                    setConsultaLoading(false)
                    openSnackbar("Datos guardados correctamente", "success")
                    /*if (pathname.startsWith('/ppl')) {
                        window.location.reload();
                    }*/
                } else {
                    if (respuesta.error) {
                        setConsultaLoading(false)
                        openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`, `error`);
                        log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                    }
                }
            } else {
                openSnackbar('Completar campos requerido', 'warning')
                setConsultaLoading(false)
            }
        } else {
            openSnackbar('No tienes permiso para realizar esta accion', 'warning')
        }


        // console.log("Respuesta:", respuesta);

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
        )
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
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id='tipo-doc-label'>Tipo de documento</InputLabel>
                        <Select
                            disabled
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
                    <FormControl fullWidth={true} className='fechaNacimientoField'>
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
                    <FormControl fullWidth={true}
                                 error={datosPersonalesState.estadoCivil == 0 || datosPersonalesState.estadoCivil == null}>
                        <InputLabel htmlFor="estado_civil">
                            Estado Civil
                        </InputLabel>
                        <Select
                            id="estado_civil_id"
                            name="estadoCivil"
                            label='Estado Civil'
                            value={datosPersonalesState.estadoCivil ? datosPersonalesState.estadoCivil : 0}
                            onChange={onDatoSelectChange}
                        >
                            <MenuItem value={0}>Seleccionar estado civil</MenuItem>
                            {estadosCiviles ? estadosCiviles.map(
                                (estadoCivil, id) => {
                                    return (
                                        <MenuItem key={id} value={estadoCivil.id}>{estadoCivil.nombre}</MenuItem>
                                    )
                                }
                            ) : null}
                        </Select>
                        <FormHelperText>* Campo requerido</FormHelperText>
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

                    <FormControl fullWidth>
                        <Autocomplete
                            fullWidth={true}
                            value={selectedCity ? selectedCity : null}
                            onChange={(event, newValue: any) => {
                                // @ts-ignore
                                setSelectedCity((prev: any) => ({
                                    ...newValue
                                }));
                            }}
                            id="controllable-states-demo"
                            options={ciudadLista}
                            getOptionLabel={(option) => option.nombre ? `${option.nombre}` : 'Seleccionar ciudad'}
                            renderInput={(params) => <TextField {...params} label="Ciudades"/>}
                        />
                    </FormControl>

                </Grid>

                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Número de contacto"
                        name="numeroDeContacto"
                        value={datosPersonalesState.numeroDeContacto ? datosPersonalesState.numeroDeContacto : ''}
                        onChange={onDatoChangeNumber}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Nombre de contacto de emergencia 1"
                            fullWidth
                            name="nombreDeContactoDeEmergencia1"
                            value={datosPersonalesState.nombreDeContactoDeEmergencia1 ? datosPersonalesState.nombreDeContactoDeEmergencia1 : ''}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Contacto de emergencia 1"
                            fullWidth
                            name="contactoDeEmergencia1"
                            value={datosPersonalesState.contactoDeEmergencia1 ? datosPersonalesState.contactoDeEmergencia1 : ''}
                            onChange={onDatoChangeNumber}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label=" Nombre de contacto de emergencia 2"
                            fullWidth
                            name="nombreDeContactoDeEmergencia2"
                            value={datosPersonalesState.nombreDeContactoDeEmergencia2 ? datosPersonalesState.nombreDeContactoDeEmergencia2 : ''}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Contacto de emergencia 2"
                            fullWidth
                            name="contactoDeEmergencia2"
                            value={datosPersonalesState.contactoDeEmergencia2 ? datosPersonalesState.contactoDeEmergencia2 : ''}
                            onChange={onDatoChangeNumber}
                        />
                    </FormControl>
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>
                        Datos de residencia
                    </Typography>
                </Grid>
                <Grid item sm={4}>

                    <FormControl fullWidth variant="outlined" error={datosPersonalesState.departamento == 0}>
                        <InputLabel>Departamento</InputLabel>
                        <Select
                            value={datosPersonalesState.departamento ? datosPersonalesState.departamento : 0}
                            onChange={onDatoSelectChange}
                            label="Departamento"
                            name="departamento"
                        >

                            <MenuItem value={0}>Seleccionar departamento</MenuItem>
                            {departamentosLista.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                            ))}


                        </Select>
                        <FormHelperText>* Campo requerido</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={4}>
                    <FormControl fullWidth variant="outlined" error={datosPersonalesState.ciudad == 0}>
                        <InputLabel>Ciudad! - {datosPersonalesState.ciudad} </InputLabel>
                        <Select
                            value={datosPersonalesState.ciudad}
                            onChange={onDatoSelectChange}
                            label="Ciudad"
                            name="ciudad"
                            disabled={!datosPersonalesState.departamento}
                        >
                            {/*{console.log('Departamento seleccionado', datosPersonalesState.departamento)}
                            {console.log('lista de ciudades', ciudadLista)}*/}
                            <MenuItem value={0}>Seleccionar ciudad</MenuItem>

                            {ciudadLista.map((item: any, index) => {
                                if (item.departamento.id == datosPersonalesState.departamento) {
                                    return (
                                        <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                    )
                                }
                            })}

                        </Select>
                        <FormHelperText>* Campo requerido</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="Direccion"
                        name="direccion"
                        value={datosPersonalesState.direccion}
                        onChange={onDatoChange}
                    />
                </Grid>
                {/* Seccion extranjeros*/}
                {/*{datosDeIdentificacion.es_extranjero || datosPersonalesState.nacionalidad !== 1 ?*/}
                {datosPersonalesState.es_extranjero || datosPersonalesState.nacionalidad !== 1 ?
                    (<Grid item sm={12}>
                        <Grid container spacing={2} my={2}>
                            <Grid item sm={12}>
                                <Typography variant='h6'>
                                    Datos de Extranjeros
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <FormLabel>Mantiene contacto con la embajada:</FormLabel>
                                    <RadioGroup
                                        value={datosPersonalesState.tiene_contacto_en_embajada}
                                        onChange={onOptionSelectChange}
                                        row
                                        aria-labelledby="mantiene_contacto_con_consulado_o_embajada"
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
                                        <Grid item xs={4}>
                                            <TextField
                                                helperText='* Campo requerido'
                                                error={!datosPersonalesState.nombre_contacto_en_embajada}
                                                fullWidth
                                                name='nombre_contacto_en_embajada'
                                                label='Nombre de contacto de embajada'
                                                onChange={onDatoChange}
                                                value={datosPersonalesState.nombre_contacto_en_embajada}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                helperText='* Campo requerido'
                                                error={!datosPersonalesState.telefono_contacto_en_embajada}
                                                fullWidth
                                                name='telefono_contacto_en_embajada'
                                                label='Número de contacto de embajada'
                                                onChange={onDatoChange}
                                                value={datosPersonalesState.telefono_contacto_en_embajada}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel id='pais-embajada-labe'>Pais de embajada</InputLabel>
                                                <Select

                                                    error={!datosPersonalesState.pais_embajada}
                                                    labelId='pais-embajada-label'
                                                    value={datosPersonalesState.pais_embajada ? datosPersonalesState.pais_embajada : 0}
                                                    onChange={onDatoSelectChange}
                                                    label="Pais de embajada"
                                                    name="pais_embajada"
                                                >
                                                    <MenuItem value={0}>Seleccionar un país</MenuItem>
                                                    {paises ? paises.map(
                                                        (data, id) => {
                                                            return (
                                                                <MenuItem key={data.id}
                                                                          value={data.id}>{data.nombre}</MenuItem>
                                                            )
                                                        }
                                                    ) : null}


                                                </Select>
                                                <FormHelperText>* Campo requerido</FormHelperText>
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
                <Grid item xs={12}>
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
                                    <MenuItem value={'471'}>Ayoreo</MenuItem>
                                    <MenuItem value={'472'}>Ybytoso</MenuItem>
                                    <MenuItem value={'473'}>Tomárãho</MenuItem>

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
                {(sessionData) &&
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
                                startIcon={<SaveIcon/>}
                                loadingPosition='start'

                                variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                            </LoadingButton>

                        </Stack>
                    </Grid>
                }
            </Grid>
        </Box>
    )
}

export default BloqueDatosPersonales;
