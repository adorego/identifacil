'use client'

import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField, Typography
} from "@mui/material";
import {DatePicker, DateValidationError, MobileDatePicker, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {FC, useEffect, useState} from "react";
import {Save, Storage, Sort} from '@mui/icons-material';
import dayjs, {Dayjs} from "dayjs";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";
import es from 'dayjs/locale/es'; // Importa el locale español

dayjs.locale(es); // Configura dayjs globalmente al español
import log from "loglevel";
export interface IdentificacionProps {
    habilitarBotonSiguiente: (arg0: boolean) => void;
    actualizarIdentificacion: (arg0: DatosDeIdentificacion) => void;
}

interface alternativasDelFormulario {
    paraguayo: boolean;
    conDocumentoDeIdentidad: boolean;
}

const alternativasFormularioInicial: alternativasDelFormulario = {
    paraguayo: true,
    conDocumentoDeIdentidad: true,
}

const IdentificacionForm: FC<IdentificacionProps> = (props: IdentificacionProps) => {
    const [alternativaFormulario, setAlternativaFormulario] = useState<alternativasDelFormulario>(alternativasFormularioInicial);
    const {openSnackbar} = useGlobalContext();

    useEffect(
        () => {
            props.habilitarBotonSiguiente(false);
        }, [alternativaFormulario]
    )

    const onNacionalidadChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlternativaFormulario(
            (previus: alternativasDelFormulario) => {
                return {
                    ...previus,
                    paraguayo: event.target.value === "true" ? true : false,
                }
            }
        )
    }

    const onTieneCedulaChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlternativaFormulario(
            (previus: alternativasDelFormulario) => {
                return {
                    ...previus,
                    conDocumentoDeIdentidad: event.target.value === "true" ? true : false,
                }
            }
        )
    }

    return (
        <Box sx={{padding: "10px"}} component={'form'} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant='h6' textTransform='uppercase'>
                        Datos policiales!
                    </Typography>
                </Grid>
                <Grid item sm={6}>
                    <FormLabel id="nacionalidad">¿Tiene Cédula Paraguaya?</FormLabel>
                    <RadioGroup row defaultValue="SI" onChange={onNacionalidadChangeHandler}
                                value={alternativaFormulario.paraguayo} name="nacionalidad-opciones">
                        <FormControlLabel value={true} control={<Radio/>} label="SI"/>
                        <FormControlLabel value={false} control={<Radio/>} label="NO"/>
                    </RadioGroup>
                </Grid>
                <Grid item sm={6}>
                    {!alternativaFormulario.paraguayo ?
                    (
                        <>

                        <FormLabel id="nacionalidad">¿Tiene documento de identidad ?</FormLabel>
                    <RadioGroup row defaultValue="NO" onChange={onTieneCedulaChangeHandler}
                                value={alternativaFormulario.conDocumentoDeIdentidad} name="cedula-opciones">
                        <FormControlLabel value={true} control={<Radio/>} label="SI"/>
                        <FormControlLabel value={false} control={<Radio/>} label="NO"/>
                    </RadioGroup>
                        </>
                        )
                    : null}
                </Grid>
            </Grid>
            {alternativaFormulario.conDocumentoDeIdentidad && alternativaFormulario.paraguayo &&
                <FormularioConCedulaParaguaya
                    habilitarBotonSiguiente={props.habilitarBotonSiguiente}
                    actualizarIdentificacion={props.actualizarIdentificacion}/>}
            {!alternativaFormulario.paraguayo && alternativaFormulario.conDocumentoDeIdentidad &&
                <FormularioParaExtranjero
                    habilitarBotonSiguiente={props.habilitarBotonSiguiente}
                    actualizarIdentificacion={props.actualizarIdentificacion}/>}
            {!alternativaFormulario.conDocumentoDeIdentidad &&
                <FormularioParaPPLSinDocumento
                    habilitarBotonSiguiente={props.habilitarBotonSiguiente}
                    actualizarIdentificacion={props.actualizarIdentificacion}/>}
        </Box>
    )
}

export default IdentificacionForm;

export interface DatosDeIdentificacion {
    id_persona: number | null;
    cedula_identidad?: string | null;
    numeroDeIdentificacion?: string;
    prontuario?: string;
    tipo_identificacion?: number;
    es_extranjero: boolean;
    tiene_cedula: boolean;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    codigo_genero: number;
    foto: string;
}

const datosInicialesDelFormularioDeIdentificacion: DatosDeIdentificacion = {
    id_persona: null,
    cedula_identidad: "",
    prontuario: "",
    es_extranjero: false,
    tiene_cedula: true,
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    codigo_genero: 0,
    foto: '',
}

interface DatosCedulaDTO {
    datosDeCedula: {
        cedula_identidad: string;
        nombres: string;
        apellidos: string;
        fecha_nacimiento: string;
        codigo_genero: number;
    },
    exito: boolean;
}

const FormularioConCedulaParaguaya: FC<IdentificacionProps> = (props: IdentificacionProps) => {
    const [cedula, setCedula] = useState<string>("");
    const [formularioDeDatosDeIdentificacion, setFormularioDeDatosDeIdentificacion] = useState<DatosDeIdentificacion>(datosInicialesDelFormularioDeIdentificacion)
    const [consultaLoading, setConsultaLoading] = useState(false)
    const [stateEsPPL, setStateEsPPL] = useState<Boolean>(false)
    const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

    const {openSnackbar} = useGlobalContext();
    // console.log("Formulario:", formularioDeDatosDeIdentificacion);

    const consultarPPL = async (cedula:string | null) =>{

        const esMenor = (dayjs().diff(dayjs(formularioDeDatosDeIdentificacion.fecha_nacimiento), 'year') < 18)

        if(cedula !== null){

            try{

                await fetch(`${API_URL}/gestion_ppl/ppls/cedula/${cedula}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if(data.establecimiento){
                            openSnackbar('Esta persona ya se encuentra registrada como PPL', 'warning')
                            props.habilitarBotonSiguiente(false);
                            setStateEsPPL(true)
                        }else{
                            console.log('holaaaaaa')
                            props.habilitarBotonSiguiente(true);
                            setStateEsPPL(false)
                        }
                    }).catch(err=>{
                        console.log(err)
                        setStateEsPPL(false)
                        if(!esMenor){
                            props.habilitarBotonSiguiente(true);
                        }else{
                            props.habilitarBotonSiguiente(false);
                        }
                    })
            } catch (error) {
                console.log('Esta persona no existe en la base datos como PPL', 'success')
                setStateEsPPL(false)
            }
        }


    }


    useEffect(() => {
        if(formularioDeDatosDeIdentificacion.cedula_identidad !== undefined){
            // @ts-ignore
            if(formularioDeDatosDeIdentificacion.cedula_identidad?.length > 0) {
                consultarPPL(formularioDeDatosDeIdentificacion.cedula_identidad)
                console.log('termino consulta de cedula es PPL?')
            }
        }

    }, [formularioDeDatosDeIdentificacion.cedula_identidad]);


    const onCedulaChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCedula(event.target.value);
    }

    /** Se realiza consulta a los datos de la policia para obtener los datos del PPL paraguayo y con cedula
     * */
    const onConsultarRegistroCivil = async () => {
        console.log('consula estado civil')

        setConsultaLoading(true)
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_CONSULTACI_API}/get_datos_ci/`;
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', '*/*');
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                body: JSON.stringify({"cedula": cedula})
            });
            if (response.ok) {
                const data: DatosCedulaDTO = await response.json();

                if (data.exito && data.datosDeCedula.nombres != "") {
                    // console.log(data);
                    // se verifica que los datos de la persona a ingresar sea mayor a 18 años
                    const datosDeidentificacionAGenerar = {
                        ...data.datosDeCedula,
                        tiene_cedula: true,
                        es_extranjero: false,
                        id_persona: null,
                        foto: ''
                    }
                    if (dayjs().diff(dayjs(data.datosDeCedula.fecha_nacimiento), 'year') < 18) {
                        setFormularioDeDatosDeIdentificacion(datosDeidentificacionAGenerar)
                        props.actualizarIdentificacion(datosDeidentificacionAGenerar);
                        console.log('es menor')
                        openSnackbar('Persona no puede ingresar. Debe ser mayor de edad', 'error')
                        setConsultaLoading(false)

                    } else {
                        console.log('es es mayor')
                        setFormularioDeDatosDeIdentificacion(datosDeidentificacionAGenerar)
                        props.actualizarIdentificacion(datosDeidentificacionAGenerar);
                        if(!stateEsPPL){
                            props.habilitarBotonSiguiente(true);
                        }else{
                            props.habilitarBotonSiguiente(false);
                        }
                        setConsultaLoading(false)
                    }

                }
            } else {
                log.error("Error al consultar el documento:", await response.json())
            }


        } catch (error) {
            log.error("Hubo un error durante la consulta de la CI:", error);
            openSnackbar("Error al consultar los datos", "error");
            setConsultaLoading(false)
            // setError({error:true, msg:'Hubo un error en la consulta de la cedula'})
        }

    }

    return (
        <>
            <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField autoComplete="off"
                               id="cedula"
                               value={cedula}
                               name="cedula"
                               onChange={onCedulaChangeHandler}
                               fullWidth
                               label={"Ingrese cedula paraguaya"}
                               variant="outlined"
                               required/>
                </Grid>
                <Grid item xs={2}>
                    <LoadingButton
                        sx={{
                            minHeight: "100%",
                            px: "40px",
                        }}
                        onClick={onConsultarRegistroCivil}
                        loading={consultaLoading}
                        loadingPosition='end'
                        variant="contained"
                        endIcon={<Sort/>}>
                        <span>Consultar</span>
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField
                        id="nombres"
                        name="nombres"
                        value={formularioDeDatosDeIdentificacion.nombres}
                        fullWidth
                        label="Nombres"
                        variant="outlined"
                        disabled={true}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="apellido"
                        name="apellidos"
                        value={formularioDeDatosDeIdentificacion.apellidos}
                        fullWidth
                        label="Apellidos"
                        variant="outlined"
                        disabled={true}/>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        disabled
                        value={formularioDeDatosDeIdentificacion.fecha_nacimiento}
                        label="Fecha de Nacimiento"/>

                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="genero"
                            name="genero"
                            value={formularioDeDatosDeIdentificacion.codigo_genero == 1 ? 'femenino' : formularioDeDatosDeIdentificacion.codigo_genero == 2 ? 'masculino' : ''}
                            fullWidth
                            label="Genero"
                            variant="outlined"
                            disabled={true}/>
                    </FormControl>
                </Grid>


            </Grid>
        </>
    )
}







interface DatosDeIdentificacionExtranjero {
    id_persona: number | null;
    numeroDeIdentificacion: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Dayjs | null;
    codigo_genero: number;
}

const datosInicialesDeFormularioDeExtranjero = {
    id_persona: null,
    numeroDeIdentificacion: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: null,
    codigo_genero: 2,
}



const FormularioParaExtranjero: FC<IdentificacionProps> = (props: IdentificacionProps) => {
    const [formularioDeDatosDeIdentificacion, setFormularioDeDatosDeIdentificacion] =
        useState<DatosDeIdentificacionExtranjero>(datosInicialesDeFormularioDeExtranjero);
    const {openSnackbar} = useGlobalContext();


    const onGuardarHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(formularioDeDatosDeIdentificacion);

        if (formularioDeDatosDeIdentificacion.fecha_nacimiento
            && formularioDeDatosDeIdentificacion.nombres.length > 2
            && formularioDeDatosDeIdentificacion.apellidos.length > 2
            && formularioDeDatosDeIdentificacion.numeroDeIdentificacion.length > 1
            && formularioDeDatosDeIdentificacion.codigo_genero) {

            props.actualizarIdentificacion({
                ...formularioDeDatosDeIdentificacion,
                fecha_nacimiento: formularioDeDatosDeIdentificacion.fecha_nacimiento.toISOString(),
                numeroDeIdentificacion: formularioDeDatosDeIdentificacion.numeroDeIdentificacion,
                tiene_cedula: true,
                es_extranjero: true,
                id_persona: null,
                foto: '',
            });
            const esMenor = (dayjs().diff(dayjs(formularioDeDatosDeIdentificacion.fecha_nacimiento), 'year') < 18)
            console.log(esMenor)
            console.log(formularioDeDatosDeIdentificacion.fecha_nacimiento)
            if(esMenor){
                openSnackbar("No se puede registar menores de edad.", "error");
                props.habilitarBotonSiguiente(false);
            }else{
                props.habilitarBotonSiguiente(true);
            }
        } else {
            openSnackbar("Los campos de estar completos", "error");
        }

    }

    const onGeneroChangeHandler = (event: SelectChangeEvent<number>) => {
        setFormularioDeDatosDeIdentificacion(
            (previus) => {
                return {
                    ...previus,
                    codigo_genero: typeof (event.target.value) === 'string' ? parseInt(event.target.value) : event.target.value
                }
            }
        )
    }

    const onChangeFechaDeNacimiento = (value: Dayjs | null) => {
        setFormularioDeDatosDeIdentificacion(
            (previus) => {
                return {
                    ...previus,
                    fecha_nacimiento: value
                }
            }
        )
    }

    const onTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormularioDeDatosDeIdentificacion(
            (estadoPrevio) => {
                return {
                    ...estadoPrevio,
                    [event.target.name]: event.target.value
                }
            }
        )
    }
    return (
        <Box component={'form'} autoComplete="off">

            <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField
                        autoComplete='off'
                        id="numeroDeIdentificacion"
                        value={formularioDeDatosDeIdentificacion.numeroDeIdentificacion}
                        name="numeroDeIdentificacion"
                        onChange={onTextChangeHandler}
                        fullWidth
                        label={"Ingrese número de identificación extranjera"}
                        variant="outlined"
                        required/>
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="nombres"
                        name="nombres"
                        value={formularioDeDatosDeIdentificacion.nombres}
                        fullWidth
                        onChange={onTextChangeHandler}
                        label="Nombres"
                        variant="outlined"
                        required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="apellido"
                        name="apellidos"
                        value={formularioDeDatosDeIdentificacion.apellidos}
                        fullWidth
                        onChange={onTextChangeHandler}
                        label="Apellidos"
                        variant="outlined"
                        required/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                        <MobileDatePicker
                            value={formularioDeDatosDeIdentificacion.fecha_nacimiento ? dayjs(formularioDeDatosDeIdentificacion.fecha_nacimiento) : null}
                            format="DD/MM/YYYY"
                            maxDate={dayjs().subtract(18, 'year')}
                            onChange={(newValue) => {
                                const esMenor = (dayjs().diff(dayjs(newValue), 'year') < 18)
                                if (esMenor){
                                    openSnackbar('No se puede registrar un menor.', 'error')
                                    onChangeFechaDeNacimiento(null)
                                } else {
                                    onChangeFechaDeNacimiento(newValue)
                                }


                            }}
                            label={"Fecha de nacimiento"}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="id_selector_genero">
                            Genero
                        </InputLabel>
                        <Select
                            id="id_selector_genero"
                            label="Genero"
                            onChange={onGeneroChangeHandler}
                            value={formularioDeDatosDeIdentificacion.codigo_genero}>
                            <MenuItem value={1}>Femenino</MenuItem>
                            <MenuItem value={2}>Masculino</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        sx={{minHeight: "100%"}}
                        onClick={onGuardarHandler}
                        variant="contained"
                        endIcon={<Save/>}>
                        Guardar
                    </Button>
                </Grid>


            </Grid>
        </Box>

    )


}

interface DatosDeIdentificacionSinCedula {
    id_persona: number | null;
    prontuario: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Dayjs | null;
    codigo_genero: number;
}

const datosInicialesDeFormularioDePPLSinCedula = {
    id_persona: null,
    prontuario: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: null,
    codigo_genero: 2,
}

const FormularioParaPPLSinDocumento: FC<IdentificacionProps> = (props: IdentificacionProps) => {
    const [
        formularioDeDatosDeIdentificacion,
        setFormularioDeDatosDeIdentificacion
    ] = useState<DatosDeIdentificacionSinCedula>(datosInicialesDeFormularioDePPLSinCedula);
    const {openSnackbar} = useGlobalContext();


    // console.log("Formulario:", formularioDeDatosDeIdentificacion);

    const onGuardarHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Fecha de nacimiento:", formularioDeDatosDeIdentificacion.fecha_nacimiento?.toISOString());

        if (formularioDeDatosDeIdentificacion.fecha_nacimiento
            && formularioDeDatosDeIdentificacion.nombres.length > 2
            && formularioDeDatosDeIdentificacion.apellidos.length > 2
            && formularioDeDatosDeIdentificacion.prontuario.length > 1
            && formularioDeDatosDeIdentificacion.codigo_genero) {

            props.actualizarIdentificacion({
                ...formularioDeDatosDeIdentificacion,
                fecha_nacimiento: formularioDeDatosDeIdentificacion.fecha_nacimiento.toISOString(),
                tiene_cedula: false,
                es_extranjero: false,
                id_persona: null,
                foto: '',
            });

            props.habilitarBotonSiguiente(true);
        } else {
            openSnackbar("Los campos deben estar completos antes de guardar", "error");
        }

    }

    const onGeneroChangeHandler = (event: SelectChangeEvent<number>) => {
        setFormularioDeDatosDeIdentificacion(
            (previus) => {
                return {
                    ...previus,
                    codigo_genero: typeof (event.target.value) === 'string' ? parseInt(event.target.value) : event.target.value
                }
            }
        )
    }
    const onChangeFechaDeNacimiento = (value: Dayjs | null) => {
        setFormularioDeDatosDeIdentificacion(
            (previus) => {
                return {
                    ...previus,
                    fecha_nacimiento: value
                }
            }
        )
    }
    const onTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormularioDeDatosDeIdentificacion(
            (estadoPrevio) => {
                return {
                    ...estadoPrevio,
                    [event.target.name]: event.target.value
                }
            }
        )
    }
    return (
        <>
            {console.log(formularioDeDatosDeIdentificacion)}
            <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                    <TextField autoComplete="off"
                               id="prontuario"
                               value={formularioDeDatosDeIdentificacion.prontuario}
                               name="prontuario"
                               onChange={onTextChangeHandler}
                               fullWidth
                               label={"Ingrese número de prontuario"}
                               variant="outlined"
                               required/>
                </Grid>

                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="nombres"
                        name="nombres"
                        value={formularioDeDatosDeIdentificacion.nombres}
                        fullWidth
                        onChange={onTextChangeHandler}
                        label="Nombres"
                        variant="outlined"
                        required/>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="apellido"
                        name="apellidos"
                        value={formularioDeDatosDeIdentificacion.apellidos}
                        fullWidth
                        onChange={onTextChangeHandler}
                        label="Apellidos"
                        variant="outlined"
                        required/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                        <MobileDatePicker
                            value={formularioDeDatosDeIdentificacion.fecha_nacimiento ? dayjs(formularioDeDatosDeIdentificacion.fecha_nacimiento) : null}
                            format="DD/MM/YYYY"
                            maxDate={dayjs().subtract(18, 'year')}
                            onChange={(newValue) => {
                                const esMenor = (dayjs().diff(dayjs(newValue), 'year') < 18)
                                if (esMenor){
                                    openSnackbar('No se puede registrar un menor.', 'error')
                                    onChangeFechaDeNacimiento(null)
                                } else {
                                    onChangeFechaDeNacimiento(newValue)
                                }


                            }}
                            label={"Fecha de nacimiento"}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="id_selector_genero">
                            Genero
                        </InputLabel>
                        <Select
                            id="id_selector_genero"
                            label="Genero"
                            onChange={onGeneroChangeHandler}
                            value={formularioDeDatosDeIdentificacion.codigo_genero}>
                            <MenuItem value={1}>Femenino</MenuItem>
                            <MenuItem value={2}>Masculino</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        sx={{minHeight: "100%"}}
                        onClick={onGuardarHandler}
                        variant="contained"
                        endIcon={<Save/>}>
                        Guardar
                    </Button>
                </Grid>


            </Grid>
        </>

    )


}

