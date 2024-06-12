'use client'

import CustomTable from "@/components/CustomTable";
import * as React from "react";
import {useEffect, useState} from "react";

const APIAUTH_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API;

const headers = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
]

export default function TabPermisos(){
    const [data, setData] = useState(null)


    useEffect(() => {

        // Gest lista de usuarios
        fetch(`${APIAUTH_URL}/permiso`).then((res)=>{
            return res.json()
        }).then((data)=>{

            setData(data.map((item:any)=>({
                id: item.id,
                nombre: item.nombre ? item.nombre : 'N/D',
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