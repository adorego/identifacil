import {Dayjs} from "dayjs";

export type intervencionAltaType = {
    idDefensor: string;
    activo: boolean| 'true' | 'false';
    idPersonaPPL: string;
    idExpediente: string;
    circunscripcion: string;
    fechaInicioProceso: Dayjs | null;
    fechaFinDelProceso?: Dayjs | null;
    oficio_judicial_alta_intervencion?: File|null;
    oficio_judicial_alta_intervencion_url?: string;
    oficio_judicial_baja_intervencion?: File|null;
    oficio_judicial_baja_intervencion_url?: string;
}