import * as faceapi from "face-api.js";

import { FC, useEffect, useRef } from "react";

import { clearInterval } from "timers";

interface FaceDetectionOverlayProps{
  videoElement: HTMLVideoElement | null;
  className:string;
}
const FaceDetectionOverlay:FC<FaceDetectionOverlayProps> = ({videoElement, className}) =>{
  const overlayRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(
    () =>{
      if(videoElement && overlayRef.current){
        const displaySize = {width:videoElement.width, height:videoElement.height};
        faceapi.matchDimensions(overlayRef.current, displaySize);

        const intervalId = setInterval(async () =>{
          const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions());
          console.log(detections);
          const resizedDetections = faceapi.resizeResults(detections,displaySize);
          const canvas = overlayRef.current;
          if(canvas){
            const context = canvas.getContext('2d');
            if(context){
              context.clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
            }
          }
        },300);
        return () => clearInterval(intervalId);

      }
    },[videoElement]
  )
  return <canvas ref={overlayRef} className={className}></canvas>
}

export default FaceDetectionOverlay;