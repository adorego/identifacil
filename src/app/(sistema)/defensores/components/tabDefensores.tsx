'use client'

import * as React from "react";
import CustomTable from "@/components/CustomTable";
import {useEffect, useState} from "react";
import {listaDefensores} from "@/app/api/lib/defensores/defensores";

const header = [
    {id: 'id', label: 'ID'},
    {id: 'tipo', label: 'Tipo'},
    {id: 'nombre', label: 'Nombre'},
    {id: 'apellido', label: 'Apellido'},
    {id: 'telefono', label: 'Telefono'},
]

export default function TabDefensores() {
    const [dataDefensores, setDataDefensores] = useState<[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listaDefensores();
            const { data } = await response.json()
            console.log('lista de defensores', data);
            setDataDefensores(data.defensores)
        };

        fetchData().catch(console.error);
    }, []);

    return(
        <>
            <CustomTable
                showId={true}
                headers={header}
                // deleteRecord={handleOpenModal}
                data={dataDefensores}
                options={{
                    targetURL: '/gestion-ppl/medidas-de-fuerza',
                    rowsPerPageCustom: 5,
                    pagination: true,
                    // deleteOption: PermissionValidator('borrar_medidas_de_fuerza', session) ? true : false

                }}
            />
        </>
    )
}