'use client'

import * as React from 'react';

import {Alert, Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";


const ENDPOINT: string = `/gestion_ppl/ppls`

const header = [
    {id: 'id', label: 'ID'},
    {id: 'nombre_apellido', label: 'Apellido, Nombre'},
    {id: 'apodo', label: 'Apodo'},
    {id: 'numero_de_identificacion', label: 'Documento'},
    {id: 'genero', label: 'Genero', type: 'genero', dataType:[{id: 1, name: 'Femenino'},{id: 2, name:'Masculino'}]},
    {id: 'fechaDeNacimiento', label: 'Fecha nacimiento', type: 'date'},
    /*{id: 'estado_perfil', label: 'Estado Perfil'},*/
]

/*async function getDatos(endpoint:string=""){

    const res = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}${endpoint}`)


    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}*/

export default function Page() {

    const [listaPersonas, setListaPersonas] = useState([])
    const [dataFiltrado, setDataFiltrado] = useState(null);
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud fetch:', error);
            return null; // o manejar el error de manera adecuada
        }
    }

    useEffect(() => {
        console.log('get ppl')
        fetchData()
            .then(fetchedData => {
                setListaPersonas(fetchedData.map((item:any)=>({
                    ...item,
                    nombre_apellido: `${item.apellido}, ${item.nombre}`,
                })));
            }).finally(() => {
            setLoading(false)
        })
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez
    {console.log(listaPersonas)}


    const onHandleFiltro = (value: any) => {
        setDataFiltrado(value)
    }

    if (!listaPersonas) {
        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                {
                    loading ?
                        <CircularProgress/>
                        : (
                            <>
                                <Box>
                                    <Alert color='info'>
                                        No hay datos para mostrar en este momento
                                    </Alert>
                                </Box>
                            </>
                        )
                }
            </Box>
        );
    }


    return (
        <div>
            <TituloComponent titulo='Gestion PPL'/>
            <Grid container mt={3}>
                <Grid item sm={12}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <FiltrosTables
                                dateSearchField='fechaDeNacimiento'
                                searchField='numero_de_identificacion'
                                dataSinFiltro={listaPersonas} handleFiltro={onHandleFiltro}/>
                        </Box>
                        <CustomTable
                            headers={header}
                            data={dataFiltrado ? dataFiltrado : listaPersonas}
                            showId={false}
                            options={{
                                deleteOption: false,
                                rowsPerPageCustom: 10,
                                pagination: true,
                                targetURL: `/ppl`,
                                busqueda: `id_persona`,
                            }}
                        />
                    </Paper>
                    {/*<DataTableComponent />*/}
                </Grid>
            </Grid>
        </div>
    )
}