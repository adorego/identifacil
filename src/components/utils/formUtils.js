import React from "react";

export function handleInputChange(event, formData, setFormData) {
    // event.preventDefault();
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

/**
 *  Validador de numeros
 *  @param value int | string
 *  @return boolean
 * */
export function numberValidator (value){

    // Configuracion para validar numeros y espacios.
    const regex = /^\+?[0-9\(\)\s]*\.?[0-9\(\)\s]*$/;

    if (value.match(regex)) {
        return true
    } else{
        return false
    }


}