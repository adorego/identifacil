import {
    Box,
    Button,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup, Typography
} from "@mui/material";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {datosEducacionInicial, datosEducacionType} from "../../../../components/utils/systemTypes";

import React from "react";
import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";
import {is} from "@react-spring/shared";

export interface BloqueEducacionProps {
    id_persona: number | null;
    datosEducacionIniciales?: datosEducacionType;
    handleAccordion?: (s: string) => void;
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;
}

const BloqueEducacion: FC<BloqueEducacionProps> = ({
                                                       id_persona,
                                                       datosEducacionIniciales,
                                                       handleAccordion,
                                                       onSetDatosPPL
                                                   }) => {
    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [estadoFormularioDeEducacion, setEstadoFormularioDeEducacion] = useState<datosEducacionType>(datosEducacionInicial);

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    const {data: session}: { data: any; } = useSession();
    const sessionData = PermissionValidator('crear_ppl_form_educacion', session) || PermissionValidator('actualizar_ppl_form_educacion', session);
    const {openSnackbar} = useGlobalContext();

    const onDatoChange = (event: React.ChangeEvent<HTMLInputElement>) => {

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

    useEffect(() => {

        if (datosEducacionIniciales) {
            setEstadoFormularioDeEducacion(prevState => {
                return {
                    ...prevState,
                    ...datosEducacionIniciales,
                    id_persona: id_persona,
                }
            })
        }

    }, [datosEducacionIniciales]);

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

    const formValidator = () => {
        let isValid = true;
        console.log('check 1')

        let checKInstitucionEducativa = false
        let checKOficio = false

        if (estadoFormularioDeEducacion.nivelAcademico == 'ninguna') {
            checKInstitucionEducativa = true
        } else if (!!estadoFormularioDeEducacion?.institucionEducativa) {
            checKInstitucionEducativa = true
        }


        if (!estadoFormularioDeEducacion.tieneOficio){
            checKOficio = true
        }else if(!!estadoFormularioDeEducacion.nombreOficio && estadoFormularioDeEducacion.tieneOficio){
            checKOficio = true
        }



        if (
            checKInstitucionEducativa
            && (checKOficio)
            && !!estadoFormularioDeEducacion.ultimoTrabajo
        ) {
            isValid = true
        } else {
            isValid = false
        }

        return isValid
    }

    const onGuardarClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (sessionData) {
            if (formValidator()) {
                const methodForm = estadoFormularioDeEducacion.id ? 'PUT' : 'POST';
                setConsultaLoading(true)

                if (id_persona) {
                    try {


                        const url = estadoFormularioDeEducacion.id ?
                            `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/educacion/${estadoFormularioDeEducacion.id}`
                            : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/educacion`

                        const respuesta = await api_request(url, {
                            method: methodForm,
                            body: JSON.stringify({
                                ...estadoFormularioDeEducacion,
                                id_persona: id_persona,
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }

                        });

                        if (respuesta.success) {
                            if (onSetDatosPPL) {
                                onSetDatosPPL((prev: any) => ({
                                    ...prev,
                                    datosEducacion: {
                                        ...estadoFormularioDeEducacion,
                                        id: respuesta.datos.id,
                                    },

                                }))
                            }
                            setEstadoFormularioDeEducacion(prev => ({
                                ...prev,
                                id: respuesta.datos.id,
                            }))
                            openSnackbar("Datos guardados correctamente", "success")
                            setConsultaLoading(false)

                            if (handleAccordion) {
                                handleAccordion('')
                            }
                        } else {
                            if (respuesta.error) {
                                setConsultaLoading(false)
                                openSnackbar(`Error al guardar los datos: ${respuesta.error.message}`, `error`);
                                log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                            }
                        }
                    } catch (error) {
                        setConsultaLoading(false)
                        openSnackbar(`Error al guardar los datos:${error}`, "error");
                    }


                    // console.log("Respuesta:", respuesta);
                } else {
                    openSnackbar("Falta el id de la persona", "error");
                }
            } else {
                openSnackbar("Completar campos requeridos", 'error')
            }
        } else {
            openSnackbar('No tienes permisos para realizar esta acción', 'warning')
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
                Formulario de Educacion
            </Typography>
            <Grid container spacing={2}>
                <Grid item sm={12}>
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
                                value="ninguna"
                                control={<Radio/>
                                } label="Ninguna"/>
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
                {estadoFormularioDeEducacion?.nivelAcademico !== 'ninguna' &&
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="institucionEducativa">Institución educativa</InputLabel>
                            <OutlinedInput
                                name="institucionEducativa"
                                label="Institución educativa"
                                error={!estadoFormularioDeEducacion?.institucionEducativa}
                                value={estadoFormularioDeEducacion?.institucionEducativa}
                                onChange={onDatoChange}
                            />
                            <FormHelperText>* Campo requerido</FormHelperText>
                        </FormControl>
                    </Grid>
                }
                <Grid item sm={12} mt={2}>
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
            </Grid>
            {estadoFormularioDeEducacion.tieneOficio ?
                <Grid container spacing={2}>
                    <Grid item sm={6} mt={2}>

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoOficio">Oficio</InputLabel>
                            <OutlinedInput
                                name="nombreOficio"
                                error={!estadoFormularioDeEducacion?.nombreOficio}
                                value={estadoFormularioDeEducacion?.nombreOficio}
                                label="Oficio"
                                onChange={onDatoChange}
                                disabled={!estadoFormularioDeEducacion.tieneOficio}
                            />
                            <FormHelperText>* Campo requerido</FormHelperText>
                        </FormControl>


                    </Grid>
                </Grid>
                : null}
            <Grid container spacing={2} mt={2}>
                <Grid item sm={6}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                        <OutlinedInput
                            name="ultimoTrabajo"
                            error={!estadoFormularioDeEducacion.ultimoTrabajo}
                            value={estadoFormularioDeEducacion.ultimoTrabajo}
                            label="Ultimo lugar de trabajo"
                            onChange={onDatoChange}
                        />
                        <FormHelperText>* Campo requerido</FormHelperText>
                    </FormControl>
                </Grid>
                {sessionData &&
                    <Grid item sm={12} mt={4}>
                        <LoadingButton
                            sx={{
                                minHeight: "100%",
                                px: "48px",
                                height: '48px'
                            }}
                            onClick={onGuardarClick}
                            loading={consultaLoading}
                            loadingPosition='start'
                            startIcon={<SaveIcon/>}
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

export default BloqueEducacion;