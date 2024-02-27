import * as React from 'react';

import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {API_REGISTRO} from "../../../../config";


const ENDPOINT : string = `/gestion_ppl/ppls`

const header = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'genero', label: 'Genero' },
    { id: 'fechaDeNacimiento', label: 'Fecha nacimiento', type: 'date' },
    { id: 'estado_perfil', label: 'Estado Perfil' },
]

async function getDatos(endpoint:string=""){

    const res = await fetch(`${API_REGISTRO}${endpoint}`)

    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}

export default async function Page(){

    const ppls_lista = await getDatos(ENDPOINT)



    if (!ppls_lista) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress/>
            </Box>
        );
    }


    return(
        <div>
            <TituloComponent titulo='Gestion PPL' />
            <Grid container mt={3}>
                <Grid item sm={12}>
                    <Paper elevation={1}>
                        {/*<Box p={3}>
                            <FiltrosTables/>
                        </Box>*/}
                        <CustomTable headers={header} data={ppls_lista} showId={false}
                                     options={{
                                         deleteOption: false,
                                         rowsPerPageCustom: 10,
                                         pagination: true,
                                         targetURL: `/ppl`,
                                         busqueda: `numero_de_identificacion`,
                                     }}
                        />
                    </Paper>
                    {/*<DataTableComponent />*/}
                </Grid>
            </Grid>
        </div>
    )
}