import {Dayjs} from "dayjs";

export type HechoPunibleCausaType = {
    hecho_punible:number;
    causa_judicial:number;
}
export interface DisminucionDePena{
    descripcion:string;
    fecha_recalculada:Date;
    documento:string;
}

export interface PPLsEnExpedienteDTO {
    id_persona:number;
    condenado:boolean;
    hechosPuniblesCausas:Array<HechoPunibleCausaType>;
    defensor:number;
    condena:{
        anhos:number;
        meses:number;
    };
    fecha_de_aprehension:Date;
    tiene_anhos_extra_por_medida_de_seguridad:boolean;
    anhos_extra_por_medida_de_seguridad:{
        anhos:number;
        meses:number;
    }
    sentencia_definitiva:string;
    fecha_sentencia_definitiva:Date;
    fecha_de_compurgamiento_inicial:Date;
    fecha_de_compurgamiento_recalculada:Array<DisminucionDePena>
}
export type CausaType = {
    /*numeroDeDocumento: string;*/
    numeroDeExpediente: string | null;
    condenado:boolean;
    estado_procesal:string;
    caratula_expediente:string;
    despacho_judicial:number;
    hechosPuniblesCausas:Array<HechoPunibleCausaType>;
    ppls_en_expediente:Array<PPLsEnExpedienteDTO>;
    circunscripcion:number;
    ciudad:number;
    barrio:number;
    anho:number;
    juzgado_de_tribunal_de_sentencia:string;
    secretaria:string;
    lugar_del_hecho:string;
    link_de_noticia:string;
    fecha_del_hecho: Dayjs | null;
    id: number | null;
    fechaDeExpediente: Dayjs | string | null;
    fecha_sentencia_definitiva: Dayjs | string | null;
    sentencia_definitiva: string | null;
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
    numeroDeExpediente:'',
    /*numeroDeDocumento: 0,*/
    fechaDeExpediente: '',
    condenado: false,
    estado_procesal:'',
    caratula_expediente: '',
    despacho_judicial: 0,
    circunscripcion: 0,
    ciudad: 0,
    barrio: 0,
    fecha_del_hecho: null,
    anho:0,
    hechosPuniblesCausas: [],
    ppls_en_expediente:[],
    sentencia_definitiva:'',
    fecha_sentencia_definitiva:null,
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
