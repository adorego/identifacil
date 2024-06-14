import {
    Alert,
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
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
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
import {api_request} from "@/lib/api-request";
import log from "loglevel";
import {useSession} from "next-auth/react";
import PermissionValidator from "@/components/authComponents/permissionValidator";

interface BloqueFamiliarProps {
    datosFamiliaresIniciales?: datosFamiliaresType | any;
    id_persona: number | null;
    handleAccordion?: (s: string)=>void
    onSetDatosPPL?: Dispatch<SetStateAction<any>>;
}

type stateErrorsType = {
    concubino_tiene: boolean;
    concubino_nombre: boolean;
    concubino_apellido: boolean;
    concubino_documento: boolean;

    circulo_tiene: boolean;
}

const stateErrorsInitial = {
    concubino_tiene: false,
    concubino_nombre: false,
    concubino_apellido: false,
    concubino_documento: false,

    circulo_tiene: false,
}
const BloqueFamiliar: FC<BloqueFamiliarProps> = (
    {
        id_persona,
        datosFamiliaresIniciales = datosFamiliaresInicial,
        handleAccordion,
        onSetDatosPPL
    }) => {

    // por si llega null en el campo entonces carga los datos iniciales vacios
    const estadoInicial = datosFamiliaresIniciales ? datosFamiliaresIniciales : datosFamiliaresInicial;

    const [estadoFormularioDatosFamiliares, setEstadoFormularioDatosFamiliares] = useState<datosFamiliaresType>(estadoInicial);

    /** 2, Estado del circulo familiar */
    const [stateCirculoFamiliar, setStateCirculoFamiliar] = useState<circuloFamiliarStateType[]>([])

    /** 3. Estado familiar modal */
    const [familiarParaModal, setFamiliarParaModal] = useState<circuloFamiliarStateType | null>(null)

    /** 4. Estado para manejo de spinner de boton de solicitud de guardado */
    const [consultaLoading, setConsultaLoading] = useState(false)

    /** 5. Estado para errores */
    const [stateErrors, setStateErrors] = useState<any>({})

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
    const {data: session}: { data: any; } = useSession();
    const sessionData = PermissionValidator('crear_ppl_form_familiares', session) || PermissionValidator('actualizar_ppl_form_familiares', session);

    useEffect(() => {
        console.log(datosFamiliaresIniciales)
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

    const handleChangeCirculo = (miembroCriculo:circuloFamiliarStateType, editMode:boolean)=>{
        console.log(miembroCriculo)
        if(!editMode){
            // console.log('tiene id' + miembroCriculo)
            setStateCirculoFamiliar(prev=> [
                ...prev,
                miembroCriculo
            ])
        }else{
            setStateCirculoFamiliar(prev=> {
                let newArray = prev

                // @ts-ignore
                newArray[miembroCriculo.indexArray] = miembroCriculo

                return(
                    newArray
                )
            })


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

    /** Aqui se busca una Persona existente en el estado de circulo familiar con el index obtenido de la tabla  */
    const handleEditModal = (event: { preventDefault: () => void; }, valor: number) =>{
        event.preventDefault()
        console.log('Index del array ' + valor)

        // TODO Verificar por que esto

        const arrayParaEditar = {
            ...stateCirculoFamiliar.find((item: any, index: number) => index == valor),
            indexArray: valor,
        }

        console.log(arrayParaEditar)

        //@ts-ignore
        setFamiliarParaModal(arrayParaEditar)

        handleOpen()
    }

    const handleDeleteFamiliar = (event: { preventDefault: () => void; }, valor: number) =>{
        console.log(valor)
        setStateCirculoFamiliar((prev:any)=>{
            console.log(prev)
            return([
                ...prev.filter((item:any, index:number)=>index !== valor)
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

    const formFamiliarValidation = ()=>{
        let auxValidator = false


        if(estadoFormularioDatosFamiliares.tieneConcubino){
            if(estadoFormularioDatosFamiliares.concubino?.nombres
                && estadoFormularioDatosFamiliares.concubino?.apellidos
                && estadoFormularioDatosFamiliares.concubino?.numeroDeIdentificacion) {
                auxValidator = true
            }else{
                // openSnackbar('Debe completar campos de concubino', 'warning')
                setStateErrors((prev:stateErrorsType)=>({
                    ...prev,
                    concubino_tiene: true,
                }))
                auxValidator = false
            }
        }else{
            auxValidator = true
        }

        return auxValidator
    }


    function validateForm() {
        const formData = estadoFormularioDatosFamiliares
        let esValidado = true;

        // Valida concubinos
        if (formData['tieneConcubino'] ) {
            if(formData.concubino?.nombres && formData.concubino?.apellidos && formData.concubino?.numeroDeIdentificacion){
                if (formData.hasOwnProperty('tieneConcubino')) {
                    delete stateErrors['tieneConcubino'];
                }
            }else {
                esValidado = false
                setStateErrors((prev: any) => ({
                    ...prev,
                    tieneConcubino: 'Datos de concubino es requerido.',
                }))
            }
        }


        // Valida si existe circulo familiar
        if(stateCirculoFamiliar.length <= 0 && estadoFormularioDatosFamiliares.tieneCirculoFamiliar){

            esValidado = false

            setStateErrors((prev: any) => ({
                ...prev,
                tieneCirculoFamiliar: 'Debe agregar al menos un familiar.',
            }))


        }else{

            if (stateErrors.hasOwnProperty('tieneCirculoFamiliar')) {

                setStateErrors((prev:any)=>({
                    ...prev,
                    tieneCirculoFamiliar: '',
                }))
                const { ['tieneCirculoFamiliar']: _, ...nuevoObjeto } = stateErrors;
                // Actualiza el estado con el nuevo objeto
                setStateErrors(nuevoObjeto);
            }
        }



        return esValidado
    }

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        if(sessionData){

            console.log(estadoFormularioDatosFamiliares)

            const validarFormulario = validateForm()

            console.log(validarFormulario)

            if(validarFormulario){
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


                    const method = estadoFormularioDatosFamiliares.id ? 'PUT' : 'POST';

                    //console.log(JSON.stringify(stateForm))
                    const url = estadoFormularioDatosFamiliares.id
                        ? `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_familiares/${datosFormulario.id}`
                        : `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_familiares`

                    // console.log(url)
                    const respuesta = await api_request(url, {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosFormulario),
                    });



                    if (respuesta.success) {
                        setLoading(false);
                        setConsultaLoading(false)

                        // Se setea estado global
                        if(onSetDatosPPL){
                            onSetDatosPPL((prev:any)=>({
                                ...prev,
                                datosFamiliares: {
                                    ...estadoFormularioDatosFamiliares,
                                    id: respuesta.datos.id,
                                    familiares: stateCirculoFamiliar
                                }
                            }))
                        }
                        setEstadoFormularioDatosFamiliares(prev=>({
                            ...prev,
                            id: respuesta.datos.id,
                        }))

                        const message = estadoFormularioDatosFamiliares.id
                            ? `Datos Familiares actualizada correctamente.`
                            : `Datos Familiares creada correctamente.`;

                        openSnackbar(message, 'success');

                        if(handleAccordion){
                            handleAccordion('')
                        }

                        if(redirect){
                            router.push(`/ppl`);
                        }
                        return respuesta
                    } else {
                        if (respuesta.error) {
                            setConsultaLoading(false)
                            setLoading(false);
                            openSnackbar(`Error al guardar los datos`, `error`);
                            log.error("Error al guardar los datos", respuesta.error.code, respuesta.error.message);
                        }
                        setConsultaLoading(false)

                    }
                } catch (error) {
                    setConsultaLoading(false)
                    setLoading(false);
                    // console.error('Error:', error);
                }
            }
        }else{
            openSnackbar('No puedes realizar esta acción', 'warning');
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
            {estadoFormularioDatosFamiliares.tieneCirculoFamiliar &&
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

                            { stateCirculoFamiliar.length > 0 &&
                                <TablaCirculoFamiliar
                                    rows={stateCirculoFamiliar}
                                    handleDelete={handleDeleteFamiliar}
                                    handleEdit={handleEditModal}
                                />
                            }

                        </Box>
                    </Box>
                    {open && (
                        <ModalComponent
                            open={true}
                            onClose={handleClose}
                            title='Agregar miembro del circulo familiar'>
                            <FormularioCirculoFamiliar
                                open={open}
                                onClose={handleClose}
                                onHandleChangeCirculo={handleChangeCirculo}
                                savedState={familiarParaModal}/>
                        </ModalComponent>
                    )}
                </Grid>
            </Grid>
            }
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>
                    <Grid item sm={12}>
                        <FormControl>
                            <FormLabel id="datoLiderFamilia">¿Tiene concubino?</FormLabel>
                            <RadioGroup
                                value={estadoFormularioDatosFamiliares.tieneConcubino}
                                onChange={onSelectChange}
                                row
                                aria-labelledby="cabezaDeFamilia"
                                name="tieneConcubino">
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
            </Grid>
            {estadoFormularioDatosFamiliares.tieneConcubino  &&
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
                                : <Button variant='outlined' startIcon={<AddIcon />} onClick={()=>
                                    setEstadoFormularioDatosFamiliares(prev=>{
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
                                error={!estadoFormularioDatosFamiliares.concubino.nombres}
                                label="Nombre"
                                name="nombres"
                                value={estadoFormularioDatosFamiliares.concubino? estadoFormularioDatosFamiliares.concubino.nombres : ""}
                                onChange={handleConcubino}
                                variant="outlined"
                                helperText='* Campo requerido'
                                fullWidth/>
                            <TextField
                                label="Apellidos"
                                name="apellidos"
                                error={!estadoFormularioDatosFamiliares.concubino.apellidos}
                                value={estadoFormularioDatosFamiliares.concubino? estadoFormularioDatosFamiliares.concubino.apellidos : ""}
                                onChange={handleConcubino}
                                variant="outlined"
                                helperText='* Campo requerido'
                                fullWidth/>
                            <TextField
                                label="Numero de documento"
                                helperText='* Campo requerido'
                                name="numeroDeIdentificacion"
                                error={!estadoFormularioDatosFamiliares.concubino.numeroDeIdentificacion}
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
            }
            <Grid container spacing={2} mt={2}>


            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item sm={12}>

                    <>
                        {
                            Object.keys(stateErrors).map((key: string, index: number) => (
                                <Box key={index} mt={1}>
                                    <Alert severity="error">
                                        {
                                            //@ts-ignore
                                            stateErrors[key]
                                        }
                                    </Alert>
                                </Box>

                            ))

                        }
                    </>

                </Grid>
                {sessionData &&
                <Grid item sm={12} mt={1}>
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
                }
            </Grid>

        </Box>
    )
}

export default BloqueFamiliar;




