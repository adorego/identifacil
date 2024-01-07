import { SetStateAction, createContext, useContext } from "react";

import { AlertColor } from "@mui/material";
export interface notificationContextData{
  mensaje:string;
  mostrar:boolean;
  tipo:AlertColor;
  setNotification:(mensaje:string,mostrar:boolean, tipo:AlertColor) => void;

}

export const notificationContextInitialValue:notificationContextData = {
  mensaje: "",
  mostrar: false,
  tipo: "success",
  setNotification: function (mensaje: string, mostrar: boolean, tipo: string): void {
    throw new Error("Function not implemented.");
  }
}
export const NotificationContext = createContext(
  notificationContextInitialValue
 );

 export const NotificationProvider = NotificationContext.Provider;
 export const useNotificationContext = () => useContext(NotificationContext)