import * as faceapi from "face-api.js";

import { FC, useEffect, useRef, useState } from "react";

import Image from "next/image";

export interface IReconocimiento{
  foto:Blob;
  descriptor:Float32Array | Float32Array[]
}
interface FaceDetectionOverlayProps{
  videoElement: HTMLVideoElement | null;
  className:string;
  agregar_reconocimiento:({}:IReconocimiento) => void;
  
}

interface IPhoto{
  blob_photo:Blob;
  b64_string:string;
}
const FaceDetectionOverlay:FC<FaceDetectionOverlayProps> = ({videoElement, className, agregar_reconocimiento}) =>{
  const intervalId = useRef<any>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const fotoRef = useRef<HTMLCanvasElement>(null);
  const detecciones = useRef<number>(0);
  
  const detectFaces = async () =>{
    try{
        // console.log('Video:', videoElement)
        if(videoElement && detecciones.current < 3){
          const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions());
          // console.log(detectionResult);
          if(detectionResult){
            if(overlayRef.current){
              const canvas = overlayRef.current;
              const detectionForSize = faceapi.resizeResults(detectionResult, {width:videoElement.width, height:videoElement.height})
              canvas.width = videoElement.width;
              canvas.height = videoElement.height;
              // console.log("canvas.width, canvas.height:", canvas.width, canvas.height);
              const context = canvas.getContext('2d');
              if(context){
                context.clearRect(0,0,canvas.width, canvas.height);
                const {box} = detectionForSize;
                // console.log("Box:", box);
                faceapi.draw.drawDetections(canvas, detectionForSize);
                const fotoCanvas = faceapi.createCanvas(videoElement);
                const fotoContext = fotoCanvas.getContext('2d');
                if(fotoCanvas && fotoContext){
                  const _x = box.x;
                  const _y = box.y;
                  const _width = box.width;
                  const _height = box.height;
                  // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, _width+10, _height+20);
                  // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, canvas.width, canvas.height);
                  fotoContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                  const foto = fotoCanvas.toDataURL('image/jpg');
                  console.log("foto:", foto);
                  const descriptor = await faceapi.computeFaceDescriptor(fotoCanvas);
                  // console.log('descriptor:', descriptor);
                }
                // let region = new faceapi.Rect(box.x, box.y, box.width, box.height);
                // let face = await faceapi.extractFaces(canvas, [region]);
                // // console.log("Extracted faces:", face[0]);
                // const landmarks = await faceapi.detectFaceLandmarksTiny(face[0]);
                
                // let descriptor = await faceapi.computeFaceDescriptor(face[0]);
                // console.log("Descriptor de la cara:", descriptor);
               
                // face[0].toBlob((foto) =>{
                //   if(foto && descriptor){
                //     agregar_reconocimiento({foto:foto, descriptor:descriptor});
                //     detecciones.current++;
                //   }
                // });
              
                
                
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
    <canvas ref={overlayRef} className={className} ></canvas>
    {/* <canvas width={600} height={600} ref={fotoRef} ></canvas> */}
    </>
  ) 
}

export default FaceDetectionOverlay;