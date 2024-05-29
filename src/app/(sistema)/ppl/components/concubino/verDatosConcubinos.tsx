import {Alert, Grid} from "@mui/material";
import style from "@/app/(sistema)/ppl/components/tabConcubino.module.css";
import dayjs from "dayjs";
import CustomTable from "@/components/CustomTable";
import * as React from "react";

const header = [
    {id: 'id', label: 'ID'},
    {id: 'apellidos', label: 'Apellido'},
    {id: 'nombres', label: 'Nombre'},
    {id: 'numeroDeIdentificacion', label: 'Nro. documento'},
    {id: 'numero_de_contacto', label: 'Nro. contacto'},
    {id: 'fecha_de_nacimiento', label: 'Fecha nacimiento', type: 'date'},

]

export default function VerDatosConcubinos({stateConyuge, stateListaConyuges}: {
    stateConyuge: any,
    stateListaConyuges: any
}) {
    console.log(stateConyuge.dias_de_visita)


    const getDiasDeVisita = (dias: number[]): string[] => {

        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return dias.map(dia => diasSemana[dia-1])
    };
    return (
        <>
            <Grid container spacing={2} my={2}>
                <Grid item sm={6}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Nombre
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.nombres ? stateConyuge.nombres : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Apellido
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.apellidos ? stateConyuge.apellidos : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Fecha de nacimiento
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.fecha_de_nacimiento ? dayjs(stateConyuge.fecha_de_nacimiento).format('DD/MM/YYYY') : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Edad
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.edad ? stateConyuge.edad : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Sexo
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.sexo ? stateConyuge.sexo : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={12}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Dirección actual
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.direccion ? stateConyuge.direccion : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Ciudad de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.lugar_de_nacimiento ? stateConyuge.lugar_de_nacimiento : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Barrio de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.barrio ? stateConyuge.barrio : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Compañia de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.compania ? stateConyuge.compania : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Número de contacto
                        </span>
                        <span className={`${style.boldBody}`}>
                            {stateConyuge.numero_de_contacto ? stateConyuge.numero_de_contacto : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={8}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">Días de visita</span>
                        <span className={`${style.boldBody}`}>
                            {getDiasDeVisita(stateConyuge.dias_de_visita).join(", ") || 'N/D'}
                        </span>
                    </div>
                </Grid>

            </Grid>
            <Grid container spacing={2} my={2}>
                <Grid item sm={12}>
                    {stateListaConyuges.length > 0 ?
                        <CustomTable showId={true}
                                     headers={header}
                                     data={stateListaConyuges}
                        />
                        :
                        (<Alert variant="standard" severity="info">
                            No hay concubinos anteriores en este momento.
                        </Alert>)
                    }
                </Grid>
            </Grid>
        </>
    )
}