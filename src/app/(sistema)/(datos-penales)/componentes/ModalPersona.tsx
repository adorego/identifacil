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
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useGlobalContext} from "@/app/Context/store";

const initialState = {apellido: "", id_persona: null, nombre: ""}

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

const initialStateForm = {
    id_persona: 0,
    nombre: "",
    apellido: "",
    apodo: "",
    condenado: false,
    defensor: 0,
    condena:{
        anhos: 0,
        meses: 0,
    },
    fecha_de_aprehension: null,
    tiene_anhos_extra_por_medida_de_seguridad: false,
    anhos_extra_por_medida_de_seguridad:{
        anhos: 0,
        meses:0,
    },
    sentencia_definitiva: '',
    fecha_sentencia_definitiva: null,
    fecha_de_compurgamiento_inicial: null,
    fecha_de_compurgamiento_recalculada: []
}
const ENDPOINT_API = process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API


const ModalPersona:FC<{onHandlerPersona:({}:{id_persona:number|null; nombre:string; apellido:string;},)=>(void), editPersona: {} | null, onOpen: boolean, onClose: ()=>void}>= ({onHandlerPersona, editPersona=null, onOpen, onClose})=>{
    const { open, handleOpen, handleClose } = useModal();

    // State de PPLS para poblar el selector
    const [personasLista, setPersonasLista] = useState<Array<any>>([])

    // State de
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState<Array<{ id_persona: number; nombre: string; apellido: string; }>>([])

    // State para guardar defensores
    const [defensoresLista, setDefensoresLista] = useState<Array<any>>([])

    // State para datos de forumlarios
    const [datosFormulario, setDatosFormulario] = useState<any>(initialStateForm)

    // State para guardar los hechos punibles seleccionados
    const [seleccionesEnPPL, setSeleccionesEnPPL] = useState<HechoPunibleConCausa[]>([]);

    // State para guardar lista de hechos punibles y causas
    const [hechosPunibles, setHechosPunibles] = useState<HechoPunible[]>([]); // Supongamos que esto viene de una API
    const {openSnackbar, closeSnackbar} = useGlobalContext();

    useEffect(() => {
        // Se obtiene datos de lista de PPLs
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res=>{
            setPersonasLista(prev=>([...res]))
        })



        // Se obtiene datos de
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/defensores`).then(res=>{
            setDefensoresLista(prev=>([...res.defensores]))
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

            // console.log(causasArray)


            setHechosPunibles(prev => ([...res.hechosPunibles]))
        })
    }, []);

    /**Si es que hay un dato para mostrar carga el formulario con datos precargados de PPL
     * */
    useEffect(() => {
        //console.log(editPersona)
        if (editPersona) {
            setDatosFormulario(editPersona); // Asume que editPersona tiene la forma correcta
        }
    }, [editPersona, onOpen]);

    /** Para controlar si es que debe abrir o cerrar el modal desde fuera del modal
     * */
    useEffect(() => {
        if(onOpen){

        handleOpen()
        }
    }, [onOpen]);

    const handleSelectChange = (event: SelectChangeEvent<number>) =>{
        /*const persona = personasLista.filter((item : {id_persona:number; nombre:string; apellido: string;})=> item.id_persona == event.target.value)
        setPersonasVinculadas(persona[0]);*/

        setDatosFormulario((prev: any) =>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    };

    const handleEditPersona = ()=>{
        handleOpen()
        console.log(editPersona)
        // setDatosFormulario(editPersona)
    }

    const handleChange = (event: any) =>{
        const persona = personasLista.filter((item : {id_persona:number; nombre:string; apellido: string;})=> item.id_persona == event.target.value)
        // setPersonasVinculadas(persona[0]);
        // console.log(persona[0].id_persona)
        if(event.target.name == 'id_persona'){
            setDatosFormulario((prev: any) =>({
                ...prev,
                id_persona: persona[0].id_persona,
                nombre: persona[0].nombre,
                apellido: persona[0].apellido,
                apodo: persona[0].apodo,
            }))
        }

        setDatosFormulario((prev: any) =>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const handleBooleanChange = (event: any) => {
        event.preventDefault();
        setDatosFormulario((prevState : any) => ({
            ...prevState,
            [event.target.name]: event.target.value == 'true',
        }))
    };

    const handleAgregar = () => {
        const nuevaSeleccion = {hechoPunibleId: hechosPunibles[0].id, causaId: hechosPunibles[0].causas[0].id};
        setSeleccionesEnPPL([...seleccionesEnPPL, nuevaSeleccion]);
    };

    // Handler para eliminar una fila de selección
    const handleEliminar = (index: number) => {
        const nuevasSelecciones = seleccionesEnPPL.filter((_, idx) => idx !== index);
        setSeleccionesEnPPL(nuevasSelecciones);
    };

    const handleSubmit = (e: any) =>{
        e.preventDefault();
        // console.log(personasSeleccionadas)


        // @ts-ignore
        if(personasSeleccionadas.id_persona !== 0){
            /*setDatosFormulario((prev: any) =>({
                ...prev,
                id_persona: persona[0].id_persona,
                nombre: persona[0].nombre,
                apellido: persona[0].apellido,
                apodo: persona[0].apodo,
            }))*/


            onHandlerPersona({
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
            })
            setSeleccionesEnPPL([])
            setDatosFormulario(initialStateForm)
            handleClose()
        }else{
            openSnackbar("Debe seleccionar un PPL", "error")
            setTimeout(()=>{
                closeSnackbar()
            }, 5000)
        }
    }

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

    return(
        <>
           <Stack spacing={2} direction='row' justifyContent='space-between'>
                <Typography variant='h6'>PPLs vinculados</Typography>
                <Button onClick={handleOpen} variant={'contained'}>
                    Agregar PPL
                </Button>
           </Stack>

            <ModalComponent open={open} onClose={()=> {
                handleClose()
                onClose()
                setSeleccionesEnPPL([])
                setDatosFormulario(initialStateForm)

            }} title='Agregar PPL' >
                <Box>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    fullWidth={true}
                                    value={personasSeleccionadas[0]}
                                    onChange={(event, newValue:any) => {
                                        // @ts-ignore
                                        setPersonasSeleccionadas((prev: any)=>({
                                            ...newValue
                                        }));
                                    }}
                                    id="controllable-states-demo"
                                    options={personasLista}
                                    getOptionLabel={(option) => `${option.apellido}, ${option.nombre} - ${option.numero_de_identificacion}` }
                                    renderInput={(params) => <TextField {...params} label="PPL AUTOCOMPLETE" />}
                                />
                            </FormControl>
                        </Grid>
                        {/*<Grid item sm={12}>
                            { (personasLista.length >0) ?
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">PPL</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={datosFormulario?.id_persona ? datosFormulario.id_persona: 0}
                                    label="PPL"
                                    name='id_persona'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Seleccionar PPL *</MenuItem>
                                    {personasLista.map((item : {
                                        id_persona: number; nombre:string; apellido: string;},index)=>(
                                        <MenuItem key={index} value={item.id_persona}>{item.nombre}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Requerido</FormHelperText>
                            </FormControl>
                            : null}
                        </Grid>*/}
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
                                        {hechosPunibles.find(hp => hp.id === seleccion.hechoPunibleId)?.causas.map((causa) => (
                                            <MenuItem key={causa.id} value={causa.id}>{causa.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={1} alignItems='center'>
                                <button onClick={() => handleEliminar(index)}>X</button>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid container spacing={2} mt={1}>
                        <Grid item>
                            <Button variant='contained' onClick={handleAgregar}>Agregar Hecho Punible</Button>
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
                                    value={datosFormulario?.defensor ? datosFormulario.defensor: 0}
                                    label="Defensor"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={0}>Seleccionar defensor</MenuItem>
                                    {defensoresLista.map((item : {
                                        id: number; nombre:string; apellido: string; tipo: string},index)=>(
                                        <MenuItem key={index} value={item.id}> {item.apellido}, {item.nombre} - <span style={{textTransform: 'uppercase'}}>{item.tipo}</span></MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {datosFormulario.condenado ?
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
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    name='fecha_sentencia_definitiva'
                                    onChange={(newValue: Dayjs | null) => {
                                        setDatosFormulario((prevState: any) => ({
                                            ...prevState,
                                            fecha_sentencia_definitiva: newValue,
                                        }))
                                    }}
                                    value={datosFormulario.fecha_sentencia_definitiva? dayjs(datosFormulario.fecha_sentencia_definitiva) : null}
                                    label="Fecha de emision sentencia"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    : null}
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={12}>
                            <Typography variant='overline'>
                                Duracion total de la condena
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                fullWidth
                                label="anhos"
                                variant="outlined"
                                onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
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
                                onChange={(event : React.ChangeEvent<HTMLInputElement>) => {
                                    setDatosFormulario((prevState: any) => ({
                                        ...prevState,
                                        condena: {
                                            ...prevState.condena,
                                            meses: event.target.value ? parseInt(event.target.value) : 0,
                                        },
                                    }))
                                }}
                                value={datosFormulario?.condena?.meses}
                                name="meses"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1}>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    name='fecha_de_aprehension'
                                    onChange={(newValue: Dayjs | null) => {
                                        setDatosFormulario((prevState: any) => ({
                                            ...prevState,
                                            fecha_de_aprehension: newValue,
                                        }))
                                    }}
                                    value={datosFormulario.fecha_de_aprehension? dayjs(datosFormulario.fecha_de_aprehension) : null}
                                    label="Fecha de aprension y detencion"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1} alignItems={'end'}>
                        <Grid item sm={12}>
                            <FormControl>
                                <FormLabel id="anhosDeExtraSeguridad">¿Cuentas con años extras de condena por medid de
                                    seguridad?</FormLabel>
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
                    <Grid container spacing={2} mt={1} alignItems={'end'}>
                        <Grid item sm={8}>
                            <FormControl fullWidth>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    name='fecha_de_compurgamiento_inicial'
                                    onChange={(newValue: Dayjs | null) => {
                                        setDatosFormulario((prevState: any) => ({
                                            ...prevState,
                                            fecha_de_compurgamiento_inicial: newValue,
                                        }))
                                    }}
                                    value={datosFormulario.fecha_de_compurgamiento_inicial? dayjs(datosFormulario.fecha_de_compurgamiento_inicial) : null}

                                    label="Fecha de compurgamiento inicial"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
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