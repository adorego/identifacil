import { Box, Button, Typography } from "@mui/material";

interface RegistrationProps{
  mensaje:string;
  cerrarDialogo:() => void;
}


export default function RegistrationData(props:RegistrationProps){
  return(
    <Box sx={{
      textAlign:'center'
    }}>

      <Typography variant="h6">{props.mensaje}</Typography>
      <Button sx={{backgroundColor:"back", color:"white"}} onClick={props.cerrarDialogo} variant={"contained"}>Aceptar</Button>
      
    </Box>
  )
}