'use client'

import TituloComponent from "@/components/titulo/tituloComponent";
import BreadCrumbComponent from "@/components/interfaz/BreadCrumbComponent";
import * as React from "react";
import TableView from "@/app/(sistema)/sistema/gestion-de-usuarios/components/tableView";
import TabUsuarios from '@/app/(sistema)/sistema/gestion-de-usuarios/components/tabUsuarios';

import CustomTable from "@/components/CustomTable";
import { useEffect, useState } from 'react';
import { API_GET_DEFENSORES } from '@/app/api/lib/endpoint';

const APIAUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API;

const headers = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'supervisor', label: 'Tipo Def' },
    { id: 'circunscripcion', label: 'Circunscripcion' },
]

export default function Page(){
    const [data, setData] = useState(null)


    useEffect(() => {

        // Gest lista de usuarios
        fetch(`${API_GET_DEFENSORES}`).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log('Data Defensores:', data.defensores)
            setData(data.defensores.map((item:any)=>({
                id: item.id,
                nombre: item.nombre ? item.nombre : 'N/D',
                apellido: item.apellido ? item.apellido : 'N/D',
                tipo: item.tipo ? item.tipo : 'N/D',
                supervisor: item.supervisor ? 'Supervisor' : 'Defensor',
                circunscripcion: item.circunscripcion ? item.circunscripcion.nombre : 'N/D',
                //roles: item.roles.length > 0 ? item.roles.map((item:any)=>item.nombre).join(', ') : 'N/D'
            })))
        })


    }, []);


    const listaDeItemBread = [
        {nombre:'Gestion de defesnores', url:'', lastItem: true},
    ];
    if(!data){
        return(
            <>
                No hay permisos disponibles en este momento.
            </>
        )
    }
    return(
        <>
            <TituloComponent titulo='Gestion de defensores
            '>
                <BreadCrumbComponent listaDeItems={listaDeItemBread} />
            </TituloComponent>

            {/* Vista de Tabla de Usuarios, roles y permisos*/}
            <CustomTable
                showId={true}
                headers={headers}
                data={data}
                options={{
                    newRecord:'/sistema/gestion-de-usuarios/usuarios/crear',
                    title: 'Lista de defensores',
                    targetURL: '/sistema/gestion-de-usuarios/usuarios',
                    rowsPerPageCustom: 5,
                    pagination: true,
                }}
            />
        </>
    )
}




