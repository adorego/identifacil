import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { Nacionalidad, NacionalidadesDTO } from "@/model/nacionalidad.model";
import { RequestResponse, api_request } from "@/lib/api-request";

import { Dayjs } from "dayjs";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import log from "loglevel";
import { useGlobalContext } from "@/app/Context/store";

interface datosPersonales {
  numeroDeIdentificacion:string;
  nombre: string;
  nombre_modificado:boolean;
  apellido: string;
  apellido_modificado:boolean;
  apodo: string;
  apodo_modificado:boolean;
  estadoCivil: string;
  estadoCivil_modificado:boolean;
  fechaNacimiento: Dayjs | null;
  fechaNacimiento_modificado:boolean;
  nacionalidad: string;
  nacionalidad_modificado:boolean;
  lugarNacimiento: string;
  lugarNacimiento_modificado:boolean;
  sexo: string;
  sexo_modificado:boolean;
  tipoDeDocumento: string;
  tipoDeDocumento_modificado:boolean;
  numeroDocumento: string;
  numeroDocumento_modificado:boolean;
  direccion: string;
  direccion_modificado:boolean;
  barrio: string;
  barrio_modificado:boolean;
  compania: string;
  compania_modificado:boolean;
  numeroDeContacto: string;
  numeroDeContacto_modificado:boolean;
  contactoDeEmergencia1: string;
  contactoDeEmergencia1_modificado:boolean;
  contactoDeEmergencia2: string;
  contactoDeEmergencia2_modificado:boolean;
  puebloIndigena: boolean;
  puebloIndigena_modificado:boolean;
  nombreEtnia: string;
  nombreEtnia_modificado:boolean;
  pertenece_a_comunidad_lgbti:boolean;
  pertenece_a_comunidad_lgbti_modificado:boolean;
  grupoLgbti: string;
  grupoLgbti_modificado:boolean;

}

const datosPersonalesInicial: datosPersonales = {
  numeroDeIdentificacion:"",
  nombre: '',
  apellido: '',
  apodo: '',
  estadoCivil: '',
  fechaNacimiento: null,
  nacionalidad: '',
  lugarNacimiento: '',
  sexo: '',
  tipoDeDocumento: '',
  numeroDocumento: '',
  direccion: '',
  barrio: '',
  compania: '',
  numeroDeContacto: '',
  contactoDeEmergencia1: '',
  contactoDeEmergencia2: '',
  puebloIndigena: false,
  nombreEtnia: '',
  nombre_modificado: false,
  apellido_modificado: false,
  apodo_modificado: false,
  estadoCivil_modificado: false,
  fechaNacimiento_modificado: false,
  nacionalidad_modificado: false,
  lugarNacimiento_modificado: false,
  sexo_modificado: false,
  tipoDeDocumento_modificado: false,
  numeroDocumento_modificado: false,
  direccion_modificado: false,
  barrio_modificado: false,
  compania_modificado: false,
  numeroDeContacto_modificado: false,
  contactoDeEmergencia1_modificado: false,
  contactoDeEmergencia2_modificado: false,
  puebloIndigena_modificado: false,
  nombreEtnia_modificado: false,
  grupoLgbti: '',
  grupoLgbti_modificado: false,
  pertenece_a_comunidad_lgbti:false,
  pertenece_a_comunidad_lgbti_modificado:false,
}
export interface BloqueDatosPersonalesProps{
  numeroDeIdentificacion:string;
  datosPersonalesAlmacenados?:datosPersonales;
}


const BloqueDatosPersonales:FC<BloqueDatosPersonalesProps> = ({numeroDeIdentificacion,datosPersonalesAlmacenados = datosPersonalesInicial}) =>{
  const [datosPersonalesState, setDatosPersonalesState] = useState(datosPersonalesAlmacenados);
  const [nacionalidades, setNacionalidades] = useState<Array<Nacionalidad>>([]);
  const {openSnackbar} = useGlobalContext();

  console.log("Numero de identificación:", numeroDeIdentificacion);
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
          console.log("Respuesta:", respuesta);
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
    console.log("Name of event:", event.target.name);
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
    console.log(value);
    setDatosPersonalesState(
      (previus) =>{
        return(
          {
            ...previus,
            fechaNacimiento:value,
            fechaNacimiento_modificado:true
            

          }
        )
      }
    )
  }
  const onDatosPersonalesSubmit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    
    const url = `${process.env.NEXT_PUBLIC_REGISTRO_SERVER_URL}/identifacil/api/datos_personales`;
    const datosDelFormulario:datosPersonales = Object.assign({},datosPersonalesState);
    datosDelFormulario.numeroDeIdentificacion = numeroDeIdentificacion;
    console.log("Datos a enviar:", datosDelFormulario.numeroDeIdentificacion);
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

    console.log("Respuesta:", respuesta);
  }

  return(
    <Box>
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
                <MenuItem value={'Soltero/a'}>Soltero/a</MenuItem>
                <MenuItem value={'Divorciado/a'}>Divorciado/a</MenuItem>
                <MenuItem value={'Concubinado/a'}>Concubinado/a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <DatePicker 
                  value={datosPersonalesState.fechaNacimiento} 
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
                {nacionalidades.map(
                  (data, id) =>{
                    return(
                      <MenuItem key={id} value={data.nacionalidad}>{data.nacionalidad}</MenuItem>
                    )
                  }
                )}
              
              
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel>Lugar de nacimiento</InputLabel>
              <OutlinedInput
                name="lugarNacimiento"
                value={datosPersonalesState.lugarNacimiento}
                onChange={onDatoChange}
                label="Lugar de Nacimiento"
              />
          </FormControl>
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
            <InputLabel>Barrio</InputLabel>
            <OutlinedInput
                name="barrio"
                value={datosPersonalesState.barrio}
                onChange={onDatoChange}
                label="Barrio"
              />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Compañia</InputLabel>
            <OutlinedInput
                name="compania"
                value={datosPersonalesState.compania}
                onChange={onDatoChange}
                label="Compañia"
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
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <FormLabel>Pertenece a un pueblo indigena</FormLabel>
            <RadioGroup
                value={datosPersonalesState.puebloIndigena}
                onChange={onOptionSelectChange}
                row
                aria-labelledby="gestioacion"
                name="puebloIndigena">                 
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
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="Nombre de la etnia"
            name="nombreEtnia"
            value={datosPersonalesState.nombreEtnia}
            onChange={onDatoChange}
            disabled={!datosPersonalesState.puebloIndigena}
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
                value={datosPersonalesState.pertenece_a_comunidad_lgbti}
                onChange={onOptionSelectChange}
                row
                aria-labelledby="gestioacion"
                name="pertenece_a_comunidad_lgbti">                 
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
        <Grid item sm={6}>
          <TextField
            fullWidth
            label="Nombre de la comunidad"
            name="nombreEtnia"
            value={datosPersonalesState.nombreEtnia}
            onChange={onDatoChange}
            disabled={!datosPersonalesState.pertenece_a_comunidad_lgbti}
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

function openSnackbar(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
