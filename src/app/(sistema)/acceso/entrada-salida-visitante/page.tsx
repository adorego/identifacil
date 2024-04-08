'use client'

import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, useState} from "react"
import {IdentificationResponse, initialResponse} from "../../../../model/respuesta-identificacion";
import FaceRecognitionWithLayout from "@/components/registro/FaceRecognitionWithLayout";
import {IReconocimiento} from "@/components/registro/FaceDetectionOverlay";
import log from "loglevel";
import style from "./page.module.css";
import {useGlobalContext} from "@/app/Context/store";
import { api_request } from "@/lib/api-request";

const EstadosProgreso: Array<string> = ['No iniciado', 'Generando datos biométricos', 'Almacenando en la Base de Datos', 'Registro completo'];

interface pplAVisitar {
    id_persona:number|null;
    cedula: string;
    nombre: string;
    apellido: string;
}

const datosInicialesPplAVisitar = {
    id_persona:null,
    cedula: "",
    nombre: "",
    apellido: ""
}

interface RespuestaAConsultaPPL {
    id_persona: any;
    success: boolean;
    nombre: string;
    apellido: string;
}



const datosInicialesDeVisitante:IdentificationResponse= {
    identificado:false,
    numeroDeIdentificacion:"",
    nombres:"",
    apellidos:"",
    esPPL:false
}

interface SolicitudEntradaVisitante {
    visitante:number|null;//id_persona del visitante
    ppl_a_visitar:number|null;//id_persona del ppl a visitar
    establecimiento:number|null;
    fecha_ingreso:string|null;
    hora_ingreso:string|null;
    observacion: string;
}

const solicitudEntradaVisitanteInicial: SolicitudEntradaVisitante = {
    visitante:null,
    ppl_a_visitar:null,
    establecimiento:null,
    fecha_ingreso:null,
    hora_ingreso:null,
    observacion: ""
}
export default function EntradaSalidaVisitante() {
    const [progresoReconocimiento, setProgresoReconocmiento] = useState(EstadosProgreso[0]);
    const showSpinner = progresoReconocimiento === EstadosProgreso[0] ? false : true;
    const [identificationData, setIdentificationData] = useState<IdentificationResponse>(initialResponse);
    const [visitanteIdentificado, setVisitanteIdentificado] = useState<boolean>(false);
    const [pplIdentificado, setPPLIdentificado] = useState(false);
    const [autorizarIngreso, setAutorizarIngreso] = useState<string>("inicio");
    const [entrada_salida, setEntradaSalida] = useState<boolean | null>(null);
    const [pplAVisitar, setpplAVisitar] = useState<pplAVisitar>(datosInicialesPplAVisitar);
    const [entradaVisitante, setEntradaVisitante] = useState<SolicitudEntradaVisitante>(solicitudEntradaVisitanteInicial);
    const [mensaje, setMensaje] = useState("");
    const {openSnackbar} = useGlobalContext();
    const {selectedEstablecimiento} = useGlobalContext();


    const habilitar_envio_de_datos = visitanteIdentificado && pplIdentificado;
    const llamado_de_prueba = (reconocimiento:IReconocimiento)=>{
        console.log("Llamado de prueba:",reconocimiento);
    }

    const enviar_reconocimientos = async (reconocimiento: IReconocimiento):Promise<boolean> => {
        
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/identificacion/`;
        
        const dataToSend = {
            descriptorFacial: reconocimiento.descriptor
        }
        // console.log("Data to send:", dataToSend);
        setProgresoReconocmiento(EstadosProgreso[2]);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (!response.ok) {
            const data = await response.json();
            
            openSnackbar("Error en la consulta de datos", "error");
            return false;
        } else {
            const data: IdentificationResponse = await response.json();
            setProgresoReconocmiento(EstadosProgreso[0]);
            
            if(data.esPPL){
                openSnackbar(`La persona es un PPL`,'error');
                
            }else if(!data.id_persona){

                openSnackbar(`La persona no está registrada`,'error');
                
            }else{
                
                setIdentificationData({
                    identificado:data.identificado,
                    id_persona:data.id_persona,
                    numeroDeIdentificacion: data.numeroDeIdentificacion,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    esPPL: data.esPPL
                });
                setVisitanteIdentificado(true);
            }
            return true;
            
            // openSnackbar(`Persona Reconocida, nombre:${data.nombres}, apellido:${data.apellidos}, esPPL:${esPPL}`);
        }
    }

    const actualizar_progreso = (progreso: number) => {
        setProgresoReconocmiento(EstadosProgreso[progreso]);
    }

    const cerrar_dialogo = () => {
        setProgresoReconocmiento(EstadosProgreso[0]);
    }

    const onCedulaChangeManejador = (event: React.ChangeEvent<HTMLInputElement>) => {
        setpplAVisitar(
            (previus) => {
                return {
                    ...previus,
                    cedula: event.target.value
                }
            }
        )

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setEntradaVisitante(
            (previus) => {
                return {
                    ...previus,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    const onConsultarManejador = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls/cedula/${pplAVisitar.cedula}`;

        if (identificationData.numeroDeIdentificacion !== pplAVisitar.cedula) {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }

                });
                console.log("Respuesta a la consulta:",response);
                if (!response.ok) {
                    setPPLIdentificado(false);
                    setEntradaVisitante(solicitudEntradaVisitanteInicial);
                    throw new Error('Error en la petición');
                    
                }
                
                const data: RespuestaAConsultaPPL = await response.json();
                console.log("Data:",data)


                if (Object.keys(data).length === 0) {
                    openSnackbar(`No se encuentra a la PPL`,'error');
                    setPPLIdentificado(false);
                    setpplAVisitar(datosInicialesPplAVisitar);
                }
                if (data && data.id_persona) {
                    setPPLIdentificado(true)
                    setpplAVisitar(prev => ({
                        ...prev,
                        id_persona:data.id_persona,
                        nombre: data.nombre,
                        apellido: data.apellido,
                    }))
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        } else {
            openSnackbar('Numero de documento de visita no puede ser el igual al del visitante', 'error')
        }


    }

    const onEntradaSalidaSelectChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {

        setEntradaSalida(value === "true" ? true : false);
    }

    const entradaSalidaVisitante = async () => {
        const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/entrada_salida/visitantes/`
        
        console.log("Establecimiento seleccionado:",selectedEstablecimiento);
        
        if(entrada_salida){//Registro de Entrada
            //Validación de datos
            if(!pplAVisitar.id_persona){
                openSnackbar(`Debe identificarse un PPL a visitar`,"error");
            }
            if(!identificationData.id_persona){
                openSnackbar(`Debe identificarse la persona visitante`,"error");
            }
            if(!selectedEstablecimiento){
                openSnackbar(`Debe seleccionar un establecimiento,vuelva a intentar`,"error");
                
            }
            else{
                const url_entrada = url + "entrada";
                const fecha_hora = new Date();
                const datos_a_enviar ={
                    visitante:identificationData.id_persona,
                    ppl_a_visitar:pplAVisitar.id_persona,
                    fecha_ingreso:`${fecha_hora.getFullYear()}/${fecha_hora.getMonth()}/${fecha_hora.getDate()}`,
                    hora_ingreso:`${fecha_hora.getHours()}:${fecha_hora.getMinutes()}:${fecha_hora.getSeconds()}`,
                    establecimiento:selectedEstablecimiento,
                    observacion:entradaVisitante.observacion
                }
                console.log("Datos a enviar:",datos_a_enviar);
                const respuestaIngresoVisitante = await api_request(url_entrada,{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify(datos_a_enviar)
                })
                if(!respuestaIngresoVisitante.success){
                    openSnackbar(`Ocurrió un error:${respuestaIngresoVisitante.error}`,'error')
                }else{
                    openSnackbar(`Registro de visitante exitoso`,'success')
                }
                
            }
        }else{//Registro de Salida
             //Validación de datos
             if(!pplAVisitar.id_persona){
                openSnackbar(`Debe identificarse un PPL a visitar`,"error");
            }
            if(!identificationData.id_persona){
                openSnackbar(`Debe identificarse la persona visitante`,"error");
            }
            else{
                const url_entrada = url + "salida";
                const fecha_hora = new Date();
                const respuestaIngresoVisitante = await api_request(url_entrada,{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({
                        visitante:identificationData.id_persona,
                        ppl_que_visito:pplAVisitar.id_persona,
                        fecha_salida:`${fecha_hora.getFullYear()}/${fecha_hora.getMonth()}/${fecha_hora.getDate()}`,
                        hora_salida:`${fecha_hora.getHours()}:${fecha_hora.getMinutes()}:${fecha_hora.getSeconds()}`,
                        establecimiento:selectedEstablecimiento,
                        observacion:entradaVisitante.observacion
                    })
                })
                if(!respuestaIngresoVisitante.success){
                    openSnackbar(`Ocurrió un error:${respuestaIngresoVisitante.error}`,'error')
                }else{
                    openSnackbar(`Registro de salida de visitante exitoso`,'success')
                }
            }
        }
        setIdentificationData(datosInicialesDeVisitante);
        setpplAVisitar(datosInicialesPplAVisitar);
        setVisitanteIdentificado(false);
        setPPLIdentificado(false);
    }
    
   
    return (
        <>

            <FormControl className={style.form}>
                <Typography variant="h6">Entrada/Salida Visitante</Typography>
                <Box mt={3} sx={{
                    backgroundColor: '#FFF',
                    paddingY: '20px',
                    paddingX: '30px',
                    borderRadius: '16px',
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                }}>
                    <Grid container spacing={2}>
                        <Grid item pr={2} sm={6}>
                            <Box>
                                <Typography
                                    sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px", textAlign: "center"}}>
                                    Identificación del Visitante
                                </Typography>
                                
                                <FaceRecognitionWithLayout
                                    etiquetaLabel="Capturar"
                                    showSpinner={showSpinner}
                                    progresoRegistro={progresoReconocimiento}
                                    mensaje={mensaje}
                                    capturas={1}
                                    cerrar_dialogo={cerrar_dialogo}
                                    agregar_reconocimiento={enviar_reconocimientos}
                                    actualizar_progreso={actualizar_progreso}/>
                            </Box>
                        </Grid>
                        <Grid item sm={6} sx={{borderLeft: '1px solid rgb(189, 189, 189, .16)', margin: '20px 0'}}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                            Datos del Visitante
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Cedula"}
                                                value={identificationData.numeroDeIdentificacion}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sm={6}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Nombres"}
                                                value={identificationData.nombres}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sm={6}>
                                        <FormControl fullWidth={true}>
                                            <TextField
                                                label={"Apellidos"}
                                                value={identificationData.apellidos}
                                                disabled={true}>

                                            </TextField>
                                        </FormControl>

                                    </Grid>
                                   
                                </Grid>
                                {visitanteIdentificado &&
                                    (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item sm={12}>
                                                    <Typography
                                                        sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                                        Datos del PPL a quien visita
                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <FormControl fullWidth={true}>
                                                        <TextField
                                                            label={"Cédula"}
                                                            value={pplAVisitar.cedula}
                                                            onChange={onCedulaChangeManejador}
                                                            disabled={false}>
                                                        </TextField>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item sm={3}>
                                                    <FormControl fullWidth={true} sx={{}}>
                                                        <Button variant="contained" onClick={onConsultarManejador}>
                                                            Consultar
                                                        </Button>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <FormControl fullWidth={true}>
                                                        <TextField
                                                            InputLabelProps={{shrink: true}}
                                                            label={"Nombres"}
                                                            value={pplAVisitar.nombre}
                                                            disabled={true}>

                                                        </TextField>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item sm={6}>
                                                    <FormControl fullWidth={true}>
                                                        <TextField
                                                            InputLabelProps={{shrink: true}}
                                                            label={"Apellidos"}
                                                            value={pplAVisitar.apellido}
                                                            disabled={true}>

                                                        </TextField>
                                                    </FormControl>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <Typography
                                                            sx={{fontWeight: 'bold', textTransform: 'uppercase', mt: "10px"}}>
                                                            Entrada o Salida
                                                        </Typography>

                                                        <RadioGroup
                                                            value={entrada_salida}
                                                            onChange={onEntradaSalidaSelectChange}
                                                            row
                                                            aria-labelledby="entradaSalida"
                                                            name="entrada_salida">
                                                            <FormControlLabel
                                                                value={true}
                                                                control={<Radio/>}
                                                                label="Entrada"/>
                                                            <FormControlLabel
                                                                value={false}
                                                                control={<Radio/>}
                                                                label="Salida"/>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                {entrada_salida != null &&
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={2}>
                                                        <Grid item sm={12}>
                                                            <FormControl fullWidth={true}>
                                                                <TextField
                                                                    multiline
                                                                    minRows={3}
                                                                    label={"Observación"}
                                                                    name="observacion"
                                                                    value={entradaVisitante.observacion}
                                                                    onChange={handleChange}
                                                                    disabled={false}>
                                                                </TextField>
                                                            </FormControl>

                                                        </Grid>
                                                        <Grid item sm={12}>
                                                            <FormControl fullWidth={true} sx={{}}>
                                                                <Button variant="contained" disabled={!habilitar_envio_de_datos} onClick={entradaSalidaVisitante}>
                                                                    Solicitar Autorización
                                                                </Button>
                                                            </FormControl>
                                                        </Grid>
                                                        
                                                        {autorizarIngreso === "consultando" &&
                                                            <Grid item sm={12} alignItems={"center"}>
                                                                <Box sx={{display: "flex", justifyContent: "center"}}>
                                                                    <CircularProgress size={200}/>
                                                                </Box>
                                                            </Grid>


                                                        }
                                                    </Grid>
                                                    </Grid>

                                                }
                                            </Grid>
                                        </>

                                    )
                                }
                                

                            </Box>
                        </Grid>
                      
                    </Grid>

                </Box>
            </FormControl>
        </>
    )
}