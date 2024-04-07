'use client'

import {Box, Button, Stack, Typography} from "@mui/material"

import {FC} from "react";
import Image from 'next/image';
import {useRouter} from "next/navigation";

export interface ConfirmacionRegistroProps {
    mensaje: string;
    etiqueta_boton_izquierdo:string;
    registro_ppl:boolean;
}

const RUTA_INICIO:string = "/inicio"
const RUTA_REGISTRO_PPL:string = "/inicio/registro/ppl"
const RUTA_REGISTRO_VISITANTE:string = "/inicio/registro/visitante"

const ConfirmacionRegistro: FC<ConfirmacionRegistroProps> = ({mensaje,etiqueta_boton_izquierdo,registro_ppl}: ConfirmacionRegistroProps) => {
    const router = useRouter();
    const ruta_boton_izquierdo = registro_ppl ? RUTA_REGISTRO_PPL : RUTA_REGISTRO_VISITANTE
    return (
        <Box sx={{
            height: "300px",
            margin: "auto",
            textAlign: "center",
            width: "50vw",
            backgroundColor: '#FFF',
            paddingY: '20px',
            paddingX: '30px',
            borderRadius: '16px',
        }}>
            <Image src="/icono-exito.png" width={120} height={120} alt="Icono de exito"/>
            <Typography variant="h5">
                {mensaje}
            </Typography>
            <Stack spacing={2} direction={"row"} mt={5} justifyContent={"center"}>
                <Button variant={"contained"} onClick={() => router.push(ruta_boton_izquierdo)}>
                    {etiqueta_boton_izquierdo}
                </Button>
                <Button variant={"outlined"} onClick={() => router.push(RUTA_INICIO)}>
                    Volver al inicio
                </Button>
            </Stack>
        </Box>
    )
}

export default ConfirmacionRegistro;