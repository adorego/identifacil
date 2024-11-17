import {Box, Grid, Typography} from "@mui/material";
import * as React from "react";
import {IntervencionSingular, IntervencionSingularInitial} from "@/app/api/interfaces/intervencionSingular";
import {useEffect, useState} from "react";
import {getIntervencion} from "@/app/api/lib/defensores/intervenciones";



export default function IntervencionesDashboard({id_intervencion}:{id_intervencion:string|number}) {

    const [data, setData] = useState<IntervencionSingular>(IntervencionSingularInitial)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // Get datos de intervencion
        const fetchDataInvertencion = async () => {
            const response = await getIntervencion({id_intervencion:id_intervencion as string});
            const { data } = await response.json()
            setData(data.resultado)
        };

        fetchDataInvertencion().catch(console.error).finally(()=>setLoading(false));

    }, []);

    if(!data || loading){
        return(
            <>
                <Box mx={3}>
                    No hay datos disponibles
                </Box>

            </>
        )
    }else{

        return(
            <>
                <Grid item sm={12}>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <Typography variant='caption'>
                                Tipo de intervencion
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.activo ? 'Activo' : 'N/D'}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption'>
                                Defensor
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.defensor ? `${data.defensor.nombre} ${data.defensor.apellido}` : 'N/D'}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant='caption'>
                                PPL
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.defensor ? `${data.ppl.persona.nombre} ${data.ppl.persona.apellido}` : 'N/D'}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='caption'>
                                Caratula de Expediente vinculado
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.expediente ? `${data.expediente.caratula_expediente}` : 'N/D'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={3}>
                            <Typography variant='caption'>
                                Inicio de la intervencion
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.fecha_inicio_intervencion ? `${data.fecha_inicio_intervencion}` : 'N/D'}
                            </Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant='caption'>
                                Documento de inicio de intervencion
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                <a href="#">Ver adjunto</a>
                            </Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant='caption'>
                                Fin de la intervencion
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                {data.fecha_fin_intervencion ? `${data.fecha_fin_intervencion}` : 'N/D'}
                            </Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant='caption'>
                                Documento de fin de intervencion
                            </Typography>
                            <Typography variant='body1' fontWeight='bold'>
                                <a href="#">Ver adjunto</a>
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </>
        )
    }
}