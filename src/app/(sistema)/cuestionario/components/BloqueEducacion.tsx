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
import {FC, useEffect, useState} from "react";
import {datosEducacionInicial, datosEducacionType} from "../../../../components/utils/systemTypes";

import React from "react";
import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useGlobalContext} from "@/app/Context/store";
import {LoadingButton} from "@mui/lab";

export interface BloqueEducacionProps {
    id_persona: number | null;
    datosEducacionIniciales?: datosEducacionType;
    handleAccordion?: (s: string)=>void;
}

const BloqueEducacion: FC<BloqueEducacionProps> = ({id_persona, datosEducacionIniciales, handleAccordion}) => {
    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [estadoFormularioDeEducacion, setEstadoFormularioDeEducacion] = useState<datosEducacionType>(datosEducacionInicial);

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    const {openSnackbar} = useGlobalContext();

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

    useEffect(() => {
        console.log('entro en useeffct educacion')
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

    const onGuardarClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                        id_persona:id_persona,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                });

                if (respuesta.success) {
                    setEstadoFormularioDeEducacion(prev=>({
                        ...prev,
                        id: respuesta.datos.id,
                    }))
                    openSnackbar("Datos guardados correctamente", "success")
                    setConsultaLoading(false)

                    if(handleAccordion){
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
                            <FormControlLabel
                                value="ninguna"
                                control={<Radio/>
                                } label="Ninguna"/>
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
                <Grid item sm={12} mt={3}>
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
            { estadoFormularioDeEducacion.tieneOficio ?
                <Grid container spacing={2}>
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
                </Grid>
            : null }
            <Grid container spacing={2} mt={3}>
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
                    <LoadingButton
                        sx={{
                            minHeight: "100%",
                            px: "48px",
                            height: '48px'
                        }}
                        onClick={onGuardarClick}
                        loading={consultaLoading}
                        loadingPosition='end'
                        variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                    </LoadingButton>
                </Grid>

            </Grid>
        </Box>
    )
}

export default BloqueEducacion;