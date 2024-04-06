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
import AddIcon from "@mui/icons-material/Add";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

interface BloqueFamiliarProps {
    datosFamiliaresIniciales?: datosFamiliaresType | any;
    id_persona: number | null;
    handleAccordion?: (s: string)=>void
}


const BloqueFamiliar: FC<BloqueFamiliarProps> = (
    {
        id_persona,
        datosFamiliaresIniciales = datosFamiliaresInicial,
        handleAccordion
    }) => {

    // por si llega null en el campo entonces carga los datos iniciales vacios
    const estadoInicial = datosFamiliaresIniciales ? datosFamiliaresIniciales : datosFamiliaresInicial;
    const [estadoFormularioDatosFamiliares, setEstadoFormularioDatosFamiliares] = useState<datosFamiliaresType>(estadoInicial);
    const [stateCirculoFamiliar, setStateCirculoFamiliar] = useState<circuloFamiliarStateType[]>([])

    const [familiarParaModal, setFamiliarParaModal] = useState<circuloFamiliarStateType | null>(null)

    /** Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

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

    useEffect(() => {
        if(!open){
            setFamiliarParaModal(null)
        }
    }, [open]);

    const handleChangeCirculo = (nuevoMiembro:circuloFamiliarStateType)=>{
        if(nuevoMiembro.id){
            // console.log('tiene id' + nuevoMiembro)
            setStateCirculoFamiliar(prev=> [
                ...prev.filter((item:any)=>item.id !== nuevoMiembro.id),
                nuevoMiembro
            ])
        }else{
            setStateCirculoFamiliar(prev=> [...prev, nuevoMiembro])

        }
        setFamiliarParaModal(null)
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

    const handleEditModal = (event: { preventDefault: () => void; }, id: number) =>{
        event.preventDefault()
        // TODO Verificar por que esto
        // @ts-ignore
        setFamiliarParaModal(stateCirculoFamiliar.find((item:any)=> item.id == id))
        handleOpen()
    }

    const handleDeleteFamiliar = (event: { preventDefault: () => void; }, id: number) =>{
        console.log(id)
        setStateCirculoFamiliar((prev:any)=>{
            console.log(prev)
            return([
                ...prev.filter((item:any)=>item.id !== id)
            ])
        })
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
    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        setConsultaLoading(true)

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
        const redirect = false



        try {
            setLoading(true);

            const method = editMod ? 'PUT' : 'POST';
            //console.log(JSON.stringify(stateForm))
            const url = editMod
                ? `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_familiares/${datosFormulario.id}`
                : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_familiares`

            // console.log(url)
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFormulario),
            });


            if (response.ok) {
                setLoading(false);
                setConsultaLoading(false)

                const message = editMod
                    ? `Datos Familiares actualizada correctamente.`
                    : `Datos Familiares creada correctamente.`;

                openSnackbar(message, 'success');

                if(handleAccordion){
                    handleAccordion('')
                }

                if(redirect){
                    router.push(`/ppl`);
                }
                return response
            } else {
                setConsultaLoading(false)
                setLoading(false);
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setConsultaLoading(false)
            setLoading(false);
            console.error('Error:', error);
        }
    }


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            mx={2}
            autoComplete="off">
            <Typography variant='h6' mb={3}>
                Formulario de datos familiares
            </Typography>
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
                        <FormLabel id="circuloFamiliarLabel">¿Cuenta con algún familiar dentro del sistema penitenciario?</FormLabel>
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
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Box sx={{
                        border: '1px solid #E2E8F0',
                        background: 'rgba(244,246,248, 0.30)',
                        padding: '16px',
                        borderRadius: '8px'
                    }}>

                        <Stack spacing={0} direction='row' justifyContent='space-between' >
                            <FormLabel id="circuloFamiliarLabel">Circulo familiar</FormLabel>

                            <Button onClick={handleOpen} variant='outlined' startIcon={<AddIcon />}>
                                Agregar familiar
                            </Button>
                        </Stack>
                        <Box mt={2}>

                            { stateCirculoFamiliar.length > 0
                                ? <TablaCirculoFamiliar rows={stateCirculoFamiliar} handleDelete={handleDeleteFamiliar} handleEdit={handleEditModal}/>
                                : null
                            }

                        </Box>
                    </Box>
                    {open && (
                        <ModalComponent
                            open={true}
                            onClose={handleClose}
                            title='Agregar miembro del circulo familiar'>
                            <FormularioCirculoFamiliar open={open} onClose={handleClose} onHandleChangeCirculo={handleChangeCirculo}
                                                       savedState={familiarParaModal}/>
                        </ModalComponent>
                    )}
                </Grid>
            </Grid>
            : null}
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Box sx={{
                        border: '1px solid #E2E8F0',
                        background: 'rgba(244,246,248, 0.30)',
                        padding: '16px',
                        borderRadius: '8px'
                    }}>

                        <Stack spacing={2} direction='row' justifyContent='space-between' >

                            <Typography variant={'subtitle1'}>
                                Concubino
                            </Typography>
                            {estadoFormularioDatosFamiliares.concubino ?
                                null
                                : <Button variant='outlined' startIcon={<AddIcon />} onClick={()=>setEstadoFormularioDatosFamiliares(
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
                                    Agregar concubino
                                </Button>}
                        </Stack>

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
                        : null}
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <LoadingButton
                        sx={{
                            minHeight: "100%",
                            px: "48px",
                            height: '48px'
                        }}
                        onClick={handleSubmit}
                        loading={consultaLoading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant="contained">
                        <span>
                            {consultaLoading ? 'Guardando...' : 'Guardar'}
                        </span>
                    </LoadingButton>

                </Grid>
            </Grid>

        </Box>
    )
}

export default BloqueFamiliar;