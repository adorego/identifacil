'use client'

import * as React from 'react';

import {
    CircularProgress,
    Paper,
} from "@mui/material";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import {fetchData} from "@/components/utils/utils";

import dayjs from "dayjs";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import {signIn, useSession} from "next-auth/react";
import ModalBorrado from "@/components/modal/ModalBorrado";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import PermissionValidator from "@/components/authComponents/permissionValidator";

const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'ppl', label: 'Apellido, Nombre'},
    {id: 'tipo_de_medida_de_fuerza', label: 'Tipo'},
    {id: 'motivo', label: 'Motivo'},
    {id: 'fecha_inicio', label: 'Fecha inicio'},
    {id: 'fecha_fin', label: 'Fecha fin'},
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Ppl() {

    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const { data: session, status } = useSession();
    const sessionData = PermissionValidator('crear_expedientes', session);
    // const sessionDataReadonly = PermissionValidator('crear_traslados', session) || PermissionValidator('actualizar_expedientes', session);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const {openSnackbar} = useGlobalContext();


    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData(`${API_URL}/medida_de_fuerza`)
            .then(fetchedData => {
                console.log(fetchedData)
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
        console.log(session)
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


    const handleFitros = (value: any) => {
        // console.log(value)
        setFilterData(value)
    }

    const listaDeItemBread = [
        {nombre:'Lista de medidas de seguridad', url:'/sistema/medidas-seguridad', lastItem: true},
    ];



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
                    <BreadCrumbComponent listaDeItems={listaDeItemBread} />
                </TituloComponent>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <>

            <Box>

                <TituloComponent titulo='Medidas de fuerza'>
                    <BreadCrumbComponent listaDeItems={listaDeItemBread} />
                </TituloComponent>
                <Box mt={4} component={Paper}>
                    <CustomTable
                        showId={true}
                        headers={header2}
                        deleteRecord={handleOpenModal}
                        data={data}
                        options={{
                            title: 'Lista de medidas de fuerza',
                            targetURL: '/gestion-ppl/medidas-de-fuerza',
                            newRecord: '/gestion-ppl/medidas-de-fuerza/crear',
                            rowsPerPageCustom: 5,
                            pagination: true,
                            deleteOption: PermissionValidator('borrar_medidas_de_fuerza', session) ? true : false

                        }}
                    />
                </Box>


                <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
            </Box>
        </>
    )
}


