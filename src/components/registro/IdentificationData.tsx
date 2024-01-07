import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { Label } from "@mui/icons-material";
import { useState } from "react";

export interface IdentificationFormProps{
  nombres:string;
  apellidos:string;
  esPPL:boolean;
  cerrarDialogo:() => void;
}
export default function IdentificationForm(props:IdentificationFormProps){
  
  return(
    <Box sx={{
      textAlign:'center'
    }}>
    <Typography variant="h4">Persona Identificada</Typography>
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12} sx={{marginLeft:'20px', marginRight:'20px'}}>
        <TextField autoComplete="off" value={props.nombres} fullWidth label="Nombres" variant="outlined" />
      </Grid>
      <Grid item xs={12} sx={{marginLeft:'20px', marginRight:'20px'}}>
        <TextField autoComplete="off" value={props.apellidos} fullWidth label="Apellidos" variant="outlined" />
      </Grid>
      <Grid item xs={12} sx={{marginLeft:'20px', marginRight:'20px'}}>
        <TextField autoComplete="off" value={props.esPPL ? 'SI' : 'NO'} fullWidth label="es PPL" variant="outlined" />

      </Grid>
      <Grid item xs={12} sx={{marginLeft:'20px', marginRight:'20px'}}>
        <Button sx={{backgroundColor:"back", color:"white"}} onClick={props.cerrarDialogo} variant={"contained"}>Aceptar</Button>
      </Grid>
      
    </Grid>
    </Box>
  )
}