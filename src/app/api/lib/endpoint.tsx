

export const API_CAUSA_GET_LISTA = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`

// Usuarios
export const API_USUARIO_POST_USER = `${process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API}/registro`
export const API_DEFENSORE_GET_USER = `${process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API}/usuario`

// Apartado Defensores
export const API_DEFENSORES_GET_DASHBOARD = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/dashboard_data`
export const API_DEFENSORE_GET_LISTA = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/defensores`
export const API_INTERVENCION_POST = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones`
export const API_INTERVENCION_GET = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones`
export const API_INTERVENCION_GET_CIRCUNSCRIPCION = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones/circunscripcion`


// Apartado Gestion de Defensores
export const API_GET_DEFENSORES = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/defensor`
export const API_DEFENSORES_POST = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/defensor`
export const API_DEFENSORES_USUARIO_GET = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/defensor/byIdUsuario`

export default function entrevistasURL(id_intervencion:string|number){

    const URL = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/defensores/intervenciones/${id_intervencion}/entrevistas`

    return URL
}
