'use client'

import {IdentificationResponse, initialResponse} from "@/model/respuesta-identificacion";

import {Box} from "@mui/material";
import CircularProgressionWithLabel from "@/common/CircularProgressionWithLabel";
import FaceRecognition from "@/components/registro/FaceRecognition";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import IdentificationData from "@/components/registro/IdentificationData";
import log from "loglevel";
import {useState} from "react";

const EstadosProgreso: Array<string> = ['No iniciado', 'Obteniendo los datos del rostro', 'Consultando a la Base de Datos', 'Datos disponibles', 'El usuario debe estar registrado'];
export default function Identificacion() {
    const [progresoReconocimiento, setProgresoReconocmiento] = useState(EstadosProgreso[0]);
    const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
    const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse)

    const agregar_reconocimiento = async (reconocimiento: IReconocimiento) => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/identificacion/`;
        console.log('url:', url);
        const dataToSend = {
            descriptorFacial: reconocimiento.descriptor
        }
        // console.log("Data to send:", dataToSend);
        setProgresoReconocmiento(EstadosProgreso[2]);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }

        });


        if (!response.ok) {
            const data = await response.json();
            setProgresoReconocmiento(EstadosProgreso[0]);
            log.error('Ocurrio un error:', data)
            // console.log('Ocurrio un error:', data);
        } else {
            const data: IdentificationResponse = await response.json();
            console.log("Respuesta:", data);
            setProgresoReconocmiento(EstadosProgreso[3]);
            setIdentificationData({
                identificado:data.identificado,
                numeroDeIdentificacion: data.numeroDeIdentificacion,
                nombres: data.nombres,
                apellidos: data.apellidos,
                esPPL: data.esPPL
            })
            // openSnackbar(`Persona Reconocida, nombre:${data.nombres}, apellido:${data.apellidos}, esPPL:${esPPL}`);
        }
    }

    const actualizar_progreso = (progreso: number) => {
        setProgresoReconocmiento(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () => {
        setProgresoReconocmiento(EstadosProgreso[0]);
    }

    return (
        <Box sx={{
            position: 'relative',
            // border:"2px solid #f00",
            width: "100%",
            height: "100vh"


        }}
             mt={4}>
            <Box
                sx={{
                    position: 'absolute',
                    display: `${!showSpinner ? 'none' : 'null'}`,
                    backgroundColor: 'hsla(0,0%,100%,1)',
                    visibility: '',
                    width: "500px",
                    height: "400px",
                    paddingTop: "0px",
                    top: '200px',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    zIndex: 10
                }}
            >
                {progresoReconocimiento === EstadosProgreso[3] ?
                    <IdentificationData
                        nombres={identificationData.nombres}
                        apellidos={identificationData.apellidos}
                        esPPL={identificationData.esPPL}
                        cerrarDialogo={cerrar_dialogo}/> :
                    <CircularProgressionWithLabel
                        indicador={0}
                        estado={progresoReconocimiento}/>}

            </Box>
            <FaceRecognition
                agregar_reconocimiento={agregar_reconocimiento}
                notificacion=""
                numero_de_capturas={1}
                progreso={actualizar_progreso}
                etiqueta_boton="Identificar"/>
        </Box>

    )
}