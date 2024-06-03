'use client'

import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useContext, useEffect, useState} from "react"
import {IdentificationResponse, initialResponse} from "../../../../model/respuesta-identificacion";
import {ThumbDown, ThumbUp} from "@mui/icons-material";

import {Dayjs} from "dayjs";
import FaceRecognitionWithLayout from "@/components/registro/FaceRecognitionWithLayout";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import style from "./page.module.css";
import {useGlobalContext} from "@/app/Context/store";
import { error } from "console";
import { api_request } from "@/lib/api-request";
import { log } from "loglevel";
import { exit } from "process";
import {signIn, useSession} from "next-auth/react";

const NUMERO_DE_CAPTURAS:number=3;

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

export interface RegistroDeIngreso {

}

export default function EntradaSalidaPPL() {
    const [progresoReconocimiento, setProgresoReconocimiento] = useState(EstadosProgreso[0]);
    const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
    const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse)
    const [pplIdentificado, setPPLIdentificado] = useState(false);
    const [entrada_salida, setEntradaSalida] = useState<boolean | null>(null);
    const [autorizarIngreso, setAutorizarIngreso] = useState<string>("inicio");
    const [entradaPPL, setEntradaPPL] = useState<EntradaPPL>(entradaPPLInicial);
    const [salidaPPL, setSalidaPPL] = useState<SalidaPPL>(salidaPPLInicial)
    const [mensaje, setMensaje] = useState("");
    const {openSnackbar} = useGlobalContext();
    const {selectedEstablecimiento} = useGlobalContext();
    const { data: session, status } = useSession();


    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/identificacion/`;
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
            console.log('checkpoint 2')
            const data: IdentificationResponse = await response.json();
            console.log(data)
            console.log("Datos devueltos:", data);
            setProgresoReconocimiento(EstadosProgreso[0]);
            // @ts-ignore
            if(data.identificado){
                setPPLIdentificado(data.identificado);
            if(data.identificado){
                openSnackbar(`Persona Reconocida: ${data.nombres}, apellido:${data.apellidos}. ${data.esPPL ? 'Esta persona es PPL.' : ''}.`);
            }else{
                openSnackbar(`Persona no se encuentra registrada.`, 'warning');
            }
                setIdentificationData({
                id_persona:data.id_persona,    
                identificado:data.identificado,
                numeroDeIdentificacion: data.numeroDeIdentificacion ? data.numeroDeIdentificacion : '',
                nombres: data.nombres ? data.nombres : '',
                apellidos: data.apellidos ? data.apellidos : '',
                esPPL: data.esPPL })
            }else{
                setPPLIdentificado(false);
                openSnackbar(`PPL No identificado`,"error");
            }
            
            
        }
    }

    const handleChange = (event:any)=>{
        setEntradaPPL(prev=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
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

    const solicitarIngresoPPL = async () => {
       const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/entrada_salida/ppls/entrada`
       
       if(!identificationData.id_persona){
            openSnackbar(`PPL No identificado`,"error");
       }else if(!selectedEstablecimiento || selectedEstablecimiento==0){

            openSnackbar(`No tiene seleccionado ningún establecimiento`,"error");

       }else{
            try{
                const fecha_hora = new Date();
                const respuestaRegistroDeEntrada = await api_request(url,{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({
                        id_persona:identificationData.id_persona,
                        fecha_ingreso:`${fecha_hora.getFullYear()}/${fecha_hora.getMonth()}/${fecha_hora.getDate()}`,
                        hora_ingreso:`${fecha_hora.getHours()}/${fecha_hora.getMinutes()}/${fecha_hora.getSeconds()}`,
                        establecimiento:selectedEstablecimiento
                    })
                });
                console.log("Respuesta:",respuestaRegistroDeEntrada)
                if(respuestaRegistroDeEntrada.datos.success){
                    openSnackbar(`Registro de ingreso autorizado`,"success");
                }else{
                    openSnackbar(`Registro de ingreso no autorizado`,"error");
                }
                
            }catch(error){
                log(`Ocurrió un error en el envío de datos al servidor:${error}`);
                openSnackbar(`Ocurrió un error en el envío de datos al servidor:${error}`,"error");

            }
        }
    }


    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading') {
        return(
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        <CircularProgress/>
                    </Box>
                </Box>
            </div>
        )
    }

    if (!session) {
        signIn();
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        Regirigiendo...
                    </Box>
                </Box>
            </div>
        )
    }

    return (
        <Box sx={{padding: '20px'}}>
            <FormControl className={style.form}>
                <Typography variant="h6">Entrada/Salida PPL</Typography>
                <Box mt={2} sx={{
                    backgroundColor: '#FFF',
                    paddingY: '20px',
                    paddingX: '30px',
                    borderRadius: '16px',
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                }}>
                    <Grid container>
                        <Grid item sm={6}>
                            <Box>
                                <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px", textAlign: "center"}}>
                                    Identificación del PPL
                                </Typography>

                                <FaceRecognitionWithLayout
                                    capturas={NUMERO_DE_CAPTURAS}
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
                            <Grid container spacing={2} px={2}>
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
                                <Grid item sm={6}>
                                    <FormControl fullWidth={true}>
                                        <TextField
                                            label={"Nombres"}
                                            value={identificationData.nombres}
                                            disabled={true}>

                                        </TextField>
                                    </FormControl>

                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth={true}>
                                        <TextField
                                            label={"Apellidos"}
                                            value={identificationData.apellidos}
                                            disabled={true}>

                                        </TextField>
                                    </FormControl>

                                </Grid>
                               
                            </Grid>
                            {
                                pplIdentificado &&
                                (
                                    <Grid container spacing={2} px={2} mt={2}>
                                        <Grid item xs={12}>
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
                                        {
                                            entrada_salida != null &&
                                            (
                                                <Grid container spacing={2} px={2}>
                                                    <Grid item sm={12}>
                                                        <FormControl fullWidth={true}>
                                                            <TextField
                                                                multiline
                                                                minRows={3}
                                                                name='observacion'
                                                                onChange={handleChange}
                                                                label={"Observación"}
                                                                value={entradaPPL.observacion}
                                                                >

                                                            </TextField>
                                                        </FormControl>

                                                    </Grid>
                                                    <Grid item sm={12}>
                                                        <FormControl fullWidth={true} sx={{}}>
                                                            <Button variant="contained" onClick={solicitarIngresoPPL}>
                                                                Autorizar
                                                            </Button>
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                    {autorizarIngreso === "consultando" &&
                                                        <Grid item sm={12} alignItems={"center"}>
                                                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                                                <CircularProgress size={30}/>
                                                            </Box>
                                                        </Grid>


                                                    }
                                                </Grid>
                                            )

                                        }

                                    </Grid>
                                )
                            }

                        </Grid>

                    </Grid>

                </Box>
            </FormControl>
        </Box>
    )
}