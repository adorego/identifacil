import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, IconButton,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack, TextField,
    Typography
} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {api_request} from "@/lib/api-request";
import {datosIncialesJudiciales, datosJudicialesInicial, datosJudicialesType} from "@/components/utils/systemTypes";
import AddIcon from '@mui/icons-material/Add';
import {MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {MuiFileInput} from "mui-file-input";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";
import FormExpedientesEmebed from "@/app/(sistema)/ppl/[id]/components/formExpedientesEmbed";
import {Close} from "@mui/icons-material";


interface BloqueJudicialProps {
    datosIniciales?: datosIncialesJudiciales | null;
    id_persona: number;
}

type DocsOrdenanType = Array<{
    fecha: string;
    id: number
    numero_documento: string;
    tipo: string;
    ruta: string;
}>;

const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';

const BloqueJudicial: FC<BloqueJudicialProps> = ({datosIniciales = null, id_persona}) => {
    const [estadoFormularioJudicial, setEstadoFormularioJudicial] = useState<datosJudicialesType>(datosJudicialesInicial)

    /**Contiene los datos para poblar el select de Expediente**/
    const [datosFormulario, setDatosFormulario] = useState<any>({})
    const [showExpdientesForm, setShowExpdientesForm] = useState(false)
    const {openSnackbar} = useGlobalContext();
    const isEditMode = !!datosIniciales?.id;

    const handleShowExpedientesForm = () => {
        setShowExpdientesForm(!showExpdientesForm)
    }

    const handleExpedienteData = (value: any): void => {
        console.log('Valor devuelto del expediente: ' + value)
        setEstadoFormularioJudicial(prev => ({
            ...prev,
            expediente_id: value,
        }))
    }


    /** Este useEffect se ejecuta una vez al cargarse toda la pagina **/
    useEffect(() => {


            //
            setEstadoFormularioJudicial(prev => ({
                ...prev,
                id_persona: id_persona,
                establecimiento_penitenciario: 1,
            }))

            // Se verifica que existan datos iniciales para cargar el estado
            if (datosIniciales !== null && datosIniciales !== undefined && datosIniciales.ingresos_a_prision !== undefined) {

                const datos_ingreso_prision = datosIniciales.ingresos_a_prision[0];

                /** Se guarda en variable el objeto que tenga coincida con la condicion y sea un documento de oficio judicial*/
                const oficioJudicialBuscado: any = datos_ingreso_prision.documentos_que_ordenan_prision?.find((documento: any) => documento.tipo === "oficio_judicial");
                console.log(datos_ingreso_prision.documentos_que_ordenan_prision)
                console.log(oficioJudicialBuscado)

                /**Se guarda en variable el objeto que tenga coincida con la condicion y sea un documento de resolucion MJ*/
                const resolucionBuscado: any = datos_ingreso_prision.documentos_que_ordenan_prision?.find((documento: any) => documento.tipo === "resolucion_mj");

                if (datos_ingreso_prision.expedienteJudicial !== undefined && datos_ingreso_prision.expedienteJudicial !== null) {
                    setDatosFormulario((prev: any) => ({
                        ...prev,
                        expedientesSeleccionados: datos_ingreso_prision.expedienteJudicial
                    }));

                    setEstadoFormularioJudicial(prev => ({
                        ...prev,
                        expediente_id: datos_ingreso_prision.expedienteJudicial.id
                    }))
                }
                const descargarArchivos = async (archivoURL: string, propiedad: string) => {
                    const fileBlob = await downloadFile(archivoURL);
                    const file = new File([fileBlob], `${archivoURL.split('/').pop()}`, {type: fileBlob.type});


                    /** seteador de estado para guardaar la url de un archivo preguardado y mostrar*/
                    setDatosFormulario((prev: any)=>({
                        ...prev,
                        [propiedad]:archivoURL,
                    }))

                    setEstadoFormularioJudicial((prev: any) => ({
                        ...prev,
                        [propiedad]: file,
                    }))


                }
                //console.log(downloadFile())
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
                /*setEstadoFormularioJudicial((prev: any) => {

                    const oficioJudicialBuscado = datosIniciales.ingresos_a_prision[0].documentos_que_ordenan_prision.find(documento => documento.tipo === "oficio judicial");
                    const resolucionBuscado = datosIniciales.ingresos_a_prision[0].documentos_que_ordenan_prision.find(documento => documento.tipo === "resolucion MJ");


                    return ({
                        ...prev,
                        ...datosIniciales,
                        primeraVezEnPrision: datosIniciales.primera_vez_en_prision,
                        cantidadDeIngresos: datosIniciales.cantidad_de_veces_que_ingreso,
                        /!*oficioJudicial:{
                            ...prev.oficioJudicial,
                            numeroDeDocumento: datosIniciales.expediente_numero_de_documento
                            numeroDeDocumento: datosIniciales.expediente_numero_de_documento
    ,                   },*!/
                        expediente: {
                            ...prev.expediente,
                            numeroDeDocumento: datosIniciales.expediente_numero_de_documento,
                            fechaDeDocumento: dayjs(datosIniciales.expediente_fecha_de_documento)
                            ,
                        },
                        causa: datosIniciales.ingresos_a_prision[0].causa.id,
                        hechoPunible: datosIniciales.hecho_punible?.id,
                        sentenciaDefinitiva: datosIniciales.sentencia_definitiva,
                        fecha_ingreso_a_establecimiento: dayjs(datosIniciales.ingresos_a_prision[0].fecha_ingreso),
                        oficioJudicial: {
                            ...prev.oficioJudicial,
                            numeroDeDocumento: oficioJudicialBuscado?.numero_documento,
                            fechaDeDocumento: dayjs(oficioJudicialBuscado?.fecha),
                            documento: oficioJudicialBuscado?.ruta
                        },
                        resolucion: {
                            ...prev.oficioJudicial,
                            numeroDeDocumento: resolucionBuscado?.numero_documento,
                            fechaDeDocumento: dayjs(resolucionBuscado?.fecha),
                            documento: resolucionBuscado?.ruta
                        },
                    })
                })*/
            }

            /** Metodo para obetener datos de expedientes y poblar la lista en el form
             * */
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`).then(res => {
                // console.log(res[0])
                setDatosFormulario((prev: any) => ({
                    ...prev,
                    expedientes: res
                }))
            })


        }, []
    )

    useEffect(() => {
        /*if(estadoFormularioJudicial.expediente_id !== 0 && estadoFormularioJudicial.expediente_id !== undefined && estadoFormularioJudicial.expediente_id !== null && estadoFormularioJudicial.expediente_id !== datosIniciales.ingresos_a_prision[0].expedienteJudicial.id){
            console.log('hay cambios ' + estadoFormularioJudicial.expediente_id)
            fetch('/api/profile-data')
                .then((res) => res.json())
                .then((data) => {
                    console.log()
                })
        }*/

    }, [estadoFormularioJudicial.expediente_id]);

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
        setEstadoFormularioJudicial(prev => ({
            ...prev,
            [nameField]: '',
        }))
    }

    const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (id_persona != null) {

            const formData = new FormData();

            /** Se arma el formdata para enviar en la peticion POST O PUT */
            Object.keys(estadoFormularioJudicial).forEach((key: string) => {
                console.log(key)
                // @ts-ignore

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

                            if (isDayjs(valor)) {
                                formData.append(key, valor.toISOString());

                            }
                            if (isFile(valor)) {
                                formData.append(key, valor);
                            }
                            break;
                        case 'boolean':
                            formData.append(key, String(valor));
                            break;

                        default:
                            console.log(typeof valor);

                    }


            })

            /** bloque para controlar si el PPL existe en el expediente id adjuntado para poder actualizar el Expediente */
            if (isEditMode) {
                // TODO: primero controlar si el PPL exist en el expediente
            }


            const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_judiciales${isEditMode ? ('/' + estadoFormularioJudicial.id) : ''}`;

            const respuesta = await api_request(url, {
                method: isEditMode ? 'PUT' : 'POST',
                body: formData,
            })
            if (respuesta.success) {
                openSnackbar("Datos guardados correctamente", "success")
            } else {
                if (respuesta.error) {
                    openSnackbar(`Error al guardar los datos`, `error`);
                    log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                }
            }

        } else {
            openSnackbar("Falta el número de identificación", "error");
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
                <Grid item sm={12} alignSelf='center'>
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

                        {!estadoFormularioJudicial.primeraVezEnPrision ?
                            <FormControl>

                                <TextField
                                    required={true}
                                    disabled={estadoFormularioJudicial.primeraVezEnPrision}
                                    name="cantidadDeIngresos"
                                    value={estadoFormularioJudicial.cantidadDeIngresos}
                                    onChange={onDatoChange}
                                    label="Cantidad de veces de ingreso"/>
                            </FormControl>
                            : null}
                        <FormControl>
                            <DemoContainer components={['MobileDatePicker']}>
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
                            </DemoContainer>
                        </FormControl>
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
                                                        expediente_id: newValue.id
                                                    }))
                                                }}
                                                id="controllable-states-demo"
                                                options={datosFormulario.expedientes}
                                                getOptionLabel={(option: { numeroDeExpediente: string; caratula_expediente: string }) => `${option.numeroDeExpediente} -- ${option.caratula_expediente}`}
                                                renderInput={(params) => <TextField
                                                    sx={{width: '100% !important'}} {...params}
                                                    label="Expediente"/>}
                                            />
                                        </FormControl>
                                        : null}
                                        <Button variant='contained' onClick={handleShowExpedientesForm}>
                                            {showExpdientesForm? 'Buscar expediente' : <AddIcon/> }
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
                    <Grid item sm={12}>
                        <Typography variant='subtitle1' pt={0}>Oficio judicial</Typography>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        required
                                        name="oficioJudicial_numeroDeDocumento"
                                        value={estadoFormularioJudicial.oficioJudicial_numeroDeDocumento}
                                        label="Nro. de documento"
                                        onChange={onDatoChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>

                                    <MobileDatePicker
                                        value={estadoFormularioJudicial.oficioJudicial_fechaDeDocumento}
                                        name='oficioJudicial_fechaDeDocumento'
                                        format="DD/MM/YYYY"
                                        onChange={(newValue: Dayjs | null) => {
                                            setEstadoFormularioJudicial(prev => ({
                                                ...prev,
                                                oficioJudicial_fechaDeDocumento: newValue,
                                            }))
                                        }}
                                        label={"Fecha del documento"}/>

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
                                            /*onChange={onFileOficioJudicialChange}*/
                                            getInputText={(value) => value ? value.name : ''}
                                            onChange={(newValue) => {
                                                setEstadoFormularioJudicial(prev => ({
                                                    ...prev,
                                                    oficioJudicial_documento: newValue,
                                                }))
                                            }}
                                        />
                                        {
                                            estadoFormularioJudicial.oficioJudicial_documento ?
                                                <a href={datosFormulario.oficioJudicial_documento} >ver documento </a>
                                                : null
                                        }
                                    </FormControl>
                                    <Box>
                                        <IconButton color='error' onClick={(event) => onCleanField(event, 'oficioJudicial_documento')}>
                                            <Close />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                    <Grid item sm={12}>
                        <Typography variant='subtitle1' pt={0}>Resolución MJ/DGEP</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                            <OutlinedInput
                                required
                                name="resolucion_numeroDeDocumento"
                                value={estadoFormularioJudicial.resolucion_numeroDeDocumento}
                                label="Nro. de documento"
                                onChange={(onDatoChange)}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>

                            <MobileDatePicker

                                value={estadoFormularioJudicial.resolucion_fechaDeDocumento}
                                name='resolucion_fechaDeDocumento'
                                format="DD/MM/YYYY"
                                onChange={(newValue: Dayjs | null) => {
                                    setEstadoFormularioJudicial(prev => ({
                                        ...prev,
                                        resolucion_fechaDeDocumento: newValue,
                                    }))
                                }}
                                label={"Fecha del documento"}/>

                        </FormControl>

                    </Grid>
                    <Grid item sm={6}>
                        <Stack spacing={1} direction='row' alignItems='center'>
                            <FormControl fullWidth>
                                <MuiFileInput
                                    required
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
                                    estadoFormularioJudicial.resolucion_documento ?
                                        <a href={datosFormulario.resolucion_documento} > ver documento </a>
                                        : null
                                }
                            </FormControl>
                            <Box>
                                <IconButton color='error' onClick={(event) => onCleanField(event, 'resolucion_documento')}>
                                    <Close />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12}>
                    <Button onClick={onFormSubmit} variant='contained'>
                        Guardar
                    </Button>
                </Grid>
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