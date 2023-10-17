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
import NotificacionRegistro from "./NotificacionRegistro";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Registro"];

export default function FormRegister(){
  const [activeStep, setActiveStep] = useState(0);
  const [habilitarBotonSiguiente, setHabilitarBotonSiguiente] = useState(false);
  const [desplegarRegistroFinal, setDesplegarRegistroFinal] = useState(false);
  const identidad = useRef<IdentificacionForm | null>(null);
  const foto = useRef<string | null>(null);

    const setIdentificacion = (identificacion: IdentificacionForm) => {
        // console.log("Datos de identificacion:", identificacion);
        identidad.current = identificacion;
    }

    const setFoto = (fotoParam: string) => {
        foto.current = fotoParam;
        console.log(foto.current);
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
  if(desplegarRegistroFinal){
    return(
      <NotificacionRegistro foto={foto.current} open={true}/>
    )
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
            {activeStep === 1 && <FaceRecognition  
            actualizarFoto={setFoto}
            mostrar_registro_final={mostrarRegistroFinal} />}

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
    
    
    
    
  