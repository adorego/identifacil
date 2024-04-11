import React, {FC, useState, useEffect, SyntheticEvent, ChangeEvent, Dispatch, SetStateAction} from "react";
import {
    Autocomplete, Box, Button, Chip, CircularProgress, FormControl, FormControlLabel,
    FormLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup,
    Select, SelectChangeEvent, Stack, TextField, Typography
} from "@mui/material";
import {datosDeSalud2Initial, datosDeSalud2Type} from "@/components/utils/systemTypes";
import {DatePicker, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useGlobalContext} from "@/app/Context/store";
import {api_request} from "@/lib/api-request"
import Checkbox from "@mui/material/Checkbox";
import {Sort} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";


const nineMonthsFromNow = dayjs().add(9, 'month');

interface BloqueSaludProps {
    id_persona: number | null;
    datosAlmacenados?: datosDeSalud2Type;
    codigo_genero: number;
    handleAccordion?: (s: string) => void;
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;
}

interface datosSaludSelect {
    grupo_sanguineo: Array<{
        id: number,
        nombre: string
    }>;
    vacunas_recibidas: Array<{
        id: number,
        nombre: string
    }>;

}

const datosSaludSelectInicial: datosSaludSelect = {
    grupo_sanguineo: [
        {id: 1, nombre: "A+"},
        {id: 2, nombre: "A-"},
        {id: 3, nombre: "B+"},
        {id: 4, nombre: "B-"},
        {id: 5, nombre: "AB+"},
        {id: 6, nombre: "AB-"},
        {id: 7, nombre: "O+"},
        {id: 8, nombre: "O-"},
    ],
    vacunas_recibidas: [
        {
            id: 1,
            nombre: "Vacuna contra el COVID 19-3era Dosis"
        },
        {
            id: 2,
            nombre: "Vacuna contra el COVID 19-2da Dosis"
        },
        {
            id: 3,
            nombre: "Vacuna contra el COVID 19-3ra Dosis"
        },
        {
            id: 4,
            nombre: "Vacuna contra la difteria, tetanos y pertussis(absorbida)"
        },
        {
            id: 5,
            nombre: "Vacuna contra la hepatitis A"
        }
    ]
}

type SaludFisicaType = {
    Ninguna: boolean;
    Fisica: boolean;
    Motora: boolean;
    Intelectual: boolean;
    Visual: boolean;
    Auditiva: boolean;
    otros: boolean;
}

const SaludFisicaInicial = {
    Ninguna: false,
    Fisica: false,
    Motora: false,
    Intelectual: false,
    Visual: false,
    Auditiva: false,
    otros: false
}

const BloqueSalud: FC<BloqueSaludProps> = ({id_persona, datosAlmacenados = datosDeSalud2Initial, codigo_genero = 2, handleAccordion, onSetDatosPPL}) => {
    /** Estado seleccionados del form del form */
    const [datosSaludSelectState, setDatosSaludSeelect] = useState<datosSaludSelect>(datosSaludSelectInicial);

    /** Datos capturados elementos del form*/
    const [datosSalud, setDatosSalud] = useState<datosDeSalud2Type>(datosDeSalud2Initial); //datosDeSalud2Initial

    /** Datos para poblar elementos del form*/
    const [stateSaludFisica, setStateSaludFisica] = useState<SaludFisicaType>(SaludFisicaInicial)

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    /// TODO verificar si estado sigue vigente
    const options = ['Option 1', 'Option 2'];
    const [valueAutocomplete, setValueAutocomplete] = React.useState<string | null>(options[0]);

    // TODO Verifica si estado sigue vigente
    const [inputValue, setInputValue] = React.useState('');
    const [vacunasSeleccionadas, setVacunasSeleccionadas] = useState<Array<{ id: number; nombre: string }>>([]);

    const {openSnackbar} = useGlobalContext();


    useEffect(() => {
        if (datosAlmacenados) {
            setDatosSalud((prev) => {
                return {
                    ...prev,
                    ...datosAlmacenados,
                }
            })

            if (datosAlmacenados.saludFisica.discapacidad_fisica !== 'ninguna') {
                setStateSaludFisica(JSON.parse(datosAlmacenados.saludFisica.discapacidad_fisica))
            }

        }
    }, [datosAlmacenados])

    const onTiempoDeGestacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setDatosSalud(prev => ({
            ...prev,
            tiempo_gestacion: parseInt(event.target.value),
        }))
    }

    const onFechaPartoChange = (value: Dayjs | null | string, context: any) => {

        setDatosSalud(prev => ({
            ...prev,
            fecha_parto: value,
            fecha_parto_modificado: true,
        }))


    }

    const onGruposSanguineoChange = (event: SelectChangeEvent<number | string | any>) => {
        const grupoSanguineoSelected = datosSaludSelectInicial.grupo_sanguineo.find(objeto => objeto.id === Number(event.target.value)) || {id: null, nombre: null};

        setDatosSalud(prev => ({
            ...prev,
            grupo_sanguineo: grupoSanguineoSelected ? {id: grupoSanguineoSelected.id, nombre: grupoSanguineoSelected.nombre} : {id: null, nombre: null},
            grupo_sanguineo_modificado: true,
        }))
    }

    const onMedicacionActualChange = (event: SyntheticEvent<Element, Event>, value: any) => {
        // console.log(value);
        setDatosSalud(prev => ({
            ...prev,
            saludMental: {
                ...prev.saludMental,
                medicacion_actual: value,
                medicacion_actual_modificado: true,
            }
        }))
    }

    const handleChange = (event: { target: { name: string, value: number | string } }, tipoDato: string) => {

        if (tipoDato == 'saludMental') {
            setDatosSalud((prev) => ({
                ...prev,
                saludMental: {
                    ...prev.saludMental,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }

        if (tipoDato == 'saludFisica') {

            setDatosSalud((prev) => ({
                ...prev,
                saludFisica: {
                    ...prev.saludFisica,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }
        if (tipoDato == 'limitacionesIdiomaticas') {

            setDatosSalud((prev) => ({
                ...prev,
                limitacionesIdiomaticas: {
                    ...prev.limitacionesIdiomaticas,
                    [event.target.name]: event.target.value === 'true',
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }
        if (tipoDato == 'saludGeneral') {
            setDatosSalud((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
                [`${event.target.name}_modificado`]: true
            }));
        }

    };

    const handleNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        console.log(newValue)

        // Permite solo números en el input

        if (newValue.match(/^\d*\.?\d*$/)) {
        //if (newValue.match(/^\d*,?\d*$/)) {
            console.log('si' + newValue)
            setDatosSalud((prev) => ({
                ...prev,
                [event.target.name]: newValue,
                [`${event.target.name}_modificado`]: true
            }));
        }else{
            console.log('no' + newValue)
        }


    };

    const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
        setDatosSalud(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value === 'true',
                [`${event.target.name}_modificado`]: true
            }
        });
    };

    const handleBooleanChange = (event: React.ChangeEvent<HTMLInputElement>, tipoSalud: string) => {

        if (tipoSalud == 'saludMental') {
            setDatosSalud((prev) => ({
                ...prev,
                saludMental: {
                    ...prev.saludMental,
                    [event.target.name]: event.target.value === 'true',
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }

        if (tipoSalud == 'saludFisica') {
            setDatosSalud((prev) => ({
                ...prev,
                saludFisica: {
                    ...prev.saludFisica,
                    [event.target.name]: event.target.value,
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }
        if (tipoSalud == 'limitacionesIdiomaticas') {
            setDatosSalud((prev) => ({
                ...prev,
                limitacionesIdiomaticas: {
                    ...prev.limitacionesIdiomaticas,
                    [event.target.name]: event.target.value === 'true',
                    [`${event.target.name}_modificado`]: true
                }
            }));
        }

        if (tipoSalud == 'saludGeneral') {
            setDatosSalud((prev) => ({
                ...prev,
                [event.target.name]: event.target.value === 'true',
                [`${event.target.name}_modificado`]: true

            }));
        }

    };

    // Para DatePicker y otros controles personalizados
    const handleDateChange = (name: string, date: Dayjs | null) => {
        setDatosSalud((prev) => ({
            ...prev,
            [name]: date ? date.toISOString() : null, // Ajusta según sea necesario
            [`${name}_modificado`]: true
        }));
    };

    const handleSaludFisica = (e: any) => {
        console.log(e.target.name)
        if(e.target.name !== 'Ninguna'){
            setStateSaludFisica(prev => ({
                ...prev,
                Ninguna: false,
                [e.target.name]: e.target.checked
            }))
        }else{
            setStateSaludFisica(prev => ({
                ...prev,
                Ninguna: true,
                Fisica: false,
                Motora: false,
                Intelectual: false,
                Visual: false,
                Auditiva: false,
                otros: false,

            }))
        }
    }

    const onDatosSaludSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setConsultaLoading(true)

        const url = datosSalud.id ?
            `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/salud/${datosSalud.id}`
            : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/salud`

        const datosDelFormulario: datosDeSalud2Type = Object.assign({}, datosSalud);
        datosDelFormulario.id_persona = id_persona;

        // TODO: Verificar este type para enviar los datos
        // @ts-ignore
        datosDelFormulario.grupo_sanguineo = datosSalud.grupo_sanguineo?.id

        datosDelFormulario.saludFisica.discapacidad_fisica = JSON.stringify(stateSaludFisica).toString();
        // @ts-ignore
        datosDelFormulario.vacunas_recibidas = datosSalud.vacunas_recibidas.map(objeto => objeto.id)

        const datosProcesados = {
            ...datosDelFormulario,
            temperatura: datosDelFormulario.temperatura ? datosDelFormulario.temperatura : 0,
            peso: datosDelFormulario.peso ? datosDelFormulario.peso : 0,
            imc: datosDelFormulario.imc ? datosDelFormulario.imc : 0,
            talla: datosDelFormulario.talla ? datosDelFormulario.talla : 0,
        }

        const methodForm = datosSalud.id ? 'PUT' : 'POST';

        const respuesta = await api_request(url, {
            method: methodForm,
            body: JSON.stringify(datosProcesados),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (respuesta.success) {
            setConsultaLoading(false)
            if(onSetDatosPPL){
                onSetDatosPPL((prev:any)=>({
                    ...prev,
                    datosDeSalud: {
                        ...datosSalud,
                        id: respuesta.datos.id,
                    }
                }))
            }
            setDatosSalud(prev=>({
                ...prev,
                id: respuesta.datos.id,
            }))
            openSnackbar("Datos guardados correctamente", "success")
            if (handleAccordion) {
                handleAccordion('')
            }
        } else {
            setConsultaLoading(false)
            openSnackbar(`Error al guardar los datos: ${respuesta.datos.message}`, `error`);
            // log.error("Error al guardar los datos", respuesta.datos);

        }


    }

    /*    if (!datosSalud.id) {
            return (
                <>
                    <Box sx={{
                        width: '100%',
                        height: '450px',
                        textAlign: 'center',
                    }}>
                        <CircularProgress/>
                    </Box>
                </>
            )
        } else {


        }*/


    return (
        <>

            <Box
                component="form"
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
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludGeneral')
                                }}
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
                        <FormControl fullWidth>
                            <InputLabel shrink>Grupo Sanguineo</InputLabel>
                            <Select

                                label="Grupo Sanguineo"
                                labelId="grupo-sanquineo-label"
                                id="grupo-sanguineo"
                                name="grupo_sanguineo"
                                value={datosSalud.grupo_sanguineo ? datosSalud.grupo_sanguineo?.id : 0}
                                onChange={onGruposSanguineoChange}
                            >
                                <MenuItem value={0}>Seleccionar grupo sanguineo</MenuItem>
                                {datosSaludSelectState.grupo_sanguineo.map((option, index) => (
                                    <MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>

                            <Autocomplete
                                multiple
                                id="vacunas-recibidas"
                                options={datosSaludSelectInicial.vacunas_recibidas} // Usa las opciones por defecto

                                value={datosSalud.vacunas_recibidas}

                                onChange={(event, newValue) => {
                                    setDatosSalud(prev => ({
                                        ...prev,
                                        vacunas_recibidas: newValue,
                                        vacunas_recibidas_modificado: true,

                                    }));
                                }}
                                getOptionLabel={(option) => option.nombre}
                                renderTags={(value, getTagProps) =>

                                    value.map((option: { id: number, nombre: string }, index) => (
                                        <Chip
                                            //@ts-ignore
                                            key={option.id}
                                            label={option.nombre}
                                            {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Vacunas Recibidas"
                                        placeholder="Seleccione las vacunas recibidas"
                                        sx={{margin: '0 !important', width: '100% !important'}}
                                    />
                                )}
                            />


                        </FormControl>
                    </Grid>

                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Control de signos vitales</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={2}>
                        <FormControl>

                            <TextField
                                name="presion_arterial"
                                value={datosSalud.presion_arterial}
                                label="PA"
                                helperText='Ej: 120/80'
                                onChange={(event) => {
                                    handleChange(event, 'saludGeneral')
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={2}>
                        <FormControl>

                            <TextField
                                fullWidth
                                name="frecuencia_cardiaca"
                                value={datosSalud.frecuencia_cardiaca}
                                label="FC"
                                onChange={(event) => {
                                    handleChange(event, 'saludGeneral')
                                }}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item sm={2}>

                        <FormControl>

                            <TextField
                                fullWidth
                                name="frecuencia_respiratoria"
                                value={datosSalud.frecuencia_respiratoria}
                                onChange={(event) => {
                                    handleChange(event, 'saludGeneral')
                                }}
                                label="FR"
                            />
                        </FormControl>

                    </Grid>
                    <Grid item sm={2}>

                        <FormControl>

                            <TextField
                                fullWidth
                                name="temperatura"
                                label='Temperatura'
                                value={datosSalud.temperatura}
                                onChange={handleNumber}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                                }}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item sm={2}>
                        <FormControl>

                            <TextField
                                fullWidth
                                name="peso"
                                value={datosSalud.peso}
                                onChange={handleNumber}
                                label="Peso"
                                type='text'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item sm={2}>
                        <FormControl>

                            <TextField
                                name="talla"
                                value={datosSalud.talla}
                                onChange={handleNumber}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                }}
                                label="Talla"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={2}>
                        <TextField
                            name="imc"
                            value={datosSalud.imc}
                            onChange={handleNumber}
                            label="IMC"
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Stack spacing={2} direction={'row'}>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vdrl">VDRL</InputLabel>
                                <Select
                                    labelId="vdrl"
                                    value={String(datosSalud.vdrl)}
                                    label="VDRL"
                                    name="vdrl"
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"true"}>Positivo</MenuItem>
                                    <MenuItem value={"false"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vih">VIH</InputLabel>
                                <Select
                                    labelId="vih"
                                    value={String(datosSalud.vih)}
                                    name='vih'
                                    label="VIH"
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"true"}>Positivo</MenuItem>
                                    <MenuItem value={"false"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="tb">TB</InputLabel>
                                <Select
                                    labelId="tb"
                                    value={String(datosSalud.tb)}
                                    label="TB"
                                    name='tb'
                                    onChange={handleSelectChange}

                                >
                                    <MenuItem value={"true"}>Positivo</MenuItem>
                                    <MenuItem value={"false"}>Negativo</MenuItem>

                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>

                {/* MATERNIDAD */}
                {codigo_genero == 1 && (
                    <>
                        <Grid container spacing={2} mt={2}>
                            <Grid item sm={12}>
                                <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                           id="demo-row-radio-buttons-group-label">Maternidad</FormLabel>
                            </Grid>

                            <Grid item sm={4}>
                                <FormControl>
                                    <FormLabel id="gestioacion">¿Se encuentra en Periodo de gestación?</FormLabel>
                                    <RadioGroup
                                        value={datosSalud.gestacion}
                                        onChange={(event) => {
                                            handleBooleanChange(event, 'saludGeneral')
                                        }}
                                        row
                                        aria-labelledby="gestacion"
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
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={4} sx={{marginTop: 1}} alignItems='baseline'>
                                {datosSalud.gestacion &&
                                    (
                                    <TextField
                                        fullWidth
                                        disabled={!datosSalud.gestacion}
                                        name="tiempo_gestacion"
                                        value={datosSalud.tiempo_gestacion ? datosSalud.tiempo_gestacion : ''}
                                        onChange={onTiempoDeGestacionChange}
                                        margin='none'
                                        type='text'
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">semana</InputAdornment>,
                                        }}
                                        label="¿De cuantas semanas se encuentra?"/>
                                    )
                                }
                            </Grid>
                            <Grid item sm={4} sx={{marginTop: 0}}>
                                {datosSalud.gestacion &&
                                    <FormControl fullWidth>
                                        <MobileDatePicker
                                            disablePast
                                            maxDate={nineMonthsFromNow}
                                            format="DD/MM/YYYY"
                                            name='fecha_parto'
                                            value={datosSalud.fecha_parto ? dayjs(datosSalud.fecha_parto) : dayjs()}
                                            onChange={onFechaPartoChange}
                                            label={"Fecha de parto"}/>

                                    </FormControl>
                                }
                            </Grid>
                        </Grid>
                    </>
                    )
               }

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <FormLabel sx={{fontWeight: 'bold', textTransform: 'uppercase'}}
                                   id="demo-row-radio-buttons-group-label">Salud mental</FormLabel>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="sigue_tratamiento_mental">¿Sigue algún tratamiento por Salud
                                Mental?</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.sigue_tratamiento_mental}
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludMental')
                                }}
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
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludMental')
                                }}
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
                            <FormLabel id="internado-en-hospital-psiquiatrico-label">¿Ha estado internado en
                                hospital Psiquiatrico/Centro
                                nacional de control de addicciones?</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.ha_estado_internado_en_hospital_psiquiatrico}
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludMental')
                                }}
                                row
                                aria-labelledby="internado-en-hospital-psiquiatrico-label"
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
                            <FormLabel id="drogra-previo-prision">La PPL reporta un problema de abuso de drogas
                                previo
                                al
                                ingreso de prisión</FormLabel>
                            <RadioGroup
                                value={datosSalud.saludMental?.reporta_abuso_de_droga_previo_al_ingreso}
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludMental')
                                }}
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

                        <FormControl fullWidth>
                            <FormLabel id="medicamentos-id-label" sx={{mb:'1'}}>¿Que medicación toma actualmente?</FormLabel>
                            <Autocomplete
                                multiple
                                freeSolo
                                onChange={onMedicacionActualChange}
                                id="medicamentos-id"
                                options={[]}
                                value={datosSalud.saludMental.medicacion_actual ? datosSalud.saludMental.medicacion_actual : []}
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
                                onChange={(event) => {
                                    handleBooleanChange(event, 'saludMental')
                                }}
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
                                    onChange={(event) => {
                                        handleBooleanChange(event, 'saludFisica')
                                    }}
                                    row
                                    aria-labelledby="discapacidad_fisica"
                                    name="discapacidad_fisica"
                                >
                                    <FormControlLabel
                                        value="ninguna"
                                        control={<Checkbox checked={stateSaludFisica.Ninguna}
                                                           onChange={handleSaludFisica} name='Ninguna'/>}
                                        label="Ninguna"/>
                                    <FormControlLabel
                                        value="fisica"
                                        control={<Checkbox checked={stateSaludFisica.Fisica}
                                                           onChange={handleSaludFisica} name='Fisica'/>}
                                        label="Fisica"/>
                                    <FormControlLabel
                                        value="motora"
                                        control={<Checkbox checked={stateSaludFisica.Motora}
                                                           onChange={handleSaludFisica} name='Motora'/>}
                                        label="Motora"/>
                                    <FormControlLabel
                                        value="intelectual"
                                        control={<Checkbox checked={stateSaludFisica.Intelectual}
                                                           onChange={handleSaludFisica} name='Intelectual'/>}
                                        label="Intelectual"/>
                                    <FormControlLabel
                                        value="visual"
                                        control={<Checkbox checked={stateSaludFisica.Visual}
                                                           onChange={handleSaludFisica} name='Visual'/>}
                                        label="Visual"/>
                                    <FormControlLabel
                                        value="auditiva"
                                        control={<Checkbox checked={stateSaludFisica.Auditiva}
                                                           onChange={handleSaludFisica} name='Auditiva'/>}
                                        label="Auditiva"/>
                                    <FormControlLabel
                                        value="otros"
                                        control={<Checkbox checked={stateSaludFisica.otros} onChange={handleSaludFisica}
                                                           name='otros'/>}
                                        label="Otros"/>
                                </RadioGroup>
                            </FormControl>
                            {
                                datosSalud.saludFisica?.discapacidad_fisica == 'otros' ?
                                    <TextField
                                        label={'Otros'}
                                        name='explicacion_de_discapacidad'
                                        value={datosSalud.saludFisica?.explicacion_de_discapacidad}
                                        onChange={(event) => {
                                            handleChange(event, 'saludFisica')
                                        }}
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
                                onChange={(event) => {
                                    handleBooleanChange(event, 'limitacionesIdiomaticas')
                                }}
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
                                onChange={(event => {
                                    handleChange(event, 'limitacionesIdiomaticas')
                                })}
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
                        <LoadingButton
                            sx={{
                                minHeight: "100%",
                                px: "48px",
                                height: '48px'
                            }}
                            onClick={onDatosSaludSubmit}
                            loading={consultaLoading}
                            loadingPosition='start'
                            startIcon={<SaveIcon/>}
                            variant="contained">
                            <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                        </LoadingButton>
                        {/*<Button onClick={onDatosSaludSubmit} variant='contained'>
                            Guardar cambios
                        </Button>*/}
                    </Grid>
                </Grid>

            </Box>


        </>
    )
}

export default BloqueSalud;