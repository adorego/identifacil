'use client'

import { Button, Grid, IconButton, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import Webcam from "react-webcam";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";
import {CameraAlt} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";


const videoConstraints = {
    aspectRatio: 1,
};

type TipoGaleria = Array<TipoFoto>
type TipoFoto = { nombre: string; foto: string; actualizado?: boolean }

const fotoInitial = {foto: '', nombre: '', actualizado: false}
const galeriaInitial = [fotoInitial]


const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API
const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : '';

export default function BloqueGaleria({id_persona, datosIniciales, handleAccordion,onSetDatosPPL}: { id_persona: number | null; datosIniciales: TipoGaleria; handleAccordion?:(s: string)=>void;    onSetDatosPPL?: Dispatch<SetStateAction<any>>; }){


    /** 1.Estado para pantalla de carga */
    const [loading, setLoading] = useState(true);

    /** 2. Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)


    /** 3. Galeria */
    const [stateGaleria, setStateGaleria] = useState<TipoGaleria>([])

    /** 4. Para bloquear boton de guardado */
    const [saveButtonState, setSaveButtonState] = useState(false)

    const [open, setOpen] = React.useState(false);

    const [img, setImg] = useState<string | null>(null);

    const router = useRouter();
    const {openSnackbar} = useGlobalContext();
    const isEditMode = datosIniciales.length > 0 //params.id !== 'crear';


    useEffect(() => {

        if (datosIniciales.length > 0) {
            setStateGaleria(() => {


                return datosIniciales.map(item => {

                    const cleanedUrl = item.foto.startsWith(ASSETS_URL) ? item.foto.slice(ASSETS_URL.length) : item.foto;

                    if(item.foto.startsWith(ASSETS_URL)){
                        return{
                            nombre: item.nombre,
                            foto: ASSETS_URL + cleanedUrl
                        }
                    }else if(item.foto.startsWith('data:image/jpeg;base64')){
                        return{
                            nombre: item.nombre,
                            foto: item.foto
                        }
                    }else{
                        return{
                            nombre: item.nombre,
                            foto: ASSETS_URL + item.foto
                        }
                    }



                })
            })

        }


    }, [datosIniciales]);


    useEffect(() => {
        stateGaleria.forEach(item => {
            if (item.actualizado) {
                setSaveButtonState(true)
            }
        })
    }, [stateGaleria]);

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            // @ts-ignore
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc)
        },
        [webcamRef]
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        /*console.log(stateGaleria.length)
        console.log(stateGaleria.push(fotoInitial))
        console.log(stateGaleria.length)*/
        if (img) {

            setStateGaleria((prev: TipoGaleria) => ([
                ...prev,
                {
                    nombre: `nombre_foto${stateGaleria.length + 1}`,
                    foto: img,
                    actualizado: true
                }
            ]))
        }
        setOpen(false);
        setImg(null)
    };


    const handleFotografia = () => {
        /*setFormActualizado(prev=>({
            ...prev,
            [tipo]:true,
        }))
        setTipo(tipo)*/
        handleClickOpen()
    }

    const handleCleanImg = (indexToRemove: number) => {
        setStateGaleria(prev => prev.filter((item, index) => index !== indexToRemove))
        setSaveButtonState(true)
    }

    const handleSubmit = () => {
        postData()

    }

    const postData = async () => {
        setConsultaLoading(true)
        const formData = new FormData();
        const contentType = 'image/jpeg'; // You should set the correct MIME type

        formData.append("id_persona", id_persona ? id_persona.toString() : '');


        // se recorre el estado y si es POST entonces arma toda formdata para enviar teniendo en cuenta que todas las bas64
        stateGaleria.forEach((key, index) => {
            if (key.actualizado && !isEditMode) {
                formData.append(`nombre_foto${index + 1}`, `${key.nombre}`);
                formData.append(`foto${index + 1}`, base64ToBlob(key.foto, contentType, `${id_persona}_${key.nombre}.jpg`), `${id_persona}_${key.nombre}.jpg`);
            }


        })

        // SI es PUT entonces algunas imagenes podrian ser FILE/URL Entonces hay que bajar y volver a subir


        if (isEditMode) {
            let counter = 0
            for (const fileData of stateGaleria) {
                counter++
                if (fileData.foto.startsWith('http') || fileData.foto.startsWith('/archivo')) {
                    // console.log(`El elemento ${fileData.nombre} es una URL - ${counter}`);

                    const fileBlob = await downloadFile(fileData.foto);
                    formData.append(`nombre_foto${counter}`, `nombre_foto${counter}`);
                    formData.append(`foto${counter}`, blobToFile(fileBlob, fileData.nombre), `${id_persona}_${fileData.nombre}.jpg`);
                } else if (fileData.foto.startsWith('data:image')) {
                    // console.log(`El elemento ${fileData.nombre} es un string base64 - ${counter}`);
                    formData.append(`nombre_foto${counter}`, `nombre_foto${counter}`);
                    formData.append(`foto${counter}`, base64ToBlob(fileData.foto, contentType, `${id_persona}_${fileData.nombre}.jpg`), `${id_persona}_${fileData.nombre}.jpg`);


                } else {
                    console.log(`El formato del elemento ${counter} no se reconoce.`);
                }


            }
        }


        try {
            setLoading(true);


            const method = isEditMode ? 'PUT' : 'POST';

            console.log('metodo: ' + method)


            const url = isEditMode
                ? `${API_URL}/registro_fotos`
                : `${API_URL}/registro_fotos`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            setLoading(false);
            console.log('Control de request de envio')
            console.log(stateGaleria)
            if (response.ok) {
                if(onSetDatosPPL){
                    onSetDatosPPL((prev:any)=>({
                        ...prev,
                        registro_de_fotos: stateGaleria,

                    }))
                }

                // @ts-ignore
                setConsultaLoading(false)
                const message = isEditMode ?
                    'Fotos actualizada correctamente.'
                    : 'Fotos agregadas correctamente.';
                openSnackbar(message, 'success');
                // router.push(`/ppl`);
                if(handleAccordion){
                    handleAccordion('')
                }
            } else {
                setConsultaLoading(false)
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setConsultaLoading(false)
            setLoading(false);
            console.error('Error:', error);
        }
    }

    return (
        <>

            <Typography variant='h6'>
                Galeria de fotos
            </Typography>
            <Grid container spacing={2} mt={1}>

                {
                    stateGaleria.length > 0 ?
                        (
                            stateGaleria.map((item: TipoFoto, index: number) => (
                                <Grid key={index} item sm={6} md={3}>
                                    <div style={{position: 'relative'}}>

                                        <IconButton aria-label="delete"
                                                    onClick={() => handleCleanImg(index)} sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-20px",
                                        }}>
                                            <CancelIcon/>
                                        </IconButton>

                                        <ImgComponent urlImg={`${item.foto}`}/>
                                        {/*<Box mt={1}>

                                            <TextField
                                                label='Nombre de la fotografia'
                                                value={item.nombre}
                                            />
                                        </Box>*/}
                                    </div>
                                </Grid>
                            ))


                        )
                        : ''
                }

                {
                    stateGaleria.length <= 4 ?
                        <Grid item sm={6} md={3}>
                            <button className='CapturadorFoto' onClick={() => handleFotografia()}>
                                Agregar fotografia
                            </button>
                        </Grid>
                        : null
                }


            </Grid>
            <Grid container spacing={2} mt={1}>

                <Grid item sm={6} md={3}>
                    <LoadingButton
                        sx={{
                            minHeight: "100%",
                            px: "48px",
                            height: '48px'
                        }}
                        onClick={handleSubmit}
                        loading={consultaLoading}
                        disabled={!saveButtonState}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                    </LoadingButton>
                    {/*<Button
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={!saveButtonState}
                    >
                        Guardar
                    </Button>*/}
                </Grid>
            </Grid>

            {/* Componente */}
            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>
                        {"Quitar fotografia"}
                    </DialogTitle>
                    <DialogContent>

                        {img === null ? (
                            <>
                                <div className='imgCam'>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                    />
                                </div>

                                <div style={{
                                    textAlign: 'center',
                                    top: '-60px',
                                    position: 'relative',
                                }}>
                                    <Button variant='contained' onClick={capture} startIcon={<CameraAlt/>}>
                                        Tomar fotografia
                                    </Button>
                                </div>

                            </>
                        ) : (
                            <>
                                <div>
                                    <div>
                                        <img src={img} alt="screenshot"/>
                                    </div>
                                    <div style={{
                                        textAlign: 'center',
                                        top: '-60px',
                                        position: 'relative',
                                    }}>
                                        <Button variant='contained' onClick={() => setImg(null)}>Volver a tomar
                                            foto</Button>
                                    </div>
                                </div>

                            </>
                        )}
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'center'}}>
                        <Button variant='outlined' onClick={handleClose}>Guardar foto</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}


function ImgComponent({urlImg}: { urlImg: string }) {

    return (
        <>
            <img src={urlImg} style={{
                objectFit: 'cover',
                width: '100%',
                borderRadius: '10px',
                maxHeight: '90%'
            }}
            />
        </>

    )

}

/** Convierte de Base 64 a Blob y luego a FILE
 * */
function base64ToBlob(base64: string, contentType: string, name: string) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const newBlobFile = new Blob(byteArrays, {type: contentType});

    return new File([newBlobFile], name, {type: newBlobFile.type,});
}

/** Convierte un BLOG a un archivo
 * */
function blobToFile(newBlobFile: Blob, name: string) {
    return new File([newBlobFile], name, {type: newBlobFile.type,});
}

/** Baja de una url una imagen y convierte en BLOB
 * */
async function downloadFile(url: string) {
    const response = await fetch(url);
    return response.blob(); // Obtiene el contenido del archivo como Blob
}