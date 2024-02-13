import React, {FC, useEffect, useState} from "react";
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
import {postEntity, postForm} from "@/components/utils/utils";
import {useRouter} from "next/navigation";

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
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        if(datosFamiliaresIniciales){
            setStateCirculoFamiliar(prev=>{
                return{
                    ...prev,
                    id_persona: datosFamiliaresIniciales.id_persona,
                    esCabezaDeFamilia: datosFamiliaresIniciales.esCabezaDeFamilia,
                    esCabezaDeFamilia_modificado: datosFamiliaresIniciales.esCabezaDeFamilia_modificado,
                    tieneCirculoFamiliar: datosFamiliaresIniciales.tieneCirculoFamiliar,
                    tieneCirculoFamiliar_modificado: datosFamiliaresIniciales.tieneCirculoFamiliar_modificado,
                    familiares: datosFamiliaresIniciales.familiares,
                    familiares_modificado: datosFamiliaresIniciales.familiares_modificado,
                    tieneConcubino: datosFamiliaresIniciales.tieneConcubino,
                    tieneConcubino_modificado: datosFamiliaresIniciales.tieneConcubino_modificado,
                    concubino: datosFamiliaresIniciales.concubino,
                    concubino_modificado: datosFamiliaresIniciales.concubino_modificado,
                }
            })

        }
    }, [datosFamiliaresIniciales]);

    const handleChangeCirculo = (nuevoMiembro:circuloFamiliarStateType)=>{
        console.log(nuevoMiembro)
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

    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault()

        console.log(
            {
                ...estadoFormularioDatosFamiliares,
                id_persona: id_persona,
                familiares:stateCirculoFamiliar
            })

        postForm(
            false,
            'datos_familiares',
            'Datos Familiares',
            {
                ...estadoFormularioDatosFamiliares,
                id_persona: 13,
                familiares:stateCirculoFamiliar
            },
            setLoading,
            openSnackbar,
            router
        );
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
            {estadoFormularioDatosFamiliares.tieneCirculoFamiliar?
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
                        {datosFamiliaresIniciales?
                        <TablaCirculoFamiliar rows={stateCirculoFamiliar} />
                            : null }
                    </Box>
                </Grid>
            </Grid>
            : null}
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Button variant='contained' onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default BloqueFamiliar;