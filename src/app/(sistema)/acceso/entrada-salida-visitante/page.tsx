'use client'

import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, useState} from "react"
import {IdentificationResponse, initialResponse} from "../../../../model/respuesta-identificacion";
import {ThumbDown, ThumbUp} from "@mui/icons-material";

import {Dayjs} from "dayjs";
import FaceRecognitionWithLayout from "@/components/registro/FaceRecognitionWithLayout";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import log from "loglevel";
import style from "./page.module.css";
import {useGlobalContext} from "@/app/Context/store";

const EstadosProgreso: Array<string> = ['No iniciado', 'Generando datos biométricos', 'Almacenando en la Base de Datos', 'Registro completo'];

interface pplAVisitar {
    cedula: string;
    nombre: string;
    apellido: string;
}

const datosInicialesPplAVisitar = {
    cedula: "",
    nombre: "",
    apellido: ""
}

interface RespuestaAConsultaPPL {
    success: boolean;
    nombres: string;
    apellidos: string;
}

interface SolicitudEntradaVisitante {
    observacion: string;
}

const solicitudEntradaVisitanteInicial: SolicitudEntradaVisitante = {
    observacion: ""
}
export default function EntradaSalidaVisitante() {
    const [progresoReconocimiento, setProgresoReconocmiento] = useState(EstadosProgreso[0]);
    const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
    const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse);
    const [visitanteIdentificado, setVisitanteIdentificado] = useState<boolean>(false);
    const [pplIdentificado, setPPLIdentificado] = useState(false);
    const [autorizarIngreso, setAutorizarIngreso] = useState<string>("inicio");
    const [entrada_salida, setEntradaSalida] = useState<boolean | null>(null);
    const [pplAVisitar, setpplAVisitar] = useState<pplAVisitar>(datosInicialesPplAVisitar);
    const [entradaVisitante, setEntradaVisitante] = useState<SolicitudEntradaVisitante>(solicitudEntradaVisitanteInicial);
    const [mensaje, setMensaje] = useState("");
    const {openSnackbar} = useGlobalContext();

    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/identificacion/`;
        // console.log('url:', url);
        const dataToSend = {
            descriptorFacial: reconocimiento.descriptor
        }
        // console.log("Data to send:", dataToSend);
        setProgresoReconocmiento(EstadosProgreso[2]);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (!response.ok) {
            const data = await response.json();
            log.error('Ocurrio un error:', data);
            openSnackbar("Error en la consulta de datos", "error");
        } else {
            const data: IdentificationResponse = await response.json();
            setProgresoReconocmiento(EstadosProgreso[0]);
            setVisitanteIdentificado(true);
            setIdentificationData({
                numeroDeIdentificacion: data.numeroDeIdentificacion,
                nombres: data.nombres,
                apellidos: data.apellidos,
                esPPL: data.esPPL
            })
            // openSnackbar(`Persona Reconocida, nombre:${data.nombres}, apellido:${data.apellidos}, esPPL:${esPPL}`);
        }
    }

    const actualizar_progreso = (progreso: number) => {
        setProgresoReconocmiento(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () => {
        setProgresoReconocmiento(EstadosProgreso[0]);
    }

    const onCedulaChangeManejador = (event: React.ChangeEvent<HTMLInputElement>) => {
        setpplAVisitar(
            (previus) => {
                return {
                    ...previus,
                    cedula: event.target.value
                }
            }
        )
    }
    const onConsultarManejador = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/identificacion/ppl_con_cedula`;
        const dataToSend = {
            numeroDeIdentifiicacion: pplAVisitar.cedula
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (!response.ok) {
            const data = await response.json();
            openSnackbar(`Error en la consulta:${data.message}`, "error");
            log.error('Ocurrio un error:', data);
        } else {
            const datosPPL: RespuestaAConsultaPPL = await response.json();
            pplAVisitar.nombre = datosPPL.nombres;
            pplAVisitar.apellido = datosPPL.apellidos;
        }
    }

    const onEntradaSalidaSelectChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {

        setEntradaSalida(value === "true" ? true : false);
    }

    const solicitarIngresoPPL = () => {
        setTimeout(
            () => {
                setAutorizarIngreso(autorizarIngreso === "autorizado" ? "noAutorizado" : "autorizado")
            }, 2000
        )
        setAutorizarIngreso("consultando");
    }

    return (
        <>
            <FormControl className={style.form}>
                <Typography variant="h6">Entrada/Salida Visitante</Typography>
                <Box mt={3} sx={{
                    backgroundColor: '#FFF',
                    paddingY: '20px',
                    paddingX: '30px',
                    borderRadius: '16px',
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                }}>
                    <Grid container spacing={2}>
                        <Grid item pr={2} sm={6}>
                            <Box >
                                <Typography
                                    sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px", textAlign: "center"}}>
                                    Identificación del Visitante
                                </Typography>
                                <FaceRecognitionWithLayout
                                    etiquetaLabel="Capturar"
                                    showSpinner={showSpinner}
                                    progresoRegistro={progresoReconocimiento}
                                    mensaje={mensaje}
                                    cerrar_dialogo={cerrar_dialogo}
                                    agregar_reconocimiento={agregar_reconocimiento}
                                    actualizar_progreso={actualizar_progreso}/>
                            </Box>
                        </Grid>
                        <Grid item sm={6} sx={{borderLeft: '1px solid rgb(189, 189, 189, .16)', margin: '20px 0'}}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                            Datos del Visitante
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Cedula"}
                                                value={identificationData.numeroDeIdentificacion}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sm={12}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Nombres"}
                                                value={identificationData.nombres}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sm={12}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Apellidos"}
                                                value={identificationData.apellidos}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sm={12}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Esta Registrado"}
                                                value={identificationData.esPPL === false ? "Si" : "No"}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    {visitanteIdentificado && <Grid container spacing={2}>
                                        <Grid item sm={12}>
                                            <Typography
                                                sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                                Datos del PPL a quien visita
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <FormControl fullWidth={true}>
                                                <TextField
                                                    label={"Cédula"}
                                                    value={pplAVisitar.cedula}
                                                    onChange={onCedulaChangeManejador}
                                                    disabled={false}>

                                                </TextField>


                                            </FormControl>

                                        </Grid>
                                        <Grid item sm={6}>
                                            <FormControl fullWidth={true} sx={{}}>
                                                <Button variant="contained" onClick={onConsultarManejador}>
                                                    Consultar
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormControl fullWidth={true}>
                                                <TextField
                                                    label={"Nombres"}
                                                    value={pplAVisitar.nombre}
                                                    disabled={true}>

                                                </TextField>
                                            </FormControl>

                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormControl fullWidth={true}>
                                                <TextField
                                                    label={"Apellidos"}
                                                    value={pplAVisitar.apellido}
                                                    disabled={true}>

                                                </TextField>
                                            </FormControl>

                                        </Grid>
                                    </Grid>}
                                    {pplIdentificado && <Grid container>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth variant="outlined">
                                                <Typography
                                                    sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                                    Entrada o Salida
                                                </Typography>

                                                <RadioGroup
                                                    value={entrada_salida}
                                                    onChange={onEntradaSalidaSelectChange}
                                                    row
                                                    aria-labelledby="entradaSalida"
                                                    name="entrada_salida">
                                                    <FormControlLabel
                                                        value={true}
                                                        control={<Radio/>}
                                                        label="Entrada"/>
                                                    <FormControlLabel
                                                        value={false}
                                                        control={<Radio/>}
                                                        label="Salida"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {entrada_salida != null &&
                                            <Grid container spacing={2}>
                                                <Grid item sm={12}>
                                                    <FormControl fullWidth={true}>
                                                        <TextField
                                                            multiline
                                                            minRows={3}
                                                            label={"Observación"}
                                                            value={entradaVisitante.observacion}
                                                            disabled={false}>

                                                        </TextField>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item sm={12}>
                                                    <FormControl fullWidth={true} sx={{}}>
                                                        <Button variant="contained" onClick={solicitarIngresoPPL}>
                                                            Solicitar Autorización
                                                        </Button>
                                                    </FormControl>
                                                </Grid>
                                                {autorizarIngreso === "autorizado" &&
                                                    <Grid item sm={12} alignItems={"center"}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <Button startIcon={<ThumbUp/>} sx={{
                                                                borderRadius: "50%",
                                                                backgroundColor: "#008000",
                                                                width: "200px",
                                                                height: "200px",
                                                            }}
                                                                    variant="contained">
                                                                Aprobado
                                                            </Button>
                                                        </Box>
                                                    </Grid>


                                                }
                                                {autorizarIngreso === "noAutorizado" &&
                                                    <Grid item sm={12} alignItems={"center"}>
                                                        <Box sx={{textAlign: "center"}}>
                                                            <Button startIcon={<ThumbDown/>} sx={{
                                                                borderRadius: "50%",
                                                                backgroundColor: "#FF0000",
                                                                width: "200px",
                                                                height: "200px",
                                                            }}
                                                                    variant="contained">
                                                                No Aprobado
                                                            </Button>
                                                        </Box>
                                                    </Grid>


                                                }
                                                {autorizarIngreso === "consultando" &&
                                                    <Grid item sm={12} alignItems={"center"}>
                                                        <Box sx={{display: "flex", justifyContent: "center"}}>
                                                            <CircularProgress size={200}/>
                                                        </Box>
                                                    </Grid>


                                                }
                                            </Grid>

                                        }

                                    </Grid>}

                                </Grid>


                            </Box>
                        </Grid>

                    </Grid>

                </Box>
            </FormControl>
        </>
    )
}