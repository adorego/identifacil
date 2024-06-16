import {ModalComponent} from "@/components/modal/ModalComponent";
import {useModal} from "@/components/modal/UseModal";
import React, {FC, useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Typography,
    MenuItem,
    Select,
    FormLabel,
    RadioGroup, FormControlLabel, Radio, TextField, Stack, FormHelperText, Autocomplete
} from "@mui/material";
import {fetchData} from "@/components/utils/utils";
import {SelectChangeEvent} from "@mui/material/Select";
import {DatePicker, LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useGlobalContext} from "@/app/Context/store";
import {Add} from "@mui/icons-material";
import {
    initialPeronaEnExpedienteStateForm,
    PersonaEnExpedienteType
} from "@/app/(sistema)/(datos-penales)/expedientes/[id]/componentes/expedientesType";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import es from 'dayjs/locale/es';
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

dayjs.locale(es); // Configura dayjs globalmente al español

type HechoPunible = {
    id: number;
    nombre: string;
    codigo: string;
    causas: Causa[];
};

type Causa = {
    id: number;
    codigo: string;
    nombre: string;
};

type HechoPunibleConCausa = {
    hechoPunibleId: number;
    causaId: number;
};

type ModalPropsType = {
    onHandlerPersona: (arg0:any, arg1:boolean) => (void);
    editPersona: {} | null;
    onOpen: boolean;
    onClose: () => void;

}

const ENDPOINT_API = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API

const ModalPersona: FC<ModalPropsType> = ({onHandlerPersona, editPersona = null, onOpen, onClose}) => {

    /** 1.  Estado del Modal */
    const {open, handleOpen, handleClose} = useModal();

    /** 2. State de PPLS para poblar el selector*/
    const [personasLista, setPersonasLista] = useState<Array<any>>([])

    /** 3. State de PPLS Seleccionados */
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<{ numero_de_identificacion: any; id_persona: number; nombre: string; apellido: string; } | null>(null)

    /** 4. State para guardar defensores */
    const [defensoresLista, setDefensoresLista] = useState<Array<any>>([])

    /** 5. State para guardar DEFENSORES */
        // State para datos de forumlarios
    const [datosFormulario, setDatosFormulario] = useState<PersonaEnExpedienteType>(initialPeronaEnExpedienteStateForm)

    /** 6. State para guardar Hecho punible Selccionado? */
        // State para guardar los hechos punibles seleccionados
    const [seleccionesEnPPL, setSeleccionesEnPPL] = useState<HechoPunibleConCausa[]>([]);

    /** 7. State para hechos punibles con causas seleccionados? */
        // State para guardar lista de hechos punibles y causas
    const [hechosPunibles, setHechosPunibles] = useState<HechoPunible[]>([]);

    /** Modo de educicion para capturar datos */

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const {openSnackbar, closeSnackbar} = useGlobalContext();

    const { data: session, status } = useSession();
    const sessionData = PermissionValidator('crear_expedientes', session) || PermissionValidator('actualizar_ppl_form_perfil', session);

    /** Se carga al iniciar el FORM */
    useEffect(() => {

        // Se obtiene datos de lista de PPLs
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res => {
            setPersonasLista(prev => ([...res]))
        })


        // Se obtiene datos de defensores
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/defensores`).then(res => {
            setDefensoresLista(prev => ([...res.defensores]))
        })

        // Hechos punibles
        fetchData(`${ENDPOINT_API}/datos_penales/hechos_punibles`).then((res) => {

            const causasArray: Array<{ id: number; nombre: string; codigo: string; causa_id: number; }> = [];
            // @ts-ignore
            res.hechosPunibles.forEach(hechoPunible => {
                // @ts-ignore
                hechoPunible.causas.forEach(causa => {
                    causasArray.push({
                        id: causa.id,
                        nombre: causa.nombre,
                        codigo: causa.codigo,
                        causa_id: hechoPunible.id
                    });
                });
            });

            setHechosPunibles(prev => ([...res.hechosPunibles]))
        })

    }, []);

    /**Si es que hay un dato para mostrar carga el formulario con datos precargados de PPL* */
    useEffect(() => {
        setPersonasSeleccionadas(null)
        setDatosFormulario(initialPeronaEnExpedienteStateForm)
        setSeleccionesEnPPL([])
        setIsEditMode(true)


        if (editPersona) {


            // @ts-ignore
            const personaPrevia: PersonaEnExpedienteType = personasLista.find((item: PersonaEnExpedienteType) => item.id_persona == editPersona.id_persona)

            if (personaPrevia !== undefined) {


                // @ts-ignore
                setPersonasSeleccionadas(personaPrevia)
                setDatosFormulario((prev: any) => ({
                    ...prev,
                    ...editPersona
                }));

                // Asume que editPersona tiene la forma correcta

                // @ts-ignore
                if (editPersona.hechosPuniblesCausas !== undefined && editPersona.hechosPuniblesCausas.length > 0) {


                    // @ts-ignore
                    const preSeleccionPunibles = editPersona.hechosPuniblesCausas.map((item: any, index) => {

                        return ({hechoPunibleId: item[0], causaId: item[1]})
                    })
                    setSeleccionesEnPPL(preSeleccionPunibles)
                    // console.log(preSeleccionPunibles);
                }
            }

        }else{
            console.log('No es edicion')
            setIsEditMode(false)
        }
    }, [editPersona, onOpen]);

    /** Para controlar si es que debe abrir o cerrar el modal desde fuera del modal* */
    useEffect(() => {

        if (onOpen) {

            handleOpen()
        }
    }, [onOpen]);


    const handleChange = (event: any) => {
        const persona = personasLista.filter((item: { id_persona: number; nombre: string; apellido: string; }) => item.id_persona == event.target.value)
        // setPersonasVinculadas(persona[0]);
        // console.log(persona[0].id_persona)
        if (event.target.name == 'id_persona') {
            setDatosFormulario((prev: any) => ({
                ...prev,
                id_persona: persona[0].id_persona,
                nombre: persona[0].nombre,
                apellido: persona[0].apellido,
                apodo: persona[0].apodo,
            }))
        }

        setDatosFormulario((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const handleBooleanChange = (event: any) => {
        event.preventDefault();
        setDatosFormulario((prevState: any) => ({
            ...prevState,
            [event.target.name]: event.target.value == 'true',
        }))
    };

    const handleAgregar = () => {
        const nuevaSeleccion = {hechoPunibleId: 0, causaId: 0};
        setSeleccionesEnPPL([...seleccionesEnPPL, nuevaSeleccion]);
    };

    // Handler para eliminar una fila de selección
    const handleEliminar = (index: number) => {
        const nuevasSelecciones = seleccionesEnPPL.filter((_, idx) => idx !== index);
        setSeleccionesEnPPL(nuevasSelecciones);
    };

    const handleHechoPunibleChange = (index: number, nuevoHechoPunibleId: number) => {
        const nuevasSelecciones = seleccionesEnPPL.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    hechoPunibleId: nuevoHechoPunibleId,
                    causaId: hechosPunibles.find(hp => hp.id === nuevoHechoPunibleId)?.causas[0].id || 0,
                };
            }
            return seleccion;
        });
        setSeleccionesEnPPL(nuevasSelecciones);
    };

    const handleCausaChange = (index: number, nuevaCausaId: number) => {
        const nuevasSelecciones = seleccionesEnPPL.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    causaId: nuevaCausaId,
                };
            }
            return seleccion;
        });
        setSeleccionesEnPPL(nuevasSelecciones);
    };

    const validadorHechosPunibles = ()=>{
        let esValidado = false

        for(const item of seleccionesEnPPL){


            if(item.causaId == 0 || item.hechoPunibleId == 0){
                openSnackbar('Seleccionar correcamente hechos punibles/causas', 'error')
                break;
            }else{
                esValidado = true;
            }
        }

        return esValidado
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(validadorHechosPunibles()){
            if (personasSeleccionadas && validadorHechosPunibles()) {

                const personaProcesada = {
                    ...datosFormulario,
                    hechosPuniblesCausas: seleccionesEnPPL.map(item => Object.values(item)),
                    // @ts-ignore
                    id_persona: personasSeleccionadas.id_persona,
                    // @ts-ignore
                    nombre: personasSeleccionadas.nombre,
                    // @ts-ignore
                    apellido: personasSeleccionadas.apellido,
                    // @ts-ignore
                    apodo: personasSeleccionadas.apodo,
                    numero_de_identificacion: personasSeleccionadas.numero_de_identificacion,
                }


                onHandlerPersona(personaProcesada, isEditMode)
                setSeleccionesEnPPL([])
                setDatosFormulario(initialPeronaEnExpedienteStateForm)
                handleClose()


            } else {
                openSnackbar("Debe seleccionar un PPL", "error")
                setTimeout(() => {
                    closeSnackbar()
                }, 5000)
            }
        }

    }

    const onHandleOpen = () => {
        handleOpen()
        setPersonasSeleccionadas(null)
        setDatosFormulario(initialPeronaEnExpedienteStateForm)
        setSeleccionesEnPPL([])
        setIsEditMode(false)

    }

    const isCausaSelected = (hechoPunibleId:number, causaId:number) => {
        return seleccionesEnPPL.some(seleccion =>
            seleccion.hechoPunibleId === hechoPunibleId && seleccion.causaId === causaId
        );
    };


    return (
        <>
            {console.log(sessionData)}

                <Stack spacing={2} direction='row' justifyContent='space-between' >
                    <Typography variant='h6'>PPLs vinculados</Typography>
                    <Box hidden={!sessionData}>
                        <Button disabled={!sessionData} onClick={onHandleOpen} variant={'contained'}>
                            Agregar PPL
                        </Button>
                    </Box>
                </Stack>


            <ModalComponent open={open} onClose={() => {
                handleClose()
                onClose()
                setSeleccionesEnPPL([])
                setPersonasSeleccionadas(null)
                setDatosFormulario(initialPeronaEnExpedienteStateForm)

            }} title='Agregar PPL'>
                <Box>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    disabled={isEditMode}
                                    fullWidth={true}
                                    value={personasSeleccionadas ? personasSeleccionadas : null}
                                    onChange={(event, newValue: any) => {
                                        // @ts-ignore
                                        setPersonasSeleccionadas((prev: any) => ({
                                            ...newValue
                                        }));
                                    }}
                                    id="controllable-states-demo"
                                    options={personasLista}
                                    getOptionLabel={(option) => option.apellido ? `${option.apellido}, ${option.nombre} - ${option.numero_de_identificacion}` : 'Seleccionar PPL'}
                                    renderInput={(params) => <TextField {...params} label="Lista de PPLs"/>}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={12}>
                            <FormControl>
                                <FormLabel id="117-procesal-field">Situacion procesal</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="situacion-procesal-field"
                                    name="condenado"
                                    onChange={handleBooleanChange}
                                    value={datosFormulario.condenado}
                                >
                                    <FormControlLabel value={false} control={<Radio/>} label="Procesado"/>
                                    <FormControlLabel value={true} control={<Radio/>} label="Condenado"/>


                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {datosFormulario.condenado &&
                        <Grid container spacing={2} mt={1}>
                            <Grid item sm={12}>
                                <Typography variant='overline'>
                                    Duracion total de la condena
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label="Años"
                                    variant="outlined"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setDatosFormulario((prevState: any) => ({
                                            ...prevState,
                                            condena: {
                                                ...prevState.condena,
                                                anhos: event.target.value ? parseInt(event.target.value) : 0,
                                            },
                                        }))
                                    }}
                                    value={datosFormulario?.condena?.anhos}
                                    name="anhos"
                                />

                            </Grid><Grid item sm={6}>
                            <TextField
                                fullWidth
                                label="meses"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setDatosFormulario((prevState: any) => ({
                                        ...prevState,
                                        condena: {
                                            ...prevState.condena,
                                            meses: event.target.value ? parseInt(event.target.value) : 0,
                                        },
                                    }))
                                }}
                                value={datosFormulario?.condena?.meses}
                                name="Meses"
                            />

                        </Grid>
                        </Grid>
                    }
                    {datosFormulario.condenado &&
                        <Grid container spacing={2} mt={1}>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label="Sentencia definitiva"
                                    variant="outlined"
                                    value={datosFormulario.sentencia_definitiva}
                                    onChange={handleChange}
                                    name="sentencia_definitiva"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                    <MobileDatePicker
                                        format="DD/MM/YYYY"
                                        name='fecha_sentencia_definitiva'
                                        onChange={(newValue: Dayjs | null) => {
                                            setDatosFormulario((prevState: any) => ({
                                                ...prevState,
                                                fecha_sentencia_definitiva: newValue,
                                            }))
                                        }}
                                        value={datosFormulario.fecha_sentencia_definitiva ? dayjs(datosFormulario.fecha_sentencia_definitiva) : null}
                                        label="Fecha de emision sentencia"
                                    />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                    }
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <Typography variant='inherit'>
                                Hechos punibles y causas
                            </Typography>
                        </Grid>
                    </Grid>
                    {seleccionesEnPPL.map((seleccion, index) => (
                        <Grid container spacing={2} mt={1} key={index}>
                            <Grid item sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="hechosPunibles-field">Hechos punibles</InputLabel>
                                    <Select
                                        label='Hechos punibles'
                                        value={seleccion.hechoPunibleId}
                                        onChange={(e) => handleHechoPunibleChange(index, parseInt(e.target.value as string))}
                                    >
                                        <MenuItem disabled value={0}>Seleccionar hecho punible</MenuItem>
                                        {hechosPunibles.map((hp) => (
                                            <MenuItem key={hp.id} value={hp.id}>{hp.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={5}>
                                <FormControl fullWidth>
                                    <InputLabel id="causas-field">Causas</InputLabel>
                                    <Select
                                        label='causas'
                                        value={seleccion.causaId}
                                        onChange={(e) => handleCausaChange(index, parseInt(e.target.value as string))}
                                    >
                                        <MenuItem value={0} disabled>Seleccionar causa</MenuItem>
                                        {hechosPunibles.find(hp => hp.id === seleccion.hechoPunibleId)?.causas.map((causa) => {
                                            const isDisabled = isCausaSelected(seleccion.hechoPunibleId, causa.id);

                                            return(
                                                <MenuItem key={causa.id} value={causa.id} disabled={isDisabled}>
                                                    {causa.nombre}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={1} alignItems='center'>
                                <button onClick={() => handleEliminar(index)}>X</button>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant='text' startIcon={<Add/>} onClick={handleAgregar}>
                                Agregar Hecho Punible
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Defensor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="defensor"
                                    value={datosFormulario?.defensor ? datosFormulario.defensor : 0}
                                    label="Defensor"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={0}>Seleccionar defensor</MenuItem>
                                    {defensoresLista.map((item: {
                                        id: number; nombre: string; apellido: string; tipo: string
                                    }, index) => (
                                        <MenuItem key={index} value={item.id}> {item.apellido}, {item.nombre} - <span
                                            style={{textTransform: 'uppercase'}}>{item.tipo}</span></MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        name='fecha_de_aprehension'
                                        onChange={(newValue: Dayjs | null) => {
                                            setDatosFormulario((prevState: any) => ({
                                                ...prevState,
                                                fecha_de_aprehension: newValue,
                                            }))
                                        }}
                                        value={datosFormulario.fecha_de_aprehension ? dayjs(datosFormulario.fecha_de_aprehension) : null}
                                        label="Fecha de aprension y detencion"
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {datosFormulario.condenado ?
                        (
                            <Grid container spacing={2} mt={1} alignItems={'end'}>
                                <Grid item sm={12}>
                                    <FormControl>
                                        <FormLabel id="anhosDeExtraSeguridad">¿Cuentas con años extras de condena por
                                            medida de seguridad?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="anhosDeExtraSeguridad"
                                            name="tiene_anhos_extra_por_medida_de_seguridad"
                                            onChange={handleBooleanChange}
                                            value={datosFormulario.tiene_anhos_extra_por_medida_de_seguridad}
                                        >
                                            <FormControlLabel value={false} control={<Radio/>} label="No"/>
                                            <FormControlLabel value={true} control={<Radio/>} label="Si"/>


                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )
                        : null}
                    {datosFormulario.tiene_anhos_extra_por_medida_de_seguridad ?
                        <Grid container spacing={2} mt={1} alignItems={'end'}>
                            <Grid item sm={6}>
                                <TextField
                                    fullWidth
                                    label="Años"
                                    variant="outlined"
                                    onChange={(event) => {
                                        setDatosFormulario((prevState: any) => ({
                                            ...prevState,
                                            anhos_extra_por_medida_de_seguridad: {
                                                ...prevState.anhos_extra_por_medida_de_seguridad,
                                                anhos: event.target.value ? parseInt(event.target.value) : 0
                                            },
                                        }))
                                    }}
                                    value={datosFormulario?.anhos_extra_por_medida_de_seguridad?.anhos}
                                    name="anhos_extra_por_medida_de_seguridad.anhos"
                                />
                            </Grid><Grid item sm={6}>
                            <TextField
                                fullWidth
                                label="Meses"
                                variant="outlined"
                                onChange={(event) => {
                                    setDatosFormulario((prevState: any) => ({
                                        ...prevState,
                                        anhos_extra_por_medida_de_seguridad: {
                                            ...prevState.anhos_extra_por_medida_de_seguridad,
                                            meses: event.target.value ? parseInt(event.target.value) : null
                                        },
                                    }))
                                }}
                                value={datosFormulario?.anhos_extra_por_medida_de_seguridad?.meses}
                                name="anhos_extra_por_medida_de_seguridad.meses"
                            />
                        </Grid>
                        </Grid>
                        : null}
                    {datosFormulario.condenado ?
                        (
                            <Grid container spacing={2} mt={1} alignItems={'end'}>
                                <Grid item sm={8}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
                                        <MobileDatePicker
                                            format="DD/MM/YYYY"
                                            name='fecha_de_compurgamiento_inicial'
                                            onChange={(newValue: Dayjs | null) => {
                                                setDatosFormulario((prevState: any) => ({
                                                    ...prevState,
                                                    fecha_de_compurgamiento_inicial: newValue,
                                                }))
                                            }}
                                            value={datosFormulario.fecha_de_compurgamiento_inicial ? dayjs(datosFormulario.fecha_de_compurgamiento_inicial) : null}
                                            label="Fecha de compurgamiento inicial"
                                        />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )
                        : null}
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <Button variant={'contained'} onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

            </ModalComponent>
        </>
    )
}

export default ModalPersona;