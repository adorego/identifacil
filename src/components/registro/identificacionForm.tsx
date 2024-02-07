'use client'

import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface DatosDeIdentificacion{
  cedula_identidad?:string;
  nombres:string;
  apellidos:string;
  fecha_nacimiento: Dayjs;
  codigo_genero:string;
}

const InitialStateFormulario:DatosDeIdentificacion = {
  cedula_identidad:"",
  nombres:"",
  apellidos:"",
  fecha_nacimiento:dayjs(),
  codigo_genero:""
}

export interface IdentificacionProps{
  habilitarBotonSiguiente:(arg0:boolean) => void;
  actualizarIdentificacion:(arg0:DatosDeIdentificacion) => void;
} 

interface alternativasDelFormulario{
  paraguayo:boolean;
  conDocumentoDeIdentidad:boolean;
}

const alternativasFormularioInicial:alternativasDelFormulario = {
  paraguayo:true,
  conDocumentoDeIdentidad:true,
}

const IdentificacionForm:FC<IdentificacionProps> = (props:IdentificacionProps) =>{
  const [alternativaFormulario, setAlternativaFormulario] = useState<alternativasDelFormulario>(alternativasFormularioInicial);
  
  const onNacionalidadChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setAlternativaFormulario(
      (previus:alternativasDelFormulario) =>{
        return{
          ...previus,
          paraguayo:event.target.value === "true" ? true : false,
        }
      }
    )
  }

  const onTieneCedulaChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setAlternativaFormulario(
      (previus:alternativasDelFormulario) =>{
        return{
          ...previus,
          conDocumentoDeIdentidad:event.target.value === "true" ? true : false,
        }
      }
    )
  }

  return(
    <Box sx={{padding:"10px"}}>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <FormLabel id="nacionalidad">Es Paraguayo ?</FormLabel>
              <RadioGroup row defaultValue="SI" onChange={onNacionalidadChangeHandler} value={alternativaFormulario.paraguayo} name="nacionalidad-opciones">
                <FormControlLabel value={false} control={<Radio />} label="SI" />
                <FormControlLabel value={true} control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>
            <Grid item sm={3}>
              <FormLabel id="nacionalidad">Tiene Cedula de Identidad ?</FormLabel>
              <RadioGroup row defaultValue="NO" onChange={onTieneCedulaChangeHandler} value={alternativaFormulario.conDocumentoDeIdentidad} name="cedula-opciones">
                <FormControlLabel value={false} control={<Radio />} label="SI" />
                <FormControlLabel value={true} control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>
          </Grid>
    </Box>
  )
}

export default IdentificacionForm;