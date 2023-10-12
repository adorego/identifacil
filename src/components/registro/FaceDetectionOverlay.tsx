import * as faceapi from "face-api.js";

import { FC, useEffect, useRef, useState } from "react";

import Image from "next/image";

interface FaceDetectionOverlayProps{
  videoElement: HTMLVideoElement | null;
  className:string;
  actualizar_foto:(fotoParam:Blob | null) => void;
  
}

interface IPhoto{
  blob_photo:Blob;
  b64_string:string;
}
const FaceDetectionOverlay:FC<FaceDetectionOverlayProps> = ({videoElement, className, actualizar_foto}) =>{
  const intervalId = useRef<any>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
 
  
  const detectFaces = async () =>{
    try{
        // console.log('Video:', videoElement)
        if(videoElement){
          const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions());
          // console.log(detectionResult);
          if(detectionResult){
            if(overlayRef.current){
              const canvas = overlayRef.current;
              const detectionForSize = faceapi.resizeResults(detectionResult, {width:videoElement.width, height:videoElement.height})
              canvas.width = videoElement.width;
              canvas.height = videoElement.height;
              console.log("canvas.width, canvas.height:", canvas.width, canvas.height);
              const context = canvas.getContext('2d');
              if(context){
                context.clearRect(0,0,canvas.width, canvas.height);
                const {box} = detectionForSize;
                console.log("Box:", box);
                faceapi.draw.drawDetections(canvas, detectionForSize);
                let region = new faceapi.Rect(box.x, box.y, box.width, box.height);
                let face = await faceapi.extractFaces(canvas, [region]);
                // console.log("Extracted faces:", face[0]);
                const landmarks = await faceapi.detectFaceLandmarksTiny(face[0]);
                
                let descriptor = await faceapi.computeFaceDescriptor(face[0]);
                console.log("Descriptor de la cara:", descriptor);
                face[0].toBlob((blob) =>{
                 actualizar_foto(blob);
                });
              
                
                
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
          },500
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