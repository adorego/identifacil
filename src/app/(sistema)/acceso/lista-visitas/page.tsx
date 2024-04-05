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
    {id: 'visitante', label: 'Apellido, Nombre'},
    {id: 'tipo', label: 'tipo'},
    {id: 'fecha_salida', label: 'Fecha', type: 'date'},
    {id: 'hora_salida', label: 'Hora'},
    {id: 'observacion', label: 'Observacion'},
    {id: 'ppl_que_visito', label: 'PPL visitado'},
]

const dataMedidas = [
    {id: 1, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Encadenamiento', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 2, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Huelga de hambre', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 3, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Encadenamiento', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
    {id: 4, nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_medida: 'Huelga de hambre', fecha_inicio: '01/01/2024', fecha_fin: '01/02/2024'  },
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Ppl() {
    const [data, setData] = useState<any>([]);
    const [filterData, setFilterData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const [loading, setLoading] = useState(true)
    
    const {openSnackbar} = useGlobalContext();

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
        fetchData(`${API_URL}/entrada_salida/visitantes/salidas`)
            .then(fetchedData => {
                // console.log(fetchedData)
                const dataProcesado = fetchedData.map((item:any)=>({
                    id: item.id,
                    visitante: `${item.visitante.apellido}, ${item.visitante.nombre}`,
                    fecha_salida: item.fecha_salida,
                    hora_salida: item.hora_salida,
                    observacion: item.observacion,
                    ppl_que_visito: `${item.ppl_que_visito.persona.apellido} ${item.ppl_que_visito.persona.nombre}`,
                    tipo: 'Salida'
                }))

                console.log(dataProcesado)
                // TODO: veritifcar porque hace problema typescript aca
                setData(dataProcesado);
                setLoading(false)
            });
        fetchData(`${API_URL}/entrada_salida/visitantes/ingresos`)
            .then(fetchedData => {
                // console.log(fetchedData)
                const dataProcesado = fetchedData.map((item:any)=>({
                    id: item.id,
                    visitante: `${item.visitante.apellido}, ${item.visitante.nombre}`,
                    fecha_salida: item.fecha_ingreso,
                    hora_salida: item.hora_ingreso,
                    observacion: item.observacion,
                    ppl_que_visito: `${item.ppl_a_visitar.persona.apellido} ${item.ppl_a_visitar.persona.nombre}`,
                    tipo: 'Entrada'
                }))

                console.log(dataProcesado)
                // TODO: veritifcar porque hace problema typescript aca

                //@ts-ignore
                setData((prev:any)=>([...prev, ...dataProcesado]));
                setLoading(false)
            });
    }, []);

    const handleFitros = (value: any) => {
        // console.log(value)
        setFilterData(value)
    }


    // @ts-ignore
    if (loading) {
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
            { data.length > 0 ?
                (
                    <Box >
                        <TituloComponent titulo='Lista de visitas' url='/' />

                        <Box mt={3}>
                            <CustomTable
                                showId={false}
                                headers={header2}
                                data={data}
                                deleteRecord={handleOpenModal}
                                options={{
                                    rowsPerPageCustom: 5,
                                    pagination: true,

                                }}
                            />
                        </Box>



                        <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>
                    </Box>
                )
                : (
                <>
                    <TituloComponent titulo='Lista de visitas' url='/' />
                    <Box sx={{}}>
                        <NoDataBox />
                    </Box>
                </>
                ) }

        </>
    )
}

const trasladosDummy = reclsusosData();
