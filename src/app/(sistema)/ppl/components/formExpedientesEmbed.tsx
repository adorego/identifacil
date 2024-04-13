import {
    Alert,
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel, MenuItem, Radio,
    RadioGroup, Select,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import {fetchData, postForm, postFormExpedienteJudicial} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useRouter} from "next/navigation";


type FormStateType = {
    numeroDeExpediente: string;
    condenado: boolean;
    sentenficia_definitiva: string;
    estado_procesal: string;
    caratula_expediente: string;
    id_persona: number | null;
}

const formStateInitial : FormStateType = {
    numeroDeExpediente: '',
    condenado: false,
    sentenficia_definitiva: '',
    estado_procesal: 'N/D',
    caratula_expediente: '',
    id_persona: null,
}
type HechoPunibleConCausa = {
    hechoPunibleId: number;
    causaId: number;
};

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

const ENDPOINT_API = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}`

const testData = {
    numeroDeExpediente: "12567/38",
    condenado: false,
    hechosPuniblesCausas: [[1,12]],
    estado_procesal: "Con prisión domiciliaria",
    caratula_expediente: "Asesinato en primer grado",
    despacho_judicial: 1,
    ppls_en_expediente: [
        {
            id_persona: 17,
            condenado: true,
            hechosPuniblesCausas: [[1,12]],
            defensor: 1,
            condena: {
                anhos: 13,
                meses: 3
            },
            fecha_de_aprehension: "2022-03-01",
            tiene_anhos_extra_por_medida_de_seguridad: true,
            anhos_extra_por_medida_de_seguridad: {
                anhos: 2,
                meses: 10
            },
            sentencia_definitiva: "1234",
            fecha_sentencia_definitiva: "2022-03-01",
            fecha_de_compurgamiento_inicial: "2031-02-22"
        }
    ],
    circunscripcion: 1,
    ciudad: 1,
    anho: 2017,
    juzgado_de_tribunal_de_sentencia: "Primera sala",
    secretaria: "3er turno",
    lugar_del_hecho: "Barrio Obrero",
    link_de_noticia: "www.abc.com.py/judiciales/1.html",
    sentencia_definitiva: "12343",
    fecha_sentencia_definitiva: "2022-03-01"


}

export default function FormExpedientesEmebed({id_persona=null, onHandledata }:{id_persona?: null | number; onHandledata: (arg1:number, arg2:string, arg3:string)=>void }){

    const [formState, setFormState] = useState<FormStateType>(formStateInitial);
    const [selecciones, setSelecciones] = useState<HechoPunibleConCausa[]>([]);
    const [hechosPunibles, setHechosPunibles] = useState<HechoPunible[]>([]);
    const [loading, setLoading] = useState(false)
    const {openSnackbar} = useGlobalContext();
    const router = useRouter();

    const handleChange = (event: any) =>{
        setFormState((prev:any)=>({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    /** Se obtiene datos para poblar lista de hechos punibles y causas **/
    useEffect(() => {

        setFormState(prev=>({
            ...prev
        }))
        fetch(`${ENDPOINT_API}/datos_penales/hechos_punibles`)
            .then(res=> res.json())
            .then(data => {
                const causasArray: Array<{ id: number; nombre: string; codigo: string; causa_id: number; }> = [];
                // @ts-ignore
                data.hechosPunibles.forEach(hechoPunible => {
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
                // @ts-ignore
                setHechosPunibles(prev => ([...data.hechosPunibles]))
            })
    }, []);

    /** Funcion para manejar datos de hechos punibles y causas
     * */
    const handleAgregar = () => {
        const nuevaSeleccion = {hechoPunibleId: 0, causaId: 0};
        setSelecciones([...selecciones, nuevaSeleccion]);
    };

    /** Funcion para eliminar hechos punibles seleccionados
     * */
    const handleEliminar = (index: number) => {
        const nuevasSelecciones = selecciones.filter((_, idx) => idx !== index);
        setSelecciones(nuevasSelecciones);
    };

    /** Funcion para manejar cambios en selector de causa
     * */
    const handleCausaChange = (index: number, nuevaCausaId: number) => {
        const nuevasSelecciones = selecciones.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    causaId: nuevaCausaId,
                };
            }
            return seleccion;
        });
        setSelecciones(nuevasSelecciones);
    };


    const isCausaSelected = (hechoPunibleId:number, causaId:number) => {
        return selecciones.some(seleccion =>
            seleccion.hechoPunibleId === hechoPunibleId && seleccion.causaId === causaId
        );
    };


    /** Funcion para manejar cambios en selector de hechos punibles
     * */
    const handleHechoPunibleChange = (index: number, nuevoHechoPunibleId: number) => {
        const nuevasSelecciones = selecciones.map((seleccion, idx) => {
            if (idx === index) {
                return {
                    ...seleccion,
                    hechoPunibleId: nuevoHechoPunibleId,
                    causaId: hechosPunibles.find(hp => hp.id === nuevoHechoPunibleId)?.causas[0].id || 0,
                };
            }
            return seleccion;
        });
        setSelecciones(nuevasSelecciones);
    };
    const validadorHechosPunibles = ()=>{
        let esValidado = false



        // Se busca una cauda o hechos punible con id = 0
        const busquedaDeCausaVacia = selecciones.some((item:any)=>(item.hechoPunibleId==0 || item.causaId==0))

        // Si es True la busqueda significa que esta vacio. Por ende no debe habilitar
        if(!busquedaDeCausaVacia){
            esValidado = true
        }else{
            openSnackbar('Seleccionar hecho punibles y/o causa', 'warning')
        }

        return esValidado
    }

    /** Funcion para enviar datos
     * */
    const handleSubmit = async () =>{



        if(validadorHechosPunibles()){

            /** Se controla campos vacios */
            if (formState.numeroDeExpediente && formState.caratula_expediente && selecciones.length > 0){
                try {
                    setLoading(true);
                    const response = await postFormExpedienteJudicial(
                        false,
                        'datos_penales/expedientes',
                        'Expediente',
                        {
                            ...formState,
                            hechosPuniblesCausas: selecciones.map((item: any) => Object.values(item)),
                        },
                        setLoading,
                        openSnackbar,
                        router,
                        false
                    );

                    if (!response) {
                        throw new Error('No se recibió respuesta del servidor');
                    }

                    if (response.ok) {
                        const data = await response.json();
                        if (data) {
                            onHandledata(data.id, formState.caratula_expediente, formState.numeroDeExpediente);
                        }
                    } else {

                        switch (response.status) {
                            case 400:
                                openSnackbar('Petición incorrecta, revisa los datos enviados.', 'warning');
                                break;
                            case 500:
                                openSnackbar('Expediente judicial ya existe', 'warning');
                                break;
                            default:
                                openSnackbar('Campos ingresados incorrectos.', 'error');
                        }
                        throw new Error(`Error en la petición: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    // Esta es una captura general para cualquier otro error que no sea un error HTTP
                    // openSnackbar('Error en expediente judicial!', 'warning');
                } finally {
                    setLoading(false);
                }

            }else{
                openSnackbar('Completar los campos requeridos.', 'warning');
            }

        }
    }

    if(id_persona == null){
        return(
            <Box mt={2}>
                <Alert severity='error'>
                    Error obteniendo id de persona.
                </Alert>
            </Box>
        )
    }

    return(
        <Box mt={3}>

            <Divider />
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12}>
                    <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                        Agregar Expediente Judicial
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={6}>

                    <TextField
                        required
                        fullWidth
                        label="Nro. de expediente"
                        variant="outlined"
                        name="numeroDeExpediente"
                        value={formState.numeroDeExpediente}
                        onChange={handleChange}
                        error={formState.numeroDeExpediente == ''}
                        helperText={formState.numeroDeExpediente == "" ? '* Campo requerido' : ''}
                    />

                </Grid>

            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={6}>
                    <FormControl>
                        <FormLabel id="situacion-procesal-field">Situacion procesal</FormLabel>
                        <RadioGroup
                            defaultValue={false}
                            row
                            aria-labelledby="situacion-procesal-field"
                            name="condenado"
                            value={formState.condenado}
                            onChange={(event)=>{
                                setFormState((prev:any)=>({
                                    ...prev,
                                    condenado: event.target.value == 'true'
                                }))
                            }}
                        >
                            <FormControlLabel value={false} control={<Radio/>} label="Procesado"/>
                            <FormControlLabel value={true} control={<Radio/>} label="Condenado"/>


                        </RadioGroup>
                    </FormControl>
                </Grid>
                {formState.condenado ?
                    <Grid item sm={6}>

                        <TextField
                            fullWidth
                            label="Nro. de Sentencia definitiva"
                            variant="outlined"
                            name="sentenficia_definitiva"
                            value={formState.sentenficia_definitiva}
                            onChange={handleChange}
                        />

                     </Grid>
                    : null}
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12} >
                    <FormControl fullWidth>
                        <TextField
                            style={{width: '100%'}}
                            fullWidth
                            label="Caratula"
                            multiline
                            rows={2}
                            variant="outlined"
                            name="caratula_expediente"
                            value={formState.caratula_expediente}
                            onChange={handleChange}
                            error={formState.caratula_expediente == ''}
                            helperText={formState.caratula_expediente == "" ? '* Campo requerido' : ''}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item sm={12} mt={2}>
                <Typography variant='h6'>Hechos Punibles</Typography>
                <Typography variant='caption' color='error' ml={2}>
                    * Campo requerido
                </Typography>
            </Grid>
            {
                !loading ? (
                <>
                    {selecciones.map((seleccion, index) => (
                    <Grid container spacing={2} key={index} mt={1}>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="hechosPunibles-field">Hechos punibles</InputLabel>
                                <Select
                                    label='Hechos punibles'
                                    value={seleccion.hechoPunibleId}
                                    onChange={(e) => handleHechoPunibleChange(index, parseInt(e.target.value as string))}
                                >
                                    <MenuItem value={0} disabled>Seleccionar hecho punible</MenuItem>
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
                                    defaultValue={0}
                                    onChange={(e) => handleCausaChange(index, parseInt(e.target.value as string))}
                                >
                                    <MenuItem value={0} disabled>Seleccionar causa</MenuItem>
                                    {hechosPunibles.find(hp => hp.id === seleccion.hechoPunibleId)?.causas.map((causa) => {
                                        const isDisabled = isCausaSelected(seleccion.hechoPunibleId, causa.id);
                                        return(
                                        <MenuItem key={causa.id} value={causa.id} disabled={isDisabled}>{causa.nombre}</MenuItem>
                                    )})}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1} alignItems='center'>
                            <button onClick={() => handleEliminar(index)}>X</button>
                        </Grid>
                    </Grid>
                ))}
                    <Grid container spacing={2} >
                        <Grid item>
                            <Button variant='text' onClick={handleAgregar} startIcon={<AddIcon />} sx={{background: 'none'}}>
                                Agregar Hecho Punible
                            </Button>
                        </Grid>
                    </Grid>
                </>
            ) : (
                'Cargando hechos punibles...'
                )
            }
            <Grid container spacing={2} mt={1}>
                <Grid item sm={12}>
                    <Button  variant='contained' onClick={handleSubmit}>
                        Guardar expediente
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}