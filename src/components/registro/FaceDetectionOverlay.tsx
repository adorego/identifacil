import * as faceapi from "face-api.js";

import {FC, useEffect, useRef, useState} from "react";

const TIEMPO_ENTRE_FOTOS:number=100;
const INTERVALO_DE_DETECCION:number=100; //milisegundos entre detección de rostros
const PARPADEO_THRESHOLD:number=0.25

export interface IReconocimiento {
    foto: File;
    descriptor: Float32Array | Float32Array[]
}

interface FaceDetectionOverlayProps {
    videoElement: HTMLVideoElement | null;
    className: string;
    iniciar_deteccion: boolean;
    enviar_reconocimiento: (reconocimiento: IReconocimiento) => void;
    capturar_foto: boolean;
    progreso: (progreso: number) => void;
    reset_capturar_foto: () => void;
    numero_de_capturas: number;
    habilitarBotonDeCapturaDeFoto:(valor:boolean)=>void;

}

interface IDetection {
    box: faceapi.Box;
    canvas: HTMLCanvasElement;

}

interface Point{
    x:number;
    y:number;

}

const FaceDetectionOverlay: FC<FaceDetectionOverlayProps> =
    ({
         videoElement,
         className,
         iniciar_deteccion,
         enviar_reconocimiento,
         capturar_foto,
         reset_capturar_foto,
         progreso,
         numero_de_capturas,
         habilitarBotonDeCapturaDeFoto
     }) => {
        const intervalId = useRef<any>(null);
        const overlayRef = useRef<HTMLCanvasElement>(null);
        const currentDetectionRef = useRef<IDetection>();
        const blinkingDetected = useRef<boolean>(false);


        //console.log('Parametro de agregar_reconocimiento es:', agregar_reconocimiento);
        useEffect(
            () => {
                if (videoElement) {
                    intervalId.current = setInterval(
                        () => {
                            detectFaces();
                        }, INTERVALO_DE_DETECCION
                    )
                }
                return () => {
                    intervalId.current ? clearInterval(intervalId.current) : null;
                }
            }, [iniciar_deteccion]
        )

        useEffect(
            () => {
                if (capturar_foto && currentDetectionRef.current) {
                    progreso(1);
                    capturar_rostro_y_enviar(currentDetectionRef.current.box, currentDetectionRef.current.canvas, `foto1.jpg`)
                    for(let i=1;i<numero_de_capturas;i++){
                        setTimeout(capturar_rostro_y_enviar, i*TIEMPO_ENTRE_FOTOS, currentDetectionRef.current.box, currentDetectionRef.current.canvas, `foto${i+1}.jpg`);
                    }
                    reset_capturar_foto();
                    
                }
            }, [capturar_foto]
        )

        

        const detectFaces = async () => {
            try {
                if (videoElement) {
                    const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                    if (detectionResult && detectionResult.detection.score > 0.8) {
                        if (overlayRef.current) {
                            const canvas = overlayRef.current;
                            const detectionForSize = faceapi.resizeResults(detectionResult, {
                                width: videoElement.width,
                                height: videoElement.height
                            })
                            canvas.width = videoElement.width;
                            canvas.height = videoElement.height;
                            const context = canvas.getContext('2d');
                            if (context) {
                                context.clearRect(0, 0, canvas.width, canvas.height);
                                const {box} = detectionForSize.detection;
                                faceapi.draw.drawDetections(canvas, detectionForSize);
                                faceapi.draw.drawFaceLandmarks(canvas,detectionForSize);
                                const earLeft = calculateEAR(detectionResult.landmarks.getLeftEye());
                                const earRight = calculateEAR(detectionResult.landmarks.getRightEye());
                                const ear = (earLeft + earRight) / 2.0;
                                if(ear < PARPADEO_THRESHOLD){
                                    blinkingDetected.current = true;
                                    console.log("Parpadeo detectado");
                                }

                                currentDetectionRef.current = {
                                        box: box,
                                        canvas: canvas
                                    }
                                habilitarBotonDeCapturaDeFoto(blinkingDetected.current);
                                
                                


                            }
                        }
                    }else{
                        habilitarBotonDeCapturaDeFoto(false);
                        if (overlayRef.current) {
                            const canvas = overlayRef.current;
                            canvas.width = videoElement.width;
                            canvas.height = videoElement.height;
                            const context = canvas.getContext('2d');
                            if (context) {
                                context.clearRect(0, 0, canvas.width, canvas.height);
                            }
                            blinkingDetected.current = false;
                        }
                    }
                }


            } catch (error) {
                console.log(error);
            }
        }
        function calculateEAR(eye:Array<Point>):number {
            const p2p6 = distance(eye[1], eye[5]);
            const p3p5 = distance(eye[2], eye[4]);
            const p1p4 = distance(eye[0], eye[3]);
            
            return (p2p6 + p3p5) / (2.0 * p1p4);
          }
      
        function distance(point1:Point, point2:Point):number {
            const dx = point1.x - point2.x;
            const dy = point1.y - point2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    

        const capturar_rostro_y_enviar = async (box: faceapi.Box, canvas: HTMLCanvasElement, nombreArchivo: string) => {
            //console.log('Entro en capturar_rostro_y_enviar');
            if (videoElement) {
                const detectionResult = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                const fotoCanvas = faceapi.createCanvas(videoElement);
                const fotoContext = fotoCanvas.getContext('2d');
                if (fotoCanvas && fotoContext && detectionResult) {
                    
                    const _x = box.x;
                    const _y = box.y;
                    const _width = box.width;
                    const _height = box.height;
                    // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, _width+10, _height+20);
                    // fotoContext.drawImage(videoElement, _x+20, _y-120, _width, _height+20, 0, 0, canvas.width, canvas.height);
                    fotoContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                    
                    fotoCanvas.toBlob(
                        async (foto) => {
                            if (foto) {
                                const file = new File([foto], nombreArchivo);
                                const descriptor = detectionResult.descriptor;
                                const resultado =  enviar_reconocimiento({foto: file, descriptor: descriptor})
                                blinkingDetected.current = false;
                            }
                        }
                    )

                }
            }
        }


        return (
            <>
                <canvas ref={overlayRef} className={className}></canvas>
                {/* <canvas width={600} height={600} ref={fotoRef} ></canvas> */}
            </>
        )
    }

export default FaceDetectionOverlay;