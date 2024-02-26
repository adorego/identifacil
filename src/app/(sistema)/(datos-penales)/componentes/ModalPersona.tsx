import {ModalComponent} from "@/components/modal/ModalComponent";
import {useModal} from "@/components/modal/UseModal";
import React, {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, Grid, InputLabel, Typography, MenuItem, Select} from "@mui/material";
import {fetchData} from "@/components/utils/utils";
import {SelectChangeEvent} from "@mui/material/Select";

const initialState = {apellido: "", id_persona: null, nombre: ""}



const ModalPersona:FC<{onHandlerPersona:({}:{id_persona:number|null; nombre:string; apellido:string;})=>(void)}>= ({onHandlerPersona})=>{
    const { open, handleOpen, handleClose } = useModal();
    const [personasVinculadas, setPersonasVinculadas] = useState<{id_persona:number | null; nombre:string; apellido:string;}>(initialState)
    const [personasLista, setPersonasLista] = useState<Array<any>>([])


    useEffect(() => {
        fetchData(`${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/gestion_ppl/ppls`).then(res=>{
            setPersonasLista(prev=>([...res]))
        })
    }, []);


    const handleChange = (event: SelectChangeEvent<number>) =>{
        const persona = personasLista.filter((item : {id_persona:number; nombre:string; apellido: string;})=> item.id_persona == event.target.value)
        setPersonasVinculadas(persona[0]);
    };

    const handleSubmit = (e: any) =>{
        e.preventDefault();
        onHandlerPersona(personasVinculadas)
        setPersonasVinculadas(initialState)
        handleClose()
    }

    return(
        <>

            <Button onClick={handleOpen} variant={'contained'}>
                Agregar PPL
            </Button>
            <ModalComponent open={open} onClose={handleClose} title='Agregar miembro del circulo familiar'>
                <Box>
                    <Typography variant={'h6'}>
                        Agregar PPL
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sm={12}>
                            { (personasLista.length >0) ?
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">PPL</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personasVinculadas?.id_persona ? personasVinculadas.id_persona: 0}
                                    label="PPL"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={0}>Seleccionar PPL</MenuItem>
                                    {personasLista.map((item : {
                                        id_persona: number; nombre:string; apellido: string;},index)=>(
                                        <MenuItem key={index} value={item.id_persona}>{item.nombre}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            : null}
                        </Grid>
                        <Grid item sm={12}>
                            <Button variant={'contained'} onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </ModalComponent>
        </>
    )
}

export default ModalPersona;