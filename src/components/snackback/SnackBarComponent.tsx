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
    const { snackbar, openSnackbar, closeSnackbar} = useGlobalContext();
    const [open, setOpen] = React.useState(false);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={10000}
            onClose={closeSnackbar}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} severity={snackbar.severity ? snackbar.message : 'info'}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;