'use client'

import { Box } from "@mui/material";
import FaceRecognition from "@/components/registro/FaceRecognition";
import { IReconocimiento } from "@/components/registro/FaceDetectionOverlay";

export default function Identificacion(){

   const agregar_reconocimiento = async (reconocimiento:IReconocimiento) =>{
    const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/api/identificacion/`;
    // console.log('url:', url);
    const dataToSend = {
      descriptorFacial:reconocimiento.descriptor
    }
    console.log("Data to send:", dataToSend);
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
        
    });
    const data = await response.json();

    
    console.log("Datos recibidos:", data);
    if(!response.ok){
      console.log('Ocurrio un error:', data);
    }
  }

  
  return(
    <Box mt={4}>
        <FaceRecognition agregar_reconocimiento={agregar_reconocimiento} notificacion="" numero_de_capturas={1} />
    </Box>
    
  )
}