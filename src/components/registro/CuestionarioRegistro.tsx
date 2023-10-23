'use client'

import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, Grid, Link, Step, StepLabel, Stepper, Typography } from "@mui/material"

import BloqueEducacion from '@/app/cuestionario/components/BloqueEducacion';
import BloqueFamiliares from '@/app/cuestionario/components/BloqueFamiliares';
import BloqueJudicial from '@/app/cuestionario/components/BloqueJudicial';
import BloqueSalud from '@/app/cuestionario/components/BloqueSalud';
import BloqueSeguridad from '@/app/cuestionario/components/BloqueSeguridad';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const steps = [
  'Reconocimiento',
  'Datos Personales',
  'Cuestionarios',
  'confirmacion',
];

const CuestionarioRegistro = () =>{
  const [expanded, setExpanded] = useState('');


    const handleAccordionChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : '');
    };

    // Manejador para apertura automatica de acordeon
    const handleFormSubmit = () => {
        // event.preventDefault();

        setExpanded('');
    };



    // Manejador para finalizar cuestionario
    const handleSubmitCuestionario = (event:any, tipoBoton) =>{
        //TipoBoton: 'continuar' || 'atras'
        event.preventDefault();
    }


  return(
    <div>
        <h2>Cuestionario de Ingreso</h2>
        {/* <div>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
        </div> */}

        {/* Stepper */}
        {/* <Box my={2}>
            <Stepper activeStep={2} alternativeLabel
                     sx={{
                         ".MuiSvgIcon-root:not(.Mui-completed)": {
                             color: "gray"
                         },
                         ".MuiStepIcon-text": {
                             fill: "#FFF",
                             fontWeight: 500
                         },
                         ".MuiSvgIcon-root.Mui-active": {
                             color: "green"
                         },
                         ".Mui-active .MuiStepIcon-text": {
                             fill: "white"
                         }
                     }}>
                {steps.map((label) => (
                    <Step key={label}  sx={{iconColor: 'red',}}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box> */}
        {/* Fin del stepper */}
        <Box className='cardContainer'>
            {/* Acordeon Salud */}
            <Accordion expanded={expanded === 'salud'} onChange={handleAccordionChange('salud')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{fontWeight:'bold'}}>Preguntas de salud</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Bloque de formulario */}
                    <BloqueSalud onCloseAccordion={handleFormSubmit} />
                </AccordionDetails>
            </Accordion>

            {/* Acordeon Educacion */}
            <Accordion expanded={expanded === 'educacion'} onChange={handleAccordionChange('educacion')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography sx={{fontWeight: 'bold'}}>Educación y formación</Typography>
                </AccordionSummary>
                <AccordionDetails> <BloqueEducacion onCloseAccordion={handleFormSubmit} /> </AccordionDetails>
            </Accordion>

            {/* Acordeon Seguridad */}
            <Accordion expanded={expanded === 'seguridad'} onChange={handleAccordionChange('seguridad')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography sx={{fontWeight: 'bold'}}>Preguntas de seguridad</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <BloqueSeguridad  onCloseAccordion={handleFormSubmit} />
                </AccordionDetails>
            </Accordion>

            {/* Acordeon familia */}
            <Accordion expanded={expanded === 'familiares'} onChange={handleAccordionChange('familiares')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography sx={{fontWeight: 'bold'}}>Datos familiares</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <BloqueFamiliares  onCloseAccordion={handleFormSubmit} />
                </AccordionDetails>
            </Accordion>

            {/* Acordeon Judicial */}
            <Accordion expanded={expanded === 'judicial'} onChange={handleAccordionChange('judicial')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography  sx={{fontWeight: 'bold'}}>Situación judicial</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BloqueJudicial onCloseAccordion={handleFormSubmit}  />
                </AccordionDetails>
            </Accordion>

            {/* Acordeon Fotografia */}
            {/*<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography  sx={{fontWeight: 'bold'}}>Fotografias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>*/}
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Button variant='contained' onClick={(event) => handleSubmitCuestionario(event, 'continuar')} sx={{marginRight: '20px',}}>
                        Continuar
                    </Button>

                    <Button variant='outlined'  onClick={(event) => handleSubmitCuestionario(event, 'atras')}>
                        Volver atras
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default CuestionarioRegistro;