import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteRenderInputParams,
    Box,
    Button,
    Chip,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent, Stack,
    TextField, Typography
} from "@mui/material"
import {FC, ReactNode, SyntheticEvent, useEffect, useReducer, useState} from "react";
import {datosSaludInicial, datosSaludType} from "../../../../components/utils/systemTypes";
import dayjs, {Dayjs} from "dayjs";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {DatePicker} from "@mui/x-date-pickers";
import {IndexKind} from "typescript";
import React from "react";
import {api_request} from "../../../../lib/api-request"
import log from "loglevel";
import {useGlobalContext} from "../../../Context/store";

enum SALUD_ACTIONS {
    MODIFICAR_AFECCION_DROGA,
    MODIFICAR_GRUPO_SANGUINEO,
    MODIFICAR_VACUNAS_RECIBIDAS,
    MODIFICAR_PRESION_ARTERIAL,
    MODIFICAR_FRECUENCIA_CARDIACA,
    MODIFICAR_FRECUENCIA_RESPIRATORIA,
    MODIFICAR_TEMPERATURA,
    MODIFICAR_PESO,
    MODIFICAR_TALLA,
    MODIFICAR_IMC,
    MODIFICAR_VDRL,
    MODIFICAR_VIH,
    MODIFICAR_TB,
    MODIFICAR_GESTACION,
    MODIFICAR_TIEMPO_GESTACION,
    MODIFICAR_FECHA_PARTO,
    MODIFICAR_DISCAPACIDAD_FISICA,
    MODIFICAR_EXPLICACION_DISCAPACIDAD_FISICA,
    MODIFICAR_SIGUE_TRATAMIENTO_MENTAL,
    MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS,
    MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO,
    MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO,
    MODIFICAR_MEDICACION_ACTUAL,
    MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE,
    MODIFICAR_NECESITA_INTERPRETE,
    MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR,

}

interface saludActions {
    type: SALUD_ACTIONS;
    payload: any;
}


interface datosSaludSelect {
    grupos_sanguineos: Array<{ id: number, label: string }>;
    vacunas_recibidas: Array<{ id: number, label: string }>;

}

const datosSaludSelectInicial: datosSaludSelect = {
    grupos_sanguineos: [{id: 1, label: "A"}, {id: 2, label: "A+"}, {id: 3, label: "A-"}],
    vacunas_recibidas: [{id: 1, label: "Covid 1era dosis"}, {id: 2, label: "Covid 2da dosis"}, {id: 3, label: "Covid 3era dosis"}]
}

function reducer(state: datosSaludType, action: saludActions) {
    switch (action.type) {
        case (SALUD_ACTIONS.MODIFICAR_AFECCION_DROGA):
            return Object.assign({}, {...state, drogasModificado: true, tieneAfeccionADrogras: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_GRUPO_SANGUINEO):
            return Object.assign({}, {...state, grupo_sanguineo_modificado: true, grupo_sanguineo: (action.payload.id)});
        case (SALUD_ACTIONS.MODIFICAR_VACUNAS_RECIBIDAS):
            return Object.assign({}, {...state, vacunas_recibidas: action.payload, vacunas_recibidas_modificada: true});
        case (SALUD_ACTIONS.MODIFICAR_PRESION_ARTERIAL):
            return Object.assign({}, {...state, presion_arterial: action.payload, presion_arterial_modificada: true});
        case (SALUD_ACTIONS.MODIFICAR_FRECUENCIA_CARDIACA):
            return Object.assign({}, {...state, frecuencia_cardiaca: action.payload, frecuencia_cardiaca_modificada: true});
        case (SALUD_ACTIONS.MODIFICAR_FRECUENCIA_RESPIRATORIA):
            return Object.assign({}, {...state, frecuencia_respiratoria: action.payload, frecuencia_respiratoria_modificada: true});
        case (SALUD_ACTIONS.MODIFICAR_TEMPERATURA):
            return Object.assign({}, {...state, temperatura: action.payload, temperatura_modificada: true});
        case (SALUD_ACTIONS.MODIFICAR_PESO):
            return Object.assign({}, {...state, peso: action.payload, peso_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_TALLA):
            return Object.assign({}, {...state, talla: action.payload, talla_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_IMC):
            return Object.assign({}, {...state, imc: action.payload, imc_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_VDRL):
            return Object.assign({}, {...state, vdrl: action.payload, vdrl_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_VIH):
            return Object.assign({}, {...state, vih: action.payload, vih_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_TB):
            return Object.assign({}, {...state, tb: action.payload, tb_modificado: true});
        case (SALUD_ACTIONS.MODIFICAR_GESTACION):
            return Object.assign({}, {...state, gestacion_modificado: true, gestacion: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION):
            return Object.assign({}, {...state, tiempo_gestacion_modificado: true, tiempo_gestacion: action.payload});
        case (SALUD_ACTIONS.MODIFICAR_FECHA_PARTO):
            return Object.assign({}, {...state, fecha_parto_modificada: true, fecha_parto: action.payload});
        case (SALUD_ACTIONS.MODIFICAR_DISCAPACIDAD_FISICA):
            return Object.assign({}, {...state, discapacidad_modificada: true, discapacidad_fisica: action.payload});
        case (SALUD_ACTIONS.MODIFICAR_EXPLICACION_DISCAPACIDAD_FISICA):
            return Object.assign({}, {...state, explicacion_discapacidad_fisica_modificada: true, explicacion_discapacidad_fisica: action.payload})
        case (SALUD_ACTIONS.MODIFICAR_SIGUE_TRATAMIENTO_MENTAL):
            return Object.assign({}, {...state, sigue_tratamiento_mental_modificado: true, sigue_tratamiento_mental: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS):
            return Object.assign({}, {...state, tiene_antecedentes_de_lesiones_autoinflingidas_modificado: true, tiene_antecedentes_de_lesiones_autoinflingidas: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO):
            return Object.assign({}, {...state, ha_estado_internado_en_hospital_psiquiatrico_modificado: true, ha_estado_internado_en_hospital_psiquiatrico: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO):
            return Object.assign({}, {...state, reporta_abuso_de_droga_previo_al_ingreso_modificado: true, reporta_abuso_de_droga_previo_al_ingreso: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_MEDICACION_ACTUAL):
            return Object.assign({}, {...state, medicacion_actual_modificada: true, medicacion_actual: action.payload})
        case (SALUD_ACTIONS.MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE):
            return Object.assign({}, {...state, tiene_afeccion_severa_por_estupefaciente_modificado: true, tiene_afeccion_severa_por_estupefacientes: (action.payload === 'true')})
        case (SALUD_ACTIONS.MODIFICAR_NECESITA_INTERPRETE):
            return Object.assign({}, {...state, necesitaInterprete_modificado: true, necesitaInterprete: (action.payload === "true")});
        case (SALUD_ACTIONS.MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR):
            return Object.assign({}, {...state, tieneDificultadParaLeerYEscribir_modificado: true, tieneDificultadParaLeerYEscribir: (action.payload === "true")});

        default:
            return state;
    }
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export interface BloqueSaludProps {
    id_persona: number | null;
    datosAlmacenados?: datosSaludType;
}

const BloqueSalud: FC<BloqueSaludProps> = ({id_persona, datosAlmacenados = datosSaludInicial}) => {
    const [datosSaludFormState, datosSaludDispatch] = useReducer(reducer, datosAlmacenados);
    const [datosSaludSelectState, setDatosSaludSeelect] = useState<datosSaludSelect>(datosSaludSelectInicial);
    const {openSnackbar} = useGlobalContext();
    // console.log("Estado:", datosSaludFormState);



    useEffect(() => {
        if(datosAlmacenados){
            console.log(datosAlmacenados)
            setDatosSaludSeelect(prevState => {
                return{
                    ...prevState,
                    id_persona: datosAlmacenados.id_persona,
                    imc: datosAlmacenados.imc,
                    imc_modificado: datosAlmacenados.imc_modificado,
                    tieneAfeccionADrogas_modificado: datosAlmacenados.tieneAfeccionADrogas_modificado,
                    tieneAfeccionADrogras: datosAlmacenados.tieneAfeccionADrogras,
                    grupo_sanguineo: datosAlmacenados.grupo_sanguineo,
                    grupo_sanguineo_modificado: datosAlmacenados.grupo_sanguineo_modificado,

                    presion_arterial: datosAlmacenados.presion_arterial,
                    presion_arterial_modificada: datosAlmacenados.presion_arterial_modificada,
                    frecuencia_cardiaca: datosAlmacenados.frecuencia_cardiaca,
                    frecuencia_cardiaca_modificada: datosAlmacenados.frecuencia_cardiaca_modificada,
                    frecuencia_respiratoria: datosAlmacenados.frecuencia_respiratoria,
                    frecuencia_respiratoria_modificada: datosAlmacenados.frecuencia_respiratoria_modificada,
                    temperatura: datosAlmacenados.temperatura,
                    temperatura_modificada: datosAlmacenados.temperatura_modificada,
                    peso: datosAlmacenados.peso,
                    peso_modificado: datosAlmacenados.peso_modificado,
                    talla: datosAlmacenados.talla,
                    talla_modificado: datosAlmacenados.talla_modificado,
                    vdrl: datosAlmacenados.vdrl,
                    vdrl_modificado: datosAlmacenados.vdrl_modificado,
                    vih: datosAlmacenados.vih,
                    vih_modificado: datosAlmacenados.vih_modificado,
                    tb: datosAlmacenados.tb,
                    tb_modificado: datosAlmacenados.tb_modificado,
                    gestacion: datosAlmacenados.gestacion,
                    gestacion_modificado: datosAlmacenados.gestacion_modificado,
                    tiempo_gestacion: datosAlmacenados.tiempo_gestacion,
                    tiempo_gestacion_modificado: datosAlmacenados.tiempo_gestacion_modificado,
                    fecha_parto: datosAlmacenados.fecha_parto,
                    fecha_parto_modificada: datosAlmacenados.fecha_parto_modificada,
                    discapacidad_fisica: datosAlmacenados.discapacidad_fisica,
                    discapacidad_modificada: datosAlmacenados.discapacidad_modificada,
                    explicacion_discapacidad_fisica: datosAlmacenados.explicacion_discapacidad_fisica,
                    explicacion_discapacidad_fisica_modificada: datosAlmacenados.explicacion_discapacidad_fisica_modificada,
                    sigue_tratamiento_mental: datosAlmacenados.sigue_tratamiento_mental,
                    sigue_tratamiento_mental_modificado: datosAlmacenados.sigue_tratamiento_mental_modificado,
                    tiene_antecedentes_de_lesiones_autoinflingidas: datosAlmacenados.tiene_antecedentes_de_lesiones_autoinflingidas,
                    tiene_antecedentes_de_lesiones_autoinflingidas_modificado: datosAlmacenados.tiene_antecedentes_de_lesiones_autoinflingidas_modificado,
                    ha_estado_internado_en_hospital_psiquiatrico: datosAlmacenados.ha_estado_internado_en_hospital_psiquiatrico,
                    ha_estado_internado_en_hospital_psiquiatrico_modificado: datosAlmacenados.ha_estado_internado_en_hospital_psiquiatrico_modificado,
                    reporta_abuso_de_droga_previo_al_ingreso: datosAlmacenados.reporta_abuso_de_droga_previo_al_ingreso,
                    reporta_abuso_de_droga_previo_al_ingreso_modificado: datosAlmacenados.reporta_abuso_de_droga_previo_al_ingreso_modificado,
                    tiene_afeccion_severa_por_estupefacientes: datosAlmacenados.tiene_afeccion_severa_por_estupefacientes,
                    tiene_afeccion_severa_por_estupefaciente_modificado: datosAlmacenados.tiene_afeccion_severa_por_estupefaciente_modificado,
                    necesitaInterprete: datosAlmacenados.necesitaInterprete,
                    necesitaInterprete_modificado: datosAlmacenados.necesitaInterprete_modificado,
                    tieneDificultadParaLeerYEscribir: datosAlmacenados.tieneDificultadParaLeerYEscribir,
                    tieneDificultadParaLeerYEscribir_modificado: datosAlmacenados.tieneDificultadParaLeerYEscribir_modificado,
                    // TODO: Verificar porque no guarda medicamentos y vacunas (uno de los dos o ambos no andan)
                    /*vacunas_recibidas: datosAlmacenados.vacunas_recibidas,
                    vacunas_recibidas_modificada: datosAlmacenados.vacunas_recibidas_modificada,
                    medicacion_actual: datosAlmacenados.medicacion_actual,
                    medicacion_actual_modificada: datosAlmacenados.medicacion_actual_modificada,*/
                }
            })
        }
    }, [datosAlmacenados]);


    const onAffecionDrogaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("Handler:", event.currentTarget.value);

        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_AFECCION_DROGA, payload: event.currentTarget.value});
    }

    const onGrupoSanguineoSelect = (event: React.SyntheticEvent, value: any, reason: string) => {
        // console.log(value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_GRUPO_SANGUINEO, payload: value})
    }

    //Manejador de vacunas recibidas
    const onVacunasRecibidasAdd = (event: React.SyntheticEvent, value: Array<{ id: number, label: string }>, reason: string) => {
        // console.log(value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_VACUNAS_RECIBIDAS, payload: value});
    }

    //Manejador de Presión Arterial
    const onPresionArterialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_PRESION_ARTERIAL, payload: event.currentTarget.value});
    }

    //Manejador de frecuencia cardiaca
    const onFrecuenciaCardiacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FRECUENCIA_CARDIACA, payload: event.currentTarget.value});
    }

    //Manejador de frecuencia respiratoria
    const onFrecuenciaRespiratoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FRECUENCIA_RESPIRATORIA, payload: event.currentTarget.value});
    }

    //Manejador de temperatura
    const onTemperaturaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TEMPERATURA, payload: event.currentTarget.value});
    }

    //Manejador de peso
    const onPesoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_PESO, payload: event.currentTarget.value});
    }

    //Manejador de talla
    const onTallaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TALLA, payload: event.currentTarget.value});
    }

    //Manejador de IMC
    const onIMCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_IMC, payload: event.currentTarget.value});
    }

    //Manejador de IMC
    const onVDRLChange = (event: SelectChangeEvent) => {
        // console.log(event.target.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_VDRL, payload: event.target.value === "Positivo"});
    }

    //Manejador de VIH
    const onVIHChange = (event: SelectChangeEvent) => {
        // console.log(event.target.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_VIH, payload: event.target.value === "Positivo"});
    }

    //Manejador de TB
    const onTBChange = (event: SelectChangeEvent) => {
        // console.log(event.target.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TB, payload: event.target.value === "Positivo"});
    }

    //Manejador de Gestacion
    const onGestacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_GESTACION, payload: event.currentTarget.value});
    }


    const onTiempoDeGestacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        const meses = parseInt(event.target.value);
        if (meses > 9) {
            openSnackbar("Los meses de gestación deben ser menores a 9", "error");
            datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION, payload: 0});

        } else {
            datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION, payload: event.currentTarget.value});
        }
    }

    const onFechaPartoChange = (value: Dayjs | null, context: any) => {
        // console.log(value,context);
        if (value && value < dayjs()) {
            openSnackbar("La mínima fecha de parto puede ser hoy", "error");
            datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: dayjs()})
        } else if (value && value > dayjs().add(9, 'M')) {
            openSnackbar("La máxima fecha de parto puede ser en 9 meses", "error");
            datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: dayjs()})
        } else {
            datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload: value})
        }


    }

    const onDiscapacidadFisicaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_DISCAPACIDAD_FISICA, payload: event.currentTarget.value});
    }

    const onExplicacionDiscapacidadFisicaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_EXPLICACION_DISCAPACIDAD_FISICA, payload: event.target.value});
    }
    const onSigueTratamientoMentalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_SIGUE_TRATAMIENTO_MENTAL, payload: event.currentTarget.value});
    }

    const onTieneAntecedentesDeLesionesAutoinflingidasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS, payload: event.currentTarget.value});
    }

    const onHaEstadoInternadoEnPsiquiatricoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO, payload: event.currentTarget.value});
    }

    const onReportaAbusoDeDrogaPrevioAlIngresoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO, payload: event.currentTarget.value});
    }

    const onMedicacionActualChange = (event: SyntheticEvent<Element, Event>, value: any) => {
        // console.log(value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_MEDICACION_ACTUAL, payload: value});
    }

    const onTieneAfeccionSeveraPorEstupefacientes = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE, payload: event.currentTarget.value});
    }

    const onNecesitaInterpreteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_NECESITA_INTERPRETE, payload: event.currentTarget.value});
    }

    const onTieneDificultadParaLeerYEscribirChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        datosSaludDispatch({type: SALUD_ACTIONS.MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR, payload: event.currentTarget.value});
    }
    const onDatosSaludSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/salud`;
        const datosDelFormulario: datosSaludType = Object.assign({}, datosSaludFormState);
        datosDelFormulario.id_persona = id_persona;
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
            openSnackbar(`Error al guardar los datos: ${respuesta.datos.message}`, `error`);
            log.error("Error al guardar los datos", respuesta.datos);
        }

        console.log("Respuesta:", respuesta);
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
                                value={datosSaludFormState.tieneAfeccionADrogras}
                                onChange={onAffecionDrogaChange}
                                row
                                name="consumoDroga-grupo">
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
                                onChange={onGrupoSanguineoSelect}
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
                                onChange={onVacunasRecibidasAdd}
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
                    <Grid item sm={12} md={6}>
                        <Stack spacing={2} direction={'row'}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="pa">PA</InputLabel>
                                <OutlinedInput
                                    name="pa"
                                    value={datosSaludFormState.presion_arterial}
                                    label="PA"
                                    onChange={onPresionArterialChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="fc">FC</InputLabel>
                                <OutlinedInput
                                    name="fc"
                                    value={datosSaludFormState.frecuencia_cardiaca}
                                    label="FC"
                                    onChange={onFrecuenciaCardiacaChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FR">FR</InputLabel>
                                <OutlinedInput
                                    name="fr"
                                    value={datosSaludFormState.frecuencia_respiratoria}
                                    onChange={onFrecuenciaRespiratoriaChange}
                                    label="FR"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="t">Temperatura</InputLabel>
                                <OutlinedInput
                                    name="t"
                                    value={datosSaludFormState.temperatura}
                                    onChange={onTemperaturaChange}
                                    label="T"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="peso">Peso</InputLabel>
                                <OutlinedInput
                                    name="peso"
                                    value={datosSaludFormState.peso}
                                    onChange={onPesoChange}
                                    label="Peso"
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Stack spacing={2} direction={'row'}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="talla">Talla</InputLabel>
                                <OutlinedInput
                                    name="talla"
                                    value={datosSaludFormState.talla}
                                    onChange={onTallaChange}
                                    label="Talla"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="imc">IMC</InputLabel>
                                <OutlinedInput
                                    name="imc"
                                    value={datosSaludFormState.imc}
                                    onChange={onIMCChange}
                                    label="IMC"
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vdrl">VDRL</InputLabel>
                                <Select
                                    labelId="vdrl"
                                    value={datosSaludFormState.vdrl ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onVDRLChange}

                                >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vih">VIH</InputLabel>
                                <Select
                                    labelId="vih"
                                    value={datosSaludFormState.vih ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onVIHChange}

                                >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="tb">TB</InputLabel>
                                <Select
                                    labelId="tb"
                                    value={datosSaludFormState.tb ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onTBChange}

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
                                value={datosSaludFormState.gestacion}
                                onChange={onGestacionChange}
                                row
                                aria-labelledby="gestioacion"
                                name="row-radio-buttons-group">
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
                                disabled={!datosSaludFormState.gestacion}
                                name="tiempoGestacion"
                                value={datosSaludFormState.tiempo_gestacion}
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
                                value={datosSaludFormState.fecha_parto}
                                format="DD/MM/YYYY"
                                onChange={onFechaPartoChange}
                                label={"Fecha de parto"}
                                disabled={!datosSaludFormState.gestacion}/>

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
                            <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                            <RadioGroup
                                value={datosSaludFormState.sigue_tratamiento_mental}
                                onChange={onSigueTratamientoMentalChange}
                                row
                                aria-labelledby="gestioacion"
                                name="row-radio-buttons-group">
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
                            <FormLabel id="gestioacion">Antecedentes de lesiones autoinfligidas</FormLabel>
                            <RadioGroup
                                value={datosSaludFormState.tiene_antecedentes_de_lesiones_autoinflingidas}
                                onChange={onTieneAntecedentesDeLesionesAutoinflingidasChange}
                                row
                                aria-labelledby="lecionesAutoInflingidas"
                                name="lesiones-autoInflingidas">
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
                                value={datosSaludFormState.ha_estado_internado_en_hospital_psiquiatrico}
                                onChange={onHaEstadoInternadoEnPsiquiatricoChange}
                                row
                                aria-labelledby="gestioacion"
                                name="row-radio-buttons-group">
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
                                value={datosSaludFormState.reporta_abuso_de_droga_previo_al_ingreso}
                                onChange={onReportaAbusoDeDrogaPrevioAlIngresoChange}
                                row
                                aria-labelledby="drogra-previo-prision"
                                name="row-radio-buttons-group">
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
                                value={datosSaludFormState.tiene_afeccion_severa_por_estupefacientes}
                                onChange={onTieneAfeccionSeveraPorEstupefacientes}
                                row
                                aria-labelledby="afeccionSeveraEstupefacientes"
                                name="row-radio-buttons-group">
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
                                    value={datosSaludFormState.discapacidad_fisica}
                                    onChange={onDiscapacidadFisicaChange}
                                    row
                                    aria-labelledby="discapacidad"
                                    name="row-radio-buttons-group"
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
                                datosSaludFormState.discapacidad_fisica == 'otros' ?
                                    <TextField label={'Otros'} value={datosSaludFormState.discapacidad_fisica} variant="outlined"  sx={{marginLeft:'0 !important'}}/>
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
                            <FormLabel id="interprete">¿Necesita un intérprete?</FormLabel>
                            <RadioGroup
                                value={datosSaludFormState.necesitaInterprete}
                                onChange={onNecesitaInterpreteChange}
                                row
                                aria-labelledby="interprete"
                                name="row-radio-buttons-group">
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
                                value={datosSaludFormState.tieneDificultadParaLeerYEscribir}
                                onChange={onTieneDificultadParaLeerYEscribirChange}
                                row
                                aria-labelledby="dificultad-leer-escribir"
                                name="row-radio-buttons-group">
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
  
  