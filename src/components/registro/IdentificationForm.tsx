'use client'

import { Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, ReactElement, Reducer, Suspense, useReducer, useState } from "react";

import {Storage} from '@mui/icons-material';
import styles from "./IdentificacionForm.module.css";

//Definición de tipos necesarios

enum ActionType{
  FILL_FORM = "FILL_FORM",
  RESET_FORM = "RESET_FORM"
}

interface IReducer{
  type:ActionType,
  data:IdentificacionForm
}

export interface IdentificacionForm{
  cedula_identidad?:string;
  nombres:string;
  apellidos:string;
  fecha_nacimiento: string;
  codigo_genero:string;
}

const InitialStateFormulario:IdentificacionForm = {
  cedula_identidad:"",
  nombres:"",
  apellidos:"",
  fecha_nacimiento:"",
  codigo_genero:""
}

interface DatosCedulaDTO{
  datosDeCedula:{
    cedula_identidad?:string;
    nombres:string;
    apellidos:string;
    fecha_nacimiento:"";
    codigo_genero:string;
  },
  exito:boolean;
}

export interface IdentificationFormProps{
  habilitarBotonSiguiente:(arg0:boolean) => void;
  actualizarIdentificacion:(arg0:IdentificacionForm) => void;
} 

const formularioReducer:Reducer<IdentificacionForm, IReducer> = (state=InitialStateFormulario, action) =>{
  
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
  
}

const IdentificationForm:FC<IdentificationFormProps> = (props:IdentificationFormProps):ReactElement =>{
  const [cedula, setCedula] = useState('');
  const [error,setError] = useState({error:false,msg:""});
  const [formulario, dispatch] = useReducer<Reducer<IdentificacionForm,IReducer>>(formularioReducer, InitialStateFormulario )
  
  const onConsultarRegistroCivil = async () =>{
    setError({error:false, msg:""});
    const url = process.env.NEXT_PUBLIC_CONSULTACI_URL + '/api/consultaci/get_datos_ci/';
    
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
        // console.log(data);
        if(data.exito && data.datosDeCedula.nombres != ""){
          // console.log(data);
          dispatch({type:ActionType.FILL_FORM, data:data.datosDeCedula});
          props.actualizarIdentificacion(data.datosDeCedula);
          props.habilitarBotonSiguiente(true);
        }
      }
      
      
      

    }catch(error){
      console.log(error);
      setError({error:true, msg:'Hubo un error en la consulta de la cedula'})
    }
    
    
  }
  const onCedulaChange = (event:ChangeEvent<HTMLInputElement>) =>{
    setCedula(event.currentTarget.value);
  }



  return(
        <Box sx={{padding:"10px"}}>
          <FormLabel id="nacionalidad">Es Paraguayo ?</FormLabel>
          <RadioGroup row defaultValue="SI" name="nacionalidad-opciones">
            <FormControlLabel value="SI" control={<Radio />} label="SI" />
            <FormControlLabel value="NO" control={<Radio />} label="NO" />
          </RadioGroup>
        
          <Grid container spacing={2}>
            <Grid item xs={6} >
              {!error.error ?
              <TextField autoComplete="off"  id="cedula" value={cedula} onChange={onCedulaChange} fullWidth label="Ingrese cedula" variant="outlined" required />
              :
              <TextField autoComplete="off" error helperText={error.msg}  id="cedula" value={cedula} onChange={onCedulaChange} fullWidth label="Ingrese cedula" variant="outlined" required />
              
              }
              
            </Grid>
            <Grid item xs={2} >
              <Button sx={{minHeight:"100%"}} onClick={onConsultarRegistroCivil} variant="contained" endIcon={<Storage />}>
                Consultar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField  id="nombres" value={formulario.nombres} fullWidth label="Nombres" variant="outlined" disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField  id="apellido" value={formulario.apellidos} fullWidth label="Apellidos" variant="outlined" disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField  id="fechaNacimiento" value={formulario.fecha_nacimiento} fullWidth label="Fecha de Nacimiento" variant="outlined" disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField  id="genero" 
              value={formulario.codigo_genero == '1' ? 'femenino' : formulario.codigo_genero == '2' ? 'masculino' : ''} 
              fullWidth label="Genero" variant="outlined" disabled />
            </Grid>
            
          </Grid>
        </Box>
      
  )

}

export default IdentificationForm;;