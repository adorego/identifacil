import {API_REGISTRO} from '@/../config'
import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";


import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import TituloComponent from "@/components/titulo/tituloComponent";

const header = [
    { id: 'caratula_causa', label: 'Caratula' },
    { id: 'numeroDeExpediente', label: 'Nro. de la causa' },
    { id: 'numeroDeDocumento', label: 'Documento' },
    { id: 'anho', label: 'Año' },
    { id: 'fecha_de_compurgamiento_inicial', label: 'Compurgamiento' },
    { id: 'condenado', label: 'Condenado' },
    { id: 'estado_procesal', label: 'Situación procesal' },
]



async function getCausas(){
    const res = await fetch(`${API_REGISTRO}/datos_penales/causas`)
    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}

export default async function Page(){

    // const [data, setData] = useState(null);
    const causas = await getCausas()

    console.log(causas)

    const data = null
    /*useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/causas`;
        fetchData(apiUrl)
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []);*/

    if (!causas) {
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
        <>
            <Box mb={3}>
                <TituloComponent titulo='Causas' newEntry={'/causas/crear'}/>
            </Box>
            <Paper>
                <Box>
                    <Box p={3}>
                        <FiltrosTables />
                    </Box>
                    <CustomTable
                        headers={header}
                        data={causas}
                        showId={true}
                        options={{
                            rowsPerPageCustom:5,
                            deleteOption: false,
                            pagination: true,
                            targetURL: '/causas'
                        }}
                    />
                </Box>
            </Paper>
        </>
    )
}