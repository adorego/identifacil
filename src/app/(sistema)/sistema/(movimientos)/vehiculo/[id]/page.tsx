
import * as React from 'react';
import TituloComponent from "@/components/titulo/tituloComponent";
import {Box, Paper,} from "@mui/material";
import FormVehiculo from "@/app/(sistema)/sistema/(movimientos)/vehiculo/[id]/FormVehiculo";


export default function Page({ params }: { params: { id: number } }){


    return(
        <>
            <TituloComponent titulo='Vehiculo' />
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