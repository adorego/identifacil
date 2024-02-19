

export type CausaType = {
    id: number | null;
    numeroDeExpediente: string | null;
    numeroDeDocumento: string | null;
    anho: number | null;
    condenado: string | null;
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
