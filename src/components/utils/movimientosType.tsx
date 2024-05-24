import {Dayjs} from "dayjs";

export type PPLType = {
    nombre: string;
    apellido: string;
    alias: string;
    motivo: string;
    fechaTraslado: string;
    id: string;
};


export type TrasladoForm = {
    id: number;
    numero_de_documento: string;
    fechaDocumento: Dayjs | null;
    fechaTraslado: Dayjs | null;
    autorizo: number;
    motivoTraslado: number;
    vehiculoId: number;
    medidasSeguridad: [number] | number;
    descripcionMotivo: string;
    custodia: number;
    chofer: number;
    origenTraslado: number;
    destinoTraslado: number;
    documentoAdjunto: any;
    PPLs: PPLType[];
    lastUpdate: string;
};

export interface Motivo {
    id: string; // O número, según tu API
    descripcion: string;
}

export interface Medidas {
    tipo: string;
    id: string; // O número, según tu API
    medidaSeguridad: string;
    nombre: string;
}

export interface Personal {
    tipo: string;
    id: string; // O número, según tu API
    nombre: string;
}

export interface Vehiculo {
    id: string; // O número, según tu API
    modelo: string;
    chapa: string;
}

export interface pplTraslado {
    id_persona: number;
    id?: string; // O número, según tu API
    nombre: string;
    apellido: string;
}
