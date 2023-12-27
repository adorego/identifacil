
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
 * @param {url} Endpoint de la informacion.
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
/*
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
 * @param {Array} data Array de objetos a filtrar.
 * @param {string} startDate Fecha de inicio para el filtro.
 * @param {string} endDate Fecha de finalización para el filtro.
 * @param {string} dateField Nombre del campo en el objeto que contiene la fecha.
 * @returns {Array} Array filtrado.
 */
export const filterByDateRange = (data, startDate, endDate, dateField) => {
    return data.filter(item => {
        const itemDate = dayjs(item[dateField]);
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        return itemDate.isAfter(start) && itemDate.isBefore(end);
    });
};