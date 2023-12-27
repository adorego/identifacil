export type PPLType = {
    nombreApellido: string;
    alias: string;
    motivo: string;
    fechaTraslado: string;
    id: number;
};


export type TrasladoForm = {
    id: number;
    documento: string;
    fechaDocumento: string;
    fechaTraslado: string;
    autorizo: string;
    motivoTraslado: string;
    vehiculoId: string;
    medidasSeguridad: string;
    descripcionMotivo: string;
    custodia: string;
    chofer: string;
    destinoTraslado: string;
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
