'use client'


import * as React from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography, IconButton, Box, Modal,
} from '@mui/material';
import {FileUploadOutlined} from "@mui/icons-material";
import CustomTable from "../../../components/CustomTable";

type PPLType = {
    nombreApellido: string;
    alias: string;
    motivo: string;
    fechaTraslado: string;
};

type FormData = {
    documento: string;
    fechaDocumento: string;
    fechaTraslado: string;
    autorizo: string;
    motivoTraslado: string;
    medidasSeguridad: string;
    descripcionMotivo: string;
    custodia: string;
    chofer: string;
    chapaVehiculo: string;
    modeloVehiculo: string;
    destinoTraslado: string;
    documentoAdjunto: string;
    PPLs: PPLType[];
};

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Traslados() {
    const initialPPL: PPLType = {
        nombreApellido: '',
        alias: '',
        motivo: '',
        fechaTraslado: '',
    };

    const initialFormData: FormData = {
        documento: '',
        fechaDocumento: '',
        fechaTraslado: '',
        autorizo: '',
        motivoTraslado: '',
        medidasSeguridad: '',
        descripcionMotivo: '',
        custodia: '',
        chofer: '',
        chapaVehiculo: '',
        modeloVehiculo: '',
        destinoTraslado: '',
        documentoAdjunto: '',
        PPLs: [],
    };

    const [formData, setFormData] = React.useState<FormData>(initialFormData);


    // Datos para traslados nombre;alias;motivo;fechaTraslado;
    const headersPPL = [
        { id: 'id', label: 'ID' },
        { id: 'nombreApellido', label: 'Nombre y apellido' },
        { id: 'alias', label: 'Alias' },
        { id: 'motivo', label: 'Motivo de Traslado' },
        { id: 'fechaTraslado', label: 'Fecha traslado' },
    ];

    const dataPPL = [
        {id:'1', nombre: 'Juan Jose Perez', alias: 'N/D', motivo: 'Expulsion', destino: 'Tacumbu'},
        {id:'2', nombre: 'Maria Jose Perez', alias: 'N/D', motivo: 'Expulsion', destino: 'Tacumbu'},
        {id:'3', nombre: 'Pablo Torres', alias: 'N/D', motivo: 'Expulsion', destino: 'Tacumbu'},
        {id:'4', nombre: 'Roberto Britez', alias: 'N/D', motivo: 'Expulsion', destino: 'Tacumbu'},

    ];
    // Manejadores para inputs fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para actualizar selects
    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formData;
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };

    // Manejador para cambios de input files
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    // Manejador de envio
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        console.log(JSON.stringify(formData));
    };


    // ************ Agrgar PPLS A TRASLADOS Logica MODAL *********
    const [open, setOpen] = React.useState(false);
    const [modalPPL, setModalPPL] = React.useState(initialPPL);

    const handleOpen = () => {
        // Reseteamos los valores del formulario del modal antes de abrirlo
        setModalPPL(initialPPL);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalChange = (field: keyof PPLType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setModalPPL(prev => ({ ...prev, [field]: value }));
    };

    const addPPLToState = () => {
        setFormData(prevState => ({
            ...prevState,
            PPLs: [...prevState.PPLs, modalPPL]
        }));
        handleClose();
        setModalPPL(initialPPL); // Resetear el formulario del modal
    };


    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant='h6' mb={2}>Traslados</Typography>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            {/* Nro. del documento */}
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Nro. del documento"
                                    variant="outlined"
                                    value={formData.documento}
                                    name="documento"
                                    onChange={handleInputChange}/>
                            </Grid>

                            {/* Fecha del documento */}
                            <Grid item xs={4}>
                                <TextField fullWidth label="Fecha del documento" type="date"
                                           variant="outlined"
                                           value={formData.fechaDocumento}
                                           name="fechaDocumento"
                                           onChange={handleInputChange}
                                           InputLabelProps={{ shrink: true }} />
                            </Grid>

                            {/* Fecha del traslado */}
                            <Grid item xs={4}>
                                <TextField fullWidth label="Fecha del traslado" type="date"
                                           variant="outlined"
                                           value={formData.fechaTraslado}
                                           name="fechaTraslado"
                                           onChange={handleInputChange}
                                           InputLabelProps={{ shrink: true }} />
                            </Grid>

                            {/* Persona que autorizó traslado */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Persona que autorizó traslado" variant="outlined"
                                           value={formData.autorizo}
                                           name="autorizo"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Tipo de medidas de seguridad */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Tipo de medidas de seguridad</InputLabel>
                                    <Select
                                        value={formData.medidasSeguridad}
                                        onChange={handleSelectChange}
                                        label="Tipo de medidas de seguridad"
                                        name="medidasSeguridad"
                                    >
                                        {/* Replace these menu items with your options */}
                                        <MenuItem value="option1">Medida de seguridad 1</MenuItem>
                                        <MenuItem value="option2">Medida de seguridad 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Motivo del traslado */}
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Motivo del traslado</InputLabel>
                                    <Select label='Motivo del traslado'
                                            value={formData.motivoTraslado}
                                            onChange={handleSelectChange}
                                            name="motivoTraslado"
                                    >
                                        {/* Replace these menu items with your options */}
                                        <MenuItem value="option1">Traslado 1</MenuItem>
                                        <MenuItem value="option2">Traslado 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Descripción del motivo */}
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Descripción del motivo" variant="outlined"
                                           value={formData.descripcionMotivo}
                                           name="descripcionMotivo"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Persona que custodia */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Persona que custodia" variant="outlined"
                                           value={formData.custodia}
                                           name="custodia"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Chofer */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Chofer" variant="outlined"
                                           value={formData.chofer}
                                           name="chofer"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Chapa del vehículo */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Chapa del vehículo" variant="outlined"
                                           value={formData.chapaVehiculo}
                                           name="chapaVehiculo"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Modelo del vehículo */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Modelo del vehículo" variant="outlined"
                                           value={formData.modeloVehiculo}
                                           name="modeloVehiculo"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Destino del traslado */}
                            <Grid item xs={6}>
                                <TextField fullWidth label="Destino del traslado" variant="outlined"
                                           value={formData.destinoTraslado}
                                           name="destinoTraslado"
                                           onChange={handleInputChange}/>
                            </Grid>

                            {/* Documento adjunto */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        label='Documento adjunto'
                                        value={formData.documentoAdjunto.name}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton component="label" >
                                                    <FileUploadOutlined />
                                                    <input
                                                        styles={{display:"none"}}
                                                        type="file"
                                                        hidden
                                                        onChange={handleFileChange}
                                                        name="documentoAdjunto"
                                                    />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            {/* Documento adjunto */}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Guardar cambios
                                </Button>
                            </Grid>

                            {/* PPLs a ser trasladados */}


                            {/* Agregar PPL Button */}
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant='h6'>PPLs a ser trasladados</Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign='right'>
                                        <Button variant="contained" color="primary" onClick={handleOpen}>
                                            Agregar PPL
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <CustomTable data={formData.PPLs} headers={headersPPL} />
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>

            </Card>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={styleModal}
                >
                    <Typography variant="h6" marginBottom={2}>Agregar PPL</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>PPL</InputLabel>
                                <Select
                                    value={modalPPL.nombreApellido}
                                    onChange={handleModalChange('nombreApellido')}
                                >
                                    {/* Aquí puedes agregar los PPLs precargados */}
                                    <MenuItem value="Juan Jose Martinez">Juan Jose Martinez</MenuItem>
                                    <MenuItem value="Roberto Caceres">Roberto Caceres</MenuItem>
                                    <MenuItem value="Roberto Caceres">Roberto Caceres</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Alias"
                                variant="outlined"
                                value={modalPPL.alias}
                                onChange={handleModalChange('alias')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Motivo"
                                variant="outlined"
                                value={modalPPL.motivo}
                                onChange={handleModalChange('motivo')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fecha de Traslado"
                                type="date"
                                variant="outlined"
                                value={modalPPL.fechaTraslado}
                                onChange={handleModalChange('fechaTraslado')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={addPPLToState}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </Box>


    );
};

