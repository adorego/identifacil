'use client'


import log from "loglevel";

export async function onConsultarRegistroCivil(cedula:string) {

    console.log('consula de datos al registro civil')
    const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_CONSULTACI_API}/get_datos_ci/`;

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json','Accept': '*/*'},
            mode: 'cors',
            body: JSON.stringify({"cedula": cedula})
        });
        console.log("Respuesta:",response);

        if (response.ok) {
            const data = await response.json();
            console.log("Data:",data);
            if (data.exito) {
                return data.datosDeCedula
            }
        } else {
            log.error("Error al consultar la cedula a la policia:", await response.json());
        }
    } catch (error) {
        log.error("Hubo un error durante la consulta de la CI:", error);
    }
}