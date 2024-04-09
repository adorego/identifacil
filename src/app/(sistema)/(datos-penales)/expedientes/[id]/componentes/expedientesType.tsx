import {Dayjs} from "dayjs";

export type PersonaEnExpedienteType = {
    id_persona: number;
    nombre: string;
    apellido: string;
    apodo: string;
    condenado: boolean;
    defensor: number;
    condena:{
        anhos: number;
        meses: number;
    },
    fecha_de_aprehension: null,
    tiene_anhos_extra_por_medida_de_seguridad: boolean;
    anhos_extra_por_medida_de_seguridad:{
        anhos: number;
        meses:number;
    },
    sentencia_definitiva: string;
    fecha_sentencia_definitiva: Dayjs | null;
    fecha_de_compurgamiento_inicial: Dayjs | null;
    fecha_de_compurgamiento_recalculada: Array<any>;
    hechosPuniblesCausas?: Array<[number]>
}

export const initialPeronaEnExpedienteStateForm = {
    id_persona: 0,
    nombre: "",
    apellido: "",
    apodo: "",
    condenado: false,
    defensor: 0,
    condena:{
        anhos: 0,
        meses: 0,
    },
    fecha_de_aprehension: null,
    tiene_anhos_extra_por_medida_de_seguridad: false,
    anhos_extra_por_medida_de_seguridad:{
        anhos: 0,
        meses:0,
    },
    sentencia_definitiva: '',
    fecha_sentencia_definitiva: null,
    fecha_de_compurgamiento_inicial: null,
    fecha_de_compurgamiento_recalculada: []
}