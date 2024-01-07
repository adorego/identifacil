'use client'

import { Box } from "@mui/material";
import CircularProgressionWithLabel from "@/common/CircularProgressionWithLabel";
import { ElectricalServices } from "@mui/icons-material";
import FaceRecognition from "@/components/registro/FaceRecognition";
import { IReconocimiento } from "@/components/registro/FaceDetectionOverlay";
import IdentificationData from "@/components/registro/IdentificationData";
import { useGlobalContext } from "@/app/Context/store";
import { useState } from "react";

interface IdentificationResponse{
  nombres:string;
  apellidos:string;
  esPPL:boolean;
}
const initialResponse:IdentificationResponse = {
  nombres:"",
  apellidos:"",
  esPPL:false
}
const EstadosProgreso:Array<string> = ['No iniciado', 'Obteniendo los datos del rostro', 'Consultando a la Base de Datos','Datos disponibles'];
export default function Identificacion(){
   const [progresoReconocimiento, setProgresoReconocmiento] = useState(EstadosProgreso[0]);
   const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
   const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse)
   
   
   const agregar_reconocimiento = async (reconocimiento:IReconocimiento) =>{
    const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/api/identificacion/`;
    // console.log('url:', url);
    const dataToSend = {
      descriptorFacial:reconocimiento.descriptor
    }
    // console.log("Data to send:", dataToSend);
    setProgresoReconocmiento(EstadosProgreso[2]);
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
        
    });
    

    
    
    if(!response.ok){
      const data = await response.json();
      console.log('Ocurrio un error:', data);
    }else{
      const data:IdentificationResponse = await response.json();
      setProgresoReconocmiento(EstadosProgreso[3]);
      setIdentificationData({
        nombres:data.nombres,
        apellidos:data.apellidos,
        esPPL: data.esPPL
      })
      // openSnackbar(`Persona Reconocida, nombre:${data.nombres}, apellido:${data.apellidos}, esPPL:${esPPL}`);
    }
  }

  const actualizar_progreso = (progreso:number) =>{
    setProgresoReconocmiento(EstadosProgreso[progreso]);
  }

  const cerrar_dialogo = () =>{
    setProgresoReconocmiento(EstadosProgreso[0]);
  }
  
  return(
    <Box sx={{position:'relative', 
              // border:"2px solid #f00", 
              width:"100%",
              height: "100vh"
            
            
              }} 
              mt={4}>
        <Box
         sx={{position:'absolute', 
              display:`${!showSpinner ? 'none' : 'null'}`,
              backgroundColor:'hsla(0,0%,100%,1)',
              visibility:'',
              width:"500px",
              height:"400px",
              paddingTop:"0px",
              top:'200px',
              left:'50%', 
              transform: 'translate(-50%,-50%)',
              zIndex:10}}
        >
          {progresoReconocimiento === EstadosProgreso[3] ? 
          <IdentificationData 
          nombres={identificationData.nombres} 
          apellidos={identificationData.apellidos} 
          esPPL={identificationData.esPPL} 
          cerrarDialogo={cerrar_dialogo}/> :
          <CircularProgressionWithLabel 
          indicador={0} 
          estado={progresoReconocimiento} />} 
          
        </Box>
        <FaceRecognition 
        agregar_reconocimiento={agregar_reconocimiento} 
        notificacion="" 
        numero_de_capturas={1} 
        progreso={actualizar_progreso}
        etiqueta_boton="Identificar" />
    </Box>
    
  )
}