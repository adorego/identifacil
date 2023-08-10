import * as faceapi from "face-api.js";

import { AddAPhoto, Height } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FC, Suspense, useEffect, useRef, useState } from "react";

import FaceDetectionOverlay from "./FaceDetectionOverlay";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import VideoPlayer from "./VideoPlayer";
import styles from "./FaceRecognition.module.css";
import { testWebSocketConnection } from "@/common/testWebSocketConnection";

interface ErrorInt{
  error:boolean;
  message:string;
}
const FaceRecognition:FC = () =>{
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
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

              
            })
            .catch((error) =>{
              
            })
          }
        })
        ;
       },[]
    )

    return (
      <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"10px"}}>
        <div className={styles.video_container}>
            <>
            <video className={styles.video} 
            ref={videoElementRef} 
            id="videoElement" width={"80%"} height={420} autoPlay></video>
            <FaceDetectionOverlay 
            className={styles.relayCanvas} 
            videoElement={videoElementRef.current} /> 

            </>
          
          
        </div>
        <Button className={styles.capturePhoto} variant={"contained"} endIcon={<AddAPhoto />}>Capturar</Button>
      </Box>
      
      )
  
  
    
  
}

export default FaceRecognition;