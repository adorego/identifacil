'use client'

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Link,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material"
import {FC, useState} from "react";

import BloqueDatosPersonales from "@/app/(sistema)/cuestionario/components/BloqueDatosPersonales";
import BloqueEducacion from "@/app/(sistema)/cuestionario/components/BloqueEducacion";
import BloqueFamiliar from "@/app/(sistema)/cuestionario/components/BloqueFamiliar";
import BloqueJudicial from "@/app/(sistema)/cuestionario/components/BloqueJudicial";
import BloqueSalud from '@/app/(sistema)/cuestionario/components/BloqueSalud';
import BloqueSeguridad from '@/app/(sistema)/cuestionario/components/BloqueSeguridad';
import { DatosDeIdentificacion } from "./identificacionForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Identificacion from "@/app/(sistema)/identificacion/page";

// const steps = [
//   'Reconocimiento',
//   'Datos Personales',
//   'Cuestionarios',
//   'confirmacion',
// ];

//TODO: numeroDeIdentificacion ver que tipo debe ser y datos de identidad
interface CuestionarioRegistroProps {
    datosDeIdentidad:DatosDeIdentificacion;
    id_persona: number;
}

const CuestionarioRegistro: FC<CuestionarioRegistroProps> = ({datosDeIdentidad, id_persona}) => {
    const [expanded, setExpanded] = useState('');


    const handleAccordionChange = (panel: string) => (_: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    };


    return (
        <div>
            <h2>Cuestionario de Ingreso</h2>

            <Box className='cardContainer'>
                {/* Acordeon Salud */}
                <Accordion expanded={expanded === 'salud'} onChange={handleAccordionChange('salud')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas de salud</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <BloqueSalud
                            id_persona={id_persona}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "personal"} onChange={handleAccordionChange('personal')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas personales</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Bloque de formulario */}
                        <BloqueDatosPersonales datosDeIdentificacion={datosDeIdentidad}/>
                    </AccordionDetails>

                </Accordion>
                <Accordion expanded={expanded === "educacion"} onChange={handleAccordionChange('educacion')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas sobre Educación</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Bloque de formulario */}
                        {datosDeIdentidad.id_persona && <BloqueEducacion id_persona={datosDeIdentidad.id_persona}/>}
                    </AccordionDetails>

                </Accordion>
                <Accordion expanded={expanded === "familiar"} onChange={handleAccordionChange('familiar')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas Familiares</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Bloque de formulario */}
                        {datosDeIdentidad.id_persona && <BloqueFamiliar
                            id_persona={datosDeIdentidad.id_persona}/>}
                    </AccordionDetails>

                </Accordion>
                <Accordion expanded={expanded === "seguridad"} onChange={handleAccordionChange('seguridad')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas de Seguridad</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Bloque de formulario */}
                        {datosDeIdentidad.id_persona && <BloqueSeguridad
                            id_persona={datosDeIdentidad.id_persona}/>}
                    </AccordionDetails>

                </Accordion>
                <Accordion expanded={expanded === "judicial"} onChange={handleAccordionChange('judicial')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas Judiciales</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Bloque de formulario */}
                        {datosDeIdentidad.id_persona && <BloqueJudicial
                            id_persona={datosDeIdentidad.id_persona}/>}
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
                {/* <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Button variant='contained' onClick={(event) => handleSubmitCuestionario(event, 'continuar')} sx={{marginRight: '20px',}}>
                        Continuar
                    </Button>

                    <Button variant='outlined'  onClick={(event) => handleSubmitCuestionario(event, 'atras')}>
                        Volver atras
                    </Button>
                </Grid>
            </Grid> */}
            </Box>
        </div>
    )
}

export default CuestionarioRegistro;