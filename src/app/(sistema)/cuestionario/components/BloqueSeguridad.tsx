import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, OutlinedInput, Radio, RadioGroup } from "@mui/material";
import { FC, useState } from "react";

import { api_request } from "@/lib/api-request";
import log from "loglevel";
import { useGlobalContext } from "@/app/Context/store";

interface datosSeguridad{
  numeroDeIdentificacion:string | null;
  riesgoParaPersonal: boolean;
  riesgoParaPersonal_modificado:boolean;
  riesgoParaPersonalRespuesta: string;
  riesgoParaPersonalRespuesta_modificado:boolean;
  riesgoParaReclusos: boolean;
  riesgoParaReclusos_modificado:boolean;
  riesgoParaReclusosRespuesta: string;
  riesgoParaReclusosRespuesta_modificado:boolean;
  riesgoDeSufrirLesionPorOtrosReclusos: boolean;
  riesgoDeSufrirLesionPorOtrosReclusos_modificado:boolean;
  riesgoDeSufrirLesionPorOtrosReclusosRespuesta: string;
  riesgoDeDanharLaPropiedad: boolean;
  riesgoDeDanharLaPropiedad_modificado:boolean
  riesgoDeDanharLaPropiedadRespuesta: string;
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad: boolean;
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado:boolean
  miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: string;
  tieneEntrenamientoMilitarPrevio: boolean;
  tieneEntrenamientoMilitarPrevio_modificado:boolean;
  tieneEntrenamientoMilitarPrevioRespuesta: string;
  eraFuncionarioPublico: boolean;
  eraFuncionarioPublico_modificado:boolean;
  eraFuncionarioPublicoRespuesta: string;

}

const datosSeguridadIniciales:datosSeguridad = {
  numeroDeIdentificacion:null,
  riesgoParaPersonal: false,
  riesgoParaPersonal_modificado:false,
  riesgoParaPersonalRespuesta: "",
  riesgoParaPersonalRespuesta_modificado:false,
  riesgoParaReclusos: false,
  riesgoParaReclusos_modificado:false,
  riesgoParaReclusosRespuesta: "",
  riesgoParaReclusosRespuesta_modificado:false,
  riesgoDeSufrirLesionPorOtrosReclusos: false,
  riesgoDeSufrirLesionPorOtrosReclusos_modificado:false,
  riesgoDeSufrirLesionPorOtrosReclusosRespuesta: "",
  riesgoDeDanharLaPropiedad: false,
  riesgoDeDanharLaPropiedad_modificado:false,
  riesgoDeDanharLaPropiedadRespuesta: "",
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad: false,
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado:false,
  miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: "",
  tieneEntrenamientoMilitarPrevio: false,
  tieneEntrenamientoMilitarPrevio_modificado:false,
  tieneEntrenamientoMilitarPrevioRespuesta: "",
  eraFuncionarioPublico: false,
  eraFuncionarioPublico_modificado:false,
  eraFuncionarioPublicoRespuesta: "",
}

interface BloqueSeguridadProps{
  datosIniciales?:datosSeguridad;
  numeroDeIdentificacion:string;
}

const BloqueSeguridad:FC<BloqueSeguridadProps> = ({datosIniciales = datosSeguridadIniciales, numeroDeIdentificacion}) =>{
  const [estadoBloqueSeguridadFormulario, setEstadoBloqueSeguridadFormulario] = useState<datosSeguridad>(datosIniciales);
  const {openSnackbar} = useGlobalContext();
  // console.log(estadoBloqueSeguridadFormulario);
  const onDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(event.target.name);
    setEstadoBloqueSeguridadFormulario(
      (previus) =>{
        return(
          {
            ...previus,
            [event.target.name]:event.target.value,
            [`${event.target.name}_modificado`]:true

          }
        )
      }
    )
  } 

  const onSelectChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setEstadoBloqueSeguridadFormulario(
      (previus) =>{
        return(
          {
            ...previus,
            [event.target.name]:(event.target.value === "true"),
            [`${event.target.name}_modificado`]:true

          }
        )
      }
    )
  }

  const onFormSubmit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(numeroDeIdentificacion){
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/registro/datos_seguridad`;
      const datosDelFormulario:datosSeguridad = Object.assign({},estadoBloqueSeguridadFormulario);
      datosDelFormulario.numeroDeIdentificacion = numeroDeIdentificacion;
      // console.log("Datos a enviar:", datosDelFormulario.numeroDeIdentificacion);
      const respuesta = await api_request(url,{
        method:'POST',
        body:JSON.stringify(datosDelFormulario),
        headers: {
            'Content-Type': 'application/json'
        }

      })
      if(respuesta.success){
        openSnackbar("Datos guardados correctamente","success")
      }else{
        if(respuesta.error){
          openSnackbar(`Error al guardar los datos`,`error`);
          log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
        }
      }

    }else{
      openSnackbar("Falta el número de identificación","error");
    }
  }
  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
            >
      <Grid container spacing={2} >
        <Grid item sm={12}>
            <FormControl>
              <FormLabel id="riesgoPersona;">¿Riesgo para el personal?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.riesgoParaPersonal}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="riesgoPersona;"
                  name="riesgoParaPersonal" >
                  <FormControlLabel 
                  value={true} 
                  control={<Radio />} 
                  label="Si"/>
                  <FormControlLabel 
                  value={false}
                  control={<Radio/>} 
                  label="No"/>
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='riesgoParaPersonalRpta'>
                Observacion
              </InputLabel>
              <OutlinedInput
                disabled={!estadoBloqueSeguridadFormulario.riesgoParaPersonal}
                name="riesgoParaPersonalRespuesta"
                value={estadoBloqueSeguridadFormulario.riesgoParaPersonalRespuesta}
                onChange={onDatoChange}
                label="Observacion" />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="riesgoRecluso;">¿Riesgo para otros reclusos?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.riesgoParaReclusos}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="riesgoRecluso;"
                  name="riesgoParaReclusos">
                  <FormControlLabel 
                    value={true} 
                    control={<Radio/>} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio/>} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='riesgoParaReclusosRespuesta'>
                Observacion
              </InputLabel>
              <OutlinedInput
                disabled={!estadoBloqueSeguridadFormulario.riesgoParaReclusosRespuesta}
                name="riesgoParaReclusosRespuesta"
                value={estadoBloqueSeguridadFormulario.riesgoParaReclusosRespuesta}
                onChange={onDatoChange}
                label="Observacion"/>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="riesgoOtroRecluso;">¿Riesgo de ser lesionado por otros reclusos?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.riesgoDeSufrirLesionPorOtrosReclusos}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="riesgoOtroRecluso;"
                  name="riesgoDeSufrirLesionPorOtrosReclusos" >
                  <FormControlLabel 
                    value={true}
                    control={<Radio />} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio />} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='riesgoPorReclusosRpta;'>
                Observacion
              </InputLabel>
              <OutlinedInput
                name="riesgoDeSufrirLesionPorOtrosReclusosRespuesta"
                value={estadoBloqueSeguridadFormulario.riesgoDeSufrirLesionPorOtrosReclusosRespuesta}
                onChange={onDatoChange}
                label="Observacion"/>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="danhoPropiedad;">¿Riesgo de dañar la propiedad?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.riesgoDeDanharLaPropiedad}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="danhoPropiedad;"
                  name="riesgoDeDanharLaPropiedad">
                  <FormControlLabel 
                    value={true}
                    control={<Radio/>} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio/>} 
                    label="No"/>
                </RadioGroup>
              </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='danhoPropiedadRpta'>
                  Observacion
              </InputLabel>
              <OutlinedInput
                name="riesgoDeDanharLaPropiedadRespuesta"
                value={estadoBloqueSeguridadFormulario.riesgoDeDanharLaPropiedadRespuesta}
                onChange={onDatoChange}
                label="Observacion"/>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="grupoAmenaza;">¿Miembro de un grupo que constituye una amenaza para la seguridad?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.miembroDeGrupoQueConstituyeAmenazaParaSeguridad}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="grupoAmenaza;"
                  name="miembroDeGrupoQueConstituyeAmenazaParaSeguridad">
                  <FormControlLabel 
                    value={true} 
                    control={<Radio />} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio />} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="miembroGrupoRpta">Nombre del grupo</InputLabel>
              <OutlinedInput
                name="miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta"
                value={estadoBloqueSeguridadFormulario.miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta}
                onChange={onDatoChange}
                label="Nombre del grupo"/>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="entrenamientoMilitar;">¿Entrenamiento militar previo?</FormLabel>
                <RadioGroup
                  value={estadoBloqueSeguridadFormulario.tieneEntrenamientoMilitarPrevio}
                  onChange={onSelectChange}
                  row
                  aria-labelledby="entrenamientoMilitar"
                  name="tieneEntrenamientoMilitarPrevio">
                  <FormControlLabel 
                    value={true}
                    control={<Radio />} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false}
                    control={<Radio/>} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="entrenamientoMilitarRpta">Agregar Respuesta</InputLabel>
              <OutlinedInput
                name="tieneEntrenamientoMilitarPrevioRespuesta"
                value={estadoBloqueSeguridadFormulario.tieneEntrenamientoMilitarPrevioRespuesta}
                onChange={onDatoChange}
                label="Agregar Respuesta"/>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl>
              <FormLabel id="funcionarioPublico;">¿Era funcionario público?</FormLabel>
              <RadioGroup
                value={estadoBloqueSeguridadFormulario.eraFuncionarioPublico}
                onChange={onSelectChange}
                row
                aria-labelledby="funcionarioPublico;"
                name="eraFuncionarioPublico">
                <FormControlLabel 
                  value={true}
                  control={<Radio/>} 
                  label="Si"/>
                <FormControlLabel 
                  value={false} 
                  control={<Radio/>} 
                  label="No"/>
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
            <InputLabel htmlFor='funcionarioPublicoRpta'>Agregar cargo</InputLabel>
            <OutlinedInput
              name="funcionarioPublicoRpta"
              value={estadoBloqueSeguridadFormulario.eraFuncionarioPublicoRespuesta}
              onChange={onDatoChange}
              label="Agregar cargo"/>
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <Button onClick={onFormSubmit} variant='contained'>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
          
export default BloqueSeguridad;