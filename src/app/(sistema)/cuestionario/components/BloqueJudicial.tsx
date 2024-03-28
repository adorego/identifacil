import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    SelectChangeEvent,
    Stack, TextField,
    Typography
} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {api_request} from "@/lib/api-request";
import {datosJudicialesInicial, datosJudicialesType} from "@/components/utils/systemTypes";
import AddIcon from '@mui/icons-material/Add';
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {MuiFileInput} from "mui-file-input";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";
import FormExpedientesEmebed from "@/app/(sistema)/ppl/[id]/components/formExpedientesEmbed";


interface BloqueJudicialProps {
    datosIniciales?: datosJudicialesType;
    id_persona: number | null;
}


const BloqueJudicial: FC<BloqueJudicialProps> = ({datosIniciales = datosJudicialesInicial, id_persona}) => {
    const [estadoFormularioJudicial, setEstadoFormularioJudicial] = useState<datosJudicialesType>(datosJudicialesInicial)
    const [datosFormulario, setDatosFormulario] = useState<any>({})
    const [showExpdientesForm, setShowExpdientesForm] = useState(false)
    const {openSnackbar} = useGlobalContext();


    const handleShowExpedientesForm= ()=>{
        setShowExpdientesForm(!showExpdientesForm)
    }

    const handleExpedienteData = (value:any) : void =>{
        setEstadoFormularioJudicial(prev=>({
            ...prev,
            expediente: value,
        }))
    }

    useEffect(
        () => {
            if (datosIniciales) {
                setEstadoFormularioJudicial((prev: any) => {

                    const oficioJudicialBuscado = datosIniciales.ingresos_a_prision[0].documentos_que_ordenan_prision.find(documento => documento.tipo === "oficio judicial");
                    const resolucionBuscado = datosIniciales.ingresos_a_prision[0].documentos_que_ordenan_prision.find(documento => documento.tipo === "resolucion MJ");


                    return ({
                        ...prev,
                        ...datosIniciales,
                        primeraVezEnPrision: datosIniciales.primera_vez_en_prision,
                        cantidadDeIngresos: datosIniciales.cantidad_de_veces_que_ingreso,
                        /*oficioJudicial:{
                            ...prev.oficioJudicial,
                            numeroDeDocumento: datosIniciales.expediente_numero_de_documento
                            numeroDeDocumento: datosIniciales.expediente_numero_de_documento
    ,                   },*/
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
                })
            }

            /** Metodo para obetener datos de expedientes y poblar la lista en el form
             * */
            fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`).then(res => {
                setDatosFormulario((prev: any)=>({
                    ...prev,
                    expedientes: res
                }))
            })

            /*fetchData(`${API_URL_REGISTRO}/datos_penales/causas`).then(res => {

                setCausas(res)
            })
            fetchData(`${API_URL_REGISTRO}/datos_penales/hechos_punibles`).then(res => {

                setHechosPunibles(res.hechosPunibles)
            })*/
            // Hechos punibles

            /** Obtiene lista de hechos punibles para poblar la lista
             * */


        }, []
    )

    const onDatoChange = (event: any) => {
        // console.log(event);
        setEstadoFormularioJudicial(
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

    const onObjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const names = event.target.name.split('.');
        const objetoAModificar = names[0] === "oficioJudicial" ? estadoFormularioJudicial.oficioJudicial : estadoFormularioJudicial.resolucion;

        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        [names[0]]: Object.assign({}, {...objetoAModificar, [names[1]]: event.target.value}),
                        [`${names[0]}_modificado`]: true
                    }
                )
            }
        )
    }

    const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: (event.target.value === "true"),
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

    const onOficioJudicialFechaChange = (value: Dayjs | null, context: any) => {

        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        oficioJudicial: Object.assign({}, {...previus.oficioJudicial, fechaDeDocumento: value})
                    }
                )
            }
        )
    }

    const onFileOficioJudicialChange = (archivo: File | null) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        oficioJudicial: Object.assign({}, {...previus.oficioJudicial, documento: archivo})
                    }
                )
            }
        )
    }

    const onFileResolucionMJChange = (archivo: File | null) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        resolucion: Object.assign({}, {...previus.resolucion, documento: archivo})
                    }
                )
            }
        )
    }

    const onResolucionMJFechaChange = (value: Dayjs | null, context: any) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        resolucion: Object.assign({}, {...previus.resolucion, fechaDeDocumento: value})
                    }
                )
            }
        )
    }

    /*const onExpedienteFechaChange = (value: Dayjs | null, context: any) => {
        setEstadoFormularioJudicial(
            (prev) => {
                return (
                    {
                        ...prev,
                        expediente: Object.assign({}, {...prev.expediente, fechaDeDocumento: value})

                    }
                )
            }
        )
    }*/

    const onOptionSelectChange = (event: SelectChangeEvent<string | number | null>) => {
        // console.log("Value:", event.target.value);
        setEstadoFormularioJudicial(
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

    const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (id_persona != null) {
            const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_judiciales`;
            const formData = crearFormData(estadoFormularioJudicial, id_persona);

            console.log(estadoFormularioJudicial)

            /*const respuesta = await api_request(url, {
                method: 'POST',
                body: formData,
            })
            if (respuesta.success) {
                openSnackbar("Datos guardados correctamente", "success")
            } else {
                if (respuesta.error) {
                    openSnackbar(`Error al guardar los datos`, `error`);
                    log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                }
            }*/

        } else {
            openSnackbar("Falta el número de identificación", "error");
        }
    }

    const crearFormData = (datos: datosJudicialesType, id_persona: number): FormData => {
        const formData = new FormData();
        const propiedades: Array<string> = Object.getOwnPropertyNames(datos);

        formData.append('id_persona', String(id_persona));

        formData.append('primeraVezEnPrision', String(datos.primeraVezEnPrision));
        formData.append('cantidadDeIngresos', String(datos.cantidadDeIngresos));
        formData.append('fecha_ingreso_a_establecimiento', datos.fecha_ingreso_a_establecimiento?.toISOString() ? datos.fecha_ingreso_a_establecimiento?.toISOString() : "");

        formData.append('pabellon', datos.pabellon);
        formData.append('celda', datos.celda);

        if(datos.expediente_id){
            formData.append('expediente_id', datos.expediente_id.toString());
        }

        formData.append('oficioJudicial_numeroDeDocumento', datos.oficioJudicial.numeroDeDocumento);
        formData.append('oficioJudicial_fechaDeDocumento', datos.oficioJudicial.fechaDeDocumento?.toISOString() ? datos.oficioJudicial.fechaDeDocumento?.toISOString() : "");
        formData.append('oficioJudicial_documento', datos.oficioJudicial.documento ? datos.oficioJudicial.documento : "");

        formData.append('resolucion_numeroDeDocumento', datos.resolucion.numeroDeDocumento);
        formData.append('resolucion_fechaDeDocumento', datos.resolucion.fechaDeDocumento?.toISOString() ? datos.resolucion.fechaDeDocumento?.toISOString() : "");
        formData.append('resolucion_documento', datos.resolucion.documento ? datos.resolucion.documento : "");




        console.log(formData)
        return formData;


    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <Typography variant='h6' mb={3}>
                Formulario de datos judiciales
            </Typography>

            <Grid container mt={2}>
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
                                <InputLabel htmlFor="cantidadDeIngresos">Cantidad de veces de ingreso</InputLabel>
                                <OutlinedInput
                                    disabled={estadoFormularioJudicial.primeraVezEnPrision}
                                    name="cantidadDeIngresos"
                                    value={estadoFormularioJudicial.cantidadDeIngresos}
                                    onChange={onDatoChange}
                                    label="Cantidad de veces de ingreso"/>
                            </FormControl>
                            : null}
                        <FormControl>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={estadoFormularioJudicial.fecha_ingreso_a_establecimiento}
                                    format="DD/MM/YYYY"
                                    name='fecha_ingreso_a_establecimiento'

                                    onChange={(newValue: Dayjs | null) => {
                                        setEstadoFormularioJudicial(prevState => ({
                                            ...prevState,
                                            fecha_ingreso_a_establecimiento: newValue,
                                            fecha_ingreso_a_establecimiento_modificado: true,
                                        }))
                                    }}
                                    label="Fecha de ingreso"/>
                            </DemoContainer>
                        </FormControl>
                    </Stack>
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
                            <FormControl fullWidth>
                                <Autocomplete
                                    fullWidth
                                    value={datosFormulario.expedientesSeleccionados}
                                    onChange={(event, newValue:any) => {
                                        // @ts-ignore
                                        setDatosFormulario((prev: any)=>({
                                            ...prev,
                                            expedientesSeleccionados:newValue
                                        }));
                                    }}
                                    id="controllable-states-demo"
                                    options={datosFormulario.expedientes}
                                    getOptionLabel={(option:{numeroDeExpediente: string; caratula_expediente: string})  => `${option.numeroDeExpediente} -- ${option.caratula_expediente}` }
                                    renderInput={(params) => <TextField sx={{width: '100% !important'}} {...params} label="Expediente" />}
                                />
                            </FormControl>
                            <Button variant='contained' onClick={handleShowExpedientesForm}>
                                <AddIcon />
                            </Button>
                        </Stack>

                    </Grid>
                </Grid>

                {
                    showExpdientesForm ?
                    <FormExpedientesEmebed id_persona={id_persona} onHandledata={handleExpedienteData} />
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
                <Grid container spacing={2} >
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
                                        name="oficioJudicial.numeroDeDocumento"
                                        value={estadoFormularioJudicial.oficioJudicial.numeroDeDocumento}
                                        label="Nro. de documento"
                                        onChange={onObjectChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>

                                    <DatePicker
                                        value={estadoFormularioJudicial.oficioJudicial.fechaDeDocumento}
                                        format="DD/MM/YYYY"
                                        onChange={onOficioJudicialFechaChange}
                                        label={"Fecha del documento"}/>

                                </FormControl>


                            </Grid>
                            <Grid item sm={5}>
                                <FormControl fullWidth>
                                    <MuiFileInput
                                        required
                                        title="Titulo"
                                        value={estadoFormularioJudicial.oficioJudicial.documento}
                                        variant="outlined"
                                        label="Seleccionar documento"
                                        getInputText={(value) => value ? value.name : ''}
                                        onChange={onFileOficioJudicialChange}
                                    />
                                </FormControl>

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
                                name="resolucion.numeroDeDocumento"
                                value={estadoFormularioJudicial.resolucion.numeroDeDocumento}
                                label="Nro. de documento"
                                onChange={onObjectChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>

                            <DatePicker

                                value={estadoFormularioJudicial.resolucion.fechaDeDocumento}
                                format="DD/MM/YYYY"
                                onChange={onResolucionMJFechaChange}
                                label={"Fecha del documento"}/>

                        </FormControl>

                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <MuiFileInput
                                required
                                value={estadoFormularioJudicial.resolucion.documento}
                                variant="outlined"
                                label="Seleccionar documento"
                                onChange={onFileResolucionMJChange}/>
                        </FormControl>
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