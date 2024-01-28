import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import { FC, useState } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { api_request } from "@/lib/api-request";
import log from "loglevel";
import style from "./BloqueFamiliar.module.css";
import { useGlobalContext } from "@/app/Context/store";

interface familiar{
  nombre:string;
  apellido:string;
  vinculo:string;
  lugar:string;

}
interface datosFamiliares{
  numeroDeIdentificacion:string;
  esCabezaDeFamilia: boolean;
  esCabezaDeFamilia_modificado:boolean;
  tieneCirculoFamiliar:boolean;
  tieneCirculoFamiliar_modificado:boolean;
  familiares:Array<familiar> | null;
  familiares_modificado:boolean;
  tieneConcubino:boolean;
  tieneConcubino_modificado:boolean;
  concubino:datosConcubino | null;
  concubino_modificado:boolean;
}
const estadoDatosFamiliaresInicial:datosFamiliares = {
  numeroDeIdentificacion:"",
  esCabezaDeFamilia:false,
  esCabezaDeFamilia_modificado:false,
  tieneCirculoFamiliar:false,
  tieneCirculoFamiliar_modificado:false,
  familiares:null,
  familiares_modificado:false,
  tieneConcubino:false,
  tieneConcubino_modificado:false,
  concubino:null,
  concubino_modificado:false,

}

const familiarInicial:familiar = {
  nombre:"",
  apellido:"",
  vinculo:"",
  lugar:""
}

interface BloqueFamiliarProps{
  datosFamiliaresIniciales?:datosFamiliares;
  numeroDeIdentificacion:string;
}


const BloqueFamiliar:FC<BloqueFamiliarProps> = ({numeroDeIdentificacion, datosFamiliaresIniciales = estadoDatosFamiliaresInicial}) =>{
  const [estadoFormularioDatosFamiliares, setEstadoFormularioDatosFamiliares] = useState<datosFamiliares>(datosFamiliaresIniciales);
  const [familiarAAgregar,setFamiliarAAgregar] = useState<familiar>(familiarInicial);
  const [agregarFamiliar, setAgregarFamiliar] = useState<boolean>(false);
  const {openSnackbar} = useGlobalContext();
  
  
  const onSelectChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setEstadoFormularioDatosFamiliares(
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

  const onFamiliarDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setFamiliarAAgregar(
      (previus) =>{
        return(
          {
            ...previus,
            [event.target.name]:(event.target.value)
          }
        )
      }
    )
  }

  
  const manejadorAgregarFamilia = (event:React.MouseEvent<HTMLButtonElement>) =>{
    setEstadoFormularioDatosFamiliares(
      (previus) => {
        if(!previus.familiares){
          previus.familiares = [];
        }
        previus.familiares.push(familiarAAgregar);
        return(
          {
            ...previus,
            familiares_modificado:true
            
          }
        )
      });
      
      setFamiliarAAgregar(familiarInicial);
  }

  const eliminarFamiliares = (event:React.MouseEvent<HTMLButtonElement>, indice:number) =>{
    setEstadoFormularioDatosFamiliares(
      (previus) =>{
        if(!previus.familiares){
          previus.familiares = [];
        }
        previus.familiares.splice(indice,1);
        return{
          ...previus,

          
        }
      }
    )
  }

  const onConcubinoCompleted = (concubino:datosConcubino | null):void =>{
    setEstadoFormularioDatosFamiliares(
      (previus) =>{
        return{
          ...previus,
          concubino:Object.assign({},concubino),
          concubino_modificado:true
        }
      }
    )
  }

  const onEliminarConcubino = (event:React.MouseEvent<HTMLButtonElement>) =>{
    setEstadoFormularioDatosFamiliares(
      (previus) =>{
        return{
          ...previus,
          concubino:null
        }
      }
    )
  }
  const onDatosFamiliaresSubmit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(numeroDeIdentificacion){
      const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_familiares`;
      const datosDelFormulario:datosFamiliares = Object.assign({},estadoFormularioDatosFamiliares);
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
      autoComplete="off">
        <Grid container spacing={2}>
            <Grid item sm={12}>
              <FormControl>
                <FormLabel id="datoLiderFamilia">¿Es la cabeza de familia/sustento de la familia?</FormLabel>
                  <RadioGroup
                    value={estadoFormularioDatosFamiliares.esCabezaDeFamilia}
                    onChange={onSelectChange}
                    row
                    aria-labelledby="cabezaDeFamilia"
                    name="esCabezaDeFamilia">
                    <FormControlLabel 
                      value={true} 
                      control={<Radio/>} 
                      label="Si"/>
                    <FormControlLabel 
                      value={false} 
                      control={<Radio />} 
                      label="No"/>
                  </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                  <FormLabel id="circuloFamiliarLabel">Tiene Círculo Familiar en el Sistema:</FormLabel>
                  <RadioGroup
                    value={estadoFormularioDatosFamiliares.tieneCirculoFamiliar}
                    onChange={onSelectChange}
                    row
                    aria-labelledby="circuloFamiliarLabel"
                    name="tieneCirculoFamiliar" >
                                  <FormControlLabel 
                                    value={true}
                                    control={<Radio /> } 
                                    label="Si"/>
                                  <FormControlLabel 
                                    value={false} 
                                    control={<Radio />} 
                                    label="No"/>
                  </RadioGroup>
            </FormControl>
          </Grid>
          {estadoFormularioDatosFamiliares.tieneCirculoFamiliar && 
          <>
          <Grid container spacing={2} component={'div'} >
              <Grid item sm={3}>
                      <FormControl fullWidth={true} sx={{marginTop:"10px"}}>
                            <TextField
                              name="nombre"
                              value={familiarAAgregar.nombre}
                              label='Nombre'
                              onChange={onFamiliarDatoChange} />
                      </FormControl>
              </Grid>
              <Grid item sm={3}>
                      <FormControl fullWidth={true} sx={{marginTop:"10px"}}>
                            <TextField
                              name="apellido"
                              value={familiarAAgregar.apellido}
                              label='Apellido'
                              onChange={onFamiliarDatoChange} />
                      </FormControl>
              </Grid>
              <Grid item sm={3}>
                      <FormControl fullWidth={true} sx={{marginTop:"10px"}}>
                            <TextField
                              helperText="ej. Primo"
                              label={'Vinculo'}
                              name="vinculo"
                              value={familiarAAgregar.vinculo}
                              onChange={onFamiliarDatoChange} />
                      </FormControl>
              </Grid>
              <Grid item sm={3}>
                      <FormControl fullWidth={true} sx={{marginTop:"10px"}}>
                            <TextField
                              name="lugar"
                              value={familiarAAgregar.lugar}
                              label='Lugar'
                              helperText={'Lugar del sistema, ej. Tacumbu'}
                              onChange={onFamiliarDatoChange} />
                      </FormControl>
              </Grid>
              <Grid item sm={12} sx={{ml:"15px"}}>
                      <Button variant="contained" 
                        sx={{marginBottom:"10"}}
                        startIcon={<PersonAddIcon />}
                        onClick={manejadorAgregarFamilia}>
                          Agregar familiar
                      </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12}>
                <BloqueCirculoFamiliar 
                tieneCirculoFamiliar={true} 
                listaDeFamiliares={estadoFormularioDatosFamiliares.familiares} 
                onEliminarItem={eliminarFamiliares}/>
              </Grid>
            </Grid>
            </>

          }
          
          
        
        {/* CONCUBINO */}
        <Grid container>
          <Grid item sm={12} mt={2}>
            <FormControl>
                <FormLabel id="datoLiderFamilia">Concubino</FormLabel>
                  <RadioGroup
                    value={estadoFormularioDatosFamiliares.tieneConcubino}
                    onChange={onSelectChange}
                    row
                    aria-labelledby="datoLiderFamilia"
                    name="tieneConcubino">
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
          </Grid>
          <Grid item sm={12}>
            <ConcubinoForm 
              mostrarFormularioConcubino={estadoFormularioDatosFamiliares.tieneConcubino}
              onConcubinoFilled={onConcubinoCompleted} 
              concubinoAMostrar={estadoFormularioDatosFamiliares.concubino}
              eliminarConcubino={onEliminarConcubino}/>
          </Grid>
          <Grid item sm={12}>
            {/* <Stack direction="row" spacing={2}> */}
              <Button variant='contained' onClick={onDatosFamiliaresSubmit}>
                Guardar
              </Button>
              {/* <Button variant='outlined'>
                Cancelar
              </Button> */}
            {/* </Stack> */}
          </Grid>
         </Grid> 
      </Grid>
    </Box>      
  )
} 

interface BloqueCirculoFamiliarProps{
  tieneCirculoFamiliar:boolean;
  listaDeFamiliares:Array<familiar> | null;
  onEliminarItem:(event:React.MouseEvent<HTMLButtonElement>, indice:number) => void;
}
const BloqueCirculoFamiliar:FC<BloqueCirculoFamiliarProps> = ({tieneCirculoFamiliar, listaDeFamiliares, onEliminarItem}) =>{
  return(
    (tieneCirculoFamiliar && listaDeFamiliares && listaDeFamiliares.length > 0) ? 
    <>
      <Grid container spacing={2} alignItems={"center"}>
                <Grid item>
                  <FormControl fullWidth={true}>
                    <FormLabel>Lista de Familiares en el Sistema Penitenciario</FormLabel>
                  </FormControl> 
                </Grid>
                
                
      </Grid> 
      <ListaDeFamiliares listaDeFamiliares={listaDeFamiliares} onEliminarFamiliar={onEliminarItem} />
    </>
    
    
    
    
    : null
  )
}

interface ListaDeFamiliaresProps{
  listaDeFamiliares:Array<familiar>;
  onEliminarFamiliar:(event:React.MouseEvent<HTMLButtonElement>, indice:number) =>void;
}

const ListaDeFamiliares:FC<ListaDeFamiliaresProps> = ({listaDeFamiliares, onEliminarFamiliar}) =>{
  return(
    listaDeFamiliares.map(
      (familiar, index) =>{
        return (
        <Grid container spacing={2} mt={2} key={index}>
          
          <Grid item sm={3}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="familiaNombre">Nombre</InputLabel>
                <OutlinedInput
                  name="nombre"
                  value={familiar.nombre}
                  />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="familiaNombre">Apellido</InputLabel>
                <OutlinedInput
                  name="apellido"
                  value={familiar.apellido}
                  />
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="datoVinfamiliaVinculoculoFamiliar">Vinculo</InputLabel>
                <OutlinedInput
                  name="vinculo"
                  value={familiar.vinculo}
                  />
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="familiaNombre">Lugar</InputLabel>
                <OutlinedInput
                  name="lugar"
                  value={familiar.lugar}
                  />
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={(event) =>onEliminarFamiliar(event,index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>)
      }
    )
  )
}
interface datosConcubino{
  numeroDeIdentificacion:string;
  nombres:string;
  apellidos:string;

}
const datosConcubinoInicial = {
  numeroDeIdentificacion:"",
  nombres:"",
  apellidos:""
}

interface ConcubinoFormProps{
  mostrarFormularioConcubino:boolean;
  onConcubinoFilled:(concubino:datosConcubino | null) => void;
  concubinoAMostrar:datosConcubino | null;
  eliminarConcubino:(event:React.MouseEvent<HTMLButtonElement>) => void;
}
const ConcubinoForm:FC<ConcubinoFormProps> = 
({mostrarFormularioConcubino,onConcubinoFilled, concubinoAMostrar, eliminarConcubino}) =>{
  const [concubino, setConcubino] = useState<datosConcubino>(datosConcubinoInicial);

  const verificarConcubino = () =>{
    if(concubino.nombres.length > 0 && concubino.apellidos.length > 0 && concubino.numeroDeIdentificacion.length > 0){
      onConcubinoFilled(concubino);
    }else{
      onConcubinoFilled(null);
    }
  }
  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setConcubino((previus) =>{
       return(
        {
          ...previus,
          [event.target.name]:event.target.value
        })
      
    });
    
  }
  const manejadorAgregarConcubino = (event:React.MouseEvent<HTMLButtonElement>) =>{
    verificarConcubino();
  }
  if(mostrarFormularioConcubino){
    return(
    <>  
      <Grid container spacing={2}>
      
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
              <TextField
                name="numeroDeIdentificacion"
                value={concubino.numeroDeIdentificacion}
                label="Nro. de documento"
                onChange={onChangeHandler} />
          </FormControl>
        </Grid>                
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <TextField                              
              name="nombres"
              value={concubino.nombres}
              label="Nombre"
              onChange={onChangeHandler}/>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth={true}>
            <TextField
              name="apellidos"
              value={concubino.apellidos}
              label="Apellido"
              onChange={onChangeHandler}/>
          </FormControl>
        </Grid>
        <Grid item sm={12} alignContent={'flex-end'}>
          <Button variant="contained" 
                      sx={{marginBottom:"10"}}
                      startIcon={<PersonAddIcon />}
                      onClick={manejadorAgregarConcubino}>
                        Agregar Concubino
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sm={12}>
        <Grid item sm={12}>
          <FormControl fullWidth={true} sx={{mt:"20px", mb:"20px"}}>
            <FormLabel>Concubino Agregado</FormLabel>
          </FormControl> 
        </Grid>
        {concubinoAMostrar != null  && 
        <Grid container spacing={2}>
          <Grid item sm={3}>
              <TextField
              disabled={true}
              name="cedula"
              value={concubinoAMostrar?.numeroDeIdentificacion}
              label="Nro. de documento"
              />
          </Grid>
          <Grid item sm={3}>
            <TextField
            disabled={true}
            name="nombres"
            value={concubinoAMostrar?.nombres}
            label="Nombres"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
            disabled={true}
            name="apellidos"
            value={concubinoAMostrar?.apellidos}
            label="Apellidos"
            />
          </Grid>
          <Grid item sm={1} alignSelf={'center'}>
            <IconButton onClick={eliminarConcubino}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        }
      </Grid>
    </>
  
    )  
  }
  return null;            
}

export default BloqueFamiliar;