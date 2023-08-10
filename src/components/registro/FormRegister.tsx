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
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import React, {ChangeEvent, useState} from "react";

// import FaceRecognition from "./FaceRecognition";
import IdentificationForm from "./IdentificationForm";
import PPLRegistration from "./PPLRegistration";
import style from "./FormRegister.module.css";

const steps = ["Identificación", "Reconocimiento", "Registro"];
export default function FormRegister() {
    const [activeStep, setActiveStep] = useState(0);


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
    return (
        <Box sx={{padding: '20px'}}>
            <FormControl className={style.form}>
                <Typography variant="h6">Registro PPL</Typography>
                <Stepper sx={{ marginY: '20px'}}  activeStep={activeStep}>
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
                {activeStep === 0 && <IdentificationForm/>}
                {/*{activeStep === 1 && <FaceRecognition /> }*/}
                {activeStep === 2 && <PPLRegistration foto=""/>}



                    <Grid container spacing={5} mt={1}>
                        {/*<Grid sx={{display: "flex", justifyContent: "end"}} item xs={6}>
                        <Button variant="contained" onClick={onStepBackward} startIcon={<KeyboardArrowLeft/>}>
                            Anterior
                        </Button>
                    </Grid>*/}
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={onStepForward} endIcon={<KeyboardArrowRight/>}>
                                Siguiente
                            </Button>
                        </Grid>

                    </Grid>
                </Box>

            </FormControl>
        </Box>
    )
}