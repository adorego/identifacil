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
import React, {FC, useEffect, useState} from "react";
import {datosSeguridadInicial, datosSeguridadType} from "@/components/utils/systemTypes";

import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";

interface BloqueSeguridadProps {
    datosIniciales?: datosSeguridadType;
    id_persona: number | null;
}

const BloqueSeguridad: FC<BloqueSeguridadProps> = ({datosIniciales = datosSeguridadInicial, id_persona}) => {

    console.log(id_persona)
    const estadoIncial = datosIniciales ? datosIniciales : datosSeguridadInicial
    const [estadoBloqueSeguridadFormulario, setEstadoBloqueSeguridadFormulario] = useState<datosSeguridadType>(estadoIncial);
    const {openSnackbar} = useGlobalContext();

    useEffect(() => {
        if(datosIniciales){
            setEstadoBloqueSeguridadFormulario(prevState => {
                    return{
                        ...prevState,
                        ...datosIniciales,
                        id_persona: id_persona,
                    }
                }
            )
        }
    }, [datosIniciales]);

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
        const methodForm = datosIniciales?.id  ? 'PUT' : 'POST';
        console.log(estadoBloqueSeguridadFormulario)
        if (id_persona) {
            const url = datosIniciales?.id ?
                `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/seguridad/${datosIniciales.id}`
                : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/seguridad`



            //console.log(JSON.stringify(estadoBloqueSeguridadFormulario))

            const respuesta = await api_request(url, {
                method: methodForm,
                body: JSON.stringify({...estadoBloqueSeguridadFormulario, id_persona: id_persona}),
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
            openSnackbar("Falta el identifiicador de la persona", "error");
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