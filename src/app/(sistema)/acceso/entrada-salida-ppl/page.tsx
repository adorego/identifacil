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
import {IdentificationResponse} from "../../identificacion/page";
import {initialResponse} from '@/components/utils/initialData'
import {ThumbDown, ThumbUp} from "@mui/icons-material";

import {Dayjs} from "dayjs";
import FaceRecognitionWithLayout from "@/components/registro/FaceRecognitionWithLayout";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import style from "./page.module.css";

const EstadosProgreso: Array<string> = ['No iniciado', 'Obteniendo los datos del rostro', 'Consultando a la Base de Datos', 'Datos disponibles'];
export interface SalidaPPL {
    fechaDeSalida: Dayjs | null;
    tipoDeSalida: string;
    fechaDeEntrada: Dayjs | null;
}

const salidaPPLInicial: SalidaPPL = {
    fechaDeSalida: null,
    tipoDeSalida: "",
    fechaDeEntrada: null
}

export interface EntradaPPL {
    fechaDeEntrada: Dayjs | null;
    observacion: string;
    establecimiento: number;

}

const entradaPPLInicial: EntradaPPL = {
    fechaDeEntrada: null,
    observacion: "",
    establecimiento: 1,
}


export default function Page() {
    const [progresoReconocimiento, setProgresoReconocimiento] = useState(EstadosProgreso[0]);
    const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
    const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse)
    const [pplIdentificado, setPPLIdentificado] = useState(false);
    const [entrada_salida, setEntradaSalida] = useState<boolean | null>(null);
    const [autorizarIngreso, setAutorizarIngreso] = useState<string>("inicio");
    const [entradaPPL, setEntradaPPL] = useState<EntradaPPL>(entradaPPLInicial);
    const [salidaPPL, setSalidaPPL] = useState<SalidaPPL>(salidaPPLInicial)
    const [mensaje, setMensaje] = useState("");

    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/identificacion/`;
        // console.log('url:', url);
        const dataToSend = {
            descriptorFacial: reconocimiento.descriptor
        }
        // console.log("Data to send:", dataToSend);
        setProgresoReconocimiento(EstadosProgreso[2]);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (!response.ok) {
            const data = await response.json();
            console.log('Ocurrio un error:', data);
        } else {
            const data: IdentificationResponse = await response.json();
            setProgresoReconocimiento(EstadosProgreso[0]);
            setPPLIdentificado(true);
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
        setProgresoReconocimiento(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () => {
        setProgresoReconocimiento(EstadosProgreso[0]);
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
        <Box sx={{padding: '20px'}}>
            <FormControl className={style.form}>
                <Typography variant="h6">Entrada/Salida PPL</Typography>
                <Box sx={{
                    backgroundColor: '#FFF',
                    paddingY: '20px',
                    paddingX: '30px',
                    borderRadius: '16px',
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                }}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Box sx={{
                                backgroundColor: '#FFF',
                                paddingY: '20px',
                                paddingX: '30px',
                                borderRadius: '16px',
                                boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                            }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        mt: "10px",
                                        textAlign: "center"
                                    }}>
                                    Identificación del PPL
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
                        <Grid item sm={6}>
                            <Box sx={{
                                backgroundColor: '#FFF',
                                paddingY: '20px',
                                paddingX: '30px',
                                borderRadius: '16px',
                                boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                            Datos del PPL
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
                                </Grid>
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
                                                        value={entradaPPL.observacion}
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


                            </Box>
                        </Grid>

                    </Grid>

                </Box>
            </FormControl>
        </Box>
    )
}