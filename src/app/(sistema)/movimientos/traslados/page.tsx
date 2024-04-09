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
    {id: 'numero_de_documento', label: 'Documento traslado'},
    {id: 'fecha_de_documento', label: 'Fecha documento'},
    {id: 'fecha_de_traslado', label: 'Fecha traslado'},
    {id: 'origenTraslado', label: 'Origen'},
    {id: 'destinoTraslado', label: 'Destino'},
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

const trasladosDummy = reclsusosData();

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
        fetchData(`${API_URL}/movimientos`)
            .then(fetchedData => {
                /*console.log(Object.keys(fetchedData).map(key=>fetchedData[key]).map(item=>({
                    ...item,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })))*/
                // TODO: veritifcar porque hace problema typescript aca

                //@ts-ignore
                setData(Object.keys(fetchedData).map(key => fetchedData[key]).map(item => ({
                    ...item,
                    destinoTraslado: item.destinoTraslado.nombre,
                    origenTraslado: item.origenTraslado.nombre
                })));
            });
    }, []);

    const handleFitros = (value: any) => {
        // console.log(value)
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

                {Object.keys(data).length > 0  ?
                    (
                        <Paper elevation={1} sx={{
                            mt: '32px'
                        }}>
                            {/*<TabTitle tabName={tabName} targetURL={'/movimientos/traslados/crear'} />*/}
                            {/*Elemento de tabla de traslados filtros */}
                            <Box px={3} py={3}>
                                <FiltrosTables
                                    dateSearchField='fecha_de_traslado'
                                    searchField='numero_de_documento'
                                    dataSinFiltro={data} handleFiltro={handleFitros}/>
                            </Box>

                            {/* Elemento Tabla de Traslado*/}
                            <Box>
                                <CustomTable
                                    data={filterData ? filterData : data}
                                    /*data={data}*/
                                    headers={header2}
                                    showId={true}
                                    deleteRecord={handleOpenModal}
                                    options={{

                                        targetURL: '/movimientos/traslados',
                                        rowsPerPageCustom: 5,
                                        pagination: true,

                                    }}
                                />
                            </Box>
                        </Paper>
                    )
                    :
                    (
                        <>
                            <NoDataBox />
                        </>
                    )
                }


            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
        </Box>
    )
}