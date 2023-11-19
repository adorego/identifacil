import React, { useContext } from 'react';
import { Snackbar } from '@mui/material';
import { SnackbarContext } from './SnackbarContext';

const SnackbarComponent = () => {
    const { snackbar, closeSnackbar } = useContext(SnackbarContext);

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            message={snackbar.message}
        />
    );
};

export default SnackbarComponent;