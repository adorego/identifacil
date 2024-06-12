'use client'

import CustomTable from "@/components/CustomTable";
import * as React from "react";
import {useEffect, useState} from "react";

const APIAUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API;

const headers = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'ci', label: 'Nro. Documento' },
    { id: 'roles', label: 'Roles' },
]

export default function TabUsuarios(){
    const [data, setData] = useState(null)


    useEffect(() => {

        // Gest lista de usuarios
        fetch(`${APIAUTH_URL}/usuario`).then((res)=>{
            return res.json()
        }).then((data)=>{

            setData(data.map((item:any)=>({
                id: item.id,
                nombre: item.nombre ? item.nombre : 'N/D',
                apellido: item.apellido ? item.apellido : 'N/D',
                ci: item.ci ? item.ci : 'N/D',
                roles: item.roles.length > 0 ? item.roles.map((item:any)=>item.nombre).join(', ') : 'N/D'
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
                    /*targetURL: '/sistema/tipos-medidas-de-fuerza',*/
                    rowsPerPageCustom: 5,
                    pagination: true,
                }}
            />
        </>
    )
}