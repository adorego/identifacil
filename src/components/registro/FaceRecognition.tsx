import * as faceapi from "face-api.js";

import {AddAPhoto, Height} from "@mui/icons-material";
import {Alert, Box, Button, Grid, Typography} from "@mui/material";
import {FC, Suspense, useEffect, useRef, useState} from "react";
import FaceDetectionOverlay, { IReconocimiento } from "./FaceDetectionOverlay";

import {IdentificacionForm} from "./IdentificationForm";
import JSMpeg from "@cycjimmy/jsmpeg-player";
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
                    }}>Por favor situe a la persona frente para generar el registro</Alert>
                   
                    <div className={styles.video_container}>
                        <video className={styles.video}
                               width={600}
                               height={600} 
                               ref={videoElementRef}
                               id="videoElement" autoPlay></video>

                        <FaceDetectionOverlay
                            className={styles.relayCanvas}
                            videoElement={videoElementRef.current}
                            agregar_reconocimiento={props.agregar_reconocimiento}/>
                    
                        {/* <Button onClick={onFotoCapture} className={styles.capturePhoto} variant={"contained"}
                                endIcon={<AddAPhoto/>}>Capturar</Button> */}
                    </div>
                  </Box>
            </Grid>
        </Grid>


    )


}

export default FaceRecognition;