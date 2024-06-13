'use client'

import CustomTable from "@/components/CustomTable";
import * as React from "react";
import {useEffect, useState} from "react";

const APIAUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API;

const headers = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Descripcion' },
    { id: 'permisos', label: 'Permisos' },
]

export default function TabRoles(){
    const [data, setData] = useState(null)


    useEffect(() => {

        // Gest lista de usuarios
        fetch(`${APIAUTH_URL}/rol`).then((res)=>{
            return res.json()
        }).then((data)=>{

            setData(data.map((item:any)=>({
                id: item.id,
                nombre: item.nombre,
                permisos: item.permisos.length
            })))
        })


    }, []);

    if(!data){
        return(
            <>
                No hay permisos disponibles en este momento.
            </>
        )
    }

    return(
        <>
            <CustomTable
                showId={true}
                headers={headers}
                data={data}
                options={{
                    title: 'Lista de roles',
                    newRecord: '/sistema/gestion-de-usuarios/roles/crear',
                    targetURL: '/sistema/gestion-de-usuarios/roles',
                    rowsPerPageCustom: 5,
                    pagination: true,
                }}
            />
        </>
    )
}