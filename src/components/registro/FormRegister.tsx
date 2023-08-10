'use client'

import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React, { ChangeEvent, useState } from "react";

import FaceRecognition from "./FaceRecognition";
import IdentificationForm from "./IdentificationForm";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Registro"];
export default function FormRegister(){
  const [activeStep, setActiveStep] = useState(0);
  const [habilitarBotonSiguiente, setHabilitarBotonSiguiente] = useState(false);
  

  const onStepForward = () =>{
    if(activeStep === 2){
      setActiveStep(0);
    }else{
      setActiveStep(activeStep+1);
    }
  }

  const onStepBackward = () =>{
    if(activeStep === 0){
      setActiveStep(2);
    }else{
      setActiveStep(activeStep-1);
    }
  }
  return(
    <Box sx={{margin:'30px'}}>
      <FormControl className={style.form}>
        <Typography variant="h6">Registro PPL</Typography>
        <Stepper sx={{marginTop:"8px",marginBottom:"8px",fontSize:32}} activeStep={activeStep}>
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
        {activeStep === 0 && <IdentificationForm habilitarBotonSiguiente={setHabilitarBotonSiguiente} /> }
        {activeStep === 1 && <FaceRecognition /> }
        {activeStep === 2 && <PPLRegistration foto="" /> }
        
        
        {activeStep !== 0 ? 
          <Grid container justifyContent={'center'} spacing={5}>
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
          <Grid container justifyContent={'center'}>
            <Grid item xs='auto'>
                <Button disabled={!habilitarBotonSiguiente} variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight />}>
                  Siguiente
                </Button>
            </Grid>
          </Grid>
        }
          
        
      
      </FormControl>
    </Box>
  )
}