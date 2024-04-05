'use client'

import * as React from 'react';

import {
    CircularProgress,
    Paper,
} from "@mui/material";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import CustomTable from "../../../../components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import ModalBorrado from "@/components/modal/ModalBorrado";
import TituloComponent from "@/components/titulo/tituloComponent";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import {reclsusosData} from "@/app/dummyData/data";
import {fetchData} from "@/components/utils/utils";
import NoDataBox from "@/components/loadingScreens/noDataBox";

const header2 = [
    {id: 'id', label: 'ID'},
    {id: 'nombre_apellido', label: 'Apellido, Nombre'},
    {id: 'tipo_medida', label: 'Tipo'},
    {id: 'motivo', label: 'Motivo'},
    {id: 'fecha_inicio', label: 'Fecha inicio'},
    {id: 'fecha_fin', label: 'Fecha fin'},
]

const dataMedidas = [
    {id: 1, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Encadenamiento', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 2, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Huelga de hambre', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 3, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Encadenamiento', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 4, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Huelga de hambre', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Ppl() {
    const {openSnackbar} = useGlobalContext();
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});

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
        const result = await deleteRecord(`/traslados/${id}`);

        if (result.success) {
            openSnackbar(result.message, "success");
        } else {
            openSnackbar(result.message, "error");
        }
    };

    const handleDeleteRecord = (id: number) => {
        // @ts-ignore
        //Actualiza el store local con el ID que se obtuvo dentro de CustomTable
        const datosActualizados = data.filter((item: { id: number; }) => item.id !== id);
        setData(datosActualizados)

        // Borra el registro de la BD con el ID que toma de la lista
        handleDelete(id);

    }


    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData(`${API_URL}/entrada_salida/visitantes/ingresos`)
            .then(fetchedData => {
                /*console.log(Object.keys(fetchedData).map(key=>fetchedData[key]).map(item=>({
                    ...item,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })))*/
                // TODO: veritifcar porque hace problema typescript aca

                console.log(fetchedData)
                //@ts-ignore
                /*setData(Object.keys(fetchedData).map(key => fetchedData[key]).map(item => ({
                    ...item,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })));*/
            });
    }, []);

    const handleFitros = (value: any) => {
        // console.log(value)
        setFilterData(value)
    }


    if (!data && false) {
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
                <TituloComponent titulo='Medidas de fuerza' url='/' newEntry='/ppl/medidas-de-fuerza/crear'/>

                <Box mt={3}>
                    <CustomTable
                        showId={true}
                        headers={header2}
                        data={dataMedidas}
                        deleteRecord={handleOpenModal}
                        options={{

                            targetURL: '/movimientos/traslados',
                            rowsPerPageCustom: 5,
                            pagination: true,
                            deleteOption: true,

                        }}
                    />
                </Box>



                <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
            </Box>
        </>
    )
}

const trasladosDummy = reclsusosData();
