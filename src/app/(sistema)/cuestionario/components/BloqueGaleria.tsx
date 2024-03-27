'use client'

import {Box, Button, DialogContentText, Grid, IconButton, Typography} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import Webcam from "react-webcam";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";

const videoConstraints = {
    aspectRatio: 1,
};

interface TipoGaleria {
    izquierdo: string;
    derecho: string;
    tatuaje1: string;
    tatuaje2: string;
}

interface TipoGaleriaActuazalizado {
    izquierdo: boolean;
    derecho: boolean;
    tatuaje1: boolean;
    tatuaje2: boolean;
}
const galeriaInitial = {
    izquierdo: '',
    derecho: '',
    tatuaje1: '',
    tatuaje2: '',
}

const galeriaActualizadaInitial = {
    izquierdo: false,
    derecho: false,
    tatuaje1: false,
    tatuaje2: false,
}

const API_URL = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API
const ASSETS_URL = process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER ? process.env.NEXT_PUBLIC_URL_ASSESTS_SERVER : null;

export default function BloqueGaleria({id_persona, datosIniciales}:{id_persona:number|null; datosIniciales: Array<{nombre:string; foto: string}>}){
    const [loading, setLoading] = useState(true);
    const { openSnackbar } = useGlobalContext();
    const router = useRouter();
    const isEditMode = datosIniciales.length > 0 //params.id !== 'crear';

    const [stateGaleria, setStateGaleria] = useState<TipoGaleria>(galeriaInitial)
    const [formActualizado, setFormActualizado] = useState<TipoGaleriaActuazalizado>(galeriaActualizadaInitial)

    const [open, setOpen] = React.useState(false);
    const [img, setImg] = useState<string|null>(null);
    const [tipo, setTipo] = useState<string|null>(null);



    console.log(datosIniciales)


    useEffect(() => {
        if(datosIniciales.length > 0){
            setStateGaleria(prev=>({
                ...prev,
                //@ts-ignore
                derecho: datosIniciales.find(item=>item.nombre == 'derecho') ? `${ASSETS_URL}${datosIniciales.find((item:{nombre:string})=>item.nombre=='derecho').foto}` : '',
                //@ts-ignore
                izquierdo: datosIniciales.find(item=>item.nombre == 'izquierdo') ? `${ASSETS_URL}${datosIniciales.find((item:{nombre:string})=>item.nombre=='izquierdo').foto}` : '',
                //@ts-ignore
                tatuaje1: datosIniciales.find(item=>item.nombre == 'tatuaje1') ? `${ASSETS_URL}${datosIniciales.find((item:{nombre:string})=>item.nombre=='tatuaje1').foto}` : '',
                //@ts-ignore
                tatuaje2: datosIniciales.find(item=>item.nombre == 'tatuaje2') ? `${ASSETS_URL}${datosIniciales.find((item:{nombre:string})=>item.nombre=='tatuaje2').foto}` : '',
            }))
        }
    }, [datosIniciales]);





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
        if(img){

            setStateGaleria(prev=>({
                ...prev,
                // @ts-ignore
                [tipo]: img,
            }))
        }
        setOpen(false);
        setImg(null)
        setTipo(null)
    };


    const handleFotografia = (tipo:string) =>{
        setFormActualizado(prev=>({
            ...prev,
            [tipo]:true,
        }))
        setTipo(tipo)
        handleClickOpen()
    }

    const handleCleanImg = (tipo:string) =>{
        setStateGaleria(prev=>({
            ...prev,
            [tipo]: '',
        }))
    }

    const handleSubmit = () =>{

        postData()

    }

    const postData = async ()=>{
        const formData = new FormData();
        const contentType = 'image/jpeg'; // You should set the correct MIME type


        formData.append("id_persona", id_persona? id_persona.toString() : '');

        const dicDatos= {
            derecho: 1,
            izquierdo: 2,
            tatuaje1: 3,
            tatuaje2: 4,
        }

        console.log(formActualizado)


        /*Object.keys(formActualizado).forEach((key, index)=>{
            // console.log(formActualizado[key])
            if(formActualizado[key]){

                const posicion = dicDatos[`${key}`] // ej: nombre_foto1
                /!*console.log(posicion)
                console.log(stateGaleria)
                console.log()
                console.log(`${key}`)
                console.log(`foto${index+1}`)
                console.log(stateGaleria[`${key}`])
                console.log(`${id_persona}_${key}.jpg`)*!/

                formData.append(`nombre_foto${posicion}`, `${key}`);
                // formData.append(`foto${index+1}`, base64ToBlob(stateGaleria[`${key}`], contentType, `${id_persona}_${key}.jpg`), `${id_persona}_${key}.jpg`);
                formData.append(`foto${posicion}`, base64ToBlob(stateGaleria.derecho, contentType, `${id_persona}_derecho.jpg`), `${id_persona}_derecho.jpg`)

            }

        })*/



        if(formActualizado.izquierdo){
            formData.append("nombre_foto1", "izquierdo");
            formData.append("foto1", base64ToBlob(stateGaleria.izquierdo, contentType, `${id_persona}_izquierdo.jpg`), `${id_persona}_izquierdo.jpg`);
        }

        if(formActualizado.derecho){
            formData.append("nombre_foto1", "derecho");
            formData.append("foto1", base64ToBlob(stateGaleria.derecho, contentType, `${id_persona}_derecho.jpg`), `${id_persona}_derecho.jpg`)
        }

        if(formActualizado.tatuaje1){
            formData.append("nombre_foto3", "tatuaje1");
            formData.append("foto3", base64ToBlob(stateGaleria.tatuaje1, contentType, `${id_persona}_tatuaje1.jpg`), `${id_persona}_tatuaje1.jpg`);
        }

        if(formActualizado.tatuaje2){
            formData.append("nombre_foto5", "tatuaje2");
            formData.append("foto5", base64ToBlob(stateGaleria.tatuaje2, contentType, `${id_persona}_tatuaje2.jpg`), `${id_persona}_tatuaje2.jpg`);
        }



        try {
            setLoading(true);

            const method = isEditMode ? 'PUT':'POST';

            console.log('metodo: ' + isEditMode)

            // @ts-ignore
            const url = isEditMode
                ? `${API_URL}/registro_fotos`
                : `${API_URL}/registro_fotos`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            setLoading(false);
            if (response.ok) {
                // @ts-ignore
                const message = isEditMode ?
                    'Fotos actualizada correctamente.'
                    : 'Fotos agregadas correctamente.';
                openSnackbar(message, 'success');
                /*router.push('/ppl');*/
            } else {
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    }

    return(
        <>
            {/*{console.log(typeof stateGaleria.izqueirdo)}*/}
            <Typography variant='h6'>
                Registro Fotografrico
            </Typography>
            <Grid container spacing={2} mt={1}>

                <Grid item sm={6} md={3}>

                    <Box >
                        {
                            stateGaleria.izquierdo ?
                                (
                                    <div style={{position:'relative'}}>
                                        <h6>Lado Izquierdo</h6>
                                        <IconButton aria-label="delete" onClick={()=>handleCleanImg('izquierdo')} sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-20px",
                                        }}>
                                            <CancelIcon />
                                        </IconButton>
                                        <ImgComponent urlImg={stateGaleria.izquierdo}/>
                                    </div>
                                )
                        :
                                <button className='CapturadorFoto' onClick={()=>handleFotografia('izquierdo')}>Agregar fotografia izquierdo</button>
                        }

                    </Box>
                </Grid>
                <Grid item sm={6} md={3}>
                    <Box>
                        {
                            stateGaleria.derecho ?
                                (
                                    <div style={{position:'relative'}}>
                                        <h6>Lado Derecho</h6>
                                        <IconButton aria-label="delete" onClick={()=>handleCleanImg('derecho')} sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-20px",
                                        }}>
                                            <CancelIcon />
                                        </IconButton>
                                        <ImgComponent urlImg={stateGaleria.derecho}/>
                                    </div>

                                )
                                :
                                <button className='CapturadorFoto' onClick={()=>handleFotografia('derecho')}>Agregar fotografia derecho </button>
                        }

                    </Box>
                </Grid>
                <Grid item sm={6} md={3}>
                    <Box>
                        {
                            stateGaleria.tatuaje1 ?
                                (
                                    <div style={{position:'relative'}}>
                                        <h6>Tatuaje 1</h6>
                                        <IconButton aria-label="delete" onClick={()=>handleCleanImg('tatuaje1')} sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-20px",
                                        }}>
                                            <CancelIcon />
                                        </IconButton>
                                        <ImgComponent urlImg={stateGaleria.tatuaje1}/>
                                    </div>

                                )
                                : <button className='CapturadorFoto' onClick={()=>handleFotografia('tatuaje1')}>Agregar fotografia</button> }

                    </Box>
                </Grid>
                <Grid item sm={6} md={3}>
                    <Box>
                        {
                            stateGaleria.tatuaje2 ?
                                (
                                    <div style={{position:'relative'}}>
                                        <h6>Tatuaje 2</h6>
                                        <IconButton aria-label="delete" onClick={()=>handleCleanImg('tatuaje2')} sx={{
                                            position: "absolute",
                                            top: "-20px",
                                            right: "-20px",
                                        }}>
                                            <CancelIcon />
                                        </IconButton>
                                        <ImgComponent urlImg={stateGaleria.tatuaje2}/>
                                    </div>

                                )
                                : <button className='CapturadorFoto' onClick={()=>handleFotografia('tatuaje2')}>Agregar fotografia</button> }

                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>

                <Grid item sm={6} md={3}>
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        //disabled={!formActualizado}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
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
                            <div className='imgCam' >
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
                                <Button variant='contained' onClick={capture}>Tomar fotografia</Button>
                            </div>

                        </>
                        ) : (
                            <>
                                <div>
                                    <div>
                                        <img src={img} alt="screenshot" />
                                    </div>
                                    <div style={{
                                        textAlign: 'center',
                                        top: '-60px',
                                        position: 'relative',
                                    }}>
                                        <Button variant='contained' onClick={() => setImg(null)}>Volver a tomar foto</Button>
                                    </div>
                                </div>

                            </>
                        )}

                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'center'}}>
                        <Button variant='outlined' onClick={handleClose}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}



function ImgComponent({urlImg}:{urlImg:string}){

    return(
        <>
            <img src={urlImg} style={{
                objectFit: 'cover',
                width: '100%',
                borderRadius: '10px',
                maxHeight: '90%'}}
            />
        </>

        )

}


function base64ToBlob(base64:string, contentType:string, name:string) {
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