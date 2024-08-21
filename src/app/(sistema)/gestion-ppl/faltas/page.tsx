'use client'

import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from 'react';

import CustomTable from "@/components/CustomTable";
import ModalBorrado from "@/components/modal/ModalBorrado";
import TituloComponent from "@/components/titulo/tituloComponent";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import dayjs from "dayjs";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Page(){
    const [data, setData] = useState(null);
    const { openSnackbar } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});

    // Datos para armar el header de la tabla
    const header = [
        { id: 'id', label: 'ID' },
        { id: 'numero_de_resolucion', label: 'Nro. Resolución' },
        { id: 'ppl', label: 'Apellido, Nombre' },
        { id: 'descripcion_de_la_falta', label: 'Descripcion' },
        { id: 'fecha_y_hora_de_la_falta', label: 'Fecha de la falta', type: 'date' },
    ]

    // TODO: Si viene vacio o da error no mostrar la tabla por que explota


    useEffect(() => {
        fetchData(`${API_URL}/faltas_sanciones/faltas`)
            .then(fetchedData => {
                console.log(fetchedData.faltas)
                //@ts-ignore
                setData([
                    ...fetchedData.faltas.map((item:any,index:number)=>({
                        ...fetchedData.faltas[index],
                        fecha_y_hora_de_la_falta: dayjs(fetchedData.faltas[index].fecha_y_hora_de_la_falta).format('DD-MM-YYYY'),
                        ppl: `${item.ppl.persona.apellido} ${item.ppl.persona.nombre}`
                    }))]

                );
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    const handleDelete = async (id:number) => {
        const result = await deleteRecord(`/motivoTraslados/${id}`);

        if (result.success) {
            openSnackbar(result.message, "success");
        } else {
            openSnackbar(result.message, "error");
        }
    };

    const handleDeleteRecord = (id:number)=>{
        // @ts-ignore
        //Actualiza el store local con el ID que se obtuvo dentro de CustomTable
        const datosActualizados = data.filter((item: { id: number; }) => item.id !== id);
        setData(datosActualizados)

        // Borra el registro de la BD con el ID que toma de la lista
        handleDelete(id);

    }

    const handleOpenModal = (row: { id:number, descripcion: string }) => {

        setModalOpen(true);
        setSelectedData({
            id: row.id,
            name: row.descripcion,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const listaDeItemBread = [
        {nombre:'Lista de faltas y sanciones', url:'', lastItem: true}
    ];

    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }


    return(

        <Box>

            <TituloComponent titulo={'Faltas y sanciones'}>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
            </TituloComponent>
            <Box mt={4} component={Paper}>
                <CustomTable
                    showId={true}
                    headers={header}
                    data={data}
                    // @ts-ignore
                    deleteRecord={handleOpenModal}
                    options={{
                        title: 'Lista de faltas y sanciones',
                        newRecord: '/gestion-ppl/faltas/crear',
                        pagination:true,
                        rowsPerPageCustom: 5,
                        targetURL:`/gestion-ppl/faltas`,
                        deleteOption: false
                    }}
                />

            </Box>
            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
        </Box>
    )
}