import { useState } from 'react';


/**
 * Custom hook para manejar el modal
 *
 * @returns {boolean} open --> state para manejar estado del modal
 * @returns {function} handleOpen --> función para abrir modal
 * @returns {function} handleClose --> funcion para cerrar modal
 *
 * */
export const useModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return {
        open,
        handleOpen,
        handleClose,
    };
};