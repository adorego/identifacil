import { Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

import {Storage} from '@mui/icons-material';

export default function IdentificationForm(){
  const [cedula, setCedula] = useState('');
  const [error,setError] = useState({error:false,msg:""});
  
  const onConsultarRegistroCivil = async () =>{
    const url = `${process.env.NEXT_PUBLIC_REGISTRO_CIVIL_URL}${cedula}`;
    const userName = process.env.NEXT_PUBLIC_REGISTRO_CIVIL_USER;
    const password = process.env.NEXT_PUBLIC_REGISTRO_CIVIL_CLAVE;
    const credentials = `${userName}:${password}`;
    console.log(credentials);
    const encodedCredentials = btoa(credentials);
    console.log(encodedCredentials);
    const headers = new Headers();

    headers.append('Authorization',`Basic ${encodedCredentials}`);
    headers.append('Content-Type','application/json');
    headers.append('Origin','http://localhost:3000');
    
    console.log(url);
    const response = await fetch(url, {
      headers:{"Authentication": `Basic ${encodedCredentials}`}
      

    });
    // const data = await response.json();
    // if(!response.ok){
    //   setError({error:true, msg:response.statusText});
    // }
    console.log("La respuesta es:",response);
  
}
const onCedulaChange = (event:ChangeEvent<HTMLInputElement>) =>{
  setCedula(event.currentTarget.value);
}

const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError({error:false, msg:""});
};

return(
      
      <Box sx={{}}>
        <FormLabel id="nacionalidad">Es Paraguayo ?</FormLabel>
        <RadioGroup row defaultValue="SI" name="nacionalidad-opciones">
          <FormControlLabel value="SI" control={<Radio />} label="SI" />
          <FormControlLabel value="NO" control={<Radio />} label="NO" />
        </RadioGroup>
      
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <TextField id="cedula" value={cedula} onChange={onCedulaChange} fullWidth label="Ingrese cedula" variant="outlined" required />
            
            
          </Grid>
          <Grid item xs={2} >
            <Button sx={{minHeight:"100%"}} onClick={onConsultarRegistroCivil} variant="contained" endIcon={<Storage />}>
              Consultar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField  id="nombre" fullWidth label="Nombre" variant="outlined" disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField  id="apellido" fullWidth label="Apellido" variant="outlined" disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField  id="apodo" fullWidth label="Apodo" variant="outlined" disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField  id="genero" fullWidth label="Genero" variant="outlined" disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField  id="direccion" fullWidth label="Direccion" variant="outlined" disabled />
          </Grid>
        </Grid>
      </Box>
)

}