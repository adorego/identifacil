import {Dayjs} from "dayjs";

export type intervencionAltaType = {
    idDefensor: string;
    tipoIntervencion: string;
    idPersonaPPL: string;
    idExpediente: string;
    circunscripcion: string;
    fechaInicioProceso: Dayjs | null;
    oficio_judicial_alta_intervencion?: File|null;
    oficio_judicial_alta_intervencion_url?: string;
}