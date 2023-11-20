import {Breadcrumbs, Button, Link, Stack, Typography, Box} from "@mui/material";
import * as React from "react";

export default function TituloComponent({titulo='Titulo'}){

    // TODO: Hacer un componente dinamico que recorra un objeto o array de la estructura del Breadcrumb
    return(
        <Stack direction="row" spacing={2}   justifyContent="space-between"
               alignItems="center">
            <Box>
                <h2>{titulo}</h2>
                {/*<Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/movimientos">
                        Movimientos
                    </Link>
                    <Typography color="text.primary">{titulo}</Typography>
                </Breadcrumbs>*/}
            </Box>
            <Box>
                
            </Box>
        </Stack>


    )
}