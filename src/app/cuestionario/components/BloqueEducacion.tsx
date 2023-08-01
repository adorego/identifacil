import * as React from "react";


import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Grid,
    Box,
    InputLabel,
    OutlinedInput
} from "@mui/material";

export default function BloqueEducacion() {

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
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoEducacion">Nivel Academico</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoEducacion"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="primaria" control={<Radio/>} label="Primaria"/>
                                <FormControlLabel value="secundaria" control={<Radio/>} label="Secundaria"/>
                                <FormControlLabel value="terciaria" control={<Radio/>} label="Terciaria"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="institucionEducactia">Institución educativa</InputLabel>
                            <OutlinedInput
                                id="institucionEducactia"
                                defaultValue=""
                                label="Institución educativa"
                            />
                        </FormControl>
                        <Grid item sm={4}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="datoNombreConcubino">Edad</InputLabel>
                                <OutlinedInput
                                    id="datoEdadHijo"
                                    defaultValue=""
                                    label="Edad"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} my={2}>
                    <Grid item sm={6}>
                        <FormControl>
                            <FormLabel id="datoEducacion">Cuenta con algún oficio</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoEducacion"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
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

            </Box>
        </>
    )
}