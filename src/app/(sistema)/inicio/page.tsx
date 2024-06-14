'use client';
// TODO: ver la forma de remover el use client para que no afecte la estructura del grid del home que se desmoloda al quitar la propiedad
import {Suspense, useEffect, useState} from "react"

import Loading from "./loading"
import CardBlock from "../../../components/blocks/CardBlock";
import {Alert, Box, CircularProgress, Grid, Typography} from "@mui/material";
import ingresosIMG from '../../../common/acceso-ppl.png';
import penalesIMG from '../../../common/control-ppl.png';
import trasladosIMG from '../../../common/traslados.png';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import * as React from "react";
import SessionWatcher from "@/components/authComponents/sessionWatcher";
import PermissionValidator from "@/components/authComponents/permissionValidator";

export default function Main() {
    const { data: session, status } : {data:any; status: string; } = useSession();


    useEffect(() => {

        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading') {
        return(
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        <CircularProgress/>
                    </Box>
                </Box>
            </div>
        )
    }

    if (!session) {
        signIn();
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    <Box>
                        Regirigiendo...
                    </Box>
                </Box>
            </div>
        )
    }


    return (
        <Suspense fallback={<Loading/>}>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Panel </h1>
                </Grid>
                <Grid item xs={12}>

                    <Box sx={{
                        background: 'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)',
                        color: 'rgb(0, 75, 80)',
                        height: '200px',
                        padding: '30px',
                        borderRadius: '10px'
                    }}>
                        <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                            Bienvenido  <br />
                            {session && (`${session.nombre} ${session.apellido}`)}
                        </Typography>

                    </Box>
                </Grid>
                {
                    PermissionValidator('ver_accesos_ppl', session) &&
                    <CardBlock name={'Accesos PPL'}  image={ingresosIMG.src} link='/inicio/registro/ppl'/>
                }

                {PermissionValidator('ver_traslados', session) &&
                    <CardBlock name={'Traslados'} image={trasladosIMG.src} link='/movimientos/traslados'/>
                }
                {PermissionValidator('ver_informes', session) &&
                <CardBlock name={'Informes'} image={penalesIMG.src} link='/informes'/>
                }

            </Grid>
        </Suspense>
    )
}