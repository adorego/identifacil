import { Box, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, OutlinedInput, Radio, RadioGroup, Typography } from "@mui/material";
import { FC, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MuiFileInput } from "mui-file-input";

interface oficio_tipo{
  numeroDeDocumento:string;
  fechaDeDocumento:Dayjs | null;
  documeto:File | null;

}

interface resolucion_tipo{
  numeroDeDocumento:string;
  fechaDocumento:Dayjs | null;
  documento:File | null;
}

interface expediente_tipo{
  numeroDeDocumento:string;
  fechaDeDocumento:Dayjs | null;
}
interface datosJudiciales{
  situacionJudicial: string;
  situacionJudicial_modificado:boolean;
  primeraVezEnPrision: boolean;
  primeraVezEnPrision_modificado:boolean;
  cantidadDeIngresos: number;
  cantidadDeIngresos_modificado:boolean;
  causa: string;
  causa_modificado:boolean;
  oficio: string;
  oficio_modificado:boolean;
  ultimoTrabajo: string;
  ultimoTrabajo_modificado:boolean;
  oficioJudicial: oficio_tipo;
  oficioJudicial_modificado:boolean;
  resolucion: resolucion_tipo;
  resolucion_modificado:boolean;
  expediente: expediente_tipo;
  expediente_modificado:boolean;
  caratula: string;
  caratula_modificado:boolean;
  hechoPunible: string;
  hechoPunible_modificado:boolean;
  sentenciaDefinitiva?: string;
  sentenciaDefinitiva_modificado:boolean;
}

const datosJudicialesIniciales:datosJudiciales = {
  situacionJudicial: "",
  situacionJudicial_modificado:false,
  primeraVezEnPrision: false,
  primeraVezEnPrision_modificado:false,
  cantidadDeIngresos: 0,
  cantidadDeIngresos_modificado:false,
  causa:"",
  causa_modificado:false,
  oficio: "",
  oficio_modificado:false,
  ultimoTrabajo: "",
  ultimoTrabajo_modificado:false,
  oficioJudicial: {
    numeroDeDocumento:"",
    fechaDeDocumento:null,
    documeto:null,
  },
  oficioJudicial_modificado:false,
  resolucion: {
    numeroDeDocumento:"",
    fechaDocumento:null,
    documento:null
  },
  resolucion_modificado:false,
  expediente: {
    numeroDeDocumento:"",
    fechaDeDocumento:null
  },
  expediente_modificado:false,
  caratula: "",
  caratula_modificado:false,
  hechoPunible: "",
  hechoPunible_modificado:false,
  sentenciaDefinitiva: "",
  sentenciaDefinitiva_modificado:false,
}
interface BloqueJudicialProps{
  datosIniciales?:datosJudiciales;
}

const BloqueJudicial:FC<BloqueJudicialProps> = ({datosIniciales=datosJudicialesIniciales}) =>{
  const [estadoFormularioJudicial, setEstadoFormularioJudicial] = useState<datosJudiciales>(datosIniciales)
  
  
  const onDatoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(event.target.name);
    setEstadoFormularioJudicial(
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
    setEstadoFormularioJudicial(
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

  const onOficioJudicialFechaChange = (value:Dayjs | null, context: any) =>{
    
    setEstadoFormularioJudicial(
      (previus) =>{
        return(
          {
            ...previus,
            oficioJudicial:Object.assign({},{...previus.oficioJudicial,fechaDeDocumento:value})
          }
        )
      }
    )
  }

  const onFileOficioJudicialChange = (archivo:File | null) =>{
    setEstadoFormularioJudicial(
      (previus) =>{
        return(
          {
            ...previus,
            oficioJudicial:Object.assign({},{...previus.oficioJudicial,documeto:archivo})
          }
        )
      }
    )
  }

  const onFileResolucionMJChange = (archivo:File | null) =>{
    setEstadoFormularioJudicial(
      (previus) =>{
        return(
          {
            ...previus,
            resolucion:Object.assign({},{...previus.resolucion,documeto:archivo})
          }
        )
      }
    )
  }

  const onResolucionMJFechaChange = (value:Dayjs | null, context: any) =>{
    setEstadoFormularioJudicial(
      (previus) =>{
        return(
          {
            ...previus,
            resolucion:Object.assign({},{...previus.resolucion,fechaDeDocumento:value})
          }
        )
      }
    )
  }

  const onExpedienteFechaChange = (value:Dayjs | null, context: any) =>{
    setEstadoFormularioJudicial(
      (previus) =>{
        return(
          {
            ...previus,
            expediente:Object.assign({},{...previus.expediente,fechaDeDocumento:value})
          }
        )
      }
    )
  }

  
  
  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off">

      <Grid container spacing={2}>
        <Grid item sm={12}>
          <FormControl>
            <FormLabel id="situacionJudicial">Situación judicial</FormLabel>
              <RadioGroup
                value={estadoFormularioJudicial.situacionJudicial}
                onChange={onDatoChange}
                row
                aria-labelledby="situacionJudicial"
                name="situacionJudicial"
                            >
                <FormControlLabel 
                  value="procesado" 
                  control={<Radio />} 
                  label="Procesado"/>
                <FormControlLabel 
                  value="condenado" 
                  control={<Radio/>} 
                  label="Condenado"/>
              </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item sm={12}>
          <FormControl>
            <FormLabel id="primeraVezPrision">Primera vez en prisión:</FormLabel>
              <RadioGroup
                value={estadoFormularioJudicial.primeraVezEnPrision}
                onChange={onSelectChange}
                row
                aria-labelledby="primeraVezPrision"
                name="primeraVezEnPrision">
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
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="cantidadVecesPrision">Cantidad de veces de ingreso</InputLabel>
              <OutlinedInput
                disabled={estadoFormularioJudicial.primeraVezEnPrision}
                name="cantidadDeIngresos"
                value={estadoFormularioJudicial.cantidadDeIngresos}
                onChange={onDatoChange}
                label="Cantidad de veces de ingreso" />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography sx={{fontWeight:'bold', textTransform:'uppercase', mt:"10px"}}>Documento que ordena la reclusión</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography variant='h6'>Oficio judicial</Typography>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <FormControl fullWidth sx={{ marginTop: '17px',}}>
                  <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                    <OutlinedInput
                      name="oficioJudicial.numeroDocumento"
                      value={estadoFormularioJudicial.oficioJudicial.numeroDeDocumento}
                      label="Nro. de documento"
                      onChange={onDatoChange} />
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker 
                      value={estadoFormularioJudicial.oficioJudicial.fechaDeDocumento} 
                      format="DD/MM/YYYY"
                      onChange={onOficioJudicialFechaChange}
                      label={"Fecha del documento"} />
                </DemoContainer>

              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{pt:"8px"}}>
                  <MuiFileInput 
                    sx={{mt:"8px"}}
                    value={estadoFormularioJudicial.oficioJudicial.documeto} 
                    variant="outlined"
                    label="Seleccionar documento"
                    getInputText={(value) => value ? "Gracias" : "Documento"}
                    onChange={onFileOficioJudicialChange} />
                </FormControl>

              </Grid>
            </Grid>


        </Grid>
        {/* Resolucion MJ/DGEP  */}
        <Grid item sm={12}>
          <Typography variant='h6'>Resolución MJ/DGEP</Typography>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <FormControl fullWidth sx={{ marginTop: '17px',}}>
                  <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                    <OutlinedInput
                      name="oficioJudicial.numeroDocumento"
                      value={estadoFormularioJudicial.oficioJudicial.numeroDeDocumento}
                      label="Nro. de documento"
                      onChange={onDatoChange} />
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker 
                      value={estadoFormularioJudicial.oficioJudicial.fechaDeDocumento} 
                      format="DD/MM/YYYY"
                      onChange={onResolucionMJFechaChange}
                      label={"Fecha del documento"} />
                </DemoContainer>

              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{pt:"8px"}}>
                  <MuiFileInput 
                    value={estadoFormularioJudicial.oficioJudicial.documeto} 
                    variant="outlined"
                    label="Seleccionar documento"
                    onChange={onFileResolucionMJChange} />
                </FormControl>


              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item sm={12}>
                <Typography variant='h6'>Nro. de Expediente</Typography>
              </Grid>
              <Grid item sm={3}>
                <FormControl fullWidth sx={{ marginTop: '8px',}}>
                  <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                    <OutlinedInput
                      name="expediente.numeroDocumento"
                      value={estadoFormularioJudicial.expediente.numeroDeDocumento}
                      label="Nro. de documento"
                      onChange={onDatoChange} />
                                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                        value={estadoFormularioJudicial.expediente.fechaDeDocumento} 
                        format="DD/MM/YYYY"
                        onChange={onExpedienteFechaChange}
                        label={"Fecha del documento"} />
                  </DemoContainer>
              </Grid>
            </Grid>

        </Grid>
      </Grid>  
    </Box>
        
  )
}


export default BloqueJudicial;