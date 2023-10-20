import * as React from "react";


import {
    FormControl, FormControlLabel,
    FormLabel, Radio, RadioGroup, Grid, Box, InputLabel, OutlinedInput, Select, MenuItem, Button, Typography
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StyledTextarea from '../../../components/interfaz/StyledTextArea';
import {ChangeEvent} from "react";


interface MyState{
    situacionJudicial: string;
    primeraVezPrision: boolean;
    cantidadIngresos: number;
    causa: string;
    oficio: string;
    ultimoTrabajo: string
}

const initialState: MyState = {
    situacionJudicial: 'condenado',
    primeraVezPrision: false,
    cantidadIngresos: 0,
    causa: '',
    oficio: '',
    ultimoTrabajo: '',
}


export default function BloqueJudicial() {

    const [state, setState] = React.useState(initialState);
    const [causa, setCausa] = React.useState('');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setCausa(event.target.value as string);
    };

    const handleChange = (event: SelectChangeEvent) => {

        const inputName: any = event.target.name;
        const inputValue: any = event.target.value;

        setState({
            ...state,
            [inputName]: inputValue,
        });
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

        console.log(state);
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
                                        onChange={handleChange}
                                    />
                                } label="Procesado"/>
                                <FormControlLabel value="condenado" control={
                                    <Radio
                                        name='situacionJudicial'
                                        value='condenado'
                                        checked={state.situacionJudicial === 'condenado'}
                                        onChange={handleChange}
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
                    <Grid item sm={12}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="cantidadVecesPrision">Cantidad de veces de ingreso</InputLabel>
                            <OutlinedInput
                                name="cantidadIngresos"
                                value={state.cantidadIngresos}
                                onChange={handleChange}
                                label="Cantidad de veces de ingreso"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoCausa">Seleccionar Causa</InputLabel>
                            <OutlinedInput
                                name="causa"
                                value={state.causa}
                                onChange={handleChange}
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
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="oficio">Oficio</InputLabel>
                            <OutlinedInput
                                name="oficio"
                                value={state.oficio}
                                onChange={handleChange}
                                label="Oficio"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                            <OutlinedInput
                                name="ultimoTrabajo"
                                value={state.ultimoTrabajo}
                                onChange={handleChange}
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
                        <Grid container>
                            <Grid item sm={12} my={1}>
                                <Typography >Oficio judicial</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        id="documentoOficioJudicial"
                                        defaultValue=""
                                        label="Nro. de documento"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Controlled picker"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoLugar">Lugar</InputLabel>
                                    <OutlinedInput
                                        id="datoLugar"
                                        defaultValue=""
                                        label="Lugar"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography >Resolución MJ/DGEP</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        id="documentoOficioJudicial"
                                        defaultValue=""
                                        label="Nro. de documento"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Controlled picker"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="datoLugar">Documento</InputLabel>
                                    <OutlinedInput
                                        id="datoDocumento"
                                        defaultValue=""
                                        label="Lugar"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item sm={12}>
                                <Typography >Nro. de Expediente</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="documentoOficioJudicial">Nro. de documento</InputLabel>
                                    <OutlinedInput
                                        id="documentoOficioJudicial"
                                        defaultValue=""
                                        label="Nro. de documento"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3}>
                                <FormControl fullWidth={true}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Controlled picker"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={12}>
                        <InputLabel htmlFor="caratula">Caratula</InputLabel>
                        <StyledTextarea />
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="selectCausa">Hecho punible/Delito</InputLabel>
                            <Select
                                labelId="selectCausa"
                                id="selectCausa"
                                value={causa}
                                label="Hecho punible/Delito"
                                onChange={handleChangeSelect}
                            >
                                <MenuItem value={10}>Causa 1</MenuItem>
                                <MenuItem value={20}>Causa 2</MenuItem>
                                <MenuItem value={30}>Causa 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="nroSD">S.D Nro.(Opcional) (condenado)</InputLabel>
                            <OutlinedInput
                                id="nroSD"
                                defaultValue=""
                                label="S.D Nro.(Opcional) (condenado)"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={1}>
                    <Grid item sm={12}>
                        <InputLabel sx={{fontWeight:'bold', textTransform:'uppercase'}}>Duracion total del a condena en años</InputLabel>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="mes">Mes</InputLabel>
                            <OutlinedInput
                                id="mes"
                                defaultValue=""
                                label="Mes"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoAnho">Año</InputLabel>
                            <OutlinedInput
                                id="datoAnho"
                                defaultValue=""
                                label="Año"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl fullWidth={true}>
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
                </Grid>
            </Box>
        </>
    )
}