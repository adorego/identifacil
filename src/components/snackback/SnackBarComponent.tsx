'use client';

import React, { useContext } from 'react';
import { Snackbar } from '@mui/material';
import { useGlobalContext} from "@/app/Context/store";


const SnackbarComponent = () => {
    const { snackbar, openSnackbar, closeSnackbar} = useGlobalContext();

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