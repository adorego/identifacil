'use client'

import {Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, Step,
    StepLabel, Stepper, TextField, Typography } from "@mui/material";
import IdentificationForm, {IdentificacionForm} from "./IdentificationForm";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import React, {ChangeEvent, ReactElement, ReactNode, useRef, useState} from "react";

import ConfirmacionRegistro from "./ConfrimacionRegistro";
import CuestionarioRegistro from "./CuestionarioRegistro";
import FaceRecognition from "./FaceRecognition";
import { IReconocimiento } from "./FaceDetectionOverlay";
import NotificacionRegistro from "./NotificacionRegistro";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Cuestionarios", "Confirmacion"];

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
  const [notificacionRegistro, setNotificacionRegistro] = useState("");

    const setIdentificacion = (identificacion: IdentificacionForm) => {
        // console.log("Datos de identificacion:", identificacion);
        identidad.current = identificacion;
    }

    
    const agregar_reconocimiento = async (reconocimiento:IReconocimiento) =>{
      // console.log("Entro en agregar_reconocimiento");
      // setNotificacionRegistro('Registrando PPL...');
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
        // for(const entry of formData.entries()){
        //   console.log(entry);
        // }
        
        contadorReconocimiento.current = 0;
        //Sin Kubernetes
        const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/api/registro/`;
        const result = await fetch(url,{
          method:'POST',
          body:formData
        })
        const data = await result.json();
        if(!result.ok){
          console.log('Ocurrio un error', data);
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
  // if(desplegarRegistroFinal){
  //   return(
  //     // <NotificacionRegistro foto={foto.current} open={true}/>
  //   )
  // }
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
            {activeStep === 1 && <FaceRecognition  
            agregar_reconocimiento={agregar_reconocimiento}
            notificacion={notificacionRegistro}
            numero_de_capturas={3}
            />}

            {activeStep === 2 && <CuestionarioRegistro  /> }

            {activeStep === 3 && <ConfirmacionRegistro />}
            
            
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
                  <Button variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight />}>
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
    
    
    
    
  