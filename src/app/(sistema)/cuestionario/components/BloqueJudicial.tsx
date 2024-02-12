import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {RequestResponse, api_request} from "@/lib/api-request";
import {datosJudicialesInicial, datosJudicialesType} from "@/components/utils/systemTypes";

import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {MuiFileInput} from "mui-file-input";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";

interface oficiosDTO {
    oficios: Array<oficio>;
    success: boolean;
}

interface oficio {
    id: number;
    nombre: string;
}

interface causa {
    id: number;
    numero_expediente: string;
    anho: string;
    caratula_causa: string;
    condenado: boolean;

}

interface causasDTO {
    causas: Array<causa>
    success: boolean;
}


interface BloqueJudicialProps {
    datosIniciales?: datosJudicialesType;
    id_persona: number | null;
}

const BloqueJudicial: FC<BloqueJudicialProps> = ({datosIniciales = datosJudicialesInicial, id_persona}) => {

    const estadoInicial = datosIniciales ? datosIniciales : datosJudicialesInicial;
    const [estadoFormularioJudicial, setEstadoFormularioJudicial] = useState<datosJudicialesType>(estadoInicial)
    const [causas, setCausas] = useState<Array<causa>>([]);
    const [oficios, setOficios] = useState<Array<oficio>>([]);
    const {openSnackbar} = useGlobalContext();


    useEffect(
        () => {
            const getCausas = async (numeroDeIdentificacion: string | null) => {
                if (id_persona) {
                    const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/causas?ci=${datosIniciales.numeroDeIdentificacion}`;

                    try {
                        const respuesta: RequestResponse = await api_request<causasDTO>(url, {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        });
                        console.log("Respuesta:", respuesta);
                        if (respuesta.success && respuesta.datos) {
                            transformarSetearCausas(respuesta.datos.causas)
                        } else {
                            log.error(`Error al consultar las causas:${respuesta.error?.message}`);
                            openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                        }

                    } catch (error) {
                        log.error(`Error al consultar las causas:${error}`);
                        openSnackbar(`Error en la consulta de datos:${error}`, "error");
                    }

                } else {
                    openSnackbar("Se necesita de la cedula para recuperar las causas", "error");
                }
            }
            // getCausas(datosIniciales);

        }, []
    )

    useEffect(
        () => {
            const getOficios = async () => {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/oficios`;
                try {
                    const respuesta: RequestResponse = await api_request<oficiosDTO>(url, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    console.log("Respuesta:", respuesta);
                    if (respuesta.success && respuesta.datos) {
                        setOficios(respuesta.datos.oficios);
                    } else {
                        log.error(`Error al consultar los oficios:${respuesta.error?.message}`);
                        openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
                    }

                } catch (error) {
                    log.error(`Error al consultar los oficios:${error}`);
                    openSnackbar(`Error en la consulta de datos:${error}`, "error");
                }
            }

            getOficios();

        }, []
    )

    const transformarSetearCausas = (causas: Array<causa>) => {
        console.log("Causas:", causas);
        setCausas(causas);

    }
    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value);
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

    const onExpedienteFechaChange = (value: Dayjs | null, context: any) => {
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        expediente: Object.assign({}, {...previus.expediente, fechaDeDocumento: value})

                    }
                )
            }
        )
    }

    const onOptionSelectChange = (event: SelectChangeEvent) => {
        console.log("Value:", event.target.value);
        setEstadoFormularioJudicial(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: event.target.value,
                        [`event.target.name_modificado`]: true

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

            const respuesta = await api_request(url, {
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
            }

        } else {
            openSnackbar("Falta el número de identificación", "error");
        }
    }

    const crearFormData = (datos: datosJudicialesType, id_persona: number): FormData => {
        const formData = new FormData();
        const propiedades: Array<string> = Object.getOwnPropertyNames(datos);
        formData.append('numeroDeIdentificacion', String(id_persona));
        formData.append('situacionJudicial', datos.situacionJudicial);
        formData.append('situacionJudicial_modificado', String(datos.situacionJudicial_modificado));
        formData.append('primeraVezEnPrision', String(datos.primeraVezEnPrision));
        formData.append('primeraVezEnPrision_modificado', String(datos.primeraVezEnPrision_modificado));
        formData.append('cantidadDeIngresos', String(datos.cantidadDeIngresos));
        formData.append('cantidadDeIngresos_modificado', String(datos.cantidadDeIngresos_modificado));
        formData.append('causa', datos.causa);
        formData.append('causa_modificado', String(datos.causa_modificado));
        formData.append('oficio', datos.oficio);
        formData.append('oficio_modificado', String(datos.oficio_modificado));
        formData.append('ultimoTrabajo', datos.oficio);
        formData.append('ultimoTrabajo_modificado', String(datos.oficio_modificado));
        formData.append('oficioJudicial.numeroDeDocumento', datos.oficioJudicial.numeroDeDocumento);
        formData.append('oficioJudicial.fechaDeDocumento', datos.oficioJudicial.fechaDeDocumento?.toISOString() ? datos.oficioJudicial.fechaDeDocumento?.toISOString() : "");
        formData.append('oficioJudicial_documento', datos.oficioJudicial.documento ? datos.oficioJudicial.documento : "");
        formData.append('oficioJudicial_modificado', String(datos.oficioJudicial_modificado));
        formData.append('resolucion.numeroDeDocumento', datos.resolucion.numeroDeDocumento);
        formData.append('resolucion.fechaDeDocumento', datos.resolucion.fechaDeDocumento?.toISOString() ? datos.resolucion.fechaDeDocumento?.toISOString() : "");
        formData.append('resolucion_documento', datos.resolucion.documento ? datos.resolucion.documento : "");
        formData.append('expediente.numeroDeDocumento', datos.expediente.numeroDeDocumento);
        formData.append('expediente.fechaDeDocumento', datos.expediente.fechaDeDocumento?.toISOString() ? datos.expediente.fechaDeDocumento?.toISOString() : "");

        return formData;


    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off">

            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="situacionJudicial">Situación judicial</FormLabel>
                        <RadioGroup
                            value={estadoFormularioJudicial.situacionJudicial}
                            onChange={onDatoChange}
                            row
                            aria-labelledby="situacionJudicial"
                            name="situacionJudicial"
                        >
                            <FormControlLabel
                                value="procesado"
                                control={<Radio/>}
                                label="Procesado"/>
                            <FormControlLabel
                                value="condenado"
                                control={<Radio/>}
                                label="Condenado"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container mt={5}>
                <Grid item sm={12}>
                    <Stack spacing={2} direction={"row"} justifyContent={"flex-start"} alignContent={"flex-start"}>
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

                        <FormControl>
                            <InputLabel htmlFor="cantidadDeIngresos">Cantidad de veces de ingreso</InputLabel>
                            <OutlinedInput
                                disabled={estadoFormularioJudicial.primeraVezEnPrision}
                                name="cantidadDeIngresos"
                                value={estadoFormularioJudicial.cantidadDeIngresos}
                                onChange={onDatoChange}
                                label="Cantidad de veces de ingreso"/>
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={5}>
                <Grid item sm={12}>
                    <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Causa relacionada a la
                        prisión</Typography>
                </Grid>
                <Grid item sm={6} sx={{mt: "5px", mb: "5px"}}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="causa">Causas</InputLabel>
                        <Select
                            value={estadoFormularioJudicial.causa}
                            onChange={onOptionSelectChange}
                            name="causa"
                            label="seleccionar causa">


                            {causas ? causas.map(
                                (data: causa, id) => {
                                    return (
                                        <MenuItem key={id}
                                                  value={data.id}>{String(`${data.numero_expediente}-${data.anho}-${data.caratula_causa}`)}</MenuItem>
                                    )
                                }
                            ) : null}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "20px"}}>Documento que ordena
                        la reclusión</Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant='h6'>Oficio judicial</Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl fullWidth sx={{marginTop: '17px',}}>
                                <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                                <OutlinedInput
                                    name="oficioJudicial.numeroDeDocumento"
                                    value={estadoFormularioJudicial.oficioJudicial.numeroDeDocumento}
                                    label="Nro. de documento"
                                    onChange={onObjectChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={estadoFormularioJudicial.oficioJudicial.fechaDeDocumento}
                                    format="DD/MM/YYYY"
                                    onChange={onOficioJudicialFechaChange}
                                    label={"Fecha del documento"}/>
                            </DemoContainer>

                        </Grid>
                        <Grid item >
                            <FormControl sx={{pt: "8px"}}>
                                <MuiFileInput
                                    title="Titulo"
                                    sx={{mt: "8px"}}
                                    value={estadoFormularioJudicial.oficioJudicial.documento}
                                    variant="outlined"
                                    label="Seleccionar documento"
                                    getInputText={(value) => value ? value.name : ''}
                                    onChange={onFileOficioJudicialChange}/>
                            </FormControl>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>Resolución MJ/DGEP</Typography>
                </Grid>

                <Grid item >
                    <FormControl fullWidth>
                        <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                        <OutlinedInput
                            name="resolucion.numeroDeDocumento"
                            value={estadoFormularioJudicial.resolucion.numeroDeDocumento}
                            label="Nro. de documento"
                            onChange={onObjectChange}/>
                    </FormControl>
                </Grid>
                <Grid item >
                    <DemoContainer components={['DatePicker']} sx={{mt: "-15px"}}>
                        <DatePicker
                            value={estadoFormularioJudicial.resolucion.fechaDeDocumento}
                            format="DD/MM/YYYY"
                            onChange={onResolucionMJFechaChange}
                            label={"Fecha del documento"}/>
                    </DemoContainer>

                </Grid>
                <Grid item>
                    <FormControl>
                        <MuiFileInput
                            value={estadoFormularioJudicial.resolucion.documento}
                            variant="outlined"
                            label="Seleccionar documento"
                            onChange={onFileResolucionMJChange}/>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Typography variant='h6'>Nro. de Expediente</Typography>
                </Grid>
                <Grid item sm={3}>
                    <FormControl fullWidth sx={{marginTop: '8px',}}>
                        <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                        <OutlinedInput
                            name="expediente.numeroDeDocumento"
                            value={estadoFormularioJudicial.expediente.numeroDeDocumento}
                            label="Nro. de documento"
                            onChange={onObjectChange}/>
                    </FormControl>
                </Grid>
                <Grid item >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            value={estadoFormularioJudicial.expediente.fechaDeDocumento}
                            format="DD/MM/YYYY"
                            onChange={onExpedienteFechaChange}
                            sx={{margin: '0 !important'}}
                            label={"Fecha del documento"}/>
                    </DemoContainer>
                </Grid>
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