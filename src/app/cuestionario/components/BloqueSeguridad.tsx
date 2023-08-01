import * as React from "react";
import Box from "@mui/material/Box";


import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup
} from "@mui/material";

export default function BloqueSeguridad (){

    return(
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2} >

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoPersona;">¿Riesgo para el personal?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoPersona;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="institucionEducactia"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoRecluso;">¿Riesgo para otros reclusos?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoRecluso;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="institucionEducactia"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoOtroRecluso;">¿Riesgo de ser lesionado por otros reclusos?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoOtroRecluso;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="motivoRiesgoOtroRecluso"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="riesgoPropiedad;">¿Riesgo de dañar la propiedad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="riesgoPropiedad;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="motivoRiesgoPropiedad"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="grupoAmenaza;">¿Miembro de un grupo que constituye una amenaza para la seguridad?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="grupoAmenaza;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="motivoGrupoAmenaza"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="entrenamientoMilitar;">¿Entrenamiento militar previo?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="entrenamientoMilitar;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="motivoEntrenamientoMilitar"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="funcionarioPublico;">¿Era funcionario público?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="funcionarioPublico;"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true}>

                            <OutlinedInput
                                id="motivoFuncionarioPublico"
                                defaultValue="Indicar respuesta..."
                                label=""
                                size="small"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}