
export interface IdentificationResponse{
  numeroDeIdentificacion:string;
  nombres:string;
  apellidos:string;
  esPPL:boolean;
}
export const initialResponse:IdentificationResponse = {
  numeroDeIdentificacion:"",
  nombres:"",
  apellidos:"",
  esPPL:false
}