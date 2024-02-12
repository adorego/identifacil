import React, {FC, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from "@mui/material";
import {useGlobalContext} from "@/app/Context/store";
import {useModal} from "@/components/modal/UseModal";
import {ModalComponent} from "@/components/modal/ModalComponent";
import {FormularioCirculoFamiliar} from "@/app/(sistema)/cuestionario/components/FormularioCirculoFamiliar";
import {TablaCirculoFamiliar} from "@/app/(sistema)/cuestionario/components/TablaCirculoFamiliar";

import {
    circuloFamiliarStateType,
    datosFamiliaresInicial,
    datosFamiliaresType,

} from "@/components/utils/systemTypes";

interface BloqueFamiliarProps {
    datosFamiliaresIniciales?: datosFamiliaresType | any;
    id_persona: number | null;
}


const BloqueFamiliar: FC<BloqueFamiliarProps> = (
    {
        id_persona,
        datosFamiliaresIniciales = datosFamiliaresInicial
    }) => {

    // por si llega null en el campo entonces carga los datos iniciales vacios
    const estadoInicial = datosFamiliaresIniciales ? datosFamiliaresIniciales : datosFamiliaresInicial;
    const [estadoFormularioDatosFamiliares, setEstadoFormularioDatosFamiliares] = useState<datosFamiliaresType>(estadoInicial);
    const [stateCirculoFamiliar, setStateCirculoFamiliar] = useState<circuloFamiliarStateType[]>([])

    /**
    * Custom hook para manejar el modal
     * @param {boolean} open state para manejar estado del modal
     * @param handleOpen función para abrir modal
     * @param handleClose funcion para cerrar modal
    * */
    const { open, handleOpen, handleClose } = useModal();
    const {openSnackbar} = useGlobalContext();

    const handleChangeCirculo = (nuevoMiembro:circuloFamiliarStateType)=>{
        setStateCirculoFamiliar(prev=> [...prev, nuevoMiembro])
    }

    const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoFormularioDatosFamiliares(
            (previus) => {
                return (
                    {
                        ...previus,
                        [event.target.name]: (event.target.value === "true"),
                        [`${event.target.name}_modificado`]: true

                    }
                )
            }
        )
    }


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off">
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="datoLiderFamilia">¿Es la cabeza de familia/sustento de la familia?</FormLabel>
                        <RadioGroup
                            value={estadoFormularioDatosFamiliares.esCabezaDeFamilia}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="cabezaDeFamilia"
                            name="esCabezaDeFamilia">
                            <FormControlLabel
                                value={true}
                                control={<Radio/>}
                                label="Si"/>
                            <FormControlLabel
                                value={false}
                                control={<Radio/>}
                                label="No"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={12}>
                    <FormControl>
                        <FormLabel id="circuloFamiliarLabel">Tiene Círculo Familiar en el Sistema:</FormLabel>
                        <RadioGroup
                            value={estadoFormularioDatosFamiliares.tieneCirculoFamiliar}
                            onChange={onSelectChange}
                            row
                            aria-labelledby="circuloFamiliarLabel"
                            name="tieneCirculoFamiliar">
                            <FormControlLabel
                                value={true}
                                control={<Radio/>}
                                label="Si"/>
                            <FormControlLabel
                                value={false}
                                control={<Radio/>}
                                label="No"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Button onClick={handleOpen} variant={'contained'}>
                        Agregar circulo New
                    </Button>
                    <ModalComponent
                        open={open}
                        onClose={handleClose}
                        title='Agregar miembro del circulo familiar'>
                        <FormularioCirculoFamiliar  onClose={handleClose} onHandleChangeCirculo={handleChangeCirculo}/>
                    </ModalComponent>

                    <Box mt={2}>

                        <TablaCirculoFamiliar rows={stateCirculoFamiliar} />
                    </Box>
                </Grid>
            </Grid>




        </Box>
    )
}

export default BloqueFamiliar;