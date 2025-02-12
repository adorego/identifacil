import { NextResponse } from 'next/server'
import { API_DEFENSORE_GET_LISTA, API_DEFENSORES_POST, API_USUARIO_POST_USER } from '@/app/api/lib/endpoint';

/**
 * Funcion para poder realizar el alta del usuario.
 * @param usuario
 * @param correo
 * @param contrasena
 * @param rol
 */

const URL_QUERY = `${API_DEFENSORE_GET_LISTA}`

export const listaDefensores = async (authorization?: string) => {
    const response = await fetch(
        `${URL_QUERY}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization ? authorization : "",
            },
        }
    )
    const data = await response.json()
    // console.log('Check response en lib Entrevista', data)

    return NextResponse.json({ data })
}



export const createDefensor = async (data : Object) => {
    const response = await fetch(`${API_DEFENSORES_POST}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }
    )
    const dataRes = await response.json()

    return NextResponse.json({ dataRes })
}
