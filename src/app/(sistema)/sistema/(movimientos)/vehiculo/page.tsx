'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, CircularProgress} from "@mui/material";
import CustomTable from "@/components/CustomTable";
import {deleteRecord} from "@/app/api";
import TituloComponent from "@/components/titulo/tituloComponent";
import ModalBorrado from "@/components/modal/ModalBorrado";
import {useGlobalContext} from "@/app/Context/store";

// Datos para armar el header de la tabla
const header = [
    { id: 'id', label: 'ID' },
    { id: 'chapa', label: 'Chapa' },
    { id: 'modelo', label: 'Modelo' },
    { id: 'lastUpdate', label: 'Ultima actualización' },
]

export default function Page(){

    const { openSnackbar } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const [data, setData] = useState(null);



    // TODO: Si viene vacio o da error no mostrar la tabla por que explota
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5001/vehiculo');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // const data = await response.json();
            // return data
            return await response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud fetch:', error);
            return null; // o manejar el error de manera adecuada
        }
    }

    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData()
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    const handleDelete = async (id:number) => {
        const result = await deleteRecord(`/vehiculo/${id}`);

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

    const handleOpenModal = (row: { id:number, modelo: string }) => {

        setModalOpen(true);
        setSelectedData({
            id: row.id,
            name: row.modelo,
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return(

        <Box>
            <TituloComponent titulo='Vehiculos' />
            {!data
                ? (
                    <Box mt={4}
                        sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '75vh',
                    }}>
                        <CircularProgress />
                    </Box>
                )
                : (<Box mt={4}>
                        <CustomTable
                            showId={true}
                            headers={header}
                            data={data}
                            // @ts-ignore
                            deleteRecord={handleOpenModal}
                            options={{
                                title: 'Lista de vehiculos',
                                pagination:true,
                                rowsPerPageCustom: 5,
                                newRecord: '/sistema/vehiculo/crear',
                                targetURL:`/sistema/vehiculo/`,
                                deleteOption:true,
                            }}
                        />
                </Box>)}
            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>

        </Box>
    )
}