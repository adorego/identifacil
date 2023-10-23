import * as faceapi from "face-api.js";

import {AddAPhoto, Height} from "@mui/icons-material";
import {Alert, Box, Button, Grid, Typography} from "@mui/material";
import {FC, Suspense, useEffect, useRef, useState} from "react";
import FaceDetectionOverlay, { IReconocimiento } from "./FaceDetectionOverlay";

import {IdentificacionForm} from "./IdentificationForm";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import LinearProgressionWithLabel from "@/common/LinearProgressionWithLabel";
import VideoPlayer from "./VideoPlayer";
import { blue } from "@mui/material/colors";
import styles from "./FaceRecognition.module.css";
import {testWebSocketConnection} from "@/common/testWebSocketConnection";

interface ErrorInt {
    error: boolean;
    message: string;
}
export interface FaceRecognitionProps{
  agregar_reconocimiento:({}:IReconocimiento) => void;
  notificacion:string;
}

interface IRegisterProgress{
  indicador:number;
  estado:string;
}

const progressInitialState:IRegisterProgress = {
  indicador:0,
  estado:'Iniciando'
}

const FaceRecognition:FC<FaceRecognitionProps> = (props:FaceRecognitionProps) =>{
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [capturarFoto,setCapturarFoto] = useState<boolean>(false);
  const [iniciarDeteccion, setIniciarDeteccion] = useState<boolean>(false);
  const [progress, setProgress] = useState<IRegisterProgress>(progressInitialState);
  
  const conectar_con_camaraIP = () =>{
    try{
      const canvas = document.createElement('canvas');
      const player = new JSMpeg.Player(process.env.NEXT_PUBLIC_CAMARA_STREAMING_WEBSOCKET_URL, {
      canvas: canvas as HTMLCanvasElement,
      loop:true,
      autoplay:true,
      protocols:['mp2t'],
      onSourceEstablished:(source:any) =>{
        if(videoElementRef.current){
          videoElementRef.current.srcObject = canvas.captureStream(); 
          setIniciarDeteccion(true);
        }
      },
      onEnded: (player:any) =>{
        if(videoElementRef.current){
          videoElementRef.current.srcObject = null;
        }
      }
      });
    }catch(error){
      console.log(error);
    }
  }

  const conectar_con_webcam = () =>{
      try{
        console.log("Navegador:", navigator, "mediaDevices:", navigator.mediaDevices);
        if(navigator && navigator.mediaDevices){
          console.log("Entro en mediaDevice")
          navigator.mediaDevices.getUserMedia({video:true})
          .then(function(stream){
            if(videoElementRef.current != null){
              videoElementRef.current.srcObject = stream;
              setIniciarDeteccion(true);
            }
          })
        }else{
          console.log("No entro en mediaDevice");
        }
      }catch(error){
        console.log(error);
      }
      
  }
  
    useEffect(
      () =>{
      
          Promise.all(
            [
              // faceapi.loadSsdMobilenetv1Model('/models'),
              faceapi.loadTinyFaceDetectorModel('/models'),
              faceapi.loadFaceLandmarkModel('/models'),
              faceapi.loadFaceLandmarkTinyModel('/models'),
              // faceapi.loadFaceDetectionModel('/models'),
              faceapi.loadFaceRecognitionModel('/models')
            ]
          ).then(
            () =>{
                    //conectar_con_camaraIP();
                    conectar_con_webcam();
                   


          })
          .catch((error) => {
            console.log(error);
          })
        }
    )

    const onFotoCapture = () => {
        setCapturarFoto(true);
    }

    const reset_capturar_foto = () =>{
      console.log('Se resetea CapturarFoto');
      setCapturarFoto(false);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{
                  // border:"2px solid blue",
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  width:'100%',
                  height:'100%',
                  marginBottom: "10px"}} >

                    <Alert severity="info" sx={{
                        position: 'absolute',
                        top: '90px',
                    }}>Por favor situe a la persona frente a la camara y presione el botón "Capturar" para el registro</Alert>
                   
                    <div className={styles.video_container}>
                        <video className={styles.video}
                               width={600}
                               height={600} 
                               ref={videoElementRef}
                               id="videoElement" autoPlay></video>

                        <FaceDetectionOverlay
                            className={styles.relayCanvas}
                            iniciar_deteccion={iniciarDeteccion}
                            videoElement={videoElementRef.current}
                            capturar_foto={capturarFoto}
                            reset_capturar_foto={reset_capturar_foto}
                            agregar_reconocimiento={props.agregar_reconocimiento}/>
                        {/* {capturarFoto ? 
                        <LinearProgressionWithLabel indicador={progress.indicador} estado={progress.estado} />
                        : null } */}
                        <Typography variant="body1" className={styles.notificacion}>
                          {props.notificacion}
                        </Typography>
                        <Button onClick={onFotoCapture} className={styles.capturePhotoButton} variant={"contained"}
                                endIcon={<AddAPhoto/>}>Capturar</Button>
                    </div>
                  </Box>
            </Grid>
        </Grid>


    )


}

export default FaceRecognition;