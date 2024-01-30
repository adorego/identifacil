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
import IdentificationForm, {IdentificacionForm} from "./IdentificationForm";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import React, {ChangeEvent, ReactElement, ReactNode, useEffect, useRef, useState} from "react";

import CircularProgressionWithLabel from "@/common/CircularProgressionWithLabel";
import ConfirmacionRegistro from "./ConfirmacionRegistro";
import CuestionarioRegistro from "./CuestionarioRegistro";
import FaceRecognition from "./FaceRecognition";
import FaceRecognitionWithLayout from "./FaceRecognitionWithLayout";
import { IReconocimiento } from "./FaceDetectionOverlay";
import NotificacionRegistro from "./NotificacionRegistro";
import PPLRegistration from "./PPLRegistration";
import RegistrationData from "./RegistrationData";
import log from "loglevel";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Cuestionarios", "Confirmacion"];
export const EstadosProgreso:Array<string> = ['No iniciado', 'Generando datos biométricos', 'Almacenando en la Base de Datos','Registro completo','Ocuurio un error'];

export interface RegistroResponse{
  success:boolean;

}

export default function FormRegister(){
  const [activeStep, setActiveStep] = useState(0);
  const [habilitarBotonSiguiente, setHabilitarBotonSiguiente] = useState(false);
  const [desplegarRegistroFinal, setDesplegarRegistroFinal] = useState(false);
  const identidad = useRef<IdentificacionForm | null>(null);
  const reconocimientos = useRef<Array<IReconocimiento>>([])
  const foto = useRef<string | null>(null);
  const contadorReconocimiento = useRef<number>(0);
  const [progresoRegistro, setProgresoRegistro] = useState(EstadosProgreso[0]);
  const showSpinner = progresoRegistro === EstadosProgreso[0] ? false : true;
  const [mensaje, setMensaje] = useState("");
  const [registroRealizado, setRegistroRealizado] = useState(false);
  
  // console.log("Active step:", activeStep);
  useEffect(
    () =>{
      if(registroRealizado && activeStep === 1){
        setHabilitarBotonSiguiente(true);
      }else{
        console.log('Desabilitar boton siguiente');
        setHabilitarBotonSiguiente(false);
      }
    },[activeStep, registroRealizado]
  )
  
  console.log("Habilitar Boton siguiente:", habilitarBotonSiguiente);  
  const setIdentificacion = (identificacion: IdentificacionForm) => {
        // console.log("Datos de identificacion:", identificacion);
    identidad.current = identificacion;
  }

    
  const agregar_reconocimiento = async (reconocimiento:IReconocimiento) =>{
      reconocimientos.current.push(reconocimiento);
      contadorReconocimiento.current++;
      if(contadorReconocimiento.current === 3){
        await generar_request_enviar();
      }
  }

  const generar_request_enviar = async () =>{
      if(identidad.current != null && identidad.current.cedula_identidad){
        const formData = new FormData();
        formData.append('tipo_identificacion','1');
        formData.append('numero_identificacion', identidad.current.cedula_identidad);
        formData.append('nombres', identidad.current.nombres);
        formData.append('apellidos', identidad.current.apellidos);
        formData.append('genero', identidad.current.codigo_genero);
        formData.append('fechaDeNacimiento', identidad.current.fecha_nacimiento);
        formData.append('foto1', reconocimientos.current[0].foto);
        formData.append('descriptorFacial1', reconocimientos.current[0].descriptor.toString());
        formData.append('foto2', reconocimientos.current[1].foto);
        formData.append('descriptorFacial2', reconocimientos.current[1].descriptor.toString());
        formData.append('foto3', reconocimientos.current[2].foto);
        formData.append('descriptorFacial3', reconocimientos.current[2].descriptor.toString());
        formData.append('esPPL','true');
        
        contadorReconocimiento.current = 0;
        try{
            const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_persona`;
            console.log('url:', url);
            setProgresoRegistro(EstadosProgreso[2]);
            const result = await fetch(url,{
              method:'POST',
              body:formData
            })
            const data = await result.json();
            if(!result.ok){
              setProgresoRegistro(EstadosProgreso[3]);
              setMensaje(`Ocurrió un error al realizar el registro, vuelva a intentarlo:${data.message}`);
              log.error("Ocurrio un error durante el registro:",data);
            }else{
              setRegistroRealizado(true);
              setProgresoRegistro(EstadosProgreso[0]);
              onStepForward();
              setMensaje("Registro realizado correctamente");

            }
        }catch(error){
          setProgresoRegistro(EstadosProgreso[3]);
          setMensaje(`Ocurrió un error al realizar el registro, vuelva a intentarlo:${error}`);
        }
        
        }
    }
    

    const mostrarRegistroFinal = (mostrar: boolean) => {
        // console.log("Se presiono Capturar", foto.current, identidad.current);
        setDesplegarRegistroFinal(mostrar);
    }


    const onStepForward = () => {
            if (activeStep === 3) {
                setActiveStep(0);
            } else {
                
                setActiveStep(activeStep + 1);
            }
    }

    const onStepBackward = () =>{
        if(activeStep === 0){
          setActiveStep(3);
        }else{
          setActiveStep(activeStep-1);
        }
    }
      
    const actualizar_progreso = (progreso:number) =>{
      setProgresoRegistro(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () =>{
      setProgresoRegistro(EstadosProgreso[0]);
    }
      
    return(
        <Box sx={{padding:'20px'}}>
          <FormControl className={style.form}>
            <Typography variant="h6">Registro PPL</Typography>
            <Stepper sx={{marginY:"20px"}} activeStep={activeStep}>
              {steps.map(
                (label,index) =>{
                  return(
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
                    habilitarBotonSiguiente={setHabilitarBotonSiguiente} 
                    actualizarIdentificacion={setIdentificacion}
                    /> }
                    {activeStep === 1 && <FaceRecognitionWithLayout 
                      etiquetaLabel="Capturar"
                      showSpinner={showSpinner}
                      progresoRegistro={progresoRegistro}
                      mensaje={mensaje}
                      cerrar_dialogo={cerrar_dialogo}
                      agregar_reconocimiento={agregar_reconocimiento}
                      actualizar_progreso={actualizar_progreso} />
                    }
                    
                    {activeStep === 2 && identidad.current && <CuestionarioRegistro datosDeIdentidad={
                      identidad.current
                    } />}
                  
                    {activeStep === 3 && <ConfirmacionRegistro mensaje="PPL Registrado exitosamente" />}
            
                    {/* Para pruebas
                    {activeStep === 0 && <CuestionarioRegistro datosDeIdentidad={
                      {
                        cedula_identidad:"1130650",
                        nombres:"ANDRES",
                        apellidos:"DO REGO BARROS",
                        fecha_nacimiento:"21-07-1975",
                        codigo_genero:"2"
                      }
                    } />} */}
            
                    {activeStep !== 0 ? 
                        <Grid container  spacing={5} mt={1}>
                          <Grid item xs={'auto'}>
                            <Button variant="contained" 
                            onClick={onStepBackward} 
                            startIcon={<KeyboardArrowLeft />}>
                              Anterior
                            </Button>
                          </Grid> 
                          <Grid item xs={'auto'}>
                            <Button disabled={!habilitarBotonSiguiente} variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight />}>
                              Siguiente
                            </Button>
                          </Grid>
                        </Grid>
                      : 
                        <Grid container spacing={5} mt={1}>
                          <Grid item xs='auto'>
                              <Button disabled={!habilitarBotonSiguiente} variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight />}>
                                Siguiente
                              </Button>
                          </Grid>
                        </Grid>
                      }
                        
                      
                      </Box>
                    </FormControl>
                  </Box>

    )
}
    
    
    
    
  