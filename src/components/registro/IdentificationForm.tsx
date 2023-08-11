'use client'

import { Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { ChangeEvent, FC, ReactElement, Reducer, Suspense, useReducer, useState } from "react";

import {Storage} from '@mui/icons-material';

//Definición de tipos necesarios

enum ActionType{
  FILL_FORM = "FILL_FORM",
  RESET_FORM = "RESET_FORM"
}

interface IReducer{
  type:ActionType,
  data:IFormularioForm
}

interface IFormularioForm{
  cedula_identidad:string;
  nombres:string;
  apellidos:string;
  fecha_nacimiento:Date | "";
  codigo_genero:string;
}

const InitialStateFormulario:IFormularioForm = {
  cedula_identidad:"",
  nombres:"",
  apellidos:"",
  fecha_nacimiento:"",
  codigo_genero:""
}

interface DatosCedulaDTO{
  datosDeCedula:{
    cedula_identidad:string;
    nombres:string;
    apellidos:string;
    fecha_nacimiento:Date;
    codigo_genero:string;
  },
  exito:boolean;
}

export interface IdentificationFormProps{
  habilitarBotonSiguiente:(arg0:boolean) => void;
} 

const formularioReducer:Reducer<IFormularioForm, IReducer> = (state=InitialStateFormulario, action) =>{
  console.log(action);
  try{
    switch(action.type){
      case ActionType.FILL_FORM:
        return Object.assign({},{
          nombres:action.data.nombres,
          apellidos:action.data.apellidos,
          fecha_nacimiento:action.data.fecha_nacimiento,
          codigo_genero:action.data.codigo_genero
        
        })
      case ActionType.RESET_FORM:
        return Object.assign({},{
          nombres:"",
          apellidos:"",
          fecha_nacimiento:"",
          codigo_genero:""
        })
       default:
        return state; 
    }
  }catch(error){
    console.log(error);
  }
}

const IdentificationForm:FC<IdentificationFormProps> = (props:IdentificationFormProps):ReactElement =>{
  const [cedula, setCedula] = useState('');
  const [error,setError] = useState({error:false,msg:""});
  const [formulario, dispatch] = useReducer<Reducer<IFormularioForm,IReducer>>(formularioReducer, InitialStateFormulario )
  
  const onConsultarRegistroCivil = async () =>{
    const url = process.env.NEXT_PUBLIC_SERVER_URL + '/api/consultaci';
    // console.log(url);
    try{
      const headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','*/*');
      const response = await fetch(url,{
        method:'POST',
        headers:headers,
        mode:'cors',
        body: JSON.stringify({"cedula":cedula})
      });
      if(response.ok){
        const data:DatosCedulaDTO = await response.json();
        console.log(data);
        if(data.exito && data.datosDeCedula.nombres != ""){
          console.log(data);
          dispatch({type:ActionType.FILL_FORM, data:data.datosDeCedula});
          props.habilitarBotonSiguiente(true);
        }
      }
      
      
      

    }catch(error){
      console.log(error);
    }
    
    
  }
  const onCedulaChange = (event:ChangeEvent<HTMLInputElement>) =>{
    setCedula(event.currentTarget.value);
  }



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

export default IdentificationForm;;