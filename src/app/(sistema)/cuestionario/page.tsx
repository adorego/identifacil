'use client'

const Cuestionario = () =>{
    return(
        <>
            <CuestionarioRegistro id_persona={21} datosDeIdentidad={{

                id_persona:20,
                nombres:"Fernando Javier",
                apellidos:"Vera Cuenca",
                fecha_nacimiento:"20-07-1989",
                codigo_genero:2,
                es_extranjero:false,
                tiene_cedula:true
            }} />
        </>


)
}

import CuestionarioRegistro from "@/components/registro/CuestionarioRegistro"

export default Cuestionario;