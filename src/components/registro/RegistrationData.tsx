import { Box, Button, Typography } from "@mui/material";

interface RegistrationProps{
  mensaje:string;
  cerrarDialogo:() => void;
}


export default function RegistrationData(props:RegistrationProps){
  return(
    <Box sx={{
      backgroundColor: '#FFF',
      paddingY: '20px',
      paddingX: '30px',
      textAlign:'center',
      borderRadius:'16px',
      boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
    }}>

      <Typography variant="h6">{props.mensaje}</Typography>
      <Button sx={{backgroundColor:"back", color:"white", mt:"20px"}} onClick={props.cerrarDialogo} variant={"contained"}>Aceptar</Button>
      
    </Box>
  )
}