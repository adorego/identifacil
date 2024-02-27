

export type CausaType = {
    id: number | null;
    numeroDeExpediente: number | null;
    numeroDeDocumento: number | null;
    anho: number | null;
    condenado: boolean;
    estado_procesal: string | null;
    caratula_causa: string | null;
    despacho_judicial: number | null;
    circunscripcion: number | null;
    ciudad: number | null;
    hechos_punibles:{id:number; nombre: string;}[];
    ppls:Array<{id_persona:number |null; nombre: string;  apellido: string}>;
    tiempo_de_condena: number | null;
    fecha_de_aprehension: Date | string | null;
    fecha_de_compurgamiento_inicial: string | null;
    fecha_de_compurgamiento_recalculada: string | null;
    tiene_anhos_extra_de_seguridad: boolean; // booleano local para saber si mostrar el controlador
    tiempo_de_seguridad: number | null;
    sentencia_definitiva: string | null;
    juzgado_de_tribunal_de_sentencia: string | number | null;
    secretaria: string | null;
    lugar_del_hecho: string | null;
    link_de_noticia: string | null;
    defensor: {
        id: number | null;
        tipo: string | null;
        nombre: string | null;
        apellido: string | null;
        telefono: string | null;
    }
};

export const causaInitialData : CausaType = {
    id: null,
    numeroDeExpediente:0,
    numeroDeDocumento: 0,
    anho: 0,
    condenado: false,
    estado_procesal:'',
    caratula_causa: '',
    despacho_judicial: null,
    circunscripcion: 0,
    ciudad: null,
    hechos_punibles:[],
    ppls:[],
    tiempo_de_condena: 0,
    fecha_de_aprehension: null,
    fecha_de_compurgamiento_inicial:null,
    fecha_de_compurgamiento_recalculada:null,
    tiene_anhos_extra_de_seguridad: false, // booleano local para saber si mostrar el controlador
    tiempo_de_seguridad: 0,
    sentencia_definitiva:'',
    juzgado_de_tribunal_de_sentencia:'',
    secretaria:'',
    lugar_del_hecho:'',
    link_de_noticia:'',
    defensor: {
        id: null,
        tipo:'publico',
        nombre:'',
        apellido:'',
        telefono:'',
    }

};


export const causaInitialDataPoblado = {
    id: null,
    numeroDeExpediente:'1234',
    numeroDeDocumento:'2023',
    anho: '2023',
    condenado: true,
    estado_procesal: 'Privado de su libertad',
    caratula_causa: 'Robo a mano armada a ferreteria',
    despacho_judicial: 1,
    circunscripcion: 1,
    ciudad: 1,
    hechos_punibles:[],
    ppls:[],
    tiempo_de_condena: '11',
    fecha_de_aprehension: '1989-07-19',
    fecha_de_compurgamiento_inicial:'1989-07-19',
    fecha_de_compurgamiento_recalculada: '1989-07-19',
    tiene_anhos_extra_de_seguridad: true, // booleano local para saber si mostrar el controlador
    tiempo_de_seguridad: '22',
    sentencia_definitiva: '123456',
    juzgado_de_tribunal_de_sentencia: 1,
    secretaria: 'San Lorenzo2222',
    lugar_del_hecho: 'Asuncion22',
    link_de_noticia: 'Google.com',
    defensor: 1

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
