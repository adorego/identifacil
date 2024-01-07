import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, OutlinedInput, Radio, RadioGroup } from "@mui/material";
import { FC, useState } from "react";

export interface datosEducacion {
  nivelAcademico: string;
  nivelAcademico_modificado:boolean;
  institucionEducativa: string;
  institucionEducativa_modificado:boolean;
  tieneOficio: boolean;
  tieneOficio_modificado:boolean;
  nombreOficio: string;
  nombreOficio_modificado:boolean;
  ultimoTrabajo: string;
  ultimoTrabajo_modificado:boolean;
}

const datosEducacionIniciales:datosEducacion = {
  nivelAcademico:"",
  nivelAcademico_modificado:false,
  institucionEducativa: "",
  institucionEducativa_modificado:false,
  tieneOficio: false,
  tieneOficio_modificado:false,
  nombreOficio: "",
  nombreOficio_modificado:false,
  ultimoTrabajo: "",
  ultimoTrabajo_modificado:false
} 

export interface BloqueEducacionProps{
  datosIniciales?:datosEducacion;
}
const BloqueEducacion:FC<BloqueEducacionProps> = ({datosIniciales = datosEducacionIniciales}) =>{
  const [estadoFormularioDeEducacion, setEstadoFormularioDeEducacion] = useState<datosEducacion>(datosIniciales);
  
  // console.log(estadoFormularioDeEducacion);

  const onDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(event.target.name);
    setEstadoFormularioDeEducacion(
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
    setEstadoFormularioDeEducacion(
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

  const onGuardarClick = (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
  }
  
  return(
    <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >

                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoEducacion">Nivel Academico</FormLabel>
                            <RadioGroup
                                value={estadoFormularioDeEducacion.nivelAcademico}
                                onChange={onDatoChange}
                                row
                                aria-labelledby="datoEducacion"
                                name="nivelAcademico"
                            >
                                <FormControlLabel 
                                  value="primaria" 
                                  control={<Radio/>
                                } label="Primaria"/>
                                <FormControlLabel 
                                  value="secundaria" 
                                  control={<Radio/>
                                } label="Secundaria"/>
                                <FormControlLabel 
                                  value="terciaria" 
                                  control={<Radio />
                                } label="Terciaria"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="institucionEducativa">Institución educativa</InputLabel>
                            <OutlinedInput
                                name="institucionEducativa"
                                label="Institución educativa"
                                value={estadoFormularioDeEducacion.institucionEducativa}
                                onChange={onDatoChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoOficio">Cuenta con algún oficio</FormLabel>
                            <RadioGroup
                                value={estadoFormularioDeEducacion.tieneOficio}
                                onChange={onSelectChange}
                                row
                                aria-labelledby="datoOficio"
                                name="tieneOficio"
                            >
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
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoOficio">Oficio</InputLabel>
                            <OutlinedInput
                                name="nombreOficio"
                                value={estadoFormularioDeEducacion.nombreOficio}
                                label="Oficio"
                                onChange={onDatoChange}
                                disabled={!estadoFormularioDeEducacion.tieneOficio}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                            <OutlinedInput
                                name="ultimoTrabajo"
                                value={estadoFormularioDeEducacion.ultimoTrabajo}
                                label="Ultimo lugar de trabajo"
                                onChange={onDatoChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12} mt={4}>
                        <Button variant='contained' onClick={onGuardarClick}>
                            Guardar
                        </Button>
                    </Grid>
                
        </Grid>
      </Box>
  )
}

export default BloqueEducacion;