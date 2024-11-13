'use client'

import * as React from 'react';

import {
    Button,
    CircularProgress, Grid,
    Paper, Stack, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "@/components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import {fetchData} from "@/components/utils/utils";

import dayjs from "dayjs";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {signIn, useSession} from "next-auth/react";
import ModalBorrado from "@/components/modal/ModalBorrado";
import {useGlobalContext} from "@/app/Context/store";
import PermissionValidator from "@/components/authComponents/permissionValidator";
import {PeopleAltTwoTone} from "@mui/icons-material";
import CardDefensores from "@/app/(sistema)/defensores/components/cardDefensores";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IntervencionModal from '@/app/(sistema)/defensores/components/intervencionModal';


const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'ppl', label: 'Apellido, Nombre'},
    {id: 'tipo_de_medida_de_fuerza', label: 'Tipo'},
    {id: 'motivo', label: 'Motivo'},
    {id: 'fecha_inicio', label: 'Fecha inicio'},
    {id: 'fecha_fin', label: 'Fecha fin'},
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Page() {

    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const { data: session, status } = useSession();
    const sessionData = PermissionValidator('crear_expedientes', session);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const {openSnackbar} = useGlobalContext();

    // tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData(`${API_URL}/medida_de_fuerza`)
            .then(fetchedData => {
                // console.log(fetchedData)
                const data_procesado = fetchedData.map((item: any) => ({
                    fecha_inicio: item.fecha_inicio ? dayjs(item.fecha_inicio).format('DD/MM/YYYY') : 'N/D',
                    fecha_fin: item.fecha_fin ? dayjs(item.fecha_fin).format('DD/MM/YYYY') : 'N/D',
                    motivo: item.motivo ? item.motivo.nombre : 'N/D',
                    tipo_de_medida_de_fuerza: item.tipo_de_medida_de_fuerza ? item.tipo_de_medida_de_fuerza.nombre : 'N/D',
                    ppl: item.ppl ? (item.ppl.persona.nombre + ' ' + item.ppl.persona.apellido) : 'N/D',
                    id: item.id ? item.id : 'N/D',
                    registro_eliminado: item.registro_eliminado,
                })).filter((item:any)=> {
                    console.log('control de item', item)
                    return !item.registro_eliminado
                })

                /*console.log(data_procesado)*/
                // @ts-ignore
                setData(data_procesado);

            });
    }, []);

    useEffect(() => {
        // console.log(session)
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    const handleOpenModal = (row: { id: number, descripcion: string }) => {

        setModalOpen(true);
        setSelectedData({
            id: row.id,
            name: row.descripcion,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDelete = async (id: number) => {

        try {
            const response = await fetch(`${API_URL}/medida_de_fuerza/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                openSnackbar('Registro eliminado con éxito', "success");

            } else {
                openSnackbar('Error al eliminar el registro', "error");

            }
        } catch (error) {
            console.log(`Error en la red: ${error}`);
        }


    };

    const handleDeleteRecord = (id: number) => {
        console.log(id);
        // @ts-ignore
        //Actualiza el store local con el ID que se obtuvo dentro de CustomTable
        const datosActualizados = data.filter((item: { id: number; }) => item.id !== id);
        setData(datosActualizados)

        // Borra el registro de la BD con el ID que toma de la lista
        handleDelete(id);
    }





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

    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <TituloComponent titulo='Medidas de fuerza'>
                    <BreadCrumbComponent listaDeItems={[
                        {nombre:'Defensores', url:'/', lastItem: true},
                    ]} />
                </TituloComponent>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <>

            <Box>

                <TituloComponent titulo='Medidas de fuerza'>
                    <BreadCrumbComponent listaDeItems={[
                        {nombre:'Defensores', url:'/', lastItem: true},
                    ]} />
                </TituloComponent>
                <Box mt={4} component={Paper}>
                    <Box p={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} mb={4}>
                                <Typography variant="h5" color="black" component="h5" fontWeight='bold'>
                                    Bienvenido, Carlos Lopez.
                                </Typography>
                                <Typography>
                                    Emboscada
                                </Typography>
                            </Grid>
                            <Grid item md={3}>
                                <CardDefensores />
                            </Grid>
                            <Grid item md={3}>
                                <CardDefensores />
                            </Grid>
                            <Grid item md={3}>
                                <CardDefensores />
                            </Grid>
                            <Grid item md={3}>
                                <CardDefensores />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Intervenciones" {...a11yProps(0)} />
                                    <Tab label="Defensores" {...a11yProps(1)} />
                                    <Tab label="PPL" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>

                                    <Box mb={2}>

                                        <IntervencionModal />
                                    </Box>
                                    <CustomTable
                                        showId={true}
                                        headers={header2}
                                        deleteRecord={handleOpenModal}
                                        data={data}
                                        options={{
                                            targetURL: '/gestion-ppl/medidas-de-fuerza',
                                            rowsPerPageCustom: 5,
                                            pagination: true,
                                            deleteOption: PermissionValidator('borrar_medidas_de_fuerza', session) ? true : false

                                        }}
                                    />

                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <CustomTable
                                    showId={true}
                                    headers={header2}
                                    deleteRecord={handleOpenModal}
                                    data={data}
                                    options={{
                                        targetURL: '/gestion-ppl/medidas-de-fuerza',
                                        rowsPerPageCustom: 5,
                                        pagination: true,
                                        deleteOption: PermissionValidator('borrar_medidas_de_fuerza', session) ? true : false

                                    }}
                                />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <CustomTable
                                    showId={true}
                                    headers={header2}
                                    deleteRecord={handleOpenModal}
                                    data={data}
                                    options={{
                                        targetURL: '/gestion-ppl/medidas-de-fuerza',
                                        rowsPerPageCustom: 5,
                                        pagination: true,
                                        deleteOption: PermissionValidator('borrar_medidas_de_fuerza', session) ? true : false

                                    }}
                                />
                            </CustomTabPanel>
                        </Box>
                    </Box>
                </Box>


                <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
            </Box>
        </>
    )
}


