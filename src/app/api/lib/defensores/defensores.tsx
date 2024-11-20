import { NextResponse } from 'next/server'
import { API_DEFENSORE_GET_LISTA } from '@/app/api/lib/endpoint';

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