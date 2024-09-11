import DialogContentText from "@mui/material/DialogContentText";
import {Button, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";

interface formProps{
    handleCloseModal?: ()=> void
}

export default function FormIntervencion(props:formProps){

    const {handleCloseModal} = props;

    return(
        <>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </>
    )
}