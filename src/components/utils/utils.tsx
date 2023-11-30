export default deleteRecord = async (id) => {
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
};