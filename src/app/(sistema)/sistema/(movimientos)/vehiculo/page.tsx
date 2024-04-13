'use client'

import * as React from 'react';

import {Box, CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from 'react';

import CustomTable from "@/components/CustomTable";
import ModalBorrado from "@/components/modal/ModalBorrado";
import TituloComponent from "@/components/titulo/tituloComponent";
import {deleteRecord} from "@/app/api";
import {useGlobalContext} from "@/app/Context/store";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";

// Datos para armar el header de la tabla
const header = [
    { id: 'id', label: 'ID' },
    { id: 'chapa', label: 'Chapa' },
    { id: 'marca', label: 'Datos vehiculo' },
    { id: 'chasis', label: 'Chasis' },
    { id: 'anho', label: 'Año' },
]

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API;

export default function Page(){

    const { openSnackbar } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ id: number, name: string }>({id: 0, name: ''});
    const [data, setData] = useState<any>(null);



    // TODO: Si viene vacio o da error no mostrar la tabla por que explota
    async function fetchData() {
        try {
            const response = await fetch(`${API_URL}/movimientos/vehiculos`);
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
            .then((fetchedData:any) => {

                setData(Object.keys(fetchedData).map(key=>fetchedData[key]));
            });
    }, []);

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

    const listaDeItemVehiculos = [
        {nombre:'Lista de vehiculos', url:'/sistema/vehiculo', lastItem: false},
        {nombre:'Vehiculo', url:'', lastItem: true},
    ];

    return(

        <Box>
            <TituloComponent titulo='Vehiculos'>
                <BreadCrumbComponent listaDeItems={listaDeItemVehiculos} />
            </TituloComponent>
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
                : (<Box mt={4} component={Paper}>
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
                                deleteOption:false,
                            }}
                        />
                </Box>)}
            <ModalBorrado open={modalOpen} onClose={handleCloseModal} data={selectedData} metodo={handleDeleteRecord}/>

        </Box>
    )
}