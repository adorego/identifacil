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
import React, {ChangeEvent, ReactElement, ReactNode, useRef, useState} from "react";

import FaceRecognition from "./FaceRecognition";
import { IReconocimiento } from "./FaceDetectionOverlay";
import NotificacionRegistro from "./NotificacionRegistro";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Registro"];

export default function FormRegister(){
  const [activeStep, setActiveStep] = useState(0);
  const [habilitarBotonSiguiente, setHabilitarBotonSiguiente] = useState(false);
  const [desplegarRegistroFinal, setDesplegarRegistroFinal] = useState(false);
  const identidad = useRef<IdentificacionForm | null>(null);
  const reconocimientos = useRef<Array<IReconocimiento>>([])
  const foto = useRef<string | null>(null);
  const contadorReconocimiento = useRef<number>(0);

    const setIdentificacion = (identificacion: IdentificacionForm) => {
        // console.log("Datos de identificacion:", identificacion);
        identidad.current = identificacion;
    }

    
    const agregar_reconocimiento = async (reconocimiento:IReconocimiento) =>{
      // console.log("Entro en agregar_reconocimiento");
      reconocimientos.current.push(reconocimiento);
      contadorReconocimiento.current++;
      if(contadorReconocimiento.current === 3){
        const datos = {
          tipo_identificacion:'cedula',
          numero_identificacion:identidad.current?.cedula_identidad,
          nombres:identidad.current?.nombres,
          apellidos:identidad.current?.apellidos,
          genero:identidad.current?.codigo_genero,
          foto1:reconocimientos.current[0].foto,
          descriptor1:reconocimientos.current[0].descriptor,
          foto2:reconocimientos.current[1].foto,
          descriptor2: reconocimientos.current[1].descriptor,
          foto3: reconocimientos.current[2].foto,
          descriptor3: reconocimientos.current[2].descriptor
        }
        contadorReconocimiento.current = 0;
        console.log("Datos a enviar:", datos);
        if(process.env.NEXT_PUBLIC_SERVER_URL){
          const result = await fetch(process.env.NEXT_PUBLIC_SERVER_URL,{
            method:'POST',
            headers:{
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(datos)
          })
          if(!result.ok){
            console.log('Ocurrio un error');
          }
        }
      }
    }

    const mostrarRegistroFinal = (mostrar: boolean) => {
        console.log("Se presiono Capturar", foto.current, identidad.current);
        setDesplegarRegistroFinal(mostrar);
    }


    const onStepForward = () => {
        if (activeStep === 2) {
            setActiveStep(0);
        } else {
            setActiveStep(activeStep + 1);
        }
    }

  const onStepBackward = () =>{
    if(activeStep === 0){
      setActiveStep(2);
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
            />}

            {activeStep === 2 && <PPLRegistration foto="" /> }
            
            
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
    
    
    
    
  