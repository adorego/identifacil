import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Button,
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
import {SelectChangeEvent} from "@mui/material/Select";
import {ChangeEvent, useState} from "react";

interface MyState {
    consumoDroga: boolean;
    grupoSanguineo: string;
    vacunasRecibidas: string;
    pa: string;
    fc: string;
    fr: string;
    t: string;
    peso: string;f
    talla: string;
    imc: string;
    vdrl: string;
    vih: string;
    tb: string;
    gestacion: boolean;
    tiempoGestacion: string;
    fechaGestacion: string;
    tratamientoMental: boolean;
    antecedenesAutoinflingidas: boolean;
    internadoPsiquiatrico: boolean;
    abusoDrogaPrevioIngreso: boolean;
    medicacionActualmente: boolean;
    recibeTratamiento: boolean;
    afeccionSeveraEstupefacientes: boolean;
    discapacidad: string;
    interprete: boolean;
    dificultadComunicacion: boolean;

}

const initialState: MyState = {
    consumoDroga: false,
    grupoSanguineo: '',
    vacunasRecibidas: '',
    pa: '',
    fc: '',
    fr: '',
    t: '',
    peso: '',
    talla: '',
    imc: '',
    vdrl: '',
    vih: '',
    tb: '',
    gestacion: false,
    tiempoGestacion: '',
    fechaGestacion: '',
    tratamientoMental: false,
    antecedenesAutoinflingidas: false,
    internadoPsiquiatrico: false,
    abusoDrogaPrevioIngreso: false,
    medicacionActualmente: false,
    afeccionSeveraEstupefacientes: false,
    discapacidad: '',
    interprete: false,
    dificultadComunicacion: false,

}


export default function BloqueSalud() {


    const [state, setState] = useState<MyState>(initialState);

    // Captura cada cambio de estado de los elementos del form que sons booleanos y guarda en el state
    const handleRadio = (event:  ChangeEvent<HTMLInputElement>) => {

        const inputName: string = event.target.name;
        const inputValue = event.target.value === 'true';

        setState({
            ...state,
            [inputName]: inputValue,
        });

    }

    // Captura cambio de estados de inputs que no sean booleanos y guardan en el state
    const handleChange = (event: any) => {

        const inputName: string = event.target.name;
        let inputValue: any = '';

        inputValue = event.target.value;


        setState({
            ...state,
            [inputName]: inputValue,
        });

    };

    // captura click en boton guardar para luego enviar objeto como JSON
    const  handleClick = (event: any)=>{
        event.preventDefault();
        console.log(JSON.stringify(state));
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
                mx={2}
            >
                <div>

                    <Grid mb={2}>
                        <FormControl>
                            <FormLabel id="gestioacion">Cuenta con alguna afección por el consumo excesivo de
                                sustancias estupefacientes o drogas prohibidas.</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="datoEducacion"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="si"
                                                  control={
                                                      <Radio
                                                          value={true}
                                                          checked={state.consumoDroga}
                                                          onChange={handleRadio}
                                                          name='consumoDroga'
                                                      />
                                                  } label="Si"/>
                                <FormControlLabel value="no" control={
                                    <Radio
                                        value={false}
                                        checked={state.consumoDroga === false}
                                        onChange={handleRadio}
                                        name='consumoDroga'
                                    />
                                } label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} my={2}>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="grupoSanguineo"

                                >
                                    Grupo Sanguineo
                                </InputLabel>
                                <OutlinedInput
                                    label="Grupo Sanguineo"
                                    name="grupoSanguineo"
                                    value={state.grupoSanguineo}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="vacunas">Vacunas recibidas</InputLabel>
                                <OutlinedInput
                                    name="vacunasRecibidas"
                                    value={state.vacunasRecibidas}
                                    onChange={handleChange}
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
                                    name="pa"
                                    value={state.pa}
                                    label="PA"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FC">FC</InputLabel>
                                <OutlinedInput
                                    name="fc"
                                    value={state.fc}
                                    label="FC"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="FR">FR</InputLabel>
                                <OutlinedInput
                                    name="fr"
                                    value={state.fr}
                                    onChange={handleChange}
                                    label="FR"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="T">T</InputLabel>
                                <OutlinedInput
                                    name="t"
                                    value={state.t}
                                    onChange={handleChange}
                                    label="T"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="Peso">Peso</InputLabel>
                                <OutlinedInput
                                    name="peso"
                                    value={state.peso}
                                    onChange={handleChange}
                                    label="Peso"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="Talla">Talla</InputLabel>
                                <OutlinedInput
                                    name="talla"
                                    value={state.talla}
                                    onChange={handleChange}
                                    label="Talla"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="IMC">IMC</InputLabel>
                                <OutlinedInput
                                    name="imc"
                                    value={state.imc}
                                    onChange={handleChange}
                                    label="IMC"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="VDRL">VDRL</InputLabel>
                                <OutlinedInput
                                    name="vdrl"
                                    onChange={handleChange}
                                    value={state.vdrl}
                                    label="VDRL"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="VIH">VIH</InputLabel>
                                <OutlinedInput
                                    name="vih"
                                    onChange={handleChange}
                                    value={state.vih}
                                    label="VIH"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="TB">TB</InputLabel>
                                <OutlinedInput
                                    name="tb"
                                    value={state.tb}
                                    onChange={handleChange}
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
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.gestacion === true}
                                            onChange={handleRadio}
                                            name='gestacion'
                                        />} label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.gestacion === false}
                                            onChange={handleRadio}
                                            name='gestacion'
                                        />} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="gestacionTiempotiempoGestacion">¿De cuanto tiempo se encuentra?</InputLabel>
                                <OutlinedInput
                                    name="tiempoGestacion"
                                    value={state.tiempoGestacion}
                                    onChange={handleChange}
                                    label="¿De cuanto tiempo se encuentra?"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="gestacionFecha">Fecha de gestacion</InputLabel>
                                <OutlinedInput
                                    name="fechaGestacion"
                                    onChange={handleChange}
                                    value={state.fechaGestacion}
                                    label="Fecha de gestacion"
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
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.tratamientoMental === true}
                                            onChange={handleRadio}
                                            name='tratamientoMental'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.tratamientoMental === false}
                                            onChange={handleRadio}
                                            name='tratamientoMental'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="gestioacion">Antecedentes de lesiones autoinfligidas</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gestioacion"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.antecedenesAutoinflingidas === true}
                                            onChange={handleRadio}
                                            name='antecedenesAutoinflingidas'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.antecedenesAutoinflingidas === false}
                                            onChange={handleRadio}
                                            name='antecedenesAutoinflingidas'
                                        />
                                    } label="No"/>
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
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.internadoPsiquiatrico === true}
                                            onChange={handleRadio}
                                            name='internadoPsiquiatrico'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.internadoPsiquiatrico === false}
                                            onChange={handleRadio}
                                            name='internadoPsiquiatrico'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="drogra-previo-prision">La PPL reporta un problema de abuso de drogas previo al
                                    ingreso de prisión</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="drogra-previo-prision"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.abusoDrogaPrevioIngreso === true}
                                            onChange={handleRadio}
                                            name='abusoDrogaPrevioIngreso'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.abusoDrogaPrevioIngreso === false}
                                            onChange={handleRadio}
                                            name='abusoDrogaPrevioIngreso'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="medicacionActualmente">¿Que medicación toma actualmente?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="medicacionActualmente"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.medicacionActualmente === true}
                                            onChange={handleRadio}
                                            name='medicacionActualmente'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.medicacionActualmente === false}
                                            onChange={handleRadio}
                                            name='medicacionActualmente'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="afeccionSeveraEstupefacientes">
                                    ¿Cuenta con alguna afección severa interna o externa por el consumo excesivo de
                                    sustancias estupefacientes o drogas prohibidas.?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="afeccionSeveraEstupefacientes"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={
                                        <Radio
                                            value='true'
                                            checked={state.afeccionSeveraEstupefacientes === true}
                                            onChange={handleRadio}
                                            name='afeccionSeveraEstupefacientes'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="no" control={
                                        <Radio
                                            value='false'
                                            checked={state.afeccionSeveraEstupefacientes === false}
                                            onChange={handleRadio}
                                            name='afeccionSeveraEstupefacientes'
                                        />
                                    } label="No"/>
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
                                <FormLabel id="discapacidad">Posee alguna Discapacidad:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="discapacidad"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Fisica" control={
                                        <Radio
                                            value='fisica'
                                            checked={state.discapacidad === 'fisica'}
                                            onChange={handleChange}
                                            name='discapacidad'
                                        />
                                    } label="Fisica"/>
                                    <FormControlLabel value="Motora" control={
                                        <Radio
                                            value='motora'
                                            checked={state.discapacidad === 'motora'}
                                            onChange={handleChange}
                                            name='discapacidad'
                                        />
                                    } label="Motora"/>
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
                                <FormLabel id="interprete">¿Necesita un intérprete?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="interprete"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Si" control={
                                        <Radio
                                            value='true'
                                            checked={state.interprete === true}
                                            onChange={handleRadio}
                                            name='interprete'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="No" control={
                                        <Radio
                                            value='false'
                                            checked={state.interprete === false}
                                            onChange={handleRadio}
                                            name='interprete'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl>
                                <FormLabel id="dificultad-leer-escribir">Dificultad para leer o escribir</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="dificultad-leer-escribir"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Si" control={
                                        <Radio
                                            value='true'
                                            checked={state.dificultadComunicacion === true}
                                            onChange={handleRadio}
                                            name='dificultadComunicacion'
                                        />
                                    } label="Si"/>
                                    <FormControlLabel value="No" control={
                                        <Radio
                                            value='false'
                                            checked={state.dificultadComunicacion === false}
                                            onChange={handleRadio}
                                            name='dificultadComunicacion'
                                        />
                                    } label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12} mt={4}>
                            <Button onClick={handleClick} variant='contained'>
                                Guardar cambios
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    )
}