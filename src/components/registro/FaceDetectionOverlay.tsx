import * as faceapi from "face-api.js";

import { FC, useEffect, useRef, useState } from "react";

import { clearInterval } from "timers";

interface FaceDetectionOverlayProps{
  videoElement: HTMLVideoElement | null;
  className:string;
  actualizar_foto:(fotoParam:string) => void;
  
}
const FaceDetectionOverlay:FC<FaceDetectionOverlayProps> = ({videoElement, className, actualizar_foto}) =>{
  const intervalId = useRef<any>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const copyCanvas = useRef<HTMLCanvasElement>(null);
  const foto = useRef<string | null>(null);
  
  console.log("VideoElement Props:", videoElement);
  const detectFaces = async () =>{
    try{
        // console.log('Video:', videoElement)
        if(videoElement){
          const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions());
          // console.log(singleFace);
          if(detectionResult){
            if(overlayRef.current){
              const canvas = overlayRef.current;
              const detectionForSize = faceapi.resizeResults(detectionResult, {width:videoElement.width, height:videoElement.height})
              canvas.width = videoElement.width;
              canvas.height = videoElement.height;
              const context = canvas.getContext('2d');
              if(context){
                context.clearRect(0,0,canvas.width, canvas.height);
                const box = detectionForSize.box;
                faceapi.draw.drawDetections(canvas, detectionForSize);
                
                  
              
                
                
              }
            }
          }
        }
      
      
    }catch(error){
      console.log(error);
    }
  }
  
  useEffect(
    () =>{
      if(videoElement){
        intervalId.current = setInterval(
          () =>{
            detectFaces();
          },1000
        )
      }
      return () =>{
        intervalId.current ? clearInterval(intervalId.current): null;
      }
    },[videoElement]
  )
  return(
    <>
    <canvas ref={overlayRef} className={className}></canvas>
    
    </>
  ) 
}

export default FaceDetectionOverlay;