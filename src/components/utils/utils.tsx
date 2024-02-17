'use client'

import * as React from 'react';

import dayjs from 'dayjs';

/*export default deleteRecord = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/endpoint/${id}`, {
            method: 'DELETE',
            // Aquí puedes agregar headers adicionales si son necesarios
            // headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Registro eliminado con éxito");
            // Aquí puedes agregar lógica adicional, como actualizar el estado para reflejar el cambio
        } else {
            console.error("Error al eliminar el registro");
        }
    } catch (error) {
        console.error("Error al intentar comunicarse con el servidor:", error);
    }
};*/

/**
 * Recibe los datos de la enpoint y retorna en una promesa
 * @param url
 */

export async function fetchData(url : string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
        return null; // o manejar el error de manera adecuada
    }
}

export async function fetchFormData(id: any, entity: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_JSON_SERVER}/${entity}?id=${id}`);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const data = await response.json();
        if (data.length > 0) {
            return data[0];
        }

        return null; // Devuelve null si no se encuentra ningún dato válido
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

/**
Como recibir del otro lado el fetch
// OtraPagina.js
import { useEffect, useState } from 'react';
import { fetchData } from './utils'; // Ajusta la ruta según la ubicación real de tu archivo utils.js

export default function OtraPagina() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/traslados'; // Puedes cambiar la URL según tus necesidades
        fetchData(apiUrl)
            .then(fetchedData => {
                setData(fetchedData);
            });
    }, []);

    // Resto del componente
}

* */

/**
 * Filtra un array de objetos basado en un rango de fechas.
 *
 * @param {Array} data Array de objetos a filtrar.
 * @param {string} startDate Fecha de inicio para el filtro.
 * @param {string} endDate Fecha de finalización para el filtro.
 * @param {string} dateField Nombre del campo en el objeto que contiene la fecha.
 * @returns {Array} Array filtrado.
 */
export const filterByDateRange = (data: any[], startDate: string | number | Date | dayjs.Dayjs | null | undefined, endDate: string | number | Date | dayjs.Dayjs | null | undefined, dateField: string) => {
    return data.filter(item => {
        const itemDate = dayjs(item[dateField]);
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        return itemDate.isAfter(start) && itemDate.isBefore(end);
    });
};



/**
 * Filtra un array de objetos basado en un rango de fechas.
 * @param {string} isEditMode variable para saber si es un put o post
 * @param {string }endpoint
 * @param {string} entityName Nombre de la tabla o entidad a actualizar
 * @param {number|string} params Es el valor del id del elemento consultado
 * @param {string} stateForm Datos del form
 * @param {string} setLoading Funcion para cambiar el estado del loader
 * @param {string} openSnackbar Funcion para abrir el snackdel global context
 * @param router
 */
export const postEntity = async (
    isEditMode: string | number,
    endpoint: string,
    entityName: string,
    params: { id: number | string; },
    stateForm: any,
    setLoading: (arg0: boolean) => void,
    openSnackbar: (message: string, severity: "" | "success" | "info" | "warning" | "error") => void,
    router: any
) => {
    try {
        setLoading(true);

        const method = isEditMode !== 'crear' ? 'PUT' : 'POST';
        console.log(stateForm)
        const url = isEditMode !== 'crear'
            ? `http://localhost:5000/${endpoint}/${params.id}` // PUT
            : `http://localhost:5000/${endpoint}`;                                             // POST

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stateForm),
        });

        setLoading(false);

        if (response.ok) {
            const message = isEditMode
                ? `${entityName} actualizada correctamente.`
                : `${entityName} creada correctamente.`;

            openSnackbar(message, 'success');
            router.push(`/${endpoint}`);
        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        setLoading(false);
        console.error('Error:', error);
    }
};


export const postForm = async (
    isEditMode: boolean,
    endpoint: string,
    entityName: string,

    stateForm: any,
    setLoading: (arg0: boolean) => void,
    openSnackbar: (message: string, severity: "" | "success" | "info" | "warning" | "error") => void,
    router: any,
    redirect: boolean = false
) => {
    try {
        setLoading(true);

        const method = isEditMode ? 'PUT' : 'POST';
        console.log(stateForm)
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/${endpoint}`

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stateForm),
        });

        setLoading(false);

        if (response.ok) {
            const message = isEditMode
                ? `${entityName} actualizada correctamente.`
                : `${entityName} creada correctamente.`;

            openSnackbar(message, 'success');
            if(redirect){
                router.push(`/${endpoint}`);
            }
        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        setLoading(false);
        console.error('Error:', error);
    }
};