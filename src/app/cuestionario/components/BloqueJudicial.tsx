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

export default function BloqueJudicial() {

    const [causa, setCausa] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCausa(event.target.value as string);
    };

    const [value, setValue] = React.useState<Dayjs | null>(dayjs());


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
                                <FormControlLabel value="procesado" control={<Radio/>} label="Procesado"/>
                                <FormControlLabel value="condena" control={<Radio/>} label="Condena"/>
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
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="cantidadVecesPrision">Cantidad de veces de ingreso</InputLabel>
                            <OutlinedInput
                                id="cantidadVecesPrision"
                                defaultValue=""
                                label="Cantidad de veces de ingreso"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoCausa">Seleccionar Causa</InputLabel>
                            <OutlinedInput
                                id="datoCausa"
                                defaultValue=""
                                label="Seleccionar Causa"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="selectCausa">Causa</InputLabel>
                            <Select
                                labelId="selectCausa"
                                id="selectCausa"
                                value={causa}
                                label="Causa"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Causa 1</MenuItem>
                                <MenuItem value={20}>Causa 2</MenuItem>
                                <MenuItem value={30}>Causa 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoOficio">Oficio</InputLabel>
                            <OutlinedInput
                                id="datoOficio"
                                defaultValue=""
                                label="Oficio"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="datoUltimaEducativa">Ultimo lugar de trabajo</InputLabel>
                            <OutlinedInput
                                id="datoUltimaEducativa"
                                defaultValue=""
                                label="Ultimo lugar de trabajo"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <Typography sx={{fontWeight:'bold', textTransform:'uppercase'}}>Documento que ordena la reclusión</Typography>
                    </Grid>
                    <Grid item sm={12} spacing={2}>
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
                                onChange={handleChange}
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
                </Grid>
            </Box>
        </>
    )
}