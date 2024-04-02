import {Box, Button, Stack, Typography} from "@mui/material";
import Link from "next/link";

interface RegistrationProps {
    mensaje: string;
    cerrarDialogo: () => void;
}


export default function RegistrationData(props: RegistrationProps) {
    return (
        <Box sx={{backgroundColor: "#000"}}>
            <Box sx={{
                backgroundColor: '#FFF',
                paddingY: '20px',
                paddingX: '30px',
                textAlign: 'center',
                position: 'relative',
            }}>

                <Typography variant="h6">{props.mensaje}</Typography>
                <Stack mt={4} spacing={2} direction='column' justifyContent='center' alignItems='center'>
                    <Button onClick={props.cerrarDialogo} variant="contained" sx={{textTransform: 'uppercase', px: 5}}>
                        Aceptar
                    </Button>
                    <Link href='/inicio/registro/ppl'>
                        <Button variant="text">
                            Volver al inicio
                        </Button>
                    </Link>
                </Stack>

            </Box>
        </Box>


    )
}