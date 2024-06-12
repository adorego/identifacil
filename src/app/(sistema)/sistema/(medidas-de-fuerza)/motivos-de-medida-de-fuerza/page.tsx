'use client'

import * as React from 'react';

import {CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import CustomTable from "../../../../../components/CustomTable";
import TituloComponent from "@/components/titulo/tituloComponent";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";


const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'nombre', label: 'Descripcion'},
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Ppl() {
    const {openSnackbar} = useGlobalContext();
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});


    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData(`${API_URL}/motivo_de_medida_de_fuerza`)
            .then(fetchedData => {
                //@ts-ignore
                setData(fetchedData);
                console.log(fetchedData)
            });
    }, []);

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

    const handleFitros = (value: any) => {
        // console.log(value)
        setFilterData(value)
    }

    console.log(data)
    if (data == null) {
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
        <>
            <Box >
                <TituloComponent titulo='Motivos de medidas de fuerza' url='/' newEntry='/sistema/motivos-de-medida-de-fuerza/crear'/>

                <Box mt={4} component={Paper}>
                    <CustomTable
                        showId={true}
                        headers={header2}
                        data={data}
                        deleteRecord={handleOpenModal}
                        options={{

                            targetURL: '/sistema/motivos-de-medida-de-fuerza',
                            rowsPerPageCustom: 5,
                            pagination: true,
                        }}
                    />
                </Box>



                {/*<ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>*/}
            </Box>
        </>
    )
}

