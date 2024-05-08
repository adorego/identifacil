'use client'

import * as React from 'react';

import {Alert, Box, CircularProgress, Grid, Paper} from "@mui/material";
import TituloComponent from "@/components/titulo/tituloComponent";
import CustomTable from "@/components/CustomTable";
import FiltrosTables from "@/app/(sistema)/movimientos/components/filtrosTables";
import {useEffect, useState} from "react";
import {fetchData} from "@/components/utils/utils";
import FiltrosPpl from "@/app/(sistema)/ppl/components/filtrosPpl";
import dayjs from "dayjs";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";



const header = [
    {id: 'id_persona', label: 'ID'},
    {id: 'nombre_apellido', label: 'Apellido, Nombre'},
    {id: 'apodo', label: 'Apodo'},
    {id: 'numero_de_identificacion', label: 'Documento'},
    {id: 'nacionalidad', label: 'Nacionalidad'},
    {id: 'genero', label: 'Genero', type: 'genero', dataType: [{id: 1, name: 'Femenino'}, {id: 2, name: 'Masculino'}]},
    {id: 'fecha_de_ingreso', label: 'Fecha ingreso', type: 'date'},
    /*{id: 'estado_perfil', label: 'Estado Perfil'},*/
]


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

        fetchData()
            .then(fetchedData => {

                if (fetchedData.length > 0) {
                    console.log(fetchedData)
                    setListaPersonas(fetchedData.map((item: any) => {

                        // console.log(item.datosJudiciales?.ingresos_a_prision?.find((item: any) => item.ultimo_ingreso).fecha_ingreso)
                        const ultimoIngreoRegistro = item.datosJudiciales?.ingresos_a_prision?.find((item: any) => item.ultimo_ingreso)
                        const fecharIngresoData = (ultimoIngreoRegistro?.fecha_ingreso) ? (dayjs(ultimoIngreoRegistro.fecha_ingreso).format('DD-MM-YYYY')) : 'N/D'

                        return ({
                            ...item,
                            nombre_apellido: `${item.apellido.toUpperCase()}, ${item.nombre.toUpperCase()}`,
                            fecha_de_ingreso: fecharIngresoData,
                            apodo: item.apodo ? item.apodo : 'N/D',
                            nacionalidad: item.datosPersonales?.nacionalidad ? item.datosPersonales.nacionalidad.nombre : 'N/D'
                        })
                    }));
                }
            }).finally(() => {
            setLoading(false)
        })
    }, []);

    const onHandleFiltro = (value: any) => {
        setDataFiltrado(value)
    }

    const listaDeItemBread = [
        {nombre:'Lista de PPL', url:'', lastItem: true},
    ];

    if (listaPersonas.length == 0) {
        return (
            <div>
                <TituloComponent titulo='Personas Privadas de Libertad'>
                    <BreadCrumbComponent listaDeItems={listaDeItemBread} />
                </TituloComponent>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}>

                    {loading ?
                        <Box>
                            <CircularProgress/>
                        </Box>
                        : (<>
                            <Box>
                                <Alert color='info'>
                                    No hay datos para mostrar en este momento
                                </Alert>
                            </Box>
                        </>)
                    }
                </Box>
            </div>
        );
    }


    return (
        <div>
            <TituloComponent titulo='Personas Privadas de Libertad'>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
            </TituloComponent>
            <Grid container mt={3}>
                <Grid item sm={12}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <FiltrosPpl
                                dateSearchField='fecha_de_ingreso'
                                searchField='numero_de_identificacion'
                                dataSinFiltro={listaPersonas} handleFiltro={onHandleFiltro}/>
                        </Box>
                        <CustomTable
                            headers={header}
                            data={dataFiltrado ? dataFiltrado : listaPersonas}
                            showId={true}
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