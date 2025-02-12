import { NextResponse } from 'next/server'
import { API_DEFENSORE_GET_USER,  API_USUARIO_POST_USER } from '@/app/api/lib/endpoint';


/**
 * Funcion para poder realizar el alta del usuario.
 * @param usuario
 * @param correo
 * @param contrasena
 * @param rol
 */
export const crearUsuario = async (data : Object) => {
    const response = await fetch(`${API_USUARIO_POST_USER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }
    )
    const dataRes = await response.json()

    return NextResponse.json({ dataRes })
}



export const listaUsuario = async (authorization?: string) => {
    const response = await fetch(
        `${API_DEFENSORE_GET_USER}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization ? authorization : "",
            },
        }
    )
    const data = await response.json()
    // console.log('test datos',data)
    return NextResponse.json({ data })
}