'use client'
import { Button } from "@mui/material";
import { useEffect, useState } from "react"


const Prueba =()=>{
    const [numeroDeExpediente,setNumeroDeExpediente] = useState<string>('123456');
    const [enviarPost,setEnviarPost] = useState(false);
    useEffect(
        ()=>{

            async function enviar_expediente(){
                const datosAEnviar= {
                    numeroDeExpediente: numeroDeExpediente,
                    condenado: true,
                    estado_procesal:"Con prisión domiciliaria",
                    caratula_expediente:"Asesinato en tercer grado",
                    hechosPuniblesCausas:[[4,7]]
                }
                
                const datosSerializados = JSON.stringify(datosAEnviar);
                console.log("Datos:", datosAEnviar);
                console.log("Datos serializados:", datosSerializados);
                const respuesta = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/prueba_post`,{
                    
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: datosSerializados
                    
                });
                console.log("Respuesta de la API:", respuesta);
                const respuesta2 = await fetch(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: datosSerializados
                })
                console.log("Respuesta de la API expedientes:", respuesta2);
                setEnviarPost(false);
            }
            enviarPost ? enviar_expediente() : null;
        },[numeroDeExpediente,enviarPost]
    )

    const onClickHandler = ()=>{
        setNumeroDeExpediente((prev)=>{
            const versionNumericaDeExpediente = parseInt(prev) + 10;
            return String(versionNumericaDeExpediente);
        })
        setEnviarPost(true);
    }
    
    return(
        <>
        {/* <Button sx={{backgroundColor:"lightskyblue",color:"black"}} onClick={onClickHandler}>Enviar expediente</Button> */}
        <img src="/api/registro/archivos/foto.jpg" width={200} height={200} />
        </>
    )
}

export default Prueba;