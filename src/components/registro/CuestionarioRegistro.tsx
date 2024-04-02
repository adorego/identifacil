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
import BloqueGaleria from "@/app/(sistema)/cuestionario/components/BloqueGaleria";

// const steps = [
//   'Reconocimiento',
//   'Datos Personales',
//   'Cuestionarios',
//   'confirmacion',
// ];

//TODO: numeroDeIdentificacion ver que tipo debe ser y datos de identidad
interface CuestionarioRegistroProps {
    datosDeIdentidad:DatosDeIdentificacion;
    id_persona: number | null;
}

const CuestionarioRegistro: FC<CuestionarioRegistroProps> = ({datosDeIdentidad, id_persona}) => {
    const [expanded, setExpanded] = useState('');
    console.log(datosDeIdentidad)
    console.log(id_persona)

    const handleAccordionChange = (panel: string) => (_: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    };


    return (
        <div>
            <Typography variant='h6' textTransform='uppercase' mb={2}>Cuestionario de Ingreso</Typography>

            <Box className=''>
                {/* Acordeon Salud */}
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
                        <BloqueDatosPersonales datosDeIdentificacion={datosDeIdentidad} handleAccordion={setExpanded}/>
                    </AccordionDetails>

                </Accordion>

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
                            handleAccordion={setExpanded}
                            codigo_genero={datosDeIdentidad.codigo_genero}
                            id_persona={id_persona}/>
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
                        {datosDeIdentidad.id_persona && <BloqueEducacion handleAccordion={setExpanded}  id_persona={datosDeIdentidad.id_persona}/>}
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
                        {datosDeIdentidad.id_persona &&
                            <BloqueFamiliar
                                handleAccordion={setExpanded}
                                id_persona={datosDeIdentidad.id_persona}/>
                        }
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
                        {datosDeIdentidad.id_persona &&
                            <BloqueSeguridad
                                handleAccordion={setExpanded}
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
                        {datosDeIdentidad.id_persona &&
                            <BloqueJudicial
                                handleAccordion={setExpanded}
                                id_persona={datosDeIdentidad.id_persona}/>}
                    </AccordionDetails>

                </Accordion>

                {/* Acordeon Fotografia */}
                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography  sx={{fontWeight: 'bold'}}>Fotografias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BloqueGaleria id_persona={id_persona} datosIniciales={[]}/>
                </AccordionDetails>
            </Accordion>

            </Box>
        </div>
    )
}

export default CuestionarioRegistro;