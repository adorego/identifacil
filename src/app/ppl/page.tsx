'use client'



import Typography from '@mui/material/Typography';
import {Breadcrumbs, Grid, Link, Step, StepLabel, Stepper} from "@mui/material";
import DataTableComponent from "../../components/blocks/DataTableComponent";



const steps = [
    'Reconocimiento',
    'Datos Personales',
    'Cuestionarios',
];

export default function Movimientos(){

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