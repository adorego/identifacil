import React, {useEffect, useState} from "react";
import {
    Box, Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel, MenuItem,
    Paper,
    RadioGroup, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import NoDataBox from "@/components/loadingScreens/noDataBox";
import dayjs, {Dayjs} from "dayjs";
import {MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import CustomTable from "@/components/CustomTable";

type SalidasTransitoriasType ={
    id_persona: number | null;
    numero_de_oficio: string;
    fecha_de_oficio: Dayjs | null;
    oficio_documento: File | string | null;
    horario_salida: Dayjs | null;
    dias_de_salida: string;
    horario_entrada: Dayjs | null;
    dias_de_entrada: string;
    estado_autorizacion: number;
    timpo_de_permiso: Dayjs | null;

}

const SalidasTransitoriasInitial ={
    id_persona: null,
    numero_de_oficio: '',
    fecha_de_oficio: null,
    oficio_documento: '',
    horario_salida: null,
    dias_de_salida: '',
    horario_entrada: null,
    dias_de_entrada: '',
    estado_autorizacion: 0,
    timpo_de_permiso: null,
}
type DiasSeleccionadosType = {
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
}

const diasIniital = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false
}


const header = [
    {id: 'id', label: 'ID'},
    {id: 'fecha_hora', label: 'Fecha/Horae'},
    {id: 'tipo', label: 'Tipo movimiento'},
    {id: 'observacion', label: 'Observacion'},
]
const data = [
    {id: 0, fecha_hora: '20/01/2024 - 20:00:00', tipo: 'Entrada', observacion: 'N/D' },
    {id: 0, fecha_hora: '20/01/2024 - 20:00:00', tipo: 'Salida', observacion: 'N/D' },
    {id: 0, fecha_hora: '20/01/2024 - 20:00:00', tipo: 'Entrada', observacion: 'N/D' },
    {id: 0, fecha_hora: '20/01/2024 - 20:00:00', tipo: 'Salida', observacion: 'N/D' },
]

export default function TabSalidaTransitoria({id_persona}:{id_persona:number}){
    /** Estado para almacenar datos del registro de entras y saldias */
    const [stateDatosSalidasTransitorias, setStateDatosSalidasTransitorias] = useState<SalidasTransitoriasType>(SalidasTransitoriasInitial)

    /** Datos para poblar elementos del form*/
    const [stateDiasSalida, setStateDiasSalida] = useState<DiasSeleccionadosType>(diasIniital)

    const [stateDiasEntrada, setStateDiasEntrada] = useState<DiasSeleccionadosType>(diasIniital)


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(id_persona !== null){
            setStateDatosSalidasTransitorias((prev)=>({
                ...prev,
                id_persona: id_persona,
            }))
        }

    }, [id_persona]);


    const handleChange = (e:any)=>{

        setStateDatosSalidasTransitorias((prev:any)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }


    const handleDiasSalidas = (e: any) =>{

        setStateDiasSalida(prev=>({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }


    const handleDiasEntradas = (e: any) =>{


        setStateDiasEntrada(prev=>({
            ...prev,
            [e.target.name]: e.target.checked
        }))
    }

    const handleBooleanChange = (event: React.ChangeEvent<HTMLInputElement>, tipoEntraad: string) => {


        // Todo: entender la logica de lo que hay que hacer aca
        if (tipoEntraad == 'dias_salida') {
            /*setStateDatosSalidasTransitorias((prev) => ({
                ...prev,
                dias_de_salida: {

                    [event.target.name]: event.target.value,
                }

            }));*/
        }

    };

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        console.log('guardo')
    }

    // cambiar des
    if(loading){
        return(
            <>
                <NoDataBox />
            </>
        )

    }

    return(
        <>
            <Box
                component={Paper}
                mt={3}
                elevation={3}
                minHeight='calc(100vh - 450px)'
                p={3}
            >
                <Grid container spacing={2} mb={3}>
                    <Grid item sm={12}>
                        <Typography variant='h5'>
                            Salidas Transitorias
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <TextField
                            fullWidth
                            label='Nro. de oficio'
                            name='numero_de_oficio'
                            value={stateDatosSalidasTransitorias.numero_de_oficio}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <MobileDatePicker
                                label='Fecha de oficio'
                                format="DD/MM/YYYY"
                                name='fecha_de_oficio'
                                onChange={(newValue: Dayjs | null) => {
                                    setStateDatosSalidasTransitorias((prevState: any) => ({
                                        ...prevState,
                                        fecha_de_oficio: newValue,
                                    }))
                                }}
                                value={stateDatosSalidasTransitorias.fecha_de_oficio ? dayjs(stateDatosSalidasTransitorias.fecha_de_oficio) : null}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            label='Documento adjunto'
                            name='oficio_documento'
                            value={stateDatosSalidasTransitorias.oficio_documento}
                        />
                    </Grid>
                </Grid>

                {/* Datos de Salida*/}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={2}>
                        <FormControl fullWidth>
                            <TimePicker
                                label='Hora de salida'
                                format="mm:ss"
                                name='horario_salida'
                                onChange={(newValue: Dayjs | null) => {
                                    setStateDatosSalidasTransitorias((prevState: any) => ({
                                        ...prevState,
                                        horario_salida: newValue,
                                    }))
                                }}
                                value={stateDatosSalidasTransitorias.horario_salida ? dayjs(stateDatosSalidasTransitorias.horario_salida) : null}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={10} sx={{bgcolor: '#FFF'}} >

                        <FormControl >
                            <FormLabel id="dias_salida_id">Dias de salida</FormLabel>
                            <RadioGroup
                                value={stateDatosSalidasTransitorias.dias_de_salida}
                                onChange={(event) => {
                                    handleBooleanChange(event, 'dias_salida')
                                }}
                                row
                                aria-labelledby="discapacidad_fisica"
                                name="discapacidad_fisica"
                            >
                                <FormControlLabel
                                    value="domingo"
                                    control={<Checkbox checked={stateDiasSalida.domingo} onChange={handleDiasSalidas} name='domingo'/>}
                                    label="domingo"/>
                                <FormControlLabel
                                    value="lunes"
                                    control={<Checkbox checked={stateDiasSalida.lunes} onChange={handleDiasSalidas} name='lunes'/>}
                                    label="Lunes"/>
                                <FormControlLabel
                                    value="martes"
                                    control={<Checkbox checked={stateDiasSalida.martes} onChange={handleDiasSalidas} name='martes'/>}
                                    label="Martes"/>
                                <FormControlLabel
                                    value="miercoles"
                                    control={<Checkbox checked={stateDiasSalida.miercoles} onChange={handleDiasSalidas} name='miercoles'/>}
                                    label="Miercoles"/>
                                <FormControlLabel
                                    value="jueves"
                                    control={<Checkbox checked={stateDiasSalida.jueves} onChange={handleDiasSalidas} name='jueves'/>}
                                    label="Jueves"/>
                                <FormControlLabel
                                    value="viernes"
                                    control={<Checkbox checked={stateDiasSalida.viernes} onChange={handleDiasSalidas} name='viernes'/>}
                                    label="Viernes"/>
                                <FormControlLabel
                                    value="sabado"
                                    control={<Checkbox checked={stateDiasSalida.sabado} onChange={handleDiasSalidas} name='sabado'/>}
                                    label="Sabado"/>
                            </RadioGroup>
                        </FormControl>


                    </Grid>

                </Grid>
                {/* Datos de Entrada*/}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={2}>
                        <FormControl fullWidth>
                            <TimePicker
                                label='Hora de entrada'
                                format="mm:ss"
                                name='horario_entrada'
                                onChange={(newValue: Dayjs | null) => {
                                    setStateDatosSalidasTransitorias((prevState: any) => ({
                                        ...prevState,
                                        horario_entrada: newValue,
                                    }))
                                }}
                                value={stateDatosSalidasTransitorias.horario_entrada ? dayjs(stateDatosSalidasTransitorias.horario_entrada) : null}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={10} sx={{bgcolor: '#FFF'}} >

                        <FormControl >
                            <FormLabel id="dias_salida_id">Dias de entrada</FormLabel>
                            <RadioGroup
                                value={stateDatosSalidasTransitorias.dias_de_entrada}
                                onChange={(event) => {
                                    handleBooleanChange(event, 'dias_salida')
                                }}
                                row
                                aria-labelledby="discapacidad_fisica"
                                name="discapacidad_fisica"
                            >
                                <FormControlLabel
                                    value="domingo"
                                    control={<Checkbox checked={stateDiasEntrada.domingo} onChange={handleDiasEntradas} name='domingo'/>}
                                    label="domingo"/>
                                <FormControlLabel
                                    value="lunes"
                                    control={<Checkbox checked={stateDiasEntrada.lunes} onChange={handleDiasEntradas} name='lunes'/>}
                                    label="Lunes"/>
                                <FormControlLabel
                                    value="martes"
                                    control={<Checkbox checked={stateDiasEntrada.martes} onChange={handleDiasEntradas} name='martes'/>}
                                    label="Martes"/>
                                <FormControlLabel
                                    value="miercoles"
                                    control={<Checkbox checked={stateDiasEntrada.miercoles} onChange={handleDiasEntradas} name='miercoles'/>}
                                    label="Miercoles"/>
                                <FormControlLabel
                                    value="jueves"
                                    control={<Checkbox checked={stateDiasEntrada.jueves} onChange={handleDiasEntradas} name='jueves'/>}
                                    label="Jueves"/>
                                <FormControlLabel
                                    value="viernes"
                                    control={<Checkbox checked={stateDiasEntrada.viernes} onChange={handleDiasEntradas} name='viernes'/>}
                                    label="Viernes"/>
                                <FormControlLabel
                                    value="sabado"
                                    control={<Checkbox checked={stateDiasEntrada.sabado} onChange={handleDiasEntradas} name='sabado'/>}
                                    label="Sabado"/>
                            </RadioGroup>
                        </FormControl>


                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">PPL</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={stateDatosSalidasTransitorias?.estado_autorizacion ? stateDatosSalidasTransitorias.estado_autorizacion: 0}
                                label="Estado"
                                name='estado_autorizacion'
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Seleccionar PPL *</MenuItem>

                                    <MenuItem  value={0}>Activo</MenuItem>
                                    <MenuItem  value={1}>Sin aturizacion</MenuItem>

                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl fullWidth>
                            <MobileDatePicker
                                label='Duracion de permiso'
                                format="mm:ss"
                                name='timpo_de_permiso'
                                onChange={(newValue: Dayjs | null) => {
                                    setStateDatosSalidasTransitorias((prevState: any) => ({
                                        ...prevState,
                                        timpo_de_permiso: newValue,
                                    }))
                                }}
                                value={stateDatosSalidasTransitorias.timpo_de_permiso ? dayjs(stateDatosSalidasTransitorias.timpo_de_permiso) : null}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <Typography variant='h6' mb={2}>
                            Registro de movimientos
                        </Typography>
                        <CustomTable

                            headers={header}
                            data={data}
                            showId={false}
                            options={{
                                deleteOption: false,
                                rowsPerPageCustom: 10,
                                pagination: true,
                                targetURL: `/ppl`,
                                busqueda: `id_persona`,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}