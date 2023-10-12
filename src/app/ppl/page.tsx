'use client'


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Breadcrumbs, Grid, Link, Step, StepLabel, Stepper} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BloqueSalud from './components/BloqueSalud';
import BloqueEducacion from "./components/BloqueEducacion";
import BloqueSeguridad from "./components/BloqueSeguridad";
import BloqueFamiliares from "./components/BloqueFamiliares";
import BloqueJudicial from "./components/BloqueJudicial";
import DataTableComponent from "../../components/blocks/DataTableComponent";



const steps = [
    'Reconocimiento',
    'Datos Personales',
    'Cuestionarios',
];

export default function Ppl(){

    return(
        <div>
            <h2>Gestion de PPL</h2>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Gestion de PPL
                </Link>
                <Typography color="text.primary">Lista de PPL</Typography>
            </Breadcrumbs>


            <Grid container>
                <Grid item sm={12} mt={4}>
                    <DataTableComponent />
                </Grid>
            </Grid>
        </div>
    )
}