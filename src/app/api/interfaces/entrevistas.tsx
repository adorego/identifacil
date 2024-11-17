import {Dayjs} from "dayjs";

export type EntrevistaType = {
    id?: number|string| null;
    fechaEntrevista:Dayjs|null;
    seRealizoEntrevista:boolean;
    entrevistaPresencial:boolean;
    relatoDeEntrevista:string;
}