'use client'

import * as React from 'react';

import {
    Button,
    CircularProgress, Divider, Grid,
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
import entrevistasURL from "@/app/api/lib/endpoint";
import {getIntervencion, listaEntrevistaPorIntervencion} from "@/app/api/lib/defensores/intervenciones";
import {listaDefensores} from "@/app/api/lib/defensores/defensores";
import EntrevistaModal from "@/app/(sistema)/defensores/components/entrevistaModal";
import IntervencionesDashboard from "@/app/(sistema)/defensores/components/intervencionesDashboard";
import IntervencionModal from "@/app/(sistema)/defensores/components/intervencionModal";


const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'fecha', label: 'Fecha'},
    {id: 'se_realizo_la_entrevista', label: 'Se realizo entrevista'},
    {id: 'tipo_entrevista', label: 'Tipo de entrevista'},
    {id: 'relato', label: 'Relato'},

]

const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'start',
    justifyContent: 'space-between',
    height: '75vh',
}

// TODO: Utilizar el endpoint de dashboard
/// TODO: Utilizar los nuevos valores el endpoint de lista de intevernciones. Como ppl, defensor, expedientes vinculados
export default function Page({ params }: { params: { id: string } }) {


    const {data: session, status} = useSession();
    const sessionData = PermissionValidator('crear_expedientes', session);

    /** Estados */
    const [dataIntervencion, setDataIntervencion] = useState({});
    const [dataEntrevistas, setDataEntrevistas] = useState([]);
    const [rowSeleccionado, setRowSeleccionado] = useState<null|number|string>(null)
    const [openModalEntrevista, setOpenModalEntrevista] = useState(false)
    // 6. Reload
    const [reloadEntrevisaStatus, setReloadEntrevistaStatus] = useState<boolean>(false)
    const [reloadIntervencionStatus, setReloadIntervencionStatus] = useState<boolean>(false)

    /** Modal */
    const [modalStatus, setModalStatus] = useState(false);
    const [filterData, setFilterData] = useState(null);
    const handleOpenModal = () => {
        setModalStatus(true);
    }
    const handlCloseModal = () => {
        setModalStatus(false);
    }



    useEffect(() => {
        if(params.id){
            fetchData().catch(console.error);
        }

    }, []);

    useEffect(() => {

        if(reloadEntrevisaStatus){
            setReloadEntrevistaStatus(true)
            Promise.all([
                fetchData().catch(console.error)
            ]).finally(()=> setReloadEntrevistaStatus(false))
        }

        if(reloadIntervencionStatus){
            setReloadIntervencionStatus(true)
            Promise.all([
                fetchData().catch(console.error)
            ]).finally(()=> setReloadIntervencionStatus(false))
        }


    }, [reloadEntrevisaStatus, reloadIntervencionStatus]);

    // Get Lista de entrevistas por Intervencion
    const fetchData = async () => {
        const response = await listaEntrevistaPorIntervencion({id_intervencion:params.id});

        const { data } = await response.json()
        const entrevistasProcesadas = data.resultado.map((item:any)=>({
            ...item,
            se_realizo_la_entrevista: item.se_realizo_la_entrevista ? "Si" : "No",
            tipo_entrevista: item.virtual ? "Presencial" : "Virtual",
            relato: item.relato.length > 30 ? `${item.relato.slice(0, 30)}...` : item.relato,
        }))
        setDataEntrevistas(entrevistasProcesadas)
    };

    //Check para controlar reload de tabla de Entrevistas
    const handleReturnedDataFromModal = (value:Object)=>{
        setReloadEntrevistaStatus(true)
    }

    //Check para controlar reload de Intervencion
    const handleReturnedDataFromModalIntervencion = (value: { success:boolean })=>{
        console.log('Check return de intervencion: ', value)
        if(value.success){
            setReloadIntervencionStatus(true)
        }

    }

    // Handle para pasar el valor seleccionado en la fila de la tabla para pasaerle al modal
    const handelValueForModal = (value:string|number|null=null) =>{
        setRowSeleccionado(value) // Se setea el valor del row para que cuando se abra el modal tenga este valor
        setOpenModalEntrevista(true) // Para abrir desde afuera el modal
    }

    const handleCloseExternal = ()=>{
        setOpenModalEntrevista(false)
        setRowSeleccionado(null)
    }


    if (status === 'loading') {
        return (
            <div>
                <Box sx={boxStyle}>
                    <CircularProgress/>
                </Box>
            </div>
        )
    }

    if (!session) {
        signIn();
        return (<><Box sx={boxStyle}>Regirigiendo..</Box></>)
    }

    // TODO: Invertir al terminar de maquetar
    if (!dataEntrevistas) {
        return (
            <Box sx={boxStyle}>

                <TituloComponent titulo='Intervencion'>
                    <BreadCrumbComponent listaDeItems={[
                        {nombre: 'Intervencion', url: '/', lastItem: true},
                    ]}/>
                </TituloComponent>
                <Box sx={{margin: 'auto'}}>
                    <CircularProgress/>
                </Box>
            </Box>
        );
    }

    return (
        <>

            <Box>
                <TituloComponent titulo='Intervencion'>
                    <BreadCrumbComponent listaDeItems={[
                        {nombre: 'Intervencion', url: '/', lastItem: true},
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
                                    {/*<Button onClick={handleOpenModal} variant='outlined' startIcon={<EditIcon/>}>
                                        Modificar
                                    </Button>*/}
                                    <IntervencionModal
                                        buttonLabel={'Modificar'}
                                        handleReturn={handleReturnedDataFromModalIntervencion}
                                        id_intervencion={params.id}/>
                                </Stack>

                            </Grid>
                            <IntervencionesDashboard reaload={reloadIntervencionStatus} id_intervencion={params.id}/>
                        </Grid>
                    </Box>
                    <Box mx={3}>
                        <Divider />
                        <Stack spacing={2} direction='row' py={4} justifyContent='space-between'>
                            <Typography variant="h6" component="div">
                                Entrevistas de seguimiento
                            </Typography>
                            <EntrevistaModal
                                buttonLabel={'Agregar entrevista'}
                                id_intervencion={params.id}
                                id_entrevista={rowSeleccionado}
                                openExternal={openModalEntrevista}
                                handleCloseExternal={handleCloseExternal}
                                handleReturn={handleReturnedDataFromModal}
                            />
                        </Stack>
                        <CustomTable
                            showId={true}
                            headers={header2}
                            data={dataEntrevistas}
                            editModal={handelValueForModal}
                            options={{
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


