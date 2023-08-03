import * as faceapi from "face-api.js";

import { AddAPhoto, Height } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";

import FaceDetectionOverlay from "./FaceDetectionOverlay";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import Loading from "@/app/loading";
import VideoPlayer from "./VideoPlayer";
import styles from "./FaceRecognition.module.css";
import { testWebSocketConnection } from "@/common/testWebSocketConnection";

interface ErrorInt{
  error:boolean;
  message:string;
}
const FaceRecognition:FC = () =>{
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [error,setError] = useState<ErrorInt>({error:false,message:""});
  const [modelsLoaded, setModelLoaded] = useState(false);
  useEffect(
    () =>{
      
      Promise.all(
        [
          faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        ]
      ).then(
        () =>{
          if(process.env.NEXT_PUBLIC_CAMARA_STREAMING_WEBSOCKET_URL){
            testWebSocketConnection(process.env.NEXT_PUBLIC_CAMARA_STREAMING_WEBSOCKET_URL)
            .then( (isConnected) =>{
              if(isConnected){
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
                setModelLoaded(true);

              }else{
                setError({error:true,message:"La camara está desconectada"});
              }
            })
            .catch((error) =>{
              setError({error:true, message:"Ocurrió un error al intentar la comunicación con la camara"});
            })
          }
        })
        ;
       },[]
    )

    return (
      <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"10px"}}>
        <div className={styles.video_container}>
          {!error.error ? 
            <>
            <video className={styles.video} 
            ref={videoElementRef} 
            id="videoElement" width={"100%"} height={420} autoPlay></video>
            <FaceDetectionOverlay 
            className={styles.relayCanvas} 
            videoElement={videoElementRef.current} /> 

            </>:
            <Box sx={{width:"100%", height:420, border:"1px soliid grey"}}>
              <Typography variant="h6">{error.message}</Typography>
            </Box>
          }
          
        </div>
        <Button className={styles.capturePhoto} variant={"contained"} endIcon={<AddAPhoto />}>Capturar</Button>
      </Box>
      
      )
  
  
    
  
}

export default FaceRecognition;