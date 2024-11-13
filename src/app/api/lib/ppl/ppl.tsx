import { NextResponse } from 'next/server'
/**
 * Funcion para poder realizar el alta del usuario.
 * @param usuario
 * @param correo
 * @param contrasena
 * @param rol
 */

const URL_QUERY = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`

export const listaPPL = async (authorization?: string) => {
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
    console.log('Check response en lib', data)

    return NextResponse.json({ data })
}