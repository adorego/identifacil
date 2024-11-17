import { NextResponse } from 'next/server'
/**
 * Funcion para poder realizar el alta del usuario.
 * @param usuario
 * @param correo
 * @param contrasena
 * @param rol
 */
/*export const altaUsuario = async (alias: string, correo: string, contrasena: string, rol: string, authorization: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_BACKEND_URL}${process.env.NEXT_PUBLIC_PATH_USER_ADD}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization,
            },
            body: JSON.stringify({
                alias: alias,
                correo: correo,
                contrasenha: contrasena,
                roles: [rol]
            }),
        }
    )
    return response
}*/
const URL_GET_USUARIOS = `${process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API}/usuario`

export const listaUsuario = async (authorization?: string) => {
    const response = await fetch(
        `${URL_GET_USUARIOS}`,
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