'use client'

import * as React from 'react';

import {
    CircularProgress, Paper,
} from "@mui/material";

import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useEffect, useState} from "react";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import ModalBorrado from "@/components/modal/ModalBorrado";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";




const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'documento', label: 'Orden judicial'},
    {id: 'fechaDocumento', label: 'Fecha documento'},
    {id: 'fechaTraslado', label: 'Fecha traslado'},
    {id: 'origenTraslado', label: 'Origen'},
    {id: 'destinoTraslado', label: 'Destino'},
]

export default function Ppl() {
    const { openSnackbar } = useGlobalContext();
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});

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
    const handleDelete = async (id:number) => {
        const result = await deleteRecord(`/traslados/${id}`);

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
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/traslados');
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

    const handleFitros = (value : any) => {
        console.log(value)
        setFilterData(value)
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
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box>
            <TituloComponent titulo='Traslados' url='asd' newEntry='traslados/crear'/>
            <Paper elevation={1} sx={{
                mt: '32px'
            }}>
                {/*<TabTitle tabName={tabName} targetURL={'/movimientos/traslados/crear'} />*/}
                {/*Elemento de tabla de traslados filtros */}
                <Box px={3} py={3}>
                    <FiltrosTables dataSinFiltro={data} handleFiltro={handleFitros}/>
                </Box>

                {/* Elemento Tabla de Traslado*/}
                <Box>
                    <CustomTable
                        data={filterData ? filterData : data}
                        headers={header2}
                        showId={true}
                        deleteRecord={handleOpenModal}
                        options={{

                            targetURL: '/movimientos/traslados',
                            rowsPerPageCustom: 5,
                            pagination: true,
                            deleteOption: true,

                        }}
                    />
                </Box>

            </Paper>
            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
        </Box>
    )
}