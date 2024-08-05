import {
    Alert,
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Grid, IconButton,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack, TextField,
    Typography
} from "@mui/material";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {api_request} from "@/lib/api-request";
import {datosIncialesJudiciales, datosJudicialesInicial, datosJudicialesType} from "@/components/utils/systemTypes";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {MuiFileInput} from "mui-file-input";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";
import FormExpedientesEmebed from "@/app/(sistema)/ppl/components/formExpedientesEmbed";
import {Close} from "@mui/icons-material";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {LoadingButton} from "@mui/lab"; // Importa el locale español
import {DatePicker, LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";

import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import es from 'dayjs/locale/es';
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

dayjs.locale(es); // Configura dayjs globalmente al español

interface BloqueJudicialProps {
    datosIniciales?: datosIncialesJudiciales | null;
    id_persona: number;
    numero_documento?: string | null;
    handleAccordion?: (s: string) => void;
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;

}

type DocsOrdenanType = Array<{
    fecha: string;
    id: number
    numero_documento: string;
    tipo: string;
    ruta: string;
}>;

const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';

const BloqueJudicial: FC<BloqueJudicialProps> = (
    {
        datosIniciales = null,
        id_persona, numero_documento = null,
        handleAccordion,
        onSetDatosPPL
    }) => {

    /** 1. Formulario con datos capturados **/
    const [estadoFormularioJudicial, setEstadoFormularioJudicial] = useState<datosJudicialesType>(datosJudicialesInicial)

    /** 2. Formulario verificar campos incompletos **/
    const [stateErrors, setStateErrors] = useState<any>({})

    /** 3. Formulario para validacion de errores. Deprecado **/
    const [validateFormValueState, setValidateFormValueState] = useState<boolean>(false)

    /** 4. Contiene los datos para poblar el select de Expediente**/
    const [datosFormulario, setDatosFormulario] = useState<any>({})

    /** 5. Formulario con datos capturados **/
    const [showExpdientesForm, setShowExpdientesForm] = useState(false)

    /** 6. Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    const {data: session}: { data: any; } = useSession();
    const sessionData = PermissionValidator('crear_ppl_form_judiciales', session) || PermissionValidator('actualizar_ppl_form_judiciales', session);
    const {openSnackbar} = useGlobalContext();
    const isEditMode = !!datosIniciales?.id;
    const router: AppRouterInstance = useRouter();

    /** Este useEffect se ejecuta una vez al cargarse toda la pagina si es que existen DATOS INICIALES **/
    useEffect(() => {

        // Se obtienen datos de expedientes existentes para poblar lista de expedientes.
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`).then(res => {
            console.log('Datos recibidos de oficios, ', res)
            // Se guardan datos en estado de formulario
            setDatosFormulario((prev: any) => ({
                ...prev,
                expedientes: res
            }))
        }).finally(() => {

            // Se cargan en estado del formulario id_persona, establecimiento y ID de registro existente.
            setEstadoFormularioJudicial(prev => ({
                ...prev,
                id_persona: id_persona,
                establecimiento_penitenciario: 1,
                id: datosIniciales?.id ? datosIniciales.id : 0,
            }))

            // Datos inciales flag es para verificar si es que se actualizao ID de formulario desde la creacion POST
            // @ts-ignore
            if (datosIniciales !== null && datosIniciales.flag && datosIniciales) {


                // Se cargan datos iniciales a estado de formulario.
                setEstadoFormularioJudicial((prev: any) => ({
                    ...prev,
                    ...datosIniciales
                }))

                // Si existe un expediente en los datos iniciales se carga en el estado auxiliar de datos de formulario
                setDatosFormulario((prev: any) => ({
                    ...prev,
                    expedientesSeleccionados: datosIniciales.expediente_obj ? datosIniciales.expediente_obj : null
                }));

            } else {
                // Se verifica que existan datos iniciales para cargar el estado y si existe datos de ingreso a prision
                if (datosIniciales !== null && datosIniciales !== undefined && datosIniciales.ingresos_a_prision !== undefined) {


                    const datos_ingreso_prision = datosIniciales.ingresos_a_prision[0];

                    /**
                     * Se guarda en variable el objeto que tenga coincida con la condicion y sea un documento
                     *  de oficio judicial y una resolucion MJ respectivamente
                     * */
                    const oficioJudicialBuscado: any = datos_ingreso_prision.documentos_que_ordenan_prision?.find((documento: any) => documento.tipo === "oficio_judicial");
                    const resolucionBuscado: any = datos_ingreso_prision.documentos_que_ordenan_prision?.find((documento: any) => documento.tipo === "resolucion_mj");


                    // Se guardan expedientes judiciales existentes a estado si existen
                    if (datos_ingreso_prision.expedienteJudicial !== undefined && datos_ingreso_prision.expedienteJudicial !== null) {

                        // Se guarda en auxiliar el objeto del expediente
                        setDatosFormulario((prev: any) => ({
                            ...prev,
                            expedientesSeleccionados: datos_ingreso_prision.expedienteJudicial
                        }));

                        // Se guarda en formulario el ID del expediente seleccionado
                        setEstadoFormularioJudicial(prev => ({
                            ...prev,
                            expediente_id: datos_ingreso_prision.expedienteJudicial.id
                        }))
                    }

                    // Funcion para bajar archivo desde la URL del GET para volver a convertir a archivo
                    const descargarArchivos = async (archivoURL: string, propiedad: string) => {
                        const fileBlob = await downloadFile(archivoURL);
                        const file = new File([fileBlob], `${archivoURL.split('/').pop()}`, {type: fileBlob.type});


                        /** seteador de estado para guardaar la url de un archivo preguardado y mostrar*/
                        setDatosFormulario((prev: any) => ({
                            ...prev,
                            [propiedad]: archivoURL,
                        }))

                        setEstadoFormularioJudicial((prev: any) => ({
                            ...prev,
                            [propiedad]: file,
                        }))


                    }

                    descargarArchivos(`${ASSETS_URL}${oficioJudicialBuscado.ruta}`, 'oficioJudicial_documento')

                    descargarArchivos(`${ASSETS_URL}${resolucionBuscado.ruta}`, 'resolucion_documento')

                    // TODO Arreglar tipo aca
                    setEstadoFormularioJudicial((prev: any) => ({
                        ...prev,
                        id: datosIniciales.id, // ID DEL FORMULARIO JUDICIAL
                        primeraVezEnPrision: datosIniciales.primera_vez_en_prision,
                        cantidadDeIngresos: datosIniciales.cantidad_de_veces_que_ingreso,
                        fecha_ingreso_a_establecimiento: datos_ingreso_prision.fecha_ingreso ? datos_ingreso_prision.fecha_ingreso : '',
                        pabellon: datos_ingreso_prision.pabellon ? datos_ingreso_prision.pabellon : '',
                        celda: datos_ingreso_prision.celda ? datos_ingreso_prision.celda : '',
                        establecimiento_penitenciario: datos_ingreso_prision.establecimiento_penitenciario.id ? datos_ingreso_prision.establecimiento_penitenciario.id : null,

                        // Documento de oficio judicial
                        oficioJudicial_numeroDeDocumento: oficioJudicialBuscado?.numero_documento ? oficioJudicialBuscado.numero_documento : null,
                        oficioJudicial_fechaDeDocumento: oficioJudicialBuscado?.fecha ? dayjs(oficioJudicialBuscado.fecha) : null,


                        // Documento de Resolucion MJ
                        resolucion_numeroDeDocumento: resolucionBuscado ? resolucionBuscado.numero_documento : null,
                        resolucion_fechaDeDocumento: resolucionBuscado.fecha ? dayjs(resolucionBuscado.fecha) : null,
                        // resolucion_documento: resolucionBuscado.ruta? `${ASSETS_URL}${resolucionBuscado.ruta}` : null,
                    }))

                }

                /** Metodo para obetener datos de expedientes y poblar la lista en el form
                 * */

            }
        })

    }, [datosIniciales])

    useEffect(() => {
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`).then(res => {
            // console.log(res[0])
            setDatosFormulario((prev: any) => ({
                ...prev,
                expedientes: res
            }))
        })

    }, [datosFormulario.expedientesSeleccionados]);

    const handleShowExpedientesForm = () => {
        setShowExpdientesForm(!showExpdientesForm)
    }

    const handleExpedienteData = (value: any, caratula: string, expediente: string): void => {
        console.log('Valor devuelto del expediente: ' + value)
        setShowExpdientesForm(false)
        setEstadoFormularioJudicial(prev => ({
            ...prev,
            expediente_id: value,
        }))
        setDatosFormulario((prev: any) => ({
            ...prev,
            expedientesSeleccionados: {
                id: value,
                caratula_expediente: caratula,
                numeroDeExpediente: expediente,
            },
        }))
    }

    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setEstadoFormularioJudicial(
            (prev) => {
                return ({
                    ...prev,
                    [event.target.name]: event.target.value,
                    // [`${event.target.name}_modificado`]: true
                })
            })
    }

    const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: (event.target.value === "true"),
                        //[`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

    const onCleanField = (event: any, nameField: string) => {
        event.preventDefault()
        setDatosFormulario((prev: any) => ({
            ...prev,
            [nameField]: null,
        }))
        setEstadoFormularioJudicial(prev => ({
            ...prev,
            [nameField]: null,
        }))
    }

    const postData = async (url: string, data: any, method: string, headers: any = null) => {
        return await api_request(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: data,
        })
    }

    const postDataJudicial = async (url: string, data: any, method: boolean) => {
        return await api_request(url, {
            method: method ? 'PUT' : 'POST',
            body: data,
        })
    }

    function validateForm() {
        let aux = true;
        const formData = estadoFormularioJudicial;


        if (!datosFormulario.expedientesSeleccionados) {
            console.log('hola 2')
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                expediente_id: 'Expediente es requerido.',
            }))

        } else {
            if (stateErrors.hasOwnProperty('expediente_id')) {
                delete stateErrors['expediente_id'];
            }
        }

        if (formData['oficioJudicial_numeroDeDocumento'] == '') {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                oficioJudicial_numeroDeDocumento: 'Numero de documento de oficio judicial es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('oficioJudicial_numeroDeDocumento')) {
                delete stateErrors['oficioJudicial_numeroDeDocumento'];
            }
        }
        if (formData['oficioJudicial_fechaDeDocumento'] == null) {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                oficioJudicial_fechaDeDocumento: 'Fecha de documento de oficio judicial es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('oficioJudicial_fechaDeDocumento')) {
                delete stateErrors['oficioJudicial_fechaDeDocumento'];
            }
        }
        if (formData['oficioJudicial_documento'] == null) {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                oficioJudicial_documento: 'Documento de oficio judicial es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('oficioJudicial_documento')) {
                delete stateErrors['oficioJudicial_documento'];
            }
        }

        if (formData['resolucion_numeroDeDocumento'] == '') {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                resolucion_numeroDeDocumento: 'Numero de documento de Resolución MJ/DGEP es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('resolucion_numeroDeDocumento')) {
                delete stateErrors['resolucion_numeroDeDocumento'];
            }
        }
        if (formData['resolucion_fechaDeDocumento'] == null) {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                resolucion_fechaDeDocumento: 'Fecha de documento de Resolución MJ/DGEP es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('resolucion_fechaDeDocumento')) {
                delete stateErrors['resolucion_fechaDeDocumento'];
            }
        }
        if (formData['resolucion_documento'] == null) {
            aux = false
            setStateErrors((prev: any) => ({
                ...prev,
                resolucion_documento: 'Documento de Resolución MJ/DGEP es requerido.',
            }))
        } else {
            if (stateErrors.hasOwnProperty('resolucion_documento')) {
                delete stateErrors['resolucion_documento'];
            }
        }


        return aux
    }

    const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (sessionData) {
            setConsultaLoading(true)

            const tipoMehtod = !!estadoFormularioJudicial.id

            const validarFormulario = validateForm()


            // console.log('Validar el form ' + validarFormulario)


            /** Se controla que la persona exista y que pase todas las pruebas del form*/
            if (id_persona != null && validarFormulario) {

                // Se arma URL para creacion o actualizacion de datos judiciales
                const url_dato_judicial = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_judiciales${tipoMehtod ? ('/' + estadoFormularioJudicial.id) : ''}`;

                // Se arma URL para actualizacion de PPL en Expediente seleccionado
                const url_patch_expediente = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes/${datosFormulario.expedientesSeleccionados.id}/ppls`;

                // Se crea el form data para enviar los datos
                const formData = new FormData();

                /** Se obtiene expediente judicial de datos iniciales pre existentes */
                const expedienteInicial = datosIniciales !== null && datosIniciales.ingresos_a_prision !== undefined
                    ? datosIniciales.ingresos_a_prision[0]?.expedienteJudicial?.id
                    : null;

                /** Se arma el formdata para enviar en la peticion POST O PUT */
                Object.keys(estadoFormularioJudicial).forEach((key: string) => {

                    // @ts-ignore
                    const valor = estadoFormularioJudicial[key]

                    switch (typeof valor) {
                        case 'string':
                            formData.append(key, valor as string);
                            break;
                        case 'number':
                            formData.append(key, String(valor));
                            break;
                        case 'object':
                            if (isDayjs(valor)) formData.append(key, valor.toISOString());
                            if (isFile(valor)) formData.append(key, valor);

                            break;
                        case 'boolean':
                            formData.append(key, String(valor));
                            break;

                        default:
                            console.log(typeof valor);

                    }

                })


                /** Solicitud para actualizacion del formulario judicial se verifica que el nuevo expediente seleccionaddo sea diferente al inicial */
                if (estadoFormularioJudicial.expediente_id !== expedienteInicial) {

                    console.log('check 4: Expediente inicial y actualizado son diferentes')

                    Promise.all([
                        await postData(url_patch_expediente, JSON.stringify({ppls: [estadoFormularioJudicial.id_persona]}), 'PATCH').then(res => {
                            console.log('respuestas de peticion patch')
                            if (res.success) {
                                setConsultaLoading(false)
                                openSnackbar('PPL asignado a expediente correctamente')
                                //router.push(`/ppl}`)
                                // router.push(`/ppl/${id_persona}`)
                            }
                        }),
                        await postDataJudicial(url_dato_judicial, formData, tipoMehtod).then(res => {
                            console.log('respuestas de peticion datos judiciales')
                            if (res.success) {
                                setConsultaLoading(false)
                                console.log(res)
                                openSnackbar('Datos judiciales actualizado correctamente')
                                setEstadoFormularioJudicial(prev => ({
                                    ...prev,
                                    id: res.datos.id,
                                }))
                                if (onSetDatosPPL) {
                                    onSetDatosPPL((prev: any) => ({
                                        ...prev,
                                        datosJudiciales: {
                                            ...estadoFormularioJudicial,
                                            id: res.datos.id,
                                            flag: true,
                                            expediente_obj: datosFormulario.expedientesSeleccionados
                                        }
                                    }))
                                }
                                if (handleAccordion) {
                                    handleAccordion('')
                                }
                            }
                        })
                    ]).catch((err) => {
                        console.log(err)
                    }).finally(() => {
                        setConsultaLoading(false)
                    });

                } else {
                    try {
                        await postDataJudicial(url_dato_judicial, formData, isEditMode).then(res => {
                            console.log('respuestas de peticion datos judiciales')
                            if (res.success) {
                                setConsultaLoading(false)
                                if (onSetDatosPPL) {
                                    onSetDatosPPL((prev: any) => ({
                                        ...prev,
                                        datosJudiciales: {
                                            ...estadoFormularioJudicial,
                                            id: res.datos.id,
                                            flag: true,
                                            expediente_obj: datosFormulario.expedientesSeleccionados
                                        }
                                    }))
                                }
                                setEstadoFormularioJudicial(prev => ({
                                    ...prev,
                                    id: res.datos.id,
                                }))
                                openSnackbar('Datos judiciales actualizado correctamente')
                                // router.push(`/ppl`)
                                // router.push(`/ppl/${id_persona}`)
                                if (handleAccordion) {
                                    handleAccordion('')
                                }
                            }

                        })
                    } catch (err) {
                        console.log('err')
                    } finally {
                        setConsultaLoading(false)
                        if (handleAccordion) {
                            handleAccordion('')
                        }
                    }
                }


            } else {
                setConsultaLoading(false)
                openSnackbar("Error al guardar el formulario.", "error");

            }
        } else {
            openSnackbar('No tienes permiso para realizar esta acción', 'warning')
        }
    }


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <Typography variant='h6' mb={3}>
                Formulario de datos judiciales
            </Typography>

            <Grid container mt={2} spacing={2}>
                <Grid item sm={4} alignSelf='center'>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                            <MobileDatePicker
                                value={estadoFormularioJudicial.fecha_ingreso_a_establecimiento ? dayjs(estadoFormularioJudicial.fecha_ingreso_a_establecimiento) : null}
                                format="DD/MM/YYYY"
                                name='fecha_ingreso_a_establecimiento'

                                onChange={(newValue: Dayjs | null) => {
                                    setEstadoFormularioJudicial(prev => ({
                                        ...prev,
                                        fecha_ingreso_a_establecimiento: newValue,
                                        /*fecha_ingreso_a_establecimiento_modificado: true,*/
                                    }))
                                }}
                                label="Fecha de ingreso"/>
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item sm={12} mt={2} alignSelf='center'>
                    <Stack spacing={2} direction={"row"} alignItems='end'>
                        <FormControl>
                            <FormLabel id="primeraVezPrision">Primera vez en prisión:</FormLabel>
                            <RadioGroup
                                value={estadoFormularioJudicial.primeraVezEnPrision}
                                onChange={onSelectChange}
                                row
                                aria-labelledby="primeraVezPrision"
                                name="primeraVezEnPrision">
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

                        {!estadoFormularioJudicial.primeraVezEnPrision &&
                            <FormControl>

                                <TextField
                                    required={true}
                                    disabled={estadoFormularioJudicial.primeraVezEnPrision}
                                    name="cantidadDeIngresos"
                                    value={estadoFormularioJudicial.cantidadDeIngresos}
                                    onChange={onDatoChange}
                                    label="Cantidad de veces de ingreso"/>
                            </FormControl>
                        }

                    </Stack>
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label='Pabellon'
                        name='pabellon'
                        value={estadoFormularioJudicial.pabellon}
                        onChange={onDatoChange}
                    />
                </Grid>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        label='Celda'
                        name='celda'
                        value={estadoFormularioJudicial.celda}
                        onChange={onDatoChange}
                    />
                </Grid>
            </Grid>
            <Box mt={3} sx={{
                border: '1px solid #E2E8F0',
                background: 'rgba(244,246,248, 0.30)',
                padding: '16px',
                borderRadius: '8px'
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                            Expediente judicial
                        </Typography>
                        <FormHelperText>* Campo requerido</FormHelperText>
                    </Grid>

                    <Grid item sm={12}>
                        <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
                            {datosFormulario.expedientes ?
                                (
                                    <>
                                        {
                                            !showExpdientesForm ?
                                                <FormControl fullWidth>
                                                    <Autocomplete
                                                        fullWidth
                                                        value={datosFormulario.expedientesSeleccionados}
                                                        onChange={(event, newValue: any) => {

                                                            setDatosFormulario((prev: any) => ({
                                                                ...prev,
                                                                expedientesSeleccionados: newValue
                                                            }));
                                                            setEstadoFormularioJudicial(prev => ({
                                                                ...prev,
                                                                expediente_id: newValue?.id
                                                            }))
                                                        }}
                                                        id="controllable-states-demo"
                                                        options={datosFormulario.expedientes}
                                                        getOptionLabel={(option: {
                                                            numeroDeExpediente: string;
                                                            caratula_expediente: string
                                                        }) => `${option.numeroDeExpediente} -- ${option.caratula_expediente}`}
                                                        renderInput={(params) => <TextField
                                                            sx={{width: '100% !important'}} {...params}
                                                            label="Expediente"/>}
                                                    />
                                                </FormControl>
                                                : null}
                                        <Button variant='contained' onClick={handleShowExpedientesForm}>
                                            {showExpdientesForm ? 'Buscar expediente' : <AddIcon/>}
                                        </Button>
                                    </>
                                )
                                : null}
                        </Stack>

                    </Grid>

                </Grid>

                {
                    showExpdientesForm ?
                        <FormExpedientesEmebed id_persona={id_persona} onHandledata={handleExpedienteData}/>
                        : null
                }


            </Box>
            {/* Bloque Expediente Judicial*/}


            <Box mt={3} sx={{
                border: '1px solid #E2E8F0',
                background: 'rgba(244,246,248, 0.30)',
                padding: '16px',
                borderRadius: '8px'
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                            Documentos que ordena la reclusión
                        </Typography>
                    </Grid>
                    <Grid item sm={12} mt={2} alignItems='start'>
                        <Typography variant='subtitle1' pt={0}>Oficio judicial</Typography>
                        <Grid container spacing={2} sx={{marginTop: '0px'}} alignItems='center'>
                            <Grid item sm={3}>
                                <TextField
                                    fullWidth
                                    required
                                    name="oficioJudicial_numeroDeDocumento"
                                    value={estadoFormularioJudicial.oficioJudicial_numeroDeDocumento}
                                    label="Nro. de documento"
                                    helperText='* Campo requerido'
                                    error={!estadoFormularioJudicial.oficioJudicial_numeroDeDocumento}
                                    onChange={onDatoChange}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                        <MobileDatePicker

                                            value={estadoFormularioJudicial.oficioJudicial_fechaDeDocumento ? dayjs(estadoFormularioJudicial.oficioJudicial_fechaDeDocumento) : dayjs()}
                                            name='oficioJudicial_fechaDeDocumento'
                                            format="DD/MM/YYYY"
                                            onChange={(newValue: Dayjs | null) => {
                                                setEstadoFormularioJudicial(prev => ({
                                                    ...prev,
                                                    oficioJudicial_fechaDeDocumento: newValue,
                                                }))
                                            }}
                                            label={"Fecha del documento"}/>
                                    </LocalizationProvider>
                                    <FormHelperText>* Campo requerido</FormHelperText>
                                </FormControl>


                            </Grid>
                            <Grid item sm={6}>
                                <Stack spacing={1} direction='row' alignItems='center'>
                                    <FormControl fullWidth>
                                        <MuiFileInput
                                            required
                                            title="Titulo"
                                            value={estadoFormularioJudicial.oficioJudicial_documento}
                                            variant="outlined"
                                            label="Seleccionar documento"
                                            getInputText={(value) => value ? value.name : ''}
                                            onChange={(newValue) => {
                                                setEstadoFormularioJudicial(prev => ({
                                                    ...prev,
                                                    oficioJudicial_documento: newValue,
                                                }))
                                            }}
                                        />
                                        {
                                            (datosFormulario.oficioJudicial_documento)
                                                ? <a href={datosFormulario.oficioJudicial_documento} target='_blank'>Descargar </a>
                                                : null
                                        }
                                        <FormHelperText>* Campo requerido</FormHelperText>
                                    </FormControl>
                                    {
                                        estadoFormularioJudicial.oficioJudicial_documento !== null
                                            ? (
                                                <Box>
                                                    <IconButton color='error'
                                                                onClick={(event) => onCleanField(event, 'oficioJudicial_documento')}>
                                                        <Close/>
                                                    </IconButton>
                                                </Box>
                                            )
                                            : null
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} alignItems='start'>
                    <Grid item sm={12}>
                        <Typography variant='subtitle1' pt={0}>Resolución MJ/DGEP</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item sm={3}>
                        <TextField
                            required
                            fullWidth
                            name="resolucion_numeroDeDocumento"
                            helperText='* Campo requerido'
                            error={!estadoFormularioJudicial.resolucion_numeroDeDocumento}
                            value={estadoFormularioJudicial.resolucion_numeroDeDocumento}
                            label="Nro. de documento"
                            onChange={(onDatoChange)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                <MobileDatePicker

                                    value={estadoFormularioJudicial.resolucion_fechaDeDocumento ? dayjs(estadoFormularioJudicial.resolucion_fechaDeDocumento) : dayjs()}
                                    name='resolucion_fechaDeDocumento'
                                    format="DD/MM/YYYY"
                                    onChange={(newValue: Dayjs | null) => {
                                        setEstadoFormularioJudicial(prev => ({
                                            ...prev,
                                            resolucion_fechaDeDocumento: newValue,
                                        }))
                                    }}
                                    label={"Fecha del documento"}/>
                            </LocalizationProvider>
                            <FormHelperText>* Campo requerido</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item sm={6}>
                        <Stack spacing={1} direction='row' alignItems='center'>
                            <FormControl fullWidth>
                                <MuiFileInput
                                    required
                                    error={!estadoFormularioJudicial.resolucion_documento}
                                    value={estadoFormularioJudicial.resolucion_documento}
                                    variant="outlined"
                                    label="Seleccionar documento"
                                    getInputText={(value) => value ? value.name : ''}
                                    onChange={(newValue) => {
                                        setEstadoFormularioJudicial(prev => ({
                                            ...prev,
                                            resolucion_documento: newValue,
                                        }))
                                    }}
                                />
                                {
                                    (
                                        datosFormulario.resolucion_documento
                                    ) ?
                                        <a href={datosFormulario.resolucion_documento} target='_blank'> Descargar </a>
                                        : null
                                }
                                <FormHelperText>* Campo requerido</FormHelperText>
                            </FormControl>
                            {
                                estadoFormularioJudicial.resolucion_documento !== null ?
                                    <Box>
                                        <IconButton color='error'
                                                    onClick={(event) => onCleanField(event, 'resolucion_documento')}>
                                            <Close/>
                                        </IconButton>
                                    </Box>
                                    : null}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12}>

                    <>
                        {
                            Object.keys(stateErrors).map((key: string, index: number) => (
                                <Box key={index} mt={1}>
                                    <Alert severity="error">
                                        {
                                            //@ts-ignore
                                            stateErrors[key]
                                        }
                                    </Alert>
                                </Box>

                            ))

                        }
                    </>

                </Grid>
                {sessionData &&
                    <Grid item sm={12}>
                        <LoadingButton
                            sx={{
                                minHeight: "100%",
                                px: "48px",
                                height: '48px'
                            }}
                            onClick={onFormSubmit}
                            loading={consultaLoading}
                            loadingPosition='start'
                            startIcon={<SaveIcon/>}
                            variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                        </LoadingButton>
                    </Grid>
                }
            </Grid>

        </Box>

    )
}


export default BloqueJudicial;

/** Funcion para verificar si el argumento es del Fecha
 * */
function isDayjs(object: Object) {

    return object != null && typeof object === 'object' && 'format' in object && typeof object.format === 'function';
}


/** Funcion para verificar si el argumento es del tipo File
 * */
function isFile(object: any) {
    return object instanceof File;
}

function prevFileDoc(valor: any): Boolean | void {
    if (typeof valor == 'string') {
        return valor.startsWith('http') || valor.startsWith('/archivo')
    }
}


/** Baja de una url una imagen y convierte en BLOB
 * */
async function downloadFile(url: string) {
    const response = await fetch(url);
    return response.blob(); // Obtiene el contenido del archivo como Blob
}

