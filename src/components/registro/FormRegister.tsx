'use client'

import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React, { ChangeEvent, useState } from "react";

import FacialRecognition from "./FacialRecognition";
import IdentificationForm from "./IdentificationForm";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Registro"];
export default function FormRegister(){
  const [activeStep, setActiveStep] = useState(0);
  

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
    <>
      <FormControl className={style.form}>
        <Typography variant="h6">Registro PPL</Typography>
        <Stepper sx={{padding:"8px"}} activeStep={activeStep}>
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
        {activeStep === 0 && <IdentificationForm /> }
        {activeStep === 1 && <FacialRecognition /> }
        {activeStep === 2 && <PPLRegistration foto="" /> }
        
        <Grid container spacing={5}>
          <Grid sx={{display:"flex", justifyContent:"end"}} item xs={6}>
            <Button variant="contained" onClick={onStepBackward} startIcon={<KeyboardArrowLeft />}>
              Anterior
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight />}>
              Siguiente
            </Button>
          </Grid>
          
        </Grid>
      
      </FormControl>
    </>
  )
}