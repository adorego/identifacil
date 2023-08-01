import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputLabel, OutlinedInput,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";

export default function BloqueSalud() {

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
                mx={2}
            >
                <div>

                    <Grid mb={2}>
                        <FormControl>
                            <FormLabel  id="datoAfeccion">¿Cuenta con alguna afección por el
                                consumo excesivo de sustancias estupefacientes o drogas prohibidas?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoAfeccion"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} my={2}>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="grupoSanguineo">Grupo Sanguineo</InputLabel>
                                <OutlinedInput
                                    id="grupoSanguineo"
                                    defaultValue=""
                                    label="Grupo Sanguineo"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vacunas">Vacunas recibidas</InputLabel>
                                <OutlinedInput
                                    id="vacunas"
                                    defaultValue=""
                                    label="Vacunas recibidas"
                                />
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item sm={12}>
                            <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Control de signos vitales</FormLabel>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="PA">PA</InputLabel>
                                <OutlinedInput
                                    id="PA"
                                    defaultValue="0"
                                    label="PA"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FC">FC</InputLabel>
                                <OutlinedInput
                                    id="FC"
                                    defaultValue="0"
                                    label="FC"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FR">FR</InputLabel>
                                <OutlinedInput
                                    id="FR"
                                    defaultValue="0"
                                    label="FR"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="T">T</InputLabel>
                                <OutlinedInput
                                    id="T"
                                    defaultValue="0"
                                    label="T"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="Peso">Peso</InputLabel>
                                <OutlinedInput
                                    id="Peso"
                                    defaultValue="0"
                                    label="Peso"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="Talla">Talla</InputLabel>
                                <OutlinedInput
                                    id="Talla"
                                    defaultValue="0"
                                    label="Talla"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="IMC">IMC</InputLabel>
                                <OutlinedInput
                                    id="IMC"
                                    defaultValue="0"
                                    label="IMC"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="VDRL">VDRL</InputLabel>
                                <OutlinedInput
                                    id="VDRL"
                                    defaultValue="0"
                                    label="VDRL"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="VIH">VIH</InputLabel>
                                <OutlinedInput
                                    id="VIH"
                                    defaultValue="0"
                                    label="VIH"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="TB">TB</InputLabel>
                                <OutlinedInput
                                    id="TB"
                                    defaultValue="0"
                                    label="TB"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Maternidad</FormLabel>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Se encuentra en Periodo de gestación?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="gestacionTiempo">¿De cuanto tiempo se encuentra?</InputLabel>
                                <OutlinedInput
                                    id="gestacionTiempo"
                                    defaultValue=""
                                    label="¿De cuanto tiempo se encuentra?"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="gestacionFecha">Fecha</InputLabel>
                                <OutlinedInput
                                    id="gestacionFecha"
                                    defaultValue=""
                                    label="Fecha"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Salud mental</FormLabel>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>

                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Antecedentes de lesiones autoinfligidas</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Cuenta con alguna afección por el consumo excesivo de
                                    sustancias estupefacientes o drogas prohibidas.</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
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
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">La PPL reporta un problema de abuso de drogas previo al
                                    ingreso de prisión</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Que medicación toma actualmente?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Recibe algun tratramiento?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Cuenta con alguna afección severa interna o externa por el
                                    consumo excesivo de sustancias estupefacientes o drogas prohibidas.</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿La PPL reporta problemas con abuso de sustancias prohibidas
                                    previo al
                                    ingreso al penal?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            <FormLabel  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}  id="demo-row-radio-buttons-group-label">Salud fisica</FormLabel>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Posee alguna Discapacidad:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Fisica" control={<Radio/>} label="Fisica"/>
                                    <FormControlLabel value="Motora" control={<Radio/>} label="Motora"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            <FormLabel  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}  id="demo-row-radio-buttons-group-label">Limitaciones idiomáticas </FormLabel>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">¿Necesita un intérprete?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Dificultad para leer o escribir</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    )
}