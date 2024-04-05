'use client'

import * as React from 'react';

import {Box, CircularProgress} from "@mui/material";
import {useEffect, useState} from 'react';

import CustomTable from "@/components/CustomTable";
import ModalBorrado from "@/components/modal/ModalBorrado";
import TituloComponent from "@/components/titulo/tituloComponent";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import {fetchData} from "@/components/utils/utils";

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Page(){
    const { openSnackbar } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const [data, setData] = useState(null);

    // Datos para armar el header de la tabla
    const header = [
        { id: 'fecha_falta', label: 'Fecha falta' },
        { id: 'nombre_apellido', label: 'Apellido, Nombre' },
        { id: 'tipo_falta', label: 'Tipo' },
        { id: 'dimension_falta', label: 'Gravedad' },
        { id: 'fecha_inicio', label: 'Fecha de inicio' },
        { id: 'fecha_fin', label: 'Fecha de fin' },
        { id: 'cant_dias', label: 'Cantidad de dias' },
    ]

    const dataSanciones = [
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
        { fecha_falta: '01/03/2024', nombre_apellido: 'Gonzalez Ramirez, Juan Perez', tipo_falta: "Conflicto con otro interno", dimension_falta:"Grave", fecha_inicio: '01/03/2024', fecha_fin: '30/03/2024', cant_dias: "10" },
    ]
    // TODO: Si viene vacio o da error no mostrar la tabla por que explota


    useEffect(() => {
        fetchData(`${API_URL}/movimientos/motivos_de_traslado`)
            .then(fetchedData => {
                //@ts-ignore
                setData(Object.keys(fetchedData).map(key=>fetchedData[key]));
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
            <TituloComponent titulo='Faltas y sanciones' url='/' newEntry='/gestion-ppl/faltas/crear'/>
            <Box mt={4}>
                <CustomTable
                    showId={false}
                    headers={header}
                    data={dataSanciones}
                    // @ts-ignore
                    deleteRecord={handleOpenModal}
                    options={{

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