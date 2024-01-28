export function handleInputChange(event, formData, setFormData) {
    event.preventDefault();
    // console.log(event.target.name)
    // Realiza acciones comunes de manejo de envío de formularios
    // Actualiza el estado del formulario u otras operaciones necesarias
    // Puedes personalizar esta función según tus necesidades específicas

    // Ejemplo de actualización del estado:
    setFormData(
        {
            ...formData,
            [event.target.name]: event.target.value
        }
        );

    // Luego, puedes realizar más acciones como enviar datos al servidor, etc.

    // Retorna algún resultado si es necesario
}