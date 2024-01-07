import * as faceapi from "face-api.js";

import { FC, useEffect, useRef, useState } from "react";

export interface IReconocimiento{
  foto:File;
  descriptor:Float32Array | Float32Array[]
}
interface FaceDetectionOverlayProps{
  videoElement: HTMLVideoElement | null;
  className:string;
  iniciar_deteccion:boolean;
  agregar_reconocimiento:({}:IReconocimiento) => void;
  capturar_foto:boolean;
  progreso:(progreso:number) => void;
  reset_capturar_foto:() => void;
  numero_de_capturas:number;
  
}

interface IDetection{
  box:faceapi.Box;
  canvas:HTMLCanvasElement;
  
}
const FaceDetectionOverlay:FC<FaceDetectionOverlayProps> = 
({
  videoElement, 
  className, 
  iniciar_deteccion,
  agregar_reconocimiento, 
  capturar_foto, 
  reset_capturar_foto,
  progreso,
  numero_de_capturas
}) =>{
  const intervalId = useRef<any>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const currentDetectionRef = useRef<IDetection>();
  

  // console.log('Capturar foto:', capturar_foto);
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
    },[iniciar_deteccion]
  )

  useEffect(
    () =>{
      if(capturar_foto && currentDetectionRef.current){
        progreso(1);
        if(numero_de_capturas === 3){
          capturar_rostro_y_enviar(currentDetectionRef.current.box, currentDetectionRef.current.canvas,"foto1");
          setTimeout(capturar_rostro_y_enviar, 200, currentDetectionRef.current.box, currentDetectionRef.current.canvas, "foto2");
          setTimeout(capturar_rostro_y_enviar,400, currentDetectionRef.current.box, currentDetectionRef.current.canvas, "foto3");
          reset_capturar_foto();
        }else{
          capturar_rostro_y_enviar(currentDetectionRef.current.box, currentDetectionRef.current.canvas,"foto1");
          reset_capturar_foto();
        }
      }
    },[capturar_foto]
  )
  
  
  const detectFaces = async () =>{
    try{
        if(videoElement){
          const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
          if(detectionResult){
            if(overlayRef.current){
              const canvas = overlayRef.current;
              const detectionForSize = faceapi.resizeResults(detectionResult, {width:videoElement.width, height:videoElement.height})
              canvas.width = videoElement.width;
              canvas.height = videoElement.height;
              const context = canvas.getContext('2d');
              if(context){
                context.clearRect(0,0,canvas.width, canvas.height);
                const {box} = detectionForSize.detection;
                faceapi.draw.drawDetections(canvas, detectionForSize);
                currentDetectionRef.current = {
                  box:box,
                  canvas:canvas
                }
                // if(capturar_foto){
                //    console.log("Se va a registrar el rostro");
                //   capturar_rostro_y_enviar(box, canvas,"foto1");
                //   setTimeout(capturar_rostro_y_enviar, 200, box, canvas, "foto2");
                //   setTimeout(capturar_rostro_y_enviar,400, box, canvas, "foto3");
                //   reset_capturar_foto();
                    
                // }
                
               
              
                
                
              }
            }
          }
        }
      
      
    }catch(error){
      console.log(error);
    }
  }
  
  const capturar_rostro_y_enviar = async (box:faceapi.Box, canvas:HTMLCanvasElement, nombreArchivo:string) =>{
    if(videoElement){
      const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
      const fotoCanvas = faceapi.createCanvas(videoElement);
      const fotoContext = fotoCanvas.getContext('2d');
      if(fotoCanvas && fotoContext && detectionResult){
        const _x = box.x;
        const _y = box.y;
        const _width = box.width;
        const _height = box.height;
        // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, _width+10, _height+20);
        // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, canvas.width, canvas.height);
        fotoContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        fotoCanvas.toBlob(
          async (foto) =>{
              if(foto){
                const file = new File([foto],nombreArchivo);
                const descriptor = detectionResult.descriptor;
                console.log("descriptor:", descriptor);
                agregar_reconocimiento({foto:file, descriptor:descriptor})
              } 
          }
        )
        
      }
    }
  }
  
  

  
  return(
    <>
    <canvas ref={overlayRef} className={className} ></canvas>
    {/* <canvas width={600} height={600} ref={fotoRef} ></canvas> */}
    </>
  ) 
}

export default FaceDetectionOverlay;