import { Box, Button, Modal, Typography } from "@mui/material"

import Image from "next/image";
import { useState } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface NotificacionRegistroProps{
  foto:string | null;
  open:boolean;
}
const NotificacionRegistro = (props:NotificacionRegistroProps) =>{
  const [open, setOpen] = useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if(props.foto == null){
    return(
      <div></div>
    )
  }
  return(
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={props.foto} width={120} height={220} alt="foto" />
          </Box>
        </Modal>
      </>
  )
}

export default NotificacionRegistro;
