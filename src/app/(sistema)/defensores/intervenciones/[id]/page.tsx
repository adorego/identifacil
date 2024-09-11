'use client'

import * as React from 'react';

import {
    Button,
    CircularProgress, Grid,
    Paper, Stack, TextField, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "@/components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {signIn, useSession} from "next-auth/react";
import {useGlobalContext} from "@/app/Context/store";
import PermissionValidator from "@/components/authComponents/permissionValidator";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ModalDialog from "@/components/modal/ModalDialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import FormIntervencion from "@/app/(sistema)/defensores/components/formIntervencion";


const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'ppl', label: 'Apellido, Nombre'},
    {id: 'tipo_de_medida_de_fuerza', label: 'Tipo'},
    {id: 'motivo', label: 'Motivo'},
    {id: 'fecha_inicio', label: 'Fecha inicio'},
    {id: 'fecha_fin', label: 'Fecha fin'},
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;


export default function Page() {

    const [data, setData] = useState(null);

    const [modalStatus, setModalStatus] = useState(false);

    const [filterData, setFilterData] = useState(null);
    const {data: session, status} = useSession();

    const handleOpenModal = () => {
        setModalStatus(true);
    }
    const handlCloseModal = () => {
        setModalStatus(false);
    }

    const sessionData = PermissionValidator('crear_expedientes', session);

    useEffect(() => {

    }, []);


    if (status === 'loading') {
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

    // TODO: Invertir al terminar de maquetar
    if (data) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'start',
                justifyContent: 'space-between',
                height: '75vh',
            }}>

                <Box>
                    <TituloComponent titulo='Intervencion'>
                        <BreadCrumbComponent listaDeItems={[
                            {nombre: 'Defensores', url: '/', lastItem: true},
                        ]}/>
                    </TituloComponent>
                </Box>

                <Box sx={{margin: 'auto'}}>
                    <CircularProgress/>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <ModalDialog modalStatus={modalStatus} closeModal={handlCloseModal}>
                <FormIntervencion handleCloseModal={handlCloseModal} />
            </ModalDialog>
            <Box>
                <TituloComponent titulo='Intervencion'>
                    <BreadCrumbComponent listaDeItems={[
                        {nombre: 'Defensores', url: '/', lastItem: true},
                    ]}/>
                </TituloComponent>
                <Box mt={4} component={Paper}>
                    <Box p={3}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Stack spacing={2} direction='row' justifyContent='space-between'>

                                    <Typography variant="h6" component="div">
                                        Datos de intervencion
                                    </Typography>
                                    <Button onClick={handleOpenModal} variant='outlined' startIcon={<EditIcon/>}>
                                        Modificar
                                    </Button>
                                </Stack>

                            </Grid>
                            <Grid item sm={12}>
                                <Grid container spacing={2}>
                                    <Grid item sm={4}>
                                        <Typography variant='caption'>
                                            Tipo de intervencion
                                        </Typography>
                                        <Typography variant='body1' fontWeight='bold'>
                                            Alta
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography variant='caption'>
                                            Defensor
                                        </Typography>
                                        <Typography variant='body1' fontWeight='bold'>
                                            Juan jose Perez [Privado]
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <Typography variant='caption'>
                                            PPL
                                        </Typography>
                                        <Typography variant='body1' fontWeight='bold'>
                                            Pedro Jose Gonzalez Martinez
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography variant='caption'>
                                            Caratula de Expediente vinculado
                                        </Typography>
                                        <Typography variant='body1' fontWeight='bold'>
                                            Asalto a mano armada con intento de robo
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item sm={3}>
                                        <Typography variant='caption'>
                                            Inicio de la intervencion
                                        </Typography>
                                        <Typography variant='body1' fontWeight='bold'>
                                            24/10/2024
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
                                            24/10/2024
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
                        </Grid>
                    </Box>
                    <Box>
                        <Stack spacing={2} direction='row' p={3} justifyContent='space-between'>
                            <Typography variant="h6" component="div">
                                Seguimiento de PPL
                            </Typography>
                            <Button variant='text' startIcon={<AddIcon/>}>
                                Agregar registro
                            </Button>
                        </Stack>
                        <CustomTable
                            showId={true}
                            // headers={header2}
                            // data={data}
                            options={{
                                targetURL: '/gestion-ppl/medidas-de-fuerza',
                                rowsPerPageCustom: 5,
                                pagination: true,
                            }}
                        />
                    </Box>
                </Box>

            </Box>
        </>
    )
}


