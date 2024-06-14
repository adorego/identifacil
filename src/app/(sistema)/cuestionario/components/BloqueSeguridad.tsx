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
    RadioGroup, Typography
} from "@mui/material";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {datosSeguridadInicial, datosSeguridadType} from "@/components/utils/systemTypes";

import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

class datosPersonaType {
}

interface BloqueSeguridadProps {
    datosIniciales?: datosSeguridadType;
    id_persona: number | null;
    handleAccordion?: (s: string) => void;
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;
}

const BloqueSeguridad: FC<BloqueSeguridadProps> = ({datosIniciales = datosSeguridadInicial, id_persona, handleAccordion, onSetDatosPPL}) => {

    const estadoIncial = datosIniciales ? datosIniciales : datosSeguridadInicial
    const [estadoBloqueSeguridadFormulario, setEstadoBloqueSeguridadFormulario] = useState<datosSeguridadType>(estadoIncial);

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    const {data: session}: { data: any; } = useSession();
    const sessionData = PermissionValidator('crear_ppl_form_seguridad', session) || PermissionValidator('actualizar_ppl_form_seguridad', session);
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
        if(sessionData){
            setConsultaLoading(true)

            const methodForm = estadoBloqueSeguridadFormulario?.id  ? 'PUT' : 'POST';

            if (id_persona) {
                const url = estadoBloqueSeguridadFormulario?.id ?
                    `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/seguridad/${estadoBloqueSeguridadFormulario.id}`
                    : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/seguridad`



                const respuesta = await api_request(url, {
                    method: methodForm,
                    body: JSON.stringify({...estadoBloqueSeguridadFormulario, id_persona: id_persona}),
                    headers: {'Content-Type': 'application/json'}

                })
                if (respuesta.success) {
                    if(onSetDatosPPL){
                        onSetDatosPPL((prev:any)=>({
                            ...prev,
                            datosDeSeguridad: {
                                ...estadoBloqueSeguridadFormulario,
                                id: respuesta.datos.id,
                            }
                        }))
                    }

                    setEstadoBloqueSeguridadFormulario(prev=>({
                        ...prev,

                    }))
                    setConsultaLoading(false)
                    if(handleAccordion){
                        handleAccordion('')
                    }

                    openSnackbar("Datos guardados correctamente", "success")
                } else {
                    if (respuesta.error) {
                        setConsultaLoading(false)
                        openSnackbar(`Error al guardar los datos`, `error`);
                        log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                    }
                }

            } else {
                setConsultaLoading(false)
                openSnackbar("Falta el identifiicador de la persona", "error");
            }
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
            mx={2}
        >
            <Typography variant='h6' mb={3}>
                Formulario de Seguridad
            </Typography>
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
                {sessionData &&
                <Grid item sm={12}>
                    <LoadingButton
                        sx={{
                            minHeight: "100%",
                            px: "48px",
                            height: '48px'
                        }}
                        onClick={onFormSubmit}
                        loading={consultaLoading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                    </LoadingButton>

                </Grid>
                }
            </Grid>
        </Box>
    )
}

export default BloqueSeguridad;