'use client'


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Breadcrumbs, Link, Step, StepLabel, Stepper} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BloqueSalud from './components/BloqueSalud';
import BloqueEducacion from "./components/BloqueEducacion";
import BloqueSeguridad from "./components/BloqueSeguridad";
import BloqueFamiliares from "./components/BloqueFamiliares";
import BloqueJudicial from "./components/BloqueJudicial";



const steps = [
    'Reconocimiento',
    'Datos Personales',
    'Cuestionarios',
];

export default function About(){

    return(
        <div>
            <h2>Cuestionario de Ingreso</h2>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
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
            </div>
            <div>
                <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontWeight:'bold'}}>Preguntas de salud</Typography>
                    </AccordionSummary>
                    <AccordionDetails children={<BloqueSalud />} />
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Educación y formación</Typography>
                    </AccordionSummary>
                    <AccordionDetails children={<BloqueEducacion />} />
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Preguntas de seguridad</Typography>
                    </AccordionSummary>

                    <AccordionDetails children={<BloqueSeguridad />} />
                </Accordion>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{fontWeight: 'bold'}}>Datos familiares</Typography>
                    </AccordionSummary>

                    <AccordionDetails children={<BloqueFamiliares />} />
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography  sx={{fontWeight: 'bold'}}>Situación judicial</Typography>
                    </AccordionSummary>
                    <AccordionDetails children={<BloqueJudicial />} />
                </Accordion>

                <Accordion>
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
                </Accordion>

            </div>
        </div>
    )
}