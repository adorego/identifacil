

type CausaType = {
    id: number;
    nroCausa: string;
    ano: string;
    fechaAprension: string;
    caratula: string;
    hechoPunible: string;
    situacionProcesal: string;
    condenado: string;
    tiempoDeCondenaAnos: number;
    compurgamiento: string;
    tiempoDeCondenaMeses: number;
    anosExtrasDeCondenaPorMedidaDeSeguridad: boolean;
    anosDeCondenaPorMedidasDeSeguridad: number;
    mesesDeCondenaPorMedidasDeSeguridad: number;
    sentenciaDefinitiva: string;
    sentenciaDescripcion: string;
    fechaCompurgamientoCalculada: string;
    circunscripcion: string;
    secretaria: string;
    juzgadoDeEjecucionOSentencia: string;
    nombreDelFamiliar: string;
    fechaHecho: string;
    lugarHecho: string;
    telefonoDelFamiliar: string;
    linkDeNoticia: string;
    "defensor": string;
    "nombreDelDefensor": string;
    "telefonoDelDefensor": string;
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
export type libertadesType = {
    nroOficio: string;
    fechaOficio: string;
    caratula: string;
    fechaLibertad: string;
    fechaCompurgamiento: string;
    tipoLibertad: string;
    comentarios: string;
    adjunto: string;
}