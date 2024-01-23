import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { EstadoCivil, EstadoCivilDTO } from "@/model/estadoCivil.model";
import { Nacionalidad, NacionalidadesDTO } from "@/model/nacionalidad.model";
import { RequestResponse, api_request } from "@/lib/api-request";
import dayjs, { Dayjs }  from "dayjs";

import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { IdentificacionForm } from "@/components/registro/IdentificationForm";
import log from "loglevel";
import { useGlobalContext } from "@/app/Context/store";

interface datosPersonales {
  numeroDeIdentificacion:string|undefined;
  nombre: string;
  nombre_modificado:boolean;
  apellido: string;
  apellido_modificado:boolean;
  apodo: string;
  apodo_modificado:boolean;
  estadoCivil: string;
  estadoCivil_modificado:boolean;
  fechaDeNacimiento: Dayjs | null;
  fechaDeNacimiento_modificado:boolean;
  nacionalidad: string;
  nacionalidad_modificado:boolean;
  lugarDeNacimiento: string;
  lugarDeNacimiento_modificado:boolean;
  sexo: string;
  sexo_modificado:boolean;
  tipoDeDocumento: string;
  tipoDeDocumento_modificado:boolean;
  direccion: string;
  direccion_modificado:boolean;
  barrioCompania: string;
  barrioCompania_modificado:boolean;
  numeroDeContacto: string;
  numeroDeContacto_modificado:boolean;
  contactoDeEmergencia1: string;
  contactoDeEmergencia1_modificado:boolean;
  contactoDeEmergencia2: string;
  contactoDeEmergencia2_modificado:boolean;
  pueblosIndigenas: boolean;
  pueblosIndigenas_modificado:boolean;
  nombreEtnia: string;
  nombreEtnia_modificado:boolean;
  perteneceAComunidadLGTBI:boolean;
  perteneceAComunidadLGTBI_modificado:boolean;
  grupoLGTBI: string;
  grupoLGTBI_modificado:boolean;

}

const datosPersonalesInicial: datosPersonales = {
  numeroDeIdentificacion:"",
  nombre: '',
  apellido: '',
  apodo: '',
  estadoCivil: '',
  fechaDeNacimiento: null,
  nacionalidad: '',
  lugarDeNacimiento: '',
  sexo: '',
  tipoDeDocumento: '',
  direccion: '',
  barrioCompania: '',
  numeroDeContacto: '',
  contactoDeEmergencia1: '',
  contactoDeEmergencia2: '',
  pueblosIndigenas: false,
  nombreEtnia: '',
  nombre_modificado: false,
  apellido_modificado: false,
  apodo_modificado: false,
  estadoCivil_modificado: false,
  fechaDeNacimiento_modificado: false,
  nacionalidad_modificado: false,
  lugarDeNacimiento_modificado: false,
  sexo_modificado: false,
  tipoDeDocumento_modificado: false,
  direccion_modificado: false,
  barrioCompania_modificado: false,
  numeroDeContacto_modificado: false,
  contactoDeEmergencia1_modificado: false,
  contactoDeEmergencia2_modificado: false,
  pueblosIndigenas_modificado: false,
  nombreEtnia_modificado: false,
  grupoLGTBI: '',
  grupoLGTBI_modificado: false,
  perteneceAComunidadLGTBI:false,
  perteneceAComunidadLGTBI_modificado:false,
}
export interface BloqueDatosPersonalesProps{
  datosDeIdentificacion:IdentificacionForm;
  
}


const BloqueDatosPersonales:FC<BloqueDatosPersonalesProps> = ({datosDeIdentificacion}) =>{
  const [datosPersonalesState, setDatosPersonalesState] = useState<datosPersonales>({
    ...datosPersonalesInicial,
    fechaDeNacimiento: dayjs(datosDeIdentificacion.fecha_nacimiento,"YYYY-MM-DD"),
    fechaDeNacimiento_modificado:true,
    numeroDeIdentificacion:datosDeIdentificacion.cedula_identidad,
    nombre:datosDeIdentificacion.nombres,
    nombre_modificado:true,
    apellido:datosDeIdentificacion.apellidos,
    apellido_modificado:true,
    
  });
  const [nacionalidades, setNacionalidades] = useState<Array<Nacionalidad>>([]);
  const [estadosCiviles, setEstadosCiviles] = useState<Array<EstadoCivil>>([]);
  const {openSnackbar} = useGlobalContext();

  // console.log("Fecha de nacimiento recepciionada:", datosDeIdentificacion.fecha_nacimiento);
  // console.log("fecha de Nacimiento:", datosPersonalesState.fechaDeNacimiento);
  
  useEffect(
    () =>{

      const getNacionalidades = async () =>{
        const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/identifacil/api/registro/nacionalidades`;
        try{
          const respuesta:RequestResponse = await api_request<NacionalidadesDTO>(url,{
            method:'GET',
            headers:{
              'Content-type':'application/json'
            }
          });
          // console.log("Respuesta:", respuesta);
          if(respuesta.success && respuesta.datos){
            setNacionalidades(respuesta.datos.nacionalidades);
          }else{
            openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
          }
          
        }catch(error){
          openSnackbar(`Error en la consulta de datos:${error}`, "error");
        }
        
        
        
      }

      console.log("Consultando nacionalidades");
      getNacionalidades();
      
    },[]
  )

  useEffect(
    () =>{
        const getEstadosCiviles = async () =>{
          const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/identifacil/api/registro/estados_civiles`;
          try{
            const respuesta:RequestResponse = await api_request<EstadoCivilDTO>(url,{
              method:'GET',
              headers:{
                'Content-type':'application/json'
              }
            });
            // console.log("Respuesta:", respuesta);
            if(respuesta.success && respuesta.datos){
              setEstadosCiviles(respuesta.datos.estadosCiviles);
            }else{
              openSnackbar(`Error en la consulta de datos:${respuesta.error?.message}`, "error");
            }
            
          }catch(error){
            openSnackbar(`Error en la consulta de datos:${error}`, "error");
          }
        }
        getEstadosCiviles();
    },[]
  )
  const onDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.target.name);
      setDatosPersonalesState(
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

  const onDatoSelectChange = (event:SelectChangeEvent) =>{
    setDatosPersonalesState(
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

  const onOptionSelectChange = (event:ChangeEvent<HTMLInputElement>) =>{
    // console.log("Name of event:", event.target.name);
    setDatosPersonalesState(
      (previus) =>{
        return(
          {
            ...previus,
            [event.target.name]:(event.target.value === 'true'),
            [`${event.target.name}_modificado`]:true
          }
        )
      }
    )
  }

  const onFechaNacimientoChange = (value:Dayjs|null , context:PickerChangeHandlerContext<DateValidationError>) =>{
    // console.log(value);
    setDatosPersonalesState(
      (previus) =>{
        return(
          {
            ...previus,
            fechaNacimiento:value,
            fechaDeNacimiento_modificado:true
            

          }
        )
      }
    )
  }
  const onDatosPersonalesSubmit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(datosDeIdentificacion.cedula_identidad){
      const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/identifacil/api/registro/datos_personales`;
      const datosDelFormulario:datosPersonales = Object.assign({},datosPersonalesState);
      datosDelFormulario.numeroDeIdentificacion = datosDeIdentificacion.cedula_identidad;
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
          openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`,`error`);
          log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
        }
      }

      // console.log("Respuesta:", respuesta);
    }else{
      openSnackbar("Falta el número de identificación","error");
    }
  }

  return(
    <Box component={'form'} autoComplete="off">
      <Typography variant='h6'>
        Datos Personales
      </Typography>
      <Grid container spacing={2} my={2}>
        <Grid item sm={6}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="nombre">
                Nombre
            </InputLabel>
            <OutlinedInput
              readOnly={true}
              label="Nombre"
              name="nombre"
              value={datosPersonalesState.nombre}
              onChange={onDatoChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="apellido">
                Apellido
            </InputLabel>
            <OutlinedInput
              readOnly={true}
              label="Apellido"
              name="apellido"
              value={datosPersonalesState.apellido}
              onChange={onDatoChange}/>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="apodo">
              Apodo
            </InputLabel>
            <OutlinedInput
              label="Apodo"
              name="apodo"
              value={datosPersonalesState.apodo}
               onChange={onDatoChange}/>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="estado_civil">
                Estado Civil
            </InputLabel>
            <Select
              id="estado_civil_id"
              name="estadoCivil"
              value={datosPersonalesState.estadoCivil}
              onChange={onDatoSelectChange}
              >
                {estadosCiviles ? estadosCiviles.map(
                  (estadoCivil,id) =>{
                    return(
                      <MenuItem key={id} value={estadoCivil.id}>{estadoCivil.nombre}</MenuItem>
                    )
                  }
                ): null}
                
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <DatePicker 
                  readOnly={true}
                  value={datosPersonalesState.fechaDeNacimiento} 
                  format="DD/MM/YYYY"
                  onChange={onFechaNacimientoChange}
                  label={"Fecha de nacimiento"} 
                  />    
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Nacionalidad</InputLabel>
              <Select
                value={datosPersonalesState.nacionalidad}
                onChange={onDatoSelectChange}
                label="Nacionalidad"
                name="nacionalidad"
              >
                {nacionalidades ? nacionalidades.map(
                  (data, id) =>{
                    return(
                      <MenuItem key={id} value={data.id}>{data.nombre}</MenuItem>
                    )
                  }
                ) : null}
              
              
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            fullWidth
            label="Ciudad de Nacimiento"
            name="lugarDeNacimiento"
            value={datosPersonalesState.lugarDeNacimiento}
            onChange={onDatoChange}>

          </TextField>
          
        </Grid>
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="Direccion"
            name="direccion"
            value={datosPersonalesState.direccion}
            onChange={onDatoChange}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Barrio/Compañia</InputLabel>
            <OutlinedInput
                name="barrioCompania"
                value={datosPersonalesState.barrioCompania}
                onChange={onDatoChange}
                label="Barrio"
              />
          </FormControl>
        </Grid>
        
        <Grid item sm={4}>
          <TextField
            fullWidth
            label="Numero de contacto"
            name="numeroDeContacto"
            value={datosPersonalesState.numeroDeContacto}
            onChange={onDatoChange}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <TextField
            label="Contacto de emergencia 1"
            fullWidth
            name="contactoDeEmergencia1"
            value={datosPersonalesState.contactoDeEmergencia1}
            onChange={onDatoChange}
          />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <TextField
            label="Contacto de emergencia 2"
            fullWidth
            name="contactoDeEmergencia2"
            value={datosPersonalesState.contactoDeEmergencia2}
            onChange={onDatoChange}
          />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <Typography variant='h6'>
            Pueblo indigenas
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <FormLabel>Pertenece a un pueblo indigena</FormLabel>
            <RadioGroup
                value={datosPersonalesState.pueblosIndigenas}
                onChange={onOptionSelectChange}
                row
                aria-labelledby="gestioacion"
                name="pueblosIndigenas">                 
                  <FormControlLabel 
                    value={true}
                    control={<Radio  /> } 
                    label="Si"/>
                  <FormControlLabel 
                    value={false}
                    control={<Radio  /> } 
                    label="No"/>
            </RadioGroup>             
          </FormControl>
        </Grid>
        <Grid item sm={8}>
          <TextField
            fullWidth
            label="Nombre de la etnia"
            name="nombreEtnia"
            value={datosPersonalesState.nombreEtnia}
            onChange={onDatoChange}
            disabled={!datosPersonalesState.pueblosIndigenas}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography variant='h6'>
            Comunidad LGBTI
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <FormLabel>Pertenece a la comunidad</FormLabel>
            <RadioGroup
                value={datosPersonalesState.perteneceAComunidadLGTBI}
                onChange={onOptionSelectChange}
                row
                name="perteneceAComunidadLGTBI">                 
                  <FormControlLabel 
                    value={true}
                    control={<Radio  /> } 
                    label="Si"/>
                  <FormControlLabel 
                    value={false}
                    control={<Radio  /> } 
                    label="No"/>
            </RadioGroup>    
          </FormControl>
        </Grid>
        <Grid item sm={8}>
          <TextField
            fullWidth
            label="Nombre de la comunidad"
            name="grupoLGTBI"
            value={datosPersonalesState.grupoLGTBI}
            onChange={onDatoChange}
            disabled={!datosPersonalesState.perteneceAComunidadLGTBI}
          />
        </Grid>
        <Grid item sm={12}>
          <Stack direction="row" spacing={2}>
            <Button variant='contained' onClick={onDatosPersonalesSubmit}>
              Guardar
            </Button>
            {/* <Button variant='outlined'>
              Cancelar
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BloqueDatosPersonales;


