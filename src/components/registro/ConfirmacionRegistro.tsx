'use client'

import {Box, Button, Stack, Typography} from "@mui/material"

import {FC} from "react";
import Image from 'next/image';
import {useRouter} from "next/navigation";

export interface ConfirmacionRegistroProps {
    mensaje: string;
}

const ConfirmacionRegistro: FC<ConfirmacionRegistroProps> = ({mensaje}: ConfirmacionRegistroProps) => {
    const router = useRouter();

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
                <Button variant={"contained"} onClick={() => router.push('/inicio/registro/ppl')}>
                    Registrar otro PPL
                </Button>
                <Button variant={"outlined"} onClick={() => router.push('/inicio')}>
                    Volver al inicio
                </Button>
            </Stack>
        </Box>
    )
}

export default ConfirmacionRegistro;