import { Alert, AlertColor } from "@mui/material"

import { FC } from "react";

export interface UserNotificationProps{
  mensaje:string;
  tipo:AlertColor;
}

const UserNotification:FC<UserNotificationProps> = ({mensaje, tipo}) =>{
  return(
    <Alert severity={tipo}>{mensaje}</Alert>
  )
}

export default UserNotification;