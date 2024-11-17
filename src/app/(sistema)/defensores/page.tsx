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
import TabDefensores from "@/app/(sistema)/defensores/components/tabDefensores";
import DefensoresDashboard from "@/app/(sistema)/defensores/components/defensoresDashboard";

const boxStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75vh',
}

const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'fecha_inicio_intervencion', label: 'Fecha Inicio'},
    {id: 'fecha_fin_intervencion', label: 'Fecha fin'},
    {id: 'activo', label: 'Tipo'},
    {id: 'expediente', label: 'Expediente'},
    {id: 'ppl', label: 'PPL'},
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

        // Lista de intervencones por circunscripcion
        // TODO: Obtener el ID de la circunscripcion
        fetchData(`${API_URL}/defensores/intervenciones/circunscripcion/1`)
            .then(fetchedData => {

                console.log(fetchedData)

                const data_procesado = fetchedData.resultado.map((item: any) => ({
                    ...item,
                    // oficio_judicial_alta_intervencion: "asd",
                    // oficio_judicial_baja_intervencion: "asd",
                    activo: item.activo ? "Activo" : "Baja",
                    expediente: item.expediente ? `${item.expediente.numeroDeExpediente} - ${item.expediente.caratula_expediente}` : "N/D",
                    ppl: item.ppl ? `${item.ppl.persona.nombre} ${item.ppl.persona.apellido}` : 'N/D',
                }))

                console.log(data_procesado)

                // @ts-ignore
                setData(data_procesado);

            });

        fetchData(`${API_URL}/defensores/dashboard_data`)
            .then(fetchedData => {
                console.log('Dashboard data: ',fetchedData)
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
        return(<><Box sx={boxStyle}><CircularProgress/></Box></>)
    }

    if (!session) {
        signIn();
        return (
            <div>
                <Box sx={boxStyle}>

                    <Box>
                        Regirigiendo...
                    </Box>
                </Box>
            </div>
        )
    }

    if (!data) {
        return (
            <Box sx={boxStyle}>
                <TituloComponent titulo='Defensores'>
                    <BreadCrumbComponent listaDeItems={[{nombre:'Defensores', url:'/', lastItem: true},]} />
                </TituloComponent>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <>
            <Box>
                <TituloComponent titulo='Medidas de fuerza'>
                    <BreadCrumbComponent listaDeItems={[{nombre:'Defensores', url:'/', lastItem: true},]} />
                </TituloComponent>
                <Box mt={4} component={Paper}>
                    <Box p={3}>
                        <DefensoresDashboard />
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
                                        <IntervencionModal buttonLabel={'Agregar Intervencion'}/>
                                    </Box>
                                    <CustomTable
                                        showId={true}
                                        headers={header2}
                                        deleteRecord={handleOpenModal}
                                        data={data}
                                        options={{
                                            targetURL: '/defensores/intervenciones',
                                            rowsPerPageCustom: 5,
                                            pagination: true,
                                        }}
                                    />

                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <TabDefensores />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                2
                            </CustomTabPanel>
                        </Box>
                    </Box>
                </Box>


                <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
            </Box>
        </>
    )
}


