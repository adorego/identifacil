import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup
} from "@mui/material";
import {FC, useEffect, useState} from "react";
import { datosEducacionInicial, datosEducacionType } from "../../../../components/utils/systemTypes";

import React from "react";
import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";

export interface BloqueEducacionProps{
  id_persona:number;
  datosEducacionIniciales?:datosEducacionType;
}
const BloqueEducacion:FC<BloqueEducacionProps> = ({id_persona, datosEducacionIniciales=datosEducacionInicial}) =>{
  const [estadoFormularioDeEducacion, setEstadoFormularioDeEducacion] = useState<datosEducacionType>(datosEducacionIniciales);
  const {openSnackbar} = useGlobalContext();
  // console.log(estadoFormularioDeEducacion);

    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name);
        setEstadoFormularioDeEducacion(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: event.target.value,
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

    // useEffect(() => {
    //     if (datosEducacionIniciales) {
    //         setEstadoFormularioDeEducacion(prevState => {
    //             return{
    //                 ...prevState,
    //                 id_persona: datosEducacionIniciales.id_persona,
    //                 nivelAcademico: datosEducacionIniciales.nivelAcademico,
    //                 nivelAcademico_modificado: datosEducacionIniciales.nivelAcademico_modificado,
    //                 institucionEducativa: datosEducacionIniciales.institucionEducativa,
    //                 institucionEducativa_modificado: datosEducacionIniciales.institucionEducativa_modificado,
    //                 tieneOficio: datosEducacionIniciales.tieneOficio,
    //                 tieneOficio_modificado: datosEducacionIniciales.tieneOficio_modificado,
    //                 nombreOficio: datosEducacionIniciales.nombreOficio,
    //                 nombreOficio_modificado: datosEducacionIniciales.nombreOficio_modificado,
    //                 ultimoTrabajo: datosEducacionIniciales.ultimoTrabajo,
    //                 ultimoTrabajo_modificado: datosEducacionIniciales.ultimoTrabajo_modificado
    //             }
    //         })
    //     }

    // }, [datosEducacionIniciales]);

    const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoFormularioDeEducacion(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: (event.target.value === "true"),
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }

  const onGuardarClick = async (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(id_persona){
      try{
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/registro_educacion`;
        const datosDelFormulario:datosEducacionType = Object.assign({},estadoFormularioDeEducacion);
        datosDelFormulario.id_persona = id_persona;
        console.log("Datos a enviar:", datosDelFormulario);
        const respuesta = await api_request(url,{
          method:'POST',
          body:JSON.stringify(datosDelFormulario),
          headers: {
              'Content-Type': 'application/json'
          }

                });

                if (respuesta.success) {
                    openSnackbar("Datos guardados correctamente", "success")
                } else {
                    if (respuesta.error) {
                        openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`, `error`);
                        log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                    }
                }
            } catch (error) {
                openSnackbar(`Error al guardar los datos:${error}`, "error");
            }


      // console.log("Respuesta:", respuesta);
    }else{
      openSnackbar("Falta el id de la persona","error");
    }
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
                            value={estadoFormularioDeEducacion?.nivelAcademico}
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
                                control={<Radio/>
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
                            value={estadoFormularioDeEducacion?.institucionEducativa}
                            onChange={onDatoChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item sm={6}>
                    <FormControl>
                        <FormLabel id="datoOficio">Cuenta con algún oficio</FormLabel>
                        <RadioGroup
                            value={estadoFormularioDeEducacion?.tieneOficio}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="datoOficio"
                            name="tieneOficio"
                        >
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
                </Grid>
                <Grid item sm={6}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="datoOficio">Oficio</InputLabel>
                        <OutlinedInput
                            name="nombreOficio"
                            value={estadoFormularioDeEducacion?.nombreOficio}
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