import {Grid, Typography} from "@mui/material";
import CardDefensores from "@/app/(sistema)/defensores/components/cardDefensores";
import * as React from "react";
import {useEffect, useState} from "react";

type defensoresDashboardType = {
    defensores:number;
    intervenciones_activas: number;
    promedio_entrevistas: number;
}

export default function DefensoresDashboard({data,user}:{data: defensoresDashboardType, user:any}) {

    const [dataState, setDataState] = useState<defensoresDashboardType>({
        defensores: 0,
        intervenciones_activas: 0,
        promedio_entrevistas: 0,
    })

    useEffect(() => {
        if(data){

            setDataState(data)
        }
    }, [data]);

    if(!data){
        return (
            <>No hay datos disponibles</>
        )
    }
    return(
        <>

            <Grid container spacing={2}>
                <Grid item xs={12} mb={2}>
                    <Typography variant="h5" color="black" component="h5" fontWeight='bold'>
                        Bienvenido, {user.nombre} {user.apellido}.
                    </Typography>
                    <Typography>
                        Emboscada
                    </Typography>
                </Grid>
                <Grid item md={4}>
                    <CardDefensores nombre={'Cant defensores'} value={dataState?.defensores}/>
                </Grid>
                <Grid item md={4}>
                    <CardDefensores nombre={'Intervenciones'} value={dataState?.intervenciones_activas}/>
                </Grid>
                <Grid item md={4}>
                    <CardDefensores nombre={'Promedio Entrevistas'} value={dataState?.promedio_entrevistas}/>
                </Grid>
            </Grid>
        </>
    )
}