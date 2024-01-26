import { Box, FormControl, FormGroup, TextField, Typography } from "@mui/material";

export interface PPLRegistrationProps{
  foto:string,

}
export default function PPLRegistration(props:PPLRegistrationProps){
  return(
    <FormControl sx={{paddingBottom:10, marginLeft:2}}>
      <FormGroup row={true} sx={{display:"flex", 
      justifyContent:"left", 
      gap:5, 
      marginTop:2}}>
        <Box component="img"
        sx={{
          height: 190,
          width: 259,
        }}
        src={props.foto} />
        <FormGroup sx={{gap:2}}>
          <Typography variant="h6" sx={{fontSize:16, fontFamily:"Inter", fontWeight:"bold"}}>Datos generales</Typography>
          <TextField label={"Nombre(s)"} id="nombres" sx={{minWidth:576}} fullWidth variant="outlined"></TextField>
          <TextField label={"Apellido(s)"} id="apellidos" fullWidth variant="outlined"></TextField>
          <TextField label={"Apodo"} id="apodo" fullWidth variant="outlined"></TextField>
        </FormGroup>
      </FormGroup>
      <FormGroup row sx={{gap:1, marginTop:3}}>
        <TextField label={"Fecha de nacimiento"} id="fechaNacimiento" sx={{minWidth:214}}  variant="outlined"></TextField>
        <TextField label={"Lugar de nacimiento"} id="LugarNacimiento" sx={{minWidth:214}}  variant="outlined"></TextField>
        <TextField label={"Edad"} id="edad" sx={{minWidth:214}}  variant="outlined"></TextField>
        <TextField label={"Nacionalidad"} id="nacionalidad" sx={{minWidth:214}}  variant="outlined"></TextField>
          
      </FormGroup>

        
    </FormControl>
  )
}