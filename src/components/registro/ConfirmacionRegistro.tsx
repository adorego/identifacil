import { Box, Typography } from "@mui/material"

import { FC } from "react";

export interface ConfirmacionRegistroProps{
  mensaje:string;
}
const ConfirmacionRegistro:FC<ConfirmacionRegistroProps> = ({mensaje}:ConfirmacionRegistroProps) =>{
  console.log("Mensaje:", mensaje);
  return(
    <Box>
      <Typography variant="h5">
          {mensaje}
      </Typography>
    </Box>
  )
}

export default ConfirmacionRegistro;