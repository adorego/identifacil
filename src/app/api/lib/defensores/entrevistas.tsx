// http://localhost:4001/api/registro/defensores/intervenciones/4/entrevistas


import { NextResponse } from 'next/server'
import entrevistasURL, { API_DEFENSORE_GET_LISTA } from '@/app/api/lib/endpoint';

/**
 * Funcion para poder realizar el alta del usuario.
 * @param usuario
 * @param correo
 * @param contrasena
 * @param rol
 */

type entrevistasQueryType = {
    authorization?: string;
    id_intervencion: string;
    bodyData: Object;
    id_entrevista?: string;
}



export const crearEntrevista = async ({authorization, id_intervencion='', bodyData}:entrevistasQueryType) => {

    const URL_QUERY = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones/${id_intervencion}/entrevistas`

    console.log('Check URL', URL_QUERY)

    const response = await fetch(URL_QUERY, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData),
    });

    const data = await response.json()
    // console.log('Check response en lib', data)

    return NextResponse.json({ data })

}


export const actualizarEntrevista = async ({authorization, id_intervencion='', bodyData, id_entrevista=''}:entrevistasQueryType) => {

    const URL_QUERY = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones/${id_intervencion}/entrevistas/${id_entrevista}`

    console.log('Check URL', URL_QUERY)

    const response = await fetch(URL_QUERY, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData),
    });

    const data = await response.json()
    // console.log('Check response en lib', data)

    return NextResponse.json({ data })

}