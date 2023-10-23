import * as React from 'react';
import {Box, Breadcrumbs, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import QueryBlock from "../../../components/blocks/QueryBlock";



export default function Page(){

    return(
        <Box>
            <h2>Por ingresos</h2>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Inicio
                </Link>
                <Link underline="hover" color="inherit" href="/informes">
                    Informes
                </Link>
                <Typography color="text.primary">Ingresos</Typography>
            </Breadcrumbs>

            <QueryBlock/>
            <Grid container spacing={2} mt={2}>
                <Grid item={3}>
                    <Box className='cardContainer' width='100%'>
                        <Typography variant='h6'>Por grado academico</Typography>
                        <Typography variant='body'>Alguna informacion importante para destaca</Typography>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}