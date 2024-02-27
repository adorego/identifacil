'use client'

import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from "@mui/material";
import IdentificacionForm, {DatosDeIdentificacion} from "./identificacionForm";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import React, {ChangeEvent, ReactElement, ReactNode, useEffect, useRef, useState} from "react";

import ConfirmacionRegistro from "./ConfirmacionRegistro";
import CuestionarioRegistro from "./CuestionarioRegistro";
import FaceRecognitionWithLayout from "./FaceRecognitionWithLayout";
import {IReconocimiento} from "./FaceDetectionOverlay";
import Identificacion from "@/app/(sistema)/identificacion/page";
import log from "loglevel";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Cuestionarios", "Confirmacion"];
export const EstadosProgreso: Array<string> = ['No iniciado', 'Generando datos biométricos', 'Almacenando en la Base de Datos', 'Registro completo', 'Ocuurio un error'];

export interface RegistroResponse {
    success: boolean;
    id_persona: number;
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

export default function FormRegister() {
    const [activeStep, setActiveStep] = useState(0);
    const [botonesDeFlujo, setBotonesDeFlujo] = useState<botonesDeFlujo>(botonesDeFlujoEstadoInicial);
    const [progresoRegistro, setProgresoRegistro] = useState(EstadosProgreso[0]);
    const [mensaje, setMensaje] = useState("");
    const [registroRealizado, setRegistroRealizado] = useState(false);

    const identidad = useRef<DatosDeIdentificacion | null>(null);
    const reconocimientos = useRef<Array<IReconocimiento>>([])
    const foto = useRef<string | null>(null);
    const contadorReconocimiento = useRef<number>(0);
    const showSpinner = progresoRegistro === EstadosProgreso[0] ? false : true;


    // console.log("Identidad:", identidad);
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
                        mostrarBotonSiguiente: true,
                        habilitarBotonSiguiente: true,
                    })
                    break;

            }
        }, [activeStep]
    )


    const setIdentificacion = (identificacion: DatosDeIdentificacion) => {
        // console.log("Datos de identificacion:", identificacion);
        identidad.current = identificacion;
    }


    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
        console.log("Entro en agregar_reconocimiento");
        reconocimientos.current.push(reconocimiento);
        contadorReconocimiento.current++;
        if (contadorReconocimiento.current === 3) {
            await generar_request_enviar();
        }
    }

    const generar_request_enviar = async () => {
        console.log("Entro en generar_request_enviar");
        if (identidad.current != null) {
            const formData = new FormData();
            formData.append('tipo_identificacion', '1');
            formData.append('numero_identificacion', identidad.current.cedula_identidad ? identidad.current.cedula_identidad : "");
            formData.append('prontuario', identidad.current.prontuario ? identidad.current.prontuario : "");
            formData.append('es_extranjero', String(identidad.current.es_extranjero));
            formData.append('tiene_cedula', String(identidad.current.tiene_cedula));
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
            formData.append('esPPL', 'true');
            formData.append('establecimiento', String(1));

            contadorReconocimiento.current = 0;
            try {
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_persona`;
                console.log('url:', url);
                setProgresoRegistro(EstadosProgreso[2]);
                const result = await fetch(url, {
                    method: 'POST',
                    body: formData
                })

                if (!result.ok) {
                    const data = await result.json();
                    setProgresoRegistro(EstadosProgreso[3]);
                    setMensaje(`Ocurrió un error al realizar el registro, vuelva a intentarlo:${data.message}`);
                    log.error("Ocurrio un error durante el registro:", data);
                } else {
                    const data: RegistroResponse = await result.json() as RegistroResponse;
                    identidad.current.id_persona = data.id_persona;
                    setRegistroRealizado(true);
                    setProgresoRegistro(EstadosProgreso[0]);
                    onStepForward();
                    setMensaje("Registro realizado correctamente");

                }
            } catch (error) {
                setProgresoRegistro(EstadosProgreso[3]);
                setMensaje(`Ocurrió un error al realizar el registro, vuelva a intentarlo por favor`);
            }

        } else {
            log.error('Error antes de enviar los datos de registro, No existen los datos de identidad');
        }
    }


    const habilitarBotonSiguiente = (estado: boolean) => {
        setBotonesDeFlujo(
            (previus) => {
                return (
                    {
                        ...previus,
                        habilitarBotonSiguiente: estado
                    }
                )
            }
        )
    }

    const onStepForward = () => {
        if (activeStep === 3) {
            setActiveStep(0);
        } else {

            setActiveStep(activeStep + 1);
        }
    }

    const onStepBackward = () => {
        if (activeStep === 0) {
            setActiveStep(3);
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

    return (
        <Box sx={{paddingX: '0', width: '100%'}}>
            <FormControl className={''} sx={{width:'100%'}}>
                <Typography variant="h6">Registro PPL</Typography>
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
                    {activeStep === 0 && <IdentificacionForm
                        habilitarBotonSiguiente={habilitarBotonSiguiente}
                        actualizarIdentificacion={setIdentificacion}
                    />}
                    {activeStep === 1 && <FaceRecognitionWithLayout
                        etiquetaLabel="Capturar"
                        showSpinner={showSpinner}
                        progresoRegistro={progresoRegistro}
                        mensaje={mensaje}
                        cerrar_dialogo={cerrar_dialogo}
                        agregar_reconocimiento={agregar_reconocimiento}
                        actualizar_progreso={actualizar_progreso}/>
                    }

                    {activeStep === 2 && identidad.current && identidad.current.id_persona &&
                        <CuestionarioRegistro datosDeIdentidad={
                            identidad.current
                        } id_persona={identidad.current.id_persona}/>}

                    {activeStep === 3 && <ConfirmacionRegistro mensaje="PPL Registrado exitosamente"/>}

                    {/* Para pruebas*/}
                    {/* {activeStep === 0 && <CuestionarioRegistro id_persona={13} datosDeIdentidad={
                      {
                        cedula_identidad:"1130650",
                        nombres:"ANDRES",
                        apellidos:"DO REGO BARROS",
                        fecha_nacimiento:"21-07-1975",
                        codigo_genero:2,
                        id_persona:13,
                        es_extranjero:false,
                        tiene_cedula:true
                      }} />} */}


                    <Grid container pt={3} spacing={5}>
                        {
                            botonesDeFlujo.mostrarBotonAnterior &&
                            <Grid item xs={'auto'}>
                                <Button disabled={!botonesDeFlujo.habilitarBotonAnterior} variant="contained"
                                        onClick={onStepBackward}
                                        startIcon={<KeyboardArrowLeft/>}>
                                    Anterior
                                </Button>
                            </Grid>
                        }
                        {botonesDeFlujo.mostrarBotonSiguiente &&
                            <Grid item xs={'auto'}>
                                <Button disabled={!botonesDeFlujo.habilitarBotonSiguiente} variant="contained"
                                        onClick={onStepForward} endIcon={<KeyboardArrowRight/>}>
                                    Siguiente
                                </Button>
                            </Grid>}
                    </Grid>


                </Box>
            </FormControl>
        </Box>

    )
}
    
    
    
    
  