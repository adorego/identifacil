
import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";
import FormVehiculo from "@/app/(sistema)/sistema/(movimientos)/vehiculo/[id]/FormVehiculo";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";


export default function Page({ params }: { params: { id: number } }){

    const listaDeMigajas = [
        {nombre:'Lista de vehiculos', url:'/sistema/vehiculo', lastItem: false},
        {nombre:'Vehiculo', url:'', lastItem: true},
    ];

    return(
        <>
            <TituloComponent titulo='Vehiculo'>
                <BreadCrumbComponent listaDeItems={listaDeMigajas} />
            </TituloComponent>
            <Box mt={2}>
                <Paper elevation={1} sx={{
                    p: "20px",
                }}>
                    <FormVehiculo params={params}/>
                </Paper>
            </Box>
        </>
    );
}