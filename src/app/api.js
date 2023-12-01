// api.js



export const deleteRecord = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000${id}`, {
            method: 'DELETE',
            // Agrega aquí cualquier header adicional si es necesario
        });

        if (response.ok) {
            return { success: true, message: "Registro eliminado con éxito" };
        } else {
            return { success: false, message: "Error al eliminar el registro" };
        }
    } catch (error) {
        return { success: false, message: `Error en la red: ${error.message}` };
    }
};

export const getRecord = async (url) => {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return { success: true, data: data };
    } catch (error) {
        return { success: false, message: `Error en la red: ${error.message}` };
    }
};


export const sendRequest = async (endpoint, data, id, isEditMode) => {

    const method = isEditMode == 'crear' ? 'POST' : 'PUT';
    const url = isEditMode !== 'crear'
        ? `http://localhost:5000/${endpoint}/${id}`
        : `http://localhost:5000/${endpoint}`;
    console.log('kesesto: ' + isEditMode)
    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return response;
};