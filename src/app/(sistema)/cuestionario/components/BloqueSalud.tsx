import React, {FC, useState, useEffect, ReactNode, SyntheticEvent} from "react";
import {
    Autocomplete, AutocompleteRenderInputParams, Box, Button, Chip, FormControl, FormControlLabel,
    FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup,
    Select, SelectChangeEvent, Stack, TextField, Typography
} from "@mui/material";
import {datosDeSalud2Initial, datosDeSalud2Type} from "@/components/utils/systemTypes";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useGlobalContext} from "@/app/Context/store";
import {api_request} from "@/lib/api-request"
import log from "loglevel";

const arraySaludMental = [
    'sigue_tratamiento_mental',
    "sigue_tratamiento_mental_modificado",
    "tiene_antecedentes_de_lesiones_autoinflingidas",
    "tiene_antecedentes_de_lesiones_autoinflingidas_modificado",
    "ha_estado_internado_en_hospital_psiquiatrico",
    "ha_estado_internado_en_hospital_psiquiatrico_modificado",
    "reporta_abuso_de_droga_previo_al_ingreso",
    "reporta_abuso_de_droga_previo_al_ingreso_modificado",
    "medicacion_actual",
    "medicacion_actual_modificada",
    "tiene_afeccion_severa_por_estupefacientes",
    "tiene_afeccion_severa_por_estupefaciente_modificado",
];

const arraySaludFisica = [
    "discapacidad_fisica",
    "discapacidad_modificada",
    "explicacion_discapacidad_fisica",
]

const arrayLimitacionesIdiomaticas = [
    "necesitaInterprete",
    "necesitaInterprete_modificado",
    "tieneDificultadParaLeerYEscribir",
    "tieneDificultadParaLeerYEscribir_modificado",
]

interface BloqueSaludProps {
    id_persona: number | null;
    datosAlmacenados?: datosDeSalud2Type;
}

interface datosSaludSelect {
    grupos_sanguineos: Array<{
        id: number,
        label: string
    }>;
    vacunas_recibidas: Array<{
        id: number,
        label: string
    }>;

}

const datosSaludSelectInicial: datosSaludSelect = {
    grupos_sanguineos: [{id: 1, label: "A"}, {id: 2, label: "A+"}, {id: 3, label: "A-"}],
    vacunas_recibidas: [{id: 1, label: "Covid 1era dosis"}, {id: 2, label: "Covid 2da dosis"}, {id: 3, label: "Covid 3era dosis"}]
}


const BloqueSalud: FC<BloqueSaludProps> = ({id_persona, datosAlmacenados = datosDeSalud2Initial}) => {
    const [datosSaludSelectState, setDatosSaludSeelect] = useState<datosSaludSelect>(datosSaludSelectInicial);
    const [datosSalud, setDatosSalud] = useState<datosDeSalud2Type>({}); //datosDeSalud2Initial
    const {openSnackbar} = useGlobalContext();


    /*useEffect(() => {
        if (datosAlmacenados) {
            setDatosSalud(prev => {
                return {
                    ...prev,
                    ...datosAlmacenados
                }
            })
        }
    }, [datosAlmacenados])*/


    const onTiempoDeGestacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        const meses = parseInt(event.target.value);
        if (meses > 9) {
            openSnackbar("Los meses de gestación deben ser menores a 9", "error");
            // datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION, payload: 0});

        } else {
            // datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION, payload: event.currentTarget.value});
        }
    }

    const onFechaPartoChange = (value: Dayjs | null | string, context: any) => {
        // console.log(value,context);
        if (value && value < dayjs()) {
            openSnackbar("La mínima fecha de parto puede ser hoy", "error");
            // datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: dayjs()})
        } else if (value && value > dayjs().add(9, 'M')) {
            openSnackbar("La máxima fecha de parto puede ser en 9 meses", "error");
            //datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: dayjs()})
        } else {
            // datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: value})
        }

    }


    const onVacunasRecibidasChange = (event: React.SyntheticEvent, value: Array<{
        id: number,
        label: string
    }>, reason: string) => {
        // console.log(value);
        setDatosSalud(prev => ({
            ...prev,
            vacunas_recibidas: value,
        }))
    }

    const onGruposSanguineoChange = (event: React.SyntheticEvent, value: any, reason: string) => {

        setDatosSalud(prev => ({
            ...prev,
            grupo_sanguineo: value,
        }))
    }

    const onMedicacionActualChange = (event: SyntheticEvent<Element, Event>, value: any) => {
        // console.log(value);
        setDatosSalud(prev => ({
            ...prev,
            medicacion_actual: value,
            medicacion_actual_modificado: true,
        }))
    }

    // Ejemplo de manejador de evento para un campo
    const handleChange = (event: any) => {




        if (arraySaludMental.includes(event.target.name)) {
            setDatosSalud((prev) => ({
                ...prev,
                saludMental: {
                    ...prev.saludMental,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        } else if (arraySaludFisica.includes(event.target.name)) {

            setDatosSalud((prev) => ({
                ...prev,
                saludFisica: {
                    ...prev.saludFisica,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        } else if (arrayLimitacionesIdiomaticas.includes(event.target.name)) {

            setDatosSalud((prev) => ({
                ...prev,
                limitacionesIdiomaticas: {
                    ...prev.limitacionesIdiomaticas,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        } else {
            setDatosSalud((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
                [`${event.target.name}_modificado`]: true
            }));
        }

    };


    const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
        setDatosSalud(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
                [`${event.target.name}_modificado`]: true
            }
        });
    };
    // Para campos booleanos o específicos, puedes adaptar el manejador así
    const handleBooleanChange = (event: { target: { name: string; value: boolean; }; }) => {
        console.log(event.target.value)
        if (arraySaludMental.includes(event.target.name)) {
            setDatosSalud((prev) => ({
                ...prev,
                saludMental: {
                    ...prev.saludMental,
                    [event.target.name]: event.target.value as boolean,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }
        /*setDatosSalud((prev) => ({
            ...prev,
            [name]: event.target.value,
            [`${name}_modificado`]: true
        }));*/
    };

    // Para DatePicker y otros controles personalizados
    const handleDateChange = (name: string, date: Dayjs | null) => {
        setDatosSalud((prev) => ({
            ...prev,
            [name]: date ? date.toISOString() : null, // Ajusta según sea necesario
            [`${name}_modificado`]: true
        }));
    };


    const onDatosSaludSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/salud/${datosSalud.id}`;
        console.log(JSON.stringify(datosSalud))

        /*const datosDelFormulario: datosDeSalud2Type = Object.assign({}, datosSalud);
        datosDelFormulario.id_persona = id_persona;
        const methodForm = datosSalud.id ? 'PUT' : 'POST';
        console.log('TIPO FORM: ' + methodForm)
        const respuesta = await api_request(url, {
            method: methodForm,
            body: JSON.stringify(datosDelFormulario),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        if (respuesta.success) {
            openSnackbar("Datos guardados correctamente", "success")
        } else {
            openSnackbar(`Error al guardar los datos: ${respuesta.datos.message}`, `error`);
            // log.error("Error al guardar los datos", respuesta.datos);
        }

        console.log("Respuesta:", respuesta);*/
    }


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
                mx={2}>
                <Typography variant='h6' mb={3}>
                    Formulario de salud
                </Typography>
                <Grid container mb={2}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="afeccionDrogas">Cuenta con alguna afección por el consumo excesivo de
                                sustancias estupefacientes o drogas prohibidas.</FormLabel>
                            <RadioGroup
                                value={datosSalud.tieneAfeccionADrogras}
                                onChange={handleChange}
                                row
                                name="tieneAfeccionADrogras">
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

                <Grid container spacing={2} my={0}>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <Autocomplete
                                onChange={onGruposSanguineoChange}
                                disablePortal
                                fullWidth
                                sx={{margin: 0, width: '100%'}}
                                renderOption={(props, option) => <li {...props} key={option.id}>{option.label}</li>}
                                renderInput={function (params: AutocompleteRenderInputParams): ReactNode {
                                    return (
                                        <TextField ref={params.InputProps.ref} {...params} label="Grupo Sanguineo"
                                                   variant="outlined"
                                                   sx={{margin: '0 !important', width: '100% !important'}}/>
                                    )
                                }}
                                options={datosSaludSelectState?.grupos_sanguineos}

                            />

                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <Autocomplete
                                multiple
                                fullWidth
                                onChange={onVacunasRecibidasChange}
                                id="id-vacunas-recibidas"
                                options={datosSaludSelectState.vacunas_recibidas}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.label}
                                        </li>
                                    );
                                }}
                                renderTags={(tagValue, getTagProps) => {
                                    return tagValue.map((option, index) => (
                                        <Chip {...getTagProps({index})} key={option.id} label={option.label}/>
                                    ))
                                }}
                                renderInput={(params) => (
                                    <TextField ref={params.InputProps.ref} {...params} variant="outlined"
                                               label="Vacunas recibidas!" placeholder="Seleccionar"
                                               sx={{margin: '0 !important', width: '100% !important'}}/>
                                )}
                            />

                        </FormControl>
                    </Grid>

                </Grid>
                <Grid container spacing={2} my={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Control de signos vitales</FormLabel>
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <Stack spacing={2} direction={'row'}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="pa">PA</InputLabel>
                                <OutlinedInput
                                    name="presion_arterial"
                                    value={datosSalud.presion_arterial}
                                    label="PA"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="fc">FC</InputLabel>
                                <OutlinedInput
                                    name="frecuencia_cardiaca"
                                    value={datosSalud.frecuencia_cardiaca}
                                    label="FC"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FR">FR</InputLabel>
                                <OutlinedInput
                                    name="frecuencia_respiratoria"
                                    value={datosSalud.frecuencia_respiratoria}
                                    onChange={handleChange}
                                    label="FR"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="t">Temperatura</InputLabel>
                                <OutlinedInput
                                    name="temperatura"
                                    label='Temperatura'
                                    value={datosSalud.temperatura}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="peso">Peso</InputLabel>
                                <OutlinedInput
                                    name="peso"
                                    value={datosSalud.peso}
                                    onChange={handleChange}
                                    label="Peso"
                                />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="talla">Talla</InputLabel>
                                <OutlinedInput
                                    name="talla"
                                    value={datosSalud.talla}
                                    onChange={handleChange}
                                    label="Talla"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="imc">IMC</InputLabel>
                                <OutlinedInput
                                    name="imc"
                                    value={datosSalud.imc}
                                    onChange={handleChange}
                                    label="IMC"
                                />
                            </FormControl>

                        </Stack>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Stack spacing={2} direction={'row'}>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vdrl">VDRL</InputLabel>
                                <Select
                                    labelId="vdrl"
                                    value={datosSalud.vdrl ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    name="vdrl"
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vih">VIH</InputLabel>
                                <Select
                                    labelId="vih"
                                    value={datosSalud.vih ? "Positivo" : "Negativo"}
                                    name='vih'
                                    label="VIH"
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="tb">TB</InputLabel>
                                <Select
                                    labelId="tb"
                                    value={datosSalud.tb ? "Positivo" : "Negativo"}
                                    label="TB"
                                    name='tb'
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Maternidad</FormLabel>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControl>
                            <FormLabel id="gestioacion">¿Se encuentra en Periodo de gestación?</FormLabel>
                            <RadioGroup
                                value={datosSalud.gestacion}
                                onChange={handleChange}
                                row
                                aria-labelledby="gestioacion"
                                name="gestacion">
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
                    <Grid item sm={4}
                          sx={{marginTop: 1}}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="gestacionTiempotiempoGestacion">¿Meses de gestación?</InputLabel>
                            <OutlinedInput
                                disabled={!datosSalud.gestacion}
                                name="tiempoGestacion"
                                value={datosSalud.tiempo_gestacion}
                                onChange={onTiempoDeGestacionChange}
                                label="¿De cuanto tiempo se encuentra?"/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}
                          sx={{marginTop: 0}}>
                        <FormControl

                            fullWidth={true}>
                            {/* <InputLabel htmlFor="gestacionFecha">Fecha de parto</InputLabel> */}

                            <DatePicker
                                // TODO: verificar porque al colocar la fecha de parto explota
                                /*value={datosSalud.fecha_parto}*/
                                format="DD/MM/YYYY"
                                name='fecha_parto'
                                onChange={onFechaPartoChange}
                                label={"Fecha de parto"}
                                disabled={!datosSalud.gestacion}/>

                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Salud mental</FormLabel>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="sigue_tratamiento_mental">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.sigue_tratamiento_mental}
                                onChange={handleBooleanChange}
                                row
                                aria-labelledby="sigue_tratamiento_mental"
                                name="sigue_tratamiento_mental">
                                <FormControlLabel
                                    value={true}
                                    control={<Radio/>
                                    } label="Si"/>
                                <FormControlLabel
                                    value={false}
                                    control={<Radio/>}
                                    label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="tiene_antecedentes_de_lesiones_autoinflingidas">Antecedentes de lesiones
                                autoinfligidas</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.tiene_antecedentes_de_lesiones_autoinflingidas}
                                onChange={handleChange}
                                row
                                aria-labelledby="tiene_antecedentes_de_lesiones_autoinflingidas"
                                name="tiene_antecedentes_de_lesiones_autoinflingidas">
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

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="gestioacion">¿Ha estado internado en hospital Psiquiatrico/Centro
                                nacional de control de addicciones?</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.ha_estado_internado_en_hospital_psiquiatrico}
                                onChange={handleChange}
                                row
                                aria-labelledby="gestioacion"
                                name="ha_estado_internado_en_hospital_psiquiatrico">
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
                        <FormControl>
                            <FormLabel id="drogra-previo-prision">La PPL reporta un problema de abuso de drogas previo
                                al
                                ingreso de prisión</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.reporta_abuso_de_droga_previo_al_ingreso}
                                onChange={handleChange}
                                row
                                aria-labelledby="drogra-previo-prision"
                                name="reporta_abuso_de_droga_previo_al_ingreso">
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
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="medicacionActualmente">¿Que medicación toma actualmente?</FormLabel>
                            <Autocomplete
                                multiple
                                onChange={onMedicacionActualChange}
                                id="medicamentos-id"
                                options={[]}
                                freeSolo
                                // renderTags={(value: readonly string[], getTagProps) =>
                                //   value.map((option: string, index: number) => (
                                //     <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                //   ))
                                // }
                                renderInput={(params) => (
                                    <TextField
                                        ref={params.InputProps.ref}
                                        {...params}
                                        variant="outlined"
                                        label="Medicamentos"
                                        placeholder="Ingrese el nombre del medicamento"
                                        sx={{marginLeft: '0 !important', width: '100% !important'}}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="afeccionSeveraEstupefacientes">
                                ¿Cuenta con alguna afección severa interna o externa por el consumo excesivo de
                                sustancias estupefacientes o drogas prohibidas.?
                            </FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.tiene_afeccion_severa_por_estupefacientes}
                                onChange={handleChange}
                                row
                                aria-labelledby="afeccionSeveraEstupefacientes"
                                name="tiene_afeccion_severa_por_estupefacientes">
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


                {/* Salud Fisica                   */}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Salud fisica</FormLabel>
                    </Grid>
                    <Grid item sm={12}>
                        <Stack spacing={2} direction={'column'}>
                            <FormControl>
                                <FormLabel id="discapacidad">Posee alguna Discapacidad:</FormLabel>
                                <RadioGroup
                                    value={datosSalud.saludFisica?.discapacidad_fisica}
                                    onChange={handleChange}
                                    row
                                    aria-labelledby="discapacidad_fisica"
                                    name="discapacidad_fisica"
                                >
                                    <FormControlLabel
                                        value="fisica"
                                        control={<Radio/>}
                                        label="Fisica"/>
                                    <FormControlLabel
                                        value="motora"
                                        control={<Radio/>}
                                        label="Motora"/>
                                    <FormControlLabel
                                        value="intelectual"
                                        control={<Radio/>}
                                        label="Intelectual"/>
                                    <FormControlLabel
                                        value="visual"
                                        control={<Radio/>}
                                        label="Visual"/>
                                    <FormControlLabel
                                        value="auditiva"
                                        control={<Radio/>}
                                        label="Auditiva"/>
                                    <FormControlLabel
                                        value="otros"
                                        control={<Radio/>}
                                        label="otros"/>
                                </RadioGroup>
                            </FormControl>
                            {
                                datosSalud.saludFisica?.discapacidad_fisica == 'otros' ?
                                    <TextField label={'Otros'} value={datosSalud.saludFisica?.discapacidad_fisica}
                                               variant="outlined" sx={{marginLeft: '0 !important'}}/>
                                    : null}
                        </Stack>
                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Limitaciones idiomáticas </FormLabel>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="necesitaInterprete">¿Necesita un intérprete?</FormLabel>
                            <RadioGroup
                                value={datosSalud.limitacionesIdiomaticas?.necesitaInterprete}
                                onChange={handleChange}
                                row
                                aria-labelledby="interprete"
                                name="necesitaInterprete">
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
                        <FormControl>
                            <FormLabel id="dificultad-leer-escribir">Dificultad para leer o escribir</FormLabel>
                            <RadioGroup
                                value={datosSalud.limitacionesIdiomaticas?.tieneDificultadParaLeerYEscribir}
                                onChange={handleChange}
                                row
                                aria-labelledby="dificultad-leer-escribir"
                                name="tieneDificultadParaLeerYEscribir">
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
                    <Grid item sm={12} mt={4}>
                        <Button onClick={onDatosSaludSubmit} variant='contained'>
                            Guardar cambios
                        </Button>
                    </Grid>
                </Grid>

            </Box>


        </>
    )
}

export default BloqueSalud;

