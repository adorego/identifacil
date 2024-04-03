export interface IdentificationResponse {
    identificado?: boolean;
    numeroDeIdentificacion: string;
    nombres: string;
    apellidos: string;
    esPPL: boolean;
}

export const initialResponse: IdentificationResponse = {
    identificado: false,
    numeroDeIdentificacion: "",
    nombres: "",
    apellidos: "",
    esPPL: false
}