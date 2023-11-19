import * as React from "react";


import {
    FormControl, FormControlLabel,
    FormLabel, Radio, RadioGroup, Grid, Box, InputLabel, OutlinedInput, Select, MenuItem, Button, Typography
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StyledTextarea from '../../../components/interfaz/StyledTextArea';
import {ChangeEvent} from "react";



interface oficioType{
    numeroDocumento: number;
    fechaDocumento: string;
    lugar: string;
}
interface resolucionType{
    numeroDocumento: number;
    fechaDocumento: string;
    documento: string;
}
interface expedienteType{
    numeroDocumento: number;
    fechaDocumento: string;
}

interface MyState{
    situacionJudicial: string;
    primeraVezPrision: boolean;
    cantidadIngresos: number;
    causa: string;
    oficio: string;
    ultimoTrabajo: string,
    oficioJudicial: oficioType,
    resolucion: resolucionType,
    expediente: expedienteType,
    caratula: string;
    hechoPunible: string;
    nroSd: string;
}

const initialState: MyState = {
    situacionJudicial: 'condenado',
    primeraVezPrision: false,
    cantidadIngresos: 0,
    causa: '',
    oficio: '',
    ultimoTrabajo: '',
    oficioJudicial:{
        numeroDocumento: 0,
        fechaDocumento: '',
        lugar: '',
    },
    resolucion:{
        numeroDocumento: 0,
        fechaDocumento: '',
        documento: '',
    },
    expediente:{
        numeroDocumento: 0,
        fechaDocumento: '',
    },
    caratula: '',
    hechoPunible: '',
    nroSd:'',
}


export default function BloqueJudicial({ onCloseAccordion }) {

    const [state, setState] = React.useState(initialState);
    const [causa, setCausa] = React.useState('');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setCausa(event.target.value as string);
    };

    // se recibe valores de los inputs depende si es un tipoDato arma un objeto dentro del state
    const handleChange = (tipoDato: any="", event: any,) => {

        const inputName: any = event.target.name;
        const inputValue: any = event.target.value;


        if(tipoDato=='oficioJudicial' || tipoDato == 'resolucion' || tipoDato =='expediente'){
            // console.log('oficio')
            setState({
                ...state,
                [tipoDato]: {
                    ...state[tipoDato],
                    [inputName]: inputValue,
                }
            });
        }else{
            setState({
                ...state,
                [inputName]: inputValue,
            });
        }

    };

    const handleBoolean = (event:  ChangeEvent<HTMLInputElement>) => {

        const inputName: string = event.target.name;
        const inputValue = event.target.value === 'true';

        setState({
            ...state,
            [inputName]: inputValue,
        });

    }

    const handleSubmit = (event: ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault();

        // Cierra el Acordeon
        onCloseAccordion();

        //Convierte a JSON el state
        // console.log(console.log(JSON.stringify(state)));
        console.log(state);

        // TODO: Hacer el FETCH aca
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
            >

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="situacionJudicial">Situación judicial</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="situacionJudicial"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="procesado" control={
                                    <Radio
                                        name='situacionJudicial'
                                        value='procesado'
                                        checked={state.situacionJudicial === 'procesado'}
                                        onChange={(event) => handleChange('', event)}
                                    />
                                } label="Procesado"/>
                                <FormControlLabel value="condenado" control={
                                    <Radio
                                        name='situacionJudicial'
                                        value='condenado'
                                        checked={state.situacionJudicial === 'condenado'}
                                        onChange={(event) => handleChange('', event)}
                                    />
                                } label="Condenado"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="primeraVezPrision">Primera vez en prisión:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="primeraVezPrision"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={
                                    <Radio
                                        name='primeraVezPrision'
                                        value='true'
                                        checked={state.primeraVezPrision}
                                        onChange={handleBoolean}
                                    />
                                } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        name='primeraVezPrision'
                                        value='false'
                                        checked={!state.primeraVezPrision}
                                        onChange={handleBoolean}
                                    />
                                } label="No"/>
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="cantidadVecesPrision">Cantidad de veces de ingreso</InputLabel>
                            <OutlinedInput
                                name="cantidadIngresos"
                                value={state.cantidadIngresos}
                                onChange={(event) => handleChange('', event)}
                                label="Cantidad de veces de ingreso"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="datoCausa">Seleccionar Causa</InputLabel>
                            <OutlinedInput
                                name="causa"
                                value={state.causa}
                                onChange={(event) => handleChange('', event)}
                                label="Seleccionar Causa"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/*<Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="selectCausa">Causa</InputLabel>
                            <Select
                                disabled
                                labelId="selectCausa"
                                id="selectCausa"
                                value={causa}
                                label="Causa"
                                onChange={handleChangeSelect}
                            >
                                <MenuItem value={10}>Causa 1</MenuItem>
                                <MenuItem value={20}>Causa 2</MenuItem>
                                <MenuItem value={30}>Causa 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>*/}

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="oficio">Oficio</InputLabel>
                            <OutlinedInput
                                name="oficio"
                                value={state.oficio}
                                onChange={(event) => handleChange('', event)}
                                label="Oficio"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                            <OutlinedInput
                                name="ultimoTrabajo"
                                value={state.ultimoTrabajo}
                                onChange={(event) => handleChange('', event)}
                                label="Ultimo lugar de trabajo"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography sx={{fontWeight:'bold', textTransform:'uppercase'}}>Documento que ordena la reclusión</Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant='h6'>Oficio judicial</Typography>
                        <Grid container spacing={2}>

                            <Grid item sm={3}>
                                <FormControl fullWidth sx={{ marginTop: '17px',}}>
                                    <InputLabel htmlFor="numeroDocumento">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        name="numeroDocumento"
                                        value={state.oficioJudicial.numeroDocumento}
                                        label="Nro. de documento"
                                        onChange={(event) => handleChange('oficioJudicial', event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha documento"
                                            name='fechaDocumento'
                                            value={state.oficioJudicial.fechaDocumento}
                                            onChange={(newValue) => {
                                                setState({
                                                    ...state,
                                                    oficioJudicial: {
                                                        ...state.oficioJudicial,
                                                        fechaDocumento: newValue,
                                                    },
                                                });
                                            }}
                                        />
                                    </DemoContainer>

                                </LocalizationProvider>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth sx={{ marginTop: '17px',}}>
                                    <InputLabel htmlFor="lugar">Lugar</InputLabel>
                                    <OutlinedInput
                                        name="lugar"
                                        value={state.oficioJudicial.lugar}
                                        label="Lugar"
                                        onChange={(event) => handleChange('oficioJudicial', event)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Resolucion MJ/DGEP*/}
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Typography variant='h6' mt={2} mb={0}>Resolución MJ/DGEP</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth sx={{ marginTop: '8px',}}>
                                    <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        name="numeroDocumento"
                                        value={state.resolucion.numeroDocumento}
                                        label="Nro. de documento"
                                        onChange={(event) => handleChange('resolucion', event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha documento"
                                            name='fechaDocumento'
                                            value={state.resolucion.fechaDocumento}
                                            onChange={(newValue) => {
                                                setState({
                                                    ...state,
                                                    resolucion: {
                                                        ...state.resolucion,
                                                        fechaDocumento: newValue,
                                                    },
                                                });
                                            }}
                                        />
                                    </LocalizationProvider>

                            </Grid>
                            <Grid item sm={3} >
                                <FormControl fullWidth sx={{ marginTop: '8px',}}>
                                    <InputLabel htmlFor="datoLugar">Documento</InputLabel>
                                    <OutlinedInput
                                        name="documento"
                                        value={state.resolucion.documento}
                                        label="Documento"
                                        onChange={(event) => handleChange('resolucion', event)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} mt={2}>
                            <Grid item sm={12}>
                                <Typography variant='h6'>Nro. de Expediente</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth sx={{ marginTop: '8px',}}>
                                    <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        name="numeroDocumento"
                                        value={state.expediente.numeroDocumento}
                                        label="Nro. de documento"
                                        onChange={(event) => handleChange('expediente', event)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha documento"
                                            name='fechaDocumento'
                                            value={state.expediente.fechaDocumento}
                                            onChange={(newValue) => {
                                                setState({
                                                    ...state,
                                                    expediente: {
                                                        ...state.expediente,
                                                        fechaDocumento: newValue,
                                                    },
                                                });
                                            }}
                                        />
                                    </LocalizationProvider>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={12}>
                        <FormControl fullWidth sx={{ marginTop: '17px',}}>
                        <InputLabel htmlFor="caratula">Caratula</InputLabel>
                        <OutlinedInput
                            fullWidth
                            name="caratula"
                            value={state.oficioJudicial.caratula}
                            label="caratula"
                            onChange={(event) => handleChange('', event)}
                        />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="hechoPunible">Hecho punible/Delito</InputLabel>
                            <Select

                                name="hechoPunible"
                                value={state.hechoPunible}
                                label="Hecho punible/Delito"
                                onChange={(event) => handleChange('', event)}
                            >
                                <MenuItem value={10}>Causa 1</MenuItem>
                                <MenuItem value={20}>Causa 2</MenuItem>
                                <MenuItem value={30}>Causa 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="nroSD">S.D. Nro.(Opcional) (condenado)</InputLabel>
                            <OutlinedInput
                                name="nroSd"
                                value={state.nroSd}
                                onChange={(event) => handleChange('', event)}
                                label="S.D Nro.(Opcional) (condenado)"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/*<Grid container spacing={2} my={1}>
                    <Grid item sm={12}>
                        <InputLabel sx={{fontWeight:'bold', textTransform:'uppercase'}}>Duracion total del a condena en años</InputLabel>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="mes">Mes</InputLabel>
                            <OutlinedInput
                                id="mes"
                                defaultValue=""
                                label="Mes"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="datoAnho">Año</InputLabel>
                            <OutlinedInput
                                id="datoAnho"
                                defaultValue=""
                                label="Año"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de ingreso"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12} mt={2}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar cambios
                        </Button>
                    </Grid>
                </Grid>*/}
                <Grid container spacing={2} mt={2}>
                    <Grid item sm={12}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Guardar cambios
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}