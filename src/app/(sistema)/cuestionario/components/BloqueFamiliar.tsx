import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {
    circuloFamiliarStateInitial,
    circuloFamiliarStateType,
    datosFamiliaresInicial,
    datosFamiliaresType,
} from "@/components/utils/systemTypes";

import {Delete} from "@mui/icons-material";
import {FormularioCirculoFamiliar} from "@/app/(sistema)/cuestionario/components/FormularioCirculoFamiliar";
import {ModalComponent} from "@/components/modal/ModalComponent";
import {TablaCirculoFamiliar} from "@/app/(sistema)/cuestionario/components/TablaCirculoFamiliar";
import {postForm} from "@/components/utils/utils";
import {useGlobalContext} from "@/app/Context/store";
import {useModal} from "@/components/modal/UseModal";
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
            setEstadoFormularioDatosFamiliares(prev=>{
                return{
                    ...prev,
                    id: datosFamiliaresIniciales.id,
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

            if(datosFamiliaresIniciales.familiares){
                setStateCirculoFamiliar(prev=>[
                    ...datosFamiliaresIniciales.familiares
                ])
            }
        }
    }, [datosFamiliaresIniciales]);

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

    const handleDeleteFamiliar = () =>{
        console.log('DELETE!!!!')
    }

    const handleConcubino =(event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setEstadoFormularioDatosFamiliares(prev=>{
            const updatedConcubino = {
                // Proporciona valores predeterminados para asegurarte de que siempre haya un valor válido
                id: prev.concubino?.id ?? null, // Asume que `id` es opcional en tu estado inicial
                numeroDeIdentificacion: prev.concubino?.numeroDeIdentificacion ?? "",
                nombres: prev.concubino?.nombres ?? "",
                apellidos: prev.concubino?.apellidos ?? "",
                ...prev.concubino, // Mantiene los valores actuales
                [name]: value // Actualiza el valor del campo que cambió
            };
            return{
                ...prev,
                concubino: updatedConcubino,
                concubino_modificado: true
            }

        })
    }

    const handleDeleteConcubino = ()=>{
        setEstadoFormularioDatosFamiliares(prev=>({
            ...prev,
            concubino: null,
        }))
    }
    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        const circuloFamiliar = stateCirculoFamiliar.map(item => ({
            ...item,
            vinculo: item.vinculo.id,
            establecimiento: item.establecimiento.id,
        }))

        // Tratamiento de datos para envio peticion
        // Se agrega circulo familiar capturado en el modal
        // se modifica el tipo de dato objeto de cada miembro familiar, vinculos y establecimientos para enviar solo el id
        const datosFormulario = {
            ...estadoFormularioDatosFamiliares,
            id_persona: id_persona,
            familiares: circuloFamiliar,
            familiares_modificado: true,
        }
        const editMod = datosFamiliaresIniciales?.id ? true : false // Si es TRUE, entonces es PUT, si es FALSE es POST
        console.log(datosFormulario)
        console.log(editMod)



        postForm(editMod, 'datos_familiares', 'Datos Familiares', datosFormulario, setLoading, openSnackbar, router, false);
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
                        { stateCirculoFamiliar.length > 0
                                ? <TablaCirculoFamiliar rows={stateCirculoFamiliar} handleDelete={handleDeleteFamiliar} />
                                : null
                        }

                    </Box>
                </Grid>
            </Grid>
            : null}
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Typography variant={'subtitle1'}>
                        Concubino
                    </Typography>
                    {estadoFormularioDatosFamiliares.concubino ?
                    <Stack spacing={2} direction={'row'}>

                            <TextField
                                label="Nombre"
                                name="nombres"
                                value={estadoFormularioDatosFamiliares.concubino? estadoFormularioDatosFamiliares.concubino.nombres : ""}
                                onChange={handleConcubino}
                                variant="outlined"
                                fullWidth/>
                            <TextField
                                label="Apellidos"
                                name="apellidos"
                                value={estadoFormularioDatosFamiliares.concubino? estadoFormularioDatosFamiliares.concubino.apellidos : ""}
                                onChange={handleConcubino}
                                variant="outlined"
                                fullWidth/>
                            <TextField
                                label="Numero de documento"
                                name="numeroDeIdentificacion"
                                value={estadoFormularioDatosFamiliares.concubino? estadoFormularioDatosFamiliares.concubino.numeroDeIdentificacion : ""}
                                onChange={handleConcubino}
                                variant="outlined"
                                fullWidth/>
                            <IconButton aria-label="delete" onClick={handleDeleteConcubino}>
                                <Delete/>
                            </IconButton>

                    </Stack>
                    :
                    <Button variant={'contained'} onClick={()=>setEstadoFormularioDatosFamiliares(
                        prev=>{
                            const newState = { ...prev };
                            // Solo modificar concubino si existe
                            if(!prev.concubino){
                                newState.concubino = {
                                    id: null, // Asumiendo que quieres establecer id a null
                                    nombres: null,
                                    apellidos: null,
                                    numeroDeIdentificacion: null,
                                };
                            }
                            return newState;
                    })}>
                        Aregar concubino
                    </Button>
                    }
                </Grid>
            </Grid>
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