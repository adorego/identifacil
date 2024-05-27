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
import dayjs from "dayjs";

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
    const {openSnackbar} = useGlobalContext();
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);


    // Se ejectua ni bien se monta el componente para luego llamara fecthcData
    useEffect(() => {
        fetchData(`${API_URL}/medida_de_fuerza`)
            .then(fetchedData => {
                console.log(fetchedData)
                const data_procesado = fetchedData.map((item: any) => ({
                    fecha_inicio: item.fecha_inicio ? dayjs(item.fecha_inicio).format('DD/MM/YYYY') : 'N/D',
                    fecha_fin: item.fecha_inicio ? dayjs(item.fecha_fin).format('DD/MM/YYYY') : 'N/D',
                    motivo: item.motivo ? item.motivo.nombre : 'N/D',
                    tipo_de_medida_de_fuerza: item.tipo_de_medida_de_fuerza ? item.tipo_de_medida_de_fuerza.nombre : 'N/D',
                    ppl: item.ppl ? item.ppl.id : 'N/D',
                    id: item.id ? item.id : 'N/D',
                }))

                /*console.log(data_procesado)*/
                // @ts-ignore
                setData(data_procesado);

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
        <>

            <Box>
                <TituloComponent titulo='Medidas de fuerza' url='/' newEntry='/gestion-ppl/medidas-de-fuerza/crear'/>

                <Box mt={3}>
                    <CustomTable
                        showId={true}
                        headers={header2}
                        data={data}
                        options={{

                            targetURL: '/gestion-ppl/medidas-de-fuerza',
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


