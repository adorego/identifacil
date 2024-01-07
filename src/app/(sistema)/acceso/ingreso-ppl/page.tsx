'use client'

import { Box, FormControl, Step, StepLabel, Stepper, Typography } from "@mui/material";

import style from "./page.module.css";
import { useState } from "react"

const steps:Array<string> = ["Identificación"]
export default function IngresoPPL(){
  const [activeStep, setActiveStep] = useState(0);
  return(
    <Box sx={{padding:'20px'}}>
          <FormControl className={style.form}>
            <Typography variant="h6">Ingreso PPL</Typography>
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


            </Box>
          </FormControl>
    </Box>
  )
}