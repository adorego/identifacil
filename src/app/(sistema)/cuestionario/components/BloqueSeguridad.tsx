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
import React, {FC, useState} from "react";

import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {datosSeguridadInicial, datosSeguridadType} from "@/components/utils/systemTypes";





interface BloqueSeguridadProps {
    datosIniciales?: datosSeguridadType;
    numeroDeIdentificacion: string;
}

const BloqueSeguridad: FC<BloqueSeguridadProps> = (
    {
        datosIniciales = datosSeguridadInicial,
        numeroDeIdentificacion
    }) => {

    const [estadoBloqueSeguridadFormulario, setEstadoBloqueSeguridadFormulario] = useState<datosSeguridadType>(datosIniciales);
    const {openSnackbar} = useGlobalContext();
    // console.log(estadoBloqueSeguridadFormulario);
    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name);
        setEstadoBloqueSeguridadFormulario(
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

    const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoBloqueSeguridadFormulario(
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

    const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (numeroDeIdentificacion) {
            const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_seguridad`;
            const datosDelFormulario: datosSeguridadType = Object.assign({}, estadoBloqueSeguridadFormulario);

            datosDelFormulario.numeroDeIdentificacion = numeroDeIdentificacion;

            // console.log("Datos a enviar:", datosDelFormulario.numeroDeIdentificacion);
            const respuesta = await api_request(url, {
                method: 'POST',
                body: JSON.stringify(datosDelFormulario),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            if (respuesta.success) {
                openSnackbar("Datos guardados correctamente", "success")
            } else {
                if (respuesta.error) {
                    openSnackbar(`Error al guardar los datos`, `error`);
                    log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                }
            }

        } else {
            openSnackbar("Falta el número de identificación", "error");
        }
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="riesgoPersona;">¿Riesgo para el personal?</FormLabel>
                        <RadioGroup
                            value={estadoBloqueSeguridadFormulario.riesgoParaPersonal}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="riesgoPersona;"
                            name="riesgoParaPersonal">
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
                    {estadoBloqueSeguridadFormulario.riesgoParaPersonal
                        ? <FormControl fullWidth={true}>
                            <InputLabel htmlFor='riesgoParaPersonalRpta'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                disabled={!estadoBloqueSeguridadFormulario.riesgoParaPersonal}
                                name="riesgoParaPersonalRespuesta"
                                value={estadoBloqueSeguridadFormulario.riesgoParaPersonalRespuesta}
                                onChange={onDatoChange}
                                label="Observacion"/>
                        </FormControl> : null
                    }

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

                    {estadoBloqueSeguridadFormulario.riesgoParaReclusos ?
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
                        : null
                    }
                </Grid>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="riesgoOtroRecluso;">¿Riesgo de ser lesionado por otros reclusos?</FormLabel>
                        <RadioGroup
                            value={estadoBloqueSeguridadFormulario.riesgoDeSufrirLesionPorOtrosReclusos}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="riesgoOtroRecluso;"
                            name="riesgoDeSufrirLesionPorOtrosReclusos">
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
                    {
                        estadoBloqueSeguridadFormulario.riesgoDeSufrirLesionPorOtrosReclusos ?
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
                            : null
                    }

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
                    {estadoBloqueSeguridadFormulario.riesgoDeDanharLaPropiedad ?
                        < FormControl fullWidth={true}>
                            <InputLabel htmlFor='danhoPropiedadRpta'>
                                Observacion
                            </InputLabel>
                            <OutlinedInput
                                name="riesgoDeDanharLaPropiedadRespuesta"
                                value={estadoBloqueSeguridadFormulario.riesgoDeDanharLaPropiedadRespuesta}
                                onChange={onDatoChange}
                                label="Observacion"/>
                        </FormControl>
                        : null
                    }

                </Grid>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="grupoAmenaza;">¿Miembro de un grupo que constituye una amenaza para la
                            seguridad?</FormLabel>
                        <RadioGroup
                            value={estadoBloqueSeguridadFormulario.miembroDeGrupoQueConstituyeAmenazaParaSeguridad}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="grupoAmenaza;"
                            name="miembroDeGrupoQueConstituyeAmenazaParaSeguridad">
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
                    {estadoBloqueSeguridadFormulario.miembroDeGrupoQueConstituyeAmenazaParaSeguridad ?
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="miembroGrupoRpta">Nombre del grupo</InputLabel>
                            <OutlinedInput
                                name="miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta"
                                value={estadoBloqueSeguridadFormulario.miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta}
                                onChange={onDatoChange}
                                label="Nombre del grupo"/>
                        </FormControl>
                        : null
                    }

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
                                control={<Radio/>}
                                label="Si"/>
                            <FormControlLabel
                                value={false}
                                control={<Radio/>}
                                label="No"/>
                        </RadioGroup>
                    </FormControl>
                    {estadoBloqueSeguridadFormulario.tieneEntrenamientoMilitarPrevio ?

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="entrenamientoMilitarRpta">Agregar Respuesta</InputLabel>
                            <OutlinedInput
                                name="tieneEntrenamientoMilitarPrevioRespuesta"
                                value={estadoBloqueSeguridadFormulario.tieneEntrenamientoMilitarPrevioRespuesta}
                                onChange={onDatoChange}
                                label="Agregar Respuesta"/>
                        </FormControl>
                        : null
                    }

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
                    {estadoBloqueSeguridadFormulario.eraFuncionarioPublico ?
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='eraFuncionarioPublicoRespuesta'>Agregar cargo</InputLabel>
                            <OutlinedInput
                                name="eraFuncionarioPublicoRespuesta"
                                value={estadoBloqueSeguridadFormulario.eraFuncionarioPublicoRespuesta}
                                onChange={onDatoChange}
                                label="Agregar cargo"/>
                        </FormControl>
                        : null
                    }
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