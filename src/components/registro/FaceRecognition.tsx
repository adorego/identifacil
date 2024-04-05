import * as faceapi from "face-api.js";

import {AddAPhoto, Height, Stream} from "@mui/icons-material";
import {Alert, Box, Button, Grid, Typography} from "@mui/material";
import {FC, Suspense, useEffect, useRef, useState} from "react";
import FaceDetectionOverlay, {IReconocimiento} from "./FaceDetectionOverlay";

// @ts-ignore
// import JSMpeg from "@cycjimmy/jsmpeg-player";
// mimport { error } from "console";
import log from "loglevel";
import styles from "./FaceRecognition.module.css";
import {useGlobalContext} from "@/app/Context/store";
import Loading from "../loading/loading";

interface ErrorInt {
    error: boolean;
    message: string;
}

export interface FaceRecognitionProps {
    agregar_reconocimiento: ({}: IReconocimiento) => void;
    notificacion: string;
    numero_de_capturas: number;
    etiqueta_boton: string;
    progreso: (progreso: number) => void;
}

interface IRegisterProgress {
    indicador: number;
    estado: string;
}

const progressInitialState: IRegisterProgress = {
    indicador: 0,
    estado: 'Iniciando'
}

const FaceRecognition: FC<FaceRecognitionProps> = (props: FaceRecognitionProps) => {
    const videoElementRef = useRef<HTMLVideoElement | null>(null);
    const [capturarFoto, setCapturarFoto] = useState<boolean>(false);
    const [iniciarDeteccion, setIniciarDeteccion] = useState<boolean>(false);
    const {openSnackbar} = useGlobalContext();
    const [loading,setLoading] = useState<boolean>(true);
    const [habilitarBotonCapturarFoto,setHabilitarBotonCapturarFoto] = useState<boolean>(false);
    const [modelosCargados,setModelosCargados] = useState<boolean>(false);

    

    const conectar_con_webcam = (): MediaStream | null => {
        let mediaStream = null;
        //console.log("Se va a conectar la webcam");
        try {
            // console.log("Navegador:", navigator, "mediaDevices:", navigator.mediaDevices);
            if (navigator && navigator.mediaDevices) {
                // console.log("Entro en mediaDevice")
                navigator.mediaDevices.getUserMedia({video: true})
                    .then(function (stream) {
                        // console.log("Video ref:",videoElementRef.current);
                        if (videoElementRef.current != null) {
                            // console.log("Video es distinto de null");
                            videoElementRef.current.srcObject = stream;
                            mediaStream = stream;
                            setIniciarDeteccion(true);
                            return mediaStream;
                        }
                    })

            } else {
                log.error("Error al levantar el video en el browser");
                openSnackbar("Error al levantar el video en el browser", "error");

            }
        } catch (error) {
            log.error("Error al levantar el video en el browser");
            openSnackbar("Error al levantar el video en el browser", "error");
        }
        return mediaStream;

    }

    useEffect(
        () => {
            let stream: MediaStream | null = null;
            if(modelosCargados){
                stream = conectar_con_webcam();
                setLoading(false);
                return (
                    () => {
                        let tracks = stream?.getTracks();
                        tracks?.forEach(
                            (track) => {
                                if (track.kind === 'video') {
                                    track.stop();
                                }
                            })
    
                    }
                )

            }
            
            
        }, [modelosCargados]
    )

    

    useEffect(
        () => {

            const cargar_modelos = async () =>{

                const resultado =  await Promise.all(
                    [
                        // faceapi.loadSsdMobilenetv1Model('/models'),
                        faceapi.loadTinyFaceDetectorModel('/models'),
                        faceapi.loadFaceLandmarkModel('/models'),
                        faceapi.loadFaceLandmarkTinyModel('/models'),
                        // faceapi.loadFaceDetectionModel('/models'),
                        faceapi.loadFaceRecognitionModel('/models')
                    ]
                )
                setModelosCargados(true);
            }

            cargar_modelos();
            
            



            
        }, []
    )

    const habilitarBotonDeCapturaDeFoto = (valor:boolean)=>{
        setHabilitarBotonCapturarFoto(valor);
    }
    const onFotoCapture = () => {
        setCapturarFoto(true);
    }

    const reset_capturar_foto = () => {
        setCapturarFoto(false);
    }

    if(loading){
        return(
            <Loading></Loading>
        )
    }
    if(!loading){

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{
                    // border:"2px solid blue",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: 'relative',
                }}>
                    <Box className='faceReconContainer' sx={{
                        position: "relative",
                        top: "0",
                        zIndex: '10'
                    }}>
                        <Alert severity="info">
                            Por favor situe a la persona frente a la camara y presione el botón Capturar para el registro
                        </Alert>
                    </Box>

                        <div className={styles.video_container}>
                            <video className={styles.video}
                                width={600}
                                height={600}
                                ref={videoElementRef}
                                id="videoElement" autoPlay></video>

                            <FaceDetectionOverlay
                                className={styles.relayCanvas}
                                iniciar_deteccion={iniciarDeteccion}
                                videoElement={videoElementRef.current}
                                capturar_foto={capturarFoto}
                                progreso={props.progreso}
                                reset_capturar_foto={reset_capturar_foto}
                                numero_de_capturas={props.numero_de_capturas}
                                habilitarBotonDeCapturaDeFoto={habilitarBotonDeCapturaDeFoto}
                                agregar_reconocimiento={props.agregar_reconocimiento}/>
                            {/* {capturarFoto ? 
                            <LinearProgressionWithLabel indicador={progress.indicador} estado={progress.estado} />
                            : null } */}
                            <Typography variant="body1" className={styles.notificacion}>
                                {props.notificacion}
                            </Typography>
                            <Button
                                disabled={!habilitarBotonCapturarFoto}
                                onClick={onFotoCapture}
                                className={styles.capturePhotoButton}
                                variant='contained'
                                    endIcon={<AddAPhoto/>}>
                                {props.etiqueta_boton}
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        )
    }


}

export default FaceRecognition;