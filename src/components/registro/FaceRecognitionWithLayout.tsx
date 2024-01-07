import { Box } from "@mui/material";
import CircularProgressionWithLabel from "@/common/CircularProgressionWithLabel";
import { EstadosProgreso } from "./FormRegister";
import FaceRecognition from "./FaceRecognition";
import { IReconocimiento } from "./FaceDetectionOverlay";
import RegistrationData from "./RegistrationData";

export interface FaceRecognitionProps{
  showSpinner:boolean;
  progresoRegistro:string;
  mensaje:string;
  cerrar_dialogo:() => void;
  agregar_reconocimiento:(reconocimiento:IReconocimiento) => void;
  actualizar_progreso:(progreso:number) => void;
  etiquetaLabel:string;

}
export default function FaceRecognitionWithLayout(props:FaceRecognitionProps){

  return(
    <Box sx={{position:'relative', 
                      // border:"2px solid #f00", 
                      width:"100%",
                      height: "100vh"
             }} mt={4}>
               <Box sx={{position:'absolute', 
                                    display:`${!props.showSpinner ? 'none' : 'null'}`,
                                    backgroundColor:'hsla(0,0%,100%,1)',
                                    visibility:'',
                                    width:"500px",
                                    height:"400px",
                                    paddingTop:"0px",
                                    top:'200px',
                                    left:'50%', 
                                    transform: 'translate(-50%,-50%)',
                                    zIndex:10}}>
                            {props.progresoRegistro === EstadosProgreso[3] ? 
                              <RegistrationData mensaje={props.mensaje} cerrarDialogo={props.cerrar_dialogo}/> :
                              <CircularProgressionWithLabel indicador={0} estado={props.progresoRegistro} />} 
          
               </Box>
               <FaceRecognition 
                  agregar_reconocimiento={props.agregar_reconocimiento} 
                  notificacion="" 
                  numero_de_capturas={3} 
                  progreso={props.actualizar_progreso}
                  etiqueta_boton={props.etiquetaLabel} />
    </Box>
                  
                    
  )        
                                  
                              
                          
}

  
