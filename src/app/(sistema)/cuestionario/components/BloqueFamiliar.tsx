import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import { FC, useState } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import style from "./BloqueFamiliar.module.css";

interface familiar{
  nombre:string;
  apellido:string;
  vinculo:string;
  lugar:string;

}
interface datosFamiliares{
  esCabezaDeFamilia: boolean;
  esCabezaDeFamilia_modificado:boolean;
  tieneCirculoFamiliar:boolean;
  tieneCirculoFamiliar_modificado:boolean;
  familiares:Array<familiar>;
  tieneConcubino:boolean;
  concubino:datosConcubino;
  concubino_modificado:boolean;
}
const estadoDatosFamiliaresInicial:datosFamiliares = {
  esCabezaDeFamilia:false,
  esCabezaDeFamilia_modificado:false,
  tieneCirculoFamiliar:false,
  tieneCirculoFamiliar_modificado:false,
  familiares:[],
  tieneConcubino:false,
  concubino:{
    nombre:"",
    apellido:"",
    cedula:""
  },
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
}


const BloqueFamiliar:FC<BloqueFamiliarProps> = ({datosFamiliaresIniciales = estadoDatosFamiliaresInicial}) =>{
  const [estadoFormularioDatosFamiliares, setEstadoFormularioDatosFamiliares] = useState<datosFamiliares>(datosFamiliaresIniciales);
  const [familiarAAgregar,setFamiliarAAgregar] = useState<familiar>(familiarInicial);
  const [agregarFamiliar, setAgregarFamiliar] = useState<boolean>(false);
  
  const onDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    
    setEstadoFormularioDatosFamiliares(
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

  const manejadorVerFormularioNuevoFamiliar = (event:React.MouseEvent<HTMLButtonElement>) =>{
    setAgregarFamiliar(!agregarFamiliar);
  }
  const manejadorAgregarFamilia = (event:React.MouseEvent<HTMLButtonElement>) =>{
    setEstadoFormularioDatosFamiliares(
      (previus) => {
        previus.familiares.push(familiarAAgregar);
        return(
          {
            ...previus
            
          }
        )
      });
      setFamiliarAAgregar(familiarInicial);
  }

  const eliminarFamiliares = (event:React.MouseEvent<HTMLButtonElement>, indice:number) =>{
    setEstadoFormularioDatosFamiliares(
      (previus) =>{
        previus.familiares.splice(indice,1);
        return{
          ...previus,

          
        }
      }
    )
  }

  const onConcubinoCompleted = (concubino:datosConcubino):void =>{
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
                <Grid item sm={12} >
                  <Button variant="contained" 
                    sx={{marginBottom:"10"}}
                    startIcon={<PersonAddIcon />}
                    onClick={manejadorAgregarFamilia}>
                      Agregar familiar
                  </Button>
                </Grid>
            
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
              </Grid>
              <BloqueCirculoFamiliar 
              tieneCirculoFamiliar={true} 
              listaDeFamiliares={estadoFormularioDatosFamiliares.familiares} 
              onEliminarItem={eliminarFamiliares}/>
            </>

          }
          
          
        
        {/* CONCUBINO */}
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
        <ConcubinoForm 
          mostrarFormularioConcubino={estadoFormularioDatosFamiliares.tieneConcubino}
          onConcubinoFilled={onConcubinoCompleted} />
        

      </Box>      
  )
} 

interface BloqueCirculoFamiliarProps{
  tieneCirculoFamiliar:boolean;
  listaDeFamiliares:Array<familiar>;
  onEliminarItem:(event:React.MouseEvent<HTMLButtonElement>, indice:number) => void;
}
const BloqueCirculoFamiliar:FC<BloqueCirculoFamiliarProps> = ({tieneCirculoFamiliar, listaDeFamiliares, onEliminarItem}) =>{
  return(
    (tieneCirculoFamiliar && listaDeFamiliares.length > 0) ? 
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
  cedula:string;
  nombre:string;
  apellido:string;

}
const datosConcubinoInicial = {
  cedula:"",
  nombre:"",
  apellido:""
}

interface ConcubinoFormProps{
  mostrarFormularioConcubino:boolean;
  onConcubinoFilled:(concubino:datosConcubino) => void;
}
const ConcubinoForm:FC<ConcubinoFormProps> = ({mostrarFormularioConcubino,onConcubinoFilled}) =>{
  const [concubino, setConcubino] = useState<datosConcubino>(datosConcubinoInicial);

  const verificarConcubino = () =>{
    if(concubino.nombre && concubino.apellido && concubino.cedula){
      onConcubinoFilled(concubino);
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
    verificarConcubino();
  }
  if(mostrarFormularioConcubino){
    return(
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <FormControl fullWidth={true}>
            <TextField
              name="cedula"
              value={concubino.cedula}
              label="Nro. de documento"
              onChange={onChangeHandler} />
        </FormControl>
      </Grid>                
      <Grid item sm={4}>
        <FormControl fullWidth={true}>
          <TextField                              
            name="nombre"
            value={concubino.nombre}
            label="Nombre"
            onChange={onChangeHandler}/>
        </FormControl>
      </Grid>
      <Grid item sm={4}>
        <FormControl fullWidth={true}>
          <TextField
            name="apellido"
            value={concubino.apellido}
            label="Apellido"
            onChange={onChangeHandler}/>
        </FormControl>
      </Grid>
    </Grid>
  
    )  
  }
  return null;            
}

export default BloqueFamiliar;