'use client';

import React, { useContext } from 'react';
import {Snackbar} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useGlobalContext} from "@/app/Context/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
    const { snackbar, openSnackbar, closeSnackbar, setSnackbar} = useGlobalContext();
    const [open, setOpen] = React.useState(false);

    // console.log(snackbar)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleExited = (value:any) => {
        setSnackbar((prev:any)=>({
            ...prev,
            message: value,
        }));
    };


    return (
        <Snackbar
            open={snackbar.open}
            TransitionProps={{ onExited: handleExited }}
            autoHideDuration={5000}
            onClose={closeSnackbar}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >

            <Alert onClose={closeSnackbar} sx={{ width: '100%' }} severity={(snackbar.severity ? snackbar.severity : 'success')}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;