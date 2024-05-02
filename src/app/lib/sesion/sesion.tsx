
/**
 * Funcion encargada del cierre de sesion con comunicación a la API.
 * @param identificador
 * @param authorization
 */
export const cerrarSesion = async (identificador: string, authorization: string) => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PATH_URL_USER_SIGNOUT}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization,
            },
            body: JSON.stringify({
                identificador: identificador,
            }),
        }
    )
    return response
}

/**
 * Funcion encargada del inicio de sesion
 * @param identificador
 * @param authorization
 */
export const iniciarSesion = async (identificador: string, contrasenha: string) => {
    console.log('llegamos aqui?', identificador)


    const bodyInfo = new URLSearchParams({
        'username': identificador,
        'password': contrasenha,
        'scope': 'groups',
        'client_id': 'auth-app',
        'grant_type': 'password',
    })


    const response = await fetch(
        `http://localhost:8080/realms/AUTH/protocol/openid-connect/token`,
        {
            method: 'POST',
            body: bodyInfo,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    )
    console.log(response)
    return response
}