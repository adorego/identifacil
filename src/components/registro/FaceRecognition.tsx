import * as faceapi from "face-api.js";

import {AddAPhoto, Height} from "@mui/icons-material";
import {Alert, Box, Button, Grid, Typography} from "@mui/material";
import {FC, Suspense, useEffect, useRef, useState} from "react";

import FaceDetectionOverlay from "./FaceDetectionOverlay";
import {IdentificacionForm} from "./IdentificationForm";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import VideoPlayer from "./VideoPlayer";
import styles from "./FaceRecognition.module.css";
import {testWebSocketConnection} from "@/common/testWebSocketConnection";

interface ErrorInt {
    error: boolean;
    message: string;
}
export interface FaceRecognitionProps{
  actualizarFoto:(fotoParam:Blob | null) => void;
  mostrar_registro_final:(mostrar:boolean) => void;
}
const FaceRecognition:FC<FaceRecognitionProps> = (props:FaceRecognitionProps) =>{
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [modelsLoaded, setModelLoaded] = useState(false);
  
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
        navigator.mediaDevices.getUserMedia({video:true})
        .then(function(stream){
          if(videoElementRef.current != null){
            videoElementRef.current.srcObject = stream;
          }
        })
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
                setModelLoaded(true);


                })
                .catch((error) => {
                    console.log(error);
                })
        }
    )

    const onFotoCapture = () => {
        props.mostrar_registro_final(true);
        // setShowVideo(false);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px"}}
                     className='containerVideoCam'>

                    <Alert severity="info" sx={{
                        position: 'absolute',
                        bottom: '90px',
                    }}>Por favor situe a la persona frente a la camara y presione Capturar</Alert>
                    {/*<Typography sx={{marginTop:5, marginBottom:5, textAlign:'center'}} variant="h6">
                Por favor situe a la persona frente a la camara y presione Capturar
              </Typography>*/}
                    <div className={styles.video_container}>
                        <video className={styles.video}
                               width={"100%"}
                               height={"100%"}
                               ref={videoElementRef}
                               id="videoElement" autoPlay></video>

                        <FaceDetectionOverlay
                            className={styles.relayCanvas}
                            videoElement={videoElementRef.current}
                            actualizar_foto={props.actualizarFoto}/>
                    </div>
                    <Button onClick={onFotoCapture} className={styles.capturePhoto} variant={"contained"}
                            endIcon={<AddAPhoto/>}>Capturar</Button>
                </Box>
            </Grid>
        </Grid>


    )


}

export default FaceRecognition;