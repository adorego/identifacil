import * as faceapi from "face-api.js";

import {FC, useEffect, useRef, useState} from "react";


const TIEMPO_ENTRE_FOTOS:number=100;
const INTERVALO_DE_DETECCION:number=100; //milisegundos entre detección de rostros
const PARPADEO_THRESHOLD:number=0.255;
const CAPTURAS_DE_PARPADEOS:number = 3;

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
    manejador_de_estado:(estado:number)=>void;

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
         habilitarBotonDeCapturaDeFoto,
         manejador_de_estado
     }) => {
        const intervalId = useRef<any>(null);
        const overlayRef = useRef<HTMLCanvasElement>(null);
        const currentDetectionRef = useRef<IDetection>();
        const nosePointRef = useRef<Array<Point> | null>(null);
        const detectMove = useRef<boolean>(false);
        const enablePictureTakeRef = useRef<boolean>(false);


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

        const reiniciar_estado_reconocimiento = ()=>{
            habilitarBotonDeCapturaDeFoto(false);
            manejador_de_estado(0);
            enablePictureTakeRef.current = false;
           
            

        }

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
                                if(enablePictureTakeRef.current){
                                    habilitarBotonDeCapturaDeFoto(true);
                                }
                                if(!detectMove.current){
                                    nosePointRef.current = detectionResult.landmarks.getNose();
                                    detectMove.current = true;
                                }else if(nosePointRef.current){
                                    const faceMoved = detectHeadMovement(nosePointRef.current,detectionResult.landmarks.getNose());
                                    if(faceMoved){
                                        //console.log("Reconoció un giro de rostro");
                                        manejador_de_estado(1);
                                        habilitarBotonDeCapturaDeFoto(true);
                                        enablePictureTakeRef.current = true;
                                        setTimeout(reiniciar_estado_reconocimiento,20000);
                                    }
                                    detectMove.current = false;
                                }else{
                                    detectMove.current = false;
                                }
                                
                                
                                    
                                    
                                
                                

                                currentDetectionRef.current = {
                                        box: box,
                                        canvas: canvas
                                    }
                               
                                
                                


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
                           
                        }
                    }
                }


            } catch (error) {
                habilitarBotonDeCapturaDeFoto(false);
                //console.log(error);
            }
        }

        const detectHeadMovement = (previusNosePoint:Array<Point>, currentNosePoint:Array<Point>) => {
            // Por ejemplo, podrías comparar la posición de la nariz en dos marcos consecutivos
            
        
            // Define un umbral de movimiento mínimo
            const movementThreshold = 30;  
        
            const dist = distance(previusNosePoint[0], currentNosePoint[0]);  // Distancia entre la posición de la nariz
            //console.log("Distancia:", dist);
            return dist > movementThreshold;
        };

        
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