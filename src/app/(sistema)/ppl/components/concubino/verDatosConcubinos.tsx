import {Alert, Grid} from "@mui/material";
import style from "@/app/(sistema)/ppl/components/tabConcubino.module.css";
import dayjs from "dayjs";
import CustomTable from "@/components/CustomTable";
import * as React from "react";
import {useEffect, useState} from "react";

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
    const [vistaDatosConguge, setVistaDatosConguge] = useState<any>({})

    useEffect(() => {
        if(stateConyuge){
            setVistaDatosConguge(stateConyuge)
        }
    }, [stateConyuge]);

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
                            {vistaDatosConguge.nombres ? vistaDatosConguge.nombres : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={6}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Apellido
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.apellidos ? vistaDatosConguge.apellidos : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Fecha de nacimiento
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.fecha_de_nacimiento ? dayjs(vistaDatosConguge.fecha_de_nacimiento).format('DD/MM/YYYY') : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Edad
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.edad ? vistaDatosConguge.edad : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Sexo
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.sexo ? vistaDatosConguge.sexo : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={12}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Dirección actual
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.direccion ? vistaDatosConguge.direccion : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Ciudad de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.lugar_de_nacimiento ? vistaDatosConguge.lugar_de_nacimiento : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Barrio de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.barrio ? vistaDatosConguge.barrio : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Compañia de residencia
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.compania ? vistaDatosConguge.compania : 'N/D'}
                        </span>
                    </div>
                </Grid>

                <Grid item sm={4}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">
                            Número de contacto
                        </span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.numero_de_contacto ? vistaDatosConguge.numero_de_contacto : 'N/D'}
                        </span>
                    </div>
                </Grid>
                <Grid item sm={8}>
                    <div className={`${style.formTabsContainerElements}`}>
                        <span className="caption-font">Días de visita</span>
                        <span className={`${style.boldBody}`}>
                            {vistaDatosConguge.dias_de_visita &&
                                (getDiasDeVisita(vistaDatosConguge.dias_de_visita).join(", ") || 'N/D')
                            }
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
                        (
                            <Alert variant="standard" severity="info">
                                No hay concubinos anteriores en este momento.
                            </Alert>
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}