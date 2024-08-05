import {Dayjs} from "dayjs";
import {PPLType} from "@/components/utils/movimientosType";

export type faltasForm = {
    id: number;
    ppl: {id:number; nombre:string; apellido: string; documento: string;};
    fecha_falta: Dayjs | null;
    hora_falta: Dayjs | null;
    numero_de_resoulucion: string;
    fecha_resolucion: Dayjs | null;
    resolucion_falta?: File | null;
    resolucion_falta_url?: string | null;
    descripcion_de_la_falta: string;
    tipo_de_falta?: number;
    grado_de_falta: number;
    victima_falta: { id:number; nombre: string; apellido: string; documento: string; };
    tipo_victima: number;
    victimas?: Array<{ documento:string; nombre: string; apellido: string; tipos_de_victima: number; }>;
    tipos_de_sanciones_lista?:Array<{id:number;maximo_dias_de_sancion:number;nombre:string;}>
    sanciones?:Array<{resolucion_sancion:any;tipoDeSancion:number; fechaInicio:Dayjs|null; fechaFin:Dayjs|null;}>
};