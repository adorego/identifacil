'use client'

import {Box, Button, CircularProgress, FormControl, Grid, Step, StepLabel, Stepper, Typography} from "@mui/material";
import IdentificationForm, {DatosDeIdentificacion} from "@/components/registro/identificacionForm";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import React, {useEffect, useRef, useState} from "react";

import ConfirmacionRegistro from "@/components/registro/ConfirmacionRegistro";
import {EstadosProgreso} from "@/components/registro/FormRegister";
import FaceRecognitionWithLayout from "@/components/registro/FaceRecognitionWithLayout";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import log from "loglevel";
import style from "./page.module.css"
import {useGlobalContext} from "@/app/Context/store";
import {signIn, useSession} from "next-auth/react";

const NUMERO_DE_RECONOCIMIENTOS:number=3;
enum ListaDeTiposDeRegistro{
    ninguno,
    cedula,
    identidad,
    prontuario
}
interface botonesDeFlujo {
    mostrarBotonAnterior: boolean;
    habilitarBotonAnterior: boolean;
    mostrarBotonSiguiente: boolean;
    habilitarBotonSiguiente: boolean;
}

const botonesDeFlujoEstadoInicial: botonesDeFlujo = {
    mostrarBotonAnterior: false,
    habilitarBotonAnterior: false,
    mostrarBotonSiguiente: true,
    habilitarBotonSiguiente: false,
}

const steps = ["Identificación", "Reconocimiento", "Confirmacion"];
export default function RegistroVisitante() {
    const [activeStep, setActiveStep] = useState(0);
    const [botonesDeFlujo, setBotonesDeFlujo] = useState<botonesDeFlujo>(botonesDeFlujoEstadoInicial);
    const identidad = useRef<DatosDeIdentificacion | null>(null);
    const [habilitarBotonSiguiente, setHabilitarBotonSiguiente] = useState(false);
    const [progresoRegistro, setProgresoRegistro] = useState(EstadosProgreso[0]);
    const showSpinner = progresoRegistro === EstadosProgreso[0] ? false : true;
    const [tipo_de_registro,setTipoDeRegistro] = useState<ListaDeTiposDeRegistro>(ListaDeTiposDeRegistro.ninguno);
    const [mensaje, setMensaje] = useState("");
    const reconocimientos = useRef<Array<IReconocimiento>>([]);
    const contadorReconocimiento = useRef<number>(0);
    const {openSnackbar} = useGlobalContext();
    const { data: session, status } = useSession();

    useEffect(
        () => {
            switch (activeStep) {
                case(0):
                    setBotonesDeFlujo({
                        mostrarBotonAnterior: false,
                        habilitarBotonAnterior: false,
                        mostrarBotonSiguiente: true,
                        habilitarBotonSiguiente: false,
                    })
                    break;
                case(1):
                    setBotonesDeFlujo({
                        mostrarBotonAnterior: true,
                        habilitarBotonAnterior: true,
                        mostrarBotonSiguiente: false,
                        habilitarBotonSiguiente: false,
                    })
                    break;
                case(2):
                    setBotonesDeFlujo({
                        mostrarBotonAnterior: false,
                        habilitarBotonAnterior: false,
                        mostrarBotonSiguiente: false,
                        habilitarBotonSiguiente: false,
                    })
                    break;

            }
        }, [activeStep]
    )

    const setIdentificacion = (identificacion: DatosDeIdentificacion) => {
       
        identidad.current = identificacion;
    }
    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
       
        reconocimientos.current.push(reconocimiento);
        contadorReconocimiento.current++;
       
        if (contadorReconocimiento.current == NUMERO_DE_RECONOCIMIENTOS) {
            await generar_request_enviar();
        }
    }

    const generar_request_enviar = async () => {
       
        if (identidad.current) {
            const formData = new FormData();
            formData.append('tipo_identificacion', '1');
            formData.append('nombres', identidad.current.nombres);
            formData.append('apellidos', identidad.current.apellidos);
            formData.append('genero', String(identidad.current.codigo_genero));
            formData.append('fechaDeNacimiento', identidad.current.fecha_nacimiento);
            formData.append('foto1', reconocimientos.current[0].foto);
            formData.append('descriptorFacial1', reconocimientos.current[0].descriptor.toString());
            formData.append('foto2', reconocimientos.current[1].foto);
            formData.append('descriptorFacial2', reconocimientos.current[1].descriptor.toString());
            formData.append('foto3', reconocimientos.current[2].foto);
            formData.append('descriptorFacial3', reconocimientos.current[2].descriptor.toString());
            formData.append('esPPL', 'false');
            if(identidad.current.cedula_identidad){
                formData.append("numero_identificacion",identidad.current.cedula_identidad) ;
            }else if(identidad.current.numeroDeIdentificacion){
                formData.append("numero_identificacion",identidad.current.numeroDeIdentificacion);
            }else if(identidad.current.prontuario){
                formData.append("prontuario",identidad.current.prontuario);
            }

            contadorReconocimiento.current = 0;
            //Sin Kubernetes
            try {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_persona`;
                setProgresoRegistro(EstadosProgreso[2]);
                const result = await fetch(url, {
                    method: 'POST',
                    body: formData
                })
                const data = await result.json();
                if (!result.ok) {
                    setProgresoRegistro(EstadosProgreso[3]);
                    log.error('Ocurrio un error:', data);
                    setMensaje(`Ocurrió un error al realizar el registro:
                    ${data.message}`);
                } else {
                    onStepForward();
                    setProgresoRegistro(EstadosProgreso[0]);
                    setMensaje("Registro realizado correctamente");

                }

            } catch (error) {
                setProgresoRegistro(EstadosProgreso[3]);
                setMensaje(`Ocurrió un error al realizar el registro:${error}`);
                setActiveStep(0);
            }
        }
    }

    const onStepForward = () => {
        if (activeStep === 2) {
            setActiveStep(0);
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    const onStepBackward = () => {
        if (activeStep === 0) {
            setActiveStep(2);
        } else {
            setActiveStep(activeStep - 1);
        }
    }

    const actualizar_progreso = (progreso: number) => {
        setProgresoRegistro(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () => {
        setProgresoRegistro(EstadosProgreso[0]);
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
                <Typography variant="h6">Registro Visitante</Typography>
                <Stepper sx={{marginY: "20px"}} activeStep={activeStep}>
                    {steps.map(
                        (label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        }
                    )}
                </Stepper>
                <Box sx={{
                    backgroundColor: '#FFF',
                    paddingY: '20px',
                    paddingX: '30px',
                    borderRadius: '16px',
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                }}>
                    {activeStep === 0 && <IdentificationForm
                        identificar_ppl={false}
                        es_extranjero={false}
                        habilitarBotonSiguiente={setHabilitarBotonSiguiente}
                        actualizarIdentificacion={setIdentificacion}
                    />}
                    {activeStep === 1 && 
                    <FaceRecognitionWithLayout
                        capturas={NUMERO_DE_RECONOCIMIENTOS}
                        etiquetaLabel="Capturar"
                        showSpinner={showSpinner}
                        progresoRegistro={progresoRegistro}
                        mensaje={mensaje}
                        cerrar_dialogo={cerrar_dialogo}
                        agregar_reconocimiento={agregar_reconocimiento}
                        actualizar_progreso={actualizar_progreso}/>
                    }
                    {activeStep === 2 && <ConfirmacionRegistro 
                        registro_ppl={false}
                        etiqueta_boton_izquierdo="Registrar otro Visitante"
                        mensaje="Visitante Registrado exitosamente"/>}


                  
                        <Grid container spacing={5} mt={1}>
                            {botonesDeFlujo.mostrarBotonAnterior &&
                                <Grid item xs={'auto'}>
                                    <Button disabled={!botonesDeFlujo.habilitarBotonAnterior} variant="outlined"
                                            onClick={onStepBackward}
                                            startIcon={<KeyboardArrowLeft/>}>
                                        Anterior
                                    </Button>
                                </Grid>
                           }
                           {botonesDeFlujo.mostrarBotonSiguiente &&
                           <Grid item xs='auto'>
                                <Button disabled={!habilitarBotonSiguiente} variant="contained" onClick={onStepForward}
                                        endIcon={<KeyboardArrowRight/>}>
                                    Siguiente
                                </Button>
                            </Grid>
                          }
                        </Grid>
                    

                </Box>
            </FormControl>
        </Box>
    )
}
