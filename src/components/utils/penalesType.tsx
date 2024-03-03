

export type CausaType = {
    id: number | null;
    numeroDeExpediente: string | null;
    numeroDeDocumento: string | null;
    anho: number | null;
    condenado: boolean;
    estado_procesal: string | null;
    caratula_causa: string | null;
    despacho_judicial: number | null;
    circunscripcion: number | null;
    ciudad: number | null;
    hechos_punibles:Array<number|null>;
    ppls:Array<number|null>;
    tiempo_de_condena: number | null;
    fecha_de_aprehension: Date | string | null;
    fecha_de_compurgamiento_inicial: string | null;
    fecha_de_compurgamiento_recalculada: string | null;
    tiene_anhos_extra_de_seguridad: boolean; // booleano local para saber si mostrar el controlador
    tiempo_de_seguridad: number | null;
    sentencia_definitiva: string | null;
    juzgado_de_tribunal_de_sentencia: string | null;
    secretaria: string | null;
    lugar_del_hecho: string | null;
    link_de_noticia: string | null;
    defensor: {
        id: number | null;
        nombreDelDefensor: string | null;
        telefonoDelDefensor: string | null;
    }
};

export const causaInitialData = {
    id: null,
    numeroDeExpediente:null,
    numeroDeDocumento:null,
    anho: null,
    condenado: false,
    estado_procesal:null,
    caratula_causa:null,
    despacho_judicial: null,
    circunscripcion: null,
    ciudad: null,
    hechos_punibles:Array<1>,
    ppls:Array<number|null>,
    tiempo_de_condena: null,
    fecha_de_aprehension: null,
    fecha_de_compurgamiento_inicial:null,
    fecha_de_compurgamiento_recalculada:null,
    tiene_anhos_extra_de_seguridad: false, // booleano local para saber si mostrar el controlador
    tiempo_de_seguridad: null,
    sentencia_definitiva:null,
    juzgado_de_tribunal_de_sentencia:null,
    secretaria:null,
    lugar_del_hecho:null,
    link_de_noticia:null,
    defensor: {
        id: null,
        nombreDelDefensor:null,
        telefonoDelDefensor:null,
    }

};
export type  audienciaType = {
    id: number;
    causa: string;
    nroOficio: string;
    formaDeAudiencia: string;
    circunscripcion: string;
    juzgado: string;
    requiereTrasladoOtraInstitucion: boolean;
    medidasSeguridad: boolean;
    transitoAdministrativo: boolean;
    destinoAdministrativo: string;
    archivoJudicial: string;
    notaPedido: string;

}
export type  salidasTransitoriasType = {
    numeroDocumento: string;
    fechaOficio: string;
    documento: string;
    horaSalida: string;
    diasSalida: string;
    horaLlegada: string;
    diasLlegada: string;
    estado: string;
    tiempoPermiso: string;
}

export type libertadesType = {
    id: number;
    nroOficio: string;
    fechaOficio: string;
    caratula: string;
    fechaLibertad: string;
    fechaCompurgamiento: string;
    tipoLibertad: string;
    comentarios: string;
    adjunto: string;
}
