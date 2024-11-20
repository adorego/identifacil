import { NextResponse } from 'next/server'
import entrevistasURL, {
    API_DEFENSORE_GET_LISTA,
    API_INTERVENCION_GET,
    API_INTERVENCION_GET_CIRCUNSCRIPCION
} from '@/app/api/lib/endpoint';

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
}

const URL_QUERY = `${API_DEFENSORE_GET_LISTA}`

export const listaEntrevistaPorIntervencion = async ({authorization, id_intervencion}:entrevistasQueryType) => {

    const response = await fetch(
        `${entrevistasURL(id_intervencion)}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization ? authorization : "",
            },
        }
    )
    const data = await response.json()
    // console.log('Check response en lib', data)
    return NextResponse.json({ data })

}

/** Obtener datos de Intervencion
 *
 *  @param authorization Dato para pasar autorizacion para obetener el query
 *  @param id_intervencion parametro para obtener datos de una intervencion
 *  @return Retorna JSON de los datos obtenidos
 * */
export const getIntervencion = async ({authorization, id_intervencion}:entrevistasQueryType) => {

    const response = await fetch(
        `${API_INTERVENCION_GET}/${id_intervencion}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization ? authorization : "",
            },
        }
    )
    const data = await response.json()

    return NextResponse.json({ data })

}


export const listaDeIntervencionesPorCircunscripcion = async ({authorization,id_circunscripcion}:{id_circunscripcion?:number; authorization?:any}) => {

    const response = await fetch(
        `${API_INTERVENCION_GET_CIRCUNSCRIPCION}/1`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization ? authorization : "",
            },
        }
    )
    const data = await response.json()
    // console.log('Check response en lib', data)

    return NextResponse.json({ data })

}