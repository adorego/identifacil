import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";

interface DataType {
    id: number;
    name: string;
}
interface ModalProps{
    open: boolean;
    onClose: () => void;
    data: DataType;
    metodo: (id: number) => void ;
}
export default function ModalBorrado({open, onClose, data, metodo}:ModalProps) {
    const [state, setState] = useState({id:0, name: 'Default'})

    console.log(state)


    const handleSubmit = () =>{
        if(metodo){
            metodo(data.id)
            onClose()
        }
    }

    useEffect(() => {
        if(data){
            setState({
                id: data.id,
                name: data.name,
            })
        }
    }, [data]);


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmar"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       ¿Desea borrar este registro?
                        <br />
                        <b>{state.name}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleSubmit} autoFocus>
                        Aceptar
                    </Button>
                    <Button variant='outlined' onClick={onClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}