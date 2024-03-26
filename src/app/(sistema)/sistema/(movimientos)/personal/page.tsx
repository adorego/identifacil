'use client'

import * as React from 'react';

import {Box, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";

import CustomTable from "@/components/CustomTable";
import ModalBorrado from "@/components/modal/ModalBorrado";
import TituloComponent from "@/components/titulo/tituloComponent";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";

// Datos para armar el header de la tabla
const header = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre y apellido' },
    { id: 'tipo', label: 'Tipo personal' },
    { id: 'lastUpdate', label: 'Ultima actualizacion' },
]

export default function Page(){
    const { openSnackbar } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const [data, setData] = useState(null);



    async function fetchData() {
        // TODO: Si viene vacio o da error no mostrar la tabla por que explota
        try {
            const response = await fetch('http://localhost:6000/personal');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al realizar la solicitud fetch:', error);
            return null; // o manejar el error de manera adecuada
        }
    }

    useEffect(() => {
        fetchData()
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    const handleDelete = async (id:number) => {
        const result = await deleteRecord(`/personal/${id}`);

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

    const handleOpenModal = (row: { id:number, nombre: string }) => {

        setModalOpen(true);
        setSelectedData({
            id: row.id,
            name: row.nombre,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
            <TituloComponent titulo='Personales del establecimiento penitenciario' />
            <Box mt={4}>
                <CustomTable
                    showId={true}
                    headers={header}
                    // @ts-ignore
                    deleteRecord={handleOpenModal}
                    data={data}
                    options={{
                        title: 'Lista de personales',
                        pagination:true,
                        rowsPerPageCustom: 5,
                        newRecord: '/sistema/personal/crear',
                        targetURL:`/sistema/personal/`,
                        deleteOption: true,
                    }}
                />

            </Box>
            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
        </Box>
    )
}