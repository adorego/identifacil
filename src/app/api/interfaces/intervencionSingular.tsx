

export type IntervencionSingular = {
    activo: boolean;
    circunscripcion: {
        id: number;
        nombre: string;
    };
    defensor: {
        apellido: string;
        id: number;
        nombre: string;
        supervisor: boolean;
        telefono: string;
        tipo: string;
    };
    expediente: {
        anho: number;
        caratula_expediente: string;
        circunscripcion: null;
        ciudad: null;
        condenado: boolean;
        despacho_judicial: null;
        estado_procesal:string;
        fecha_del_hecho: null;
        fecha_sentencia_definitiva: null;
        id: number;
        juzgado_de_tribunal_de_sentencia: string;
        link_de_noticia: string;
        lugar_del_hecho: string;
        numeroDeExpediente: string;
        secretaria: string;
        sentencia_definitiva: string;
    };
    fecha_fin_intervencion: null;
    fecha_inicio_intervencion: string;
    id: number;
    oficio_judicial_alta_intervencion: File|null;
    oficio_judicial_baja_intervencion: null;
    ppl: {
        persona:{
            nombre: string;
            apellido: string;
        }
    };
}
export const IntervencionSingularInitial = {
    activo: false,
    circunscripcion: {
        id: 0,
        nombre: '',
    },
    defensor: {
        apellido: '',
        id: 0,
        nombre: '',
        supervisor: false,
        telefono: '',
        tipo: '',
    },
    expediente: {
        anho: 0,
        caratula_expediente: '',
        circunscripcion: null,
        ciudad: null,
        condenado: false,
        despacho_judicial: null,
        estado_procesal:'',
        fecha_del_hecho: null,
        fecha_sentencia_definitiva: null,
        id: 0,
        juzgado_de_tribunal_de_sentencia: '',
        link_de_noticia: '',
        lugar_del_hecho: '',
        numeroDeExpediente: '',
        secretaria: '',
        sentencia_definitiva: '',
    },
    fecha_fin_intervencion: null,
    fecha_inicio_intervencion: '',
    id: 0,
    oficio_judicial_alta_intervencion: null,
    oficio_judicial_baja_intervencion: null,
    ppl: {
        persona:{
            nombre: '',
            apellido: '',
        }
    }
}