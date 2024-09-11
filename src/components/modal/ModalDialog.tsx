import {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

interface ModalDialogType {
    modalStatus?: boolean,
    handleOpen?: () => void,
    closeModal?: ()=> void,
    children?: React.ReactNode,
}


export default function ModalDialog(props:ModalDialogType){
    const [open, setOpen] = useState(false);

    const {children, modalStatus = false, handleOpen, closeModal} = props;

    useEffect(()=>{
        setOpen(modalStatus)
    },[modalStatus])

    const handleClickOpen = () => {
        if(handleOpen){
            handleOpen()
        }
        setOpen(true);
    };

    const handleClose = () => {
        if(closeModal){
            closeModal();
        }
        setOpen(false);
    };


    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )

}